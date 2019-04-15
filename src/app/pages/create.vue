<template>
  <div row wrap>
    
    <v-card>
      <v-card-text>
        <form>
          <p class="primary--text subheading">
            ステップ1. 投稿の情報を記載
          </p>

          <v-text-field
                  :value="getAccount"
                  label="あなたのパブリックアドレス"
                  placehosder="あなたのパブリックアドレス"
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
      </v-card-text>
    </v-card>

  </div>
</template>

<script lang="ts">
  import { Component } from "nuxt-property-decorator";
  import { MyVue } from '~/types/types';
  import { Getter } from 'vuex-class';

  @Component( {
    components: {}
  } )
  export default class extends MyVue {
    @Getter( "getAccount" ) getAccount;

  }
</script>

<style scoped lang="scss">

</style>
