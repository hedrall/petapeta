import { PostState } from '~/types/types';

export class EventLog {
  url: string;
  state: PostState;
  deposit: number;
  deadline: string;
  created_at: string;

  constructor( log: Partial<EventLog> ) {
    Object.assign( this, log )
  }
}
