<template>
  <div class="resouce-query">
    <div class="query-form">
      <div class="queryInformation">
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
    <div class="inquire-table-title">申请资源列表：</div>
    <Table border stripe :columns="columns" :data="queryResult"></Table>
    <div class="page">
      <Page :total="100" show-sizer @on-change="changePage"></Page>
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
          {
            number: 1,
            resource_id: 'id001',
            status: '审批完成',
            instance_name: '实例1',
            az: 'DMZ',
            applyDate: '12',
            operate: '',
            applyPerson: 'admin'
          }
        ]

      }
    },
    methods: {

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
  .ghost {
    margin-left: 20px;
  }


</style>
