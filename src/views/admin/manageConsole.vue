<template>
  <div class="survey">
    <!--资源使用概况-->
    <div class="resource-survey">
      <div class="title">
        <span>资源概览</span>
      </div>
      <div class="resource-pie">
        <Row :gutter="32">
          <Col span="8">
            <div id="my-resource1"
                 style="width: 100%;height: 300px;-webkit-tap-highlight-color: transparent;use-select: none;cursor: default;">
            </div>
          </Col>
          <Col span="8">
            <div id="my-resource2"
                 style="width: 100%;height: 300px;-webkit-tap-highlight-color: transparent;use-select: none;cursor: default;">
            </div>
          </Col>
          <Col span="8">
            <div id="my-resource3"
                 style="width: 100%;height: 300px;-webkit-tap-highlight-color: transparent;use-select: none;cursor: default;">
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <!--待审批-->
    <div class="pending">
      <div class="title">
        <span>待审批</span>
      </div>
      <a class="content" @click="toApproval">资源审批：<span>6</span></a>
    </div>

  </div>
</template>

<style scoped>
  /*概况*/
  .survey {
    margin-top: 20px;
  }

  .survey .title {
    background-color: #0AB7E9;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    width: 100px;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }

  .resource-pie {
    margin-top: 10px;
  }

  .pending {
    margin-top: 20px;
  }

  .pending .content {
    margin-left: 40px;
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    color: #000;
  }

  .pending .content span {
    color: red;
    text-decoration: underline;
  }

</style>

<script>
  var echarts = require('echarts/lib/echarts');
  // 关系图
  require('echarts/lib/chart/pie');

  export default {
    data () {
      return {}
    },

    mounted() {
      this.drawPie();
    },

    methods: {
      // 绘制饼图
      drawPie() {
        let myChart1 = echarts.init(document.getElementById('my-resource1'));
        let option1 = {
          title: {
            text: 'VCPU情况统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'horizontal',
            bottom: '10',
            data: ['使用占比', '剩余占比']
          },
          series: [
            {
              name: 'VCPU情况统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {
                  value: 335,
                  name: '使用占比',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#D53A35'
                    }
                  }
                },
                {
                  value: 310,
                  name: '剩余占比',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#00AA00'
                    }
                  }
                }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        myChart1.clear();
        myChart1.setOption(option1);

        // 第二个饼图
        let myChart2 = echarts.init(document.getElementById('my-resource2'));
        let option2 = {
          title: {
            text: '内存分配情况统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'horizontal',
            bottom: '10',
            data: ['已经分配', '未分配']
          },
          series: [
            {
              name: '内存分配情况统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {
                  value: 335,
                  name: '已经分配',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#D53A35'
                    }
                  }
                },
                {
                  value: 310, name: '未分配',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#00AA00'
                    }
                  }
                }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        myChart2.clear();
        myChart2.setOption(option2);

        let myChart3 = echarts.init(document.getElementById('my-resource3'));
        let option3 = {
          title: {
            text: '磁盘情况统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'horizontal',
            bottom: '10',
            data: ['已经分配', '未分配']
          },
          series: [
            {
              name: '磁盘情况统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {
                  value: 335,
                  name: '已经分配',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#D53A35'
                    }
                  }
                },
                {
                  value: 310, name: '未分配',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#00AA00'
                    }
                  }
                }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        myChart3.clear();
        myChart3.setOption(option3);

      },
      // 跳转资源审批
      toApproval() {
        this.$router.push({name: 'admin_resourceApproval'})
      }
    }
  }
</script>