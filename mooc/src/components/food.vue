<template>
  <div v-show="showFlag" class="food" ref="foodScroll">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">加入购物车</div>
      </div>
      <split v-show="food.info" />
      <div class="info" v-show="food.info">
        <h1 class="info-title">商品信息</h1>
        <p class="info-content">{{food.info}}</p>
      </div>
      <split />
      <div class="rating">
        <h1 class="rating-title">商品评价</h1>
        <ratingselect ref="ratingselect" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" />
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="isShow(rating.rateType, rating.text)" v-for="rating in food.ratings" :key="rating.id" class="rating-item">
              <div class="user">
                <span class="user-name">{{rating.username}}</span>
                <img class="user-avatar" width="16" height="16" :src="rating.avatar">
              </div>
              <div class="rating-time">{{rating.rateTime | formatDate}}</div>
              <p class="rating-text">
                <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from '@/components/cartcontrol'
import split from '@/components/split'
import ratingselect from '@/components/ratingselect'
import {globalFormatDate} from '@/js/date'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
  name: 'food',
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show () {
      this.showFlag = true
      // 数据初始化
      this.selectType = ALL
      this.$refs.ratingselect.selectedType = ALL
      this.$refs.ratingselect.onlyContentData = true
      this.onlyContent = true
      // console.log(this.$refs.foodScroll)
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodScroll, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (event) {
      if (!event._constructed) {
        return
      }
      Vue.set(this.food, 'count', 1)
    },
    isShow (type, text) {
      // 是否显示有内容   且过滤掉无内容的 所以返回false
      if (this.$refs.ratingselect.onlyContentData && !text) {
        return false
      }
      if (this.$refs.ratingselect.selectedType === ALL) {
        return true
      } else {
        return this.$refs.ratingselect.selectedType === type
      }
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return globalFormatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>
<style scoped>
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
}
.image-header {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.image-header img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.back {
  position: absolute;
  top: 10px;
  left: 0;
}
.icon-arrow_lift {
  display: block;
  padding: 18px;
  font-size: 20px;
  color: #fff;
}
.content {
  position: relative;
  padding: 18px;
}
.title {
  line-height: 16px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
  color: rgb(7, 17, 27);
}
.detail {
  margin-bottom: 18px;
  line-height: 14px;
  font-size: 0;
  height: 14px;
}
.sell-count {
  font-size: 14px;
  color: rgb(147, 153, 159);
  margin-right: 12px;
}
.rating {
  font-size: 14px;
  color: rgb(147, 153, 159);
}
.price {
  font-weight: 700;
  line-height: 24px;
}
.now {
  margin-right: 12px;
  font-size: 18px;
  color: rgb(240, 20, 20);
}
.old {
  text-decoration: line-through;
  font-size: 14px;
  color: rgb(147, 153, 159);
}
.cartcontrol-wrapper {
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.buy {
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 10;
  height: 24px;
  line-height: 24px;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 12px;
  color: #fff;
  background: rgb(0, 160, 220);
}
.info {
  padding: 18px;
}
.info-title {
  line-height: 16px;
  margin-bottom: 16px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.info-content {
  line-height: 24px;
  padding: 0 8px;
  font-size: 14px;
  color: rgb(77, 85, 93);
}
.rating {
  padding-top: 18px;
}
.rating-title {
  line-height: 16px;
  margin-left: 18px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.rating-wrapper {
  padding: 0 18px;
}
.rating-item {
  position: relative;
  padding: 16px 0;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.user {
  position: absolute;
  right: 0;
  top: 16px;
  line-height: 16px;
  font-size: 0;
}
.user-name {
  display: inline-block;
  margin-right: 6px;
  vertical-align: top;
  font-size: 14px;
  color: rgb(147, 153, 159);
}
.user-avatar {
  border-radius: 50%;
}
.rating-time {
  margin-bottom: 6px;
  line-height: 16px;
  font-size: 14px;
  color: rgb(147, 153, 159);
}
.rating-text {
  line-height: 20px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.icon-thumb_up {
  margin-right: 4px;
  line-height: 24px;
  font-size: 14px;
  color: rgb(0, 160, 220);
}
.icon-thumb_down {
  margin-right: 4px;
  line-height: 24px;
  font-size: 14px;
  color: rgb(147, 153, 159);
}
.no-ratings {
  padding: 16px 0;
  font-size: 16px;
  color: rgb(147, 153, 159);
}







</style>
