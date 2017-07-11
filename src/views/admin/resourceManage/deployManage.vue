<template>
  <div class="inquire">
    <!--查询条件-->
    <div class="inquire-form">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="90">
        <div class="form-wrap">
          <Form-item label="选择日期:" prop="date" class="form-item">
            <Date-picker v-model="formItem.date" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间"
                         style="min-width: 250px"></Date-picker>
          </Form-item>
          <Form-item label="用户:" prop="user_id" class="form-item">
            <Select v-model="formItem.user_id" filterable clearable style="width: 250px"
                    :placeholder="instanceList.length ? '请选择' : '无'">
              <Option v-for="(item, index) in userList" :value="item.id" :key="index">{{ item.username }}</Option>
            </Select>
          </Form-item>
          <Form-item label="部署实例名称:" prop="instance_name" class="form-item">
            <Select v-model="formItem.instance_name" clearable style="width: 250px"
                    :placeholder="instanceList.length ? '请选择' : '空'">
              <Option v-for="item in instanceList" :value="item.instance_name" :key="item">{{ item.instance_name }}
              </Option>
            </Select>
          </Form-item>
        </div>

        <Row type="flex" justify="end">
          <Col span="24">
          <Form-item>
            <div class="inquire-form-query">
              <Button type="primary" class="inquire-form-query-add" @click.native="onInquire">查询</Button>
              <Button type="ghost" @click="handleReset('formItem')">重置</Button>
            </div>
          </Form-item>
          </Col>
        </Row>
      </Form>
    </div>

    <!--查询结果-->
    <div class="inquire-table">
      <div class="inquire-table-title">部署实例列表</div>
      <div class="table-wrap">
        <Table stripe size="small" :columns="columns" :data="filterDate"></Table>
        <div class="page-change">
          <Page :total="this.data.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div>

    </div>

    <!--弹出层-->
    <Modal
        title="分配公网IP"
        width="300"
        v-model="visible"
        :mask-closable="false"
        class-name="vertical-center-modal">
      <div class="from_wrap">
        <Form ref="formCustom" :model="ipForm" :rules="ruleValidate" :label-width="90">
          <Form-item label="IP类型:" prop="ip_type">
            <Select v-model="ipForm.ip_type" placeholder="请选择" @on-change="onSelectType" clearable>
              <Option value="online">上线IP</Option>
              <Option value="test">测试IP</Option>
            </Select>
          </Form-item>
          <Form-item label="公网IP地址:" prop="ip_uuid">

            <Select v-model="ipForm.ip_uuid" :placeholder="pubIpList.length ? '请选择' : '空'" clearable>

              <Option v-for="(item, index) in pubIpList" :value="item.uuid" :key="index">{{item.ip}}</Option>
            </Select>
          </Form-item>
          <Form-item label="内网IP地址:" prop="internal_ip">
            <Input v-model="ipForm.internal_ip" placeholder="192.168.2.1"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" @click.native="onCancel">取消</Button>
        <Button type="primary" :loading="loading" @click.native="onOk">确定</Button>
      </div>
    </Modal>

  </div>
</template>

<style lang="less" scoped>
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }

  .from_wrap {
    padding-right: 25px;
  }

  .table-wrap {
    max-width: 885px;
  }
</style>

