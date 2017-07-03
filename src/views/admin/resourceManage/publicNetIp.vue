<template>
    <div class="inquire">
        <div class="inquire-form">
            <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="70">
                <div class="form-wrap">
                    <Form-item label="日期:" prop="start_time" class="form-item">
                        <Date-picker  type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="formValidate.start_time" style="min-width: 250px"></Date-picker>
                    </Form-item>
                    <Form-item label="IP地址:" prop="id_address" class="form-item">
                        <Input v-model="formValidate.id_address" placeholder="请输入" style="min-width: 250px"></Input>
                    </Form-item>
                </div>
                <Row type="flex" justify="end">
                    <Col span="24">
                    <Form-item>
                        <div class="inquire-form-query">
                            <Button type="primary" class="inquire-form-query-add" @click.native="goQuery">查询</Button>
                            <Button type="ghost" @click="handleReset('formValidate')">重置</Button>
                        </div>
                    </Form-item>
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
                <Modal
                        v-model="modal1"
                        title="新增IP地址池"
                        @on-ok="addmessage('ipData')"
                        @on-cancel="cancel">
                    <Form ref="ipData" :model="ipData" :rules="ruleInline" label-position="right" :label-width="130" >
                        <Form-item label="名称：" prop="name">
                            <Input v-model="ipData.name" placeholder="请输入" style="width: 210px"></Input>
                        </Form-item>
                        <Form-item label="IP范围：" prop="ipOne">
                            <Input v-model="ipData.ipOne" placeholder="192.168.2.1" style="width: 100px"></Input>
                            - <Input v-model="ipData.ipTwo" placeholder="192.168.2.6" style="width: 100px"></Input>
                        </Form-item>
                        <Form-item label="子网掩码：" prop="subnetmask">
                            <Input v-model="ipData.subnetmask" placeholder="255.255.255.0" style="width: 210px"></Input>
                        </Form-item>
                    </Form>
                </Modal>
            </div>
            <Table :columns="columns7" stripe :data="queryResult"></Table>
            <div class="inquire-table-page">
                <Page :total="data_length" show-sizer @on-change="changePage" @on-page-size-change="page_size_change" :current="current_page" :page-size="page_size"></Page>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
      data () {
          const validateIp = (rule, value, callback) => {
              if (value === '') {
                  callback(new Error('请输入IP范围'));
              } else {
//                  var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
//                  return reg.test(ip);
                  if (!this.ipReg.test(value)) {
                      callback(new Error('请输入正确IP地址'));
                  } else {
                      callback();
                  }
              }
          };
          const validateMask = (rule, value, callback) => {
              if (value === '') {
                  callback(new Error('请输入子网掩码'));
              } else {
                  if (!this.ipReg.test(value)) {
                      callback(new Error('请输入正确子网掩码'));
                  } else {
                      callback();
                  }
              }
          };
          return {
              ipReg:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
              formValidate: {
                  id_address: '',
                  start_time: ''
              },
              ruleValidate: {
                  id_address: [],
                  start_time: []
              },
              ipData: {
                ipOne: '',
                ipTwo: '',
                name: '',
                subnetmask:'',
                state: ''
              },
              ruleInline: {
                  ipOne: [
//                      { required: true, message: '请填写IP范围', trigger: 'blur' }
                      {required: true, validator: validateIp, trigger: 'blur'}
                  ],
                  ipTwo: [
//                      { required: true, message: '请填写IP范围', trigger: 'blur' }
                      {required: true, validator: validateIp, trigger: 'blur'}
                  ],
                  name: [
                      { required: true, message: '请填写名称', trigger: 'blur' }
                  ],
                  subnetmask: [
//                      { required: true, message: '请填写子网掩码', trigger: 'blur' }
                      {required: true, validator: validateMask, trigger: 'blur'}
                  ]
              },
              modal1: false ,
//              value: '',
//              tjname: '',
              columns7: [
                  {
                      title: '序号',
                      type: 'index',
                      width: 100,
                      align: 'center'
                  },
                  {
                      title: 'IP地址',
                      key: 'ipAddress',
                      align: 'center'
                  },
                  {
                      title: 'IP地址池',
                      key: 'name',
                      align: 'center',
                  },
                  {
                      title: '子网掩码',
                      key: 'subnetmask',
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
                                                  this.remove(params.index);
//                                                  const url = 'api/user/users/' + params.row.id
//                                                  this.$http.delete(url).then( (res) => {
//                                                      console.log('删除IP地址',res.body)
//                                                      //重新获取用户
//                                                      this.goQuery();
//                                                  },(err) => {
//                                                      console.log('err',err)
//                                                  })
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
              queryResult: [
    //                  {
    //                      name: '192.168.2.1',
    //                      number: '测试地址池',
    //                      subnetmask:'255.255.255.0',
    //                      state: '已分配',
    //                      time: '2017-06-23 15:00:00'
    //                  }
              ],
              data1: [],
              getResult: [],
              data_length: 0,
              page_size: 10,
              current_page: 1
          }
      },
      methods: {
          goQuery (name) {
              console.log('ddsss', this.formValidate);
              this.current_page = 1
              const start_time = this.formValidate.start_time[0];
              const end_time = this.formValidate.start_time[1];

              let requestBody = {}
              start_time && (requestBody.start_time = formatDate(start_time));
              end_time && (requestBody.end_time = formatDate(end_time));
              this.formValidate.id_address && (requestBody.id_address = this.formValidate.id_address);
              this.getNetIp(requestBody);
          },
          getApprovalResource (query) {
              this.queryResult = [];
              this.getResult = [];
              const url = 'api/mpc_resource/mpc_resources';
              this.$http.get(url,{params: query}).then((res) => {
                  console.log('sssss', res);
              if (res.body.code === 200) {
                  this.data_length = res.body.result.res.length;
                  res.body.result.res.forEach((item,index) => {
                      switch (item.status) {
                  case 'submit': item.status = '已分配'
                      break
                  default:
                  }
                  console.log('sssssseeeess', item.status);

                  this.getResult.push({
                      index: index +1,
                      ip_name: item.ip_name,
                      ip_resource: item.ip_resource,
                      subnetmask: item.subnetmask,
                      status: item.status,
                      created_time: item.created_date.slice(0,16)
                  })
              })
                  console.log(this.getResult);
                  this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page);
              }
          },(err) => {
                  this.$Message.error(err.body.result.msg)
              });
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
                      let isIp = false;
                      isIp = this.isEqualIPAddress(this.ipData.ipOne,this.ipData.ipTwo,this.ipData.subnetmask);
                      if (isIp) {
                          var ipRange = '';
                          var ipOarr = this.ipData.ipOne.split('.');
                          var ipOne4 = parseInt(ipOarr[3]);
                          var ipTarr = this.ipData.ipTwo.split('.');
                          var ipTwo4 = parseInt(ipTarr[3]);
                          console.log('ipOne4',ipOne4);
                          console.log('ipTwo4',ipTwo4);
                          var i = ipOne4;
                          while (i <= ipTwo4)
                          {
                              var ipAddress = this.ipData.ipOne.substr(0,this.ipData.ipOne.lastIndexOf('.')) + '.' + i;
                              this.data6.push({
                                  ipAddress: ipAddress,
                                  name: this.ipData.name,
                                  subnetmask: this.ipData.subnetmask,
                                  state: '已分配',
                                  time: '2017-07-03'
                              });
//                          this.$http.post(url,requestBody).then((res) => {
//                              console.log(res.body.result)
//                              //重新获取列表
//                              this.goQuery();
//                              //重置
//                              this.$refs[name].resetFields();
//                          },(err) => {
//                              console.log(err)
//                              this.$Message.info('创建失败');
//                          })
                              i++;
                              this.$Message.success('添加成功');
                          }
                      } else {
                          this.$Message.error('不在同一网段!');
                      }
                    console.log(this.data6);
                    this.ipData.ipOne='';
                    this.ipData.ipTwo='';
                    this.ipData.name='';
                    this.ipData.subnetmask='';
                  } else {
                    this.modal1 = false;
                    this.$Message.error('表单验证失败!');
                  }
              })
          },
          //判断两个IP，是否在同一个网段
          isEqualIPAddress (addr1,addr2,mask) {
              if(!addr1 || !addr2 || !mask){
                  console.log("各参数不能为空");
                  return false;
              }
              var res1 = [], res2 = [];
              addr1 = addr1.split(".");
              addr2 = addr2.split(".");
              mask  = mask.split(".");
              for(var i = 0,ilen = addr1.length; i < ilen ; i += 1){
                  res1.push(parseInt(addr1[i]) & parseInt(mask[i]));
                  res2.push(parseInt(addr2[i]) & parseInt(mask[i]));
              }
              console.log(res1);
              console.log(res1.join("."));
              console.log(res2);
              console.log(res2.join("."));
              if(res1.join(".") == res2.join(".")){
                  console.log("在同一个网段");
                  return true;
              }else{
                  console.log("不在同一个网段");
                  return false;
              }
          },
          cancel () {
              this.$Message.info('点击了取消');
          },
          // 分页
          changePage (page) {
              this.queryResult = this.mockTableData(this.getResult,this.page_size,page);
              this.current_page = page;
          },
          page_size_change (size) {
              this.page_size = size;
              this.current_page = 1;
              this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page);
          },
          mockTableData (originData, pageSize, index) {//进行分页
              let data = [];
              let num = (index - 1) * pageSize;
              let maxNum = (num + pageSize) > originData.length ? originData.length : (num + pageSize);
              data = originData.slice(num,maxNum);
              return data;
          }
      },
      computed: {}
  }
</script>

<style lang="less" scoped>
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
.mubername{
    width: 100px;
    line-height: 32px;
    display: inline-block;
    text-align: right;
}
</style>