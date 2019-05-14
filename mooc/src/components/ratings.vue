<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="score-title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"/>
            <span class="score-score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="score-title">商品评分</span>
            <star :size="36" :score="seller.foodScore"/>
            <span class="score-score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="delivery-title">送达时间</span>
            <span class="delivery-delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split />
      <ratingselect ref="ratingselect" :select-type="selectType" :only-content="onlyContent" :ratings="ratings" />
      <div class="rating-wrapper">
        <ul>
          <li v-show="isShow(rating.rateType, rating.text)" v-for="rating in ratings" :key="rating.id" class="rating-item">
            <div class="user-avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="rating-content">
              <h1 class="user-name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score" />
                <span class="delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
              </div>
              <p class="rating-text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="recommend-item" v-for="item in rating.recommend" :key="item.id">{{item}}</span>
              </div>
              <div class="rating-time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '@/components/star'
import split from '@/components/split'
import ratingselect from '@/components/ratingselect'
import {globalFormatDate} from '@/js/date'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

const ERR_OK = 0

export default {
  name: 'ratings',
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split,
    ratingselect
  },
  methods: {
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
  created () {
    this.$http.get('/api/ratings').then((response) => {
      let ratingsData = response.body
      if (ratingsData.errno === ERR_OK) {
        this.ratings = ratingsData.ratings
        this.$nextTick(() => {
          // 数据初始化
          this.selectType = ALL
          this.$refs.ratingselect.selectedType = ALL
          this.$refs.ratingselect.onlyContentData = true
          this.onlyContent = true
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
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
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
}
.overview {
  display: flex;
  padding: 18px 0;
}
.overview-left {
  flex: 0 0 137px;
  padding: 6px 0;
  width: 137px;
  border-right: 1px solid rgba(7, 17, 27, 0.1);
  text-align: center;
}
.overview-right {
  flex: 1;
  padding: 6px 0 6px 24px;
}
.score {
  margin-bottom: 6px;
  line-height: 28px;
  font-size: 28px;
  color: rgb(255, 153, 0);
}
.title {
  margin-bottom: 8px;
  line-height: 16px;
  font-size: 16px;
  color: rgb(7, 17, 27);
}
.rank {
  line-height: 12px;
  font-size: 12px;
  color: rgb(147, 153, 159);
}
.score-wrapper {
  margin-bottom: 8px;
  font-size: 0;
}
.score-title {
  display: inline-block;
  line-height: 18px;
  vertical-align: top;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.score-wrapper .star {
  display: inline-block;
  margin: 0 12px;
  vertical-align: top;
}
.score-score {
  display: inline-block;
  line-height: 14px;
  vertical-align: top;
  font-size: 14px;
  color: rgb(255, 153, 0);
}
.delivery-wrapper {
  font-size: 0;
}
.delivery-title {
  line-height: 18px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.delivery-delivery {
  margin-left: 12px;
  font-size: 12px;
  color: rgb(147, 153, 159);
}
.rating-wrapper {
  padding: 0 18px;
}
.rating-item {
  display: flex;
  padding: 18px 0;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.user-avatar {
  flex: 0 0 28px;
  width: 28px;
  margin-right: 12px;
}
.user-avatar img {
  border-radius: 50%;
}
.rating-content {
  position: relative;
  flex: 1;
}
.user-name {
  margin-bottom: 4px;
  line-height: 16px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.star-wrapper {
  margin-bottom: 6px;
  font-size: 0;
}
.star-wrapper .star {
  display: inline-block;
  margin-right: 6px;
  vertical-align: top;
}
.delivery-time {
  display: inline-block;
  vertical-align: top;
  line-height: 14px;
  font-size: 12px;
  color: rgb(147, 153, 159);
}
.rating-text {
  margin-bottom: 8px;
  line-height: 18px;
  color: rgb(7, 17, 27);
  font-size: 14px;
}
.rating-time {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 14px;
  font-size: 12px;
  color: rgb(147, 153, 159);
}
.recommend {
  line-height: 16px;
  font-size: 0;
}
.icon-thumb_up {
  display: inline-block;
  margin: 0 8px 4px 0;
  font-size: 14px;
  color: rgb(0, 160, 220);
}
.recommend-item {
  display: inline-block;
  margin: 0 8px 4px 0;
  padding: 0 6px;
  border: 1px solid rgba(7, 17, 27, 0.1);
  border-radius: 1px;
  font-size: 14px;
  color: rgb(147, 153, 159);
  background: #fff;
}









</style>
