import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CheckingAccount } from 'src/models/checkingAccount.model';
import { SavingsAccount } from 'src/models/savingsAccount.model';
import { Manager } from 'src/models/manager.model';
import { CustomerDto } from '../dtos/customer.dto';

export interface ApiResponse<data> {
  statusCode: number;
  message: string;
  data?: data;
}

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/')
  async getAllCustomers(): Promise<ApiResponse<CustomerDto[]>> {
    try {
      const customers = this.customerService.getAllCustomers();
      const customerDto = customers.map(
        (customer) => new CustomerDto(customer),
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Clientes carregados com sucesso!',
        data: customerDto,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getCustomerById(
    @Param('id') id: string,
  ): Promise<ApiResponse<CustomerDto>> {
    try {
      const customer = this.customerService.getCustomerById(id);
      if (!customer) {
        throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
      }
      const customerDto = new CustomerDto(customer);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente carregado com sucesso!',
        data: customerDto,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/create')
  async openAccount(
    @Body('fullname') fullname: string,
    @Body('address') address: string,
    @Body('phone') phone: string,
    @Body('income') income: number,
    @Body('accountType') accountType: 'Corrente' | 'Poupança',
    @Body('manager') manager?: Manager,
  ): Promise<ApiResponse<CustomerDto>> {
    try {
      const accountClass =
        accountType === 'Corrente' ? CheckingAccount : SavingsAccount;
      const customer = this.customerService.openAccount(
        fullname,
        address,
        phone,
        income,
        accountClass,
        manager,
      );
      const customerDto = new CustomerDto(customer);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Conta aberta com sucesso!',
        data: customerDto,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id/close-account')
  async closeAccount(
    @Param('id') id: string,
    @Body() body: { accountId: string },
  ): Promise<ApiResponse<any>> {
    try {
      const customer = this.customerService.closeAccount(id, body.accountId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Conta fechada com sucesso!',
        data: customer,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  @Patch(':id/change-account-type')
  async changeAccountType(
    @Param('id') customerId: string,
    @Body()
    body: {
      accountId: string;
      newType: 'Corrente' | 'Poupança';
    },
  ): Promise<ApiResponse<CustomerDto>> {
    const accountType =
      body.newType === 'Corrente' ? CheckingAccount : SavingsAccount;
    try {
      const customer = this.customerService.changeAccountType(
        customerId,
        body.accountId,
        accountType,
      );
      const customerDto = new CustomerDto(customer); // converte para CustomerDto
      return {
        statusCode: HttpStatus.OK,
        message: 'Tipo de conta atualizada com sucesso!',
        data: customerDto,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }
}
