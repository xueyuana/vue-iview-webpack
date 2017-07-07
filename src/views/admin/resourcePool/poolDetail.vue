<template>
  <div class="survey">
    <!--资源使用概况-->
    <div class="resource-survey">
      <div class="btn-wrap">
        <Button class="btn" type="ghost" >返回</Button>
      </div>
      <div class="title">
        <span>资源概况</span>
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
    <!--物理机信息-->
    <div class="pending">
      <div class="title">
        <span>物理机信息</span>
      </div>
      <div class="inquire">
        <!--查询结果-->
        <div class="inquire-table">
          <Table size="small" :columns="columns" :data="filterDate"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="this.data1.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
  /*概况*/
  .survey {
    margin-top: 20px;
  }

  .btn-wrap {
    .btn {
      float: right;
    }
  }

  .survey .title {
    /*#0AB7E9;*/
    background-color: #3F94FC;
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
  var echarts = require('echarts');
  // 关系图
  require('echarts/lib/chart/pie');

  export default {
    data () {
      return {
        formItem: {
          date: [],
          resource_name: '',
          IP: ''
        },
        ruleValidate: {
          date: [],
          resource_name: [],
          IP: []
        },
        hosts: [],
        columns: [
          {
            title: '序号',
            key: 'index',
            align: 'center',
            width: '100'
          },
          {
            title: '名称',
            key: 'host_name',
            align: 'center',
            className: 'table-column-overflow'
          },
          {
            title: '虚拟机数量',
            key: 'running_vms',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    this.$router.push({name: '虚拟机管理', query: {host_name: params.row.host_name}})
                  }
                }
              }, params.row.running_vms)
            }
          },
          {
            title: 'CPU占比（已分配/总计）',
            key: 'CPU_proportion',
            align: 'center',
            render: (h, params) => {
              return h('p', params.row.vcpu_use + ' / ' + params.row.vcpu_total)
            }
          },
          {
            title: '内存占比（G）',
            key: 'RAM_proportion',
            align: 'center',
            render: (h, params) => {
              return h('p', parseInt(params.row.memory_mb_use/1024 ) + ' / ' + parseInt(params.row.memory_mb_total/1024))
            }
          },
          {
            title: '磁盘占比（G）',
            key: 'disk_proportion',
            align: 'center',
            render: (h, params) => {
              return h('p', params.row.storage_gb_use + ' / ' + params.row.storage_gb_total)
            }
          }
        ],
        data1: [],
        filterDate: [],
        pageSize: 10,
        num: 1
      }
    },

    created() {
      this.hosts = JSON.parse(this.$route.query.hosts)
      this.onInquire()
    },

    methods: {
      // 1. 查询物理机
      onInquire() {
        let url = 'api/pool/getHosts'
        let params = ''
        this.hosts.forEach(item => {
          params += ('&host=' + item)
        })
        url += ('?' +  params.slice(1))

        this.$http.get(url).then(res => {
          if (res.body.code === 200) {
            this.data1 = res.body.result.res
            this.data1.forEach((item, index) => {
              item.index = index + 1
            })
            console.log('物理机', this.data1 )
            this.filterDate = this.mockTableData(this.data1, this.pageSize, 1)
            // 开始绘制饼图
            this.drawPie(this.data1)
          } else {
            this.$Message.error(res.body.result.msg)
          }
        }, err => {
          console.log('error', err)
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields()
      },

      // 2. 绘制饼图
      drawPie(data) {
        let cpu_use = this.countSum(data, 'vcpu_use')
        let cpu_unUse = this.countSum(data, 'vcpu_total') - cpu_use
        let memory_use = parseInt(this.countSum(data, 'memory_mb_use')/1024)
        let memory_unUse = parseInt((this.countSum(data, 'memory_mb_total') - memory_use)/1024)
        let storage_use = this.countSum(data, 'storage_gb_use')
        let storage_unUse = this.countSum(data, 'storage_gb_total') - storage_use

        let myChart1 = echarts.init(document.getElementById('my-resource1'));
        let option1 = {
          title: {
            text: 'CPU情况统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} 个 ({d}%)"
          },
          legend: {
            orient: 'horizontal',
            bottom: '10',
            data: ['使用占比', '剩余占比']
          },
          series: [
            {
              name: 'CPU情况统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {
                  value: cpu_use,
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
            text: '内存情况统计',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} G ({d}%)"
          },
          legend: {
            orient: 'horizontal',
            bottom: '10',
            data: ['已经分配', '未分配']
          },
          series: [
            {
              name: '内存情况统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {
                  value: memory_use,
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
                  value: memory_unUse,
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
            formatter: "{b} : {c} G ({d}%)"
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
                  value: storage_use,
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
                  value: storage_unUse,
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
        myChart3.setOption(option3)

      },

      // 计算所有数据中某条信息的总和
      countSum(data, attr) {
        let sum = 0
        data.forEach(item => {
          if ((typeof item[attr]) == 'number') {
            sum += item[attr]
          } else {
            this.$Message.error('非数字')
          }
        })
        return sum
      },

      // 分页
      changePage(val) {
        this.filterDate = this.mockTableData(this.data1, this.pageSize, val)
      },
      changePageSize(val) {
        this.pageSize = val
        this.changePage(1)
      },
      mockTableData (originData, pageSize, index) {
        let data = [];
        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > this.data1.length ? this.data1.length : (num + pageSize)

        return originData.slice(num, maxNum)
      }
    }
  }
</script>