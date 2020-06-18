<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品类别"/>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav" :style="`height: ${leftNavHeight};`">
            <ul>
              <li @click="clickCategory(index,item.ID)"
                  :class="{['category-active']:categoryIndex===index}"
                  v-for="(item,index) in category" :key="index">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tab-category-sub">
            <van-tabs v-model="active">
              <van-tab v-for="(item,index) in categorySub" :key="index"
                       :title="item.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
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
    category = [];
    active = 0;
    categorySub = [];
    categoryIndex = 0;
    leftNavHeight: string | null = null;

    created() {
      this.getCategoryList();
    }

    mounted() {
      const winHeight = document.documentElement.clientHeight;
      this.leftNavHeight = winHeight - 46 + 'px';
    }

    clickCategory(index: number, categoryId: number) {
      this.categoryIndex = index;
      this.getCategorySubByCategoryId(categoryId);
    }

    getCategorySubByCategoryId(categoryId: number) {
      axios({
        url: MockURL.getCategorySubList,
        method: 'post',
        data: {categoryId}
      })
        .then(data => {
          const {code, message} = data.data;
          if (code === 200 && message) {
            this.categorySub = data.data.message;
            this.active = 0;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    getCategoryList() {
      axios({
        url: MockURL.getCategoryList,
        method: 'get'
      })
        .then(data => {
          const {code, message} = data.data;
          if (code === 200 && message) {
            this.category = message;
            this.getCategorySubByCategoryId(this.category[0].ID);
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
  #leftNav {
    line-height: 2rem;
    border-bottom: 1px solid #E4E7ED;
    padding: 3px;
    font-size: .8rem;
    text-align: center;
  }

  .category-active {
    background: #eee;
  }
</style>