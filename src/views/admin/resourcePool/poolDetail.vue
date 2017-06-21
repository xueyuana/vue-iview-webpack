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
        <!--查询条件-->
        <div class="inquire-form">
          <Form :model="formItem" :label-width="90">
            <Row :gutter="60">
              <Col span="14">
              <Form-item label="创建开始日期:">
                <Row>
                  <Col span="11">
                  <Date-picker type="datetime" placeholder="选择起始日期" @on-change="formatCreateData"></Date-picker>
                  </Col>
                  <Col span="2" style="text-align: center">
                  至</Col>
                  <Col span="11">
                  <Date-picker type="datetime" placeholder="选择截止日期" @on-change="formatEndData"></Date-picker>
                  </Col>
                </Row>
              </Form-item>
              </Col>
              <Col span="10">
                <Form-item label="名称:">
                  <Input v-model="formItem.resource_name" placeholder="请输入"></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="20">
                <Form-item label="IP地址:">
                  <Input v-model="formItem.IP" placeholder="请输入" style="max-width: 160px"></Input>
                </Form-item>
              </Col>
              <Col span="2">
                <Button type="primary" @click.native="onInquire">查询</Button>
              </Col>
              <Col span="2">
                <Button type="ghost" @click.native="onInquire">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>

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
          created_time: '',
          end_time: '',
          resource_name: '',
          IP: ''
        },
        userInfo: '',
        columns: [
          {
            title: '序号',
            type: 'index',
            align: 'center'
          },
          {
            title: '名称',
            key: 'name',
            align: 'center'
          },
//          {
//            title: '型号',
//            key: 'model',
//            align: 'center'
//          },
//          {
//            title: '规格',
//            key: 'standard',
//            align: 'center'
//          },
//          {
//            title: 'IP',
//            key: 'ip',
//            align: 'center'
//          },
          {
            title: '虚拟机数量',
            key: 'virtual_machine',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    this.$router.push({name: 'admin_virtualManage'})
                  }
                }
              }, params.row.resource_name)
            }
          },
          {
            title: 'CPU占比',
            key: 'CPU_proportion',
            align: 'center'
          },
          {
            title: '内存占比',
            key: 'RAM_proportion',
            align: 'center'
          },
          {
            title: '磁盘占比',
            key: 'disk_proportion',
            align: 'center'
          }
        ],
        data1: [],
        filterDate: [
          {
            name: '资源池一',
//            model: 20,
//            standard: '',
//            ip: '',
            virtual_machine: 200,
            CPU_proportion: '30%',
            RAM_proportion: '10%',
            disk_proportion: '20%'
          }
        ],
        pageSize: 10,
        num: 1
      }
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
      // 时间选择器
      formatCreateData(value) {
        this.formItem.created_time = value
      },
      onUnitChange(val) {
        this.formItem.resource_name = ''
        console.log(val)
        this.getDeployList()
        this.onInquire()
      },
      onDeployChange(val) {
        if (!val) return
        this.onInquire()
      },
      formatEndData(value) {
        this.formItem.end_time = value
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
        for (let i = num; i < maxNum; i++) {
          data.push({
            initiator: originData[i].initiator,
            created_time: originData[i].created_time.substring(0, 16),
            project_name: originData[i].project_name,
            status: this.formatStatus(originData[i].deploy_result),
            deploy_id: originData[i].deploy_id,
            deploy_name: originData[i].deploy_name,
            resource_name: originData[i].resource_name
          })
        }
        return data;
      }
    }
  }
</script>