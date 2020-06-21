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
        <van-button @click="registerAction" :loading="openLoading" type="primary" size="large">马上注册
        </van-button>
      </div>
      <div class="to-login">
        已有账号,
        <router-link to="login">请登录</router-link>
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

    registerAction() {
      this.checkForm() && this.axiosRegisterUser();
    }

    axiosRegisterUser() {
      this.openLoading = true;
      axios({
        url: MockURL.registerUser,
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(data => {
          if (data.data.code === 200) {
            Toast.success('登录成功');
            this.$router.push('/');
          }
        })
        .catch(err => {
          Toast.fail('登录失败');
          this.openLoading = false;
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
  .to-login{
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