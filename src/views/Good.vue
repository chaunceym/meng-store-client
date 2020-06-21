<template>
  <div class="good-wrapper">
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      />
    </div>
    <div class="top-image-div">
      <img :onerror="errorImg" :src="goodInfo.IMAGE1" alt="detail-image" width="60%">
    </div>
    <div class="good-name">{{goodInfo.NAME}}</div>
    <div class="goods-price">价格: {{filter(goodInfo.PRESENT_PRICE)}}</div>
    <div>
      <van-tabs sticky>
        <van-tab title="商品详情">
          <div class="detail">
            <div class="detail-img" v-for="(item,index) in detailImg" :key="index" v-html="`${item}>`">
            </div>
          </div>
        </van-tab>
        <van-tab title="评价">
          正在制作
        </van-tab>
      </van-tabs>
    </div>
    <div class="good-bottom">
      <div>
        <van-button @click="addGoodsToCart" size="large" type="warning">
          加入购物车
        </van-button>
      </div>
      <div>
        <van-button size="large" type="danger">
          直接购买
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import toMoney from '@/filter/moneyFilter';
  import axios from 'axios';
  import MockURL from '@/serviceAPI.config';
  import {Toast} from 'vant';

  @Component
  export default class Goods extends Vue {
    goodId = '';
    goodInfo: GoodInfo = {
      ID: '',
      NAME: '',
      PRESENT_PRICE: 0,
      IMAGE1: '',
    };
    errorImg = 'this.src="' + require('@/assets/images/nodata.png') + '"';
    detailImg = [];

    goBack() {
      this.$router.go(-1);
    }

    filter(value: number) {
      return toMoney(value);
    }

    addGoodsToCart() {
      const cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];
      if (cartInfo.length !== 0) {
        const isHaveGoods = cartInfo.find((cart: CartGoodInfo) => cart.goodId === this.goodId);
        if (isHaveGoods) {
          cartInfo.map((cart: CartGoodInfo) => {
            if (cart.goodId === this.goodId) {
              cart.count++;
            }
          });
          localStorage.cartInfo = JSON.stringify(cartInfo);
          Toast.success('添加到购物车');
        } else {
          this.addOneGood(cartInfo);
        }
      } else {
        this.addOneGood(cartInfo);
      }
    }

    addOneGood(cartInfo: CartGoodInfo[]) {
      const cartGoodInfo: CartGoodInfo = {
        goodId: this.goodInfo.ID,
        name: this.goodInfo.NAME,
        price: this.goodInfo.PRESENT_PRICE,
        image: this.goodInfo.IMAGE1,
        count: 1
      };
      cartInfo.push(cartGoodInfo);
      Toast.success('添加购物车');
      localStorage.setItem('cartInfo', JSON.stringify(cartInfo));
    }

    created() {
      this.goodId = this.$route.query.goodId ? this.$route.query.goodId : this.$route.params.goodId;
      this.getInfo();
    }

    getInfo() {
      axios({
        url: MockURL.getDetailGoodInfo,
        method: 'post',
        data: {
          goodId: this.goodId
        }
      })
        .then(data => {
          const {code, message} = data.data;
          if (code === 200 && message) {
            this.goodInfo = message;
            this.detailImg = this.goodInfo.DETAIL.split('>');
          } else {
            Toast('服务器错误,请稍后尝试');
          }
        })
        .catch(err => {
          Toast('服务器错误,请稍后尝试');
        });
    }
  }
</script>

<style lang="scss" scoped>
  .good-wrapper{
    text-align: center;
  }
  .good-name {
    padding-top: .5rem;
  }
  .goods-price{
    color: #ff1100;
  }

  .detail {
    margin-top: .5rem;
  }

  .good-bottom {
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #FFF;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;

    > div {
      flex: 1;
      padding: 5px;
    }
  }
</style>