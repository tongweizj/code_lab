<script setup></script>
<template>
  <div>
    <h1>Welcome to the homepage1</h1>
    <ul>
      <li>
        <nuxt-link to="/">首页</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/use/state">use state</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/use/statetwo">use state two</nuxt-link>
      </li>
      <!-- <li>
        <nuxt-link :to="{ name: 'news', params: { newsId: 3306 } }"
          >params传参</nuxt-link
        >
      </li> -->
      <!-- <li>
        <nuxt-link :to="{ path: '/news', query: { newsId: 3306 } }"
          >query传参</nuxt-link
        >
      </li> -->
    </ul>
    <AppAlert> This is an auto-imported component </AppAlert>
  </div>
</template>
