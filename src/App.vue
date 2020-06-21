<template>
  <div>
    <div id="app">
      <router-view/>
    </div>

    <van-tabbar class="tabbar-wrapper" v-model="active">
      <van-tabbar-item icon="shop">
        <router-link to="/">首页</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="label">
        <router-link to="category-list">
          分类
        </router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="cart">
        <router-link to="cart"> 购物车</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="manager" info="20">
        <router-link to="user">
          我的
        </router-link>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    active = 0;
  }
</script>
<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .tabbar-wrapper {
    a {
      color: inherit;
    }
  }
</style>
