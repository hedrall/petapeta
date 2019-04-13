<template>
  <v-app class="indigo lighten-3">
    <my-header style="z-index: 100"/>
    <sub-header/>
    <v-content class="default-layout">
      <v-container grid-list-md>
        <nuxt/>
      </v-container>
    </v-content>
    <my-footer/>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import { Web3Provider } from "~/web3Provider";
  import { Action } from "vuex-class";
  import MyHeader from "~/components/MyHeader.vue";
  import MyFooter from "~/components/MyFooter.vue";
  import SubHeader from '~/components/SubHeader.vue';

  @Component( {
    components: {
      MyHeader,
      MyFooter,
      SubHeader
    }
  } )
  export default class extends Vue {
    @Action( "setWeb3Info" ) setWeb3Info;

    async mounted() {
      console.log('mounted Default Layout');
      await Web3Provider.setWeb3();
      await this.setWeb3Info();
      console.log('mounted Default Layout end');
    };
  }
</script>

<style lang="scss">
  html {
    body {
      margin: 0;
    }

    .default-layout {
      padding-top: 20px !important;
      min-height: calc(100vh - 60px - 230px - 0.75rem);
    }
  }


</style>
