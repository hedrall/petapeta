<template>
  <div row wrap>

    <!-- イベントログ -->
    <section class="xs12 section">
      <v-chip class="mb-3" color="primary" text-color="white">イベントログ</v-chip>

      <event-logs />
    </section>

    <!-- 投稿一覧 -->
    <section class="section xs12">

      <v-chip class="mb-3" color="primary" text-color="white">投稿一覧</v-chip>

      <posts-list />

    </section>
  </div>
</template>

<script lang="ts">
  import { Component } from "nuxt-property-decorator";
  import { Action, Getter } from "vuex-class";
  import { MyVue, PostStatuses } from "~/types/types";
  import EventLogs from '~/components/EventLogs.vue';
  import PostsList from '~/components/PostsList.vue';
  import PostListPaginate from '~/components/PostListPaginate.vue';

  @Component( {
    components: { EventLogs, PostsList, PostListPaginate }
  } )
  export default class extends MyVue {
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
      const tasks = [];

      if ( this.getEventLogs.length === 0 ) {
        tasks.push( this.fetchEventLogs() );
      }
      if ( this.getPosts.length === 0 ) {
        tasks.push( this.fetchPosts( { next_page: 1 } ) );
      }
      if (tasks.length > 0) {
        await Promise.all( tasks );
      }

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
</style>
