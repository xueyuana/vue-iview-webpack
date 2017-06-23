<template>
  <div class="survey">
    <!--资源使用概况-->
    <div class="resource-survey">
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
          <Table border size="small" :columns="columns" :data="filterDate"></Table>
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

  .inquire {
    margin-top: 30px;
    &-form {
      padding: 15px;
      background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(228, 228, 228) 100%, rgb(228, 228, 228) 100%);
      border: 1px solid rgb(228, 228, 228);
      border-radius: 10px;
      &-project_name {
        width: 30%;
      }
      &-formStatus {
        width: 50%;
      }
    }
    &-table {
      padding: 20px 20px;
    }
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
            type: 'index',
            align: 'center'
          },
          {
            title: '名称',
            key: 'host_name',
            align: 'center'
          },
          {
            title: '虚拟机数量',
            key: 'running_vms',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    this.$router.push({name: 'admin_virtualManage'})
                  }
                }
              }, params.row.running_vms)
            }
          },
          {
            title: 'CPU占比',
            key: 'CPU_proportion',
            align: 'center',
            render: (h, params) => {
              return h('p', params.row.vcpu_use + ' / ' + params.row.vcpu_total)
            }
          },
          {
            title: '内存占比',
            key: 'RAM_proportion',
            align: 'center',
            render: (h, params) => {
              return h('p', params.row.memory_mb_use + ' / ' + params.row.memory_mb_total)
            }
          },
          {
            title: '磁盘占比',
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

    mounted() {
      this.hosts = JSON.parse(this.$route.query.hosts)
      this.onInquire()
      this.drawPie()
    },

    methods: {
      // 查询
      onInquire() {
        let url = 'api/pool/getHosts'
        let params = ''
        this.hosts.forEach(item => {
          params += ('&host=' + item)
        })

        url += ('?' +  params.slice(1))
        console.log(url)

        this.$http.get(url).then(res => {
          if (res.body.code === 200) {
//            console.log('物理机列表', res)
            this.data1 = res.body.result.res
            this.filterDate = this.mockTableData(this.data1, this.pageSize, 1)
            // 开始绘制饼图
//            console.log(this.countSum(this.data1, 'memory_mb_use'))
//            this.drawPie()
          } else {
            this.$Message.error(res.body.result.msg)
          }
        }, err => {
          this.$Message.error(res.body.result.msg)
//          console.log('error', err)
        })
      },
      // 重置
      handleReset(name) {
        this.$refs[name].resetFields()
      },
      // 绘制饼图
      drawPie() {
        let myChart1 = echarts.init(document.getElementById('my-resource1'));
        let option1 = {
          title: {
            text: 'CPU情况统计',
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
              name: 'CPU情况统计',
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
                      color: '#92BF65'
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
            formatter: "{b} : {c} ({d}%)"
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
                  value: 400,
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
                  value: 300,
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
                      color: '#92BF65'
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
      // 计算所有数据中某条信息的总和
      countSum(data, attr) {
        let sum = 0
        data.forEach((item,index) => {
          if ((typeof item.attr) == 'number') {
            sum += item.attr
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