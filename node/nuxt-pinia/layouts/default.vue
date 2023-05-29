<template>
  <!-- TODO: add after https://github.com/nuxt/framework/issues/1909 -->
  <!-- <Head lang="en-US">
    <Title>⚡️🍍 Pinia + Nuxt 3</Title>
  </Head>-->

  <header>
    <h1>Pinia</h1>
    <p>The intuitive store for Vue</p>
  </header>

  <template v-if="route.path !== '/'">
    <router-link to="/">→ Back Home</router-link>
    <hr />
  </template>

  <slot />

  <hr />

  <footer>
    <router-link to="/"> Home</router-link>
    <router-link to="/two"> two</router-link>
  </footer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.logo {
  width: 1.5rem;
  height: 1.5rem;
  max-width: 100%;
  margin-bottom: 0;
  color: white;
}
</style>
