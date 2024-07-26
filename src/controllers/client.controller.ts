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
import { ClientService } from '../services/client.service';
import { CheckingAccount } from 'src/models/checkingAccount.model';
import { SavingsAccount } from 'src/models/savingsAccount.model';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('/')
  getAllClients() {
    const clients = this.clientService.getAllClients();
    return {
      statusCode: HttpStatus.OK,
      message: 'Lista de clientes carregada!',
      data: clients,
    };
  }

  @Get('/:id')
  getClientById(@Param('id') clientId: string) {
    try {
      const client = this.clientService.getClientById(clientId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente carregado com sucesso!',
        data: client,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  @Post('/create')
  openAccount(
    @Body()
    body: {
      fullName: string;
      address: string;
      phone: string;
      income: number;
      accountType: 'Corrente' | 'Poupança';
      managerId?: string;
    },
  ) {
    const accountClass =
      body.accountType === 'Corrente' ? CheckingAccount : SavingsAccount;
    const client = this.clientService.openAccount(
      body.fullName,
      body.address,
      body.phone,
      body.income,
      accountClass,
      body.managerId,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Conta criada com sucesso!',
      data: client,
    };
  }

  @Delete(':id/close-account')
  closeAccount(
    @Param('id') clientId: string,
    @Body() body: { accountId: string },
  ) {
    try {
      const client = this.clientService.closeAccount(clientId, body.accountId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Conta fechada com sucesso!',
        data: client,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  @Patch(':id/change-account-type')
  changeAccountType(
    @Param('id') clientId: string,
    @Body()
    body: {
      accountId: string;
      newType: 'Corrente' | 'Poupança';
    },
  ) {
    const accountType =
      body.newType === 'Corrente' ? CheckingAccount : SavingsAccount;
    try {
      const client = this.clientService.changeAccountType(
        clientId,
        body.accountId,
        accountType,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Tipo de conta atualizada com sucesso!',
        data: client,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }
}
