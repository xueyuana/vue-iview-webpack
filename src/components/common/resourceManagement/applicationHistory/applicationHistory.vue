<!--资源申请历史-->
<template>
  <div class="wrap">
    <div class="query">
      <Form :label-width="100">
        <Row>
          <Col span="6">
          <Form-item label="发起人">
            <Input placeholder="请输入" v-model="formItem.name"></Input>
          </Form-item>
          <Form-item label="审批状态">
            <Select placeholder="请选择" v-model="formItem.approval_status">
              <Option value=""> 流程不存在</Option>
              <Option value=""> 审批完成</Option>
              <Option value=""> 资源不足</Option>
              <Option value="">审批不通过</Option>

            </Select>
          </Form-item>
          </Col>
          <Col span="8">
          <Form-item label="发起日期">
            <Row>
              <Col span="11">
              <Form-item>
                <Date-picker type="datetime" placeholder="选择日期" v-model="formItem.start_time"></Date-picker>
              </Form-item>
              </Col>
              <Col span="2" style="text-align: center">
              至
                                          </Col>
              <Col span="11">
              <Form-item>
                <Date-picker type="datetime" placeholder="选择日期" v-model="formItem.end_time"></Date-picker>
              </Form-item>
              </Col>
            </Row>
          </Form-item>
          <Form-item label="表单状态">
            <Select placeholder="请选择" v-model="formItem.formStatus">
              <Option value="待提交">待提交</Option>
              <Option value="已提交">已提交</Option>
            </Select>
          </Form-item>
          </Col>
          <Col span="6">
          <Form-item label="资源名称">
            <Input placeholder="请输入" v-model="formItem.resource_name"></Input>
          </Form-item>


          <Form-item label="所属部署单元">
            <Input v-model="formItem.project" placeholder="请输入"></Input>

          </Form-item>


          </Col>
          <Col span="4">
          <Form-item>
            <Button type="primary" @click="onCheck">查询</Button>
          </Form-item>

          <Form-item>
            <Button type="ghost" @click="onReset">重置</Button>
          </Form-item>

          </Col>
        </Row>
      </Form>

    </div>

    <div class="result">
      <Table :columns="columns" :data="filterDate" border></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.queryData.length" :page-size="pageSize" :current="num" show-sizer show-total
                @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .query {
    padding-top: 15px;
    background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(228, 228, 228) 100%, rgb(228, 228, 228) 100%);
    border: 1px solid rgb(228, 228, 228);
    border-radius: 10px;
  }

  .result {
    padding: 20px;
  }
