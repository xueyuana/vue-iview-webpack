<template>
  <div class="container">
    <div class="set">
      <Button type="ghost" :class="{hidden: !isDisabled}" class="add" @click="return_query">返回</Button>
      <Button type="primary" :disabled="isDisabled" class="add" @click="addInformation">添加</Button>
      <Button type="primary" :disabled="isDisabled" @click="sendInformation">提交</Button>
    </div>
    <div class="steps">
      <Steps :current="current" :status="stepsStatus" >
        <Step title="提交申请" ></Step>
        <Step title="直属领导审批" ></Step>
        <Step title="经信委技术审批" ></Step>
        <Step title="审批完成" ></Step>
      </Steps>
    </div>
    <div class="inquire-table-title">资源信息</div>

    <Form ref="formCommon" :model="common_info" :rules="ruleCommon" label-position="right" :label-width="90" >
      <div class="contain">
      <Form-item label="部署区域：" prop="az_name">
        <div class="item-common">
          <Select clearable v-model="common_info.az_name" :disabled="isDisabled" style="width:180px">
            <Option v-for="item in az" :value="item.az_name" :key="item">{{ item.az_name }}</Option>
          </Select>
        </div>
      </Form-item>
      <Form-item label="部署实例：" prop="instance_id">
        <div class="item-common example">
          <Select clearable v-model="common_info.instance_id" :disabled="isDisabled" style="width:180px" >
            <Option v-for="item in instance" @click.native="instanceDetails(item.instance_id)" :value="item.instance_id" :key="item">{{ item.instance_name }}</Option>
          </Select>
          <Button type="dashed" class="add-example" @click="createExample">新建部署实例</Button>
          <Modal v-model="instanceCreate" title="提示" :ok-text="okText" :mask-closable="false" :closable="false">
            <div class="modal-wrap">
              <div class="instance-title">您的业务类型:</div>
              <table>
                <tbody>
                <tr>
                  <td>用户群体规模</td>
                  <td>{{recomConfig.user_size}}</td>
                </tr>
                <tr>
                  <td>用户活跃度</td>
                  <td>{{recomConfig.liveness}}</td>
                </tr>
                <tr>
                  <td>业务类型</td>
                  <td>{{recomConfig.business_type}}</td>
                </tr>
                <tr>
                  <td>数据大小</td>
                  <td>{{recomConfig.data_unit}}</td>
                </tr>
                <tr>
                  <td>高可用</td>
                  <td>{{recomConfig.ha}}</td>
                </tr>
                </tbody>
              </table>
              <div class="instance-title">推荐配置:</div>
              <Table :columns="columns" :data="configuration"></Table>
            </div>
            <div slot="footer">
              <Button type="primary" size="large" v-text="okText" @click="closeModal"></Button>
            </div>
          </Modal>
        </div>
      </Form-item>
      </div>
    </Form>

    <Form ref="formInfo" v-for="(item,index) in resourceInformation" :model="item" :rules="rule" label-position="right" :label-width="90" >

      <div class="contain" :class="{border: index == 0?false:true}" >

        <div class="option" :class="{hidden: index == 0 || isDisabled? true:false}">
          <div class="delete" @click="deleteVm(index)">
            <Icon type="trash-a"  size="26" color="#0063d0"></Icon>
          </div>
          <div class="add-s" @click="addInformation">
            <Icon type="plus-round" size="26" color="#0063d0"></Icon>
          </div>
        </div>

        <Form-item label="虚拟机：" prop="vm_name">
          <div class="item-common">
            <Input v-model="item.vm_name" placeholder="请输入" :disabled="isDisabled" style="width: 180px"></Input>
          </div>
        </Form-item>
        <Form-item label="操作系统：" prop="image_id">
          <div class="item-common">
            <Select clearable v-model="item.image_id" :disabled="isDisabled" style="width:180px">
              <Option v-for="item in mirrorImage" :value="item.id" :key="item">{{ item.image_name }}</Option>
            </Select>
          </div>
        </Form-item>
        <Form-item label="规格：" prop="flavor_id">
          <div class="item-common">
            <Select clearable v-model="item.flavor_id" :disabled="isDisabled" style="width:180px">
              <Option v-for="item in flavor" :value="item.flavor_id" :key="item">{{ item.flavor_name }}</Option>
            </Select>
          </div>
        </Form-item>
        <Form-item label="存储空间：" prop="storage" class="ivu-form-item-required">
          <div class="item-common add-unit">
            <Input v-model="item.storage" placeholder="最小单位G，最大500G" number :disabled="isDisabled" style="width: 180px"></Input>
            <span class="unit">G</span>
          </div>
        </Form-item>
        <Form-item label="数量：" prop="vm_num">
          <div class="item-common">
            <Input-number :max="10" :min="1" :disabled="isDisabled" v-model="item.vm_num"></Input-number>
          </div>
        </Form-item>

      </div>
    </Form>
    <div class="inquire-table-title">业务信息</div>
    <Input class="comment" v-model="business_info" :disabled="isDisabled" type="textarea" :maxlength="500" :rows=6 placeholder="请输入"></Input>
    <div :class="{hidden: !isDisabled}">
      <div class="inquire-table-title">直属领导审批意见</div>
      <Input class="comment" v-model="suggestion" :disabled="isDisabled" type="textarea" :maxlength="100" :rows=6 placeholder="暂无审批意见"></Input>
    </div>
    <div :class="{hidden: !isDisabled}">
      <div class="inquire-table-title">经信委技术审批意见</div>
      <Input class="comment" v-model="admin_suggestion" :disabled="isDisabled" type="textarea" :maxlength="100" :rows=6 placeholder="暂无审批意见"></Input>
    </div>
  </div>
