<template>
  <div>
    <nav class="pagination" role="navigation" aria-label="pagination">
      <a class="pagination-previous"
         @click="paginate(getCurrentPage - 1)"
         title="This is the first page"
         :disabled="getCurrentPage === 1">
        前へ
      </a>
      <a class="pagination-next"
         @click="paginate(getCurrentPage + 1)"
         :disabled="getCurrentPage === getTotalPages.length">
        次へ
      </a>
      <ul class="pagination-list">
        <li>
          <a v-for="page_number of getTotalPages"
             @click="paginate(page_number)"
             class="pagination-link" :class="{ 'is-current': getCurrentPage === page_number }"
             :aria-label="'Page ' + page_number"
             aria-current="page">
            {{ page_number }}
          </a>
        </li>
      </ul>
      <span class="current-total"> {{ getCurrentPage }} / {{ getTotalPages.length }} ページ</span>
    </nav>
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
