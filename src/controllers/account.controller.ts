import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.model';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post(':id/deposit')
  deposit(@Body() body: { account: Account; value: number }) {
    this.accountService.deposit(body.account, body.value);
    return {
      statusCode: HttpStatus.OK,
      message: 'Depósito realizado com sucesso!',
      data: body.account,
    };
  }

  @Post(':id/withdraw')
  withdraw(@Body() body: { account: Account; value: number }) {
    try {
      this.accountService.withdraw(body.account, body.value);
      return {
        statusCode: HttpStatus.OK,
        message: 'Saque realizado com sucesso!',
        data: body.account,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }

  @Post(':id/balance')
  verifyBalance(@Body() body: { account: Account }) {
    const balance = this.accountService.verifyBalance(body.account);
    return {
      statusCode: HttpStatus.OK,
      message: 'Saldo verificado com sucesso',
      data: { balance },
    };
  }

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