</template>

<script>
  import Flow from './../../../components/common/flow.vue'

  export default {
    name: 'user-application',
    data () {

      const validateAge = (rule,value,callback) => {
        if(value == 0) {
          callback(new Error('请填写存储空间'))
        }else {
          if(!Number.isInteger(value)) {
            callback(new Error('请填写整数'))
          }else {
            if(value<0) {
              callback(new Error('请填写大于0的整数'))
            }else {
              if(value > 500) {
                callback(new Error('不能大于500'))
              }else {
                callback()
              }
            }
          }
        }

      }
      return {
        current: 0,
        stepsStatus: 'process',
        user_info: {},
        instanceCreate: false,
        okText: '关闭',
        isDisabled: false,
        suggestion: '',
        admin_suggestion: '',
        columns: [
          {
            title: '配置',
            key: 'configuration',
            align: 'center'
          },
          {
            title: '数量(台)',
            key: 'number',
            align: 'center',
            width: '150'
          }
        ],
        recomConfig: {},    // 推荐配置
        configData: {
          cpu: 2,
          memory: 4,
          storage: 50,
          num: 1
        },
        common_info: {
          instance_id: '',
          az_name: ''
        },
        ruleCommon: {
          instance_id: [
            {required: true,message: '请填写部署实例',trigger: 'change'}
          ],
          az_name: [
            {required: true, message: '请输入部署区域',trigger: 'change'}
          ]

        },
        business_info: '',
        department: '',
        resourceInformation: [{
          vm_name: '',
          vm_num: 1,
          flavor_id: '',
          image_id: '',
          storage: ''
        }],
        rule: {
          vm_name: [
            {required: true, max: 15, message: '请输入最多15位虚机名',trigger: 'change'}
          ],
          flavor_id: [
            {required: true, message: '请选择规格', trigger: 'change'}
          ],
          image_id: [
            {required: true, message: '请选择操作系统', trigger: 'change'}
          ],
          storage: [
            {validator: validateAge, trigger: 'change'},
          ]
        },
        instance: [],//部署实例
        az:[],//资源池
        flavor: [],//虚机规格
        mirrorImage: []//镜像


      }
    },
    created () {
      this.getUser()//获取用户信息
      this.getFlavor()//获取规格
      this.getImage()//获取镜像
      this.getInstance()//获取实例
      this.getAz()//获取资源池
      let id = this.$route.query.id
      if(id === undefined) {
        return
      }else{

        let query = {resource_id: id}

        this.isDisabled = true

        this.getResource(query)

      }

    },
    watch: {
      routeId (newId,oldId) {

        if(newId === undefined && oldId) {
          window.location.reload()

        }

      }
    },
    computed: {
      routeId () {
        return this.$route.query.id
      },

      configuration() {
        return [
          {
            configuration: 'CPU：'+ this.configData.cpu +'核 | 内存：'+ this.configData.memory +'G | 硬盘：'+ this.configData.storage +'G',
            number: this.configData.num
          }
        ]
      }
    },
    methods: {
      getFlavor () {//获取虚拟规格
        const url = 'api/flavor/flavors'

        this.$http.get(url).then((res) => {
          this.flavor = res.body.result.res
        },(err) => {
          console.log(err)
        })

      },
      getImage () {//获取镜像
        const url = 'api/image/images'
        this.$http.get(url).then((res) => {
          this.mirrorImage =  res.body.result.res
        },(err) => {
          console.log(err)
        })
      },
      getAz () {//获取资源池
        const url = 'api/pool/pools'

        this.$http.get(url).then((res) => {
          res.body.result.res.forEach((item ,index) => {
            this.az.push({
              az_name: item.pool_name
            })
          })
        },(err) => {
          console.log(err)
        })

      },
      getInstance () {//获取实例
        const url = 'api/deploy_instance/deploy_instances'

        let params = {
          user_id: this.user_info.id
        }

        this.$http.get(url,{params:params}).then((res) => {

          this.instance = res.body.result.res

        },(err) => {
          console.log(err)
        })
      },
      getUser () {

        Object.assign(this.user_info,this.$store.state.userData.userInfo)
        this.department = this.user_info.department

      },
      return_query () {
        this.$router.push({name: '资源查询'})
      },
      addInformation () {//添加虚机
        let count = 0
        this.resourceInformation.forEach((item, index) => {
          count += item.vm_num
        })
        if(count >=10){
          this.$Message.info('最多申请10个虚机');
          return
        }

        this.resourceInformation.push({
          vm_name: '',
          vm_num: 1,
          flavor_id: '',
          image_id: '',
          storage: ''
        })
      },
      deleteVm (index) {//删除创建虚机
        this.resourceInformation.splice(index,1)
      },

      getResource (query) {//根据资源ID查询资源
        const url = 'api/mpc_resource/mpc_resources'

        this.$http.get(url,{params:query}).then(res => {

          let resource_info = res.body.result.res[0]

          switch (resource_info.status) {
            case 'submit': this.current = 1; this.stepsStatus = 'process'
              break
            case 'l_success': this.current = 2;this.stepsStatus = 'process'
              break
            case 'l_fail': this.current = 1 ; this.stepsStatus = 'error'
              break
            case 'a_success': this.current = 3;this.stepsStatus = 'finish'
              break
            case 'a_fail': this.current = 2 ; this.stepsStatus = 'error'
              break
            case 'created_success': this.current = 3; this.stepsStatus = 'finish'
              break
          }

          this.business_info = resource_info.business_info
          this.common_info.az_name = resource_info.az_name
          this.common_info.instance_id = resource_info.instance_id
          this.resourceInformation = resource_info.resources
          this.suggestion = resource_info.suggestion
          this.admin_suggestion = resource_info.admin_suggestion

        },(err) => {
          console.log(err)
        })
      },
      createExample () {//跳转新建部署实例

        this.$router.push({name: '部署实例'})

      },
      sendInformation () { //提交资源申请
        let num = -1
        this.$refs.formCommon.validate((valid) => {

          if(valid){

            this.$refs.formInfo.some((item,index) => {

              this.$refs.formInfo[index].validate((valid) => {
                if(!valid) {

                  this.$Message.info('请正确填写申请内容');
                  num = index
                }
              })

            })

            if(num === -1) {//表单验证成功

              let count = 0
              this.resourceInformation.forEach((item) => {
                count += item.vm_num
              })

              if (count > 10) {
                this.$Message.info('最多申请10个虚机');
                return
              }


              let requestBody = {
                user_name: this.user_info.username,
                user_id: this.user_info.id,
                business_info: this.business_info,
                az_name: this.common_info.az_name,
                instance_id: this.common_info.instance_id,
                department: this.department,
                resources: this.resourceInformation
              }

              const url = 'api/mpc_resource/mpc_resources'

              this.$http.post(url, requestBody).then((res) => {

                this.$router.push({name: '资源查询'})

              }, (err) => {
                console.log(err)
                this.$Message.info('创建失败');
              })

            }

          }else {
            this.$Message.info('请正确填写申请内容');

          }
        })

      },

      instanceDetails (id) {//展示实例详情推荐配置
        this.instanceCreate = true
        this.getDeploy(id)
      },
      closeModal () {
        this.instanceCreate = false

      },

      getDeploy(id) {     // 某条部署实例
        let url = 'api/deploy_instance/deploy_instances'
        let query = {instance_id: id}
        this.$http.get(url, {params: query}).then((res) => {
          if (res.body.code === 200) {
            this.recomConfig = res.body.result.res[0]
            this.countConfig(this.recomConfig)
          }
        }, (err) => {
          console.log(err)
        });
      },

      countConfig(config) {
        let cpu = []
        let memory = []
        let storage = []
        let num = []
        switch (config.user_size) {
          case '内网少量用户':
            cpu.push(2); memory.push(4); storage.push(50); num.push(1)
            break
          case '内网大量用户':
            cpu.push(4); memory.push(8); storage.push(100); num.push(1)
            break
          case '外网少量用户':
            cpu.push4; memory.push(8); storage.push(100); num.push(1)
            break
          case '外网大量用户':
            cpu.push(8); memory.push(16); storage.push(200); num.push(1)
            break
          default:
        }
        switch (config.liveness) {
          case '偶尔使用':
            cpu.push(2); memory.push(4); storage.push(50); num.push(1)
            break
          case '经常使用':
            cpu.push(4); memory.push(8); storage.push(100); num.push(2)
            break
          case '频繁使用':
            cpu.push(8); memory.push(16); storage.push(200); num.push(4)
            break
          default:
        }
        switch (config.business_type) {
          case '网站':
            cpu.push(2); memory.push(4); storage.push(50); num.push(2)
            break
          case '存储类应用':
            cpu.push(4); memory.push(8); storage.push(500); num.push(4)
            break
          case '视频':
            cpu.push(8); memory.push(16); storage.push(500); num.push(4)
            break
          case '大数据':
            cpu.push(8); memory.push(16); storage.push(500); num.push(4)
            break
          default:
        }
        switch (config.data_unit) {
          case 'MB':
            cpu.push(2); memory.push(4); storage.push(50); num.push(1)
            break
          case 'GB':
            cpu.push(4); memory.push(8); storage.push(500); num.push(2)
            break
          case 'TB':
            cpu.push(8); memory.push(16); storage.push(500); num.push(4)
            break
          default:
        }
        cpu.sort((a,b) => {return b - a});
        memory.sort((a,b) => {return b - a});
        storage.sort((a,b) => {return b - a});
        num.sort((a,b) => {return b - a});
        this.configData.cpu = cpu[0]
        this.configData.memory = memory[0]
        this.configData.storage = storage[0]
        this.configData.num = num[0]

        switch (config.ha) {
          case '需要':
            this.configData.cpu *= 2
            this.configData.memory *= 2
            this.configData.storage *= 2
            this.configData.num *= 2
            break
          default:
        }

      },
    }

  }
