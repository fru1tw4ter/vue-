<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop.prevent="decreaseCart"></div>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'cartcontrol',
  props: {
    // 最基本的数据驱动 根据food的变化来改变组建的状态
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      // 还没有加入food count
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1) // VUE提供的接口，food中不存在count 需要自己手动添加
        // this.food.count = 1
      } else {
        this.food.count++
      }
    },
    decreaseCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style scoped>
.cartcontrol {
  font-size: 0;
}
.cart-decrease {
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
}
.cart-count {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  padding-top: 6px;
  line-height: 24px;
  text-align: center;
  font-size: 14px;
  color: rgb(147, 153, 159);
}
.cart-add {
  display: inline-block;
  padding: 6px;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0, 160, 220);
}
</style>
