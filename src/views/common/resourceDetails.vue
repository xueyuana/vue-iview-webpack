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
          <div class="rd_pro2">4</div>
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
          <div class="rd_pro2">4</div>
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
          <div class="rd_pro2">4</div>
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
              {{formValidate.deploy_name}}
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
                <Button type="primary" class="case-btn" @click="close">确定</Button>
              </Poptip>
            </Form-item>
            <Form-item label="规格:" class="form-item">
              {{formValidate.spec}}

            </Form-item>
            <Form-item label="数量:" class="form-item">
              {{formValidate.vm_num}}

            </Form-item>
          </Col>

          <Col span="24" v-if="$store.state.userData.userInfo.role == 'admin'">
          <div class="sub-title">业务信息</div>
          <Input v-model="ywInfo" type="textarea" :maxlength="100" :rows="4"
                 placeholder="示例：xxx业务为xxx提供互联网服务，此业务位于政务外网区域，业务上线日期预计xxx日，建设周期xx日"></Input>
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
  .rsource-approval {
    .sub-title {
      margin: 20px 0 10px 0;
    }
    .approval-button {
      display: flex;
      justify-content: flex-end;
      box-sizing: border-box;
      Button {
        /*background-color: #39f;*/
        margin: 0 4px;
      }
    }
    .approval-status {
      width: 70%;
      margin: 30px auto;
    }
    .status-list {
      clear: both;
      .rd_right {
        text-align: right;
      }
      .rd_left {
        text-align: left;
      }
      .rd_pro1 {
        display: inline-block;
        vertical-align: top;
        padding-right: 10px;
        width: 80px;
        min-width: 80px;
        height: 23px;
        line-height: 23px;
      }
      .rd_pro2 {
        display: inline-block;
        vertical-align: top;
        padding-left: 10px;
        width: 80px;
        min-width: 80px;
        height: 23px;
        line-height: 23px;
      }
    }
    .form-info {
      .form-item {
        margin-bottom: 0px;
        .form-item-span {
          padding-left: 10px;
          color: #3F94FC;
          /*cursor: pointer;*/
        }
        .case-title {
          height: 45px;
          line-height: 45px;
          font-style: normal;
          font-size: 16px;
          clear: both;
        }
        .case-btn {
          margin-top: 5px;
          float: right;
        }
        .case-content {
          .case-sub-title {
            margin-bottom: 5px;
            font-size: 14px;
          }
          .case-custom-table {
            width: 50%;
            border-collapse: collapse;
            color: #657180;
            td {
              text-align: center;
              border: 1px solid #dddee1;
            }
            tr {
              height: 35px;
            }
          }
          .case-data-table {
            width: 100%;
            border-collapse: collapse;
            color: #657180;
            tr {
              height: 35px;
            }
            th {
              text-align: center;
              border: 1px solid #dddee1;
            }
            td {
              text-align: center;
              border: 1px solid #dddee1;
            }
            thead {
              tr {
                background-color: #ebf4fe;
              }
            }
          }

        }
      }
    }
  }

  .rs_title {
    width: 100%;
    height: 20px;
    padding-left: 5px;
    background-color: #f2f2f2;
    font-size: 14px;
    line-height: 20px;
    margin: 20px 0;
    color: #000;
  }

  .rd_status_title {
    width: 100%;
    height: 20px;
    padding-left: 5px;
    font-size: 14px;
    line-height: 20px;
    margin: 20px 0;
    color: #000;
  }

  .rd_center {
    text-align: center;
  }

  .rd_graph {
    display: inline-block;
    vertical-align: top;
    width: 80px;
    min-width: 80px;
    height: 23px;
    line-height: 23px;
  }

  .graph {
    /*float:left;*/
    display: inline-block;
    margin: 0 0 0 15px;
    background-color: #D7D7D7;
    -moz-box-shadow: 0px 4px 5px #D7D7D7; /* 老的 Firefox */
    box-shadow: 0px 4px 5px #D7D7D7;
    /*position:relative;*/
    width: 100%;
    padding: 0
  }

  .graph .bar {
    display: block;
    position: relative;
    background-color: #FFDF25;
    text-align: center;
    color: #fff;
    height: 19px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
  }

  .graph .bar span {
    position: absolute;
    left: 1em
  }
</style>

