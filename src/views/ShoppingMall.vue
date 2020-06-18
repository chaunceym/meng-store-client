<template>
  <div>
    <!--search bar layout-->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <van-icon class="location-icon" name="location-o"/>
        </van-col>
        <van-col span="16">
          <label>
            <input placeholder="容" type="text" class="search-input">
          </label>
        </van-col>
        <van-col span="5" class="button-wrapper">
          <van-button plain size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="(banner,index) in swiperImages" :key="index">
        <img width="100%" :src="banner.image" v-lazy="banner.image" alt="banner-image">
      </van-swipe-item>
    </van-swipe>
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="80%"/>
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--AD banner area-->
    <div class="ad-image">
      <img :src="adBanner" v-lazy="adBanner" width="100%">
    </div>

    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <SwiperDefault :slide="recommendGoods"/>
      </div>
    </div>
    <!--floor one area-->
    <Floor :floor-data="floor1" :floor-title="floorName.floor1"/>
    <Floor :floor-data="floor2" :floor-title="floorName.floor2"/>
    <Floor :floor-data="floor3" :floor-title="floorName.floor3"/>

    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <GoodsList :good-image="item.image" :good-name="item.name" :good-price="item.price"/>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import SwiperDefault from '@/components/swiper/SwiperDefault.vue';
  import Floor from '@/components/Floor.vue';
  import GoodsList from '@/components/GoodsList.vue';
  import MockURL from '@/serviceAPI.config.ts';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import axios from 'axios';

  @Component({
    components: {SwiperDefault, Floor, GoodsList}
  })
  export default class ShoppingMall extends Vue {
    category = [];
    adBanner = '';
    swiperImages = [];
    recommendGoods = [];
    floor1: FloorData[] = [];
    floor2: FloorData[] = [];
    floor3: FloorData[] = [];
    floorName = {};
    hotGoods = [];

    created() {
      axios({
        url: MockURL.getShoppingMallInfo,
        method: 'get'
      }).then(data => {
        console.log(data);
        this.category = JSON.parse(JSON.stringify(data.data.data.category));
        this.adBanner = data.data.data.advertesPicture.PICTURE_ADDRESS;
        this.swiperImages = data.data.data.slides;
        this.recommendGoods = data.data.data.recommend;
        this.floor1 = data.data.data.floor1;
        this.floor2 = data.data.data.floor2;
        this.floor3 = data.data.data.floor3;
        this.floorName = data.data.data.floorName;
        this.hotGoods = data.data.data.hotGoods;
      }).catch(e => console.log(e));
    }
  }
</script>

<style lang="scss" scoped>
  $themeColor: #e5017d;
  .search-bar { height: 2.2rem; background-color: $themeColor; line-height: 2.2rem;

    .search-input { width: 100%; height: 1.3rem; border: 0; border-bottom: 1px solid #fff; background: $themeColor; color: #ffffff; font-size: .8rem; padding-left: .3rem; }

    .location-icon { color: #ffffff; }

    .button-wrapper { border-radius: 1rem; text-align: center;

      > button { margin: 0 auto; background: $themeColor; border: 1px solid #ffffff; color: #ffffff; border-radius: .3rem; }
    }
  }

  .my-swipe { height: 9rem; }

  .type-bar { display: flex; padding: .4rem; justify-content: center;

    > div { display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 12px;

      > span { padding-top: .3rem; }
    }
  }

  .recommend-area { background-color: #fff; margin-top: .3rem;

    > .recommend-title { border-bottom: 1px solid #eee; font-size: 14px; padding: .2rem; color: #e5017d; }

    > .recommend-body { border-bottom: 1px solid #eee; padding: .5rem 0;

      > .recommend-item { width: 99%; border-right: 1px solid #eee; font-size: 12px; text-align: center; }
    }
  }

  .hot-area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }

</style>