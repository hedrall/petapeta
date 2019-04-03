<template>
  <div>

    <!-- イベントログ -->
    <div class="table-wrapper">
      <table class="table is-fullwidth is-hoverable is-narrow">
        <tbody>
        <tr v-for="log in getEventLogs">
          <td v-if="log.state === PostStatuses.open">
            {{log.url}}の期限が終了し、デポジット {{ log.deposit }}ETH が分配されました。
          </td>
          <td v-else-if="log.state === PostStatuses.close">
            {{log.url}}の拡散協力依頼が開始しました。( デポジット: {{ log.deposit }} ETH )
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Getter } from "vuex-class";
  import { PostStatuses } from "~/types/types";

  @Component( {} )
  export default class extends Vue {
    @Getter( "getEventLogs", { namespace: "event-logs" } ) getEventLogs;

    data ( {} ) {
      return {
        PostStatuses
      };
    };
  }
</script>

<style scoped lang="scss">

  .table-wrapper {
    height: 160px;
    overflow: scroll;
    border: solid 1px $natural-border;
    border-radius: 5px;
  }

</style>
