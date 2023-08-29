/* eslint-disable prettier/prettier */
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
import { AuthService } from '../auth/auth.service';
import { ChatService } from './chat.service';
import { rawListeners } from 'process';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private authService: AuthService,
    private chatService: ChatService,
  ) {}
  private allUsers: object[] = [];
  @WebSocketServer()
  server: Server;
  async handleConnection(client: Socket) {
    console.log('Client connect', client.id);
    const token = client.handshake.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserFromAuthenticationToken(token);
    this.allUsers.push({ name: user.userName, id: user.id });

    if (token) {
      try {
      } catch (e) {
        console.log('dính try catch', e);
        client.disconnect();
      }
    } else {
      console.log('token hết hạn');
      client.disconnect();
    }
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, roomName: string) {
    client.join(roomName);
    console.log(`Client ${client.id} joined room: ${roomName}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomName: string) {
    client.leave(roomName);
    console.log(`Client ${client.id} joined room: ${roomName}`);
  }

  @SubscribeMessage('oldMessages')
  async getAllMessagesOld(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { idMe: number; idReceiver: number },
  ) {
    const token = client.handshake.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserFromAuthenticationToken(token);
    const oldMessages = await this.chatService.getMessagesBetweenUsers(
      data.idMe,
      data.idReceiver,
    );
    oldMessages.forEach((el) => {
      client.emit('allOldMessages', {
        sendID: el.sendUserId,
        recID: el.receiverUserId,
        msg: el.content,
      });
    });
  }

  @SubscribeMessage('sendMessage')
  handleMessageEvent(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { roomName: string; idMe: number; idReceiver: number; msg: string },
  ) {
    console.log(data);

    this.server
      .in(data.roomName)
      .emit('newMessage', { un: data.idMe, ms: data.msg });
    this.chatService.createMessage(data.idMe, data.idReceiver, data.msg);
    console.log(`Client ${client.id} sent message to room: ${data.roomName}`);
  }

  // Xử lý logic khi có một trình duyệt ngắt kết nối
  async handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
    const token = client.handshake.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserFromAuthenticationToken(token);
    const index = this.allUsers.findIndex((u) => u['id'] === user.id);
    if (index !== -1) {
      this.allUsers.splice(index, 1);
    }
  }
  getRoomId(userId1: number, userId2: number) {
    return userId1 <= userId2
      ? `${userId1}-${userId2}`
      : `${userId2}-${userId1}`;
  }
}
