import { EventLogsState, RootState } from '~/types';
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { EventLog } from '~/types/eventLog';

export const state = (): EventLogsState => ({
  eventLogs: [] = []
})

export const getters: GetterTree<EventLogsState, RootState> = {
  getEventLogs(state: EventLogsState): EventLog[] {
    return state.eventLogs
  }
}

export const mutations: MutationTree<EventLogsState> = {
  setEventLogs(state: EventLogsState, logs: EventLog[]): void {
    state.eventLogs = [];
    logs.forEach( log => {
      state.eventLogs.push(log)
    })
  }
}

export const actions: ActionTree<EventLogsState, RootState> = {
  async fetchEventLogs({commit}) {

    const result = await this.$axios.$get("./latest-event-logs.json")



    commit("setEventLogs", result.slice(0, 20).map( _ => new EventLog(_)))
  }
}
