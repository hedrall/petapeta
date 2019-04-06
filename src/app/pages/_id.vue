<template>
  <v-layout row wrap>
    <v-flex xs12 class="mb-3">
      <span class="indigo--text darken-2 subheading" @click="back">< back</span>
    </v-flex>

    <v-flex xs12 v-if="post" >
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="headline indigo--text text--darken-2">
            <a :href="post.url" style="text-decoration: none">{{ post.url }}</a>
          </h1>

          <p class="body-1 grey--text text--darken-3">{{ post.public_address }} さん</p>
        </v-flex>

        <v-flex md6>
          <v-card height="100%">
            <v-card-title class="pb-0">
              <v-chip color="primary" text-color="white">
                デポジット
              </v-chip>
            </v-card-title>

            <v-card-text>
              <v-layout class="justify-center">
                <img class="image"
                     height="45"
                     src="@/assets/imgs/icons8-ethereum.svg"
                     alt="ethereum icon"/>
                <span class="display-2 grey--text text--darken-2">
                  {{ post.deposit }}
                </span>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md6>
          <v-card height="100%">
            <v-card-title class="pb-0">
              <v-chip color="primary" text-color="white">
                期限
              </v-chip>
            </v-card-title>

            <v-card-text class="text-xs-center">
              <p class="display-1 grey--text text--darken-2">{{ date( post.deadline ) }}</p>
              <p>残り {{ remaining( post.deadline ) }}</p>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md12>
          <v-card height="100%">
            <v-card-title class="pb-0 justify-space-between">
              <v-chip color="primary" text-color="white">
                協力者
              </v-chip>
              <v-btn color="info">協力する</v-btn>
            </v-card-title>

            <v-card-text>

            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>


    <h1>{{ post_id }}</h1>
  </v-layout>
</template>

<script lang="ts">
  import { Component } from "nuxt-property-decorator";

  import { Post, PostApiResponse } from "../types/post";
  import { MyVue } from "~/types/types";

  @Component( {} )
  export default class extends MyVue {
    post_id: number;

    post: Post = new Post( {} );

    components = {};

    async asyncData( { params } ) {
      // await app.getPost();
      return {
        // context,
        post:    null,
        post_id: params[ "id" ]
      };
    }

    async mounted() {
      console.log( this.post );
      this.getPost();
    };

    async getPost() {
      const result: PostApiResponse = await this.$axios.$get( "/api/post/id.json" );
      this.post                     = new Post( result.post );
    }

    date = function ( date: string ): string {
      return this.$moment( date ).format( "YYYY/MM/DD" );
    };

    remaining = ( date: string ): string => {
      const now = this.$moment();
      date = this.$moment(date).add(1, 'days');
      const days = this.$moment( date ).diff(this.$moment( now ), 'days');
      const hours = this.$moment( date ).diff(this.$moment( now ), 'hours') % 24;
      const minutes = this.$moment( date ).diff(this.$moment( now ), 'minutes') % 60;
      return `${days}日 ${hours}時間 ${minutes}分`;
    };

    back() {
      this.$router.go( -1 );
    }
  }
</script>

<style scoped lang="scss">

</style>
