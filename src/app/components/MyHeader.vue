<template>
  <div>
  <v-toolbar app class="header columns primary">
    <v-layout wrap row>
      <v-flex class="logo column" xs6>
        <img src="~/assets/imgs/petapeta_logo.png">
      </v-flex>


      <v-flex class="login" xs6>

      </v-flex>
    </v-layout>

  </v-toolbar>
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
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator"
  import { Getter } from 'vuex-class';

  @Component({
  })
  export default class extends Vue {
    @Getter( 'getAccount' ) getAccount;
    @Getter( 'getIsWeb3' ) getIsWeb3;

    data () {
      return {}
    }
  }
</script>


<style scoped lang="scss">
  .columns {
    margin-top: 0;
  }
  .header {
    background: $main-theme;
    z-index: 1;
    height: 60px;
    padding: 0 30px;
    position: sticky;
    top: 0;

    .logo {
      img {
        height: 45px;
      }
    }

    .login {
      color: white;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .notice-to-use-metamask {
    border: 2px solid #fb8c00;
    border-radius: 10px;
    background: white;
    height: 60px;
    min-width: 320px;
    text-align: center;
  }
</style>
