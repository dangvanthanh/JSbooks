<template>
  <div class="app" id="app">
    <site-header />
    <main role="main" class="pt-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import SiteHeader from '@/components/Header.vue';

export default {
  name: 'app',
  components: { SiteHeader }
}
</script>

<style>
body {
  font-size: 1em;
  line-height: 1.6;
}
</style>
