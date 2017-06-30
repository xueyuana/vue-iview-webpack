<template>
  <div class="my-resource">
    <div class="query-form inquire-form">
      <div class="queryInformation">

        <div class="item">
          <span class="title">虚拟机名称:</span>
          <Input v-model="query_info.vm_name" placeholder="请输入" style="width: 250px"></Input>
        </div>

        <div class="item date-picker">
          <span class="title">申请日期:</span>
          <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="query_info.applyDate" style="width: 250px"></Date-picker>
        </div>

        <div class="item">
          <span class="title">部署区域:</span>
          <Select v-model="query_info.az_name" style="width:250px">
            <Option v-for="item in az" :value="item.az_name" :key="item">{{ item.az_name }}</Option>
          </Select>
        </div>

        <div class="item">
          <span class="title">状态:</span>
          <Select v-model="query_info.status" style="width:250px">
            <Option v-for="item in approvalStatusVal" :value="item.key" :key="item">{{ item.value }}</Option>
          </Select>
        </div>
        <div class="item">
          <span class="title">部署实例:</span>
          <Select v-model="query_info.instance_id" style="width:250px">
            <Option v-for="item in instance" :value="item.instance_id" :key="item" >{{ item.instance_name }} </Option>
          </Select>
        </div>
      </div>
      <div class="query">
        <Button type="primary" @click="query">查询</Button>
        <Button class="reset" type="ghost" @click="reset">重置</Button>
      </div>
    </div>
    <div class="inquire-table-title">资源列表</div>
    <table>
      <thead>
        <tr>
          <th v-for="item in columns" :key="item.key">{{item.title}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in queryResult" :class="{bac: index%2 != 0}">
          <td>{{item.number}}</td>
          <td>{{item.vm_name}}</td>
          <td>{{item.deploy_inst_id}}</td>
          <td>{{item.ip}}</td>
          <td>{{item.image_id}}</td>
          <td>{{item.host_name}}</td>
          <td>{{item.az_name}}</td>
          <td>{{item.flavor_id}}</td>
          <td>{{item.storage}}</td>
          <td> {{item.status}} </td>
          <td>
            <Dropdown>
              <a href="javascript:void(0)">
                更多
                <Icon type="arrow-down-b"></Icon>
              </a>
              <Dropdown-menu slot="list">
                <Dropdown-item v-for="operation in operationList[index]" @click.native="operationClick($event,index,item.vm_uuid,item.number)" :selected="operation.selected">{{ operation.value }}</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </td>
        </tr>
        <tr :class="{hidden: data_length}">
         <td colspan="10"> 暂无数据</td>
        </tr>

      </tbody>

    </table>
    <div class="page">
      <Page :total="data_length" show-sizer @on-change="changePage" @on-page-size-change="page_size_change" :current="current_page" :page-size="page_size"></Page>
    </div>

  </div>


</template>
<script>
  export default {
    data () {
      return {
        index: 0,
        data_length: 0,
        current_page: 1,
        page_size: 10,
        user_info: {},
        approvalStatusVal: [
          {
            value: '运行',
            key: 'running'
          },
          {
            value: '异常',
            key: 'error'
          },
          {
            value: '提交',
            key: 'summit'
          }
        ],
        instance: [],
        flavor: [],
        az: [],
        mirrorImage: [],
        query_info: {
          applyDate: [],
          vm_name: '',
          az_name: '',
          status: '',
          instance_id: ''
        },
        operationList: [],
        model2: '',
        columns: [
          {
            title: '序号',
            key: 'number'
          },
          {
            title: '虚拟机名称',
            key: 'vm_name'
          },
          {
            title: '部署实例',
            key: 'deploy_inst_id'
          },
          {
            title: 'IP',
            key: 'ip'
          },
          {
            title: '操作系统',
            key: 'image_id'
          },
          {
            title: '所在物理机',
            key: 'host_name'
          },
          {
            title: '部署区域',
            key: 'az_name'
          },
          {
            title: '规格',
            key: 'flavor_id'
          },
          {
            title: '存储空间',
            key: 'storage'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: '操作',
            key: 'operate',
          }
        ],
        getResult: [],
        queryResult: []

      }
    },
    created () {
      this.getUser()

      if (this.user_info.role === 'user') {
        this.getVm({user_id: this.user_info.id})//获取虚机
      } else {
        this.getVm()
      }

      this.getAz()//获取资源池
      this.getInstance()//获取实例

      this.getFlavor()//获取规格
      this.getImage()//获取镜像


    },
    methods: {
      getFlavor () {//获取虚拟规格
        const url = 'api/flavor/flavors'

        this.$http.get(url).then((res) => {
          this.index ++
//          console.log('规格',res.body)
          this.flavor = res.body.result.res
        },(err) => {
          console.log(err)
        })

      },
      getAz () {//获取资源池
        const url = 'api/pool/pools'

        this.$http.get(url).then((res) => {
//          console.log('资源池',res.body)
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

        let params = {}

        if (this.user_info.role === 'user') {
          params.user_id = this.user_info.id
        }

        this.$http.get(url,{params:params}).then((res) => {
          this.index ++
//          console.log('实例',res.body)
          this.instance = res.body.result.res

        },(err) => {
          console.log(err)
        })
      },
      getImage () {//获取镜像
        const url = 'api/image/images'
        this.$http.get(url).then((res) => {
          this.index ++
//          console.log('镜像',res.body)
          this.mirrorImage =  res.body.result.res
        },(err) => {
          console.log(err)
        })
      },
      getUser () {

        Object.assign(this.user_info,this.$store.state.userData.userInfo)

      },
      query () {
        this.getResult = []
        this.queryResult = []
        this.current_page = 1

        const start_time = this.query_info.applyDate[0]
        const end_time = this.query_info.applyDate[1]

        let requestBody = {}

        if (this.user_info.role) {
          requestBody.user_id = this.user_info.id
        }
        start_time && (requestBody.start_time = this.timeFormat(start_time))
        end_time && (requestBody.end_time = this.timeFormat(end_time))
        this.query_info.status && (requestBody.status = this.query_info.status)
        this.query_info.instance_id && (requestBody.instance_id = this.query_info.instance_id)
        this.query_info.az_name && (requestBody.az_name = this.query_info.az_name)
        this.query_info.vm_name && (requestBody.vm_name = this.query_info.vm_name)
//        console.log('res',requestBody)

        this.getVm(requestBody)

      },
      getVm (query) {//获取虚拟机

        this.getResult = []
        this.queryResult = []
        this.current_page = 1

        const url = 'api/mpc_resource/mpc_resource_creater'

        this.$http.get(url,{params: query}).then((res) => {
          if(this.index !== 4) {
            this.index ++
          }
//          console.log('虚机',res.body)
          this.getResult = res.body.result.res

          this.data_length = this.getResult.length


          if(this.index == 4) {
            this.formatData()
          }


        },(err) => {
          console.log(err)
        })

      },
      formatData () {


        this.getResult.forEach((vm,index) => {
         vm.number = index +1

          this.instance.forEach((inst) => {//循环实例
            if(inst.instance_id == vm.deploy_inst_id) {
              vm.deploy_inst_id = inst.instance_name
            }
          })

          this.mirrorImage.forEach((image) => {//循环镜像
            if(image.id == vm.image_id) {
              vm.image_id = image.image_name
            }
          })

          this.flavor.forEach((flavor) => {//循环规格
            if(flavor.flavor_id == vm.flavor_id) {
              vm.flavor_id = flavor.flavor_name
            }
          })

          switch (vm.status) {
            case 'summit': vm.status = '提交'
              break
            case 'running': vm.status = '运行'
              break
            case 'error': vm.status = '异常'
              break
          }

        })
        console.log('vm',this.getResult)

        this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page)


        this.setOptionList()


      },
      setOptionList () {
        this.operationList = []
        this.queryResult.forEach((item,index) => {

          switch (item.status) {
            case '运行': this.operationList.push([
              {
                key: 'restart',
                value: '重启',
                selected: false
              },
              {
                key: 'stop',
                value: '关机',
                selected: false
              },
              {
                key: 'delete',
                value: '删除',
                selected: false
              }
            ])
              break
            case '异常': this.operationList.push([
              {
                key: 'delete',
                value: '删除',
                selected: false
              }
            ])
              break
            case '提交': this.operationList.push([
              {
                key: 'delete',
                value: '删除',
                selected: false
              }
            ])
              break
          }

        })
      },
      operationClick (event,index,vm_uuid,number) {//点击高亮显示
        console.log('vm_id',vm_uuid)
        //index指的是行数
        console.log(this.operationList[index])
        this.operationList[index].forEach((item,index) => {
          if(item.value == event.target.firstChild.data) {//确定用户点击的操作

            item.selected = true

            let restartType = ''

            switch (this.user_info.role) {
              case 'user': restartType = 'SOFT'
                break
              case 'admin': restartType = 'HARD'
                break
            }


            const url = 'api/mpc_vm_operation/operations'

            let requestBody = {
              vm_uuid: vm_uuid,
              operation: item.key
            }


            item.key == 'restart' && (requestBody.reboot_type = restartType )//operation为restart的时候可以传reboot_type

            this.$http.post(url,requestBody).then((res) => {

              if(res.body.code == 200) {


                if(item.key == 'delete') {

                  this.getVm({user_id: this.user_info.id})

                }

                this.$Message.info('操作成功');

              }

            },(err) => {
              console.log(err)
              this.$Message.info('操作失败');
            })

          }else {
            item.selected = false
          }
        })

      },
      reset () {
        this.query_info = {
          applyDate: [],
          vm_name: '',
          az_name: '',
          status: '',
          instance_id: ''

        }
      },
      changePage (page) {

        this.queryResult = this.mockTableData(this.getResult,this.page_size,page)

        this.setOptionList()

        this.current_page = page

      },
      page_size_change (size) {
        this.page_size = size

        this.current_page = 1

        this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page)

        this.setOptionList()

      },
      mockTableData (originData, pageSize, index) {//进行分页

        let data = [];

        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > originData.length ? originData.length : (num + pageSize)

        data = originData.slice(num,maxNum)
//        console.log(num,maxNum)

        return data;
      },
      timeFormat (date) {//时间格式化

        let Y = date.getFullYear();
        let M = date.getMonth()+1;
        let D = date.getDate()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        M = M<10?'0' + M:M
        D = D<10?'0' + D:D
        h = h<10?'0' + h:h
        m = m<10? '0' + m:m
        s = s<10? '0' + s:s

        let applyDate = Y + '-'+ M +'-'+D +' '+ h +':'+ m + ':' + s
        return applyDate
      },
    },
    watch: {
      index (newVal,oldVal) {
        if(newVal == 4) {
//          console.log('instance',this.instance)
//          console.log('image',this.mirrorImage)
//          console.log('flavor',this.flavor)
//          console.log('vm',this.getResult)
          this.formatData()

        }

      }
    }
  }

</script>
<style scoped>
  .my-resource {
    width: 100%;
  }
  .queryInformation{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

  }
  .query-form {
    width: 100%;
    padding-bottom: 20px;
  }
  .date-picker {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .item {
    margin: 10px 5px;
  }
  .title {
    display: inline-block;
    width: 80px;
    margin-right: 10px;
    text-align: center;
  }
  .query {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 26px;
    box-sizing: border-box;
  }
  .reset {
    margin-left: 20px;
  }
  .page {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .header {
    margin: 30px 0 10px;
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
    height: 48px;
    border: 1px solid #dddee1;
  }
  table thead tr {
    height: 40px;
  }
  table thead tr{
    background-color: #ebf4fe;
  }
  table tbody tr:hover {
    background-color: #F3FAFF;
  }

 .hidden {
   display: none;
 }

  .ivu-dropdown-menu {
    min-width: 60px;
  }

  .bac {
    background-color: #fcfcfc;
  }



</style>
