import { Observable } from 'rxjs/Observable';
import IO from 'socket.io-client';

class SocketService {
  connect() {
    this.socket = IO('http://localhost:8000');

    //////////////////////////////////////////////////////
    //               SOCKET EVENT HANDLERS
    //////////////////////////////////////////////////////
    this.onPublic = new Observable(observer => {
      this.socket.on('public', () => observer.next());
    });

    this.onSent = new Observable(observer => {
      this.socket.on('sent', data => {
        observer.next(data);
      });
    });

    this.chatMessage = new Observable(observer => {
      this.socket.on('chatMessage', data => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.emit('disconnect');
      this.socket.disconnect();
    }
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

}

export default new SocketService();
