<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
        <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
      </ul>
    </nav>
  </header>
<ol>
  <li  v-for="item in data" :key="item">
    <a :href="'/posts/'+item"> {{ item }} </a>
</li>
</ol>
</template>

<script setup>
  import {} from "vue";
  const res = await useFetch("https://api.goldpanda.net/api/news?action=get-data-ids&category=battery", {
  method: "get",
  id: 1,
});
  console.log(res.data);
  const data = res.data;
</script>

<style scoped></style>