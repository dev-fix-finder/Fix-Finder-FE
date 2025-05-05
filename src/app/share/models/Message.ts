import {ChatUser} from './ChatUser';

export interface Message {
  text: string;
  sentByCurrentUser: boolean;
  user?: ChatUser;
  timestamp?: Date;
}
