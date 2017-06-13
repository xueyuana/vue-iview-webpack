<template>
    <div class="rsource-approval">
      <div class="status-list">
        <div class="">xxx资源池资源使用情况</div>
        <Row :gutter="16">
          <Col span="6">
            <div><Progress :percent="25" :stroke-width="5"></Progress></div>
          </Col>
          <Col span="6">
            <div><Progress :percent="25" :stroke-width="5"></Progress></div>
          </Col>
          <Col span="6">
            <div><Progress :percent="25" :stroke-width="5"></Progress></div>
          </Col>
        </Row>
      </div>
      <div class="form-info">
        <Form ref="formValidate" :model="formValidate" :label-width="120">
          <Row>
            <Col span="24">
            <div class="title">资源信息</div>
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
            <div class="title">业务信息</div>
            <Input v-model="formValidate.ywInfo" type="textarea" :maxlength="100" :autosize="{minRows: 2,maxRows: 5}" placeholder="示例：xxx业务为xxx提供互联网服务，此业务位于政务外网区域，业务上线日期预计xxx日，建设周期xx日"></Input>
            </Col>
            <Col span="24">
            <div class="title">行政审批意见</div>
            <Input v-model="formValidate.xzInfo" type="textarea" :maxlength="100" :autosize="{minRows: 2,maxRows: 5}" placeholder="默认显示同意，最多100个字符"></Input>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
</template>

<style scoped>
  .title{
    width: 100%;
    height: 20px;
    padding-left: 5px;
    background-color: #f2f2f2;
    font-size: 14px;
    line-height: 20px;
    margin: 20px 0;
    color:#000;
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
          total: 1,
          ywInfo: '',
          xzInfo: ''
        },
      }
    },
    computed: {},
    methods: {
      onLink(index) {
        switch (index) {
          case 0:
            this.$router.go(-1);
            break;
          case 1:
            this.onReset();
            break;
          default:
            this.onSubmit();
            break;
        }
      },
      onSubmit (name) {
        let self=this;
        // 从localStorage中获取用户信息
        let userInfo=JSON.parse(localStorage.getItem('userInfo'));

        self.$refs[name].validate((valid) => {
          if (valid) {
            // 1.0 将表单数据提交到后台
            let newProject={
              user_id : userInfo.user_id ,
              user_name : userInfo.username,
              item_name : self.formValidate.project_name,
              item_code : self.formValidate.project_code,
              item_department  : userInfo.department,
              item_description : self.formValidate.project_desc
            };

            newProject=JSON.stringify(newProject);
            console.log(newProject);

            const url=common.apihost+'iteminfo/iteminfoes';

            self.$http.post(url,newProject,{emulateJSON:true})
                    .then(response=>{ //提交成功
              console.log(response);
            if(response.body.code===2002) {
              // 2.0 修改面包屑导航的数据 修改侧边导航的默认选项
              // 2.0.1 修改激活项
//                                           self.$store.commit('getActiveItem',{
//                                               openNames:'1',  // Submenu
//                                               activeName:'12'  //Menu-item
//                                           });
//                                            // 2.0.2  修改面包屑导航数据
//                                           self.$store.commit('getLevel',{
//                                               level_1: this.$store.state.breadcrumbData.level.level_1,
//                                               level_2: '部署单元查询'
//                                           });

              // 3.0 跳转到项目查询页面
              self.$router.push({name: 'pro_applicationHistory'});

            }else if(response.body.code===2017) { // 模型已经存在
              self.$Notice.error({
                title: response.body.result.msg,
                desc: ''
              });
            }
          });
          }
        })
      },
      onReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>