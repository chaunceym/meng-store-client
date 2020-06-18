<template>
  <div class="example-3d">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="(item, index) in slide" :key="index">
        <div class="recommend-item">
          <img :src="item.image" width="80%"/>
          <div>{{item.goodsName}}</div>
          <div>￥{{item.price || 0.00}} (￥{{item.mallPrice || 0.00}})</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class SwiperDefault extends Vue {
    @Prop({required: true}) readonly slide!: [];
    swiperOption = {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 30,
        modifier: 1,
        slideShadows: true
      }
    };

  }
</script>

<style lang="scss" scoped>
  .example-3d {
    width: 100%;
    height: 400px;
  }

  .swiper {
    height: 100%;
    width: 100%;

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 400px;
      text-align: center;
      font-weight: bold;
      background-position: center;
      background-size: cover;
    }
  }
</style>