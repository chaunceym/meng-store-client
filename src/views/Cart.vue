<template>
  <div class="cart-wrapper">
    <div class="navbar-div">
      <van-nav-bar title="购物车"/>
    </div>
    <div class="cart-list" v-if="!isEmpty">
      <div class="cart-item" v-for="(item,index) in cartInfo" :key="index">
        <div class="good-img">
          <img width="100%" :src="item.image" alt="">
        </div>
        <div class="good-text">
          <div>{{item.name}}</div>
          <div>
            <span>{{filter(item.price)}}</span>
            <span>数量: {{item.count}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--清空购物车-->
    <div class="card-title" v-if="!isEmpty">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <div class="nodata-img" v-else>
      <img :src="errorImg" alt="">
      <div>
        <router-link to="/">
          购物车还没有商品哦,快去添加吧
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import toMoney from '@/filter/moneyFilter';

  @Component
  export default class Cart extends Vue {
    cartInfo = [];
    isEmpty = false;
    errorImg = require('@/assets/images/nodata.png');


    created() {
      this.getCartInfo();
    }

    filter(value: number) {
      return toMoney(value);
    }

    getCartInfo() {
      const {cartInfo} = localStorage;
      if (cartInfo) {
        this.cartInfo = JSON.parse(cartInfo);
        console.log(this.cartInfo);
      } else {
        this.isEmpty = true;
        console.log('nodata');
      }
    }

    clearCart() {
      localStorage.removeItem('cartInfo');
      this.cartInfo = [];
    }
  }
</script>

<style lang="scss" scoped>
  .cart-wrapper {
    padding: 1rem;

    .nodata-img {
      text-align: center;
      padding-top: 5rem;

      > div {
        padding-top: 2rem;
        text-decoration: underline;
        >a {
          color: #f10;
        }
      }
    }

    .card-title {
      border-bottom: 1px solid #E4E7ED;
      text-align: center;
      padding: .5rem;
    }

    .cart-item {
      border-bottom: 1px solid #eee;
      display: flex;
      border-radius: 10px;
      margin-top: .5rem;

      .good-img {
        flex: 2;
      }

      .good-text {
        flex: 8;
        padding-left: 1rem;

        > div:last-child {
          padding: .8rem .3rem 0 .1rem;
          display: flex;
          justify-content: space-between;
          font-size: .9rem;
        }
      }
    }
  }
</style>