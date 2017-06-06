<!--资源申请历史-->
<template>
  <div class="wrap">
    <div class="query">
      <Form :label-width="100">
        <Row>
          <Col span="6">
          <Form-item label="归属人">
            <Input placeholder="请输入" v-model="formItem.name"></Input>
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

          </Col>
          <Col span="6">
          <Form-item label="实例名称">
            <Input placeholder="请输入" v-model="formItem.resource_name"></Input>
          </Form-item>


          <Form-item label="部署单元">
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
            title: '归属人',
            key: 'name',
            align: 'center'
          },
          {
            title: '部署时间',
            key: 'date',
            align: 'center',
            "sortable": true
          },
          {
            title: '部署单元',
            key: 'project',
            align: 'center'
          },
          {
            title: '实例名称',
            key: 'resource',
            align: 'center'

          },
          {
            title: '部署状态',
            key: 'reservation_status',
            align: 'center'
          },
          {
            title: '操作',
            key: 'operate',
            align: 'center',
            render: (h, params) => {
                    if (this.filterDate[params.index].reservation_status == "部署成功") {
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
                      this.gotoShow(params.index);
                          }
                       }
                    }, '查看')])
                }else if (this.filterDate[params.index].reservation_status == "等待中") {
                        return h('div', [
                          h('div', {
                            props: {
                              type: 'primary',
                              size: 'small'
                            },
                            style: {
                              marginRight: '5px'
                            }

                      }, '部署')])
                      }else if (this.filterDate[params.index].reservation_status == "部署失败") {
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
                            this.gotoReAdd(params.index);
                    }
                    }
                    }, '重建')])
                    }else if (this.filterDate[params.index].reservation_status == "未部署") {
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

            let msgs = response.body.result.msg;

            for (var index in msgs) {
             //只显示申请成功的
              if (msgs[index].approval_status === "success") {
                if(msgs[index].reservation_status === "ok"){
                  msgs[index].reservation_status="部署成功";
                }
                if(msgs[index].reservation_status === "fail"){
                  msgs[index].reservation_status="部署失败";
                }
                if(msgs[index].reservation_status === "reserving"){
                  msgs[index].reservation_status="等待中";
                }
                if(msgs[index].reservation_status === "unreserved"){
                  msgs[index].reservation_status="未部署";
                }
                this.queryData.push(msgs[index]);
              }

            }
            console.log(this.queryData);
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

          console.log('实例列表'+response.body.result.msg);
          if (response.body.code === 200 && response.body.result.res == "success") {
           // this.queryData = response.body.result.msg;
            let msgs = response.body.result.msg;

            for (var index in msgs) {
            //只显示审批完成的
              if (msgs[index].approval_status == "success") {
                this.queryData.push(msgs[index]);
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