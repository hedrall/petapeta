<template>
  <v-toolbar app class="header columns primary">
    <v-layout wrap row>
      <v-flex class="logo column" xs6>
        <img src="~/assets/imgs/petapeta_logo.png">
      </v-flex>

      <v-layout xs6 style="display: flex;"
                justify-end>
        <v-chip class="login warning">
          {{ getNetWorkName }}
        </v-chip>
      </v-layout>

    </v-layout>

  </v-toolbar>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator"
  import { Getter } from 'vuex-class';

  @Component({
  })
  export default class extends Vue {
    @Getter( 'getNetWorkName' ) getNetWorkName;

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
</style>
