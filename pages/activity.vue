<template>
  <Activity />
</template>
<script setup>
import mitt from 'mitt'
const emitter = mitt()
const { $bus } = useNuxtApp()
onUpdated(() => {
  definePageMeta({
    layout: 'useradmin',
  })
})
</script>