<script>

  export default {
    data() {
      const validateIp = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入IP'));
        } else {
          if (!this.ipReg.test(value)) {
            callback(new Error('请输入正确IP地址'));
          } else {
            callback();
          }
        }
      }

      return {
        formItem: {         // 查询表单
          date: [],
          user_id: '',
          instance_name: ''
        },
        ruleValidate: {     // 查询表单验证
          date: [],
          user_id: [],
          instance_name: []
        },
        instanceList: [],   // 实例列表
        userList: [],       // 用户列表
        columns: [
          {
            title: '序号',
            key: 'index',
            align: 'center',
            width: 60,
            fixed: 'left'
          },
          {
            title: '部署实例名称',
            key: 'instance_name',
            align: 'center',
            width: 110,
            fixed: 'left',
            className: 'table-column-overflow'
          },
          {
            title: '用户',
            key: 'user_name',
            align: 'center',
            width: 100
          },
          {
            title: '上线IP',
            key: 'online_ip',
            align: 'center',
            width: 130
          },
          {
            title: '测试IP',
            key: 'test_ip',
            align: 'center',
            width: 130
          },
          {
            title: '内网IP',
            key: 'internal_ip',
            align: 'center',
            width: 130
          },
          {
            title: '分配日期',
            key: 'created_date',
            align: 'center',
            width: 140,
            render: (h, params) => {
              return h('span', params.row.created_date.slice(0, 16))
            }
          },
          {
            title: '操作',
            key: 'option',
            align: 'center',
            width: 70,
            fixed: 'right',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.visible = true
                    this.$refs['formCustom'].resetFields()
                      // 1. 显示已存在数据
                    this.$nextTick(() => {
                      if (params.row.online_ip) {
                        this.ipForm.ip_type = 'online'
                      } else if (params.row.test_ip) {
                        this.ipForm.ip_type = 'test'
                      }
                      this.ipForm.internal_ip = params.row.internal_ip

                      this.ipForm.instance_id = params.row.instance_id
                      this.index = params.index
                    })
                  }
                }
              }, '发布')
            }
          }

        ],
        data: [],
        filterDate: [],

        ipForm: {           // 发布数据
          instance_id: '',
          ip_type: '',
          ip_uuid: '',
          internal_ip: ''
        },
        ruleValidate: {     // 发布验证
          ip_type: [
            {required: true, message: '请选择IP类型', trigger: 'change'}
          ],
          ip_uuid: [
            {required: true, message: '请选择公网IP', trigger: 'change'}
          ],
          internal_ip: [
            {required: true, validator: validateIp, trigger: 'change'}
          ]
        },
        pubIpList: [],      // 公网IP列表
        visible: false,     // 弹窗状态
        loading: false,     // 按钮状态
        index: '',          // 记录修改的数据
        ipReg: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,

        pageSize: 10,
        num: 1
      }
    },

    created() {
      // 0. 部署实例列表
      this.onInquire()
      // 1. 用户列表
      this.getUserList()
      // 2. 实例名称
      this.getInstance().then(res => {
        this.instanceList = res
      })
    },

    methods: {

      onInquire() {
        let query = {}
        this.formItem.date[0] && (query.start_time = formatDate(this.formItem.date[0]))
        this.formItem.date[1] && (query.end_time = formatDate(this.formItem.date[1]))
        this.formItem.user_id && (query.user_id = this.formItem.user_id)
        this.formItem.instance_name && (query.instance_name = this.formItem.instance_name)

        this.getInstance(query).then(res => {
          res.forEach((item, index) => {
            item.index = index + 1
          })
          this.filterDate = this.mockTableData(res, this.pageSize, 1)
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields()
      },

      // 3. 选中类型后筛选公网IP
      onSelectType(val) {
        console.log('change')
        if (!val) {
          this.pubIpList = []
        } else {

          this.getPubIpList({ip_pool: val}).then(res => {

            this.pubIpList = res
              // 1. 显示已经存在的数据
            let currentObj = this.pubIpList.filter(item => {
              return (item.ip === this.filterDate[this.index].online_ip || item.ip === this.filterDate[this.index].test_ip)
            })
            if (currentObj.length) {
              this.ipForm.ip_uuid = currentObj[0].uuid
            }
          })
        }
      },

      // 4. 确定分配
      onOk() {
        this.$refs['formCustom'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$http.post('api/ip_manager/ip_publish', this.ipForm).then(res => {
              if (res.body.code === 200) {
                this.updateTable()
                this.$Message.success('发布成功')
              } else {
                this.$Message.error(res.body.result.msg)
              }
              this.loading = false
              this.visible = false
            }, err => {
              this.loading = false
              this.visible = false
              this.$Message.error(err.body.result.msg)
            })
          } else {
            this.$Message.error('表单验证失败!')
            return
          }
        })
      },
      onCancel() {
        this.visible = false
      },

      // 5. 更新列表
      updateTable() {
        let obj = this.pubIpList.filter(item => {
          return item.uuid === this.ipForm.ip_uuid
        })
        if (this.ipForm.ip_type === 'online') {
          this.filterDate[this.index].test_ip = ''
          this.filterDate[this.index].online_ip = obj[0].ip
        } else {
          this.filterDate[this.index].online_ip = ''
          this.filterDate[this.index].test_ip = obj[0].ip
        }
        this.filterDate[this.index].internal_ip = this.ipForm.internal_ip
      },

      getInstance(obj) {    // 获取实例列表
        return new Promise((resolve, reject) => {
          this.$http.get('api/deploy_instance/deploy_instances', {
            params: obj || {}
          }).then(res => {
            if (res.body.code === 200) {
              resolve(res.body.result.res)
            } else {
              this.$Message.error(res.body.result.msg)
            }
          }, err => {
            reject(err)
          })
        })
      },

      getPubIpList(query) {   // 获取公网ip列表
        return new Promise(resolve => {
          this.$http.get('api/ip_manager/ip_managers', {
            params: query || {}
          }).then((res) => {
            if (res.body.code === 200) {

              console.log('1',res.body.result.res)

              resolve(res.body.result.res)
            } else {
              this.$Message.error(res.body.result.msg)
            }
          }, (err) => {
            this.$Message.error(res.body.result.msg)
          })
        })
      },

      getUserList () {
        const url = 'api/user/users'
        this.$http.get(url).then(res => {
          if (res.body.code === 200) {
            this.userList = res.body.result.res
          } else {
            this.$Message.error(res.res.body.result.msg)
          }
        }, err => {
          console.log(err)
        })
      },

      // 分页
      changePage(val) {
        this.filterDate = this.mockTableData(this.data, this.pageSize, val)
      },
      changePageSize(val) {
        this.pageSize = val
        this.changePage(1)
      },
      mockTableData (originData, pageSize, index) {
        let data = [];
        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > originData.length ? originData.length : (num + pageSize)

        return originData.slice(num, maxNum)
      }
    }
  }
</script>