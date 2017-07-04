<template>
  <div class="survey">
    <!--资源使用概况-->
    <div class="resource-survey">
      <div class="sub-title-bg">
        <span>资源概览</span>
      </div>
      <div class="resource-pie">
        <Row type="flex" justify="start">
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
    <div class="sub-title-bg">
      <span>待审批</span>
    </div>

    <Row class="c_application">
      <Col span="12">
        <div @click="toApproval">
          <Icon type="record" size="10"></Icon>资源审批
          <span class="title">待审批：</span><span class="num">{{approvalList.length}}</span>
        </div>
      </Col>
      <Col span="12"></Col>
    </Row>

  </div>
</template>

<style lang="less" scoped>
  @import "../../static/css/common.less";
  /*概况*/
  .resource-pie {
    margin-top: 10px;
    margin-bottom: 40px;
  }

</style>

<script>
  var echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/pie');

  export default {
    data() {
      return {
        approvalList: []
      }
    },

    created() {
      this.onInit()
      this.onInquire()
    },

    methods: {
        // 查询资源概览
      onInit() {
        let url = 'api/pool/statistics'
        this.$http.get(url).then(res => {
          if (res.body.code === 200) {
            this.drawPie(res.body.result.res)
          } else {
            this.$Message.error(res.body.result.msg)
          }
        }).catch(err => {
          this.$Message.error(err.body.result.msg)
        })
      },
        // 技术待审批
      onInquire() {
        let url = 'api/mpc_resource/mpc_resources'
        let query = {status: 'l_success'}

        this.$http.get(url, {
          params: query
        }).then(res => {
          if (res.body.code === 200) {
            this.approvalList = res.body.result.res
          } else {
            this.$Message.error(res.body.result.msg)
          }
        }, err => {
          console.log('error', err)
        })
      },

        // 绘制饼图
      drawPie(data) {

        console.log(data)
        let vcpu_use = data.vcpu_use
        let cpu_unUse = data.vcpu_total - vcpu_use
        let memory_mb_use = data.memory_mb_use
        let memory_mb_unUse = data.memory_mb_total - memory_mb_use
        let storage_gb_use = data.storage_gb_use
        let storage_gb_unUse = data.storage_gb_total - storage_gb_use


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
                  value: vcpu_use,
                  name: '使用占比',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#92BF65'
                    }
                  }
                },
                {
                  value: cpu_unUse <= 0 ? 0 : cpu_unUse,
                  name: cpu_unUse <= 0 ? '' : '剩余占比',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#5AD6F4'
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
                  value: memory_mb_use,
                  name: '已经分配',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#92BF65'
                    }
                  }
                },
                {
                  value: memory_mb_unUse,
                  name: '未分配',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#5AD6F4'
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
                  value: storage_gb_use,
                  name: '已经分配',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#92BF65'
                    }
                  }
                },
                {
                  value: storage_gb_unUse,
                  name: '未分配',
                  label: {
                    normal: {
                      show: true,
                      position: 'inside'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#5AD6F4'
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
        this.$router.push({name: '资源审批管理'})
      }
    }
  }
</script>