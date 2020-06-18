<template>
  <div class="floor">
    <div class="floor-title"> {{floorTitle}} </div>
    <div class="floor-anomaly">
      <div class="floor-one"><img :src="floor1One.image" width="100%"/></div>
      <div>
        <div class="floor-two"><img :src="floor1Two.image" width="100%"/></div>
        <div><img :src="floor1Three.image" width="100%"/></div>
      </div>
    </div>
    <div class="floor-rule">
      <div v-for="(item ,index) in floorData.slice(3)" :key="index">
        <img :src="item.image" width="100%"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';


  @Component
  export default class Floor extends Vue {
    @Prop({required: true}) floorData!: FloorData[];
    @Prop({required: true}) floorTitle!: string;
    floor1One: FloorData = {image: '', goodId: ''};
    floor1Two: FloorData = {image: '', goodId: ''};
    floor1Three: FloorData = {image: '', goodId: ''};

    @Watch('floorData')
    onFloorChanged(newVal: []) {
      console.log(this.floorData);
      this.floor1One = this.floorData[0];
      this.floor1Two = this.floorData[1];
      this.floor1Three = this.floorData[2];
    }
  }
</script>

<style lang="scss" scoped>
  .floor-title{
    text-align:center;
    font-size:14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .floor-anomaly {
    display: flex;
    background: #ffffff;
    border-bottom: 1px solid #ddd;

    > div {
      width: 10rem;
      box-sizing: border-box;
    }

    > .floor-one {
      border-right: 1px solid #ddd;
    }

    > .floor-two {
      border-bottom: 1px solid #ddd;
    }
  }

  .floor-rule {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;

    > div {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 10rem;
      border-bottom: 1px solid #ddd;
    }

    > div:nth-child(odd) {
      border-right: 1px solid #ddd;
    }
  }

</style>