<template>
  <div>

    <post-list-paginate/>

    <v-layout row wrap text-xs-center>

      <v-flex v-if="postsLoading">
        <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
        ></v-progress-circular>
      </v-flex>

      <v-flex class="column" v-for="post of getPosts" xs12 sm6 md4 lg3>
        <v-hover>
          <v-card :class="`elevation-${hover ? 12 : 2}`"
                  slot-scope="{ hover }"
                  @click="routing($event, post.id)">
            <v-card-title primary-title class="pb-1">
              <div class="title">
                <a class="subheading indigo--text text--darken-2 text-xs-left"
                   style="display: block; text-decoration: none"
                   :href="post.url"
                   target="_blank"
                >
                  {{ post.url }}
                </a>
              </div>
            </v-card-title>

            <v-card-text class="message pt-0 pb-0 text-xs-left">
              <span class="grey--text text--darken-2">{{ post.message }}</span>
            </v-card-text>

            <v-card-actions>
              <v-list-tile class="grow">

                <img class="image"
                     height="30"
                     src="@/assets/imgs/icons8-ethereum.svg"
                     alt="ethereum icon">
                <v-list-tile-content>
                  <v-list-tile-title>{{ post.deposit }}</v-list-tile-title>
                </v-list-tile-content>


                <div class="body-1 grey--text text--darken-1">
                  <span v-if="post.status === PostStatuses.open">
                    期限:
                  </span>
                  <span v-else-if="post.status === PostStatuses.close">
                    終了:
                  </span>
                  {{ date(post.deadline ) }}
                </div>
              </v-list-tile>
            </v-card-actions>
          </v-card>
        </v-hover>

      </v-flex>

    </v-layout>

    <post-list-paginate/>

  </div>
</template>

<script lang="ts">
  import { Component } from "nuxt-property-decorator";
  import { Getter } from "vuex-class";
  import PostListPaginate from "~/components/PostListPaginate.vue";
  import { MyVue, PostStatuses } from "~/types/types";

  @Component( {
    components: { PostListPaginate }
  } )
  export default class extends MyVue {
    $router;

    @Getter( "getPosts", { namespace: "posts" } ) getPosts;

    @Getter( "getLoading", { namespace: "posts" } ) postsLoading;

    components = {
      PostListPaginate
    };

    data() {
      return {
        PostStatuses
      };
    };

    date = function ( date ) {
      return this.$moment( date ).format( "YYYY/MM/DD" );
    };

    routing( event, id ) {
      if ( event.target.tagName !== 'A' ) {
        this.$router.push( "" + id );
      }
    }
  }
</script>

<style scoped lang="scss">
  .title {
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .message {
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 5;
    overflow: hidden;
    height: 101px;
  }
</style>
