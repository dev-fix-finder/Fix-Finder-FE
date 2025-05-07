import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore, getDoc,
  getDocs, getFirestore, onSnapshot, orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from '@angular/fire/firestore';
import {Conversations} from '../../models/Conversations';
import {Message} from '../../models/Message';
import {ChatUser} from '../../models/ChatUser';


export interface ConversationData {
  conversations: Conversations;
  participants: ChatUser[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  constructor(private firestore: Firestore) {
  }

  async createConversationIfNotExists(
    convoId: string,
    participants: string[],
    currentUser: ChatUser,
    receiverUser: ChatUser
  ): Promise<void> {
    const convoRef = doc(this.firestore, `conversations/${convoId}`);
    const docSnap = await getDoc(convoRef);

    if (!docSnap.exists()) {
      await setDoc(convoRef, {
        participants,
        createdAt: serverTimestamp(),
        users: {
          [currentUser?.userId]: currentUser,
          [receiverUser?.userId]: receiverUser
        }
      });
    }
  }

  async getConversations(userId: string): Promise<ConversationData> {
    const conversations: Conversations = {};
    const allParticipants: ChatUser[] = [];

    try {
      const convoSnapshot = await getDocs(collection(this.firestore, 'conversations'));

      for (const convoDoc of convoSnapshot.docs) {
        const convoData = convoDoc.data();

        if (convoData['participants'].includes(userId)) {
          const messages: Message[] = [];
          const participants: ChatUser[] = [];

          // Extract participants
          for (const userIdKey in convoData['users']) {
            if (convoData['users'].hasOwnProperty(userIdKey)) {
              const user: ChatUser = convoData['users'][userIdKey];
              participants.push(user);
              allParticipants.push(user); // collect globally
            }
          }

          // Extract messages
          const messagesSnapshot = await getDocs(collection(convoDoc.ref, 'messages'));
          messagesSnapshot.forEach((msgDoc) => {
            const msgData = msgDoc.data();
            const message: Message = {
              text: msgData['text'],
              sentByCurrentUser: msgData['sentByCurrentUser'],
              user: msgData['user'] || null,
              timestamp: msgData['timestamp']?.toDate?.() ?? null
            };
            messages.push(message);
          });

          // Map to conversation format
          participants.forEach(participant => {
            conversations[participant.userId] = messages;
          });
        }
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }

    return { conversations, participants: allParticipants };
  }

  async sendMessage(convoId: string, message: Message) {
    const messagesRef = collection(this.firestore, `conversations/${convoId}/messages`);
    await addDoc(messagesRef, {
      ...message,
      timestamp: serverTimestamp()
    });
  }


  listenToMessages(convoId: string, callback: (messages: Message[]) => void) {
    const messagesRef = collection(this.firestore, `conversations/${convoId}/messages`);
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    return onSnapshot(q, (snapshot) => {
      const messages: Message[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          text: data['text'],
          sentByCurrentUser: data['sentByCurrentUser'],
          user: data['user'] || null,
          timestamp: data['timestamp']?.toDate?.() ?? null
        };
      });

      callback(messages);
    });
  }

}
