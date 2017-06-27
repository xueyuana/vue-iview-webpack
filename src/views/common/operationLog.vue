<template>
  <div class="inquire">
    <div class="inquire-form">
      <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="70">
        <Row :gutter="16">
          <Col span="8">
            <Form-item label="日期:" prop="start_time">
              <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="formValidate.start_time" style="max-width: 250px"></Date-picker>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="关键字:" prop="key_name">
              <Input v-model="formValidate.key_name" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="5">
            <div class="inquire-form-query">
              <Button type="primary" class="inquire-form-query-add" @click.native="goQuery">查询</Button>
              <Button type="ghost" @click="handleReset('formValidate')">重置</Button>
            </div>
          </Col>
        </Row>
        <!--<Row type="flex" justify="end">-->
          <!--<Col span="24" style="min-height: 20px">-->
          <!--<div class="operation-form-query">-->
            <!--<Button type="primary" class="operation-form-query-add" @click.native="goQuery">查询</Button>-->
            <!--<Button type="ghost" @click="handleReset('formValidate')">重置</Button>-->
          <!--</div>-->
          <!--</Col>-->
        <!--</Row>-->
      </Form>
    </div>
    <div class="inquire-table">
      <div class="inquire-table-title">日志列表</div>
      <Table :columns="columns" :data="dataDemo" stripe class="inquire-table-tb"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.data1.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  /*@import "../../static/css/common.less";*/
</style>

<script>
  export default {
    data() {
      return {
        formValidate: {
          key_name: '',
          start_time: ''
        },
        ruleValidate: {
          key_name: [],
          start_time: []
        },
        columns: [
          {
            title: '序号',
            key: 'index',
            align: 'center',
            width: 100
          },
          {
            title: '用户',
            key: 'userName',
            align: 'center'
          },
          {
            title: '操作日志',
            key: 'operation',
            align: 'center'
          },
          {
            title: '日期',
            key: 'create_date',
            align: 'center',
            sortable: true
          }
        ],
        dataDemo: [
          {
            index: 1,
            userName: '陈小红',
            operation: '申请了4条资源数据',
            create_date: '2016-10-04'
          },
          {
            index: 2,
            userName: '李艾',
            operation: '行政通过了资源申请',
            create_date: '2016-10-05'
          },
          {
            index: 3,
            userName: '吕一',
            operation: '修改登录密码',
            create_date: '2016-10-06'
          },
          {
            index: 4,
            userName: '秦浩',
            operation: '查询了资源池信息',
            create_date: '2016-10-07'
          }
        ],
        data1: [],
        pageSize: 10,
        num: 1
      }
    },
    computed: {},
    methods: {
      goQuery () {
        console.log('ddsss', this.formValidate);
        this.dataDemo = [{
          index: 3,
          userName: '吕一',
          operation: '修改登录密码',
          create_date: '2016-10-06'
        }];
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.dataDemo = [
          {
            index: 1,
            userName: '陈小红',
            operation: '申请了4条资源数据',
            create_date: '2016-10-04'
          },
          {
            index: 2,
            userName: '李艾',
            operation: '行政通过了资源申请',
            create_date: '2016-10-05'
          },
          {
            index: 3,
            userName: '吕一',
            operation: '修改登录密码',
            create_date: '2016-10-06'
          },
          {
            index: 4,
            userName: '秦浩',
            operation: '查询了资源池信息',
            create_date: '2016-10-07'
          }
        ];
      },
      // 分页
      changePage(val) {
        this.filterDate = this.mockTableData(this.data1, this.pageSize, val)
      },
      changePageSize(val) {
        this.pageSize = val
        this.changePage(1)
      },
      // 时间选择器
      //formatCreateData(value) {
      //  this.formValidate.start_time = value
      //}
    }
  }
</script>