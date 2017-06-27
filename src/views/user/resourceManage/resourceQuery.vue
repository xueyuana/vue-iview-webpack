<template>
  <div class="resouce-query">
    <div class="query-form">
      <div class="queryInformation">

        <div class="item">
          <span class="title">审批状态</span>
          <Select v-model="query_info.status" style="width:260px">
            <Option v-for="item in approvalStatusVal" :value="item.key" :key="item">{{ item.value }}</Option>
          </Select>
        </div>
        <div class="item date-picker">
          <span class="title">申请日期</span>
          <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" v-model="query_info.created_date" placeholder="选择日期" style="width: 260px"></Date-picker>
        </div>
        <div class="item">
          <span class="title">部署实例</span>
          <Select v-model="query_info.instance_id" style="width:260px">
            <Option v-for="item in instance" :value="item.instance_id" :key="item">{{ item.instance_name }}</Option>

          </Select>
        </div>
      </div>
      <div class="query">
        <Button type="primary" @click="query">查询</Button>
        <Button type="ghost" class="ghost" @click="reset">重置</Button>

      </div>
    </div>
    <div class="inquire-table-title">申请资源列表</div>
    <Table stripe :columns="columns" :data="queryResult"></Table>
    <div class="page">
      <Page :total="data_length" show-sizer @on-change="changePage" @on-page-size-change="page_size_change" :current="current_page" :page-size="page_size"></Page>
    </div>

  </div>


</template>
<script>
  export default {
    data () {
      return {
        data_length: 0,
        page_size: 10,
        current_page: 1,
        getResult: [],
        user_info: '',
        approvalStatusVal: [
          {
            value: '行政审批中',
            key: 'submit'
          },
          {
            value: '行政审批没通过',
            key: 'l_fail'
          },
          {
            value: '技术审批中',
            key: 'l_success'
          },
          {
            value: '技术审批没通过',
            key: 'a_fail'
          },
          {
            value: '审批完成',
            key: 'a_success'
          }
        ],
        instance: [],
        query_info: {
          user_name: '',
          created_date: [],
          status: '',
          instance_id: ''

        },
        columns: [
          {
            title: '序号',
            key: 'number'
          },
          {
            title: '申请单号',
            key: 'resource_id',
            render: (h,params) => {
              return h('a',
                {
                  domProps: {
                    innerHTML: params.row.resource_id
                  },
                  style: {
                    display: 'inline-block',
                    width: '80px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  on: {
                    click: () => {
                      let id = params.row.resource_id//c0967990-5a38-11e7-8a35-fa163e9474c9
                      this.$router.push({name: 'user_resourceApplication',query: {id: id}})
                    }
                  }

                }
              )
            }
          },
          {
            title: '申请人',
            key: 'applyPerson'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: '部署实例',
            key: 'instance_name'
          },
          {
            title: '资源池',
            key: 'az'
          },
          {
            title: '申请日期',
            key: 'created_date'
          },
          {
            title: '操作',
            key: 'operate',
            render: (h,params) => {
//              console.log(params.row)
              return h('Button',{
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled:  params.row.status == '审批完成'?false:true
                },
                on: {
                  click: this.goMyResource
                }
              },'创建资源')
            }
          }
        ],
        queryResult: [
//          {
//            number: 1,
//            resource_id: 'id001',
//            status: '审批完成',
//            instance_name: '实例1',
//            az: 'DMZ',
//            created_date: '12',
//            applyPerson: 'admin'
//
//          }
        ]

      }
    },
    methods: {

      goMyResource () {
        this.$router.push({name: 'user_myResource'})
      },
      getInstance () {//获取实例
        const url = 'api/deploy_instance/deploy_instances'

        let params = {
          user_id:'0753bf1a-5736-11e7-929a-fa163e9474c9'
        }

        this.$http.get(url,{params:params}).then((res) => {
//          console.log('实例',res.body)
          this.instance = res.body.result.res

        },(err) => {
          console.log(err)
        })
      },
      changePage (page) {

        this.queryResult = this.mockTableData(this.getResult,this.page_size,page)

        this.current_page = page
      },
      query () {
        this.current_page = 1

        const start_time = this.query_info.created_date[0]
        const end_time = this.query_info.created_date[1]

        let requestBody = {}

        requestBody.user_id = this.user_info.id
        start_time && (requestBody.start_time = this.timeFormat(start_time))
        end_time && (requestBody.end_time = this.timeFormat(end_time))
        this.query_info.status && (requestBody.status = this.query_info.status)
        this.query_info.instance_id && (requestBody.instance_id = this.query_info.instance_id)

        this.getUserResource(requestBody)

      },
      reset () {
        this.query_info = {
          user_name: '',
          created_date: [],
          status: '',
          instance_id: ''

        }

      },
      getUser () {

        Object.assign(this.user_info,this.$store.state.userData.userInfo)

      },
      getUserResource (query) {
        this.getResult = []

        this.queryResult = []
        const url = 'api/mpc_resource/mpc_resources'


        this.$http.get(url,{params: query}).then((res) => {

          this.data_length = res.body.result.res.length

          console.log('查询资源',res.body.result.res)

          res.body.result.res.forEach((item,index) => {

            switch (item.status) {
              case 'submit': item.status = '行政审批中'
                break
              case 'l_success': item.status = '技术审批中'
                break
              case 'l_fail': item.status = '行政审批不通过'
                break
              case 'a_success': item.status = '审批完成'
                break
              case 'a_fail': item.status = '技术审批不通过'
                break
            }

            this.getResult.push({
              number: index +1,
              resource_id: item.resource_id,
              status: item.status,
              instance_name: item.deploy_name,
              az: item.az_name,
              created_date: item.created_date.slice(0,16),
              applyPerson: item.user_name

            })


          })
//          console.log(this.getResult)
          console.log(this.page_size,this.current_page)

          this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page)
//          console.log(this.queryResult)


        },(err) => {
          console.log(err)
        })

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
      page_size_change (size) {
        this.page_size = size

        this.current_page = 1

        this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page)

      },
      mockTableData (originData, pageSize, index) {//进行分页

        let data = [];

        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > originData.length ? originData.length : (num + pageSize)

        data = originData.slice(num,maxNum)
//        console.log(num,maxNum)

        return data;
      }
    },
    created () {
      this.getInstance()//获取实例
      this.getUser()//获取用户信息
      //获取用户的所有申请资源
      const id = this.user_info.id
      const  query = {user_id:id}
      this.getUserResource(query)

    }

  }

</script>
<style scoped>
  .resouce-query {
    width: 100%;
  }
  .queryInformation{
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .query-form {
    width: 100%;
    border-bottom: 2px solid #EAEDF1;
    padding-bottom: 20px;
    padding-right: 15px;
  }
  .item {
    margin-bottom: 10px;
  }
  .date-picker {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .title {
    display: inline-block;
    width: 70px;
    margin-right: 10px;
    text-align: center;
  }
  .query {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 26px;
    box-sizing: border-box;
    margin-top: 20px;
  }
  .page {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .pre {
    margin-right: 20px;
  }
  .ghost {
    margin-left: 20px;
  }


</style>
