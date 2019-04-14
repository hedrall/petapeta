<template>
  <div>
    <v-btn color="info" @click="showDialog">協力する</v-btn>
    <v-snackbar
            v-model="snackbar"
            :right="'right'"
            :top="'top'"
            :vertical="'vertical'"
            color="success"
            @click="snackbar = false"
    >
      登録が完了しました。
      <v-btn
              color="white-text"
              flat
              @click="snackbar = false"
      >
        閉じる
      </v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog">
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click="close();">
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
            <v-btn color="primary"
                   @click="register"
                   :loading="registering"
            >登録する</v-btn>
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
  import { required } from 'vuelidate/lib/validators';

  @(Component as any)( {
    validations: {
      tweetUrl: {
        isValidTweetUrl,
        required
      },
    }
  } )
  export default class Spread extends MyVue {
    @Getter( "getAccount" ) getAccount;

    @Prop() post!: string;

    dialog: boolean = false;

    registering: boolean = false;

    tweetUrl: string = '';

    snackbar: boolean = false;

    // tweet URL 登録フォームのエラーメッセージを設定
    get tweetUrlErrors () {
      const errors = [];
      if (!this.$v.tweetUrl.$dirty) return [];

      !this.$v.tweetUrl.required && errors.push('TweetのURLは必須です。');
      !this.$v.tweetUrl.isValidTweetUrl && errors.push('TweetのURLの形式が正しくありません。');

      return errors
    };

    // ダイアログを見せる時の動作
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

    close () {
      this.dialog = false;
    };

    // 拡散 Tweet の Url 登録処理
    register () {

      this.$v.$touch();

      if ( this.$v.$invalid ) {
        return;
      }
      this.registering = true;

      setTimeout( _ => {
        this.registering = false;
        this.dialog = false;
        this.snackbar = true;
      }, 1000);

    };

    @Watch( "getAccount" )
    onAccountChange( _new ) {
      this.isAccount = !!_new;
    };

  }
</script>

<style lang="scss" scoped>

</style>
