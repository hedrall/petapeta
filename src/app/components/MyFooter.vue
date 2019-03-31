<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <div class="soc">
          <a href="#"><i class="fab fa-github-alt fa-2x" aria-hidden="true"></i></a>
          <a href="#"><i class="fab fa-youtube fa-2x" aria-hidden="true"></i></a>
          <a href="#"><i class="fab fa-facebook fa-2x" aria-hidden="true"></i></a>
          <a href="#"><i class="fab fa-twitter fa-2x" aria-hidden="true"></i></a>
        </div>
        <p>
          <strong>PetaPeta</strong> by <a href="http://www.asahi.com">Asahi Shimbun</a>.
                                    The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">Us</a>. <br>
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator"

  @Component({})
  export default class extends Vue {}
</script>


<style scoped lang="scss">
  p,
  i,
  strong {
    color: white;
  }
  a {
    color: $main-theme;
  }
  i {
    margin: 10px;
  }
  .columns {
    margin-top: 0;
  }
  .footer {
    background: #222831;
    padding: 45px 0 0 0;
    height: 230px;
  }
</style>
