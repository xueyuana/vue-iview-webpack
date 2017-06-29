<template>
  <div class="inquire">
    <div class="inquire-form">
      <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="70">
        <Row :gutter="16">
          <Col span="5">
            <Form-item label="申请人:" prop="user_name">
              <Input v-model="formValidate.user_name" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="申请日期:" prop="start_time">
              <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="formValidate.start_time" style="max-width: 250px"></Date-picker>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="审批状态:" prop="apply_status">
              <Select v-model="formValidate.apply_status" clearable style="">
                <Option v-for="item in approvalStatusVal" :value="item.key" :key="item">{{ item.value }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="5">
            <Form-item label="部署实例:" prop="instance_id">
              <Select v-model="formValidate.instance_id" clearable style="">
                <Option v-for="item in instance" :value="item.id" :key="item">{{ item.value }}</Option>
              </Select>
            </Form-item>
          </Col>
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
      <Table stripe :columns="columns" :data="queryResult"></Table>
      <div class="inquire-table-page">
        <Page :total="data_length" show-sizer @on-change="changePage" @on-page-size-change="page_size_change" :current="current_page" :page-size="page_size"></Page>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
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
            value: '行政待审批',
            key: 'submit'
          },
          {
            value: '行政审批未通过',
            key: 'l_fail'
          },
          {
            value: '技术待审批',
            key: 'l_success'
          },
          {
            value: '技术审批未通过',
            key: 'a_fail'
          },
          {
            value: '审批完成',
            key: 'a_success'
          }
        ],
        instance: [
          {
            value: '实例1',
            id: '001'
          },
          {
            value: '实例2',
            id: '002'
          }
        ],
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
//                        style: {
//                          display: 'inline-block',
//                          width: '80px',
//                          overflow: 'hidden',
//                          textOverflow: 'ellipsis',
//                          whiteSpace: 'nowrap'
//                        },
                        on: {
                          click: () => {
                          let id = params.row.resource_id;
                          this.$router.push({name: 'approval_resourceDetails', query: {id: id}});
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
            align: 'center',
            sortable: true
          },
          {
            title: '部署区域',
            key: 'az_name',
            align: 'center',
            sortable: true
          },
          {
            title: '审批状态',
            key: 'status',
            align: 'center',
            sortable: true
          },
          {
            title: '申请日期',
            key: 'created_time',
            align: 'center',
            sortable: true
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
      //获取资源
      this.getApprovalResource();
    },
    computed: {},
    methods: {
      goQuery (name) {
          const start_time = this.formValidate.start_time[0];
          const end_time = this.formValidate.start_time[1];

          let requestBody = {}
          start_time && (requestBody.start_time = formatDate(start_time));
          end_time && (requestBody.end_time = formatDate(end_time));
          this.formValidate.user_name && (requestBody.user_name = this.formValidate.user_name);
          this.formValidate.apply_status && (requestBody.status = this.formValidate.apply_status);
          this.formValidate.instance_id && (requestBody.instance_id = this.formValidate.instance_id);
          console.log('ddsss', requestBody.status);
          this.getApprovalResource(requestBody);
      },
      getApprovalResource (query) {
        this.queryResult = []
        const url = 'api/mpc_resource/mpc_resources';
        this.$http.get(url,{params: query}).then((res) => {
            console.log('sssss', res);
            if (res.body.code === 200) {
                this.data_length = res.body.result.res.length;
                res.body.result.res.forEach((item,index) => {
                  switch (item.status) {
                    case 'submit': item.status = '行政待审批'
                      break
                    case 'l_fail': item.status = '行政审批未通过'
                      break
                    case 'l_success': item.status = '技术待审批'
                      break
                    case 'a_fail': item.status = '技术审批未通过'
                      break
                    case 'a_success': item.status = '技术审批完成'
                      break
                    default:
                  }
              console.log('sssssseeeess', item.status);

                this.getResult.push({
                    index: index +1,
                    resource_id: item.resource_id,
                    status: item.status,
                    instance_id: item.deploy_name,
                    az_name: item.az_name,
                    created_time: item.created_date.slice(0,16),
                    user_name: item.user_name
                  })
                })
                console.log(this.getResult);
                this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page);
            }
        },(err) => {
          this.$Message.error(err.body.result.msg)
        });
      },
      handleReset (name) {
        this.$refs[name].resetFields();
//        this.getApprovalResource();
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