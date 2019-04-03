import { Person } from "~/types";
import { EventLog } from '~/types/EventLog';
import { Post } from '~/types/post';

export interface RootState {
  people: Person[];
}

export interface EventLogsState {
  eventLogs: EventLog[]
}

export interface PostsState {
  posts: Post[],
  per_page: number,
  page: number,
  total: number,
  loading: boolean
}
