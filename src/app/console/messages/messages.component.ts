import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

interface User {
  id: number;
  name: string;
  profilePicture: string;
  online: boolean;
}

interface Message {
  text: string;
  sentByCurrentUser: boolean;
  user?: User;
}

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
export class MessagesComponent {
  users: User[] = [
    {
      id: 1,
      name: 'Thanuja',
      profilePicture: 'https://images.unsplash.com/photo-1739897020176-a3123626d791?q=80&w=1587&auto=format&fit=crop',
      online: true
    },
    {
      id: 2,
      name: 'Aathif',
      profilePicture: 'https://images.unsplash.com/photo-1728041781089-e7b9458421cd?q=80&w=1587&auto=format&fit=crop',
      online: true
    },
    {
      id: 3,
      name: 'Tharaka Isuru',
      profilePicture: 'https://images.unsplash.com/photo-1728588266992-a50e7adc55c2?q=80&w=1587&auto=format&fit=crop',
      online: false
    }
  ];

  currentUser: User = {
    id: 0,
    name: 'You',
    profilePicture: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?q=80&w=1470&auto=format&fit=crop',
    online: true
  };

  // Store a conversation for each user by user id
  conversations: { [key: number]: Message[] } = {
    1: [
      {
        text: "Hi Good Morning",
        sentByCurrentUser: false,
        user: this.users.find(u => u.id === 1)
      },
      {text: "Good Morning! What can I do for you?", sentByCurrentUser: true}
    ],
    2: [
      {
        text: "g'day!",
        sentByCurrentUser: false,
        user: this.users.find(u => u.id === 2)
      },
      {text: "greetings", sentByCurrentUser: true},
      {text: "how goes u fergus?", sentByCurrentUser: true}
    ],
    3: [
      {text: "Hi Lady Ann!", sentByCurrentUser: true},
      {
        text: "Hello!",
        sentByCurrentUser: false,
        user: this.users.find(u => u.id === 3)
      }
    ]
  };

  // No default chat is loaded; user must be selected manually
  selectedUser: User | null = null;
  messages: Message[] = [];
  newMessage = '';

  constructor() {
    console.info('Component constructor');
    console.table(this.conversations)
  }

  // Change the active chat when a user is selected
  selectUser(user: User) {
    this.selectedUser = user;
    // Load the conversation for the selected user (or initialize as empty)
    this.messages = this.conversations[user.id] || [];
  }

  // Send a new message and add it to the current conversation
  sendMessage() {
    if (this.newMessage.trim() && this.selectedUser) {
      const message: Message = {text: this.newMessage, sentByCurrentUser: true};
      this.messages.push(message);
      // Update the conversation mapping with the new message
      this.conversations[this.selectedUser.id] = this.messages;
      this.newMessage = '';
    }
  }
}
