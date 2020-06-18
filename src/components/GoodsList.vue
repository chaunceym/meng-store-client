<template>
  <div class="goods-info">
    <div class="goods-image">
      <img v-lazy="goodImage" width="90%" />
    </div>
    <div class="goods-name">{{goodName}}</div>
    <div class="goods-price">￥{{goodPrice}}</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class GoodsList extends Vue {
    @Prop({required: true}) goodName!: string;
    @Prop({required: true}) goodPrice!: number;
    @Prop({required: true}) goodImage!: string;
  }
</script>

<style lang="scss" scoped>

</style>