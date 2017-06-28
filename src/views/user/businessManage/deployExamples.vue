<template>
    <div class="inquire">
        <div class="inquire-form">
            <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="90">
                <Row :gutter="16">
                    <Col span="8">
                    <Form-item label="创建日期:" prop="start_time">
                        <Date-picker  type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="formValidate.start_time" style="max-width: 250px"></Date-picker>
                    </Form-item>
                    </Col>
                    <Col span="7">
                    <Form-item label="部署实例名称:" prop="instance_name">
                        <Input v-model="formValidate.instance_name" placeholder="请输入"></Input>
                    </Form-item>
                    </Col>
                    <Col span="5">
                        <div class="inquire-form-query">
                            <Button type="primary" class="inquire-form-query-add" @click.native="goQuery">查询</Button>
                            <Button type="ghost" @click="handleReset('formValidate')">重置</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="inquire-table">
            <div class="inquire-table-title">部署实例列表</div>
            <div class="tjbssl">
                <Button type="primary" @click.native="addCase">添加部署实例</Button>
                <!--<Button @click="modal1 = true">添加部署实例</Button>-->
                <Modal
                        v-model="modal1"
                        title="添加部署实例"
                        width="440"
                        @on-ok="addmessage('createUser')"
                        @on-cancel="cancel">
                    <Form ref="createUser" :model="createUser" :rules="ruleInline" label-position="right" :label-width="130" >
                        <Form-item label="名称：" prop="instance_name">
                            <Input v-model="createUser.instance_name" placeholder="最多10个字符" style="width: 200px"></Input>
                        </Form-item>
                        <Form-item label="用户群体规模：" prop="az_id">
                            <Select v-model="az_id" style="width:200px">
                                <Option v-for="item in az" :value="item.az_id" :key="item">{{ item.az_name }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="用户活跃度：" prop="az_id2">
                            <Select v-model="az_id2" style="width:200px">
                                <Option v-for="item in az2" :value="item.az_id2" :key="item">{{ item.az_name2 }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="业务类型：" prop="az_id3">
                            <Select v-model="az_id3" style="width:200px">
                                <Option v-for="item in az3" :value="item.az_id3" :key="item">{{ item.az_name3 }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="数据大小：" prop="az_id4">
                            <Select v-model="az_id4" style="width:200px">
                                <Option v-for="item in az4" :value="item.az_id4" :key="item">{{ item.az_name4 }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="高可用：" prop="az_id5">
                            <Select v-model="az_id5" style="width:200px">
                                <Option v-for="item in az5" :value="item.az_id5" :key="item">{{ item.az_name5 }}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                </Modal>
                <Modal
                        v-model="modal2"
                        title="编辑部署实例"
                        @on-ok="compileOk('formCompile')"
                        @on-cancel="cancel">
                    <Form ref="formCompile" :model="compileUser" label-position="right" :label-width="130" >
                        <Form-item label="名称：" prop="instance_name">
                            <Input v-model="compileUser.instance_name" placeholder="最多10个字符" style="width: 200px"></Input>
                        </Form-item>
                        <Form-item label="用户群体规模：" prop="az_id">
                            <Select v-model="az_id" style="width:200px">
                                <Option v-for="item in az" :value="item.az_id" :key="item">{{ item.az_name }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="用户活跃度：" prop="az_id2">
                            <Select v-model="az_id2" style="width:200px">
                                <Option v-for="item in az2" :value="item.az_id2" :key="item">{{ item.az_name2 }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="业务类型：" prop="az_id3">
                            <Select v-model="az_id3" style="width:200px">
                                <Option v-for="item in az3" :value="item.az_id3" :key="item">{{ item.az_name3 }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="数据大小：" prop="az_id4">
                            <Select v-model="az_id4" style="width:200px">
                                <Option v-for="item in az4" :value="item.az_id4" :key="item">{{ item.az_name4 }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="高可用：" prop="az_id5">
                            <Select v-model="az_id5" style="width:200px">
                                <Option v-for="item in az5" :value="item.az_id5" :key="item">{{ item.az_name5 }}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                </Modal>
            </div>
            <Table border :columns="columns7" stripe :data="data6"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="data_length" show-sizer @on-change="changePage" @on-page-size-change="page_size_change" :current="current_page"></Page>
                </div>
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
              modal1: false ,
              modal2: false ,
              value: '',
              tjname: '',
              getResult: [],
              az_id: '',
              az_id2: '',
              az_id3: '',
              az_id4: '',
              az_id5: '',
              az:[
                    {
                        az_id : "01",
                        az_name: "内网少量用户",
                    },
                    {
                        az_id : "02",
                        az_name: "内网大量用户",
                    },
                    {
                        az_id : "03",
                        az_name: "外网少量用户",
                    },
                    {
                        az_id : "04",
                        az_name: "外网大量用户",
                    }
              ],
              az2:[
                    {
                        az_id2 : "01",
                        az_name2: "偶尔使用",
                    },
                    {
                        az_id2 : "02",
                        az_name2: "经常使用",
                    },
                    {
                        az_id2 : "03",
                        az_name2: "频繁使用",
                    }
              ],
              az3:[
                    {
                        az_id3 : "01",
                        az_name3: "视频",
                    },
                    {
                        az_id3 : "02",
                        az_name3: "网站",
                    },
                    {
                        az_id3 : "03",
                        az_name3: "大数据",
                    },
                    {
                        az_id3 : "04",
                        az_name3: "存储类应用",
                    },
                    {
                        az_id3 : "05",
                        az_name: "移动应用",
                    }
              ],
              az4:[
                    {
                        az_id4 : "01",
                        az_name4: "MB级",
                    },
                    {
                        az_id4 : "02",
                        az_name4: "GB级",
                    },
                    {
                        az_id4 : "03",
                        az_name4: "TB级",
                    }
              ],
              az5:[
                    {
                        az_id5 : "01",
                        az_name5: "需要",
                    },
                    {
                        az_id5 : "02",
                        az_name5: "不需要",
                    }
              ],
              formValidate: {
                  instance_name: '',
                  start_time: ''
              },
              ruleValidate: {
                  instance_name: [],
                  start_time: []
              },
              createUser: {
                instance_name: '',
                number: '',
                time: ''
              },
              ruleInline: {
                  instance_name: [
                      { required: true, message: '请填写部署实例名称', trigger: 'blur' }
                  ]
              },
              compileUser: {
                  instance_name: '',
                  number: '',
                  time: ''
              },
              columns7: [
                  {
                      title: '序号',
                      type: 'index',
                      width: 80,
                      align: 'center'
                  },
                  {
                      title: '部署实例名称',
                      key: 'instance_name',
                      align: 'center'
                  },
                  {
                      title: '资源数量',
                      key: 'number',
                      align: 'center',
                      render: (h, params) => {
                        return h('div', [
                            h('a', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        //this.$router.push({instance_name: 'user_resourceQuery', query: {number: params.row.number}});
                                        this.$router.push({name: 'user_resourceQuery'});
                                    }
                                }
                            }, params.row.number)
                        ]);
                      }
                  },
                  {
                      title: '创建日期',
                      key: 'time',
                      align: 'center'
                  },
                  {
                      title: '操作',
                      key: 'action',
                      width: 260,
                      align: 'center',
                      render: (h, params) => {
                          return h('div', [
                              h('Button', {
                                  props: {
                                      type: 'primary',
                                      size: 'small'
                                  },
                                  style: {
                                      marginRight: '5px'
                                  },
                                  on: {
                                      click: () => {
                                          this.modal2 = true

                                          let rowDate = {}
                                          for(var key in params.row) {
                                            rowDate[key] = params.row[key]
                                          }
                                          console.log('row',rowDate)

                                          Object.assign(this.compileUser,rowDate)

                                          console.log('编辑',this.compileUser)

                                          this.index = params.index
                                          this.user_id = params.row.id

                                          //for(var key in params.row) {
                                          //  this.compileUser[key] = params.row[key]
                                          //}
                                          //console.log('5555',this.compileUser);
                                          //this.index = params.index
                                      }
                                  }
                              }, '编辑'),
                              h('Button', {
                                  props: {
                                      type: 'error',
                                      size: 'small'
                                  },
                                  on: {
                                      click: () => {
                                          this.$Modal.confirm({
                                              title: '是否下线'+params.row.instance_name+'，下线操作将删除此部署实例内的所有资源并不可恢复，请慎重操作！！！',
                                              content: '注：删除此部署实例后，实例所属的资源也将一并删除，请谨慎操作！',
                                              onOk: () => {
                                                      console.log('删除1',params)
                                                  const url = 'api/deploy_instance/deploy_instances/' + params.row.id
                                                      console.log('删除2',params.row.id)
                                                  this.$http.delete(url).then( (res) => {
                                                    console.log('删除成功',res)
                                                      //重新获取用户
                                                      const  query_user = {user_id:this.$store.state.userData.userInfo.id}
                                                      this.getUserResource (query_user)
                                                  },(err) => {
                                                    console.log('err',err)
                                                  })


                                                  //this.remove(params.index)
                                              },
                                              onCancel: () => {
                                                  this.$Message.info('点击了取消');
                                              }
                                          });
                                      }
                                  }
                              }, '下线')
                          ]);
                      }
                  }
              ],
              data6: [
                  //{
                  //    name: '实例1',
                  //    number: '10',
                  //    time: '2017-06-23 15:00:00'
                  //}
              ]
          }
      },
      created () {
        //获取用户的所有申请资源
        const id = this.$store.state.userData.userInfo.id
        const  query = {user_id:id}
        this.getUserResource(query)

      },
      methods: {
          goQuery () {
              let instance_name = this.formValidate.instance_name
              console.log('查询',instance_name)
              let start_time = this.formValidate.start_time[0]

              let end_time = this.formValidate.start_time[1]

              this.current_page = 1
              let params = {}

              instance_name && (params.instance_name = instance_name)
              start_time && (params.start_time = this.timeFormat(start_time))
              end_time && (params.end_time = this.timeFormat(end_time))

              this.getUserResource(params)
          },
          getUserResource (query) {

              this.getResult = []
              this.data6 = []
              const url = 'api/deploy_instance/deploy_instances'

              this.$http.get(url,{params: query}).then((res) => {

                this.data_length = res.body.result.res.length
                this.current_page = 1

                res.body.result.res.forEach((item,index) => {
                  this.getResult.push({
                    index: item.user_id,
                    instance_name: item.instance_name,
                    number: item.resource_num,
                    time: item.created_date,
                    u_name: item.user_name,
                    id:item.instance_id
                  })
                })
                console.log(this.getResult)

                this.data6 = this.mockTableData(this.getResult,this.page_size,this.current_page)


              },(err) => {
                console.log(err)
              })

          },
          handleReset (instance_name) {
              this.$refs[instance_name].resetFields();
          },
          addCase (){
              this.modal1 = true;
          },
          remove (index) {
              this.data6.splice(index, 1);
          },
          addmessage (create_name) {
              this.$refs[create_name].validate((valid) => {
                  if (valid) {
                        console.log('验证成功')
                        //发送请求
                        const url = 'api/deploy_instance/deploy_instances'

                        let requestBody =  {}
                        requestBody.user_id = this.$store.state.userData.userInfo.id;
                        requestBody.user_name = this.$store.state.userData.userInfo.username;
                        requestBody.instance_name = this.createUser.instance_name;
                        requestBody.instance_num = '0';

                        this.$http.post(url,requestBody).then((res) => {
                          //重新获取用户
                          const  query_user = {user_id:this.$store.state.userData.userInfo.id}
                          this.getUserResource (query_user)

                          //重置
                          //this.$refs[instance_name].resetFields()

                        },(err) => {
                          console.log(err)
                          this.$Message.info('创建用户失败');

                        })
                        this.createUser.instance_name='';
                        console.log('333333');
                        this.$Message.info('添加成功');
                  } else {
                        this.modal1 = false;
                        this.$Message.error('表单验证失败!');
                  }
              })
          },
          cancel () {
              this.$Message.info('点击了取消');
          },
          compileOk (name) {//编辑后确定

                let temporary = {}

                Object.assign(temporary,this.compileUser)

                this.$refs[name].validate((valid) => {
                      if(valid) {
                        console.log('验证成功')
                        console.log('temporary',temporary)

                        console.log('表单信息',this.compileUser)
                        console.log('request',requestBody)
                        console.log('user_id',this.user_id)

                        const url = 'uop/api/deploy_instance/deploy_instances/'+this.user_id

                        let requestBody = {}


                        requestBody = {
                            instance_id: temporary.id,
                            instance_name: temporary.instance_name,
                            instance_num: temporary.number
                        }

                        console.log('请求',requestBody)

                        this.$http.put(url,requestBody).then((res) => {
                          console.log(res.body)

                          this.current_page = 1
                          //修改成功之后改变列表数据
                          for(var key in temporary) {
                            this.data6[this.index][key] = temporary[key]
                          }
                        },(err) => {

                          this.$Message.info('编辑用户失败');
                          console.log('err',err)
                          //重置
                          this.$refs[name].resetFields()
                        })

                      } else {

                        this.$Message.info('编辑用户失败');
                        //重置
                        this.$refs[name].resetFields()
                        console.log('验证失败')
                      }
                })

             //for(var key in this.compileUser) {
             //  this.data6[this.index][key] = this.compileUser[key]
             //}
             //console.log('result',this.data6)
          },
          // 分页
          changePage(page) {
              this.data6 = this.mockTableData(this.getResult, this.page_size, page)
              this.current_page = page
          },
          mockTableData (originData, pageSize, index) {//进行分页

                let data = [];
                let num = (index - 1) * pageSize
                let maxNum = (num + pageSize) > originData.length ? originData.length : (num + pageSize)

                data = originData.slice(num,maxNum)

                data.forEach((item,index) => {
                    item.time = item.time.slice(0,19)
                })
                return data;
          },
          page_size_change(val) {
              this.page_size = size
              this.data6 = this.mockTableData(this.getResult,this.page_size,1)
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
      },
      computed: {}
  }
</script>

<style scoped>
.tjbssl Button{
    margin-bottom: 20px;
    /*display: block;*/
    /*width: 150px;*/
    /*height: 30px;*/
    /*line-height: 30px;*/
    /*background: #2d8cf0;*/
    /*text-align: center;*/
    /*color: #fff;*/
    /*font-size: 14px;*/
    /*border-radius: 6px;*/
    /*padding: 0;*/
}
.bssl-list{
     height: 35px;
     line-height: 35px;
     font-size: 14px;
}
.ivu-page{
    padding-top: 20px;
    float: right;
}
.c_font{
    line-height: 32px;
    text-align: right;
    padding-right: 10px;
}

.c_font2{
    line-height: 32px;
    text-align: center;
}
</style>