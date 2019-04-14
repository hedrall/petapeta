<template>
  <v-layout row wrap>
    <v-flex xs12 class="mb-3">
      <nuxt-link
              to="/"
              class="back-button indigo--text darken-2 subheading px-3 py-2"
              style="border-radius: 5px; text-decoration: none"
              @click="back">< back
      </nuxt-link>
    </v-flex>

    <v-flex xs12 v-if="post">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-text>
              <div v-if="isFinished()">
                <v-chip color="elevation-4 warning" text-color="white">
                  終了
                </v-chip>
              </div>
              <h1 class="headline indigo--text text--darken-2">
                <a :href="post.url" style="text-decoration: none">{{ post.url }}</a>
              </h1>

              <p class="body-1 grey--text text--darken-3">{{ post.public_address }} さん</p>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card>
            <v-card-title class="pb-0">
              <v-chip color="elevation-4 primary" text-color="white">
                協力者のみなさまへのメッセージ
              </v-chip>
            </v-card-title>

            <v-card-text>
              <p class="subheading grey--text text--darken-2 mb-0">
                {{ post.message }}
              </p>
            </v-card-text>
          </v-card>

        </v-flex>

        <v-flex md6>
          <v-card height="100%">
            <v-card-title class="pb-0">
              <v-chip color="elevation-4 primary" text-color="white">
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
              <v-chip :color="isFinished() ? 'default' : 'primary' "
                      text-color="white"
                      class="elevation-4"
              >
                期限
              </v-chip>
            </v-card-title>

            <v-card-text class="text-xs-center">
              <p class="display-1 grey--text text--darken-2">{{ date( post.deadline ) }}</p>
              <p>残り {{ remaining( post.deadline, now ) }}</p>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12>
          <v-card height="100%">

            <!--ソート -->
            <v-bottom-nav
                    :active.sync="sortMethod"
                    :value="true"
                    color="transparent"
                    shift
            >
              <v-btn
                      color="teal"
                      flat
                      value="recent"
              >
                <span>最新</span>
                <v-icon>history</v-icon>
              </v-btn>

              <v-btn
                      color="teal"
                      flat
                      value="favorites"
              >
                <span>お気に入り</span>
                <v-icon>favorite</v-icon>
              </v-btn>

              <v-btn
                      color="teal"
                      flat
                      value="retweets"
              >
                <span>リツイート</span>
                <v-icon>fas fa-retweet</v-icon>
              </v-btn>
            </v-bottom-nav>

            <v-card-title class="pb-0 justify-space-between">
              <v-chip color="primary"
                      text-color="white"
                      class="elevation-4"
              >
                協力者
              </v-chip>
              <spread :post="post"></spread>
            </v-card-title>


            <v-card-text>
              <v-timeline
                      :dense="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
              >
                <v-timeline-item
                        v-for="collaborator in post.collaborators"
                        color="indigo lighten-1"
                        large
                >
                  <template v-slot:opposite>
                    <span>{{ date(collaborator.created_at) }}</span>
                  </template>
                  <v-card class="elevation-2">
                    <v-card-title class="headline pb-0 justify-space-between">
                      {{ collaborator.account_name }} さん
                      <v-icon color="primary">fab fa-twitter</v-icon>
                    </v-card-title>
                    <v-card-text class="pt-2">
                      {{ collaborator.content }}
                      <div v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
                           class="grey--text text--darken-2 text-xs-right"
                      >
                        {{ collaborator.created_at }}
                      </div>
                      <div style="overflow: hidden;">

                        <a :href="collaborator.diffusion_url"
                           style="text-decoration: none;">
                          URL:{{ collaborator.diffusion_url }}
                        </a>
                      </div>
                      <v-layout>
                        <v-flex sm4></v-flex>
                        <v-flex sm4>
                          <v-layout
                                  align-center
                                  justify-center
                          >
                            <v-icon color="error" class="mr-1">fas fa-heart</v-icon>
                            {{ collaborator.favorites }}
                          </v-layout>
                        </v-flex>
                        <v-flex sm4>
                          <v-layout
                                  align-center
                                  justify-center>
                            <v-icon color="success" class="mr-1">fas fa-retweet</v-icon>
                            {{ collaborator.retweets }}
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>

            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>

  </v-layout>
</template>

<script lang="ts">
  import { Component, Watch } from 'nuxt-property-decorator';

  import { Post, PostApiResponse } from '../types/post';
  import { MyVue } from '~/types/types';
  import Spread from '~/components/Spread.vue';
  import { Collaborator } from '~/types/collaborator';

  @Component( {
    components: { Spread }
  } )
  export default class extends MyVue {
    post_id: number;

    post: Post = new Post( {} );

    now: string = this.$moment();

    sortMethod: 'recent' | 'favorites' | 'retweets' | '' = '';

    components = {
      Spread
    };

    async asyncData( { params } ) {
      // await app.getPost();
      return {
        // context,
        post:    null,
        post_id: params[ 'id' ]
      };
    }

    async mounted() {
      await this.getPost();

      this.sortMethod = 'recent';

      // 残り時間カウント表示
      setInterval( _ => {
        this.now = this.$moment();
      }, 1000 );
    };

    // 投稿を取得する
    async getPost() {
      const result: PostApiResponse = await this.$axios.$get( '/api/post/id.json' );
      this.post                     = new Post( result.post );
      console.log( '投稿を取得' );
      console.log( this.post );
    }

    date = function ( date: string ): string {
      return this.$moment( date ).format( 'YYYY/MM/DD' );
    };

    // 拡散協力期限が終了しているか
    isFinished() {
      const date = this.$moment( this.post.deadline ).add( 1, 'days' );
      return this.$moment( date ).diff( this.now ) < 0;
    }

    remaining = ( date: string, now: any ): string => {
      date = this.$moment( date ).add( 1, 'days' );
      if ( this.$moment( date ).diff( now ) < 0 ) {
        return '--日 --時間 --分 --秒';
      }
      const days    = this.$moment( date ).diff( this.$moment( now ), 'days' );
      const hours   = this.$moment( date ).diff( this.$moment( now ), 'hours' ) % 24;
      const minutes = this.$moment( date ).diff( this.$moment( now ), 'minutes' ) % 60;
      const seconds = this.$moment( date ).diff( this.$moment( now ), 'seconds' ) % 60;
      return `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
    };

    back() {
      this.$router.go( -1 );
    }

    @Watch( 'sortMethod' )
    onChangeSortMethod( _new ) {
      let sortFn;
      switch ( _new ) {
        case 'favorites':
          sortFn = ( a: Collaborator, b: Collaborator ): number => {
            if ( a.favorites === b.favorites) return 0;
            return ( a.favorites > b.favorites ) ? -1 : 1;
          };
          break;
        case 'retweets':
          sortFn = ( a: Collaborator, b: Collaborator ): number => {
            if ( a.retweets === b.retweets) return 0;
            return ( a.retweets > b.retweets ) ? -1 : 1;
          };
          break;
        case 'recent':
          sortFn = ( a: Collaborator, b: Collaborator ): number => {
            const diff = this.$moment( a.created_at ).diff( this.$moment( b.created_at ) );
            if ( diff === 0 ) return 0;
            return ( diff > 0 ) ? -1 : 1;
          };
          break;
        default:
          return;
      }
      this.post.collaborators = this.post.collaborators.sort( sortFn );
    }
  }
</script>

<style scoped lang="scss">
  .back-button {
    cursor: pointer;
    transition: background ease-in-out .3s;

    &:hover {
      background: $hover-background;
    }
  }

</style>
