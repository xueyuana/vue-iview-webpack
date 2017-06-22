<template>
    <div class="inquire">
        <div class="inquire-form">
            <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="90">
                <Row :gutter="16">
                    <Col span="9">
                    <Form-item label="创建日期:" prop="start_time">
                        <Date-picker  type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="formValidate.start_time"></Date-picker>
                    </Form-item>
                    </Col>
                    <Col span="7">
                    <Form-item label="部署实例名称:" prop="case_name">
                        <Input v-model="formValidate.case_name" placeholder="请输入"></Input>
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
        <!--<Row>-->
            <!--<Col span="2" class="c_font">创建日期：</Col>-->
            <!--<Col span="4">-->
                <!--<Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>-->
            <!--</Col>-->
            <!--<Col span="2" class="c_font">部署实例名称：</Col>-->
            <!--<Col span="4">-->
                <!--<Input v-model="value" placeholder="请输入..."></Input>-->
            <!--</Col>-->
            <!--<Col span="5"></Col>-->
        <!--</Row>-->
        <div class="inquire-table">
            <div class="inquire-table-title">部署实例列表</div>
            <div class="tjbssl">
                <Button type="primary" @click.native="addCase">添加部署实例</Button>
                <!--<Button @click="modal1 = true">添加部署实例</Button>-->
                <Form ref="createUser" :model="createUser" :rules="ruleInline" inline>
                    <Modal
                            v-model="modal1"
                            title="添加部署实例"
                            @on-ok="addmessage('createUser')"
                            @on-cancel="cancel">
                        <Form-item prop="name">
                            <p>名称：<Input v-model="createUser.name" placeholder="最多10个字符" style="width: 300px"></Input></p>
                        </Form-item>
                    </Modal>
                </Form>
                <Modal
                        v-model="modal2"
                        title="编辑部署实例"
                        @on-ok="compileOk"
                        @on-cancel="cancel">
                    <p>名称：<Input v-model="compileUser.name" placeholder="最多10个字符" style="width: 300px"></Input></p>
                </Modal>
            </div>
            <Table border :columns="columns7" stripe :data="data6"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="this.data6.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
      data () {
          return {
              formValidate: {
                  case_name: '',
                  start_time: ''
              },
              ruleValidate: {
                  case_name: [],
                  start_time: []
              },
              createUser: {
                name: '',
                number: '',
                time: ''
              },
              ruleInline: {
                  name: [
                      { required: true, message: '请填写部署实例名称', trigger: 'blur' }
                  ]
              },
              compileUser: {
                  name: '',
                  number: '',
                  time: ''
              },
              modal1: false ,
              modal2: false ,
              value: '',
              tjname: '',
              columns7: [
                  {
                      title: '序号',
                      type: 'index',
                      width: 80,
                      align: 'center'
                  },
                  {
                      title: '部署实例名称',
                      key: 'name',
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
                                        this.$router.push({name: 'user_deployExample', query: {number: params.row.number}});
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
                                        for(var key in params.row) {
                                          this.compileUser[key] = params.row[key]
                                        }
                                        console.log('5555',this.compileUser);
                                        this.index = params.index
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
                                              title: '是否下线'+params.row.name+'，下线操作将删除此部署实例内的所有资源并不可恢复，请慎重操作！！！',
                                              content: '注：删除此部署实例后，实例所属的资源也将一并删除，请谨慎操作！',
                                              onOk: () => {
                                                  this.remove(params.index)
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
                  {
                      name: '实例1',
                      number: '10',
                      time: '2017-06-23 15:00:00'
                  }
              ],
              data1: [],
              pageSize: 10,
              num: 1
          }
      },
      methods: {
          goQuery (name) {
              console.log('ddsss', this.formValidate);
          },
          handleReset (name) {
              this.$refs[name].resetFields();
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
                        var stamp = new Date(),
                            year = stamp.getFullYear(),
                            month = (stamp.getMonth() + 1) > 9 ? (stamp.getMonth() + 1) : '0' + (stamp.getMonth() + 1),
                            day = stamp.getDate() > 9 ? stamp.getDate() : '0' + stamp.getDate(),
                            hour = stamp.getHours() > 9 ? stamp.getHours() : '0' + stamp.getHours(),
                            minute = stamp.getMinutes() > 9 ? stamp.getMinutes() : '0' + stamp.getMinutes(),
                            sec = stamp.getSeconds() > 9 ? stamp.getSeconds() : '0' + stamp.getSeconds()
                        this.data6.push({
                            name: this.createUser.name,
                            number: '0',
                            time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + sec
                        });
                        this.createUser.name='';
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
          compileOk () {//编辑后确定
             for(var key in this.compileUser) {
               this.data6[this.index][key] = this.compileUser[key]
             }
              console.log('result',this.data6)
          },
          // 分页
          changePage(val) {
              this.filterDate = this.mockTableData(this.data6, this.pageSize, val)
          },
          changePageSize(val) {
              this.pageSize = val
              this.changePage(1)
          },
          // 时间选择器
          //formatCreateData(value) {
          //    console.log('ddsss', this.formValidate);
          //    this.formValidate.start_time = value
          //}
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