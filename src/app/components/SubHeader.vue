<template>
  <v-layout align-center
            justify-center>
    <v-flex v-if="getIsWeb3" xs12
            class="text-xs-right pt-3 px-3 white--text subheading"
            style="word-break: break-all;"
    >
      {{ getAccount }} さん
    </v-flex>
    <v-flex v-else xs6 class="notice-to-use-metamask my-3 px-3 py-3 subheading"
            xs8>
      <span>本サービスの利用には</span>
      <strong>
        <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja">
          MetaMask
        </a>
      </strong>
      <span>が必須になります。</span>
    </v-flex>

  </v-layout>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Getter } from "vuex-class";

  @Component( {} )
  export default class extends Vue {
    @Getter( 'getAccount' ) getAccount;
    @Getter( 'getIsWeb3' ) getIsWeb3;

    data() {
      return {};
    }
  }
</script>


<style scoped lang="scss">
  .notice-to-use-metamask {
    border: 2px solid #fb8c00;
    border-radius: 10px;
    background: white;
    height: 60px;
    min-width: 320px;
    text-align: center;
  }
</style>
