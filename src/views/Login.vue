<template>
  <div>
    <van-nav-bar
      title="用户登录"
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
        :error-message="usernameErrorMsg"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        clearable
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button @click="loginAction" :loading="openLoading" type="primary" size="large">马上登录
        </van-button>
      </div>
      <div class="to-register">
        没有账号,
        <router-link to="register">请注册</router-link>
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
    openLoading = false;
    usernameErrorMsg = '';
    passwordErrorMsg = '';

    goBack() {
      this.$router.go(-1);
    }

    checkForm() {
      let isOk = true;
      if (this.username.length < 6) {
        this.usernameErrorMsg = '用户名不能小于6位';
        isOk = false;
      } else if (this.password.length < 6) {
        this.passwordErrorMsg = '用户名不能小于6位';
        isOk = false;
      }
      return isOk;

    }

    loginAction() {
      this.checkForm() && this.axiosRegisterUser();
    }

    axiosRegisterUser() {
      this.openLoading = true;
      axios({
        url: MockURL.loginUser,
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(data => {
          if (data.data.code === 200 && data.data.message) {
            Toast.success('登录成功');
            this.$router.push('/');
            localStorage.username = this.username;
          } else if (data.data.code === 200 && !data.data.message) {
            Toast.fail('密码错误');
            this.openLoading = false;
          } else if (data.data.code === 500) {
            Toast.fail(data.data.message);
            this.openLoading = false;
          }
        })
        .catch(() => {
          Toast.fail('登录失败');
          this.openLoading = false;
        });
    }

    created() {
      if (localStorage.username) {
        Toast.success('您已经登录');
        this.$router.push('/');
      }
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
  .to-register{
    padding: .3rem;

    a {
      color: #ff1100;
      text-decoration: underline;
    }
  }

  .register-button {
    padding-top: 10px;
  }
</style>