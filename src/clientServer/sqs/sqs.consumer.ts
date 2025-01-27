import { Injectable, Logger } from '@nestjs/common';
import { SqsClient } from './sqs.client';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SqsConsumer {
  private readonly logger = new Logger(SqsConsumer.name);
  private readonly queueUrl = process.env.SQS_QUEUE_URL!;

  constructor(private readonly sqsClient: SqsClient) {}

  @Cron('*/10 * * * * *')
  async handleQueueMessages() {
    try {
      const response = await this.sqsClient.receiveMessage(this.queueUrl);

      if (!response.Messages || response.Messages.length === 0) {
        this.logger.log('Nenhuma mensagem na fila.');
        return;
      }

      for (const message of response.Messages) {
        this.logger.log(`Mensagem recebida: ${message.Body}`);

        await this.processMessage(message.Body!);

        await this.sqsClient.deleteMessage(
          this.queueUrl,
          message.ReceiptHandle!,
        );
        this.logger.log(`Mensagem processada e excluída: ${message.MessageId}`);
      }
    } catch (error) {
      this.logger.error('Erro ao consumir a fila', error);
    }
  }

  private async processMessage(messageBody: string) {
    // Adicione sua lógica de processamento aqui
    this.logger.log(`Processando mensagem: ${messageBody}`);
  }
}
