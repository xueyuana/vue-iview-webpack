<template>
  <div class="rsource-approval">
    <div class="approval-button">
      <Button class="apply-button-item"
              type="primary"
              v-for="(item, index) in funcBtns"
              @click="onLink(index)">{{item}}
      </Button>
    </div>
    <div class="approval-status">
      <Steps :current="stepNum">
        <Step title="提交申请"></Step>
        <Step title="行政审批"></Step>
        <Step title="技术审批"></Step>
        <Step title="审批完成"></Step>
      </Steps>
    </div>
    <!--<Collapse v-model="value1">-->
      <!--<Panel name="1">-->
        <!--资源信息-->
        <!--<p slot="content">          -->
        <!--</p>-->
      <!--</Panel>-->
    <!--</Collapse>-->
    <div class="status-list" v-if="$store.state.userData.userInfo.role == 'admin'">
      <div class="sub-title">DMZ资源池资源使用情况</div>
      <Row>
        <Col span="8">
        <Row>
          <Col span="5" class="rd_right">
          <div class="rd_pro1" style="padding-right:12px;">vCPU个</div>
          </Col>
          <Col span="10">
          <Progress :percent="25" :stroke-width="20" class="rd_progress" hide-info></Progress>
          </Col>
          <Col span="5" class="rd_left">
          <div class="rd_pro2">2/30</div>
          </Col>
        </Row>
        </Col>
        <Col span="8">
        <Row>
          <Col span="5" class="rd_right">
          <div class="rd_pro1">内存（GB）</div>
          </Col>
          <Col span="10">
          <Progress :percent="25" :stroke-width="20" class="rd_progress" hide-info></Progress>
          </Col>
          <Col span="5" class="rd_left">
          <div class="rd_pro2">2/30</div>
          </Col>
        </Row>
        </Col>
        <Col span="8">
        <Row>
          <Col span="5" class="rd_right">
          <div class="rd_pro1">硬盘（GB）</div>
          </Col>
          <Col span="10" class="rd_progress">
          <Progress :percent="25" :stroke-width="20" class="rd_progress" hide-info></Progress>
          </Col>
          <Col span="5" class="rd_left">
          <div class="rd_pro2">2/30</div>
          </Col>
        </Row>
        </Col>
      </Row>
    </div>
    <div class="status-list" v-if="$store.state.userData.userInfo.role == 'admin'">
      <div class="sub-title">本次申请占用资源情况</div>
      <Row>
        <Col span="8">
        <Row>
          <Col span="5" class="rd_right">
          <div class="rd_pro1" style="padding-right:12px;">vCPU个</div>
          </Col>
          <Col span="10">
          <Progress :percent="100" :stroke-width="20" class="rd_progress" hide-info></Progress>
          </Col>
          <Col span="5" class="rd_left">
          <div class="rd_pro2">2/30</div>
          </Col>
        </Row>
        </Col>
        <Col span="8">
        <Row>
          <Col span="5" class="rd_right">
          <div class="rd_pro1">内存（GB）</div>
          </Col>
          <Col span="10">
          <Progress :percent="100" :stroke-width="20" class="rd_progress" hide-info></Progress>
          </Col>
          <Col span="5" class="rd_left">
          <div class="rd_pro2">2/30</div>
          </Col>
        </Row>
        </Col>
        <Col span="8">
        <Row>
          <Col span="5" class="rd_right">
          <div class="rd_pro1">硬盘（GB）</div>
          </Col>
          <Col span="10" class="rd_progress">
          <Progress :percent="100" :stroke-width="20" class="rd_progress" hide-info></Progress>
          </Col>
          <Col span="5" class="rd_left">
          <div class="rd_pro2">2/30</div>
          </Col>
        </Row>
        </Col>
      </Row>
    </div>
    <div class="form-info">
      <Form ref="formValidate" :model="formValidate" :label-width="120">
        <Row>
          <Col span="24">
          <div class="sub-title">资源信息</div>
          </Col>
          <Col span="8">
            <Form-item label="申请单号:" class="form-item">
              {{formValidate.resource_id}}
            </Form-item>
            <Form-item label="部门:" class="form-item">
              {{formValidate.department}}
            </Form-item>
            <Form-item label="镜像:" class="form-item">
              {{formValidate.mirror}}
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="虚拟机名称:" class="form-item">
              {{formValidate.virtual_name}}
            </Form-item>
            <Form-item label="资源池:" class="form-item">
              {{formValidate.az_name}}
            </Form-item>
            <Form-item label="存储空间:" class="form-item">
              {{formValidate.storeSpace}}G
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="部署实例:" class="form-item">
              <!--<span class="form-item-span">推荐配置</span>-->
              {{formValidate.instance_id}}
              <Poptip v-model="isTjpz" placement="left" width="500" v-if="$store.state.userData.userInfo.role == 'admin'">
                <a class="form-item-span">推荐配置</a>
                <!--<div slot="title" class="case-title"><i>提示</i></div>-->
                <div slot="content">
                  <div class="case-title">提示：</div>
                  <div class="case-content">
                    <div class="case-sub-title">您的业务类型为：</div>
                    <table class="case-custom-table">
                      <tr>
                        <td>用户群体规模</td>
                        <td>内网少量用户</td>
                      </tr>
                      <tr>
                        <td>用户活跃度</td>
                        <td>偶尔使用</td>
                      </tr>
                      <tr>
                        <td>业务类型</td>
                        <td>网站</td>
                      </tr>
                      <tr>
                        <td>数据大小</td>
                        <td>MB级</td>
                      </tr>
                      <tr>
                        <td>不需要</td>
                        <td>内网少量用户</td>
                      </tr>
                    </table>
                  </div>
                  <div class="case-title">推荐配置：</div>
                  <div class="case-content">
                    <table class="case-data-table">
                      <thead>
                        <tr>
                          <th>服务器</th>
                          <th>配置</th>
                          <th>数量（台）</th>
                        </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>WEB</td>
                        <td>CPU：2核 | 内存：2G | 硬盘：50G</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>服务器</td>
                        <td>CPU：2核 | 内存：2G | 硬盘：50G</td>
                        <td>1</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <Button type="primary" class="case-btn" @click="close">确定</Button>
                </div>
              </Poptip>
            </Form-item>
            <Form-item label="规格:" class="form-item">
              {{formValidate.spec}}
            </Form-item>
            <Form-item label="数量:" class="form-item">
              {{formValidate.vm_num}}
            </Form-item>
          </Col>
          <!--<Col span="12">-->
          <!--<Form-item label="申请单号:">-->
            <!--<Input v-model="formValidate.apply_code" disabled></Input>-->
          <!--</Form-item>-->
          <!--<Form-item label="虚拟机名称:">-->
            <!--<Input v-model="formValidate.virtual_name" disabled></Input>-->
          <!--</Form-item>-->
          <!--<Form-item label="部门:">-->
            <!--<Input v-model="formValidate.department" disabled></Input>-->
          <!--</Form-item>-->
          <!--<Form-item label="规格:">-->
            <!--<Select v-model="formValidate.spec" disabled>-->
              <!--<Option label="2C4G" value="0"></Option>-->
              <!--<Option label="4C8G" value="1"></Option>-->
            <!--</Select>-->
          <!--</Form-item>-->
          <!--<Form-item label="存储空间:" class="store_space">-->
            <!--<Input v-model="formValidate.storeSpace" disabled></Input>-->
          <!--</Form-item>-->
          <!--</Col>-->
          <!--<Col span="12">-->
          <!--<Form-item>&nbsp;</Form-item>-->
          <!--<Form-item label="部署实例:">-->
            <!--<Select v-model="formValidate.case" disabled>-->
              <!--<Option label="实例1" value="0"></Option>-->
              <!--<Option label="实例2" value="1"></Option>-->
              <!--<Option label="实例3" value="2"></Option>-->
            <!--</Select>-->
          <!--</Form-item>-->
          <!--<Form-item label="资源池:">-->
            <!--<Select v-model="formValidate.resource" disabled>-->
              <!--<Option label="资源池1" value="0"></Option>-->
              <!--<Option label="资源池2" value="1"></Option>-->
            <!--</Select>-->
          <!--</Form-item>-->
          <!--<Form-item label="镜像:">-->
            <!--<Select v-model="formValidate.mirror" disabled>-->
              <!--<Option label="Centos 7.2" value="0"></Option>-->
              <!--<Option label="Ubuntu 15.01" value="1"></Option>-->
            <!--</Select>-->
          <!--</Form-item>-->
          <!--<Form-item label="数量:">-->
            <!--<Input-number :max="10" :min="1" v-model="formValidate.total" disabled></Input-number>-->
          <!--</Form-item>-->
          <!--</Col> v-if="$store.state.userData.userInfo.role == 'admin'" -->
          <Col span="24" v-if="$store.state.userData.userInfo.role == 'admin'">
            <div class="sub-title">业务信息</div>
            <Input v-model="ywInfo" type="textarea" :maxlength="100" :rows="4" placeholder="示例：xxx业务为xxx提供互联网服务，此业务位于政务外网区域，业务上线日期预计xxx日，建设周期xx日"></Input>
          </Col>
          <Col span="24" v-else>
            <div class="sub-title">业务信息</div>
          <Input v-model="ywInfo" type="textarea" :maxlength="100" :rows="4" disabled></Input>
          </Col>
          <Col span="24" v-if="$store.state.userData.userInfo.role == 'leader'">
            <div class="sub-title">行政审批意见</div>
            <Input v-model="xzInfo" type="textarea" :maxlength="100" :rows="4" placeholder="默认显示同意，最多100个字符"></Input>
          </Col>
          <Col span="24" v-else>
            <div class="sub-title">行政审批意见</div>
          <Input v-model="xzInfo" type="textarea" :maxlength="100" :rows="4" disabled></Input>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .rsource-approval{
    .sub-title{
      margin:20px 0 10px 0;
    }
    .approval-button{
      display: flex;
      justify-content: flex-end;
      box-sizing: border-box;
      Button {
        /*background-color: #39f;*/
        margin: 0 4px;
      }
    }
    .approval-status{
      width: 70%;
      margin: 30px auto;
    }
    .status-list{
      clear:both;
      .rd_right{
        text-align: right;
      }
      .rd_left{
        text-align: left;
      }
      .rd_pro1{
        display: inline-block;
        vertical-align: top;
        padding-right:10px;
        width:80px;
        min-width: 80px;
        height:23px;
        line-height:23px;
      }
      .rd_pro2{
        display: inline-block;
        vertical-align: top;
        padding-left:10px;
        width:80px;
        min-width: 80px;
        height:23px;
        line-height:23px;
      }
    }
    .form-info{
      .form-item{
        margin-bottom: 0px;
        .form-item-span{
          padding-left:10px;
          color:#3F94FC;
          /*cursor: pointer;*/
        }
        .case-title{
          height: 45px;
          line-height: 45px;
          font-style: normal;
          font-size: 16px;
          clear: both;
        }
        .case-btn{
          margin-top:5px;
          float: right;
        }
        .case-content{
          .case-sub-title{
            margin-bottom: 5px;
            font-size: 14px;
          }
          .case-custom-table {
            width: 50%;
            border-collapse: collapse;
            color: #657180;
            td{
              text-align: center;
              border: 1px solid #dddee1;
            }
            tr {
              height: 35px;
            }
          }
          .case-data-table{
            width:100%;
            border-collapse: collapse;
            color: #657180;
            tr {
              height: 35px;
            }
            th{
              text-align: center;
              border: 1px solid #dddee1;
            }
            td{
              text-align: center;
              border: 1px solid #dddee1;
            }
            thead{
              tr{
                background-color: #ebf4fe;
              }
            }
          }
          /*ul{*/
            /*li{*/
              /*float: left;*/
              /*width: 45%;*/
              /*border-top: 1px solid #e8eaeb;*/
              /*border-right: 1px solid #e8eaeb;*/
            /*}*/
          /*}*/
        }
      }
    }
  }
  .rs_title{
    width: 100%;
    height: 20px;
    padding-left: 5px;
    background-color: #f2f2f2;
    font-size: 14px;
    line-height: 20px;
    margin: 20px 0;
    color:#000;
  }
  .rd_status_title{
    width: 100%;
    height: 20px;
    padding-left: 5px;
    font-size: 14px;
    line-height: 20px;
    margin: 20px 0;
    color:#000;
  }
  .rd_center{
    text-align: center;
  }
  .rd_graph{
    display: inline-block;
    vertical-align: top;
    width:80px;
    min-width: 80px;
    height:23px;
    line-height:23px;
  }
  .graph {
    /*float:left;*/
    display: inline-block;
    margin:0 0 0 15px;
    background-color:#D7D7D7;
    -moz-box-shadow: 0px 4px 5px #D7D7D7; /* 老的 Firefox */
    box-shadow: 0px 4px 5px #D7D7D7;
    /*position:relative;*/
    width:100%;
    padding:0
  }
  .graph .bar {
    display:block;
    position:relative;
    background-color: #FFDF25;
    text-align:center;
    color:#fff;
    height:19px;
    font-family:Arial, Helvetica, sans-serif;
    font-size:12px;
  }

  .graph .bar span {
    position:absolute;
    left:1em
  }
