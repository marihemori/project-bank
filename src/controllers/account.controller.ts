import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { Account } from '../models/account.model';
import { AccountService } from '../services/account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // Verificar saldo
  @Get(':accountId/balance')
  verifyBalance(@Param('accountId') accountId: string) {
    try {
      const balance = this.accountService.verifyBalance(accountId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Saldo verificado com sucesso!',
        data: { accountId, balance },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  // Método de depósito
  @Post(':accountId/deposit')
  deposit(
    @Param('accountId') accountId: string,
    @Body() body: { amount: number },
  ) {
    try {
      this.accountService.deposit(accountId, body.amount);
      const newBalance = this.accountService.verifyBalance(accountId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Depósito realizado com sucesso!',
        data: {
          accountId,
          newBalance,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  // Sacar
  @Post(':accountId/withdraw')
  withdraw(
    @Param('accountId') accountId: string,
    @Body() body: { amount: number },
  ) {
    console.log(`Valor recebido para saque: ${body.amount}`);
    try {
      this.accountService.withdraw(accountId, body.amount);
      const newBalance = this.accountService.verifyBalance(accountId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Saque realizado com sucesso!',
        data: {
          accountId,
          newBalance,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }

  // Tranferir
  @Post(':id/transfer')
  transfer(
    @Body() body: { fromAccount: Account; toAccount: Account; value: number },
  ) {
    try {
      this.accountService.transfer(
        body.fromAccount,
        body.toAccount,
        body.value,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Transferência realizada com sucesso!',
        data: { fromAccount: body.fromAccount, toAccount: body.toAccount },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }
}
