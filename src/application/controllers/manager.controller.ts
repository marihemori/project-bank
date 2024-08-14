import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ManagerService } from '../../domain/services/manager.service';
import { CheckingAccount } from '../../domain/models/checkingAccount.model';
import { SavingsAccount } from '../../domain/models/savingsAccount.model';
import { ManagerDto } from 'src/application/dtos/manager.dto';
import { OpenAccountDto } from '../dtos/openAccount.dto';
// import { AccountDto } from '../dtos/account.dto';
import { CustomerDto } from '../dtos/customer.dto';

export interface ApiResponse<data> {
  statusCode: number;
  message: string;
  data?: data;
}

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get('/')
  async getAllManagers(): Promise<ApiResponse<ManagerDto[]>> {
    try {
      const managers = this.managerService.getAllManagers();
      const managerDto = managers.map((manager) => new ManagerDto(manager));
      return {
        statusCode: HttpStatus.OK,
        message: 'Lista de gerentes carregada!',
        data: managerDto,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Lista um único gerente
  @Get('/:id')
  async getManagerById(
    @Param('id') managerId: string,
  ): Promise<ApiResponse<ManagerDto>> {
    try {
      // Obtém o gerente como um objeto Manager
      const manager = this.managerService.getManagerById(managerId);
      if (!manager) {
        throw new HttpException('Gerente não encontrado', HttpStatus.NOT_FOUND);
      }

      // Cria o DTO a partir do objeto Manager
      const managerDto = new ManagerDto(manager);

      return {
        statusCode: HttpStatus.OK,
        message: 'Gerente carregado com sucesso!',
        data: managerDto,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  @Post('/create')
  createManager(@Body() body: { fullname: string }) {
    const manager = this.managerService.createManager(body.fullname);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Gerente criado com sucesso!',
      data: manager,
    };
  }

  // Gerente abre uma conta para o cliente
  @Post(':id/open-account')
  openAccount(
    @Param('id') id: string,
    @Body()
    body: OpenAccountDto,
  ): ApiResponse<CustomerDto> {
    try {
      const manager = this.managerService.getManagerById(id);
      if (!manager) {
        throw new HttpException('Gerente não encontrado', HttpStatus.NOT_FOUND);
      }

      const accountClass =
        body.accountType === 'Corrente' ? CheckingAccount : SavingsAccount;

      const customer = this.managerService.openAccount(
        body.fullname,
        body.address,
        body.phone,
        body.income,
        accountClass,
        body.managerId,
      );

      const customerDto = new CustomerDto(customer);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Conta aberta com sucesso!',
        data: customerDto,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }

  // Adiciona um cliente a um gerente
  @Post(':id/add-customer')
  async addCustomer(
    @Param('id') managerId: string,
    @Body() body: { customerId: string },
  ): Promise<ApiResponse<ManagerDto>> {
    try {
      const manager = this.managerService.addCustomer(
        managerId,
        body.customerId,
      );
      const managerDto = new ManagerDto(manager);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente adicionado ao gerente com sucesso!',
        data: managerDto,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }

  // Remove um cliente de um gerente
  @Delete(':id/remove-customer')
  removeCustomer(
    @Param('id') id: string,
    @Body() body: { customerId: string },
  ) {
    const manager = this.managerService.removeCustomer(id, body.customerId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Cliente removido com sucesso',
      data: manager,
    };
  }

  @Delete(':id/close-account')
  closeAccount(
    @Param('id') id: string,
    @Body() body: { customerId: string; accountId: string },
  ) {
    const manager = this.managerService.closeAccount(
      id,
      body.customerId,
      body.accountId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Conta fechada com sucesso!',
      data: manager,
    };
  }

  @Patch(':id/change-account-type')
  changeAccountType(
    @Param('id') id: string,
    @Body()
    body: {
      customerId: string;
      accountId: string;
      newType: 'Corrente' | 'Poupança';
    },
  ) {
    const accountType =
      body.newType === 'Corrente' ? CheckingAccount : SavingsAccount;
    const manager = this.managerService.changeAccountType(
      id,
      body.customerId,
      body.accountId,
      accountType,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Tipo de conta alterado com sucesso!',
      data: manager,
    };
  }
}
