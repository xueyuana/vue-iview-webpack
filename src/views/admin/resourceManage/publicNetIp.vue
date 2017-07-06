<template>
    <div class="inquire">
        <div class="inquire-form">
            <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="70">
                <div class="form-wrap">
                    <Form-item label="IP地址池:" prop="ip_pool" class="form-item">
                        <!--<Input v-model="formValidate.ip_pool" placeholder="最多10位" style="min-width: 250px"></Input>-->
                        <Select v-model="formValidate.ip_pool" clearable style="min-width: 250px">
                            <Option v-for="item in ip_poolVal" :value="item.key" :key="item">{{ item.value }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="IP地址:" prop="id_address" class="form-item">
                        <Input v-model="formValidate.id_address" placeholder="请输入" style="min-width: 250px"></Input>
                    </Form-item>
                    <Form-item label="分配时间:" prop="start_time" class="form-item">
                        <Date-picker  type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="formValidate.start_time" style="min-width: 250px"></Date-picker>
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
        <div class="inquire-table">
            <div class="inquire-table-title">公网IP管理列表</div>
            <div class="tjbssl">
                <Button type="primary" @click.native="addCase">新建</Button>
                <Modal
                    v-model="modal1"
                    title="新增IP地址池"
                    @on-ok="addIp('ipData')"
                    @on-cancel="cancelIp('ipData')"
                    :mask-closable="false">
                    <div class="ipWrap">
                        <Form ref="ipData" :model="ipData" :rules="ruleInline" label-position="right" :label-width="130" >
                            <Form-item label="名称：" prop="ip_pool">
                                <Select v-model="ipData.ip_pool" clearable style="width: 210px">
                                    <Option v-for="item in ip_poolVal" :value="item.key" :key="item">{{ item.value }}</Option>
                                </Select>
                                <!--<Input v-model="ipData.ip_pool" :maxlength="10" placeholder="请输入" style="width: 210px"></Input>-->
                            </Form-item>
                            <!--<Form-item label="IP范围：" prop="ipOne">-->
                                <!--<Input v-model="ipData.ipOne" placeholder="192.168.2.1" style="width: 100px"></Input>-->
                                 <!-- - <Input v-model="ipData.ipTwo" placeholder="192.168.2.6" style="width: 100px"></Input>-->
                            <!--</Form-item>-->
                            <Form-item label="IP范围：">
                                <Row type="flex" justify="start">
                                    <Col span="7">
                                    <Form-item prop="ipOne">
                                        <Input v-model="ipData.ipOne" placeholder="192.168.2.1" style="width: 90px"></Input>
                                    </Form-item>
                                    </Col>
                                    <Col span="1">- </Col>
                                    <Col span="7">
                                    <Form-item prop="ipTwo">
                                        <Input v-model="ipData.ipTwo" placeholder="192.168.2.6" style="width: 90px"></Input>
                                    </Form-item>
                                    </Col>
                                </Row>
                            </Form-item>
                            <Form-item label="子网掩码：" prop="subnetmask">
                                <Input v-model="ipData.subnetmask" placeholder="255.255.255.0" style="width: 210px"></Input>
                            </Form-item>
                        </Form>
                    </div>
                    <div slot="footer">
                        <Button type="text" @click="cancelIp('ipData')">取消</Button>
                        <Button type="primary" size="large" @click="addIp('ipData')" >确定</Button>
                    </div>
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
    import {formatDate} from 'tools/formatDate.js'
  export default {
      data () {
//          const validateIpPool = (rule, value, callback) => {
//              if (value === '') {
//                  callback(new Error('请输入名称'));
//              } else {
//                  if (value.length > 10) {
//                      callback(new Error('最多可输入10位'));
//                  } else {
//                      callback();
//                  }
//              }
//          };
          const validateIp = (rule, value, callback) => {
              if (value === '') {
                  callback(new Error('请输入IP范围'));
              } else {
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
                  let maskReg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
                  if (!maskReg.test(value)) {
                      callback(new Error('请输入正确子网掩码'));
                  } else {
                      callback();
                  }
              }
          };
          return {
              ipReg:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
              formValidate: {
                  ip_pool: '',
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
                ip_pool: '',
                subnetmask:'',
                state: ''
              },
              ip_poolVal: [
                  {
                      value: '上线IP',
                      key: 'online'
                  },
                  {
                      value: '测试IP',
                      key: 'test'
                  }
              ],
              ruleInline: {
                  ipOne: [
                      {required: true, validator: validateIp, trigger: 'blur'}
                  ],
                  ipTwo: [
                      {required: true, validator: validateIp, trigger: 'blur'}
                  ],
                  ip_pool: [
//                      { required: true, max: 15, validateIpPool: validateIpPool, trigger: 'blur' }
                      { required: true, message: '请选择名称', trigger: 'change' }
                  ],
                  subnetmask: [
                      {required: true, validator: validateMask, trigger: 'blur'}
                  ]
              },
              modal1: false ,
              columns7: [
                  {
                      title: '序号',
                      key: 'index',
                      align: 'center',
                      width: 100
                  },
                  {
                      title: 'IP地址池',
                      key: 'ip_pool',
                      align: 'center',
                      render: (h, params) => {
                          const row = params.row;
                          const color = row.ip_pool === 'test' ? '#3F94FC' : '#657180';
                          const text = row.ip_pool === 'test' ? '测试IP' : '上线IP';
                          return h('span', {
                              style: {
                                  color: color
                              },
                          }, text);
                      }
                  },
                  {
                      title: 'IP地址',
                      key: 'ip',
                      align: 'center'
                  },
                  {
                      title: '子网掩码',
                      key: 'subnet_mask',
                      align: 'center',
                  },
                  {
                      title: '分配状态',
                      key: 'status',
                      align: 'center',
                      render: (h, params) => {
                          const row = params.row;
                          const color = row.status === 'un_alloc' ? '#f00' : '#657180';
                          const text = row.status === 'un_alloc' ? '未分配' : '已分配';
                          return h('span', {
                              style: {
                                  color: color
                              },
                          }, text);
                      }
                  },
                  {
                      title: '分配时间',
                      key: 'created_date',
                      align: 'center',
                      render: (h, params) => {
                          if (params.row.created_date) {
                              return h('p', params.row.created_date.slice(0, 16))
                          }
                      }
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
                                              title: '保留IP地址',
                                              content: '请确认！！！',
                                              onOk: () => {
                                                  const url = 'api/ip_manager/ip_managers/' + params.row.uuid
                                                 console.log('保留IP地址',url)
                                                  this.$http.delete(url).then( (res) => {
                                                      console.log('保留IP地址',res.body)
                                                      //重新获取用户
                                                      this.goQuery();
                                                  },(err) => {
                                                      console.log('err',err)
                                                  })
                                              },
                                              onCancel: () => {
                                                  this.$Message.info('点击了取消');
                                              }
                                          });
                                      }
                                  }
                              }, '保留')
                          ]);
                      }
                  }
              ],
              queryResult: [],
              getResult: [],
              data_length: 0,
              page_size: 10,
              current_page: 1
          }
      },
      created () {
          //获取ip地址列表
          this.goQuery();
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
              this.formValidate.ip_pool && (requestBody.ip_pool = this.formValidate.ip_pool);
              this.formValidate.id_address && (requestBody.ip = this.formValidate.id_address);
              this.getNetIp(requestBody);
          },
          getNetIp (query) {
              this.queryResult = [];
              this.getResult = [];
              const url = 'api/ip_manager/ip_managers';
              this.$http.get(url,{params: query}).then((res) => {
                  console.log('sssss', res);
                if (res.body.code === 200) {
                    this.data_length = res.body.result.res.length;
                    this.getResult = res.body.result.res
                    // 排序
                    let pending = []
                    this.getResult.forEach((item, index) => {
                        if (item.status === 'alloc') {
                            pending.push(item)
                            this.getResult.splice(index, 1)
                        }
                    })
                    this.getResult = pending.concat(...this.getResult)

                    this.getResult.forEach((item, index) => {
                        item.index = index + 1
                    })
                    console.log('排序后的数组', this.getResult)
                    this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page);;
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
          cancelIp (name) {//取消编辑
              this.modal1 = false
              //重置
              this.$refs[name].resetFields();
          },
          addIp (create_name) {
              this.$refs[create_name].validate((valid) => {
                  if (valid) {
                      //判断是否同网段
                      let isIp = false;
                      isIp = this.isEqualIPAddress(this.ipData.ipOne,this.ipData.ipTwo,this.ipData.subnetmask);
                      if (isIp) {
                          var ipOarr = this.ipData.ipOne.split('.');
                          var ipOne4 = parseInt(ipOarr[3]);
                          var ipTarr = this.ipData.ipTwo.split('.');
                          var ipTwo4 = parseInt(ipTarr[3]);
                          //判断IP范围中'结束值'和'起始值'的大小
                          if (ipOne4 > ipTwo4) {
                              this.$Message.error('IP范围结束值应大于起始值');
                          } else {
                              const url = 'api/ip_manager/ip_managers'
                              let requestBody =  {};
                              this.ipData.ip_pool && (requestBody.ip_pool = this.ipData.ip_pool);
                              this.ipData.ipOne && (requestBody.ip_start = this.ipData.ipOne);
                              this.ipData.ipTwo && (requestBody.ip_end = this.ipData.ipTwo);
                              this.ipData.subnetmask && (requestBody.subnet_mask = this.ipData.subnetmask);

                              this.$http.post(url,requestBody).then((res) => {
                                  console.log(res.body.result)
                                  if (res.body.code === 200) {
                                      this.modal1 = false;//关闭modal
                                      this.$Message.info('新建IP地址池成功');
                                      //重新获取列表
                                      this.goQuery();
                                  }
                              },(err) => {
//                                  this.$Message.error(err.body.result.msg);
                                  this.$Message.error('新建IP地址池失败');
                                  this.modal1 = false;//关闭modal
                              });

                              //重置
                              this.$refs[create_name].resetFields();
                          }

                      } else {
                          this.$Message.error('不在同一网段!');
                      }
                  } else {
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
          // 分页
          changePage (page) {
              this.queryResult = this.mockTableData(this.getResult,this.page_size,page)
              this.current_page = page
          },
          page_size_change (size) {
              this.page_size = size
              this.current_page = 1
              this.queryResult = this.mockTableData(this.getResult,this.page_size,this.current_page)
          },
          mockTableData (originData, pageSize, index) {//进行分页
              let data = [];
              let num = (index - 1) * pageSize
              let maxNum = (num + pageSize) > originData.length ? originData.length : (num + pageSize)
              data = originData.slice(num,maxNum)
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
</style>