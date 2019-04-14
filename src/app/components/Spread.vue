<template>
  <div>
    <v-btn color="info" @click="showDialog">協力する</v-btn>
    <v-dialog
            v-model="dialog"
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>拡散に協力する</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <form>
            <p class="primary--text subheading">
              ステップ1. Twitterで拡散する
            </p>

            <v-text-field
                    v-model="post.url"
                    label="拡散協力するURL"
                    placehosder="拡散協力するURL"
                    outline
                    readonly
                    required
            ></v-text-field>

            <v-text-field
                    v-model="$store.state.account"
                    :counter="42"
                    label="あなたのEthアドレス"
                    placehosder="あなたのEthアドレス"
                    outline
                    readonly
                    required
            ></v-text-field>
          </form>

          <div class="pl-1">
            <p class="warning--text">
              > tweetには「拡散協力するURL」と「あなたのEthアドレス」を必ず記載してください。
            </p>
            <p class="warning--text">
              > 上記の記載がない場合は報酬の対象外になります。
            </p>
          </div>

          <v-layout v-if="isAccount"
                    justify-center
          >
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw"
               class="twitter-share-button"
               :data-text="`応援しています！ by ${$store.state.account}`"
               :data-url="post.url"
               data-hashtags="petapeta"
               data-size="large"
               data-show-count="false"
               target="_blank"
            >呟く</a>
          </v-layout>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <form>
            <p class="primary--text subheading">
              ステップ2. 拡散したTweetページを登録する
            </p>

            <v-text-field
                    v-model="tweetUrl"
                    label="TweetページのURL"
                    placehosder="TweetページのURL"
                    :error-messages="tweetUrlErrors"
                    outline
                    required
                    @input="$v.tweetUrl.$touch()"
                    @blur="$v.tweetUrl.$touch()"
            ></v-text-field>

          </form>
          <v-layout justify-center>
            <v-btn color="info" @click="showDialog">登録する</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Watch } from "nuxt-property-decorator";
  import { MyVue } from "~/types/types";
  import { Getter } from "vuex-class";
  import { isValidTweetUrl } from '~/util/validation';

  @(Component as any)( {
    validations: {
      tweetUrl: {
        isValidTweetUrl
      },
    }
  } )
  export default class Spread extends MyVue {
    @Getter( "getAccount" ) getAccount;

    @Prop() post!: string;

    dialog: boolean = false;

    tweetUrl: string = '';

    get tweetUrlErrors () {
      const errors = [];
      if (!this.$v.tweetUrl.$dirty) return [];

      // !this.$v.email.email && errors.push('Must be valid e-mail')
      // !this.$v.email.required && errors.push('E-mail is required')
      console.log('is error?');
      console.log(this.$v);
      console.log(this.$v.tweetUrl);

      !this.$v.tweetUrl.isValidTweetUrl && errors.push('TweetのURLの形式が正しくありません。');

      return errors
    };

    showDialog() {
      this.dialog = true;

      // share button を初期化
      this.$twttr.ready( ( twttr ) => {
        twttr.widgets.load();

        // twttr.events.bind( "tweet", () => {} );
      } );

    }

    isAccount: boolean = false;

    mounted() {
      this.isAccount = !!this.getAccount;
    }

    @Watch( "getAccount" )
    onAccountChange( _new ) {
      this.isAccount = !!_new;
    };

  }
</script>

<style lang="scss" scoped>

</style>
