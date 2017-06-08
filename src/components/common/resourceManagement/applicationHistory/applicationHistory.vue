<!--资源申请历史-->
<template>
  <div class="wrap">
    <div class="query">
      <Form :label-width="100">
        <Row>
          <Col span="10">
          <Form-item label="归属人">
            <Input placeholder="请输入" v-model="formItem.name"></Input>
          </Form-item>

          <Form-item label="实例名称">
            <Input placeholder="请输入" v-model="formItem.resource_name"></Input>
          </Form-item>

          </Col>
          <Col span="10">
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
            type: 'index',
            title: '序号',
            align: 'center'
          },
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
            key: 'deploy_result',
            align: 'center'
          },
          {
            title: '操作',
            key: 'operate',
            align: 'center',
            render: (h, params) => {
            if (this.filterDate[params.index].reservation_status == "unreserved") {
        return h('div', [
          h('Button', {
            props: {
              type: 'disabled',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            }
          }, '部署'),
          h('Button', {
            props: {
              type: 'disabled',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            }
          }, '查看')])
      }
            //预留状态是预留中，部署状态为未部署 ，部署查看 按钮均不能用
                    if (this.filterDate[params.index].reservation_status == "reserving") {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'disabled',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }, '部署'),
                  h('Button', {
                    props: {
                      type: 'disabled',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    }
                    }, '查看')])
                }else if (this.filterDate[params.index].reservation_status == "fail") {
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },on: {
                          click: () => {
                          this.gotoReAdd(params.index);
                            }
                       }
                      }, '重建'),
                      h('Button', {
                        props: {
                          type: 'disabled',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        }
                      }, '查看')])
                     //预留成功
                      }else if (this.filterDate[params.index].reservation_status == "ok") {
                            //未部署
                           if(this.filterDate[params.index].deploy_result == '部署中'){
                             return h('div', [
                               h('Button', {
                                 props: {
                                   type: 'disabled',
                                   size: 'small'
                                 },
                                 style: {
                                   marginRight: '5px'
                                 }
                               }, '部署'),
                               h('Button', {
                                 props: {
                                   type: 'primary',
                                   size: 'small'
                                 },
                                 style: {
                                   marginRight: '5px'
                                 }
                               }, '查看')])
                           }//部署成功和部署失败部署中
                           else{
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
                               }, '部署'),
                               h('Button', {
                                 props: {
                                   type: 'primary',
                                   size: 'small'
                                 },
                                 style: {
                                   marginRight: '5px'
                                 }
                               }, '查看')])
                           }
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
      //修改部署状态
      formatStatus(val){
        switch (val) {
          case 'deploying':
            return '部署中'
          case 'not_deployed':
            return '未部署'
          case 'fail':
            return '失败'
          case 'success':
            return '成功'
          default:
            break
        }
      },
      //取得对应的部署状态以及时间，如果没有部署，时间则还是资源创建时间按
      getStatus(){
        //用户姓名
        let userName = getStroage('userInfo').username;
        let ifadmin = getStroage('userInfo').is_admin;
        let url='';
        if (ifadmin) {
          url = common.apihost + 'deployment/getDeploymentsByInitiator';
        } else {
          //url=common.apihost+'resource/';
          url =  common.apihost + 'deployment/getDeploymentsByInitiator?initiator='+userName;
        }

        this.$http.get(url, {emulateJSON: true}).then(function (response) {

         console.log("返回测试"+response.body);
          if (response.status === 200 ) {

            let msgs = response.body;
            for (var num in this.queryData) {
              for (var index in msgs) {
                //只显示申请成功的
                if (msgs[index].resource_id ===this.queryData[num].id) {

                  this.queryData[num].date=msgs[index].created_time;
                  msgs[index].deploy_result=this.formatStatus(msgs[index].deploy_result);

                  this.queryData[num].deploy_result=msgs[index].deploy_result;
                }

              }

            /*  if (this.queryData[num].reservation_status == "reserving" ||this.queryData[num].reservation_status == "unreserved") {
                this.queryData[num].deploy_result = "未部署";
              }
              if (this.queryData[num].reservation_status == "fail") {
                this.queryData[num].deploy_result = "资源不足";
              }*/

            }

          }
          // 成功回调
        }, function () {
         // this.$Message.error('登陆失败!');
          // 失败回调

        });

       /* let msgs=[
          {
            "resource_id": "9e9ee9d2-4a96-11e7-968f-fa163e9474c9",
            "resource_name": "june001",
            "deploy_id": "b247eac0-46a8-11e7-84ee-fa163e9474c9",
            "deploy_name": "部署编号001",
            "deploy_result": "deploying",
            "project_id": "263506f8-3f8c-11e7-80ef-fa163e9474c9",
            "project_name": "测试环境11",
            "created_time": "2017-06-01 16:57:26",
            "initiator": "朱杰杰",
            "environment": "develop",
            "app_image": "arp.reg.innertoon.com/qitoon.checkin/qitoon.checkin:20170517101336"
          },
          {
            "resource_id": "5a3dcec8-4679-11e7-92c1-fa163e9474c9",
            "resource_name": "june001",
            "deploy_id": "b247eac0-46a8-11e7-84ee-fa163e9474c9",
            "deploy_name": "部署编号001",
            "deploy_result": "deploying",
            "project_id": "263506f8-3f8c-11e7-80ef-fa163e9474c9",
            "project_name": "测试环境11",
            "created_time": "2017-06-01 16:57:26",
            "initiator": "朱杰杰",
            "environment": "develop",
            "app_image": "arp.reg.innertoon.com/qitoon.checkin/qitoon.checkin:20170517101336"
          },
          {
            "resource_id": "5a3dcec8-4679-11e7-92c1-fa163e9474c9",
            "resource_name": "june001",
            "deploy_id": "b247eac0-46a8-11e7-84ee-fa163e9474c9",
            "deploy_name": "部署编号001",
            "deploy_result": "deploying",
            "project_id": "263506f8-3f8c-11e7-80ef-fa163e9474c9",
            "project_name": "测试环境11",
            "created_time": "2017-06-01 16:57:26",
            "initiator": "朱杰杰",
            "environment": "develop",
            "app_image": "arp.reg.innertoon.com/qitoon.checkin/qitoon.checkin:20170517101336"
          }
        ]*/



       console.log("整理后"+this.queryData)





      },
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

                this.queryData.push(msgs[index]);
              }

            }
            console.log(this.queryData);
            for (var num in this.queryData) {
              if (this.queryData[num].reservation_status == "reserving" ||this.queryData[num].reservation_status == "unreserved" ||this.queryData[num].reservation_status == "ok") {
                this.queryData[num].deploy_result = "未部署";
              }
              if (this.queryData[num].reservation_status == "fail") {
                this.queryData[num].deploy_result = "资源不足";
              }

            }
            this.getStatus();
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
        this.$router.push({name: 'applicationDeployment', query: {id: this.filterDate[index].id}});
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
            reservation_status: originData[i].reservation_status,
            deploy_result: originData[i].deploy_result
          })
        }
        return data;
      }

    }
  }

</script>