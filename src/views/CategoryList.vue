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
            <van-tabs @click="onClickCategorySub" v-model="active">
              <van-tab v-for="(item,index) in categorySub" :key="index"
                       :title="item.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
          </div>
          <div :style="`height: ${this.listDiv}`" id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list :finished-text="finishedText" v-model="loading" :finished="finished" @load="onLoad">
                <div :key="index" v-for="(item,index) in goodsList" class="list-item">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg"/>
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>
                      <span>￥ {{item.ORI_PRICE}}</span>
                      <van-button type="danger" size="mini">购买</van-button>
                    </div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
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
  import logger from 'vuex/dist/logger';

  @Component
  export default class CategoryList extends Vue {
    page = 1;
    categorySubId = '';
    category = [];
    active = 0;
    categorySub = [];
    categoryIndex = 0;
    leftNavHeight: string | null = null;
    listDiv: string | null = null;
    goodsList = [];
    loading = false;
    finished = false;
    isRefresh = false;
    finishedText = '';
    errorImg = 'this.src="' + require('@/assets/images/nodata.png') + '"';

    onRefresh() {
      setTimeout(() => {
        this.isRefresh = true;
        this.onLoad();
      }, 500);
    }

    onLoad() {
      setTimeout(() => {
        this.loading = false;
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID;
        this.getGoodsList();
      }, 500);
    }

    onClickCategorySub(index: number) {
      this.categorySubId = this.categorySub[index].ID;
      this.goodsList = [];
      this.loading = false;
      this.finished = false;
      this.page = 1;
      this.onLoad();
    }

    getGoodsList() {
      axios({
        url: MockURL.getGoodsListByCategorySubId,
        method: 'post',
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(data => {
          const {code, message} = data.data;
          if (code === 200 && message.length) {
            this.loading = true;
            this.isRefresh = false;
            this.page++;
            this.goodsList = this.goodsList.concat(message);
          } else {
            this.isRefresh = false;
            this.page++;
            this.loading = true;
            this.finished = true;
            this.finishedText = '没有更多了';
          }
        })
        .catch(err => {
          Toast('服务器忙,请稍后尝试');
        });
    }

    clickCategory(index: number, categoryId: number) {
      this.categoryIndex = index;
      this.page = 1;
      this.loading = false;
      this.finished = false;
      this.goodsList = [];
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
          Toast('服务器忙,请稍后尝试');
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
          Toast('服务器忙,请稍后尝试');
        });
    }

    created() {
      this.getCategoryList();
    }

    mounted() {
      const winHeight = document.documentElement.clientHeight;
      this.leftNavHeight = winHeight - 46 + 'px';
      this.listDiv = winHeight - 90 + 'px';
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

  #list-div {
    overflow: scroll;

    .list-item {
      border-bottom: 1px solid #f0f0f0;
      display: flex;

      > .list-item-img {
        flex: 8;
      }

      > .list-item-text {
        flex: 18;

        > div:last-child {
          margin: 1rem 0.5rem;
          display: flex;
          color: #ff1100;
          align-items: center;
          vertical-align: middle;
          justify-content: space-between;
        }
      }
    }

  }
</style>