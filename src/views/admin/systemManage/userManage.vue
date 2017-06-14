<template>
  <div class="my-resource">
    <div class="query-form">
      <div class="queryInformation">
        <div class="item">
          <span class="title">用户名</span>
          <Input v-model="value" placeholder="请输入..." style="width: 300px"></Input>
        </div>
        <div class="item date-picker">
          <span class="title">申请日期</span>
          <Date-picker type="daterange"  placeholder="选择日期" style="width: 300px"></Date-picker>
        </div>
      </div>
      <div class="query">
        <Button >查询</Button>
        <Button class="reset">重置</Button>
      </div>
    </div>
    <div class="createUser">
      <Button @click="isCreate = true">创 建</Button>
      <Modal
          v-model="isCreate"
          title="用户信息"
          width="300"
          @on-ok="ok"
          @on-cancel="cancel">
        <div class="createWrap">
          <span class="modal-title">用户名：</span><Input v-model="value" placeholder="请输入..." style="width: 200px"></Input>
          <span class="modal-title">密码：</span><Input v-model="value" placeholder="请输入..." style="width: 200px"></Input>
          <span class="modal-title">部门：</span><Input v-model="value" placeholder="请输入..." style="width: 200px"></Input>
          <span class="modal-title">手机：</span><Input v-model="value" placeholder="请输入..." style="width: 200px"></Input>
          <span class="modal-title">邮箱：</span><Input v-model="value" placeholder="请输入..." style="width: 200px"></Input>
          <span class="modal-title">角色:</span>
          <Select v-model="role" style="width:196px">
            <Option v-for="item in roleList" :value="item.value" :key="item">{{ item.value }}</Option>
          </Select>
        </div>

      </Modal>

    </div>
    <div class="header">资源列表：</div>
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
        status: [
          {
            value: '运行',
          },
          {
            value: '关机'
          },
          {
            value: '异常'
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
        resourcePool: [
          {
            value: '资源池1',
          },
          {
            value: '资源池2'
          }
        ],
        approvalStatus: [
          {
            value: 'VNC'
          },
          {
            value: '启动'
          },
          {
            value: '重启'
          },
          {
            value: '关机'
          },
          {
            value: '删除'
          }
        ],
        roleList: [
          {
            value: '普通用户'
          },
          {
            value: '管理员'
          },
          {
            value: '行政审批'
          }
        ],
        isCreate: false,
        role: '',
        value: '',
        columns1: [
          {
            title: '序号',
            key: 'number'
          },
          {
            title: '用户名',
            key: 'userName'
          },
          {
            title: '手机',
            key: 'phone'
          },
          {
            title: '邮箱',
            key: 'email'
          },
          {
            title: '角色',
            key: 'role'
          },
          {
            title: '部门',
            key: 'department'
          },
          {
            title: '创建日期',
            key: 'createDate'
          },
          {
            title: '操作',
            key: 'operate',
            render: (h,params) => {
              return h('div',[
                h('Button',{
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: this.compile
                  }
                },'编辑'),
                  h('Button',{
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: this.delete
                    }
                  },'删除')
                ])

            }
          }
        ],
        queryResult: [
          {
            number: 1,
            userName: '用户1',
            phone: '188',
            email: '@xx.com',
            role: '用户',
            department: '部门1',
            createDate: '2017',
            operate: ''
          }
        ]

      }
    },
    methods: {
      compile () {
        console.log('compile')
      },
      delete () {
        console.log('delete')
      },
      ok () {
        console.log('ok')

      },
      cancel () {
        console.log('cancel')

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
  .item {
    margin: 10px 30px;
    margin-right: 50px;
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
    margin-top: 10px;
  }
  .pre {
    margin-right: 20px;
  }
  .header {
    margin: 12px 0 10px;
  }
  .modal-title {
    display: inline-block;
    width: 60px;
    text-align: center;

  }
  .createUser {
    margin-top: 30px;
  }
  .createWrap {
    height: 240px;
    display: flex;
    flex-wrap: wrap;
  }


</style>
