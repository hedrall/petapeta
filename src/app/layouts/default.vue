<template>
  <div class="default-layout">
    <my-header />
    <v-app>
      <v-btn color="success">Success</v-btn>
      <v-btn color="error">Error</v-btn>
      <v-btn color="warning">Warning</v-btn>
      <v-btn color="info">Info</v-btn>
    </v-app>
    <v-btn color="success">Success</v-btn>
    <div class="container default-layout">
      <nuxt/>
    </div>
    <my-footer />
  </div>
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
    .default-layout {
      min-height: calc(100vh - 60px - 230px - 0.75rem);
    }
  }

</style>
