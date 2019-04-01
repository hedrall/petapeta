<template>
  <div>

    <!-- イベントログ -->
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

    <!-- 投稿一覧 -->
    <section class="section">
      <span class="tag is-primary">投稿一覧</span>

      <div class="post-container columns is-multiline">
        <div class="column is-4" v-for="post of getPosts">
          <div class="card">
            <!--<div class="card-image">-->
            <!--<figure class="image is-4by3">-->
            <!--<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">-->
            <!--</figure>-->
            <!--</div>-->

            <div class="card-content">
              <div class="media">
                <!--<div class="media-left">-->
                <!--<figure class="image is-48x48">-->
                <!--<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">-->
                <!--</figure>-->
                <!--</div>-->
                <div class="media-content">
                  <p class="title is-4">John Smith</p>
                  <p class="subtitle is-6">@johnsmith</p>
                </div>
              </div>

              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <el-button type="primary">テスト</el-button>
    <a class="button is-primary">Primary</a>
    <h1 class="header">Nuxt TypeScript Starter</h1>
    <div class="cards">
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Action, Getter } from "vuex-class";
  import { LogStatuses } from "~/types/eventLog";

  @Component( {
    async mounted() {
      await Promise.all( [
        this.fetchEventLogs(),
        this.fetchPosts()
      ] );
      console.log( this.getEventLogs );
      console.log( this.getPosts );
    },
    async asyncData( { store } ) {
      return {
        LogStatuses
      };
      // await store.dispatch('event-logs/fetchEventLogs');
    },
    components: {},
  } )
  export default class extends Vue {
    @Getter( "getEventLogs", { namespace: "event-logs" } ) getEventLogs;

    @Getter( "getPosts", { namespace: "posts" } ) getPosts;

    @Action( "fetchEventLogs", { namespace: "event-logs" } ) fetchEventLogs;

    @Action( "fetchPosts", { namespace: "posts" } ) fetchPosts;
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

  .section + .section {
    padding-top: 0;
  }
</style>
