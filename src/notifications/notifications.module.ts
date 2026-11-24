import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { EventsGateway } from './events/events.gateway';

@Module({
  controllers: [NotificationsController],
  providers: [EventsGateway]
})
export class NotificationsModule {}
