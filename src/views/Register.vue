<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
        clearable
        required
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        clearable
        required
      />
      <div class="register-button">
        <van-button @click="axiosRegisterUser" type="primary" size="large">马上注册
        </van-button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import axios from 'axios';
  import MockURL from '@/serviceAPI.config';
  import {Toast} from 'vant';

  @Component
  export default class Register extends Vue {
    username = '';
    password = '';
    icon = '';

    goBack() {
      this.$router.go(-1);
    }

    axiosRegisterUser() {
      axios({
        url: MockURL.registerUser,
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(data => {
          console.log(data);
          if (data.data.code === 200) {
            Toast.success('注册成功');
          } else {
            console.log(data.data.message);
            Toast.fail('注册失败');
          }
        })
        .catch(() => {
          Toast.fail('注册失败');
        });
    }
  }
</script>

<style lang="scss" scoped>
  .register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px;
  }

  .register-button {
    padding-top: 10px;
  }
</style>