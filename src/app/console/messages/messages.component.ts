import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChatUser} from '../../share/models/ChatUser';
import {Conversations} from '../../share/models/Conversations';
import {Message} from '../../share/models/Message';
import {ChatServiceService} from '../../share/services/chat/chat-service.service';


@Component({
  selector: 'app-messages',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './messages.component.html',
  standalone: true,
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  users: ChatUser[] = [];

  currentUser: any;
  loggedUserId: any;

  // No default chat is loaded; user must be selected manually
  selectedUser: ChatUser | null = null;
  conversations: Conversations = {};
  messages: Message[] = [];
  newMessage = '';
  messageUnsubscribe: (() => void) | null = null;

  constructor(
    private chatService: ChatServiceService,
  ) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('personalData') || '{}');
    this.loggedUserId = this.currentUser?.userId ? this.currentUser?.userId : '';

    this.loadConversations();
  }

  selectUser(user: ChatUser): void {
    this.selectedUser = user;
    const convoId = this.getConversationId(this.loggedUserId, user.userId);

    // Unsubscribe previous listener if exists
    if (this.messageUnsubscribe) {
      this.messageUnsubscribe();
    }

    // Listen to real-time messages
    this.messageUnsubscribe = this.chatService.listenToMessages(convoId, (messages: Message[]) => {
      // @ts-ignore
      const updatedMessages: Message[] = messages.map(msg => {
        const senderId = msg.user?.userId || (msg as any).userId;

        const isCurrentUser = senderId === this.loggedUserId;

        // Determine the user object if not current user
        const userObject = !isCurrentUser
          ? this.users.find(u => u.userId === senderId) || this.selectedUser
          : undefined;

        return {
          text: msg.text,
          sentByCurrentUser: isCurrentUser,
          user: userObject,
          timestamp: msg.timestamp,
        };
      });

      this.messages = updatedMessages;
      this.conversations[user.userId] = updatedMessages;
    });
  }


  // Send a new message and add it to the current conversation
  sendMessage() {
    this.currentUser = JSON.parse(sessionStorage.getItem('personalData') || '{}');

    const loggedUser: ChatUser = {
      userId: this.currentUser?.userId || '',
      name: this.currentUser?.firstName + ' ' + this.currentUser?.lastName || 'User',
      profilePicture: this.currentUser?.profilePicUrl || '',
      online: true
    };

    if (this.newMessage.trim() && this.selectedUser && this.currentUser) {
      const convoId = this.getConversationId(this.currentUser?.userId, this.selectedUser.userId);

      const messageToSend: Message = {
        text: this.newMessage,
        sentByCurrentUser: true,
        user: loggedUser
      };

      // Push to local state
      const message: Message = {
        text: this.newMessage,
        sentByCurrentUser: true,
        user: this.currentUser
      };

      if (!this.conversations[this.selectedUser?.userId]) {
        this.conversations[this.selectedUser?.userId] = [];
      }

      this.conversations[this.selectedUser?.userId].push(message);
      this.newMessage = '';

      // Send to Firestore
      this.chatService.sendMessage(convoId, messageToSend);
    }
  }

  getConversationId(id1: string, id2: string): string {
    const sorted = [id1, id2].sort(); // Sorts alphabetically
    return `${sorted[0]}_${sorted[1]}`;
  }

  async loadConversations(): Promise<void> {
    const userData = JSON.parse(sessionStorage.getItem('personalData') || '{}');
    const loggedUserId: string | undefined = userData?.userId;

    if (!loggedUserId) {
      console.error('User is not logged in!');
      return;
    }

    try {
      // Fetch conversations and participants together
      const {conversations, participants} = await this.chatService.getConversations(loggedUserId);

      // Create a map of userId to ChatUser
      const usersMap: { [key: string]: ChatUser } = {};
      participants.forEach(user => {
        usersMap[user.userId] = user;
      });

      // Attach user objects to each message (only for messages not sent by current user)
      for (const [userIdStr, messages] of Object.entries(conversations)) {
        const user = usersMap[userIdStr];
        if (!user) continue;

        messages.forEach(msg => {
          if (!msg.sentByCurrentUser) {
            msg.user = user;
          }
        });
      }

      // Save to component state
      // Prepare mapped conversations
      const mappedConversations: Conversations = {};

      for (const [userIdStr, messages] of Object.entries(conversations)) {
        const updatedMessages: Message[] = messages.map(msg => {
          const senderId = msg.user?.userId || (msg as any).userId;

          const isCurrentUser = senderId === loggedUserId;

          // Determine the user object if not current user
          const userObject = !isCurrentUser
            ? this.users.find(u => u.userId === senderId) || participants.find(u => u.userId === senderId)
            : undefined;

          return {
            text: msg.text,
            sentByCurrentUser: isCurrentUser,
            user: userObject,
            timestamp: msg.timestamp,
          };
        });
        updatedMessages.sort((a, b) => (a.timestamp?.getTime() || 0) - (b.timestamp?.getTime() || 0));

        mappedConversations[userIdStr] = updatedMessages;
      }

      this.conversations = mappedConversations;
      this.users = participants.filter(user => user.userId !== loggedUserId);

      console.log('Conversations loaded:', this.conversations);
      console.log('Participants:', this.users);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }

}
