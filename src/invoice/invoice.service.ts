import { HttpService } from '@nestjs/axios';
// import axios, { AxiosRequestConfig } from 'axios';

export class InvoiceService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    // const url = 'http://app-invoice-api:8000/api/invoices';

    // const config: AxiosRequestConfig = {
    //   method: 'GET',
    //   url: url,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    // const response = await axios(config);

    const response = {
      data: 'Message back',
    };

    return response.data;
  }
}
