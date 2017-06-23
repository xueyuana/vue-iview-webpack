<template>
  <div class="container">
    <div class="set">
      <Button type="primary" class="add" @click="addInformation">添加</Button>
      <Button type="primary" @click="sendInformation">提交</Button>
    </div>
    <div class="steps">
      <Steps :current="0">
        <Step title="提交申请" ></Step>
        <Step title="行政审批" ></Step>
        <Step title="技术审批" ></Step>
        <Step title="审批完成" ></Step>
      </Steps>
    </div>
    <div class="inquire-table-title">资源信息</div>
    <div class="contain" v-for="(item,index) in resourceInformation" :class="{border: index == 0?false:true}">
      <div class="item">
        <span class="title">虚拟机名称</span>
        <Input v-model="item.vm_name" placeholder="请输入..." style="width: 200px"></Input>
      </div>
      <div class="item">
        <span class="title">部门</span>
        <Input v-model="item.department" placeholder="请输入..." style="width: 200px"></Input>
      </div>
      <div class="item">
        <span class="title">资源池选择</span>
        <Select v-model="az_id" style="width:200px" :disabled="index ==0?false:true">
          <Option v-for="item in az" :value="item.az_id" :key="item">{{ item.az_name }}</Option>
        </Select>
      </div>
      <div class="item example">
        <span class="title">部署实例</span>
        <Select v-model="instance_id" style="width:200px" :disabled="index ==0?false:true">
          <Option v-for="item in instance" @click.native="instanceDetails" :value="item.id" :key="item">{{ item.value }}</Option>
        </Select>
        <Button type="dashed" class="add-example" :class="{hidden: index == 0?false:true}" @click="createExample">新建部署实例</Button>
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
            <Table :columns="columns" :data="configuration"></Table>
          </div>
          <div slot="footer">
            <Button type="primary" size="large" v-text="okText" @click="closeModal"></Button>
          </div>
        </Modal>
      </div>
      <div class="item">
        <span class="title">镜像</span>
        <Select v-model="item.image_id" style="width:200px">
          <Option v-for="item in mirrorImage" :value="item.id" :key="item">{{ item.image_name }}</Option>
        </Select>
      </div>
      <div class="item">
        <span class="title">规格</span>
        <Select v-model="item.flavor_id" style="width:200px">
          <Option v-for="item in flavor" :value="item.flavor_id" :key="item">{{ item.cpu + '' + item.memory }}</Option>
        </Select>
      </div>
      <div class="item add-unit">
        <span class="title">存储空间</span>
        <Input v-model="item.storage" placeholder="最小单位G，最大500G" style="width: 200px"></Input>
        <span class="unit">G</span>
      </div>
      <div class="item">
        <span class="title">数量</span>
        <Input-number :max="10" :min="0" v-model="item.vm_num"></Input-number>
      </div>
    </div>
    <div class="inquire-table-title">业务信息</div>
    <Input class="comment" v-model="business_info" type="textarea" :maxlength="500" :rows=6 placeholder="请输入..."></Input>
  </div>
</template>

<script>
  import Flow from './../../../components/common/flow.vue'

  export default {
    name: 'user-application',
    data () {
      return {
        instanceCreate: false,
        okText: '10秒钟后关闭',
        columns: [
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
        instance_id: '',
        az_id: '',
        business_info: '',
        resourceInformation: [{
          vm_name: '',
          vm_num: 0,
          department: '',
          flavor_id: '',
          image_id: '',
          storage: ''
        }],
        instance: [
          {
            value: '部署实例1',
            id: '001'
          },
          {
            value: '部署实例2',
            id: '002'
          }
        ],
        az:[//资源池
          {
            az_id : "01",
            az_name: "资源池1",
          },
          {
            az_id : "02",
            az_name: "资源池2",
          }
        ],
        flavor: [//虚机规格
          {
            flavor_id : "03b8acba-3c6c-11e7-826c-fa163e9474c7",
            flavor_name: "flaver1",
            cpu : "3c",
            memory: "4g"
          },
          {
            flavor_id : "03b8acba-3c6c-11e7-826c-fa163e9474c2",
            flavor_name: "flaver2",
            cpu : "2c",
            memory: "4g"
          }
        ],
        mirrorImage: [//镜像
          {
            id: "011",
            image_name: "镜像名称1",
            image_size : 1024000,
            image_format : "qcow2",
            created_time : "2017-06-07 11:05:10"
          },
          {
            id: "022",
            image_name: "镜像名称2",
            image_size : 1024000,
            image_format : "qcow2",
            created_time : "2017-06-07 11:05:10"
          }
        ]


      }
    },
    created () {



//      let id = this.$route.query.id
//      if(id === undefined) {
//        return
//      }else{
//
//        this.resourceInformation = [
//          {
//
//            instance_name: '实例1',
//            vm_name: '虚拟机1',
//            az: '资源池1',
//            department: '测试部',
//            image_id: '',
//            flaver_id: '',
//            storage: '',
//            vm_num: 1
//
//          }
//        ]
//
//      }

    },
    methods: {
      getFlavor () {//获取虚拟规格
        const url = 'api/flavor/flavors'

        this.$http.get(url).then((res) => {
          console.log(res.body)
        },(err) => {
          console.log(err)
        })

      },
      getImage () {//获取镜像
        const url = 'api/image/images'
        this.$http.get(url).then((res) => {
          console.log(res.body)
        },(err) => {
          console.log(err)
        })
      },
      getAz () {//获取资源池
        const url = 'api/az/azs'

        this.$http.get(url).then((res) => {
          console.log(res.body)
        },(err) => {
          console.log(err)
        })

      },
      addInformation () {//添加虚机
        let count = 0
        this.resourceInformation.forEach((item, index) => {
          count += item.vm_num
        })
        if(count >=10){
          this.$Notice.open({
            title: '最多添加10个虚拟机'
          })
          return
        }

        this.resourceInformation.push({
          vm_name: '',
          department: '',
          image_id: '',
          flavor_id: '',
          storage: '',
          vm_num: 0
        })
      },
      createExample () {//跳转新建部署实例

        this.$router.push({name: 'user_deployExample'})

      },
      sendInformation () { //提交资源申请
        let count = 0
        this.resourceInformation.forEach((item, index) => {
          count += item.vm_num
        })
        if(count >10){
          this.$Notice.open({
            title: '最多添加10个虚拟机'
          })
          return
        }

        let requestBody = {
          user_name: '用户2',
          user_id: '0696050e-571a-11e7-a83a-fa163e9474c9',
          business_info: this.business_info,
          az_id: this.az_id,
          instance_id: this.instance_id,
          resources: this.resourceInformation
        }

        const url = 'api/mpc_resource/mpc_resources'

        this.$http.post(url,requestBody).then((res) => {
          console.log(res.body)//57ba7aac-571d-11e7-929a-fa163e9474c9

          this.$router.push({name: 'user_resourceQuery'})
        },(err) => {
          console.log(err)
        })



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
    width: 70%;
    margin: 30px auto;
  }
  .contain {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-top: 15px;
    margin-bottom: 5px;

  }
  .item {
    padding-right: 160px;
    padding-bottom: 10px;

  }
  .title{
    width: 80px;
    text-align: center;
    margin-right: 20px;
    display: inline-block;
  }
  .add-example {
    position: absolute;
    right: 38px;
    top: 0;
  }
  .example {
    position: relative;
  }
  .unit {
    position: absolute;
    right: 146px;
    top: 8px;
  }
  .add-unit {
    position: relative;
  }
  .comment {
    width: 800px;
    padding-left: 30px;

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