<script>
  import Flow from './../../components/common/flow.vue'
  export default {
    data() {
      return {
        stepNum: 0,
        userId: '',
        resourceId: '',

        isTjpz: false,//推荐配置
        flavor_name: '',//规格名称
        flavorList: [],
        image_name: '',//镜像名称
        imageList: [],
        funcBtns: ['返回', '通过', '不通过'],
        formValidate: {
          resource_id: '',
          virtual_name: '',
          department: '',
          spec: '',
          storeSpace: '',
          deploy_name: '',
          az_name: '',
          mirror: '',
          vm_num: 0
        },
        ywInfo: '',
        xzInfo: ''
      }
    },
    components: {Flow},
    created () {
      //获取资源信息
//      this.userId = this.$store.state.userData.userInfo.id; user_id:this.userId,
      this.resourceId = this.$route.query.id;
      if (this.resourceId) {
        const query = {resource_id:this.resourceId};
        this.getFlaver();
        this.getImage();
        this.getInfo(query);
      }
    },
    computed: {

    },
    methods: {
      getInfo (query) {
        const url = 'api/mpc_resource/mpc_resources';

        this.$http.get(url,{params: query}).then((res) => {
            console.log('sssss', res);
            if (res.body.code === 200) {
              res.body.result.res.forEach((item,index) => {
                switch (item.status) {
                  case 'submit': this.stepNum = 0
                    break
                  case 'l_success': this.stepNum = 1
                    break
                  case 'a_success': this.stepNum = 2
                    break
                  default:
                }
                switch (item.status) {
                  case 'submit': item.status = '待审批'
                    break
                  case 'l_fail': item.status = '审批未通过'
                    break
                  case 'l_success': item.status = '审批完成'
                    break
                  default:
                }
                let vm_name = '';
                let vm_num = '';
                let department = '';
                let storage = '';
                item.resources.forEach((ritem,index) => {
                  vm_name = ritem.vm_name;
                  vm_num = ritem.vm_num;
                  department = ritem.department;
                  storage = ritem.storage;
                  this.flavorList.forEach((fitem,index) => {
                    if(ritem.flavor_id == fitem.flavor_id){
                      this.flavor_name=fitem.flavor_name;
                      return;
                    }
                  });
                  this.imageList.forEach((iitem,index) => {
                    if(ritem.image_id == iitem.id){
                      this.image_name=iitem.image_name;
                      return;
                    }
                  });
                });
                this.formValidate = {
                  resource_id: item.resource_id,
                  deploy_name: item.deploy_name,
                  virtual_name: vm_name,
                  department: department || this.$store.state.userData.userInfo.department,
                  storeSpace: storage,
                  vm_num: vm_num,
                  spec: this.flavor_name,//flavor_id,
                  mirror: this.image_name,//image_id,
                  az_name: item.az_name
                }
                this.ywInfo= item.business_info;
                this.xzInfo= item.suggestion;
            })
          }
        }, (err) => {
          console.log(err)
        });
      },
      getFlaver () {//获取规格
        const url = 'api/flavor/flavors'
        this.$http.get(url).then((res) => {
          if (res.body.code === 200) {
            this.flavorList = res.body.result.res;
          }
        },(err) => {
          console.log(err)
        });
      },
      getImage () {//获取镜像
        const url = 'api/image/images'
        this.$http.get(url).then((res) => {
          if (res.body.code === 200){
            this.imageList = res.body.result.res;
          }
        },(err) => {
          console.log(err)
        })
      },
      onLink(index) {
        switch (index) {
          case 0:
            this.$router.go(-1);
            break;
          case 1:
            this.onSubmit('l_success');//审批完成
            break;
          default:
            this.onSubmit('l_fail');//未通过
            break;
        }
      },
      onSubmit (status) {
        const query = {resource_id: this.resourceId, status: status, suggestion: this.xzInfo};
        const url = 'api/mpc_resource/mpc_resources';

        this.$http.put(url,query).then((res) => {
          console.log('sssss', res);
          if (res.body.code === 200) {
            if(status == 'l_success'){
              this.$store.commit('setStatus','审批完成');
              this.$Message.success('通过完成!');
            } else if(status == 'l_fail'){
              this.$Message.success('不通过完成!');
            }
          }
        }, (err) => {
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