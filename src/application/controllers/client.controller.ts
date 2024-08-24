import {
  Body,
  // Body,
  Controller,
  // Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  // Param,
  // Patch,
  // Post,
} from '@nestjs/common';
import { ClientService } from '../../domain/services/client.service';
// import { CheckingAccount } from '../../domain/models/checkingAccount.model';
// import { SavingsAccount } from '../../domain/models/savingsAccount.model';
// import { Manager } from '../../domain/models/manager.model';
import { ClientDto } from '../dtos/client.dto';
import { CreateClientDto } from '../dtos/createClient.dto';
// import { PaymentDto } from 'src/application/dtos/payment.dto';

export interface ApiResponse<data> {
  statusCode: number;
  message: string;
  data?: data;
}

@Controller('clients')
export class ClientController {
  constructor(private readonly clientsService: ClientService) {}

  // Lista todos os clientes
  //Funcionou
  @Get()
  async getAllClients(): Promise<ApiResponse<ClientDto[]>> {
    try {
      const clients = await this.clientsService.getAllClients();
      const clientDto = clients.map((client) => new ClientDto(client));
      return {
        statusCode: HttpStatus.OK,
        message: 'Clientes carregados com sucesso!',
        data: clientDto,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Lista um único cliente
  @Get('/:id')
  async getClientById(
    @Param('id') id: string,
  ): Promise<ApiResponse<ClientDto>> {
    try {
      const client = await this.clientsService.getClientById(id);
      const clientDto = new ClientDto(client);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente carregado com sucesso!',
        data: clientDto,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Cliente não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Criar um novo cliente
  @Post('/create')
  async createClient(@Body() createClientDto: CreateClientDto) {
    try {
      const client = await this.clientsService.createClient(createClientDto);
      const clientDto = new ClientDto(client);
      console.log(clientDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cliente criado com sucesso!',
        data: clientDto,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Cria um novo cliente
  // @Post('/create')
  // async openAccount(
  //   @Body('fullname') fullname: string,
  //   @Body('address') address: string,
  //   @Body('phone') phone: string,
  //   @Body('income') income: number,
  //   @Body('accountType') accountType: 'Corrente' | 'Poupança',
  //   @Body('manager') manager?: Manager,
  // ): Promise<ApiResponse<CustomerDto>> {
  //   try {
  //     const accountClass =
  //       accountType === 'Corrente' ? CheckingAccount : SavingsAccount;
  //     const customer = null;
  // this.customerService.openAccount(
  //   fullname,
  //   address,
  //   phone,
  //   income,
  //   accountClass,
  //   manager,
  // );

  //     const customerDto = new CustomerDto(customer);
  //     const response: ApiResponse<CustomerDto> = {
  //       statusCode: HttpStatus.CREATED,
  //       message: 'Conta aberta com sucesso!',
  //       data: customerDto,
  //     };

  //     console.log('response', response);

  //     return response;
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // Mudar tipo de conta
  // @Patch(':id/change-account-type')
  // async changeAccountType(
  //   @Param('id') customerId: string,
  //   @Body()
  //   body: {
  //     accountId: string;
  //     newType: 'Corrente' | 'Poupança';
  //   },
  // ): Promise<ApiResponse<CustomerDto>> {
  //   const accountType =
  //     body.newType === 'Corrente' ? CheckingAccount : SavingsAccount;
  //   try {
  //     const customer = this.customerService.changeAccountType(
  //       customerId,
  //       body.accountId,
  //       accountType,
  //     );
  //     const customerDto = new CustomerDto(customer); // converte para CustomerDto
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'Tipo de conta atualizada com sucesso!',
  //       data: customerDto,
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.NOT_FOUND,
  //       message: error.message,
  //     };
  //   }
  // }

  // Pagar boleto
  // @Post('/:id/pay-boleto')
  // async payBoleto(
  //   @Param('id') customerId: string,
  //   @Body()
  //   body: {
  //     accountId: string;
  //     amount: number;
  //     boletoNumber: string;
  //   },
  // ): Promise<
  //   ApiResponse<{
  //     customer: CustomerDto;
  //     payment: PaymentDto;
  //   }>
  // > {
  //   try {
  //     const { customer, payment } = this.customerService.payBoleto(
  //       customerId,
  //       body.accountId,
  //       body.amount,
  //       body.boletoNumber,
  //     );

  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'Boleto pago com sucesso!',
  //       data: {
  //         customer,
  //         payment,
  //       },
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.NOT_FOUND,
  //       message: error.message,
  //     };
  //   }
  // }

  // Pagar pix
  // @Post('/:id/pay-pix')
  // async payPix(
  //   @Param('id') customerId: string,
  //   @Body()
  //   body: {
  //     accountId: string;
  //     amount: number;
  //     pixKey: string;
  //   },
  // ): Promise<
  //   ApiResponse<{
  //     customer: CustomerDto;
  //     payment: PaymentDto;
  //   }>
  // > {
  //   try {
  //     const { customer, payment } = this.customerService.payPix(
  //       customerId,
  //       body.accountId,
  //       body.amount,
  //       body.pixKey,
  //     );
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'Pix pago com sucesso!',
  //       data: {
  //         customer,
  //         payment,
  //       },
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.NOT_FOUND,
  //       message: error.message,
  //     };
  //   }
  // }

  // Fechar uma conta
  // @Delete('/:id/close-account')
  // async closeAccount(
  //   @Param('id') id: string,
  //   @Body() body: { accountId: string },
  // ): Promise<ApiResponse<CustomerDto>> {
  //   try {
  //     const customer = this.customerService.closeAccount(id, body.accountId);
  //     const customerDto = new CustomerDto(customer); // converte para CustomerDto
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'Conta fechada com sucesso!',
  //       data: customerDto,
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.NOT_FOUND,
  //       message: error.message,
  //     };
  //   }
  // }

  // Excluir um cliente
  // @Delete('/:id/delete')
  // async deleteCustomer(@Param('id') customerId: string) {
  //   try {
  //     this.customerService.deleteClient(customerId);
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'Cliente excluído com sucesso!',
  //     };
  //   } catch (error) {
  //     return {
  //       statusCode: HttpStatus.NOT_FOUND,
  //       message: error.message,
  //     };
  //   }
  // }
}
