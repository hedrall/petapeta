<template>

  <div>
    <button class="button is-link back" @click="back">back</button>

    <section class="section">
      <h1 class="title">{{ post && post.url }}</h1>
      <h2 class="subtitle">{{ post && post.public_address }} さん</h2>



      <h1>{{ post_id }}</h1>
    </section>
  </div>
</template>

<script lang="ts">
  import { Component } from "nuxt-property-decorator";

  import { Post, PostApiResponse } from "../types/post";
  import { MyVue } from '~/types/types';

  @Component( {} )
  export default class extends MyVue {
    post_id: number;
    post: Post = new Post({});

    components = {};

    async asyncData ({params}) {
      // await app.getPost();
      return {
        // context,
        post: null,
        post_id: params['id']
      };
    }

    async mounted() {
      console.log(this.post);
      this.getPost();
    };

    async getPost () {
      const result: PostApiResponse = await this.$axios.$get( '/api/post/id.json' );
      this.post = new Post(result.post);
    }

    back() {
      this.$router.go( -1 );
    }
  }
</script>

<style scoped lang="scss">

</style>
