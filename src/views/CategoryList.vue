<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品类别"/>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            左侧导航
          </div>
        </van-col>
        <van-col span="18">
          <div>
            右侧导航
          </div>
        </van-col>
      </van-row>
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
  export default class CategoryList extends Vue {
    created() {
      this.getCategoryList();
    }

    getCategoryList() {
      axios({
        url: MockURL.getCategoryList,
        method: 'get'
      })
        .then(data => {
          console.log(data);
          const {code, message} = data.data;
          if (code === 200 && message) {

          } else {
            Toast('服务器忙,请稍后尝试');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
</script>

<style lang="scss" scoped>

</style>