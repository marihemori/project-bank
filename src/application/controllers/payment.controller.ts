import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { PaymentService } from '../../domain/services/payment.service';
import { PixPayment } from '../../domain/entities/PixPayment.model';
import { BoletoPayment } from '../../domain/entities/boletoPayment.model';
import { Account } from '../../domain/entities/account.model';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/')
  getAllPayments() {
    const payments = this.paymentService.getAllPayments();
    return {
      statusCode: HttpStatus.OK,
      message: 'Todos os pagamentos carregado com sucesso!',
      data: payments,
    };
  }

  @Post('/pix')
  processPixPayment(
    @Body() body: { amount: number; pixKey: string; account: Account },
  ): {
    statusCode: number;
    message: string;
    data: PixPayment;
  } {
    const payment = this.paymentService.processPixPayment(
      body.amount,
      body.pixKey,
      // body.account,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Pagamento PIX processado com sucesso!',
      data: payment,
    };
  }

  @Post('/boleto')
  processBoletoPayment(
    @Body() body: { amount: number; boletoNumber: string; account: Account },
  ): { statusCode: number; message: string; data: BoletoPayment } {
    const payment = this.paymentService.processBoletoPayment(
      body.amount,
      body.boletoNumber,
      // body.account,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Pagamento do boleto processado com sucesso!',
      data: payment,
    };
  }
}
