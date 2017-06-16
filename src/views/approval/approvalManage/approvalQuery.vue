<template>
  <div class="approval">
    <div class="approval-form">
      <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="70">
        <Row :gutter="16">
          <Col span="5">
            <Form-item label="申请人:" prop="apply_name">
              <Input v-model="formValidate.apply_name" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="9">
            <Form-item label="申请日期:">
              <Row>
                <Col span="11">
                <Form-item prop="created_time">
                  <Date-picker type="datetime" placeholder="选择日期" v-model="formValidate.created_time" @on-change="formatCreateData"></Date-picker>
                </Form-item>
                </Col>
                <Col span="2" style="text-align: center">至</Col>
                <Col span="11">
                <Form-item prop="end_time">
                  <Date-picker type="datetime" placeholder="选择日期" v-model="formValidate.end_time" @on-change="formatEndData"></Date-picker>
                </Form-item>
                </Col>
              </Row>
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
        </Row>
        <Row type="flex" justify="end">
          <Col span="24" style="min-height: 20px">
          <div class="approval-form-query">
            <Button type="primary" class="approval-form-query-add" @click.native="goQuery">查询</Button>
            <Button type="ghost" @click="handleReset('formValidate')">重置</Button>
          </div>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="approval-table">
      <div>申请资源列表：</div>
      <Table border :columns="columns" :data="dataDemo"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.data1.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .approval {
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
      &-query {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        box-sizing: border-box;
        &-add{
          margin-right: 10px;
        }
      }
    }
    &-table {
       padding: 20px 20px;
     }
  }
</style>

<script>
  export default {
    data() {
      return {
        formValidate: {
          apply_name: '',
          created_time: '',
          end_time: '',
          apply_status: '',
          case: ''
        },
        ruleValidate: {
          apply_name: [],
          created_time: [],
          end_time: [],
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
        this.formValidate.created_time = value
      },
      formatEndData(value) {
        this.formValidate.end_time = value
      }
    }
  }
</script>