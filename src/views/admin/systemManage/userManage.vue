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
          v-model="isOpenModal"
          title="用户信息"
          width="360"
          :mask-closable="false"
      >
        <div class="createWrap">
          <Form ref="formInline" :model="model_info" :rules="ruleInline" label-position="right" :label-width="80" >
            <Form-item label="用户名：" prop="username">
              <Input v-model="model_info.username" placeholder="请输入" style="width: 200px"></Input>
            </Form-item>
            <Form-item label="密码：" prop="password" :class="{'ivu-form-item-required': info == '创建'?true:false}">
              <Input v-model="model_info.password" placeholder="最少6位最多15位" type="password" style="width: 200px"></Input>
            </Form-item>
            <Form-item label="部门：" prop="department">
              <Input v-model="model_info.department" placeholder="请输入" style="width: 200px"></Input>
            </Form-item>
            <Form-item label="手机：" prop="phone">
              <Input v-model="model_info.phone" placeholder="请输入" style="width: 200px"></Input>
            </Form-item>
            <Form-item label="邮箱：" prop="email">
              <Input v-model="model_info.email" placeholder="请输入" style="width: 200px"></Input>
            </Form-item>
            <Form-item label="角色：" prop="role">
              <Select v-model="model_info.role" style="width:196px">
                <Option v-for="item in roleList" :value="item.key" :key="item">{{ item.value }}</Option>
              </Select>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="text" @click="cancel">取消</Button>
          <Button type="primary" size="large" @click="Ok('formInline')" >确定</Button>
        </div>
      </Modal>
    </div>
    <div class="table-wrap">
      <Table stripe size="small" :columns="columns" :data="queryResult"></Table>
      <div class="page-change">
        <Page :total="data_length" show-sizer @on-change="changePage" @on-page-size-change="page_size_change" :current="current_page"></Page>
      </div>
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

          if(!/^1[34578]\d{9}$/.test(value)) {
            callback(new Error('请输入格式正确的电话'))
          } else {
            callback()
          }
        }


      }
      return {
        data_length: 0,
        current_page: 1,
        page_size: 10,
        index: '',
        info: '',
        user_id: '',
        user_info: {},
        getResult: [],//获取的全部数据
        query_info: {
          user_name: '',
          applyDate: []
        },
        isOpenModal: false,
        model_info: {
          username: '',
          password: '',
          department: '',
          phone: '',
          email: '',
          role: ''
        },

        ruleInline: {
          username: [
            {required: true, max: 100, message: '请填写用户名',trigger: 'change'}
          ],
          password: [
            { min: 6, max: 15, message: '请输入6到15位密码',trigger: 'change'}
          ],
          department: [
            {required: true, max: 100, message: '请填写部门', trigger: 'change'}
          ],
          phone: [
            {validator: validatePhone,trigger:'change'}
          ],
          email: [
            {type: 'email',message: '邮箱格式不正确',tirgger: 'change'}
          ],
          role: [
            {required: true, message: '请选择角色',trigger: 'change'}
          ]

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
            key: 'number',
            align: 'center',
            width: 60,
            fixed: 'left'
          },
          {
            title: '用户名',
            key: 'username',
            align: 'center',
            width: 120,
            fixed: 'left'
          },
          {
            title: '手机',
            key: 'phone',
            align: 'center',
            width: 120
          },
          {
            title: '邮箱',
            key: 'email',
            align: 'center',
            width: 150
          },
          {
            title: '角色',
            key: 'role',
            width: 90
          },
          {
            title: '部门',
            key: 'department',
            align: 'center',
            width: 120
          },
          {
            title: '创建日期',
            key: 'created_time',
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h('span', params.row.created_time.slice(0, 16))
            }
          },
          {
            title: '操作',
            key: 'operate',
            align: 'center',
            width: 125,
            fixed: 'right',
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
                      //重置
                      this.$refs.formInline.resetFields()
                      this.info = '编辑'
                      delete this.ruleInline.password[0].required
                      this.isOpenModal = true
                      let rowDate = {}
                      Object.assign(rowDate,params.row)
                      switch (rowDate.role) {
                        case '管理员': rowDate.role = 'admin'
                          break
                        case '行政审批': rowDate.role = 'leader'
                          break
                        case '普通用户': rowDate.role = 'user'
                          break
                      }


                      Object.assign(this.model_info,rowDate)
                      this.model_info.password = null

//                      console.log('编辑',this.model_info)

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
                          content: `<p>确认删除 ${params.row.username} 吗？</p>`,
                          onOk: () => {

                            const url = 'api/user/users/' + params.row.id
                            let requestBody = {
                              user_name: this.user_info.username,
                              user_id: this.user_info.id
                            }

                            this.$http.delete(url,{body:requestBody}).then( (res) => {
                              console.log('删除用户',res.body)
                              this.$Message.info('成功删除用户');
                              //重新获取用户
                              this.getUser()
                            },(err) => {
                              this.$Message.info('删除用户失败');
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
        queryResult: []

      }
    },
    methods: {
      getUser () {//获取用户
        Object.assign(this.user_info,this.$store.state.userData.userInfo)

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
        //重置
        this.$refs.formInline.resetFields()
        this.info = '创建'
        this.ruleInline.password[0].required = true
        this.isOpenModal = true

      },
      cancel () {
        this.isOpenModal = false
        //重置
        this.$refs.formInline.resetFields()
      },
      Ok () {
        console.log(this.info)
        if(this.info == '创建') {
          this.createOk()

        }else if(this.info == '编辑') {
          this.compileOk()
        }

      },
      compileOk () {//确定编辑
        console.log('确定后的内容',this.model_info)
//        let temporary = {}//存储表单内容

//        Object.assign(temporary,this.compileUser)

        this.$refs.formInline.validate((valid) => {
          if(valid) {
//            this.compileUser = temporary
            console.log('验证成功')

            const url = 'api/user/users/'+this.user_id


            let requestBody = {}

            //判断密码是否修改
            if(this.model_info.password){

              Object.assign(requestBody,this.model_info)

              requestBody.password = sha256(requestBody.password + '!@#$%^').toString(crypto.enc.Hex)


            }else{
              requestBody.username = this.model_info.username
              requestBody.department = this.model_info.department
              requestBody.phone = this.model_info.phone
              requestBody.email = this.model_info.email
              requestBody.role = this.model_info.role

            }
            requestBody.user_name = this.user_info.username
            requestBody.user_id = this.user_info.id

            this.$http.put(url,requestBody).then((res) => {

              this.$Message.info('编辑用户成功');

              this.current_page = 1
//          修改成功之后改变列表数据
              for(var key in this.model_info) {
                this.queryResult[this.index][key] = this.model_info[key]

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

            this.isOpenModal = false


//
          } else {

            this.$Message.info('验证用户失败');

            console.log('验证失败')

          }
        })


      },
      createOk () {//确定创建用户

        this.$refs.formInline.validate((valid) => {
          if(valid) {
            console.log('验证成功')

            //            发送请求
            const url = 'api/user/users'

            let requestBody =  {}

            this.model_info.phone && (requestBody.phone = this.model_info.phone)
            this.model_info.email && (requestBody.email = this.model_info.email)
            requestBody.username = this.model_info.username
            requestBody.password = this.model_info.password
            requestBody.role = this.model_info.role
            requestBody.department = this.model_info.department

            requestBody.password = sha256(this.model_info.password + '!@#$%^').toString(crypto.enc.Hex)
            requestBody.user_name = this.user_info.username
            requestBody.user_id = this.user_info.id

            this.$http.post(url,requestBody).then((res) => {

              this.$Message.info('创建用户成功');
              this.isOpenModal = false//关闭modal
              console.log(res.body.result)
              //重新获取用户
              this.getUser()

            },(err) => {
              console.log(err)

              this.$Message.info('创建用户失败');
              this.isOpenModal = false//关闭modal

            })


          } else {
            console.log('验证失败')

            this.$Message.info('验证用户失败');

          }
        })

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

  .table-wrap {
    max-width: 940px;
  }



</style>
