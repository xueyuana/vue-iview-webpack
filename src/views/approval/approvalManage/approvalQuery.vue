<template>
  <div class="inquire">
    <div class="inquire-form">
      <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="70">
        <div class="form-wrap">
            <Form-item label="申请人:" prop="user_name" class="form-item">
              <Input v-model="formValidate.user_name" placeholder="请输入" style="min-width: 250px"></Input>
            </Form-item>
            <Form-item label="申请日期:" prop="start_time" class="form-item">
              <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="formValidate.start_time" style="min-width: 250px"></Date-picker>
            </Form-item>
            <Form-item label="审批状态:" prop="apply_status" class="form-item">
              <Select v-model="formValidate.apply_status" clearable style="min-width: 250px">
                <Option v-for="item in approvalStatusVal" :value="item.key" :key="item">{{ item.value }}</Option>
              </Select>
            </Form-item>
            <Form-item label="部署实例:" prop="instance_id" class="form-item">
              <Select v-model="formValidate.instance_id" clearable style="min-width: 250px">
                <!--<Option v-for="item in instance" :value="item.id" :key="item">{{ item.value }}</Option>-->
                <Option v-for="item in instance" :value="item.instance_id" :key="item">{{ item.instance_name }}</Option>
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
      <div class="inquire-table-title">申请资源列表</div>
      <Table stripe :columns="columns" :data="queryResult"></Table>
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
        formValidate: {
          user_name: '',
          start_time: '',
          apply_status: '',
          instance_id: ''
        },
        ruleValidate: {
          user_name: [],
          start_time: [],
          apply_status: [],
          instance_id: []
        },
        approvalStatusVal: [
          {
            value: '待审批',
            key: 'submit'
          },
          {
            value: '审批未通过',
            key: 'l_fail'
          },
          {
            value: '已审批',
            key: 'l_success'
          },
          {
            value: '已创建',
            key: 'created_success'
          }
        ],
        instance: [],
        columns: [
          {
            title: '序号',
            key: 'index',
            align: 'center'
          },
          {
            title: '申请单号',
            key: 'resource_id',
            align: 'center',
            render: (h,params) => {
              return h('a',
                      {
                        domProps: {
                          innerHTML: params.row.resource_id
                        },
                        on: {
                          click: () => {
                          let id = params.row.resource_id;
                          this.$router.push({name: '资源详情', query: {id: id}});
                      }
                  }
              })
            }
          },
          {
            title: '申请人',
            key: 'user_name',
            align: 'center'
          },
          {
            title: '部署实例',
            key: 'instance_id',
            align: 'center'
          },
          {
            title: '部署区域',
            key: 'az_name',
            align: 'center'
          },
          {
            title: '审批状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const color = row.status === 'submit' ? '#f00' : '#657180';
              const text = row.status === 'submit' ? '直属领导待审批' :
                      row.status === 'l_fail' ? '直属领导审批未通过' :
                      row.status === 'l_success' ? '经信委技术待审批' :
                      row.status === 'a_fail' ? '经信委技术审批未通过' :
                      row.status === 'a_success' ? '经信委技术审批完成' : '创建资源完成';
              return h('span', {
                style: {
                  color: color
                },
              }, text);
            }
          },
          {
            title: '申请日期',
            key: 'created_time',
            align: 'center'
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
      this.getInstance();//获取实例
      //获取资源
      const department = this.$store.state.userData.userInfo.department;
      const query = {department:department};
      this.getApprovalResource(query);
    },
    computed: {},
    methods: {
      getInstance () {//获取实例
        const url = 'api/deploy_instance/deploy_instances'
        let params = {
          user_id: this.$store.state.userData.userInfo.id
        }
        this.$http.get(url).then((res) => {
          this.instance = res.body.result.res
        },(err) => {
          console.log(err)
        })
      },
      goQuery (name) {
          this.current_page = 1;
          const department = this.$store.state.userData.userInfo.department;
          const start_time = this.formValidate.start_time[0];
          const end_time = this.formValidate.start_time[1];

          let requestBody = {}
          start_time && (requestBody.start_time = formatDate(start_time));
          end_time && (requestBody.end_time = formatDate(end_time));
          this.formValidate.user_name && (requestBody.user_name = this.formValidate.user_name);
          this.formValidate.apply_status && (requestBody.status = this.formValidate.apply_status);
          this.formValidate.instance_id && (requestBody.instance_id = this.formValidate.instance_id);
          department && (requestBody.department = department);
          this.getApprovalResource(requestBody);
      },
      getApprovalResource (query) {
        this.queryResult = [];
        this.getResult = [];
        let tempArr = []
        const url = 'api/mpc_resource/mpc_resources';
        this.$http.get(url,{params: query}).then((res) => {
            if (res.body.code === 200) {
                this.data_length = res.body.result.res.length;
                res.body.result.res.forEach((item,index) => {

                  if (item.status == 'submit'){
                    tempArr.push({
                      resource_id: item.resource_id,
                      status: item.status,
                      instance_id: item.deploy_name,
                      az_name: item.az_name,
                      created_time: item.created_date.slice(0, 16),
                      user_name: item.user_name
                    })

                  } else {
                    this.getResult.push({
                      resource_id: item.resource_id,
                      status: item.status,
                      instance_id: item.deploy_name,
                      az_name: item.az_name,
                      created_time: item.created_date.slice(0, 16),
                      user_name: item.user_name
                    });
                  }
                })
                this.getResult = tempArr.concat(this.getResult)
                this.getResult.forEach((item,index) => {
                    item.index=index + 1;
                });
                this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page);
            }
        },(err) => {
          this.$Message.error(err.body.result.msg)
        });
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.goQuery();
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