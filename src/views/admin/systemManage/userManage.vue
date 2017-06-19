<template>
  <div class="my-resource">
    <div class="query-form">
      <div class="queryInformation">
        <div class="item">
          <span class="title">用户名</span>
          <Input v-model="query_info.user_name" placeholder="请输入..." style="width: 300px"></Input>
        </div>
        <div class="item date-picker">
          <span class="title">申请日期</span>
          <Date-picker type="daterange" v-model="query_info.applyDate" placeholder="选择日期" style="width: 300px"></Date-picker>
        </div>
      </div>
      <div class="query">
        <Button type="primary" @click="query">查询</Button>
        <Button class="reset" type="ghost" @click="reset">重置</Button>
      </div>
    </div>
    <div class="createUser">
      <Button @click="isCreate = true" type="primary" >创 建</Button>
      <Modal
          v-model="isCreate"
          title="用户信息"
          width="300"
          @on-ok="createOk"
          @on-cancel="createCancel">
        <div class="createWrap">
          <span class="modal-title">用户名：</span><Input v-model="createUser.username" placeholder="请输入..." style="width: 200px"></Input>
          <span class="modal-title">密码：</span><Input v-model="createUser.password" placeholder="请输入..." style="width: 200px"></Input>
          <span class="modal-title">部门：</span><Input v-model="createUser.department" placeholder="请输入..." style="width: 200px"></Input>
          <span class="modal-title">手机：</span><Input v-model="createUser.phone" placeholder="请输入..." style="width: 200px"></Input>
          <span class="modal-title">邮箱：</span><Input v-model="createUser.email" placeholder="请输入..." style="width: 200px"></Input>
          <span class="modal-title">角色:</span>
          <Select v-model="createUser.role" style="width:196px">
            <Option v-for="item in roleList" :value="item.key" :key="item">{{ item.value }}</Option>
          </Select>
        </div>
      </Modal>

    </div>
    <div class="header">资源列表：</div>
    <Table border :columns="columns" :data="queryResult"></Table>
    <Modal
        v-model="isCompile"
        title="用户信息"
        width="300"
        @on-ok="compileOk"
        @on-cancel="compileCancel">
      <div class="createWrap">
        <span class="modal-title">用户名：</span><Input v-model="compileUser.username" placeholder="请输入..." style="width: 200px"></Input>
        <span class="modal-title">密码：</span><Input v-model="compileUser.password" placeholder="请输入..." style="width: 200px"></Input>
        <span class="modal-title">部门：</span><Input v-model="compileUser.department" placeholder="请输入..." style="width: 200px"></Input>
        <span class="modal-title">手机：</span><Input v-model="compileUser.phone" placeholder="请输入..." style="width: 200px"></Input>
        <span class="modal-title">邮箱：</span><Input v-model="compileUser.email" placeholder="请输入..." style="width: 200px"></Input>
        <span class="modal-title">角色:</span>
        <Select v-model="compileUser.role" style="width:196px">
          <Option v-for="item in roleList" :value="item.key" :key="item">{{ item.value }}</Option>
        </Select>
      </div>
    </Modal>
    <div class="page">
      <Page :total="100" @on-change="changePage"></Page>
    </div>

  </div>


</template>
<script>
  export default {
    data () {
      return {
        url: 'http://mpc-test.syswin.com',
        query_info: {
          user_name: '',
          applyDate: []
        },
        isCreate: false,
        isCompile: false,
        index: '',
        createUser: {
          username: '',
          password: '',
          department: '',
          phone: '',
          email: '',
          role: ''
        },
        compileUser: {
          username: '',
          password: '',
          department: '',
          phone: '',
          email: '',
          role: ''
        },
        roleList: [
          {
            value: '普通用户',
            key: 'user'
          },
          {
            value: '管理员',
            key: 'admin'
          },
          {
            value: '行政审批',
            key: 'leader'
          }
        ],
        columns: [
          {
            title: '序号',
            key: 'number'
          },
          {
            title: '用户名',
            key: 'username'
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
            key: 'created_time'
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
                    click: () => {
                      this.isCompile = true
                      for(var key in params.row) {
                        this.compileUser[key] = params.row[key]
                      }
                      this.index = params.index
                    }
                  }
                },'编辑'),
                  h('Button',{
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '确认',
                          content: '<p>确认删除吗？</p>',
                          onOk: () => {

//                            this.queryResult.splice(params.index,1)
                            const url = this.url + '/api/user/users/' + params.row.id
                            this.$http.delete(url).then( (res) => {
                              console.log('删除用户',res.body)
                            },(err) => {
                              console.log('err',err)
                            })

                          },
                          onCancel: () => {
                            console.log('取消')
                          }
                        })
                      }
                    }
                  },'删除')
                ])

            }
          }
        ],
        queryResult: [
//          {
//            number: 1,
//            username: '用户1',
//            phone: '188',
//            email: '@xx.com',
//            role: '用户',
//            department: '部门1',
//            created_time: '2017'
//          }
        ]

      }
    },
    methods: {
      compileOk () {//编辑后确定
       for(var key in this.compileUser) {
         this.queryResult[this.index][key] = this.compileUser[key]
       }

        console.log('result',this.queryResult)

      },
      compileCancel () {//取消编辑

      },
      createOk () {//确定创建用户

        const url = 'http://mpc-test.syswin.com/api/user/users'
        let requestBody = this.createUser
        this.$http.post(url,requestBody).then((res) => {
          console.log(res.body.result)
        },(err) => {
          console.log(err)
        })
        //配合假数据
//        let date = new Date();
//        let Y = date.getFullYear();
//        let M = date.getMonth()+1;
//        let D = date.getDate()
//        let h = date.getHours()
//        let m = date.getMinutes()
//        h = h<10? '0'+h:h
//        m = m<10? '0'+m:m
//        let applyDate = Y + '-'+ M +'-'+D +' '+ h +':'+ m
//        //创建的新用户
//        let newUser = this.createUser
//        newUser.createDate = applyDate
//        newUser.number = 2
//        this.queryResult.push(newUser)
        //清空创建内容
        this.createUser = {
          userName: '',
          passWord: '',
          department: '',
          phone: '',
          email: '',
          role: ''
        }

      },
      createCancel () {//创建用户取消
        //清空
        this.createUser = {
          userName: '',
          passWord: '',
          department: '',
          phone: '',
          email: '',
          role: ''
        }

      },
      query () {

      },
      reset () {
        this.query_info = {
          user_name: '',
          applyDate: []
        }
      },
      changePage () {

      }
    },
    created () {
      //获取用户
      const url = this.url + '/api/user/users'
      this.$http.get(url).then((res) => {
//        console.log('用户信息',res.body)
        res.body.result.res.forEach((item,index) => {
          item.number = index + 1
          this.queryResult.push(item)
        })

      },(err) => {
//        console.log('err',err)
      })



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
    margin-top: 20px;
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
