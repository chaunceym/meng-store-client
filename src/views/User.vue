<template>
  <div class="user-wrapper">
    <div>
      <img width="80%" :src="errorImg" alt="">
    </div>
    <span v-if="username">{{username}}</span>
    <router-link v-else to="login">请登录</router-link>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import axios from 'axios';

  @Component
  export default class User extends Vue {
    username = '';
    toLogin = '';
    errorImg = require('@/assets/images/nodata.png');

    created() {
      const {username} = localStorage;
      if (username) {
        this.username = username;
      } else {
        this.toLogin = '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 3rem;
    a {
      text-decoration: underline;
      color: #f10;
    }
  }
</style>