<template>
  <v-toolbar app class="header columns primary">
    <div class="logo column is-8">
      <img src="~/assets/imgs/petapeta_logo.png">
    </div>
    <div class="login column is-4">
    </div>
  </v-toolbar>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator"

  @Component({
    async asyncData() {

    }
  })
  export default class extends Vue {}
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
</style>
