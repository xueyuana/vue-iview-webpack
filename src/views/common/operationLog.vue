<template>
  <div class="operation">
    <div class="operation-form">
      <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="90">
        <Row>
          <Col span="9">
            <Form-item label="日期">
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
          <Col span="5">
            <Form-item label="虚拟机名称" prop="virtual_name">
              <Input v-model="formValidate.virtual_name" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="资源池:">
              <Select v-model="formValidate.resource" clearable style="">
                <Option label="资源池1" value="0"></Option>
                <Option label="资源池2" value="1"></Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="部署实例:">
              <Select v-model="formValidate.case" clearable style="">
                <Option :value="1" :key="1">部署实例1</Option>
                <Option :value="2" :key="2">部署实例2</Option>
              </Select>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="22" style="min-height: 20px"></Col>
          <Col span="1">
            <Button type="primary" @click="goQuery">查询</Button>
          </Col>
          <Col span="1">
            <Button type="ghost" @click="handleReset('formValidate')">重置</Button>
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
  export default {
    data() {
      return {
        formValidate: {
          virtual_name: '',
          create_date_begin: '',
          create_date_end: '',
          resource: '',
          case: ''
        },
        ruleValidate: {
          virtual_name: [],
          create_date_begin: [],
          create_date_end: [],
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
      goQuery (name) {
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
      }
    }
  }
</script>