import {
  Body,
  Controller,
  MessageEvent,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { EventsGateway } from './events/events.gateway';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @Sse('events/stream')
  streamEvents(): Observable<MessageEvent> {
    return interval(5000).pipe(
      map(() => ({
        data: {
          status: 'ONLINE',
          activeConnections: this.eventsGateway.getActiveClientsCount(),
          serverTime: new Date().toISOString(),
          storeInfo:
            'Моніторинг складських запасів та дропів колекцій одягу',
        },
      })),
    );
  }

  @Post('drop/:collectionId')
  startDrop(
    @Param('collectionId') collectionId: string,
    @Body() body: { collectionName: string },
  ): { roomId: string; collectionName: string; message: string } {
    const roomId = `drop_${collectionId}`;
    const { collectionName } = body;

    this.eventsGateway.emitToRoom(roomId, 'dropStarted', {
      roomId,
      collectionName,
      message: `Старт продажу нової сезонної колекції: ${collectionName}!`,
      timestamp: new Date().toISOString(),
    });

    return {
      roomId,
      collectionName,
      message: `Старт продажу нової сезонної колекції: ${collectionName}!`,
    };
  }
}
