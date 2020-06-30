<template>
  <div id="app">
    <router-view />
    <br />
    <br />
    <footer class="usa-footer usa-footer--slim">
      <div class="grid-container usa-footer__return-to-top">
        <a href="#">Return to top</a>
      </div>

      <div class="usa-footer__secondary-section">
        <div class="grid-container">
          <div class="usa-footer__logo grid-row grid-gap-2">
            <div class="grid-col-auto">
              <img class="usa-footer__logo-img" src="/assets/img/logo-img.png" alt />
            </div>
            <div class="grid-col-auto">
              <h5 class>&copy; Thumbs Up Solutions</h5>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
@import "~uswds/dist/css/uswds.css";
.subheader {
  margin-left: 25px;
}
</style>

