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
      <Form :model="formValidate1" :label-width="120">
        <Row type="flex" justify="start">
          <Col span="24">
            <div class="sub-title">资源信息</div>
          </Col>

          <Col span="24">
            <Form-item label="申请单号:" class="form-item">
              {{formValidate1.resource_id}}
            </Form-item>
          </Col>
        </Row>
      </Form>

      <Form v-for="(item, idx) in formValidate" :label-width="120" :class="{border: idx == 0?false:true}">
        <Row>
          <Col span="8">

            <Form-item label="虚拟机名称:" class="form-item">
              {{item.virtual_name}}
            </Form-item>
            <Form-item label="部署实例:" class="form-item">
              {{item.deploy_name}}
              <span class="form-item-span" @click="instanceDetails" v-if="$store.state.userData.userInfo.role == 'admin'">推荐配置</span>
              <Modal v-model="instanceCreate" title="提示" :ok-text="okText" :mask-closable="false" :closable="false">
                <div class="modal-wrap">
                  <div class="instance-title">您的业务类型:</div>
                  <table>
                    <tbody>
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
                      <td>高可用</td>
                      <td>不需要</td>
                    </tr>
                    </tbody>
                  </table>
                  <div class="instance-title">推荐配置:</div>
                  <Table :columns="tj_columns" :data="configuration"></Table>
                </div>
                <div slot="footer">
                  <Button type="primary" size="large" v-text="okText" @click="closeModal"></Button>
                </div>
              </Modal>
            </Form-item>
            <Form-item label="存储空间:" class="form-item">
              {{item.storeSpace}}G
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="部门:" class="form-item">
              {{item.department}}
            </Form-item>
            <Form-item label="镜像:" class="form-item">
              <div class="jingx">{{item.mirror}}</div>
            </Form-item>
            <Form-item label="数量:" class="form-item">
              {{item.vm_num}}
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="资源池:" class="form-item">
              {{item.az_name}}
            </Form-item>
            <Form-item label="规格:" class="form-item">
              {{item.spec}}
            </Form-item>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span="24">
        <div class="sub-title">业务信息</div>
        <Input v-model="ywInfo" type="textarea" :maxlength="100" :rows="4"
               placeholder="示例：xxx业务为xxx提供互联网服务，此业务位于政务外网区域，业务上线日期预计xxx日，建设周期xx日"
               :disabled="role !== 'admin'"></Input>
        </Col>
        <Col span="24">
        <div class="sub-title">行政审批意见</div>
        <Input v-model="xzInfo" type="textarea" :maxlength="100" :rows="4" :disabled="role !== 'leader'"></Input>
        </Col>
      </Row>
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
    .form-info{
      .border {
        border-top: 1px solid #e4e4e4
      }
      .form-item{
        margin-bottom: 8px;
        .jingx{
          word-wrap:break-word;
          line-height: 20px;
         }
        .form-item-span{
          padding-left:10px;
          color:#3F94FC;
          cursor: pointer;
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

  .instance-title {
    font-size: 16px;
    line-height: 38px;
  }
  .modal-wrap {
    width: 90%;
    margin: 0 auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    color: #657180;
  }
  table td,th{
    text-align: center;

  }
  table tr {
    height: 40px;
    border: 1px solid #dddee1;
  }
  table thead tr{
    background-color: #ebf4fe;
  }
  table tbody tr:hover {
    background-color: #F3FAFF;
  }
  table tbody tr td:first-child {
    background-color: #ebf4fe;
    width: 120px;
  }
</style>

<script>

  export default {
    data() {
      return {
        instanceCreate: false,
        okText: '10秒钟后关闭',
        tj_columns: [
          {
            title: '服务器',
            key: 'server'
          },
          {
            title: '配置',
            key: 'configuration'
          },
          {
            title: '数量(台)',
            key: 'number'
          }
        ],
        configuration: [
          {
            server: 'WEB',
            configuration: 'CPU：2核 | 内存：2G | 硬盘：50G',
            number: 1
          },
          {
            server: '数据库',
            configuration: 'CPU：4核 | 内存：8G | 硬盘：200G',
            number: 1
          }
        ],
        stepNum: 0,
        userId: '',
        resourceId: '',
        isTjpz: false,//推荐配置
        flavor_name: '',//规格名称
        flavorList: [],
        image_name: '',//镜像名称
        imageList: [],
        funcBtns: ['返回', '通过', '不通过'],

        formValidate1: {
          resource_id: '',
          status: ''
        },
        formValidate: [],

        ywInfo: '',
        xzInfo: '',
        role: ''
      }
    },

    created () {
      this.resourceId = this.$route.query.id;
      this.role = this.$store.state.userData.userInfo.role
      if (this.resourceId) {
        const query = {resource_id: this.resourceId};
        this.getFlaver();
        this.getImage();
        this.getInfo(query);
      }
    },
    computed: {},
    methods: {
      getInfo (query) {
        const url = 'api/mpc_resource/mpc_resources';

        this.$http.get(url,{params: query}).then((res) => {
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

                item.resources.forEach((ritem,index) => {
                    let resourceData;
                    let flavor_name = '';
                    let image_name = '';

                  this.flavorList.forEach((fitem,index) => {
                    if(ritem.flavor_id == fitem.flavor_id){
                      flavor_name = fitem.flavor_name;
                      return;
                    }
                  });
                  this.imageList.forEach((iitem,index) => {
                    if(ritem.image_id == iitem.id){
                      image_name=iitem.image_name;
                      return;
                    }
                  });
                  resourceData = {
                    deploy_name: item.deploy_name,
                    virtual_name: ritem.vm_name,
                    department: ritem.department || this.$store.state.userData.userInfo.department,
                    storeSpace: ritem.storage,
                    vm_num: ritem.vm_num,
                    spec: flavor_name,
                    mirror: image_name,
                    az_name: item.az_name
                  }
                  this.formValidate.push(resourceData);
                });
                this.formValidate1.resource_id = item.resource_id;
                this.formValidate1.status = item.status;
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
        }, (err) => {
          console.log(err)
        });
      },
      getImage () {//获取镜像
        const url = 'api/image/images'
        this.$http.get(url).then((res) => {
          if (res.body.code === 200) {
            this.imageList = res.body.result.res;
          }
        }, (err) => {
          console.log(err)
        })
      },
      onLink(index) {
        switch (index) {
          case 0:
            this.$router.go(-1);
            break;
          case 1:
            if (this.role === 'leader') {
              this.onSubmit('l_success');//审批完成
            } else if (this.role === 'admin') {
              this.onSubmit('a_success');//审批完成
            }
            break;
          default:
            if (this.role === 'leader') {
              this.onSubmit('l_fail');//审批完成
            } else {
              this.onSubmit('a_fail');//审批完成
            }
        }
      },
      onSubmit (status) {
        let query = {resource_id: this.resourceId, status: status}

        if (this.role === 'leader') {
          query.suggestion = this.xzInfo
        }
        console.log('传参', query)

        const url = 'api/mpc_resource/mpc_resources';

        this.$http.put(url, query).then((res) => {
          if (res.body.code === 200) {
            console.log('返回', res)
            if (status == 'l_success' || status == 'a_success') {
              this.$Message.success('通过完成!');
            } else if (status == 'l_fail' || status == 'a_fail') {
              this.$Message.success('不通过完成!');
            }
          }
        }, (err) => {
          this.$Message.error(err.body.result.msg)
        });
      },

      instanceDetails () {//展示实例详情推荐配置
        this.instanceCreate = true
      },
      closeModal () {
        this.instanceCreate = false
      }
    }
  }
</script>