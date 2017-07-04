<template>
  <div class="my-resource">
    <div class="query-form inquire-form">
      <div class="queryInformation">
        <div class="item date-picker">
          <span class="title">申请日期:</span>
          <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" v-model="query_info.applyDate" placeholder="选择日期" style="width: 260px"></Date-picker>
        </div>
        <div class="item">
          <span class="title">用户名:</span>
          <Input v-model="query_info.user_name" placeholder="请输入" style="width: 260px"></Input>
        </div>

      </div>
      <div class="query">
        <Button type="primary" @click="query">查询</Button>
        <Button class="reset" type="ghost" @click="reset">重置</Button>
      </div>
    </div>
    <div class="inquire-table-title">用户列表</div>
    <div class="createUser">
      <Button @click="create" type="primary" >创 建</Button>
      <Modal
          v-model="isCreate"
          title="用户信息"
          width="360"
          @on-ok="createOk('formInline')"
          @on-cancel="createCancel('formInline')"
          :mask-closable="false"
      >
        <div class="createWrap">

          <Form ref="formInline" :model="createUser" :rules="ruleInline" label-position="right" :label-width="80" >
            <Form-item label="用户名：" prop="username">
              <Input v-model="createUser.username" placeholder="请输入" style="width: 200px"></Input>
            </Form-item>
            <Form-item label="密码：" prop="password">
              <Input v-model="createUser.password" placeholder="最少6位最多15位" type="password" style="width: 200px"></Input>
            </Form-item>
            <Form-item label="部门：" prop="department">
              <Input v-model="createUser.department" placeholder="请输入" style="width: 200px"></Input>
            </Form-item>
            <Form-item label="手机：" prop="phone">
              <Input v-model="createUser.phone" placeholder="请输入" style="width: 200px"></Input>
            </Form-item>
            <Form-item label="邮箱：" prop="email">
              <Input v-model="createUser.email" placeholder="请输入" style="width: 200px"></Input>
            </Form-item>
            <Form-item label="角色：" prop="role">
              <Select v-model="createUser.role" style="width:196px">
                <Option v-for="item in roleList" :value="item.key" :key="item">{{ item.value }}</Option>
              </Select>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="text" @click="createCancel('formInline')">取消</Button>
          <Button type="primary" size="large" @click="createOk('formInline')" >确定</Button>
        </div>
      </Modal>
    </div>
    <Table stripe :columns="columns" :data="queryResult"></Table>
    <Modal
        v-model="isCompile"
        title="用户信息"
        width="360"
        @on-ok="compileOk('formCompile')"
        @on-cancel="compileCancel('formCompile')"
        :mask-closable="false"
    >
      <div class="createWrap">

        <Form ref="formCompile" :model="compileUser" :rules="ruleCompile" label-position="right" :label-width="80" >
          <Form-item label="用户名：" prop="username">
            <Input v-model="compileUser.username" placeholder="请输入" style="width: 200px"></Input>
          </Form-item>
          <Form-item label="密码：" prop="password">
            <Input v-model="compileUser.password" placeholder="最少6位最多15位" type="password" style="width: 200px"></Input>
          </Form-item>
          <Form-item label="部门：" prop="department">
            <Input v-model="compileUser.department" placeholder="请输入" style="width: 200px"></Input>
          </Form-item>
          <Form-item label="手机：" prop="phone">
            <Input v-model="compileUser.phone" placeholder="请输入" style="width: 200px"></Input>
          </Form-item>
          <Form-item label="邮箱：" prop="email">
            <Input v-model="compileUser.email" placeholder="请输入" style="width: 200px"></Input>
          </Form-item>
          <Form-item label="角色：" prop="role">
            <Select v-model="compileUser.role" style="width:196px">
              <Option v-for="item in roleList" :value="item.key" :key="item">{{ item.value }}</Option>
            </Select>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" @click="compileCancel('formCompile')">取消</Button>
        <Button type="primary" size="large" @click="compileOk('formCompile')" >确定</Button>
      </div>
    </Modal>
    <div class="page">
      <Page :total="data_length" show-sizer @on-change="changePage" @on-page-size-change="page_size_change" :current="current_page"></Page>
    </div>

  </div>

