import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';
import { Account } from '../models/account.model';
import { Manager } from '../models/manager.model';

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

  @Put(':id/change-account-type')
  changeAccountType(
    @Body()
    body: {
      client: Client;
      account: Account;
      newType: 'Checking' | 'Savings';
    },
  ) {
    const client = this.clientService.changeAccountType(
      body.client,
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
