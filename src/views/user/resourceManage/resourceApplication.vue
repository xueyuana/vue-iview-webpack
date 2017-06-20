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
    <div class="header">资源信息</div>
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
        <Select v-model="item.az" style="width:200px" :disabled="index ==0?false:true">
          <Option v-for="item in az" :value="item.az_id" :key="item">{{ item.az_name }}</Option>
        </Select>
      </div>
      <div class="item example">
        <span class="title">部署实例</span>
        <Select v-model="item.instance_name" style="width:200px" :disabled="index ==0?false:true">
          <Option v-for="item in instance_name" :value="item.value" :key="item">{{ item.value }}</Option>
        </Select>
        <Button type="dashed" class="add-example" :class="{hidden: index == 0?false:true}" @click="createExample">新建部署实例</Button>
      </div>
      <div class="item">
        <span class="title">镜像</span>
        <Select v-model="item.image_id" style="width:200px">
          <Option v-for="item in mirrorImage" :value="item.id" :key="item">{{ item.image_name }}</Option>
        </Select>
      </div>
      <div class="item">
        <span class="title">规格</span>
        <Select v-model="item.flaver_id" style="width:200px">
          <Option v-for="item in flaver" :value="item.flaver_id" :key="item">{{ item.cpu + '' + item.memory }}</Option>
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
    <div class="header">业务信息</div>
    <Input class="comment" v-model="business_info" type="textarea" :maxlength="500" :rows=6 placeholder="请输入..."></Input>
  </div>
</template>

<script>
  import Flow from './../../../components/common/flow.vue'

  export default {
    name: 'user-application',
    data () {
      return {
        resourceInformation: [{

          instance_name: '',
          vm_name: '',
          az: '',
          department: '',
          image_id: '',
          flaver_id: '',
          storage: '',
          vm_num: 0

        }],
        instance_name: [
          {
            value: '部署实例1'
          },
          {
            value: '部署实例2'
          }
        ],
        az:[//资源池
          {
            az_id : "03b8acba-3c6c-11e7-826c-fa163e9474c7",
            az_name: "资源池1",
          },
          {
            az_id : "03b8acba-3c6c-11e7-826c-fa163e9474c1",
            az_name: "资源池2",
          }
        ],
        flaver: [//虚机规格
          {
            flaver_id : "03b8acba-3c6c-11e7-826c-fa163e9474c7",
            flaver_name: "flaver1",
            cpu : "3c",
            memory: "4g"
          },
          {
            flaver_id : "03b8acba-3c6c-11e7-826c-fa163e9474c2",
            flaver_name: "flaver2",
            cpu : "2c",
            memory: "4g"
          }
        ],
        mirrorImage: [//镜像
          {
            id: "xxxx-xxxx-xxxx-xxxx",
            image_name: "镜像名称1",
            image_size : 1024000,
            image_format : "qcow2",
            created_time : "2017-06-07 11:05:10"
          },
          {
            id: "xxxx-xxxx-xxxx-xxxx",
            image_name: "镜像名称2",
            image_size : 1024000,
            image_format : "qcow2",
            created_time : "2017-06-07 11:05:10"
          }
        ],
        business_info: ''

      }
    },
    created () {
      let id = this.$route.query.id
      if(id === undefined) {
        return
      }else{

        this.resourceInformation = [
          {

            instance_name: '实例1',
            vm_name: '虚拟机1',
            az: '资源池1',
            department: '测试部',
            image_id: '',
            flaver_id: '',
            storage: '',
            vm_num: 1

          }
        ]

      }

    },
    methods: {
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
          instance_name: this.resourceInformation[0].instance_name,
          vm_name: '',
          az: this.resourceInformation[0].az,
          department: '',
          image_id: '',
          flaver_id: '',
          storage: '',
          vm_num: 0
        })
      },
      createExample () {//跳转新建部署实例

        this.$router.push({name: 'user_deployExample'})

      },
      sendInformation () { //提交信息
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

//        let requestBody = {
//          user_name: '用户名',
//          user_id: 'id',
//          business_info: this.business_info,
//          vmlist: this.resourceInformation
//        }
//        const url = '/uop/api/resource/resources'
//
//        this.$http.post(url,requestBody).then((res) => {
//          console.log(res)
//        },(err) => {
//          console.log(err)
//        })

        this.$router.push({name: 'user_resourceQuery'})
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
  .header{
    padding-left:10px;
    height: 30px;
    width: 100%;
    background-color: #f2f2f2;
    line-height: 30px;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 15px;
  }
  .contain {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-top: 30px;
    margin-bottom: 20px;

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

</style>
