import { Injectable, Logger } from '@nestjs/common';
import { SqsClient } from './sqs.client';

@Injectable()
export class SqsPublisher {
  private readonly logger = new Logger(SqsPublisher.name);
  private readonly queueUrl = process.env.SQS_QUEUE_URL!;

  constructor(private readonly sqsClient: SqsClient) {}

  async publishMessage(message: string) {
    try {
      const result = await this.sqsClient.sendMessage(this.queueUrl, message);
      this.logger.log(`Mensagem publicada com sucesso: ${result.MessageId}`);
      return result;
    } catch (error) {
      this.logger.error('Erro ao publicar a mensagem', error);
      throw error;
    }
  }
}
