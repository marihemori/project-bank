import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { Account } from 'src/accounts/account.entity';
import { Manager } from 'src/managers/manager.entity';

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

  @Post('/create')
  createClient(
    @Body()
    body: {
      fullName: string;
      address: string;
      phone: string;
      income: number;
      accountType: 'Checking' | 'Savings';
      manager: Manager;
    },
  ) {
    const client = this.clientService.openAccount(
      body.fullName,
      body.address,
      body.phone,
      body.income,
      body.accountType,
      body.manager,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Cliente criado com sucesso!',
      data: client,
    };
  }

  @Delete(':id/close-account')
  closeAccount(@Body() body: { client: Client; account: Account }) {
    const client = this.clientService.closeAccount(body.client, body.account);
    return {
      statusCode: HttpStatus.OK,
      message: 'Conta fechada com sucesso!',
      data: client,
    };
  }

  @Patch(':id/change-account-type')
  changeAccountType(
    @Body()
    body: {
      client: Client;
      account: Account;
      newType: 'Checking' | 'Savings';
    },
  ) {
    const client = this.clientService.changeAccountType(
      body.account,
      body.newType,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Tipo de conta atualizada com sucesso!',
      data: client,
    };
  }
}
