<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item, index) in goods" :key="item.id" class="menu-item" :class="{'current': currentIndex===index}" @click="selectMenu(index, $event)">
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" :key="food.id" class="food-item" @click="selectFood(food, $event)">
              <div class="food-icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="food-content">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="food-desc">{{food.description}}</p>
                <div class="food-extra">
                  <span class="food-count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="food-price">
                  <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
    <food :food="selectedFood" ref="food"/>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart'
import cartcontrol from '@/components/cartcontrol'
import food from '@/components/food'

const ERR_OK = 0

export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // 落在一个区间 最后一个区间时height2为undefined
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.$http.get('/api/goods').then((response) => {
      let goodsData = response.body
      if (goodsData.errno === ERR_OK) {
        this.goods = goodsData.goods
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menu, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foods, {
        probeType: 3,
        click: true
      })
      // 监听实时屏幕滚动位置  的Y坐标
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 计算右边的高度
    _calculateHeight () {
      let foodList = document.querySelectorAll('.food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      // 获取当前index对应的右侧的位置
      let foodList = document.querySelectorAll('.food-list-hook')
      let el = foodList[index]
      this.foodScroll.scrollToElement(el, 300)
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  overflow: hidden;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
}
.menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
}
.foods-wrapper {
  flex: 1;
}
.menu-item {
  display: table;
  height: 54px;
  width: 56px;
  padding: 0 12px;
  line-height: 14px;
}
.current {
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  font-weight: 700;
}
.icon {
  display: inline-block;
  vertical-align: top;
  height: 12px;
  width: 12px;
  margin-right: 2px;
  margin-top: 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.decrease {
  background-image: url('../assets/decrease_3@2x.png');
}
.discount {
  background-image: url('../assets/discount_3@2x.png');
}
.guarantee {
  background-image: url('../assets/guarantee_3@2x.png');
}
.invoice {
  background-image: url('../assets/invoice_3@2x.png');
}
.special {
  background-image: url('../assets/special_3@2x.png');
}
.text {
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  font-size: 12px;
}
.current .text {
  border-bottom: none;
}
.title {
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147, 153, 159);
  background: #f3f5f7;
}
.food-item {
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.food-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}
.food-icon {
  flex: 0 0 57px;
  margin-right: 10px;
}
.food-content {
  flex: 1;
  position: relative;
}
.food-name {
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.food-desc {
  margin-bottom: 8px;
  line-height: 14px;
  font-size: 12px;
  color: rgb(147, 153, 159);
}
.food-extra {
  line-height: 12px;
  font-size: 12px;
}
.food-count {
  margin-right: 12px;
}
.food-price {
  font-weight: 700;
  line-height: 24px;
}
.cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: -10px;
}
.now {
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240, 20, 20);
}
.old {
  text-decoration: line-through;
  font-size: 12px;
  color: rgb(147, 153, 159);
}
</style>
