<template>
  <div class="resouce-query">
    <div class="query-form">
      <Form :model="query_info" :label-width="80">
        <div class="queryInformation">
          <Form-item label="审批状态:">
            <Select v-model="query_info.status" clearable style="width:260px">
              <Option v-for="item in approvalStatusVal" :value="item.key" :key="item">{{ item.value }}</Option>
            </Select>
          </Form-item>
          <Form-item label="部署实例:">
            <Select v-model="query_info.instance_id" clearable style="width:260px">
              <Option v-for="item in instance" :value="item.instance_id" :key="item">{{ item.instance_name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="申请日期:">
            <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" v-model="query_info.created_date" placeholder="选择日期" style="width: 260px"></Date-picker>
          </Form-item>

        </div>
      </Form>
      <div class="query">
        <Button type="primary" @click="query">查询</Button>
        <Button type="ghost" class="ghost" @click="reset">重置</Button>

      </div>
    </div>
    <div class="inquire-table-title">申请资源列表</div>
    <div class="table-wrap">
      <Table stripe :columns="columns" :data="queryResult"></Table>
      <div class="page-change">
        <Page :total="data_length" show-sizer @on-change="changePage" @on-page-size-change="page_size_change" :current="current_page" :page-size="page_size"></Page>
      </div>
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
        user_info: {},
        createResourceIndex: 0,
        text: '创建资源',
        fontColor: 'fail',
        approvalStatusVal: [
          {
            value: '直属领导待审批',
            key: 'submit'
          },
          {
            value: '直属领导审批未通过',
            key: 'l_fail'
          },
          {
            value: '经信委技术待审批',
            key: 'l_success'
          },
          {
            value: '经信委技术审批未通过',
            key: 'a_fail'
          },
          {
            value: '审批完成',
            key: 'a_success'
          },
          {
            value: '资源已创建',
            key: 'created_success'
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
            key: 'number',
            align: 'center',
            width: 60,
            fixed: 'left'
          },
          {
            title: '申请单号',
            key: 'resource_id',
            align: 'center',
            width: 110,
            fixed: 'left',
            render: (h,params) => {
              return h('a',
                {
                  domProps: {
                    innerHTML: params.row.resource_id
                  },
                  style: {
                    display: 'inline-block'
                  },
                  on: {
                    click: () => {
                      let id = params.row.resource_id//c0967990-5a38-11e7-8a35-fa163e9474c9
                      this.$router.push({name: '资源申请',query: {id: id}})
                    }
                  }

                }
              )
            }
          },
          {
            title: '申请人',
            key: 'applyPerson',
            align: 'center',
            width: 100,
            ellipsis: true
          },
          {
            title: '部署实例',
            key: 'instance_name',
            align: 'center',
            width: 110,
            ellipsis: true
          },
          {
            title: '部署区域',
            key: 'az',
            align: 'center',
            width: 130,
            ellipsis: true
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            width: 160
          },
          {
            title: '申请日期',
            key: 'created_date',
            align: 'center',
            width: 150
          },
          {
            title: '操作',
            key: 'operate',
            align: 'center',
            width: 90,
            fixed: 'right',
            render: (h,params) => {
//              console.log(params.row)
              return h('Button',{
                props: {
                  type: params.row.status == '资源已创建'?'success':'primary',
                  size: 'small',
                  disabled:  params.row.status == '审批完成' || params.row.status == '资源已创建'?false:true
                },
                on: {
                  click: () => {//创建资源
                    if(params.row.status == '资源已创建') {
                      return
                    }

                    const url_post = 'api/mpc_resource/mpc_resource_creater'

                    let requestBody_post = {
                      resource_id: params.row.resource_id,
                      user_name: this.user_info.username,
                      user_id: this.user_info.id
                    }

                    const url_put = 'api/mpc_resource/mpc_resources'

                    let requestBody_put = {
                      resource_id: params.row.resource_id,
                      status: 'created_success',
                      user_name: this.user_info.username,
                      user_id: this.user_info.id
                    }

                      this.$http.post(url_post,requestBody_post).then((res) => {//成功创建资源
                        if(res.body.code = 200) {

                          this.$http.put(url_put,requestBody_put).then((res) => {//修改状态
                            console.log('状态',res.body)

                            this.$router.push({name: '我的资源'})

                          })

                        }
//
                      },(err) => {
                        this.$Message.info('创建资源失败');
                        console.log(err)
                      })

                  }
                }
              }, params.row.text)
            }
          }
        ],
        queryResult: []

      }
    },
    created () {
      this.getInstance()//获取实例
      this.getUser()//获取用户信息

      //获取用户的所有申请资源

      let query = {user_id:this.user_info.id}

      this.getUserResource(query)

    },
    methods: {

      getInstance () {//获取实例
        const url = 'api/deploy_instance/deploy_instances'

        let params = {
          user_id: this.user_info.id
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

        let query = {user_id:this.user_info.id}

        this.getUserResource(query)


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

//          console.log('查询资源',res.body.result.res)

          res.body.result.res.forEach((item,index) => {


            switch (item.status) {
              case 'submit': item.status = '直属领导待审批'
                break
              case 'l_success': item.status = '经信委技术待审批'
                break
              case 'l_fail': item.status = '直属领导审批未通过'
                break
              case 'a_success': item.status = '审批完成'
                break
              case 'a_fail': item.status = '经信委技术审批未通过'
                break
              case 'created_success': item.status = '资源已创建'
                break
            }

            if(item.status == '直属领导审批未通过' || item.status == '经信委技术审批未通过') {

              this.fontColor = 'fail'
            }else {
              this.fontColor = 'success'
            }

            this.getResult.push({
              number: index +1,
              resource_id: item.resource_id,
              status: item.status,
              instance_name: item.deploy_name,
              az: item.az_name,
              created_date: item.created_date.slice(0,16),
              applyPerson: item.user_name,
              text: item.status == '资源已创建'?'已创建':'创建资源',
              cellClassName: {
                status: this.fontColor
              }

            })

          })

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

        return data;
      }
    },


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
  .query {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 26px;
    box-sizing: border-box;
    margin-top: 20px;
  }

  .pre {
    margin-right: 20px;
  }
  .ghost {
    margin-left: 20px;
  }

  .table-wrap {
    max-width: 925px;
  }


</style>
