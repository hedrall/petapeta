<template>
  <section>
    <section class="section">
      <h2>イベントログ</h2>
      <table class="table is-fullwidth is-hoverable">
        <tbody>
          <tr v-for="log in getEventLogs">
            <td>{{log.url}}</td>
          </tr>
        </tbody>
      </table>

    </section>
    <el-button type="primary">テスト</el-button>
    <a class="button is-primary">Primary</a>
    <h1 class="header">Nuxt TypeScript Starter</h1>
    <div class="cards">
    </div>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State, Getter, Action } from "vuex-class"
import { Person } from "~/types";
import { EventLog } from '~/types/eventLog';

@Component({
  async mounted() {
    this.fetchEventLogs()
  },
  async asyncData({store}) {
    // await store.dispatch('event-logs/fetchEventLogs');
  },
  components: {
  }
})
export default class extends Vue {
  @State people: Person
  @State('eventLog', {namespace: 'event-logs'}) eventLog: EventLog[]
  @Getter ('getEventLogs', {namespace: 'event-logs'}) getEventLogs
  @Action ('fetchEventLogs', {namespace: 'event-logs'}) fetchEventLogs
}
</script>

<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
