<template>
  <div class="inquire">
    <div class="inquire-form">
      <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="70">
        <Row :gutter="16">
          <Col span="5">
            <Form-item label="申请人:" prop="apply_name">
              <Input v-model="formValidate.apply_name" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="申请日期:" prop="start_time">
              <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="formValidate.start_time" @on-change="formatCreateData"></Date-picker>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="审批状态:" prop="apply_status">
              <Select v-model="formValidate.apply_status" clearable style="">
                <Option :value="1" :key="1">待审批</Option>
                <Option :value="2" :key="2">审批未通过</Option>
                <Option :value="3" :key="3">审批完成</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="部署实例:" prop="case">
              <Select v-model="formValidate.case" clearable style="">
                <Option :value="1" :key="1">部署实例1</Option>
                <Option :value="2" :key="2">部署实例2</Option>
              </Select>
            </Form-item>
          </Col>
          <!--<Col span="4">-->
          <!--<Form-item>-->
            <!--<div class="inquire-form-query">-->
              <!--<Button type="primary" class="inquire-form-query-add" @click.native="goQuery">查询</Button>-->
              <!--<Button type="ghost" @click="handleReset('formValidate')">重置</Button>-->
            <!--</div>-->
          <!--</Form-item>-->
          <!--</Col>-->
        </Row>
        <Row type="flex" justify="end">
          <Col span="24">
            <Form-item>
              <div class="inquire-form-query">
                <Button type="primary" class="inquire-form-query-add" @click.native="goQuery">查询</Button>
                <Button type="ghost" @click="handleReset('formValidate')">重置</Button>
              </div>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="inquire-table">
      <div class="inquire-table-title">申请资源列表</div>
      <Table stripe :columns="columns" :data="dataDemo"></Table>
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
  export default {
    data() {
      return {
        formValidate: {
          apply_name: '',
          start_time: '',
          apply_status: '',
          case: ''
        },
        ruleValidate: {
          apply_name: [],
          start_time: [],
          apply_status: [],
          case: []
        },
        columns: [
          {
            title: '序号',
            key: 'index',
            align: 'center',
            width: 100
          },
          {
            title: '申请单号',
            key: 'apply_code',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style: {
                    marginRight: '0px'
                  },
                  domProps: {
                    innerHTML: params.row.id
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'approval_resourceDetails', query: {apply_code: params.row.apply_code}});
                    }
                  }
                }, params.row.apply_code)
              ]);
          }
        },
        {
          title: '申请人',
                  key: 'apply_name',
                align: 'center'
        },
        {
          title: '审批状态',
                  key: 'apply_status',
                align: 'center',
                sortable: true
        },
        {
          title: '部署实例',
                  key: 'case',
                align: 'center',
                sortable: true
        },
        {
          title: '资源池',
                  key: 'resource',
                align: 'center',
                sortable: true
        },
        {
          title: '申请日期',
                  key: 'create_date',
                align: 'center',
                sortable: true
        }
      ],
        dataDemo: [
          {
            index: 1,
            apply_code: 'ID0001',
            apply_name: 'user',
            apply_status: '待审批',
            case: '实例1',
            resource: 'DMZ',
            create_date: '2016-06-23'
          }
        ],
        data1: [],
        pageSize: 10,
        num: 1
      }
    },
    computed: {},
    methods: {
      goQuery (name) {
        console.log('ddsss', this.formValidate);
        this.dataDemo = [{
          index: 1,
          apply_code: 'ID0001',
          apply_name: '张三',
          apply_status: '待审批',
          case: '实例1',
          resource: '资源池1',
          create_date: '2016-10-04'
        }];
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.dataDemo = [
          {
            index: 1,
            apply_code: 'ID0001',
            apply_name: 'user',
            apply_status: '待审批',
            case: '实例1',
            resource: 'DMZ',
            create_date: '2016-06-23'
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
      formatCreateData(value) {
        console.log('ddsss', this.formValidate);
        this.formValidate.start_time = value
      }
    }
  }
</script>