<template>
  <v-app>
    <!--<v-navigation-drawer app></v-navigation-drawer>-->
    <my-header/>
    <v-content class="default-layout">
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
    <my-footer/>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator"
  import MyHeader from '~/components/MyHeader.vue'
  import MyFooter from '~/components/MyFooter.vue'

  @Component({
    components: {
      MyHeader,
      MyFooter
    }
  })
  export default class extends Vue {}
</script>

<style lang="scss">
  html {
    body {
      margin: 0;
    }

    .default-layout {
      min-height: calc(100vh - 60px - 230px - 0.75rem);
    }
  }


</style>
