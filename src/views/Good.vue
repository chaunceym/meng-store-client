<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      />
    </div>
    <div class="top-image-div">
      <img :src="goodInfo.IMAGE1" alt="detail-image" width="60%">
    </div>
    <div class="good-name">{{goodInfo.NAME}}</div>
    <div class="goods-price">价格: {{goodInfo.PRESENT_PRICE || 0.00}}</div>
    <div>
      <van-tabs sticky>
        <van-tab title="商品详情">
          <div class="detail">{{goodInfo.DETAIL || '暂无数据'}}</div>
        </van-tab>
        <van-tab title="评价">
          正在制作
        </van-tab>
      </van-tabs>
    </div>
    <div class="good-bottom">
      <div>
        <van-button size="large" type="warning">
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
  import axios from 'axios';
  import MockURL from '@/serviceAPI.config';
  import {Toast} from 'vant';

  @Component
  export default class Goods extends Vue {
    goodId = '001cee156647463a98a2a7d44a2e3468';
    goodInfo = {};

    goBack() {
      this.$router.go(-1);
    }

    created() {
      // this.goodId = this.$route.query.goodsId as string;
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
          console.log(data);
          const {code, message} = data.data;
          if (code === 200 && message) {
            this.goodInfo = message;
            if (!this.goodInfo.IMAGE1) {
              this.goodInfo.IMAGE1 = require('../assets/images/nodata.png');
            }
          } else {
            Toast('服务器错误,请稍后尝试');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
</script>

<style lang="scss" scoped>
  .good-name {
    padding-top: .5rem;
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