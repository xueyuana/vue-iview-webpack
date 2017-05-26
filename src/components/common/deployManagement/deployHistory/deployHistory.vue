<template>
  <div class="inquire">
    <!--查询条件-->
    <div class="inquire-form">
      <Form :model="formItem" :label-width="90">
        <Row :gutter="16">
          <Col span="5">
          <Form-item label="发起人:">
            <Input v-model="formItem.initiator" placeholder="请输入"></Input>
          </Form-item>
          </Col>
          <Col span="10">
          <Form-item label="发起日期:">
            <Row>
              <Col span="11">
                <Date-picker type="datetime" placeholder="选择起始日期" @on-change="formatCreateData"></Date-picker>
              </Col>
              <Col span="2" style="text-align: center">至</Col>
              <Col span="11">
                <Date-picker type="datetime" placeholder="选择截止日期" @on-change="formatEndData"></Date-picker>
              </Col>
            </Row>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="部署名称:">
            <Input v-model="formItem.deploy_name" placeholder="请输入"></Input>
          </Form-item>
          </Col>
          <Col span="3"></Col>
        </Row>
        <Row :gutter="16">
          <Col span="21">
          <div class="inquire-form-project_name">
            <Form-item label="所属部署单元:">
              <Input v-model="formItem.project_name" placeholder="请输入"></Input>
            </Form-item>
          </div>
          </Col>
          <Col span="3">
            <Button type="primary" @click.native="onInquire">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>

    <!--查询结果-->
    <div class="inquire-table">
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
      padding-top: 15px;
      background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(228, 228, 228) 100%, rgb(228, 228, 228) 100%);;
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

  export default {
    mounted() {
      this.onInquire()
    },
    data() {
      return {
        formItem: {
          initiator: '',
          created_time: '',
          end_time: '',
          deploy_name: '',
          proStatus: '',
          formStatus: '',
          project_name: ''
        },
        columns: [
          {
            title: '编号',
            type: 'index',
            align: 'center'
          },
          {
            title: '发起人',
            key: 'initiator',
            align: 'center'
          },
          {
            title: '发起日期',
            key: 'created_time',
            align: 'center'
          },
          {
            title: '所属部署单元',
            key: 'project_name',
            align: 'center'
          },
          {
            title: '部署状态',
            key: 'status',
            align: 'center'
          }
//          {
//            title: '操作',
//            key: 'action',
//            align: 'center',
//            render: (h, params) => {
//              return h('Button', {
//                props: {
//                  type: 'primary',
//                  size: 'small'
//                },
//                on: {
//                  click: () => {
//                    console.log(111)
//                  }
//                }
//              }, '重新部署');
//            }
//          }
        ],
        data1: [],
        filterDate: [],
        pageSize: 10,
        num: 1
      }
    },
    methods: {
      // 查找
      onInquire() {
        let url = baseUrl.apihost + 'deployment/deployments'
        let query = {}

        this.formItem.initiator && (query.initiator = this.formItem.initiator)
        this.formItem.created_time && (query.start_time = this.formItem.created_time)
        this.formItem.end_time && (query.end_time = this.formItem.end_time)
        this.formItem.project_name && (query.project_name = this.formItem.project_name)
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
            deploy_id: originData[i].deploy_id
          })
        }
        return data;
      }
    }
  }
</script>