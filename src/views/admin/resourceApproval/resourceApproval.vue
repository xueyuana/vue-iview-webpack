<template>
  <div class="inquire">
    <!--查询条件-->
    <div class="inquire-form">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="70">
        <div class="form-wrap">
          <Form-item label="申请日期:" prop="date" class="form-item">
            <Date-picker v-model="formItem.date" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间"
                         style="width: 250px"></Date-picker>
          </Form-item>
          <Form-item label="申请人:" prop="userName" class="form-item">
            <Select v-model="formItem.userName" filterable clearable style="width: 250px"
                    :placeholder="userList.length ? '请选择' : '无'">
              <Option v-for="(item, index) in userList" :value="item.username" :key="index">{{ item.username }}</Option>
            </Select>
          </Form-item>
          <Form-item label="审批状态:" prop="status" class="form-item">
            <Select v-model="formItem.status" clearable style="width: 250px">
              <Option value="l_success">待审批</Option>
              <Option value="a_success">已审批</Option>
              <Option value="a_fail">审批不通过</Option>
              <Option value="created_success">已创建</Option>
            </Select>
          </Form-item>
          <Form-item label="部署实例:" prop="instance_id" class="form-item">
            <Select v-model="formItem.instance_id" clearable style="width: 250px">
              <Option :value="item.instance_id" v-for="item in formItem.instance">{{item.instance_name}}</Option>
            </Select>
          </Form-item>
        </div>

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
      <Table size="small" :columns="columns" :data="filterDate"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.data1.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>

<script>
  import { formatDate } from '../../../tools/formatDate'
  export default {
    data() {
      return {
        formItem: {
          userName: '',
          date: '',
          status: '',
          instance_id: ''
        },
        instance: [],
        ruleValidate: {
          userName: [],
          date: [],
          status: [],
          instance_id: []
        },
        columns: [
          {
            title: '序号',
            key: 'index',
            align: 'center',
            width: '60'
          },
          {
            title: '申请单号',
            key: 'resource_id',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    this.$router.push({name: '资源详情', query: {id: params.row.resource_id}})
                  }
                }
              }, params.row.resource_id)
            }
          },
          {
            title: '申请人',
            key: 'user_name',
            align: 'center'
          },
          {
            title: '部署实例',
            key: 'deploy_name',
            align: 'center'
          },
          {
            title: '部署区域',
            key: 'az_name',
            align: 'center'
          },
          {
            title: '审批状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              switch (params.row.status) {
                case 'submit':
                  return h('p', '直属领导待审批')
                case 'l_fail':
                  return h('p', '直属领导审批不通过')
                case 'l_success':
                  return h('p', {
                    style: {
                      color: 'red'
                    }
                  }, '经信委技术待审批')
                case 'a_fail':
                  return h('p', '经信委技术审批不通过')
                case 'a_success':
                  return h('p', '审批完成')
                case 'created_success':
                  return h('p', '资源已创建')
                default:
              }
            }
          },
          {
            title: '日期',
            key: 'created_date',
            align: 'center',
            render: (h, params) => {
              if (params.row.created_date) {
                return h('p', params.row.created_date.slice(0, 16))
              }
            }
          }
        ],

        userList: [],   // 用户列表

        data1: [],
        filterDate: [],
        pageSize: 10,
        num: 1
      }
    },

    created() {

      this.getUserList ()
      // 部署实例列表
      this.getInstanceList()
      // 资源列表
      this.onInquire()
    },

    methods: {
      // 查找
      onInquire() {
        let url = 'api/mpc_resource/mpc_resources'
        let query = {}
        this.formItem.userName && (query.user_name = this.formItem.userName)
        this.formItem.date[0] && (query.start_time = formatDate(this.formItem.date[0]))
        this.formItem.date[1] && (query.end_time = formatDate(this.formItem.date[1]))
        this.formItem.status && (query.status = this.formItem.status)
        this.formItem.instance_id && (query.instance_id = this.formItem.instance_id)

        this.$http.get(url, {
          params: query
        }).then(data => {
          if (data.body.code === 200) {
            this.data1 = data.body.result.res
            // 排序
            let pending = []
            for (let i = 0; i < this.data1.length; i++) {
              if (this.data1[i].status === 'l_success') {
                pending.push(this.data1[i])
                this.data1.splice(i, 1)
                i--
              }
            }

            this.data1 = pending.concat(...this.data1)

            this.data1.forEach((item, index) => {
              item.index = index + 1
            })

            this.filterDate = this.mockTableData(this.data1, this.pageSize, 1)
            this.num = 1

          } else {
            this.$Message.error(data.body.result.msg)
          }

        }, err => {
          console.log('error', err)
          this.$Message.error(err.body.result.msg)
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.onInquire()
      },

      // 用户列表
      getUserList () {
        const url = 'api/user/users'
        this.$http.get(url).then(res => {
          if (res.body.code === 200) {
            this.userList = res.body.result.res
          } else {
            this.$Message.error(res.res.body.result.msg)
          }
        }, err => {
          console.log(err)
        })
      },
      // 获取实例列表
      getInstanceList () {
        const url = 'api/deploy_instance/deploy_instances'

        this.$http.get(url).then((res) => {
          if (res.body.code === 200) {
            this.formItem.instance = res.body.result.res
          } else {
            this.$Message.error(res.body.result.msg)
          }
        }, (err) => {
          console.log(err)
        })
      },
      // 分页
      changePage(val) {
        this.filterDate = this.mockTableData(this.data1, this.pageSize, val)
        this.num = val
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