<template>
  <div class="inquire">
    <!--查询条件-->
    <div class="inquire-form">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="90">
        <Row :gutter="32">
          <Col span="8">
          <Form-item label="选择日期:" prop="date">
            <Date-picker v-model="formItem.date" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="max-width: 250px"></Date-picker>
          </Form-item>
          </Col>
          <Col span="8">
          <Form-item label="用户:" prop="user">
            <Input v-model="formItem.user" placeholder="请输入" style="max-width: 250px"></Input>
          </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="部署实例名称:" prop="deploy_name">
              <Input v-model="formItem.deploy_name" placeholder="请输入" style="max-width: 250px"></Input>
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
      <div class="inquire-table-title">镜像列表</div>
      <Table stripe size="small" :columns="columns" :data="filterDate"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.data.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>

    <!--弹出层-->
    <Modal
        title="分配公网IP"
        width="300"
        v-model="option"
        @on-ok="onOk"
        :mask-closable="false"
        class-name="vertical-center-modal">
      <div class="from_wrap">
        <Form ref="formCustom" :model="formCustom" :label-width="80">
          <Form-item label="IP类型:">
            <Select v-model="formCustom.ip_type" placeholder="请选择">
              <Option value="test_ip">测试IP</Option>
              <Option value="online_ip">上线IP</Option>
            </Select>
          </Form-item>
          <Form-item label="公网IP地址:">
            <Input v-model="formCustom.ip_address" disabled></Input>
          </Form-item>
          <Form-item label="内网IP地址:">
            <Input v-model="formCustom.subpri_ipnet_mask" placeholder="192.168.2.1/24"></Input>
          </Form-item>
        </Form>
      </div>
    </Modal>

  </div>
</template>

<style lang="less">
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
      top: 0;
    }
  }
  .from_wrap {
    padding-right: 25px;
  }
</style>

<script>
  import {getStroage} from 'tools/cookieAction.js'
  import {formatDate} from 'tools/formatDate.js'

  export default {
    data() {
      return {
        formItem: {
          date: [],
          user: '',
          deploy_name: ''
        },
        ruleValidate: {
          date: [],
          user: [],
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
            title: '部署实例名称',
            key: 'deploy_name',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                  on: {
                    click: () => {
                      this.$router.push({name: 'admin_deployDetails'})
                    }
                  }
                }, params.row.deploy_name)
            }
          },
          {
            title: '用户',
            key: 'user',
            align: 'center'
          },
          {
            title: '上线IP',
            key: 'online_ip',
            align: 'center'
          },
          {
            title: '测试IP',
            key: 'test_ip',
            align: 'center'
          },
          {
            title: '分配日期',
            key: 'created_time',
            align: 'center'
          },
          {
            title: '操作',
            key: 'option',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.option = true
                  }
                }
              }, '编辑')
            }
          }

        ],
        data: [],
        filterDate: [
          {
            deploy_name: 'mySql',
            user: 'user',
            online_ip: '172,16.2.1',
            test_ip: '',
            created_time: '2017-06-23'
          }
        ],
        formCustom: {
          pub_ip: '',
          pri_ip: ''
        },
        option: false,
        pageSize: 10,
        num: 1
      }
    },

    mounted() {
//      this.onInquire()
    },

    methods: {
      // 查找
      onInquire() {

        let query = {}
        this.formItem.date[0] && (query.start_time = formatDate(this.formItem.date[0]))
        this.formItem.date[1] && (query.end_time = formatDate(this.formItem.date[1]))
        this.formItem.image_format && (query.image_format = this.formItem.image_format)
        this.formItem.image_name && (query.image_name = this.formItem.image_name)
        console.log(query)

        this.$http.get('api/image/images', {
          params: query
        }).then(res => {
          console.log('镜像列表', res)
          if (res.body.code === 200) {
            this.data = res.body.result.res
            this.filterDate = this.mockTableData(this.data, this.pageSize, 1)
          } else {
            this.$Message.error(res.body.result.msg)
          }
        }, err => {
          console.log('error', err)
          this.$Message.error(err.body.result.msg)
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields()
      },
      // 确定分配
      onOk() {

      },
      // 时间选择器
      formatCreateData(value) {
        this.formItem.start_time = value
      },
      onUnitChange(val) {
        this.formItem.image_name = ''
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
        this.filterDate = this.mockTableData(this.data, this.pageSize, val)
      },
      changePageSize(val) {
        this.pageSize = val
        this.changePage(1)
      },
      mockTableData (originData, pageSize, index) {
        let data = [];
        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > originData.length ? originData.length : (num + pageSize)

        return originData.slice(num, maxNum)
      }
    }
  }
</script>