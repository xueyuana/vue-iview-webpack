<template>
  <div class="my-resource">
    <div class="query-form inquire-form">
      <Form :model="query_info" :label-width="80">
        <div class="queryInformation">
        <Form-item label="虚拟机:">
          <Input v-model="query_info.vm_name" placeholder="请输入" style="width: 250px"></Input>
        </Form-item>
          <Form-item label="部署区域:">
            <Select v-model="query_info.az_name" clearable style="width:250px">
              <Option v-for="item in az" :value="item.az_name" :key="item">{{ item.az_name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="状态:">
            <Select v-model="query_info.status" clearable style="width:250px">
              <Option v-for="item in approvalStatusVal" :value="item.key" :key="item">{{ item.value }}</Option>
            </Select>
          </Form-item>
          <Form-item label="部署实例:">
            <Select v-model="query_info.instance_id" clearable style="width:250px">
              <Option v-for="item in instance" :value="item.instance_id" :key="item" >{{ item.instance_name }} </Option>
            </Select>
          </Form-item>
          <Form-item label="申请日期:">
            <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="query_info.applyDate" style="width: 250px"></Date-picker>
          </Form-item>
        </div>
      </Form>
      <div class="query">
        <Button type="primary" @click="query">查询</Button>
        <Button class="reset" type="ghost" @click="reset">重置</Button>
      </div>
    </div>
    <div class="inquire-table-title">
      资源列表
      <span class="time">{{ second }}秒后刷新</span>
      <div class="reload">
        <Icon type="refresh" :size="30" @click.native="reload"></Icon>
      </div>
    </div>
    <div class="table-wrap">
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
          <td><div class="table-column-overflow" :title="item.image_id">{{item.image_id}}</div></td>
          <td> <div class="table-column-overflow" :title="item.host_name">{{item.host_name}} </div></td>
          <td> <div class="table-column-overflow" :title="item.az_name">{{item.az_name}} </div></td>
          <td> <div class="table-column-overflow" :title="item.flavor_id">{{item.flavor_id}} </div></td>
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
          <td colspan="11"> 暂无数据</td>
        </tr>

        </tbody>

      </table>
    </div>
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
        interval: 30000,
        second: 30,
        user_info: {},
        approvalStatusVal: [
          {
            value: '创建中',
            key: 'build'
          },
          {
            value: '运行中',
            key: 'active'
          },
          {
            value: '关机',
            key: 'shutoff'
          },
          {
            value: '重启中',
            key: 'reboot'
          },
          {
            value: '虚机创建失败',
            key: 'vm_error'
          },
          {
            value: '存储空间创建失败',
            key: 'vol_error'
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
            title: '虚拟机',
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
            title: '物理机',
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
            title: '存储空间(G)',
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
      let host_name = this.$route.query.host_name
      let instance_id = this.$route.query.instance_id
      let query = {}
      if(host_name) {
        query.host_name = host_name
      }
      if(instance_id) {
        query.instance_id = instance_id
        this.query_info.instance_id = instance_id
      }

      if (this.user_info.role === 'user') {
        query.user_id = this.user_info.id

      }
      this.getVm(query)


      this.getAz()//获取资源池
      this.getInstance()//获取实例

      this.getFlavor()//获取规格
      this.getImage()//获取镜像

      setInterval( () => {
        this.reload()
      },this.interval)

      setInterval( () => {
        this.second --
        if(this.second <= 0) {
          this.second = 30
        }
      },1000)


    },
    methods: {
      getFlavor () {//获取虚拟规格
        const url = 'api/flavor/flavors'

        this.$http.get(url).then((res) => {
          this.index ++

          this.flavor = res.body.result.res
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

        let params = {}

        if (this.user_info.role === 'user') {
          params.user_id = this.user_info.id
        }

        this.$http.get(url,{params:params}).then((res) => {
          this.index ++
          this.instance = res.body.result.res

        },(err) => {
          console.log(err)
        })
      },
      getImage () {//获取镜像
        const url = 'api/image/images'
        this.$http.get(url).then((res) => {
          this.index ++
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

        if (this.user_info.role === 'user') {
          requestBody.user_id = this.user_info.id
        }
        start_time && (requestBody.start_time = this.timeFormat(start_time))
        end_time && (requestBody.end_time = this.timeFormat(end_time))
        this.query_info.status && (requestBody.status = this.query_info.status)
        this.query_info.instance_id && (requestBody.instance_id = this.query_info.instance_id)
        this.query_info.az_name && (requestBody.az_name = this.query_info.az_name)
        this.query_info.vm_name && (requestBody.vm_name = this.query_info.vm_name)

        this.getVm(requestBody)

      },
      reload () {//刷新
        this.query()
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
            case 'build': vm.status = '创建中'
              break
            case 'active': vm.status = '运行中'
              break
            case 'shutoff': vm.status = '关机'
              break
            case 'reboot': vm.status = '重启中'
              break
            case 'hard_reboot': vm.status = '硬重启中'
              break
            case 'vm_error': vm.status = '虚机创建失败'
              break
            case 'vol_error': vm.status = '存储空间创建失败'
              break
          }

        })

        this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page)


        this.setOptionList()


      },
      setOptionList () {
        this.operationList = []
        this.queryResult.forEach((item,index) => {

          switch (item.status) {
            case '创建中': this.operationList.push([])
              break
            case '运行中': this.operationList.push([
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
            case '关机': this.operationList.push([
              {
                key: 'delete',
                value: '删除',
                selected: false
              },
              {
                key: 'start',
                value: '开机',
                selected: false
              }
            ])
              break
            case '重启中': this.operationList.push([
              {
                key: 'delete',
                value: '删除',
                selected: false
              }
            ])
              break
            case '硬重启中': this.operationList.push([
              {
                key: 'delete',
                value: '删除',
                selected: false
              }
            ])
              break
            case '虚机创建失败': this.operationList.push([
              {
                key: 'delete',
                value: '删除',
                selected: false
              }
            ])
              break
            case '存储空间创建失败': this.operationList.push([
              {
                key: 'delete',
                value: '删除',
                selected: false
              }
            ])
              break
            default: this.operationList.push([])
          }

        })
      },
      operationClick (event,index,vm_uuid,number) {//点击高亮显示

        //index指的是行数
        this.operationList[index].forEach((item,index) => {
          if(item.value == event.target.firstChild.data) {//确定用户点击的操作

            item.selected = true

            if(item.value === '删除') {

              this.$Modal.confirm({
                title: '确认删除',
                content: '<p>是否删除虚机</p>',
                onOk: () => {
                  this.operation(item,vm_uuid)
                },
                onCancel: () => {
                  item.selected = false
                }
              });

            }else {
              this.operation(item,vm_uuid)
            }


          }else {
            item.selected = false
          }
        })

      },
      operation (item,vm_uuid) {//虚机操作

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
          operation: item.key,
          user_name: this.user_info.username,
          user_id: this.user_info.id
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

      },
      reset () {
        this.query_info = {
          applyDate: [],
          vm_name: '',
          az_name: '',
          status: '',
          instance_id: ''

        }
        let query = {}

        if (this.user_info.role === 'user') {
          query.user_id = this.user_info.id

        }
        this.getVm(query)
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
  table {
    width: 100%;
    border-collapse: collapse;
    color: #657180;
    /*table-layout: fixed;*/
    word-break: break-all;
  }
  table td,th{
    text-align: center;
    padding: 4px;
    word-wrap: break-word;

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

  table tr td:first-child {
    min-width: 34px;
  }
  table tr td:nth-child(2) {
    min-width: 44px;
  }
  table tr td:nth-child(3) {
    min-width: 58px;
  }

  table tr td:nth-child(4) {
    min-width: 86px;
  }
  table tr td:nth-child(9) {
    min-width: 78px;
  }
  table tr td:nth-child(10) {
    min-width: 44px;
  }
  table tr td:nth-child(11) {
    min-width: 50px;
  }
  .table-wrap {
    overflow-x: auto;
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
  .time {
    position: absolute;
    right: 76px;
    top: 8px;
  }
  .reload {
    position: absolute;
    padding-top: 12px;
    right: 34px;
    top: 0;
    cursor: pointer;
  }
  @media screen and (max-width: 1366px) {
    .table-column-overflow {
      width: 70px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 0 auto;
    }
  }


</style>
