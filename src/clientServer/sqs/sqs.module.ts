import { Module } from '@nestjs/common';
import { SqsClient } from './sqs.client';
import { SqsConsumer } from './sqs.consumer';
import { SqsPublisher } from './sqs.publisher';

@Module({
  providers: [SqsClient, SqsPublisher, SqsConsumer],
  exports: [SqsClient],
})
export class AwsSqsModule {}
