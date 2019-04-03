<template>
  <div>
    <post-list-paginate/>

    <div class="post-container columns is-multiline">

      <progress class="progress is-small is-primary"
                max="100"
                v-if="postsLoading"
      >15%
      </progress>

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

    <post-list-paginate/>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Getter } from "vuex-class";
  import PostListPaginate from "~/components/PostListPaginate.vue";
  import { PostStatuses } from '~/types/types';

  @Component( {
    components: { PostListPaginate }
  } )
  export default class extends Vue {
    @Getter( "getPosts", { namespace: "posts" } ) getPosts;

    @Getter( "getLoading", { namespace: "posts" } ) postsLoading;

    components = {
      PostListPaginate
    };

    data () {
      return {
        PostStatuses
      };
    };
  }
</script>

<style scoped lang="scss">
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
</style>
