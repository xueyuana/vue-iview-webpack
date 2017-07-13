<template>
  <div class="inquire">
    <div class="inquire-form">
      <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="70">
        <div class="form-wrap">
          <Form-item label="日期:" prop="date" class="form-item">
            <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="formValidate.date" style="min-width: 250px"></Date-picker>
          </Form-item>
          <Form-item label="关键字:" prop="key_name" class="form-item">
            <Input v-model="formValidate.key_name" placeholder="请输入" style="min-width: 250px"></Input>
          </Form-item>
          <Form-item label="用户:" prop="user_id" class="form-item">
            <Select v-model="formValidate.user_id" filterable clearable style="width: 250px"
                    :placeholder="userList.length ? '请选择' : '无'">
              <Option v-for="(item, index) in userList" :value="item.id" :key="index">{{ item.username }}</Option>
            </Select>
          </Form-item>
        </div>
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
      <div class="inquire-table-title">日志列表</div>
      <Table stripe size="small" :columns="columns" :data="queryResult"></Table>
      <div class="inquire-table-page">
        <Page :total="data_length" show-sizer @on-change="changePage" @on-page-size-change="page_size_change" :current="current_page" :page-size="page_size"></Page>
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>

<script>
  import {formatDate} from 'tools/formatDate.js'

  export default {
    data() {
      return {
        userList: [],   // 用户列表
        formValidate: {
          key_name: '',
          date: [],
          user_id: ''
        },
        ruleValidate: {
          key_name: [],
          date: [],
          user_id: []
        },
        columns: [
        {
          title: '序号',
          key: 'index',
          align: 'center',
          width: 80
        },
        {
          title: '用户',
          key: 'user_name',
          align: 'center',
          width: 100
        },
        {
          title: '操作日志',
          key: 'content',
          align: 'center'
        },
        {
          title: '日期',
          key: 'created_time',
          align: 'center',
          sortable: true,
          width: 150
        }
        ],
        queryResult: [],
        getResult: [],
        data_length: 0,
        page_size: 10,
        current_page: 1
      }
    },
    created () {
      //获取操作日志
      this.getOperationLog({});
      // 获取用户列表
      this.getUserList()
    },
    computed: {},
    methods: {
      goQuery () {
        this.current_page = 1
        const start_time = this.formValidate.date[0];
        const end_time = this.formValidate.date[1];

        let requestBody = {}
        this.formValidate.user_id && (requestBody.user_id = this.formValidate.user_id);
        start_time && (requestBody.start_time = formatDate(start_time));
        end_time && (requestBody.end_time = formatDate(end_time));
        this.formValidate.key_name && (requestBody.user_name = this.formValidate.key_name);
        this.getOperationLog(requestBody);
      },

      getOperationLog (query) {
        this.queryResult = [];
        this.getResult = [];
        const url = 'api/oper_history/oper_historys';
        this.$http.get(url,{params: query}).then((res) => {
          if (res.body.code === 200) {
            this.data_length = res.body.result.res.length;
            res.body.result.res.forEach((item,index) => {
              this.getResult.push({
                index: index +1,
                content: item.content,
                created_time: item.created_date.slice(0,16),
                user_name: item.user_name
              })
            })
            this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page);
          }
        },(err) => {
          console.log(err)
        });
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.goQuery();
      },

       // 用户列表
      getUserList () {
        const url = 'api/user/users'
        this.$http.get(url).then(res => {
          if (res.body.code === 200) {
            this.userList = res.body.result.res
          } else {
            this.$Message.error(res.res.body.result.msg)
          }
        }, err => {
          console.log(err)
        })
      },

      // 分页
      changePage (page) {
        this.queryResult = this.mockTableData(this.getResult,this.page_size,page)
        this.current_page = page
      },
      page_size_change (size) {
        this.page_size = size
        this.current_page = 1
        this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page)

      },
      mockTableData (originData, pageSize, index) {//进行分页
        let data = [];
        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > originData.length ? originData.length : (num + pageSize)
        data = originData.slice(num,maxNum)
        return data;
      }
    }
  }
</script>