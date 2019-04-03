<template>
  <div>

    <!-- イベントログ -->
    <section class="section">
      <span class="tag is-primary is-medium">イベントログ</span>
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
    </section>

    <!-- 投稿一覧 -->
    <section class="section">
      <span class="tag is-primary is-medium">投稿一覧</span>

      <post-list-paginate />

      <div class="post-container columns is-multiline">
        <div class="column is-4" v-for="post of getPosts">
          <div class="card">

            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <div class="status has-text-right">
                    <span class="tag is-info is-right" v-if="post.status === PostStatuses.open">募集中</span>
                    <span class="tag is-light" v-else-if="post.status === PostStatuses.close">終了</span>
                  </div>
                  <a :href="post.url" class="title is-6">{{ post.url }}</a>
                  <p class="subtitle is-7">{{ post.public_address }}</p>
                </div>
              </div>

              <div class="content">
                <div class="post-message">
                  {{ post.message }}
                </div>
                <div class="time-deposit">
                  <img class="image is-24x24"
                       src="@/assets/imgs/icons8-ethereum.svg"
                       alt="ethereum icon">
                  {{ post.deposit }} ETH
                  <time :datetime="2016-1-1" class="has-text-grey is-size-7">
                    <span v-if="post.status === PostStatuses.open">期限</span>
                    <span v-else-if="post.status === PostStatuses.close">終了日</span>
                    {{ post.deadline }}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <post-list-paginate />

    </section>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Action, Getter } from "vuex-class";
  import { PostStatuses } from "~/types/types";
  import PostListPaginate from '~/components/PostListPaginate.vue';
  @Component( {
    components: { PostListPaginate }
  } )
  export default class extends Vue {
    @Getter( "getEventLogs", { namespace: "event-logs" } ) getEventLogs;

    @Getter( "getPosts", { namespace: "posts" } ) getPosts;

    @Getter( "getCurrentPage", { namespace: "posts" } ) getCurrentPage;

    @Getter( "getTotalPages", { namespace: "posts" } ) getTotalPages;

    @Action( "fetchEventLogs", { namespace: "event-logs" } ) fetchEventLogs;

    @Action( "fetchPosts", { namespace: "posts" } ) fetchPosts;

    components = {
      PostListPaginate
    };

    async mounted() {
      await Promise.all( [
        this.fetchEventLogs(),
        this.fetchPosts( { next_page: 1 } )
      ] );
    };

    async asyncData ( {} ) {
      return {
        PostStatuses
      };
      // await store.dispatch('event-logs/fetchEventLogs');
    };

    async paginate( next_page: number ) {
      if (
        next_page < 1 ||
        next_page > this.getTotalPages ||
        this.getCurrentPage === next_page
      ) {
        console.log( 'can not paginate' );
        return;
      }
      console.log( next_page );
      await this.fetchPosts( { next_page } );
    }


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

  .card {
    min-height: 100%;

    .card-content {

      &:hover {
        background: $hover-background;
      }

      .media {
        .media-content {
          width: 100%;

          > .title, .subtitle {
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
          }

          > a {
            display: block;
            color: $main-theme;
          }
        }
      }

      .content {
        .post-message {
          display: -webkit-box;
          /* autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .time-deposit {
          margin-top: 10px;

          img {
            display: inline;
            vertical-align: bottom;
          }

          time {
            float: right;
            margin-top: 4px;
          }
        }
      }
    }
  }

  .pagination {
    .pagination-list {
      flex-grow: 0;
    }
    .current-total {
      flex-grow: 1;
      flex-shrink: 1;
      order: 1;
    }
  }
</style>