</template>
<script>

  //引入sha256加密
    import crypto from 'crypto-js'
    import sha256 from 'crypto-js/sha256'
  export default {
    data () {
      const validatePhone = (rule,value,callback) => {
        if (!value) {
          callback()

        } else {

          if(!/^[0-9]{11}$/.test(value)) {
            callback(new Error('请输入11位电话号'))
          } else {
            callback()
          }
        }


      }
      return {
        data_length: 0,
        current_page: 1,
        page_size: 10,
        getResult: [],//获取的全部数据
        query_info: {
          user_name: '',
          applyDate: []
        },
        isCreate: false,
        isCompile: false,
        index: '',
        user_id: '',
        createUser: {
          username: '',
          password: '',
          department: '',
          phone: '',
          email: '',
          role: ''
        },
        ruleInline: {
          username: [
            {required: true,message: '请填写用户名',trigger: 'blur'}
          ],
          password: [
            {required: true, min: 6, max: 15, message: '请输入6到15位密码',trigger: 'blur'}
          ],
          department: [
            {required: true, message: '请填写部门', trigger: 'blur'}
          ],
          phone: [
            {validator: validatePhone,trigger:'blur'}
          ],
          email: [
            {type: 'email',message: '邮箱格式不正确',tirgger: 'blur'}
          ],
          role: [
            {required: true,message: '请选择角色',trigger: 'blur'}
          ]

        },
        ruleCompile: {
          username: [
            {required: true,message: '请填写用户名',trigger: 'blur'}
          ],
          password: [
            { min: 6, max: 15, message: '请输入6到15位密码',trigger: 'blur'}
          ],
          department: [
            {required: true, message: '请填写部门', trigger: 'blur'}
          ],
          phone: [
            {validator: validatePhone,trigger:'blur'}
          ],
          email: [
            {type: 'email',message: '邮箱格式不正确',tirgger: 'blur'}
          ],
          role: [
            {required: true,message: '请选择角色',trigger: 'blur'}
          ]
        },
        compileUser: {},
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
            key: 'number',
            align: 'center',
            width: 60
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
            width: 130,
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
                      let rowDate = {}
                      for(var key in params.row) {
                        rowDate[key] = params.row[key]
                      }
                      switch (rowDate.role) {
                        case '管理员': rowDate.role = 'admin'
                          break
                        case '行政审批': rowDate.role = 'leader'
                          break
                        case '普通用户': rowDate.role = 'user'
                          break
                      }
                      console.log('row',rowDate)

                      Object.assign(this.compileUser,rowDate)

//                      for(var key in rowDate) {
//                        this.compileUser[key] = rowDate[key]
//                      }

                      console.log('编辑',this.compileUser)

                      this.index = params.index
                      this.user_id = params.row.id
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

                            const url = 'api/user/users/' + params.row.id
                            this.$http.delete(url).then( (res) => {
                              console.log('删除用户',res.body)
                              //重新获取用户
                              this.getUser()
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
      getUser () {//获取用户

        const url = 'api/user/users'
        this.$http.get(url).then((res) => {

          this.data_length = res.body.result.res.length

          this.current_page = 1

          res.body.result.res.forEach((item,index) => {
            item.number = index + 1

            switch (item.role) {
              case 'admin': item.role = '管理员'
                break
              case 'leader': item.role = '行政审批'
                break
              case 'user': item.role = '普通用户'
                break
            }

          })
          this.getResult = res.body.result.res

//          将返回的数据进行分页
          this.queryResult = this.mockTableData(this.getResult,this.page_size,1)

        },(err) => {

        })
      },
      create () {
        this.isCreate = true

      },
      compileOk (name) {//确定编辑
        //TODO:表单的坑
        let temporary = {}

        Object.assign(temporary,this.compileUser)

        this.$refs[name].validate((valid) => {
          if(valid) {
//            this.compileUser = temporary
            console.log('验证成功')
            console.log('temporary',temporary)

            console.log('表单信息',this.compileUser)
            console.log('request',requestBody)
            console.log(this.user_id)

            const url = 'api/user/users/'+this.user_id


            let requestBody = {}


            //判断密码是否修改
            if(temporary.password){

              for(var key in temporary) {

                requestBody[key] = temporary[key]
              }

              requestBody.password = sha256(requestBody.password + '!@#$%^').toString(crypto.enc.Hex)


            }else{
              requestBody = {
                username: temporary.username,
                department: temporary.department,
                phone: temporary.phone,
                email: temporary.email,
                role: temporary.role
              }
            }

            console.log('请求',requestBody)

            this.$http.put(url,requestBody).then((res) => {
              console.log(res.body)

              this.$Message.info('编辑用户成功');

              this.current_page = 1
//        修改成功之后改变列表数据
              for(var key in temporary) {
                this.queryResult[this.index][key] = temporary[key]

                if(key == 'role') {

                  switch (this.queryResult[this.index].role) {
                    case 'admin': this.queryResult[this.index].role = '管理员'
                      break
                    case 'leader': this.queryResult[this.index].role = '行政审批'
                      break
                    case 'user': this.queryResult[this.index].role = '普通用户'
                      break
                  }
                }

              }

            },(err) => {

              this.$Message.info('编辑用户失败');

              console.log('err',err)
            })

            this.isCompile = false

            //重置
            this.$refs[name].resetFields()
//
          } else {

            this.$Message.info('验证用户失败');

            console.log('验证失败')

          }
        })


      },
      compileCancel (name) {//取消编辑
        this.isCompile = false
        //重置
        this.$refs[name].resetFields()

      },
      createOk (name) {//确定创建用户

        this.$refs[name].validate((valid) => {
          if(valid) {
            console.log('验证成功')

            //            发送请求
            const url = 'api/user/users'

            let requestBody =  {}

            this.createUser.department && (requestBody.department = this.createUser.department)
            this.createUser.phone && (requestBody.phone = this.createUser.phone)
            this.createUser.email && (requestBody.email = this.createUser.email)
            requestBody.username = this.createUser.username
            requestBody.password = this.createUser.password
            requestBody.role = this.createUser.role

            requestBody.password = sha256(this.createUser.password + '!@#$%^').toString(crypto.enc.Hex)

            this.$http.post(url,requestBody).then((res) => {

              this.isCreate = false//关闭modal
              this.$Message.info('创建用户成功');
              console.log(res.body.result)
              //重新获取用户
              this.getUser()

            },(err) => {
              console.log(err)

              this.$Message.info('创建用户失败');
              this.isCreate = false//关闭modal

            })
            //重置
            this.$refs[name].resetFields()

          } else {
            console.log('验证失败')

            this.$Message.info('验证用户失败');

          }
        })

      },
      createCancel (name) {//创建用户取消
        this.isCreate = false

        //重置
        this.$refs[name].resetFields()


      },
      query () {//查询

        let user_name = this.query_info.user_name

        let start_time = this.query_info.applyDate[0]

        let end_time = this.query_info.applyDate[1]

        this.current_page = 1

        let params = {}

        user_name && (params.username = user_name)
        start_time && (params.start_time = this.timeFormat(start_time))
        end_time && (params.end_time = this.timeFormat(end_time))

        let url = 'api/user/users'

        this.$http.get(url,{params: params}).then((res) => {

          this.data_length = res.body.result.res.length

          res.body.result.res.forEach((item,index) => {
            item.number = index +1

            switch (item.role) {
              case 'admin': item.role = '管理员'
                break
              case 'leader': item.role = '行政审批'
                break
              case 'user': item.role = '普通用户'
                break
            }

          })
          this.getResult = res.body.result.res
          //进行分页
          this.queryResult = this.mockTableData(this.getResult,this.page_size,1)
        },(err) => {

          console.log(err)

          this.$Notice.open({
            title: '查询失败'
          });

          this.queryResult = []
        })



      },
      reset () {//重置

        this.query_info = {
          user_name: '',
          applyDate: []
        }
      },
      changePage (page) {//分页

        this.queryResult = this.mockTableData(this.getResult, this.page_size, page)
        this.current_page = page

      },
      mockTableData (originData, pageSize, index) {//进行分页

        let data = [];

        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > originData.length ? originData.length : (num + pageSize)

        data = originData.slice(num,maxNum)

        data.forEach((item,index) => {
          item.created_time = item.created_time.slice(0,19)
        })

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
      page_size_change (page_size) {

        this.page_size = page_size

        this.queryResult = this.mockTableData(this.getResult,this.page_size,1)

      }
    },
    created () {
      //获取用户
      this.getUser()

    }
  }

</script>
<style scoped>
  .my-resource {
    width: 100%;
  }
  .ivu-form-item {
    margin-bottom: 24px;
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
    margin: 10px 30px;
    margin-right: 30px;
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
    margin-bottom: 20px;
  }




</style>
