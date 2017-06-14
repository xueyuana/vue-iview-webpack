<template>
    <div class="rsource-approval">
      <Row>
        <Col span="12">
          <div class="approval-status">
            待添加公共组件
          </div>
        </Col>
        <Col span="12">
          <div class="approval-button">
            <div>
              <Button class="apply-button-item"
                      type="info"
                      v-for="(item, index) in funcBtns"
                      @click="onLink(index)">{{item}}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <!--<div class="status-list">-->
        <!--<div class="">xxx资源池资源使用情况</div>-->
        <!--<Row :gutter="16">-->
          <!--<Col span="6">-->
            <!--<div><Progress :percent="25" class="rd_progress"></Progress></div>-->
          <!--</Col>-->
          <!--<Col span="6">-->
            <!--<div><Progress :percent="25" class="rd_progress"></Progress></div>-->
          <!--</Col>-->
          <!--<Col span="6">-->
            <!--<div><Progress :percent="25" class="rd_progress"></Progress></div>-->
          <!--</Col>-->
        <!--</Row>-->
      <!--</div>-->
      <div class="status-list">
        <div class="rd_status_title">xxx资源池资源使用情况</div>
        <Row :gutter="10">
          <Col span="7">
          <Row>
            <Col span="5" class="rd_center">
            <div class="rd_graph">vCPU个</div>
            </Col>
            <Col span="14">
            <div class="graph"><strong class="bar" style="width:20%;"></strong></div>
            </Col>
            <Col span="5" class="rd_center">
            <div class="rd_graph">2/30</div>
            </Col>
          </Row>
          </Col>
          <Col span="7">
          <Row>
            <Col span="5" class="rd_center">
            <div class="rd_graph">内存（GB）</div>
            </Col>
            <Col span="10">
            <div class="graph"><strong class="bar" style="width:20%;"></strong></div>
            </Col>
            <Col span="5" class="rd_center">
            <div class="rd_graph">2/30</div>
            </Col>
          </Row>
          </Col>
          <Col span="7">
          <Row>
            <Col span="5" class="rd_center">
            <div class="rd_graph">硬盘（GB）</div>
            </Col>
            <Col span="10">
            <div class="graph"><strong class="bar" style="width:20%;"></strong></div>
            </Col>
            <Col span="5" class="rd_center">
            <div class="rd_graph">2/30</div>
            </Col>
          </Row>
          </Col>
        </Row>
      </div>
      <div class="status-list">
        <div class="rd_status_title">本次申请占用资源情况</div>
        <Row :gutter="16">
          <Col span="7">
            <Row>
              <Col span="5" class="rd_center">
                <div class="rd_graph">vCPU个</div>
              </Col>
              <Col span="14">
                <div class="graph"><strong class="bar" style="width:100%;"></strong></div>
              </Col>
              <Col span="5" class="rd_center">
                <div class="rd_graph">4</div>
              </Col>
            </Row>
          </Col>
          <Col span="7">
            <Row>
              <Col span="5" class="rd_center">
                <div class="rd_graph">内存（GB）</div>
              </Col>
              <Col span="10">
                <div class="graph"><strong class="bar" style="width:100%;"></strong></div>
              </Col>
              <Col span="5" class="rd_center">
                <div class="rd_graph">4</div>
              </Col>
            </Row>
          </Col>
          <Col span="7">
            <Row>
              <Col span="5" class="rd_center">
                <div class="rd_graph">硬盘（GB）</div>
              </Col>
              <Col span="10">
                <div class="graph"><strong class="bar" style="width:100%;"></strong></div>
              </Col>
              <Col span="5" class="rd_center">
                <div class="rd_graph">200</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <!--<div class="status-list1">-->
        <!--<Row :gutter="16">-->
          <!--<Col span="8">-->
          <!--<span class="rd_graph">硬盘（GB）</span>-->
          <!--<div class="graph"><strong class="bar" style="width:100%;"></strong></div>-->
          <!--<span class="rd_graph">200</span>-->
          <!--</Col>-->
          <!--<Col span="8">-->
          <!--<span class="rd_graph">硬盘（GB）</span>-->
          <!--<div class="graph"><strong class="bar" style="width:100%;"></strong></div>-->
          <!--<span class="rd_graph">200</span>-->
          <!--</Col>-->
          <!--<Col span="8">-->
          <!--<span class="rd_graph">硬盘（GB）</span>-->
          <!--<div class="graph"><strong class="bar" style="width:100%;"></strong></div>-->
          <!--<span class="rd_graph">200</span>-->
          <!--</Col>-->
        <!--</Row>-->
      <!--</div>-->
      <div class="form-info">
        <Form ref="formValidate" :model="formValidate" :label-width="120">
          <Row>
            <Col span="24">
            <div class="rs_title">资源信息</div>
            </Col>
            <Col span="12">
            <Form-item label="申请单号">
              <Input v-model="formValidate.apply_code"></Input>
            </Form-item>
            <Form-item label="虚拟机名称">
              <Input v-model="formValidate.virtual_name"></Input>
            </Form-item>
            <Form-item label="部门">
              <Select v-model="formValidate.department">
                <Option label="部门1" value="0"></Option>
                <Option label="部门2" value="1"></Option>
                <Option label="部门3" value="2"></Option>
              </Select>
            </Form-item>
            <Form-item label="规格">
              <Select v-model="formValidate.spec">
                <Option label="2C4G" value="0"></Option>
                <Option label="4C8G" value="1"></Option>
              </Select>
            </Form-item>
            <Form-item label="存储空间">
              <Input v-model="formValidate.storeSpace"></Input>
            </Form-item>
            </Col>
            <Col span="12">
            <Form-item>&nbsp;</Form-item>
            <Form-item label="部署实例" prop="case">
              <Select v-model="formValidate.case">
                <Option label="实例1" value="0"></Option>
                <Option label="实例2" value="1"></Option>
                <Option label="实例3" value="2"></Option>
              </Select>
            </Form-item>
            <Form-item label="资源池">
              <Select v-model="formValidate.resource">
                <Option label="资源池1" value="0"></Option>
                <Option label="资源池2" value="1"></Option>
              </Select>
            </Form-item>
            <Form-item label="镜像">
              <Select v-model="formValidate.mirror">
                <Option label="Centos 7.2" value="0"></Option>
                <Option label="Ubuntu 15.01" value="1"></Option>
              </Select>
            </Form-item>
            <Form-item label="数量">
              <Input-number :max="10" :min="1" v-model="formValidate.total"></Input-number>
            </Form-item>
            </Col>
            <Col span="24">
            <div class="rs_title">业务信息</div>
            <Input v-model="formValidate.ywInfo" type="textarea" :maxlength="100" :autosize="{minRows: 2,maxRows: 5}" placeholder="示例：xxx业务为xxx提供互联网服务，此业务位于政务外网区域，业务上线日期预计xxx日，建设周期xx日"></Input>
            </Col>
            <Col span="24">
            <div class="rs_title">行政审批意见</div>
            <Input v-model="formValidate.xzInfo" type="textarea" :maxlength="100" :autosize="{minRows: 2,maxRows: 5}" placeholder="默认显示同意，最多100个字符"></Input>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
