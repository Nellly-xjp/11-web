import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private activeClientsCount = 0;

  getActiveClientsCount(): number {
    return this.activeClientsCount;
  }

  handleConnection(client: Socket): void {
    console.log(`Клієнт підключився: ${client.id}`);
    this.activeClientsCount += 1;
  }

  handleDisconnect(client: Socket): void {
    console.log(`Клієнт відключився: ${client.id}`);
    this.activeClientsCount = Math.max(0, this.activeClientsCount - 1);
  }

  @SubscribeMessage('ping')
  handlePing(
    @ConnectedSocket() client: Socket,
    @MessageBody() _data: unknown,
  ): void {
    client.emit('pong', {
      timestamp: new Date().toISOString(),
      message: 'Pong від сервера магазину одягу!',
    });
  }

  @SubscribeMessage('broadcastNotification')
  handleBroadcastNotification(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string,
  ): void {
    this.server.emit('globalAlert', {
      sender: client.id,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ): Promise<void> {
    await client.join(roomId);
    client.emit('roomJoined', {
      roomId,
      message: `Ви підписалися на дроп колекції: ${roomId}`,
    });
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ): Promise<void> {
    await client.leave(roomId);
    client.emit('roomLeft', {
      roomId,
      message: `Ви залишили кімнату: ${roomId}`,
    });
  }

  emitToRoom(roomId: string, event: string, data: unknown): void {
    this.server.to(roomId).emit(event, data);
  }

  @SubscribeMessage('triggerDrop')
  handleTriggerDrop(
    @MessageBody() payload: { roomId: string; collectionName: string },
  ): void {
    const { roomId, collectionName } = payload;
    this.emitToRoom(roomId, 'dropStarted', {
      roomId,
      collectionName,
      message: `Старт продажу нової сезонної колекції: ${collectionName}!`,
      timestamp: new Date().toISOString(),
    });
  }
}
