<template>
  <div class="inquire">
    <!--查询条件-->
    <div class="inquire-form">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
        <Row :gutter="16">
          <Col span="8">
            <Form-item label="日期:" prop="date">
              <Date-picker v-model="formItem.date" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="max-width: 250px"></Date-picker>
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
            key: 'pool_name',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    this.$router.push({name: 'admin_poolDetails', query: {hosts: JSON.stringify(params.row.hosts)}})
                  }
                }
              }, params.row.pool_name)
            }
          },
          {
            title: '物理机',
            key: 'physical_machine',
            align: 'center',
            render: (h, params) => {
              return h('p', params.row.hosts.length)
            }
          },
          {
            title: '虚拟机总数',
            key: 'virtual_machine',
            align: 'center'
          }
        ],
        data1: [],
        filterDate: [],
        pageSize: 10,
        num: 1
      }
    },

    created() {
      this.onInquire()
    },

    methods: {
      // 查找
      onInquire() {
        let url = 'api/pool/pools'
        let query = {}
//        this.formItem.date[0] && (query.start_time = formatDate(this.formItem.date[0]))
//        this.formItem.date[1] && (query.end_time = formatDate(this.formItem.date[1]))
//        this.formItem.image_name && (query.image_name = this.formItem.image_name)
//        console.log(query)

        this.$http.get(url, {
          params: query
        }).then(res => {
          if (res.body.code === 200) {
            console.log('资源池列表', res)
            this.data1 = res.body.result.res
            this.filterDate = this.mockTableData(this.data1, this.pageSize, 1)
          } else {
            this.$Message.error(res.body.result.msg)
          }
        }, err => {
          this.$Message.error(res.body.result.msg)
          console.log('error', err)
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields()
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