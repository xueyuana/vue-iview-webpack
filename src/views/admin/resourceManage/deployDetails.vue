<template>
  <div class="survey">
    <div class="resource-line">
      <Row type="flex" justify="start">
        <Col span="24">
          <div>
            <p class="sub-title">MySQL</p>
            <p class="sub-title-zi">192.168.1.1访问曲线图</p>
          </div>
        <div id="my-resource"
             style="width: 100%; height: 300px; -webkit-tap-highlight-color: transparent;use-select: none;cursor: default;">
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import "../../../static/css/common.less";
  .sub-title-zi {
    font-size: 15px;
  }
</style>

<script>
  var echarts = require('echarts/lib/echarts');
  // 关系图
  require('echarts/lib/chart/line');

  export default {
    data () {
      return {}
    },

    mounted() {
      this.drawLine();
    },

    methods: {
      // 绘制折线图
      drawLine() {
        let myChart = echarts.init(document.getElementById('my-resource'));
        let option = {
//          title : {
//            text: 'MySQL',
//            subtext: '192.168.1.1访问曲线图',
//            subtextStyle: {
//              fontSize: 18,
//              color: '#424754'
//            }
//          },
          tooltip : {
            trigger: 'axis'
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : ['18:10','18:15','18:20','18:25','18:30','18:35','18:40','18:45','18:50','18:55','19:00']
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel : {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name:'访问次数',
              type:'line',
              data : ['20','2','15','18','23','22','20','8','19','20','24'],
              itemStyle: {
                normal: {
                  color: '#67CDDE'
//                  lineStyle: {        // 系列级个性化折线样式
//                    width: 2,
//                    type: 'dashed'
//                  }
                },
//                emphasis: {
//                  color: '#92BF65'
//                }
              }
            }
          ]
        };

        myChart.clear();
        myChart.setOption(option);
      },
      // 跳转资源审批
      toApproval() {
        this.$router.push({name: 'admin_resourceApproval'})
      }
    }
  }
</script>