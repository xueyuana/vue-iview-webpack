<template>
  <div class="approval-list">
    <div class="search-title">
      <div class="search-form">
        <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="100">
          <Row>
            <Col span="4">
            <Form-item label="申请人" prop="apply_name">
              <Input v-model="formValidate.apply_name" placeholder="请输入"></Input>
            </Form-item>
            </Col>
            <Col span="8">
            <Form-item label="申请日期">
              <Row>
                <Col span="11">
                <Form-item prop="create_date_begin">
                  <Date-picker type="datetime" placeholder="选择日期" v-model="formValidate.create_date_begin"></Date-picker>
                </Form-item>
                </Col>
                <Col span="2" style="text-align: center">至</Col>
                <Col span="11">
                <Form-item prop="create_date_end">
                  <Date-picker type="datetime" placeholder="选择日期" v-model="formValidate.create_date_end"></Date-picker>
                </Form-item>
                </Col>
              </Row>
            </Form-item>
            </Col>
            <Col span="4">
            <Form-item label="审批状态" prop="apply_status">
              <Select v-model="formValidate.apply_status" style="width:150px">
                <Option label="待审批" value="0"></Option>
                <Option label="审批未通过" value="1"></Option>
                <Option label="审批完成" value="2"></Option>
              </Select>
            </Form-item>
            </Col>
            <Col span="4">
            <Form-item label="部署实例" prop="case">
              <Select v-model="formValidate.case" style="width:200px">
                <Option label="实例1" value="0"></Option>
                <Option label="实例2" value="1"></Option>
                <Option label="实例3" value="2"></Option>
              </Select>
            </Form-item>
            </Col>
            <Col span="4">
            <Form-item>
              <Button type="primary" @click="goQuery">查询</Button>
              <Button type="ghost" @click="handleReset('formValidate')">重置</Button>
            </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <div class="table-list">
      <Table border :columns="columns" :data="dataDemo"></Table>
    </div>
  </div>
</template>

<style scoped>
  .search-title {
    padding-top: 15px;
    background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(228, 228, 228) 100%, rgb(228, 228, 228) 100%);
    border: 1px solid rgb(228, 228, 228);
    border-radius: 10px;
  }
  .table-list {
    padding: 20px 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  table tr {
    border: 1px solid #D7DDE4;
  }
  table tbody tr{
    height: 48px;
    display: table-row;
  }

  table td, table th{
    text-align: center;
    border: 1px solid #D7DDE4;
  }

  table thead tr {
    height: 40px;
    background-color: #F5F7F9;
  }

  table tbody tr:hover {
    background-color: #F3FAFF;
  }
</style>

<script>
  export default {
    data() {
      return {
        formValidate: {
          apply_name: '',
          create_date_begin: '',
          create_date_end: '',
          apply_status: '',
          case: ''
        },
        ruleValidate: {
          apply_name: [],
          create_date_begin: [],
          create_date_end: [],
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
                      this.$router.push({name: 'user_manageConsole', query: {apply_code: params.row.apply_code}});
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
            apply_name: '张三',
            apply_status: '待审批',
            case: '实例1',
            resource: '资源池1',
            create_date: '2016-10-04'
          },
          {
            index: 2,
            apply_code: 'ID0002',
            apply_name: '李四',
            apply_status: '审批未通过',
            case: '实例2',
            resource: '资源池2',
            create_date: '2016-10-05'
          },
          {
            index: 3,
            apply_code: 'ID0003',
            apply_name: '王五',
            apply_status: '审批完成',
            case: '实例3',
            resource: '资源池3',
            create_date: '2016-10-05'
          },
          {
            index: 4,
            apply_code: 'ID0004',
            apply_name: '赵六',
            apply_status: '待审批',
            case: '实例4',
            resource: '资源池4',
            create_date: '2016-10-04'
          }
        ]
      }
    },
    computed: {},
    methods: {
      goQuery (name) {
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
            apply_name: '张三',
            apply_status: '待审批',
            case: '实例1',
            resource: '资源池1',
            create_date: '2016-10-04'
          },
          {
            index: 2,
            apply_code: 'ID0002',
            apply_name: '李四',
            apply_status: '审批未通过',
            case: '实例2',
            resource: '资源池2',
            create_date: '2016-10-05'
          },
          {
            index: 3,
            apply_code: 'ID0003',
            apply_name: '王五',
            apply_status: '审批完成',
            case: '实例3',
            resource: '资源池3',
            create_date: '2016-10-05'
          },
          {
            index: 4,
            apply_code: 'ID0004',
            apply_name: '赵六',
            apply_status: '待审批',
            case: '实例4',
            resource: '资源池4',
            create_date: '2016-10-04'
          }
        ];
      }
    }
  }
</script>