</script>


<style scoped>
  .container{
    width: 100%;
  }
  .set{
    display: flex;
    justify-content: flex-end;
  }
  .add {
    margin-right: 20px;
  }
  .steps {
    width: 80%;
    margin: 30px auto;
  }
  @media screen and (max-width: 1024px){
    .steps {
      width: 90%;
    }

  }
  .contain {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-top: 15px;
    margin-bottom: 5px;

  }
  .item-common {
    padding-right: 84px;
  }
  .item {
    padding-right: 110px;
    padding-bottom: 10px;

  }
  .title{
    width: 60px;
    text-align: center;
    display: inline-block;
  }
  .add-example {
    position: absolute;
    right: -24px;
    top: 0;
  }
  .example {
    position: relative;
  }
  .unit {
    position: absolute;
    right: 70px;
    top: 2px;
  }
  .add-unit {
    position: relative;
  }
  .comment {
    padding-left: 20px;

  }
  .hidden {
    display: none;
  }
  .border {
    border-top: 1px solid #e4e4e4
  }
  .instance-title {
    font-size: 16px;
    line-height: 38px;
  }
  .modal-wrap {
    width: 90%;
    margin: 0 auto;
  }

  .option {
    width: 100%;
    display: flex;
    padding-left: 90%;
  }
  .add-s {
    margin-left: 30px;
    cursor: pointer;
  }
  .delete {
    cursor: pointer;
  }
  .hidden {
    display: none;
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
  textarea.ivu-input {
    width: 100%;
  }

</style>
