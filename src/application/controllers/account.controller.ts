import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
// import { Account } from '../models/account.model';
import { AccountService } from '../../domain/services/account.service';
import { AccountDto } from 'src/application/dtos/account.dto';

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
  @Get('/:customerId/:accountId/balance')
  async verifyBalance(
    @Param('customerId') customerId: string,
    @Param('accountId') accountId: string,
  ): Promise<ApiResponse<AccountDto>> {
    try {
      const balance = this.accountService.verifyBalance(customerId, accountId);
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
  @Post('/:customerId/:accountId/deposit')
  async deposit(
    @Param('customerId') customerId: string,
    @Param('accountId') accountId: string,
    @Body() body: { amount: number },
  ): Promise<ApiResponse<AccountDto>> {
    try {
      this.accountService.deposit(accountId, customerId, body.amount);
      const newBalance = this.accountService.verifyBalance(
        customerId,
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
  @Post('/:customerId/:accountId/withdraw')
  async withdraw(
    @Param('customerId') customerId: string,
    @Param('accountId') accountId: string,
    @Body() body: { amount: number },
  ): Promise<ApiResponse<AccountDto>> {
    try {
      this.accountService.withdraw(accountId, customerId, body.amount);
      const newBalance = this.accountService.verifyBalance(
        customerId,
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
  @Post('/:customerId/:accountId/transfer')
  async transfer(
    @Param('customerId') customerId: string,
    @Param('accountId') fromAccountId: string,
    @Body() body: { toAccountId: string; amount: number; customerIdTo: string },
  ): Promise<TransferResponse<TransferResponseData>> {
    try {
      const { toAccountId, amount, customerIdTo } = body;
      const { fromAccount, toAccount } = this.accountService.transfer(
        fromAccountId,
        toAccountId,
        customerId,
        customerIdTo,
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
