import {Message} from './Message';

export interface Conversations {
  [userId: string]: Message[];
}
