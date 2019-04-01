import { PostState } from '~/types/types';

export class EventLog {
  url: string;
  state: PostState;
  deposit: number;
  deadline: string;
  last_updated: string;

  constructor( log: Partial<EventLog> ) {
    Object.assign( this, log )
  }
}

export namespace LogStatuses {
  export const open = 0;
  export const close = 1;
  export const reverted = 2;
}
