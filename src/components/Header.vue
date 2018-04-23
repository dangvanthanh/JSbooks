<template>
  <header role="banner" class="shadow px-4 bg-yellow">
    <div class="container mx-auto">
      <nav class="flex">
        <router-link
          to="/"
          class="text-grey-darkest text-base flex items-center no-underline router-link-exact-active router-link-active p-3 w-2/5 md:w-1/5">
          <img src="assets/images/logo_jsbooks.png" alt="">
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader'
}
</script>

<style>
</style>
