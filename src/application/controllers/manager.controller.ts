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
import { CheckingAccount } from '../../domain/entities/checkingAccount.model';
import { SavingsAccount } from '../../domain/entities/savingsAccount.model';
import { ManagerDto } from 'src/application/dtos/manager.dto';

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
      const manager = this.managerService.getManagerById(managerId);
      if (!manager) {
        throw new HttpException('Gerente não encontrado', HttpStatus.NOT_FOUND);
      }
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
  createManager(@Body() body: { fullName: string }) {
    const manager = this.managerService.createManager(body.fullName);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Gerente criado com sucesso!',
      data: manager,
    };
  }

  @Post(':id/add-customer')
  addCustomer(
    @Param('id') managerId: string,
    @Body()
    body: {
      customerId: string;
    },
  ) {
    try {
      const manager = this.managerService.addCustomer(
        managerId,
        body.customerId,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente adicionado ao gerente com sucesso!',
        data: {
          manager,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }

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

  @Post(':id/open-account')
  openAccount(
    @Param('id') id: string,
    @Body()
    body: {
      customerId: string;
      accountType: 'Corrente' | 'Poupança';
    },
  ) {
    const accountClass =
      body.accountType === 'Corrente' ? CheckingAccount : SavingsAccount;
    const account = this.managerService.openAccount(
      id,
      body.customerId,
      accountClass,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Conta aberta com sucesso!',
      data: account,
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
