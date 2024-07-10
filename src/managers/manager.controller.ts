import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { Client } from 'src/clients/client.entity';
import { Manager } from './manager.entity';
import { Account } from 'src/accounts/account.entity';

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

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
    @Param('id') id: string,
    @Body() body: { manager: Manager; client: Client },
  ) {
    const manager = this.managerService.addClient(id, body.client);
    return {
      statusCode: HttpStatus.OK,
      message: 'Cliente adicionado com sucesso!',
      data: manager,
    };
  }

  @Delete(':id/remove-client')
  removeClient(@Param('id') id: string, @Body() body: { client: Client }) {
    const manager = this.managerService.removeClient(id, body.client);
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
      client: Client;
      accountType: 'Checking' | 'Savings';
    },
  ) {
    const account = this.managerService.openAccount(
      id,
      body.client,
      body.accountType,
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
    @Body() body: { client: Client; account: Account },
  ) {
    const manager = this.managerService.closeAccount(
      id,
      body.client,
      body.account,
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
    body: { client: Client; account: Account; newType: 'Checking' | 'Savings' },
  ) {
    const manager = this.managerService.changeAccountType(
      id,
      body.client,
      body.account,
      body.newType,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Tipo de conta alterado com sucesso!',
      data: manager,
    };
  }
}
