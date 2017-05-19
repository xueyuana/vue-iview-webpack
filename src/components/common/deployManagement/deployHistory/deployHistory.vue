<template>
  <div class="inquire">
    <!--查询条件-->
    <div class="inquire-form">
      <Form :model="formItem" :label-width="70">
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
                <Date-picker type="date" format="yyyy-MM-dd" placeholder="选择日期" @on-change="formatCreateData"></Date-picker>
              </Col>
              <Col span="2" style="text-align: center">至</Col>
              <Col span="11">
                <Date-picker type="date" format="yyyy-MM-dd" placeholder="选择日期" @on-change="formatEndData"></Date-picker>
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
            <Form-item label="所属项目:">
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
      <Table border size="small" :columns="columns1" :data="data1"></Table>
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
  import urlBase from 'tools/common.js'

  export default {
    mounted() {
      this.onInquire()
    },
    data() {
      return {
        formItem: {
          initiator: '',
          created_time: '',
          endDate: '',
          deploy_name: '',
          proStatus: '',
          formStatus: '',
          project_name: ''
        },
        value1: '',
        columns1: [
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
            title: '部署名称',
            key: 'deploy_name',
            align: 'center'
          },
          {
            title: '所属项目',
            key: 'project_name',
            align: 'center',
            render: (h, params) => {
              return h('a', params.row['project_name'])
            }
          }
        ],
        data1: []
      }
    },
    computed: {},
    methods: {
      onInquire() {
        let url = ''
        if (this.formItem.initiator) {
          url = urlBase.apihost + 'deployment/deploy_detail/' + this.formItem.initiator
        } else if (this.formItem.created_time && this.formItem.endDate) {
          console.log('created_time', this.formItem.created_time, this.formItem.endDate)
          url = urlBase.apihost + 'deployment/deploy_time/' + this.formItem.created_time + '/' + this.formItem.endDate
        } else {
          url = urlBase.apihost + 'deployment/deployments'
        }
        this.$http.get(url).then(data => {
          console.log('success', data)
          this.data1 = data.body
        }, err => {
          console.log('error', err)
        })

      },
      formatCreateData(value) {
        this.formItem.created_time = value
      },
      formatEndData(value) {
        this.formItem.endDate = value
      }

    }
  }
</script>