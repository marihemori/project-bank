import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ManagerService } from '../services/manager.service';
import { CheckingAccount } from 'src/models/checkingAccount.model';
import { SavingsAccount } from 'src/models/savingsAccount.model';

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get('/')
  getAllManagers() {
    const managers = this.managerService.getAllManagers();
    return {
      statusCode: HttpStatus.OK,
      message: 'Lista de gerentes carregada!',
      data: managers,
    };
  }

  @Get('/:id')
  getManagerById(@Param('id') managerId: string) {
    try {
      const manager = this.managerService.getManagerById(managerId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Gerente carregado com sucesso!',
        data: manager,
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

  @Post(':id/add-client')
  addClient(
    @Param('managerId') managerId: string,
    @Body()
    body: {
      clientId: string;
    },
  ) {
    try {
      const manager = this.managerService.addClient(managerId, body.clientId);
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

  @Delete(':id/remove-client')
  removeClient(@Param('id') id: string, @Body() body: { clientId: string }) {
    const manager = this.managerService.removeClient(id, body.clientId);
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
      clientId: string;
      accountType: 'Corrente' | 'Poupança';
    },
  ) {
    const accountClass =
      body.accountType === 'Corrente' ? CheckingAccount : SavingsAccount;
    const account = this.managerService.openAccount(
      id,
      body.clientId,
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
    @Body() body: { clientId: string; accountId: string },
  ) {
    const manager = this.managerService.closeAccount(
      id,
      body.clientId,
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
      clientId: string;
      accountId: string;
      newType: 'Corrente' | 'Poupança';
    },
  ) {
    const accountType =
      body.newType === 'Corrente' ? CheckingAccount : SavingsAccount;
    const manager = this.managerService.changeAccountType(
      id,
      body.clientId,
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
