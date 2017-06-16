<template>
  <div class="operation">
    <div class="operation-form">
      <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="85">
        <Row>
          <Col span="9">
            <Form-item label="日期:">
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
            <Form-item label="虚拟机名称:" prop="virtual_name" class="operation-form-virtual">
              <Input v-model="formValidate.virtual_name" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="资源池:" prop="resource">
              <Select v-model="formValidate.resource" clearable style="">
                <Option :value="1" :key="1">资源池1</Option>
                <Option :value="2" :key="2">资源池2</Option>
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
          <div class="operation-form-query">
            <Button type="primary" class="operation-form-query-add" @click.native="goQuery">查询</Button>
            <Button type="ghost" @click="handleReset('formValidate')">重置</Button>
          </div>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="operation-table">
      <div>日志列表：</div>
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
  .operation {
    margin-top: 30px;
    &-form {
       padding: 15px;
       background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(228, 228, 228) 100%, rgb(228, 228, 228) 100%);
       border: 1px solid rgb(228, 228, 228);
       border-radius: 10px;
        &-project_name {
           width: 30%;
         }
        &-virtual {
           label {
             width:80px;
           }
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
          virtual_name: '',
          created_time: '',
          end_time: '',
          resource: '',
          case: ''
        },
        ruleValidate: {
          virtual_name: [],
          created_time: [],
          end_time: [],
          resource: [],
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
            userName: '张三',
            operation: '点击查询按钮',
            create_date: '2016-10-04'
          },
          {
            index: 2,
            userName: '李四',
            operation: '点击删除按钮',
            create_date: '2016-10-05'
          },
          {
            index: 3,
            userName: '王五',
            operation: '更新了文件',
            create_date: '2016-10-01'
          },
          {
            index: 4,
            userName: '赵六',
            operation: '删除了文件',
            create_date: '2016-10-06'
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
          index: 1,
          userName: '张三',
          operation: '点击查询按钮',
          create_date: '2016-10-04'
        }];
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.dataDemo = [
          {
            index: 1,
            userName: '张三',
            operation: '点击查询按钮',
            create_date: '2016-10-04'
          },
          {
            index: 2,
            userName: '李四',
            operation: '点击删除按钮',
            create_date: '2016-10-04'
          },
          {
            index: 3,
            userName: '王五',
            operation: '更新了文件',
            create_date: '2016-10-04'
          },
          {
            index: 4,
            userName: '赵六',
            operation: '删除了文件',
            create_date: '2016-10-04'
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