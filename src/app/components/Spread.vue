<template>
  <div>
    <v-btn color="info" @click="dialog = true">協力する</v-btn>
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
               data-show-count="false">呟く</a>
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
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

  @Component( {} )
  export default class Spread extends MyVue {
    @Getter( "getAccount" ) getAccount;

    @Prop() post!: string;

    dialog: boolean = false;

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
