import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { InvoiceService } from './invoice.service';

@UseGuards(AuthTokenGuard)
@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get()
  async findAll() {
    return this.invoiceService.findAll();
  }
}
