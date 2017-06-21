<template>
  <div class="inquire">
    <!--查询条件-->
    <div class="inquire-form">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col span="9">
            <Form-item label="日期:" prop="date">
              <Date-picker v-model="formItem.date" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="width: 250px"></Date-picker>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="资源池名称:" prop="image_name">
              <Input v-model="formItem.image_name" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="5">
            <div class="inquire-form-query">
              <Button type="primary" class="inquire-form-query-add" @click.native="onInquire">查询</Button>
              <Button type="ghost" @click="handleReset('formItem')">重置</Button>
            </div>
          </Col>
        </Row>
        <!--<div class="form-btn-wrap clearfix">-->
          <!--<div class="btns">-->
            <!--<Button type="primary" @click.native="onInquire" style="margin-right: 10px">查询</Button>-->
            <!--<Button type="ghost" @click.native="handleReset('formItem')">重置</Button>-->
          <!--</div>-->
        <!--</div>-->
      </Form>
    </div>

    <!--查询结果-->
    <div class="inquire-table">
      <div class="inquire-table-title">资源池列表</div>
      <Table stripe size="small" :columns="columns" :data="filterDate"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.data1.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
  import {getStroage} from 'tools/cookieAction.js'
  import {formatDate} from 'tools/formatDate.js'

  export default {
    data() {
      return {
        formItem: {
          date: [],
          image_name: ''
        },
        ruleValidate: {
          date: [],
          image_name: []
        },
        userInfo: '',
        columns: [
          {
            title: '序号',
            type: 'index',
            align: 'center'
          },
          {
            title: '资源池名称',
            key: 'image_name',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    console.log(22222)
                    this.$router.push({name: 'admin_poolDetails', query: {id: '000000'}})
                  }
                }
              }, params.row.image_name)
            }
          },
          {
            title: '物理机',
            key: 'physical_machine',
            align: 'center'
          },
          {
            title: '虚拟机总数',
            key: 'virtual_machine',
            align: 'center'
          }
//          {
//            title: 'CPU占比',
//            key: 'CPU_proportion',
//            align: 'center'
//          },
//          {
//            title: '内存占比',
//            key: 'RAM_proportion',
//            align: 'center'
//          },
//          {
//            title: '磁盘占比',
//            key: 'disk_proportion',
//            align: 'center'
//          }
        ],
        data1: [],
        filterDate: [
          {
            image_name: '资源池一',
            physical_machine: 20,
            virtual_machine: 200
//            CPU_proportion: '30%',
//            RAM_proportion: '10%',
//            disk_proportion: '20%'
          }
        ],
        pageSize: 10,
        num: 1
      }
    },

    mounted() {
    },

    methods: {
      // 查找
      onInquire() {
        let url = 'deployment/deployments'
        let query = {}
        this.formItem.date[0] && (query.start_time = formatDate(this.formItem.date[0]))
        this.formItem.date[1] && (query.end_time = formatDate(this.formItem.date[1]))
        this.formItem.image_name && (query.image_name = this.formItem.image_name)
        console.log(query)

        this.$http.get(url, {
          params: query
        }).then(res => {
          console.log('部署列表', res)
          this.data1 = res.body
          this.filterDate = this.mockTableData(this.data1, this.pageSize, 1)
          this.num = 1
        }, err => {
          console.log('error', err)
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields()
      },
      // 时间选择器
      formatCreateData(value) {
        console.log('ssssss', value)
        this.formItem.start_time = value
      },
      onUnitChange(val) {
        this.formItem.image_name = ''
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
            start_time: originData[i].start_time.substring(0, 16),
            project_name: originData[i].project_name,
            status: this.formatStatus(originData[i].deploy_result),
            deploy_id: originData[i].deploy_id,
            deploy_name: originData[i].deploy_name,
            image_name: originData[i].image_name
          })
        }
        return data;
      },
      // 请求部署单元列表
      getProjectList() {
        let url = baseUrl.apihost + 'iteminfo/iteminfoes/local/' + this.userInfo.user_id
        this.$http.get(url).then(data => {
          console.log('部署单元列表', data)
          this.project_list = data.body.result.res
        }, err => {
          console.log('error', err)
        })
      },
      // 获取部署单元下对应部署列表
      getDeployList() {
        let url = baseUrl.apihost + 'resource/'
        let query = {}
        this.userInfo.user_id && (query.user_id = this.userInfo.user_id)
        this.formItem.project_name && (query.project = this.formItem.project_name)

        this.$http.get(url, {
          params: query
        }).then(data => {
          console.log('资源列表', data)
          this.resource_list = data.body.result.msg.filter(item => item.reservation_status === 'ok')
        }, err => {
          console.log('error', err)
        })
      },
      formatStatus(val){
        switch (val) {
          case 'deploying':
            return '部署中'
          case 'not_deployed':
            return '未部署'
          case 'fail':
            return '失败'
          case 'success':
            return '成功'
          default:
            break
        }
      }
    }
  }
</script>