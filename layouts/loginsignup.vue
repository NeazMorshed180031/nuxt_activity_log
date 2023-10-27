<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav
        class="flex flex-col container mx-auto p-4 sm:flex-row justify-between text-center gap-2"
      >
        <div>
          <NuxtLink to="/" class="font-bold text-blue-800">
            <myImage />
          </NuxtLink>
        </div>
        <ul class="items-center flex flex-col gap-4 sm:flex-row">
          <li>
            <NuxtLink to="/register" class="btn bg-blue-800">Sign Up</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="btn bg-blue-800">
              Login
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <div class="container mx-auto">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  text-decoration-color: white;
}
</style>
<script setup>
const myImage = h('img', { src: '/image/logo-Usable-450x300 (3).png' })
</script>
