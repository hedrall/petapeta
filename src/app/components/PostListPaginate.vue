<template>
  <div class="text-xs-center">
    <v-pagination
        v-model="page"
        :length="getTotalPages.length"
        :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Action, Getter } from "vuex-class";

  @Component
  export default class extends Vue {
    @Getter( "getCurrentPage", { namespace: "posts" } ) getCurrentPage;

    @Getter( "getTotalPages", { namespace: "posts" } ) getTotalPages;

    @Action( "fetchPosts", { namespace: "posts" } ) fetchPosts;

    get page () {
      return this.getCurrentPage;
    }

    set page ( value ) {
      this.paginate( value );
    }

    async paginate( next_page: number ) {
      if (
        next_page < 1 ||
        next_page > this.getTotalPages.length ||
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
