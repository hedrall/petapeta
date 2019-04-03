<template>
  <div>

    <!-- イベントログ -->
    <section class="section">
      <span class="tag is-primary is-medium section-title">イベントログ</span>
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

      <span class="tag is-primary is-medium section-title">投稿一覧</span>

      <posts-list />

    </section>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Action, Getter } from "vuex-class";
  import { PostStatuses } from "~/types/types";
  import PostListPaginate from '~/components/PostListPaginate.vue';
  import PostsList from '~/components/PostsList.vue';

  @Component( {
    components: { PostListPaginate, PostsList }
  } )
  export default class extends Vue {
    @Getter( "getEventLogs", { namespace: "event-logs" } ) getEventLogs;

    @Getter( "getPosts", { namespace: "posts" } ) getPosts;

    @Getter( "getCurrentPage", { namespace: "posts" } ) getCurrentPage;

    @Getter( "getTotalPages", { namespace: "posts" } ) getTotalPages;

    @Getter( "getLoading", { namespace: "posts" } ) postsLoading;

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
        return;
      }
      await this.fetchPosts( { next_page } );
    }


  }
</script>

<style scoped lang="scss">

  .tag {
    margin-bottom: 0.75rem
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

  .post-container {
    margin-top: 0.75rem;

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
