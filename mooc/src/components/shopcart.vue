<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></i>
          </div>
          <div class="num" v-show="totalCount !== 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice > 0}">{{totalPrice}}元</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" @click.stop.prevent="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <transition name="fold" @after-enter="changePosition" @after-leave="changePosition">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <div class="list-title">购物车</div>
          <span class="list-empty" @click="listEmpty">清空</span>
        </div>
        <div class="list-content" ref="content">
          <ul>
            <li class="list-food" v-for="food in selectFoods" :key="food.id">
              <span class="food-name">{{food.name}}</span>
              <div class="food-price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="list-mask" @click="hideList" v-show="listShow"></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartcontrol'

export default {
  name: 'shopcart',
  data () {
    return {
      fold: true
    }
  },
  props: {
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow () {
      // 当总数量为0 要返回false
      // get: function () {
      //   return this.fold
      // }
      // set: function () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      // }
      // fold为true，那么v-show就要为false,表示处于折叠状态
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.content, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  components: {
    cartcontrol
  },
  methods: {
    toggleList () {
      // 没东西的话，点击无效
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    changePosition (el) {
      if (!this.fold) {
        el.style.top = `-${el.clientHeight}px`
      } else {
        el.style.top = '0'
      }
    },
    listEmpty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideList () {
      this.fold = true
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert(`支付${this.totalPrice}`)
    }
  }
}
</script>

<style scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  background: #000;
}
.content {
  display: flex;
  background: #141d27;
  font-size: 0;
}
.content-left {
  flex: 1;
}
.logo-wrapper {
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: -10px;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  box-sizing: border-box;
  border-radius: 50%;
  background: #141d27;
}
.logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  background: #2b343c;
}
.logo.highlight {
  background: rgb(0, 160, 220);
}
.num {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 16px;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  background: rgb(240, 20, 20);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}
.icon-shopping_cart {
  line-height: 44px;
  font-size: 24px;
  color: #80858a;
}
.icon-shopping_cart.highlight {
  color: #fff;
}
.price {
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  line-height: 24px;
  padding-right: 12px;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
}
.price.highlight {
  color: #fff;
}
.desc {
  display: inline-block;
  vertical-align: top;
  margin: 12px 0 0 12px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
}
.content-right {
  flex: 0 0 105px;
  width: 105px;
}
.pay {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
}
.pay.not-enough {
  color: rgba(255, 255, 255, 0.4);
  background: #2b333b;
}
.pay.enough {
  color: #fff;
  background: #00b43c;
}
.shopcart-list {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
}
.fold-enter-active {
  transition: all 0.3s;
  transform: translate3d(0, -100%, 0);
}
.fold-enter, .fold-leave {
  transform: translate3d(0, 0, 0);
}
.list-header {
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.list-title {
  float: left;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.list-empty {
  float: right;
  font-size: 12px;
  color: rgb(0, 160, 220);
}
.list-content {
  padding: 0 18px;
  max-height: 217px;
  overflow: hidden;
  background: #fff;
}
.list-food {
  position: relative;
  padding: 12px 0;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.food-name {
  line-height: 24px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.food-price {
  position: absolute;
  right: 90px;
  bottom: 12px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(240, 20, 20);
}
.cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 6px;
}
.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -2;
  backdrop-filter: blur(10px);
  background: rgba(7, 17, 27, 0.6);
}
</style>
