import { EventLogsState, RootState } from '~/types';
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { EventLog } from '~/types/eventLog';

export const state = (): EventLogsState => ({
  eventLogs: [],
  loading: false
});

export const getters: GetterTree<EventLogsState, RootState> = {
  getEventLogs(state: EventLogsState): EventLog[] {
    return state.eventLogs
  },
  getLoading( state: EventLogsState ): boolean {
    return state.loading;
  }
};

export const mutations: MutationTree<EventLogsState> = {
  setEventLogs(state: EventLogsState, logs: EventLog[]): void {
    state.eventLogs = [];
    logs.forEach( log => {
      state.eventLogs.push(log)
    })
  },
  toggleLoading( state: EventLogsState ) {
    state.loading = !state.loading;
  }
};

export const actions: ActionTree<EventLogsState, RootState> = {
  async fetchEventLogs({commit}) {
    commit( 'toggleLoading' );
    await new Promise( resolve => setTimeout(resolve, 700));

    const result = await (this as any).$axios.$get("/api/latest-event-logs.json");

    commit( 'toggleLoading' );
    commit("setEventLogs", result.slice(0, 20).map( _ => new EventLog(_)))
  }
};
