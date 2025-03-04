import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomError } from './custom.error';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let messages: string[] = ['Erro interno na aplicação'];
    let action = 'UNKNOWN';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      messages = exception.getResponse() as string[];
    }

    if (exception instanceof UnauthorizedException) {
      status = exception.getStatus();
      const result = exception.getResponse();
      const response = typeof result === 'string' ? JSON.parse(result) : result;
      messages = [response.message];
      action = 'AUTHENTICATION_FAILURE';
    }

    if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      const result = exception.getResponse();
      const response = typeof result === 'string' ? JSON.parse(result) : result;
      messages = [response.message];
      action = 'BAD_REQUEST_EXCEPTION';
    }

    if (exception instanceof QueryFailedError) {
      status = 422;
      messages = [exception.message];
      action = 'ERROR_DATABASE';
    }

    if (exception instanceof CustomError) {
      status = exception.statusCode;
      messages = exception.messages;
      action = exception.action;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      action,
      messages,
    });
  }
}
