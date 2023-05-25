<template>
    <h1>{{ data.title}}</h1> 
  <div class="">获取的id:{{ id }}</div>

  {{ data.label}}
  {{ data.published}}
  {{ data.url}}
  {{ data.image}}
  source: {{ data.source}}
<hr>
    {{ data.content}}
      
</template>

<script setup>
const route = useRoute()
const id = ref(route.params.id);
// When accessing /posts/1, route.params.id will be 1
import {} from "vue";
  const res = await useFetch("https://api.goldpanda.net/api/news?action=get-data-info&ID="+route.params.id, {
  method: "get",
  id: 1,
});
  console.log(res);
  const data = res.data;
console.log(route.params.id)
</script>