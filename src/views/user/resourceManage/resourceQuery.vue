<template>
  <div class="resouce-query">
    <div class="query-form">
      <div class="queryInformation">
        <div class="item">
          <span class="title">申请人</span>
          <Input v-model="query_info.user_name" placeholder="请输入..." style="width: 200px"></Input>
        </div>
        <div class="item date-picker">
          <span class="title">申请日期</span>
          <Date-picker type="daterange" v-model="query_info.applyDate" placeholder="选择日期" style="width: 200px"></Date-picker>
        </div>
        <div class="item">
          <span class="title">审批状态</span>
          <Select v-model="query_info.status" style="width:200px">
            <Option v-for="item in approvalStatusVal" :value="item.value" :key="item">{{ item.value }}</Option>
          </Select>
        </div>
        <div class="item">
          <span class="title">部署实例</span>
          <Select v-model="query_info.instance_id" style="width:200px">
            <Option v-for="item in instance_name" :value="item.value" :key="item">{{ item.value }}</Option>
          </Select>
        </div>
      </div>
      <div class="query">
        <Button type="primary" @click="query">查询</Button>
        <Button type="ghost" class="ghost" @click="reset">重置</Button>

      </div>
    </div>
    <div class="header">申请资源列表：</div>
    <Table border :columns="columns" :data="queryResult"></Table>
    <div class="page">
      <Page :total="100" @on-change="changePage"></Page>
    </div>

  </div>


</template>
<script>
  export default {
    data () {
      return {
        approvalStatusVal: [
          {
            value: '待审批',
          },
          {
            value: '审批未通过'
          },
          {
            value: '审批完成'
          }
        ],
        instance_name: [
          {
            value: '实例1'
          },
          {
            value: '实例2'
          }
        ],
        query_info: {
          user_name: '',
          applyDate: [],
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
                    click: this.returnResourceApplication
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
            key: 'applyDate'
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
//            status: '审批中',
//            instance_name: '实例1',
//            az: 'DMZ',
//            applyDate: '12',
//            operate: ''
//          }
        ]

      }
    },
    methods: {
      returnResourceApplication (event) {

        let id = event.target.firstChild.data
        this.$router.push({name: 'user_resourceApplication',query: {id: id}})
      },
      goMyResource () {
        this.$router.push({name: 'user_myResource'})
      },
      changePage (page) {
        console.log(page)
      },
      query () {

      },
      reset () {
        this.query_info = {
          user_name: '',
          applyDate: [],
          status: '',
          instance_id: ''

        }

      }
    },
    created () {
      //测试假数据
      let getData = this.$store.state.userData.information

      let requestBody = {
        number: 1,
        resource_id: 'ID0001',
        status: getData[0].status,
        instance_name: getData[0].resourceInformation[0].instance_name,
        az: '资源池1',
        applyDate: getData[0].applyDate,
        operate: '',
        applyPerson: 'user'

      }
      //根据用户id查找资源
//      const url = '/api/resource/resources?user_id=id'
//      this.$http.get(url).then((res) => {
//        console.log(res)
//      },(err) => {
//        console.log(err)
//      })


        this.queryResult.push(requestBody)

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
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .query-form {
    width: 100%;
    border-bottom: 2px solid #EAEDF1;
    padding-bottom: 10px;
    padding-right: 15px;
    /*background-image: linear-gradient(to bottom,#fff,#e4e4e4);*/
    /*border-radius: 10px;*/
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
    width: 60px;
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
  .header {
    margin: 30px 0 10px;
  }
  .ghost {
    margin-left: 20px;
  }


</style>
