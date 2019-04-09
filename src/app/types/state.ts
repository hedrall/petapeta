import { EventLog } from '~/types/EventLog';
import { Post } from '~/types/post';

export interface RootState {
  isWeb3: boolean;
  account: string;
  networkId: number;
}

export interface EventLogsState {
  eventLogs: EventLog[],
  loading: boolean
}

export interface PostsState {
  posts: Post[],
  per_page: number,
  page: number,
  total: number,
  loading: boolean
}
