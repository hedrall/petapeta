<template>
  <div>
    <v-card class="card"
            v-if="getEventLogs && getEventLogs.length > 0" height="200">
      <v-list one-line>
        <v-list-tile v-for="log of getEventLogs" class="tile">
          <v-list-tile-content>

            <!--<v-list-tile-title>{{ log.url }}</v-list-tile-title>-->

            <v-list-tile-title v-if="log.state === PostStatuses.open">
              {{ log.url }}の期限が終了し、デポジット {{ log.deposit }}ETH が分配されました。
            </v-list-tile-title>

            <v-list-tile-title v-else-if="log.state === PostStatuses.close">
              {{ log.url }}の拡散協力依頼が開始しました。( デポジット: {{ log.deposit }} ETH )
            </v-list-tile-title>

          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>

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

  .card {
    overflow: scroll;

    .tile {

      &:hover {
        background: $hover-background;
      }
    }
  }

</style>

<style lang="scss">
  .v-list__tile {
    height: 35px;
  }
</style>
