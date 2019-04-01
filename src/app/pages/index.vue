<template>
  <section>
    <section class="section">
      <span class="tag is-primary">イベントログ</span>
      <div class="table-wrapper">
        <table class="table is-fullwidth is-hoverable is-narrow">
          <tbody>
          <tr v-for="log in getEventLogs">
            <td v-if="log.state === LogStatuses.open">
              {{log.url}}の期限が終了し、デポジット {{ log.deposit }}ETH が分配されました。
            </td>
            <td v-else-if="log.state === LogStatuses.close">
              {{log.url}}の拡散協力依頼が開始しました。( デポジット: {{ log.deposit }} ETH )
            </td>
          </tr>
          </tbody>
        </table>
      </div>
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
  } from "nuxt-property-decorator";
  import { State, Getter, Action } from "vuex-class";
  import { Person } from "~/types";
  import { EventLog } from "~/types/eventLog";
  import { LogStatuses } from "~/types/eventLog";

  @Component( {
    async mounted() {
      this.fetchEventLogs();
    },
    async asyncData( { store } ) {
      return {
        LogStatuses
      };
      // await store.dispatch('event-logs/fetchEventLogs');
    },
    components: {}
  } )
  export default class extends Vue {
    @State people: Person;

    @State( "eventLog", { namespace: "event-logs" } ) eventLog: EventLog[];

    @Getter( "getEventLogs", { namespace: "event-logs" } ) getEventLogs;

    @Action( "fetchEventLogs", { namespace: "event-logs" } ) fetchEventLogs;
  }
</script>

<style scoped lang="scss">
  .tag {
    margin-bottom: 5px;
  }

  .table-wrapper {
    height: 160px;
    overflow: scroll;
    border: solid 1px $natural-border;
    border-radius: 5px;
  }
</style>
