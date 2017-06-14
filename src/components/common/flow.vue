<template>
  <div class="wrap">
    <div class="flow-pic">
      <div class="contain change" v-text="stateVal[0]"></div>
      <Icon type="arrow-right-a" size="40"></Icon>
      <div class="contain" v-text="stateVal[1]"></div>
      <Icon type="arrow-right-a" size="40"></Icon>
      <div class="contain" v-text="stateVal[2]"></div>
      <Icon type="arrow-right-a" size="40"></Icon>
      <div class="contain" v-text="stateVal[3]"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'flow',
    data () {
      return {
        stateVal: ['提交申请','行政审批',
          '技术审批','审批完成']

      }
    }
  }
</script>


<style scoped>
  .wrap{
    width: 100%;
    padding: 10px 0;
  }

  .flow-pic{
    display: flex;
    justify-content: flex-start;
    width: 566px;
    margin: 0 auto;
  }
  .contain {
    width: 100px;
    height: 60px;
    line-height: 60px;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    margin: 0 10px;
    font-size: 16px;
  }
  .ivu-icon{
    padding-top: 11px;
  }


  .change {
    border: 1px solid #2589f3;
  }

</style>
