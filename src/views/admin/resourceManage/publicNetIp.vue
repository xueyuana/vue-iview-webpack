<template>
    <div class="inquire">
        <div class="inquire-form">
            <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="90">
                <Row :gutter="16">
                    <Col span="9">
                    <Form-item label="日期:" prop="start_time">
                        <Date-picker  type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="formValidate.start_time" style="min-width: 250px"></Date-picker>
                    </Form-item>
                    </Col>
                    <Col span="7">
                    <Form-item label="IP地址:" prop="case_name">
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
            <div class="inquire-table-title">公网IP列表</div>
            <div class="tjbssl">
                <Button type="primary" @click.native="addCase">新建</Button>
                <!--<Button @click="modal1 = true">添加部署实例</Button>-->
                <Form ref="createUser" :model="createUser" :rules="ruleInline" inline>
                    <Modal
                            v-model="modal1"
                            title="新增IP地址池"
                            @on-ok="addmessage('createUser')"
                            @on-cancel="cancel">
                        <Form-item prop="number">
                            <p>IP类型：<Input v-model="createUser.number" placeholder="测试地址池" style="width: 300px"></Input></p>
                        </Form-item>
                        <Form-item prop="name">
                            <p>IP范围：<Input v-model="createUser.name" placeholder="192.168.2.1" style="width: 300px"></Input></p>
                        </Form-item>
                        <Form-item>
                            <p>子网掩码：<Input placeholder="255.255.255.0" style="width: 300px"></Input></p>
                        </Form-item>
                    </Modal>
                </Form>
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
                state: '',
                time: ''
              },
              ruleInline: {
                  name: [
                      { required: true, message: '请填写IP范围', trigger: 'blur' }
                  ],
                  number: [
                      { required: true, message: '请填写IP类型', trigger: 'blur' }
                  ]
              },
              modal1: false ,
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
                      title: 'IP地址',
                      key: 'name',
                      align: 'center'
                  },
                  {
                      title: 'IP地址池',
                      key: 'number',
                      align: 'center',
                  },
                  {
                      title: '分配状态',
                      key: 'state',
                      align: 'center',
                  },
                  {
                      title: '分配时间',
                      key: 'time',
                      align: 'center'
                  },
                  {
                      title: '操作',
                      key: 'action',
                      width: 100,
                      align: 'center',
                      render: (h, params) => {
                          return h('div', [
                              h('Button', {
                                  props: {
                                      type: 'error',
                                      size: 'small'
                                  },
                                  on: {
                                      click: () => {
                                          this.$Modal.confirm({
                                              title: '删除IP地址',
                                              content: '请确认！！！',
                                              onOk: () => {
                                                  this.remove(params.index)
                                              },
                                              onCancel: () => {
                                                  this.$Message.info('点击了取消');
                                              }
                                          });
                                      }
                                  }
                              }, '删除')
                          ]);
                      }
                  }
              ],
              data6: [
                  {
                      name: '192.168.2.1',
                      number: '测试地址池',
                      state: '已分配',
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
                            number: this.createUser.number,
                            time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + sec
                        });
                        this.createUser.name='';
                        this.createUser.number='';
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