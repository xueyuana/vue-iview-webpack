<template>
  <div class="resouce-query">
    <div class="query-form">
      <div class="queryInformation">
        <div class="item">
          <span class="title">申请人</span>
          <Input v-model="value" placeholder="请输入..." style="width: 200px"></Input>
        </div>
        <div class="item date-picker">
          <span class="title">申请日期</span>
          <Date-picker type="daterange"  placeholder="选择日期" style="width: 200px"></Date-picker>
        </div>
        <div class="item">
          <span class="title">审批状态</span>
          <Select v-model="model1" style="width:200px">
            <Option v-for="item in approvalStatusVal" :value="item.value" :key="item">{{ item.value }}</Option>
          </Select>
        </div>
        <div class="item">
          <span class="title">部署实例</span>
          <Select v-model="model1" style="width:200px">
            <Option v-for="item in deployExample" :value="item.value" :key="item">{{ item.value }}</Option>
          </Select>
        </div>
      </div>
      <div class="query">
        <Button>查询</Button>

      </div>
    </div>
    <div class="header">申请资源列表：</div>
    <Table border :columns="columns1" :data="queryResult"></Table>
    <div class="page">
      <Button class="pre">上一页</Button>
      <Button>下一页</Button>
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
        deployExample: [
          {
            value: '实例1'
          },
          {
            value: '实例2'
          }
        ],
        value: '',
        model1: '',
        buttonStatus: true,
        columns1: [
          {
            title: '序号',
            key: 'number'
          },
          {
            title: '申请单号',
            key: 'id',
            render: (h,params) => {
              return h('a',
                {
                  domProps: {
                    innerHTML: params.row.id
                  },
                  on: {
                    click: this.reeturnResource
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
            key: 'deployExample'
          },
          {
            title: '资源池',
            key: 'resourcePool'
          },
          {
            title: '申请日期',
            key: 'applyDate'
          },
          {
            title: '操作',
            key: 'operate',
            render: (h,params) => {
              console.log(params.row)
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
//            id: 'id001',
//            status: '审批中',
//            deployExample: '实例1',
//            resourcePool: 'DMZ',
//            applyDate: '12',
//            operate: ''
//          }
        ]

      }
    },
    methods: {
      reeturnResource (event) {

        let id = event.target.firstChild.data
        this.$router.push({name: 'user_resourceApplication',query: {id: id}})
      },
      goMyResource () {
//        console.log('clickbutton')
        this.$router.push({name: 'user_myResource'})
      },
      changeStatus (id) {
        this.$store.state.userData.approvalStatus.forEach( (item, index) => {
          if(item.id == id){
            console.log(item)
            if(item.status == '审批完成'){
              return false
            }
            return 11

          }
          return 12
        })
      }
    },
    created () {
      let getData = this.$store.state.userData.information
//      console.log(getData)
      getData.forEach( (item,index) => {
        let obj = {
            number: index + 1,
            id: item.id,
            status: item.status,
            deployExample: item.resourceInformation[0].deployExample,
            resourcePool: item.resourceInformation[0].resourcePool,
            applyDate: item.applyDate,
            operate: ''
        }

        this.queryResult.push(obj)

      })
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
    height: 100px;
    border: 1px solid #e4e4e4;
    background-image: linear-gradient(to bottom,#fff,#e4e4e4);
    border-radius: 10px;
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
    margin-top: 10px;
  }
  .pre {
    margin-right: 20px;
  }
  .header {
    margin: 30px 0 10px;
  }


</style>