</template>

<style scoped>
  .approval-status{
    color:red;
    font-size: 20px;
    text-align: center;
  }
  .approval-button Button {
    float: right;
    background-color: #39f;
    color: white;
    margin: 0 4px;
  }
  .status-list{
    clear:both;
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
    margin:0px 10px;
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
  .ivu-progress-bg{
      border-radius: 0;
      background-color: #FFDF25;
  }
  .submit {
    text-align: right;
  }
  .info-title {
    height: 20px;
    line-height: 20px;
    background-color: #3399FF;
    color: #fff;
    padding-left: 10px;
  }
  .project-top,.project-des{
    padding: 0 100px;
  }

  .project-mian {
    margin-top: 20px;
  }
</style>

<script>
  export default {
    data() {
      return {
        resourceId: '',
        funcBtns: ['不通过', '通过', '返回'],
        formValidate: {
          apply_code: '',
          virtual_name: '',
          department: '',
          spec: '',
          storeSpace: '',
          case: '',
          resource: '',
          mirror: '',
          total: 1,
          ywInfo: '',
          xzInfo: ''
        }
      }
    },
    mounted() {
      this.resourceId=this.getQueryStringByName('apply_code');
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
            department: '2',
            spec: '1',
            storeSpace: '20G',
            case: '1',
            resource: '1',
            mirror: '1',
            total: 1,
            ywInfo: '提供互联网服务，此业务位于政务外网区域',
            xzInfo: '同意'
        }
      },
      onLink(index) {
        switch (index) {
          case 0:
            this.onNo();
            break;
          case 1:
            this.onSubmit();
            break;
          default:
            this.$router.go(-1);
            break;
        }
      },
      onSubmit () {
        this.$Message.success('通过!');
      },
      onNo () {
        this.$Message.error('不通过!');
//        this.$refs[name].resetFields();
      },
      getQueryStringByName: function (name) {
        var result = document.location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
        if (result == null || result.length < 1) {
          return '';
        }
        return result[1];
      }
    }
  }
</script>