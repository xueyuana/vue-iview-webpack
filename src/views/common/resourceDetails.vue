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
      <Steps :current="0">
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
    <div class="status-list">
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
    <div class="status-list">
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
              {{formValidate.apply_code}}
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
              {{formValidate.resource}}
            </Form-item>
            <Form-item label="存储空间:" class="form-item">
              {{formValidate.storeSpace}}G
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="部署实例:" class="form-item">
              {{formValidate.case}}
            </Form-item>
            <Form-item label="规格:" class="form-item">
              {{formValidate.spec}}
            </Form-item>
            <Form-item label="数量:" class="form-item">
              {{formValidate.total}}
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
          <!--</Col>-->
          <Col span="24">
          <div class="sub-title">业务信息</div>
          <Input v-model="ywInfo" type="textarea" :maxlength="100" :autosize="{minRows: 2,maxRows: 5}" placeholder="示例：xxx业务为xxx提供互联网服务，此业务位于政务外网区域，业务上线日期预计xxx日，建设周期xx日"></Input>
          </Col>
          <Col span="24">
          <div class="sub-title">行政审批意见</div>
          <Input v-model="xzInfo" type="textarea" :maxlength="100" :autosize="{minRows: 2,maxRows: 5}" placeholder="默认显示同意，最多100个字符"></Input>
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
        resourceId: '',
        funcBtns: ['返回', '通过', '不通过'],
        formValidate: {
          apply_code: '',
          virtual_name: '',
          department: '',
          spec: '',
          storeSpace: '',
          case: '',
          resource: '',
          mirror: '',
          total: 0
        },
        ywInfo: '',
        xzInfo: ''
      }
    },
    components: { Flow },
    mounted() {
      this.resourceId = this.$route.query.apply_code;
      console.log('resourceId', this.resourceId);
      if (this.resourceId) {
        this.getInfo();
      } else {}
    },
    computed: {

    },
    methods: {
      getInfo () {
        console.log('resourceId', this.resourceId);
        this.formValidate = {
          apply_code: 'ID0001',
          virtual_name: '虚拟机1',
          department: '部门1',
          spec: '4C8G',
          storeSpace: '20',
          case: '实例1',
          resource: 'DMZ',
          mirror: 'Ubuntu 15.01',
          total: 2
        }
        this.ywInfo='提供互联网服务，此业务位于政务外网区域';
        this.xzInfo='同意';
      },
      onLink(index) {
        switch (index) {
          case 0:
            this.$router.go(-1);
            break;
          case 1:
            this.onSubmit();
            break;
          default:
            this.onNo();
            break;
        }
      },
      onSubmit () {
        console.log('ddsss', this.ywInfo);
        console.log('xzInfo', this.xzInfo);
        this.$store.commit('setStatus','审批完成');
        this.$Message.success('通过!');
      },
      onNo () {
        console.log('ddsss', this.ywInfo);
        console.log('xzInfo', this.xzInfo)
        this.$Message.error('不通过!');
      }
    }
  }
</script>