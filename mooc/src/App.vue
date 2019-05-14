<template>
  <div id="app-app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
        <!--<a v-link="{path: '/goods'}">商品</a>-->
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
        <!--<a v-link="{path: '/ratings'}">评论</a>-->
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
        <!--<a v-link="{path: '/seller'}">商家</a>-->
      </div>
    </div>
    <!--<div class="content">Im a content</div>-->
    <!--当vue-router刷新时，会刷新这个标签里面的内容-->
    <router-view :seller="seller"/>
  </div>
</template>

<script>
import header from '@/components/header'

// 状态码
const ERR_OK = 0

export default {
  name: 'App',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then((response) => {
      let sellerData = response.body
      if (sellerData.errno === ERR_OK) {
        this.seller = sellerData.seller
        console.log('ok')
      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style scoped>
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.tab-item {
  flex: 1;
  text-align: center;
}
.tab-item a {
  display: block;
  text-decoration: none;
  font-size: 14px;
  color: rgb(77, 85, 93);
}
.tab-item a.router-link-active {
  color: rgb(240, 20, 20);
}
</style>
