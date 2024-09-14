import { Controller } from '@nestjs/common';
import { Account } from '../models/account.model';
import { AccountService } from '../../domain/services/account.service';
import { AccountDto } from 'src/application/dtos/account.dto';
import {
  Body,
  Get,
  HttpStatus,
  Param,
  Post
} from '@nestjs/common';

export interface ApiResponse<data> {
  statusCode: number;
  message: string;
  data?: data;
}

interface TransferResponseData {
  fromAccount: AccountDto;
  toAccount: AccountDto;
}

export interface TransferResponse<TransferResponseData> {
  statusCode: number;
  message: string;
  data?: TransferResponseData;
}

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // Verificar saldo
  @Get('/:clientId/:accountId/balance')
  async verifyBalance(
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
  ): Promise<ApiResponse<AccountDto>> {
    try {
      const balance = await this.accountService.verifyBalance(
        clientId,
        accountId,
      );
      const accountDto = new AccountDto(balance); // converte para AccountDto
      return {
        statusCode: HttpStatus.OK,
        message: 'Saldo verificado com sucesso!',
        data: accountDto,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  // Depositar
  @Post('/:clientId/:accountId/deposit')
  async deposit(
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
    @Body() body: { amount: number },
  ): Promise<ApiResponse<AccountDto>> {
    try {
      this.accountService.deposit(accountId, clientId, body.amount);
      const newBalance = await this.accountService.verifyBalance(
        clientId,
        accountId,
      );
      const accountDto = new AccountDto(newBalance);
      return {
        statusCode: HttpStatus.OK,
        message: 'Depósito realizado com sucesso!',
        data: accountDto,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  // Sacar
  @Post('/:clientId/:accountId/withdraw')
  async withdraw(
    @Param('clientId') clientId: string,
    @Param('accountId') accountId: string,
    @Body() body: { amount: number },
  ): Promise<ApiResponse<AccountDto>> {
    try {
      this.accountService.withdraw(accountId, clientId, body.amount);
      const newBalance = await this.accountService.verifyBalance(
        clientId,
        accountId,
      );
      const accountDto = new AccountDto(newBalance);
      return {
        statusCode: HttpStatus.OK,
        message: 'Saque realizado com sucesso!',
        data: accountDto,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }

  // Tranferir
  @Post('/:clientId/:accountId/transfer')
  async transfer(
    @Param('clientId') clientId: string,
    @Param('accountId') fromAccountId: string,
    @Body() body: { toAccountId: string; amount: number; clientIdTo: string },
  ): Promise<TransferResponse<TransferResponseData>> {
    try {
      const { toAccountId, amount, clientIdTo } = body;
      const { fromAccount, toAccount } = await this.accountService.transfer(
        fromAccountId,
        toAccountId,
        clientId,
        clientIdTo,
        amount,
      );
      console.log(fromAccount, toAccount);
      console.log(this.accountService);
      const fromAccountDto = new AccountDto(fromAccount);
      const toAccountDto = new AccountDto(toAccount);

      return {
        statusCode: HttpStatus.OK,
        message: 'Transferência realizada com sucesso!',
        data: {
          fromAccount: fromAccountDto,
          toAccount: toAccountDto,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }
}
