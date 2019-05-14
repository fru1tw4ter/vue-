<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="d-title">
            <div class="d-line"></div>
            <div class="d-text">优惠信息</div>
            <div class="d-line"></div>
          </div>
          <ul v-if="seller.supports" class="d-supports">
            <li class="support-item" v-for="item in seller.supports" :key="item.id">
              <span class="item-icon" :class="classMap[item.type]"></span>
              <span class="item-text">{{item.description}}</span>
            </li>
          </ul>
          <div class="d-title">
            <div class="d-line"></div>
            <div class="d-text">商家公告</div>
            <div class="d-line"></div>
          </div>
          <div class="d-bulletin">
            <p class="d-content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hiddenDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star'

export default {
  name: 'header',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hiddenDetail () {
      this.detailShow = false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  }
}
</script>

<style scoped>
.header {
  position: relative;
  overflow: hidden;
  background: rgba(7, 17, 27, 0.5);
  color: #fff;
}
.content-wrapper {
  position: relative;
  padding: 24px 12px 18px 24px;
  font-size: 0;
}
.avatar {
  display: inline-block;
  vertical-align: top;
}
.avatar img {
  border-radius: 2px;
}
.content {
  display: inline-block;
  margin-left: 16px;
  font-size: 14px;
}
.title {
  margin: 2px 0 8px 0;
}
.brand {
  display: inline-block;
  vertical-align: top;
  width: 30px;
  height: 18px;
  background-image: url('../assets/brand@2x.png');
  background-size: 30px 18px;
  background-repeat: no-repeat;
}
.name {
  margin-left: 6px;
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
}
.description {
  margin-bottom: 10px;
  line-height: 12px;
  font-size: 12px;
}
.support {
  /*height: 12px;*/
  /*line-height: 12px;*/
}
.icon {
  display: inline-block;
  vertical-align: top;
  height: 12px;
  width: 12px;
  margin-right: 4px;
  margin-top: 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.decrease {
  background-image: url('../assets/decrease_1@2x.png');
}
.discount {
  background-image: url('../assets/discount_1@2x.png');
}
.guarantee {
  background-image: url('../assets/guarantee_1@2x.png');
}
.invoice {
  background-image: url('../assets/invoice_1@2x.png');
}
.special {
  background-image: url('../assets/special_1@2x.png');
}
.text {
  line-height: 12px;
  font-size: 12px;
}
.support-count {
  position: absolute;
  right: 12px;
  bottom: 14px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
}
.count {
  vertical-align: top;
  font-size: 12px;
}
.support-count .icon-keyboard_arrow_right {
  line-height: 24px;
  margin-left: 2px;
  font-size: 12px;
}
.bulletin-wrapper {
  position: relative;
  height: 28px;
  line-height: 28px;
  padding: 0 22px 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: rgba(7, 17, 27, 0.2);
}
.bulletin-title {
  display: inline-block;
  vertical-align: top;
  margin-top: 9px;
  width: 22px;
  height: 12px;
  background-image: url('../assets/bulletin@2x.png');
  background-size: 24px 12px;
  background-repeat: no-repeat;
}
.bulletin-text {
  vertical-align: top;
  margin: 0 4px;
  font-size: 12px;
}
.bulletin-wrapper .icon-keyboard_arrow_right {
  position: absolute;
  /*line-height: 24px;*/
  /*margin-left: 2px;*/
  font-size: 12px;
  right: 12px;
  top: 8px;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}
.detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.8);
  overflow: auto;
  transition: all 0.5s;
}
/*.detail.fade-transition {*/
  /*opacity: 1;*/
  /*background: rgba(7, 17, 27, 0.8);*/
/*}*/
/*.detail.fade-enter, .detail.fade-leave {*/
  /*opacity: 0;*/
  /*background: rgba(7, 17, 27, 0);*/
/*}*/
.detail-wrapper {
  min-height: 100%;
  width: 100%;
}
.detail-main {
  margin-top: 64px;
  padding-bottom: 64px;
}
.detail-main .name {
  line-height: 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}
.detail-close {
  position: relative;
  width: 32px;
  height: 32px;
  margin: -64px auto 0 auto;
  clear: both;
  font-size: 32px;
}
.detail-close .icon-close {

}
.star-wrapper {
  margin-top: 18px;
  padding: 2px 0;
  text-align: center;
}
.d-title {
  display: flex;
  width: 80%;
  margin: 28px auto 24px auto;
}
.d-line {
  flex: 1;
  position: relative;
  top: -6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.d-text {
  padding: 0 12px;
  font-weight: 700;
  font-size: 14px;
}
.d-supports {
  width: 80%;
  margin: 0 auto;
}
.support-item {
  padding: 0 12px;
  margin-bottom: 12px;
  font-size: 0;
}
.support-item:last-child {
  margin-bottom: 0;
}
.item-icon {
  display: inline-block;
  vertical-align: top;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
}
.item-icon .decrease {
  background-image: url('../assets/decrease_2@2x.png');
}
.item-icon .discount {
  background-image: url('../assets/discount_2@2x.png');
}
.item-icon .guarantee {
  background-image: url('../assets/guarantee_2@2x.png');
}
.item-icon .invoice {
  background-image: url('../assets/invoice_2@2x.png');
}
.item-icon .special {
  background-image: url('../assets/special_2@2x.png');
}
.item-text {
  line-height: 16px;
  font-size: 14px;
}
.d-bulletin {
  width: 80%;
  margin: 0 auto;
}
.d-content {
  padding: 0 12px;
  line-height: 24px;
  font-size: 14px;
}
</style>
