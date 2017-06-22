<template>
  <div class="tabs">
    <ul class="tabs-btns">
      <li :class="{'active': currentIndex == index}" v-for="(item, index) in tabs"  @click="onTabs(index)" :key="index">{{item}}</li>
    </ul>
    <ul class="tabs-content">
      <li v-for="(item, index) in tabs"
          v-show="currentIndex == index"><slot :name="'item' + index"></slot></li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
  .tabs {
    display: flex;
    &-btns {
      width: 170px;
      li {
        height: 50px;
        border: 1px solid #FFFFFF;
        margin: 10px 0;
        font-size: 16px;
        text-align: center;
        line-height: 50px;
        color: #303030;
        &.active {
          background-color: #fff;
          color: #00923F;
        }
      }
    }
    &-content {
      flex: 1;
      padding: 20px 0 0 50px;
      overflow: hidden;
      li {
        max-height: 430px;
        overflow-y: scroll;
      }
    }

  }
</style>

<script>
  export default {
    props: {
      tabs: {
        type: Array,
        default() {
          return ['item1', 'item2', 'item3']
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    computed: {},
    methods: {
      onTabs(index) {
        this.currentIndex = index
      }
    }
  }
</script>