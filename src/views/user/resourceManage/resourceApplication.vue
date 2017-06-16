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
    <div class="contain" v-for="(item,index) in resourceInformation">
      <div class="item">
        <span class="title">虚拟机名称</span>
        <Input v-model="item.virtualMachine" placeholder="请输入..." style="width: 200px"></Input>
      </div>
      <div class="item example">
        <span class="title">部署实例</span>
        <Select v-model="item.deployExample" style="width:200px" :disabled="index ==0?false:true">
          <Option v-for="item in exampleList" :value="item.value" :key="item">{{ item.value }}</Option>
        </Select>
        <Button type="dashed" class="add-example" :class="{hidden: index == 0?false:true}" @click="createExample">新建部署实例</Button>
      </div>
      <div class="item">
        <span class="title">资源池选择</span>
        <Select v-model="item.resourcePool" style="width:200px" :disabled="index ==0?false:true">
          <Option v-for="item in resourcePool" :value="item.value" :key="item">{{ item.value }}</Option>
        </Select>
      </div>
      <div class="item">
        <span class="title">部门</span>
        <Input v-model="item.department" placeholder="请输入..." style="width: 200px"></Input>
      </div>
      <div class="item">
        <span class="title">镜像</span>
        <Select v-model="item.mirrorImage" style="width:200px">
          <Option v-for="item in mirrorImage" :value="item.value" :key="item">{{ item.value }}</Option>
        </Select>
      </div>
      <div class="item">
        <span class="title">规格</span>
        <Select v-model="item.standard" style="width:200px">
          <Option v-for="item in standard" :value="item.value" :key="item">{{ item.value }}</Option>
        </Select>
      </div>
      <div class="item add-unit">
        <span class="title">存储空间</span>
        <Input v-model="item.storageSpace" placeholder="最小单位G，最大500G" style="width: 200px"></Input>
        <span class="unit">G</span>
      </div>
      <div class="item">
        <span class="title">数量</span>
        <Input-number :max="10" :min="0" v-model="item.count"></Input-number>
      </div>
    </div>
    <div class="header">业务信息</div>
    <Input class="comment" v-model="serviceInfo" type="textarea" :maxlength="500" :rows=6 placeholder="请输入..."></Input>
  </div>
</template>

<script>
  import Flow from './../../../components/common/flow.vue'
  //引入sha256加密
//  import crypto from 'crypto-js'
//  import sha256 from 'crypto-js/sha256'

  export default {
    name: 'user-application',
    data () {
      return {
        resourceInformation: [{

          deployExample: '',
          virtualMachine: '',
          resourcePool: '',
          department: '',
          mirrorImage: '',
          standard: '',
          storageSpace: '',
          count: 0

        }],
        exampleList: [
          {
            value: '部署实例1'
          },
          {
            value: '部署实例2'
          }
        ],
        resourcePool:[
          {
            value: 'DMZ'
          },
          {
            value: '互联网资源池'
          }
        ],
        standard: [
          {
            value: '2C4G'
          },
          {
            value: '4C8G'
          }
        ],
        mirrorImage: [
          {
            value: 'Centos 7.2'
          },
          {
            value: 'Ubuntu 15.01'
          }
        ],
        serviceInfo: ''

      }
    },
    created () {
      let id = this.$route.query.id
      if(id === undefined) {
//        console.log('没有传参数')
        return
      }else{
        let informationArr = this.$store.state.userData.information
        informationArr.forEach((item,index) => {
          if(item.id == id){
            this.resourceInformation = item.resourceInformation
            this.serviceInformation = item.serviceInformation
            this.id = id
          }
        })
      }

    },
    methods: {
      addInformation () {//添加虚机
        let count = 0
        this.resourceInformation.forEach((item, index) => {
          count += item.count
        })
        if(count >=10){
          this.$Notice.open({
            title: '最多添加10个虚拟机'
          })
          return
        }
        this.resourceInformation.push({
          deployExample: this.resourceInformation[0].deployExample,
          virtualMachine: '',
          resourcePool: this.resourceInformation[0].resourcePool,
          department: '',
          mirrorImage: '',
          standard: '',
          storageSpace: '',
          count: 1
        })
      },
      createExample () {//跳转新建部署实例

        this.$router.push({name: 'user_deployExample'})
//        const user = 'a'
//        console.log(this.$sha256(user).toString(crypto.enc.Hex))
//        console.log(sha256)
      },
      sendInformation () { //提交信息
        let count = 0
        this.resourceInformation.forEach((item, index) => {
          count += item.count
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
//          business_info: this.serviceInfo
//        }
//


//测试假数据使用
        let date = new Date();
        let Y = date.getFullYear();
        let M = date.getMonth()+1;
        let D = date.getDate()
        let h = date.getHours()
        let m = date.getMinutes()
        let applyDate = Y + '-'+ M +'-'+D +' '+ h +':'+ m

        let information = {
          resourceInformation: this.resourceInformation,
          serviceInformation: this.serviceInfo,
          id: 'id0001',
          applyDate: applyDate,
          status: '审批中'
        }

        this.$store.commit('setInformation',information)

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
    margin-bottom: 15px;

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

</style>