</style>

<script>
  import Flow from './../../components/common/flow.vue'
  export default {
    data() {
      return {
        stepNum: '',
        userId: '',
        resourceId: '',
        isTjpz: false,//推荐配置
        funcBtns: ['返回', '通过', '不通过'],
        formValidate: {
          resource_id: '',
          virtual_name: '',
          department: '',
          spec: '',
          storeSpace: '',
          instance_id: '',
          az_name: '',
          mirror: '',
          vm_num: 0
        },
        ywInfo: '',
        xzInfo: ''
//        columns: [
//          {
//            title: '服务器',
//            key: 'server',
//            align: 'center'
//          },
//          {
//            title: '配置',
//            key: 'setting',
//            align: 'center'
//          },
//          {
//            title: '数量（台）',
//            key: 'num',
//            align: 'center'
//          }
//        ],
//        dataDemo: [
//          {
//            server: 'WEB',
//            setting: 'dd',//CPU：2核 | 内存：2G | 硬盘：50G
//            num: '1'
//          },
//          {
//            server: '数据库',
//            setting: 'dd',//CPU：4核 |内存：8G |硬盘：200G
//            num: '1'
//          }
//        ]
      }
    },
    components: { Flow },
    created () {
      //获取资源信息
      this.userId = this.$store.state.userData.userInfo.id;
      this.resourceId = this.$route.query.id;
      console.log('resourceId', this.resourceId);
      if (this.resourceId) {
        const query = {user_id:this.userId,resource_id:this.resourceId};
        this.getInfo(query);
      }
    },
//    mounted() {
//      this.userId = this.$store.state.userData.userInfo.id;
//      this.resourceId = this.$route.query.id;
//      console.log('resourceId', this.resourceId);
//      if (this.resourceId) {
//        const query = {user_id:this.userId,resource_id:this.resourceId};
//        this.getInfo(query);
//      }
//    },
    computed: {

    },
    methods: {
      getInfo (query) {
        console.log('query', query);
        const url = 'api/mpc_resource/mpc_resources';
        this.$http.get(url,{params: query}).then((res) => {
            console.log('sssss', res);
            if (res.body.code === 200) {
              res.body.result.res.forEach((item,index) => {
                switch (item.status) {
                  case 'commit': this.stepNum = 0
                    break
                  case 'submmit': item.status = '待审批'
                    break
                  case 'reject': item.status = '审批未通过'
                    break
                  case 'complete': item.status = '审批完成'
                    break
                  default:
                  }
                  let vm_name = '';
                  let vm_num = '';
                  let department = '';
                  let storage = '';
                  let image_id = '';
                  let flavor_id = '';
                  item.resources.forEach((ritem,index) => {
                    vm_name = ritem.vm_name;
                    vm_num = ritem.vm_num;
                    department = ritem.department;
                    storage = ritem.storage;
                    image_id = ritem.image_id;
                    flavor_id = ritem.flavor_id
                  });

                this.formValidate = {
                  resource_id: item.resource_id,
                  instance_id: item.instance_id,
                  virtual_name: vm_name,
                  department: department,
                  storeSpace: storage,
                  vm_num: vm_num,
                  spec: flavor_id,
                  mirror: image_id,
                  az_name: item.az_id
                }
                this.ywInfo= item.business_info;
                this.xzInfo= item.suggestion;
            })
            console.log(this.formValidate);
          }
        },(err) => {
          console.log(err)
        });
//        this.formValidate = {
//          resource_id: '',
//          virtual_name: '',
//          department: '',
//          spec: '',
//          storeSpace: '',
//          instance_id: '',
//          az_name: '',
//          mirror: '',
//          vm_num: 0
//        }
//        this.ywInfo='提供互联网服务，此业务位于政务外网区域';
//        this.xzInfo='同意';
      },
      onLink(index) {
        switch (index) {
          case 0:
            this.$router.go(-1);
            break;
          case 1:
            this.onSubmit('2');//审批完成
            break;
          default:
            this.onSubmit('1');//未通过
            break;
        }
      },
      onSubmit (status) {
        const query = {resource_id: this.resourceId, status: status, suggestion:this.xzInfo};
        const url = 'api/mpc_resource/mpc_resources';
        this.$http.put(url,{params: query}).then((res) => {
            console.log('sssss', res);
            if (res.body.code === 200) {
              if(status == '2'){
                this.$store.commit('setStatus','审批完成');
                this.$Message.success('通过完成!');
              } else if(status == '1'){
                this.$Message.success('不通过完成!');
              }
            }
          },(err) => {
            this.$Message.error(err.body.result.msg)
          });
      },
//      onNo () {
//        console.log('ddsss', this.ywInfo);
//        console.log('xzInfo', this.xzInfo)
//        this.$Message.error('不通过!');
//      },
      close () {
        this.isTjpz = false;
      }
    }
  }
</script>