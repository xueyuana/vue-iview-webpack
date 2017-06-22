<template>
  <div class="resouce-query">
    <div class="query-form">
      <div class="queryInformation">
        <div class="item date-picker">
          <span class="title">申请日期</span>
          <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" v-model="query_info.created_date" placeholder="选择日期" style="width: 260px"></Date-picker>
        </div>
        <div class="item">
          <span class="title">审批状态</span>
          <Select v-model="query_info.status" style="width:260px">
            <Option v-for="item in approvalStatusVal" :value="item.key" :key="item">{{ item.value }}</Option>
          </Select>
        </div>
        <div class="item">
          <span class="title">部署实例</span>
          <Select v-model="query_info.instance_id" style="width:260px">
            <Option v-for="item in instance" :value="item.id" :key="item">{{ item.value }}</Option>
          </Select>
        </div>
      </div>
      <div class="query">
        <Button type="primary" @click="query">查询</Button>
        <Button type="ghost" class="ghost" @click="reset">重置</Button>

      </div>
    </div>
    <div class="inquire-table-title">申请资源列表：</div>
    <Table border stripe :columns="columns" :data="queryResult"></Table>
    <div class="page">
      <Page :total="data_length" show-sizer @on-change="changePage" @on-page-size-change="page_size_change" :current="current_page"></Page>
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
        approvalStatusVal: [
          {
            value: '待审批',
            key: 'summit'
          },
          {
            value: '审批未通过',
            key: 'reject'
          },
          {
            value: '审批完成',
            key: 'complete'
          }
        ],
        instance: [
          {
            value: '实例1',
            id: '001'
          },
          {
            value: '实例2',
            id: '002'
          }
        ],
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
                  on: {
                    click: () => {
                      let id = params.row.resource_id
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
      changePage (page) {

        this.queryResult = this.mockTableData(this.getResult,this.page_size,page)

        this.current_page = page
      },
      query () {

        const start_time = this.query_info.created_date[0]
        const end_time = this.query_info.created_date[1]

        let requestBody = {}
        requestBody.user_id = '0696050e-571a-11e7-a83a-fa163e9474c9'
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
      getUserResource (query) {

        this.queryResult = []
        const url = 'api/mpc_resource/mpc_resources'


        this.$http.get(url,{params: query}).then((res) => {

          this.page_size = res.body.result.res.length

          res.body.result.res.forEach((item,index) => {

            switch (item.status) {
              case 'summit': item.status = '审批中'
                break
            }

            this.getResult.push({
              number: index +1,
              resource_id: item.resource_id,
              status: item.status,
              instance_name: '实例1',
              az: '资源池1',
              created_date: item.created_date.slice(0,16),
              applyPerson: item.user_name

            })
          })
          console.log(this.getResult)

          this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page)



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

      },
      mockTableData (originData, pageSize, index) {//进行分页

        let data = [];

        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > originData.length ? originData.length : (num + pageSize)

        data = originData.slice(num,maxNum)

        return data;
      }
    },
    created () {
      //获取用户的所有申请资源
      const id = '0696050e-571a-11e7-a83a-fa163e9474c9'
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
