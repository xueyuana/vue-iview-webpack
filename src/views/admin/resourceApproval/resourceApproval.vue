<template>
  <div class="inquire">
    <!--查询条件-->
    <div class="inquire-form">
      <Form :model="formItem" :label-width="70">
        <Row :gutter="16">
          <Col span="5">
            <Form-item label="申请人:">
              <Input v-model="formItem.resource_name" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="9">
            <Form-item label="申请日期:">
              <Row>
                <Col span="11">
                <Date-picker type="datetime" placeholder="起始日期" @on-change="formatCreateData"></Date-picker>
                </Col>
                <Col span="2" style="text-align: center">至</Col>
                <Col span="11">
                <Date-picker type="datetime" placeholder="截止日期" @on-change="formatEndData"></Date-picker>
                </Col>
              </Row>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="审批状态:">
              <Select v-model="formItem.approval_status" clearable style="">
                <Option :value="1" :key="1">待审批</Option>
                <Option :value="2" :key="2">审批未通过</Option>
                <Option :value="3" :key="3">审批完成</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="部署实例:">
              <Select v-model="formItem.deploy_name" clearable style="">
                <Option :value="1" :key="1">部署实例1</Option>
                <Option :value="2" :key="2">部署实例2</Option>
              </Select>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="22" style="min-height: 20px"></Col>
          <Col span="2">
          <Button type="primary" @click.native="onInquire">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>

    <!--查询结果-->
    <div class="inquire-table">
      <div>资源审批列表：</div>
      <Table border size="small" :columns="columns" :data="filterDate"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.data1.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
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
  import baseUrl from 'tools/common.js'
  import {getStroage} from 'tools/cookieAction.js'

  export default {
    data() {
      return {
        formItem: {
          created_time: '',
          end_time: '',
          resource_name: '',
          approval_status: '',
          deploy_name: ''
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
            key: 'resource_name',
            align: 'center'
          },
          {
            title: '申请人',
            key: 'physical_machine',
            align: 'center'
          },
          {
            title: '部署实例',
            key: 'virtual_machine',
            align: 'center'
          },
          {
            title: '资源池',
            key: 'CPU_proportion',
            align: 'center'
          },
          {
            title: '审批状态',
            key: 'CPU_proportion',
            align: 'center'
          },
          {
            title: '日期',
            key: 'CPU_proportion',
            align: 'center'
          }
        ],
        data1: [],
        filterDate: [],
        pageSize: 10,
        num: 1
      }
    },

    mounted() {},

    methods: {
      // 查找
      onInquire() {
        let url = baseUrl.apihost + 'deployment/deployments'
        let query = {}
        this.formItem.initiator && (query.initiator = this.formItem.initiator)
        this.formItem.created_time && (query.start_time = this.formItem.created_time)
        this.formItem.end_time && (query.end_time = this.formItem.end_time)
        this.formItem.project_name && (query.project_name = this.formItem.project_name)
        this.formItem.resource_name && (query.resource_name = this.formItem.resource_name)
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