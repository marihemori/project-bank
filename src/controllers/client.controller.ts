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
  createClient(
    @Body()
    body: {
      fullName: string;
      address: string;
      phone: string;
      income: number;
      managerId?: string;
    },
  ) {
    const client = this.clientService.openAccount(
      body.fullName,
      body.address,
      body.phone,
      body.income,
      body.managerId,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Cliente criado com sucesso!',
      data: client,
    };
  }

  @Delete(':id/close-account')
  closeAccount(
    @Param('id') clientId: string,
    @Body() body: { accountId: string },
  ) {
    const client = this.clientService.closeAccount(clientId, body.accountId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Conta fechada com sucesso!',
      data: client,
    };
  }

  @Patch(':id/change-account-type')
  changeAccountType(
    @Param('id') clientId: string,
    @Body()
    body: {
      accountId: string;
      newType: 'Checking' | 'Savings';
    },
  ) {
    const client = this.clientService.changeAccountType(
      clientId,
      body.accountId,
      body.newType,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Tipo de conta atualizada com sucesso!',
      data: client,
    };
  }
}