</style>
<script>

  import common from '../../../../tools/common.js';
  import {setStroage, getStroage} from 'tools/cookieAction.js'
  export default {

    data () {
      return {
        endDate: '',
        startDate: '',
        option: {
          disabledDate: (date) => {
            return date && date.valueOf() < this.startDate.valueOf()
          }
        }, columns: [
          {
            title: '发起人',
            key: 'name',
            align: 'center'
          },
          {
            title: '发起日期',
            key: 'date',
            align: 'center',
            "sortable": true
          },
          {
            title: '资源名称',
            key: 'resource',
            align: 'center',
            render: (h, params) => {
              //判断是否是管理员只有管理员才能点击
              if (getStroage('userInfo').is_admin) {
                return h('a', {
                  on: {
                    click: () => {
                      this.gotoCheck(params.index);
                    }
                  }
                }, params.row['resource'])
              } else {
                return h('div', params.row['resource']);
              }
            }
          },
          {
            title: '表单状态',
            key: 'formStatus',
            align: 'center'
          },
          {
            title: '审批状态',
            key: 'approval_status',
            align: 'center'
          },
          {
            title: '所属部署单元',
            key: 'project',
            align: 'center'
          },
          {
            title: '操作',
            key: 'operate',
            align: 'center',
            render: (h, params) => {
              if (this.filterDate[params.index].reservation_status == "ok") {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.gotoAdd(params.index);
                      }
                    }
                  }, '部署')])
              } else if (this.filterDate[params.index].reservation_status == "unreserved") {
                if (this.filterDate[params.index].approval_status == "审批中") {
                  return h('div', [
                    h('div', {
                      props: {
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      }
                    }, '编辑')])
                } else if (this.filterDate[params.index].approval_status == "审批完成") {
                  return h('div', [
                    h('div', {
                      props: {
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      }
                    }, '部署')]);
                } else {
                  return h('div', [
                    h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.gotoEdit(params.index);
                        }
                      }
                    }, '编辑')])
                }

              } else {
                this.filterDate[params.index].approval_status = "资源不足";
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }, on: {
                      click: () => {
                        this.gotoReAdd(params.index);
                      }
                    }
                  }, '重建')]);
              }
            }
          }
        ],

        formItem: {
          name: "",//发起人
          resource_name: "",//资源名称
          approval_status: "",//审批状态
          start_time: "",//开始时间
          end_time: "",//结束时间
          project: ""//所属部署单元
        },
        queryData: [
          {
            name: 'sdfsd',
            date: 'sdfsf',
            resource: 'sdfsf',
            formStatus: 'sdfdsf',
            approval_status: 'success',
            project: 'sdfsf',
            id: '123',
            reservation_status: ""
          },
          {
            name: 'sdfsd',
            date: 'sdfsf',
            resource: 'sdfsf',
            formStatus: 'sdfdsf',
            approval_status: '流程不存在',
            project: 'sdfsf',
            id: '123',
            reservation_status: ""
          },
          {
            name: 'sdfsd',
            date: 'sdfsf',
            resource: 'sdfsf',
            formStatus: 'sdfdsf',
            approval_status: 'processing',
            project: 'sdfsf',
            id: '123',
            reservation_status: ""
          }
        ],
        // 分页数据
        filterDate: [],
        pageSize: 10,
        num: 1,

      }
    },
    mounted() {
      this.onCheck();
    },


    methods: {
      // 查找
      onCheck() {
        //取得资源申请列表数据
//        let userid= userinfo.user_id;
        console.log(this.queryData)

        //取得资源申请列表数据
        let userid = getStroage('userInfo').user_id;
        let ifadmin = getStroage('userInfo').is_admin;
        let url = "";
        if (ifadmin) {
          url = common.apihost + 'resource/';
        } else {
          //url=common.apihost+'resource/';
          url = common.apihost + 'resource/?user_id=' + userid;
        }
        let query = {};

        this.formItem.userid && (query.userid = userid);
        this.formItem.name && (query.name = this.formItem.name)
        this.formItem.resource_name && (query.resource_name = this.formItem.resource_name)
        this.formItem.start_time && (query.start_time = this.formItem.start_time)
        this.formItem.end_time && (query.end_time = this.formItem.end_time)
        this.formItem.project && (query.project = this.formItem.project)

        console.log("query" + query);
        this.$http.get(url, {params: query}, {emulateJSON: true}).then(function (response) {

          console.log(response.body.result.msg);
          if (response.body.code === 200 && response.body.result.res == "success") {
            this.queryData = response.body.result.msg;
            let msgs = response.body.result.msg;

            for (var index in msgs) {
              if (msgs[index].approval_status == "unsubmit") {
                this.queryData[index].approval_status = "流程不存在";
              }
              if (msgs[index].approval_status == "processing") {
                this.queryData[index].approval_status = "审批中";
              }
              if (msgs[index].approval_status == "success") {
                this.queryData[index].approval_status = "审批完成";
              }
              if (msgs[index].approval_status == "failed") {
                this.queryData[index].approval_status = "审批不通过";
              }
            }

            this.filterDate = this.mockTableData(this.queryData, this.pageSize, 1)
          }
          // 成功回调
        }, function () {
          this.$Message.error('登陆失败!');
          // 失败回调
        });


      },
      //重置
      onReset() {
        //取得资源申请列表数据
//        let userid= userinfo.user_id;
        console.log(this.queryData)

        //取得资源申请列表数据
        let userid = getStroage('userInfo').user_id;
        let ifadmin = getStroage('userInfo').is_admin;
        let url = "";
        if (ifadmin) {
          url = common.apihost + 'resource/';
        } else {
          // url=common.apihost+'resource/';
          url = common.apihost + 'resource/?user_id=' + userid;
        }
        let query = {};
        this.$http.get(url, {emulateJSON: true}).then(function (response) {

          console.log(response.body.result.msg);
          if (response.body.code === 200 && response.body.result.res == "success") {
            this.queryData = response.body.result.msg;
            let msgs = response.body.result.msg;

            for (var index in msgs) {
              if (msgs[index].approval_status == "unsubmit") {
                this.queryData[index].approval_status = "流程不存在";
              }
              if (msgs[index].approval_status == "processing") {
                this.queryData[index].approval_status = "审批中";
              }
              if (msgs[index].approval_status == "success") {
                this.queryData[index].approval_status = "审批完成";
              }
              if (msgs[index].approval_status == "failed") {
                this.queryData[index].approval_status = "审批不通过";
              }
            }

            this.filterDate = this.mockTableData(this.queryData, this.pageSize, 1)
          }
          // 成功回调
        }, function () {
          this.$Message.error('登陆失败!');
          // 失败回调
        });


      },
      //新增一条资源
      gotoAdd(index){
        this.$router.push({name: 'deployment', query: {id: this.filterDate[index].id}});
        /*const url = common.apihost + 'approval/reservation';
        let resourcejson = {"resource_id": this.queryData[index].id}
        this.$http.post(url, resourcejson, {emulateJSON: true}).then(function (response) {
          if (response.body.code === 200) {
            // this.$Message.success('提交成功!');
            console.log("添加资源预留");

          }
          // 成功回调
        }, function () {

        });*/
      },
      //重新创建资源
      gotoReAdd(index){

        const url = common.apihost + 'approval/reservation/'+this.queryData[index].id;

        this.$http.put(url, {emulateJSON: true}).then(function (response) {
         if (response.body.code === 200) {
            this.$Message.success('资源预留成功!');
           // console.log("添加资源预留");
           // this.$router.push({name: 'applicationDeployment', query: {id: this.filterDate[index].id}});
          }else{
           this.$Message.success('资源失败再次预留!');
         }失败
          // 成功回调
        }, function () {

       });
      },
      //跳转到编辑页面
      gotoEdit(index){
        console.log(this.queryData[index].id);
        this.$router.push({name: 'resourceApplication', query: {id: this.filterDate[index].id}});
      },
      //跳转到审批页面
      gotoCheck(index){
        console.log(this.queryData[index].id);
        this.$router.push({name: 'res_applicationCheck', query: {id: this.filterDate[index].id}});
      },

      // 分页
      changePage(val) {
        this.filterDate = this.mockTableData(this.queryData, this.pageSize, val)
      },
      changePageSize(val) {
        this.pageSize = val
        this.changePage(1)
      },
      mockTableData (originData, pageSize, index) {
        let data = [];
        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > this.queryData.length ? this.queryData.length : (num + pageSize)
        for (let i = num; i < maxNum; i++) {
          data.push({
            name: originData[i].name,
            date: originData[i].date.substring(0, 16),
            resource: originData[i].resource,
            formStatus: originData[i].formStatus,
            approval_status: originData[i].approval_status,
            project: originData[i].project,
            id: originData[i].id,
            reservation_status: originData[i].reservation_status
          })
        }
        return data;
      }

    }
  }

</script>