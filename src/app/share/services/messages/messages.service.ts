import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Timestamp} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from '../firebase/firebase.service';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  orderBy,
  onSnapshot,
  Timestamp as FirestoreTimestamp,
  serverTimestamp
} from 'firebase/firestore';
import {HttpClient} from '@angular/common/http';




export interface Message {
  id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  conversationId: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageTimestamp?: Date;
  unreadCount?: number;
}
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  /*private currentUserId: string | null = null;
  private conversations = new BehaviorSubject<Conversation[]>([]);
  conversations$ = this.conversations.asObservable();

  private currentConversation = new BehaviorSubject<Message[]>([]);
  currentConversation$ = this.currentConversation.asObservable();

  private userData: any = null;
  private pollingInterval: any = null;
  private readonly POLLING_INTERVAL = 3000; // 3 seconds

  // Firestore references
  private db: any;
  private conversationsCollection: any;
  private messagesCollection: any;
  private conversationsUnsubscribe: (() => void) | null = null;
  private messagesUnsubscribe: (() => void) | null = null;

  constructor(private firebaseService: FirebaseService) {
    // Initialize Firestore
    this.db = this.firebaseService.getFirestoreDb();
    this.conversationsCollection = collection(this.db, 'conversations');
    this.messagesCollection = collection(this.db, 'messages');
  }

  // Set the current user ID
  setCurrentUserId(userId: string) {
    this.currentUserId = userId;
    this.loadConversations();
    this.startPolling();
  }

  // Get the current user ID from session storage if not already set
  private getCurrentUserIdFromStorage(): boolean {
    try {
      // @ts-ignore
      this.userData = JSON.parse(sessionStorage.getItem('personalData'));

      // Extract and set userId from userData
      if (this.userData && this.userData.userId) {
        this.currentUserId = this.userData.userId;
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error getting user ID from storage:', error);
      return false;
    }
  }

  // Start real-time listeners for conversations
  private startPolling(): void {
    // We're using Firestore's real-time listeners now, so polling is not needed
    // Just load conversations to set up the listeners
    this.loadConversations();
  }

  // Stop polling and clean up listeners
  stopPolling(): void {
    // Clean up any existing interval (for backward compatibility)
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }

    // Clean up Firestore listeners
    if (this.conversationsUnsubscribe) {
      this.conversationsUnsubscribe();
      this.conversationsUnsubscribe = null;
    }

    if (this.messagesUnsubscribe) {
      this.messagesUnsubscribe();
      this.messagesUnsubscribe = null;
    }
  }

  // Get all conversations from Firestore
  private async getAllConversations(): Promise<Conversation[]> {
    try {
      if (!this.currentUserId) {
        return [];
      }

      const q = query(
        this.conversationsCollection,
        where('participants', 'array-contains', this.currentUserId)
      );

      const querySnapshot = await getDocs(q);
      const conversations: Conversation[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        conversations.push({
          id: doc.id,
          participants: data.participants,
          lastMessage: data.lastMessage,
          lastMessageTimestamp: data.lastMessageTimestamp,
          unreadCount: data.unreadCount || 0
        });
      });

      return conversations;
    } catch (error) {
      console.error('Error getting conversations from Firestore:', error);
      return [];
    }
  }

  // Save a conversation to Firestore
  private async saveConversation(conversation: Conversation): Promise<void> {
    try {
      // If the conversation has an ID, update it, otherwise add a new one
      if (conversation.id) {
        const conversationRef = doc(this.db, 'conversations', conversation.id);
        await updateDoc(conversationRef, {
          participants: conversation.participants,
          lastMessage: conversation.lastMessage,
          lastMessageTimestamp: conversation.lastMessageTimestamp,
          unreadCount: conversation.unreadCount || 0
        });
      } else {
        await addDoc(this.conversationsCollection, {
          participants: conversation.participants,
          lastMessage: conversation.lastMessage,
          lastMessageTimestamp: conversation.lastMessageTimestamp,
          unreadCount: conversation.unreadCount || 0
        });
      }
    } catch (error) {
      console.error('Error saving conversation to Firestore:', error);
    }
  }

  // Get all messages for a conversation from Firestore
  private async getMessagesForConversation(conversationId: string): Promise<Message[]> {
    try {
      const q = query(
        this.messagesCollection,
        where('conversationId', '==', conversationId),
        orderBy('timestamp', 'asc')
      );

      const querySnapshot = await getDocs(q);
      const messages: Message[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          senderId: data.senderId,
          receiverId: data.receiverId,
          content: data.content,
          timestamp: data.timestamp,
          read: data.read,
          conversationId: data.conversationId
        });
      });

      return messages;
    } catch (error) {
      console.error('Error getting messages from Firestore:', error);
      return [];
    }
  }

  // Save a message to Firestore
  private async saveMessage(message: Message): Promise<string> {
    try {
      // If the message has an ID, update it, otherwise add a new one
      if (message.id) {
        const messageRef = doc(this.db, 'messages', message.id);
        await updateDoc(messageRef, {
          senderId: message.senderId,
          receiverId: message.receiverId,
          content: message.content,
          timestamp: message.timestamp,
          read: message.read,
          conversationId: message.conversationId
        });
        return message.id;
      } else {
        const docRef = await addDoc(this.messagesCollection, {
          senderId: message.senderId,
          receiverId: message.receiverId,
          content: message.content,
          timestamp: message.timestamp || serverTimestamp(),
          read: message.read,
          conversationId: message.conversationId
        });
        return docRef.id;
      }
    } catch (error) {
      console.error('Error saving message to Firestore:', error);
      return '';
    }
  }

  // Create or get a conversation between two users
  async getOrCreateConversation(otherUserId: string): Promise<string> {
    if (!this.currentUserId) {
      // Try to get from storage if not set directly
      if (!this.getCurrentUserIdFromStorage()) {
        throw new Error('Current user ID not set');
      }
    }

    // Sort user IDs to ensure consistent conversation ID
    const participants = [this.currentUserId!, otherUserId].sort();

    try {
      // Check if conversation already exists
      const q = query(
        this.conversationsCollection,
        where('participants', '==', participants)
      );

      const querySnapshot = await getDocs(q);

      // If conversation exists, return its ID
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
      }

      // Create new conversation
      const newConversation: Conversation = {
        id: '', // Will be set by Firestore
        participants,
        lastMessageTimestamp: FirestoreTimestamp.now()
      };

      // Save the new conversation to Firestore
      const docRef = await addDoc(this.conversationsCollection, {
        participants,
        lastMessageTimestamp: FirestoreTimestamp.now()
      });

      // Update the ID
      newConversation.id = docRef.id;

      // Update the conversations BehaviorSubject
      const currentConversations = await this.getAllConversations();
      this.conversations.next([...currentConversations, newConversation]);

      return docRef.id;
    } catch (error) {
      console.error('Error creating conversation in Firestore:', error);
      throw error;
    }
  }

  // Send a message
  async sendMessage(receiverId: string, content: string): Promise<void> {
    console.log('MessagesService.sendMessage called with receiverId:', receiverId, 'content:', content);

    if (!this.currentUserId) {
      console.log('Current user ID not set, trying to get from storage');
      // Try to get from storage if not set directly
      if (!this.getCurrentUserIdFromStorage()) {
        console.error('Failed to get current user ID from storage');
        throw new Error('Current user ID not set');
      } else {
        console.log('Got current user ID from storage:', this.currentUserId);
      }
    }

    try {
      // Get or create conversation
      console.log('Getting or creating conversation');
      const conversationId = await this.getOrCreateConversation(receiverId);
      console.log('Got conversation ID:', conversationId);
      const timestamp = FirestoreTimestamp.now();

      // Create message
      const message: Message = {
        senderId: this.currentUserId!,
        receiverId,
        content,
        timestamp,
        read: false,
        conversationId
      };
      console.log('Created message:', message);

      // Save message to Firestore
      console.log('Saving message to Firestore');
      const messageId = await this.saveMessage(message);
      console.log('Message saved to Firestore with ID:', messageId);

      // Update message with ID
      message.id = messageId;

      // Update conversation with last message
      console.log('Updating conversation with last message');
      const conversationRef = doc(this.db, 'conversations', conversationId);
      await updateDoc(conversationRef, {
        lastMessage: content,
        lastMessageTimestamp: timestamp
      });
      console.log('Conversation updated');

      // Update the current conversation if it's the active one
      console.log('Checking if conversation is active');
      const currentMessages = this.currentConversation.value;
      if (currentMessages.length > 0 && currentMessages[0].conversationId === conversationId) {
        console.log('Updating current conversation');
        this.currentConversation.next([...currentMessages, message]);
        console.log('Current conversation updated');
      } else {
        console.log('Conversation is not active, not updating current conversation');
      }

      // Reload conversations to update the list
      console.log('Reloading conversations');
      this.loadConversations();
      console.log('Conversations reloaded');
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Load all conversations for the current user
  async loadConversations() {
    if (!this.currentUserId) {
      // Try to get from storage if not set directly
      if (!this.getCurrentUserIdFromStorage()) {
        return;
      }
    }

    try {
      // Cancel any existing subscription
      if (this.conversationsUnsubscribe) {
        this.conversationsUnsubscribe();
        this.conversationsUnsubscribe = null;
      }

      // Create a query for conversations that include the current user
      const q = query(
        this.conversationsCollection,
        where('participants', 'array-contains', this.currentUserId!),
        orderBy('lastMessageTimestamp', 'desc')
      );

      // Set up real-time listener
      this.conversationsUnsubscribe = onSnapshot(q, (querySnapshot) => {
        const conversations: Conversation[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          conversations.push({
            id: doc.id,
            participants: data.participants,
            lastMessage: data.lastMessage,
            lastMessageTimestamp: data.lastMessageTimestamp,
            unreadCount: data.unreadCount || 0
          });
        });

        this.conversations.next(conversations);
      }, (error) => {
        console.error('Error listening to conversations:', error);
      });
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }

  // Load messages for a specific conversation
  async

  // Mark messages as read
  private async markMessagesAsRead(conversationId: string) {
    if (!this.currentUserId) {
      // Try to get from storage if not set directly
      if (!this.getCurrentUserIdFromStorage()) {
        return;
      }
    }

    try {
      // Query for unread messages for this user in this conversation
      const q = query(
        this.messagesCollection,
        where('conversationId', '==', conversationId),
        where('receiverId', '==', this.currentUserId),
        where('read', '==', false)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return; // No unread messages
      }

      // Update each unread message
      const batch = await import('firebase/firestore').then(m => m.writeBatch(this.db));

      querySnapshot.forEach((document) => {
        const messageRef = doc(this.db, 'messages', document.id);
        batch.update(messageRef, { read: true });
      });

      await batch.commit();

      // Update current conversation if it's the active one
      const currentMessages = this.currentConversation.value;
      if (currentMessages.length > 0 && currentMessages[0].conversationId === conversationId) {
        this.currentConversation.next(
          currentMessages.map(msg => {
            if (msg.receiverId === this.currentUserId && !msg.read) {
              return { ...msg, read: true };
            }
            return msg;
          })
        );
      }

      // Update unread count in the conversation
      const conversationRef = doc(this.db, 'conversations', conversationId);
      await updateDoc(conversationRef, {
        unreadCount: 0
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }

  // Get unread message count
  async getUnreadMessageCount(): Promise<number> {
    if (!this.currentUserId) {
      // Try to get from storage if not set directly
      if (!this.getCurrentUserIdFromStorage()) {
        return 0;
      }
    }

    try {
      // Query for unread messages for this user
      const q = query(
        this.messagesCollection,
        where('receiverId', '==', this.currentUserId),
        where('read', '==', false)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Error getting unread message count:', error);
      return 0;
    }
  }

  // Clean up resources when component is destroyed
  ngOnDestroy() {
    // Unsubscribe from Firestore listeners
    if (this.conversationsUnsubscribe) {
      this.conversationsUnsubscribe();
    }

    if (this.messagesUnsubscribe) {
      this.messagesUnsubscribe();
    }

    // Stop polling
    this.stopPolling();
  }*/

  loadMessages(conversationId: string) {

  }
}
