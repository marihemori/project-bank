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
import { CustomerService } from '../../domain/services/customer.service';
import { CheckingAccount } from '../../domain/entity/checkingAccount.model';
import { SavingsAccount } from '../../domain/entity/savingsAccount.model';
import { Manager } from '../../domain/entity/manager.model';
import { CustomerDto } from '../dtos/customer.dto';
import { PaymentDto } from 'src/application/dtos/payment.dto';

export interface ApiResponse<data> {
  statusCode: number;
  message: string;
  data?: data;
}

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Lista todos os clientes
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

  // Lista um único cliente
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
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Cria um novo cliente
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

  // Mudar tipo de conta
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

  // Pagar boleto
  @Post('/:id/pay-boleto')
  async payBoleto(
    @Param('id') customerId: string,
    @Body()
    body: {
      accountId: string;
      amount: number;
      boletoNumber: string;
    },
  ): Promise<
    ApiResponse<{
      customer: CustomerDto;
      payment: PaymentDto;
    }>
  > {
    try {
      const { customer, payment } = this.customerService.payBoleto(
        customerId,
        body.accountId,
        body.amount,
        body.boletoNumber,
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Boleto pago com sucesso!',
        data: {
          customer,
          payment,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  // Pagar pix
  @Post('/:id/pay-pix')
  async payPix(
    @Param('id') customerId: string,
    @Body()
    body: {
      accountId: string;
      amount: number;
      pixKey: string;
    },
  ): Promise<
    ApiResponse<{
      customer: CustomerDto;
      payment: PaymentDto;
    }>
  > {
    try {
      const { customer, payment } = this.customerService.payPix(
        customerId,
        body.accountId,
        body.amount,
        body.pixKey,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Pix pago com sucesso!',
        data: {
          customer,
          payment,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  // Fechar uma conta
  @Delete('/:id/close-account')
  async closeAccount(
    @Param('id') id: string,
    @Body() body: { accountId: string },
  ): Promise<ApiResponse<CustomerDto>> {
    try {
      const customer = this.customerService.closeAccount(id, body.accountId);
      const customerDto = new CustomerDto(customer); // converte para CustomerDto
      return {
        statusCode: HttpStatus.OK,
        message: 'Conta fechada com sucesso!',
        data: customerDto,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  // Excluir um cliente
  @Delete('/:id/delete')
  async deleteCustomer(@Param('id') customerId: string) {
    try {
      this.customerService.deleteClient(customerId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente excluído com sucesso!',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }
}
