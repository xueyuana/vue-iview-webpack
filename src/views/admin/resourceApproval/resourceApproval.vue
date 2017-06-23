<template>
  <div class="inquire">
    <!--查询条件-->
    <div class="inquire-form">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="70">
        <Row :gutter="32">
          <Col span="5">
            <Form-item label="申请人:" prop="applicant">
              <Input v-model="formItem.resource_name" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="申请日期:" prop="date">
              <Date-picker v-model="formItem.date" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="max-width: 250px"></Date-picker>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="审批状态:" prop="status">
              <Select v-model="formItem.status" clearable style="">
                <Option :value="1" :key="1">待审批</Option>
                <Option :value="2" :key="2">审批未通过</Option>
                <Option :value="3" :key="3">审批完成</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="部署实例:" prop="deploy_name">
              <Select v-model="formItem.deploy_name" clearable>
                <Option :value="1" :key="1">部署实例1</Option>
                <Option :value="2" :key="2">部署实例2</Option>
              </Select>
            </Form-item>
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col span="24">
          <Form-item>
            <div class="inquire-form-query">
              <Button type="primary" class="inquire-form-query-add" @click.native="onInquire">查询</Button>
              <Button type="ghost" @click="handleReset('formItem')">重置</Button>
            </div>
          </Form-item>
          </Col>
        </Row>
      </Form>
    </div>

    <!--查询结果-->
    <div class="inquire-table">
      <div class="inquire-table-title">资源审批列表</div>
      <Table stripe size="small" :columns="columns" :data="filterDate"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.data1.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
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
          applicant: '',
          date: '',
          status: '',
          deploy_name: ''
        },
        ruleValidate: {
          applicant: [],
          date: [],
          status: [],
          deploy_name: []
        },
        userInfo: '',
        columns:  [
          {
            title: '序号',
            type: 'index',
            align: 'center'
          },
          {
            title: '申请单号',
            key: 'order_number',
            align: 'center',
            render: (h, params) => {
              return h('a',{
                on: {
                  click: () => {
                    this.$router.push({name: 'approval_resourceDetails', query: {id: params.row.order_number}})
                  }
                }
              }, params.row.order_number)
            }
          },
          {
            title: '申请人',
            key: 'applicant',
            align: 'center'
          },
          {
            title: '部署实例',
            key: 'deploy_name',
            align: 'center'
          },
          {
            title: '资源池',
            key: 'resource_pool',
            align: 'center'
          },
          {
            title: '审批状态',
            key: 'status',
            align: 'center'
          },
          {
            title: '日期',
            key: 'data',
            align: 'center'
          }
        ],
        data1: [],
        filterDate: [
          {
            order_number: 'ID0001',
            applicant: 'user',
            deploy_name: '实例1',
            resource_pool: 'MDZ',
            status: '审批中',
            data: '2017-6-23'
          }
        ],
        pageSize: 10,
        num: 1
      }
    },

    mounted() {},

    methods: {
      // 查找
      onInquire() {
        let url = 'deployment/deployments'
        let query = {}
        this.formItem.applicant && (query.applicant = this.formItem.applicant)
        this.formItem.date[0] && (query.start_time = formatDate(this.formItem.date[0]))
        this.formItem.date[1] && (query.end_time = formatDate(this.formItem.date[1]))
        this.formItem.status && (query.status = this.formItem.status)
        this.formItem.deploy_name && (query.deploy_name = this.formItem.deploy_name)

        this.$http.get(url, {
          params: query
        }).then(data => {
          console.log('部署列表', data)
          this.data1 = data.body
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
        this.formItem.start_time = value
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
            start_time: originData[i].start_time.substring(0, 16),
            project_name: originData[i].project_name,
            status: this.formatStatus(originData[i].deploy_result),
            deploy_id: originData[i].deploy_id,
            deploy_name: originData[i].deploy_name,
            resource_name: originData[i].resource_name
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
        }
      }
    }
  }
</script>