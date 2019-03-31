import { Person } from "~/types";
import { EventLog } from '~/types/EventLog';

export interface RootState {
  people: Person[];
}

export interface EventLogsState {
  eventLogs: EventLog[]
}
