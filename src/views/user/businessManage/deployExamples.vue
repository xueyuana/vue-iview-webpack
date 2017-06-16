<template>
    <div class="">
        <Row>
            <Col span="2" class="c_font">创建日期：</Col>
            <Col span="4">
                <Date-picker type="date" placeholder="选择日期"></Date-picker>
            </Col>
            <Col span="1" class="c_font2">至</Col>
            <Col span="4">
                <Date-picker type="date" placeholder="选择日期"></Date-picker>
            </Col>
            <Col span="2" class="c_font">部署实例名称：</Col>
            <Col span="4">
                <Input v-model="value" placeholder="请输入..."></Input>
            </Col>
            <Col span="5"></Col>
        </Row>
        <div class="tjbssl">
            <Button @click="modal1 = true">添加部署实例</Button>
            <Modal
                v-model="modal1"
                title="添加部署实例"
                @on-ok="ok"
                @on-cancel="cancel">
                <p>名称：<Input v-model="message" placeholder="最多10个字符" style="width: 300px"></Input></p>
            </Modal>
        </div>
        <div class="bssl-list">部署实例列表：</div>
        <Table border :columns="columns7" :data="data6"></Table>
        <Page :total="100"></Page>
    </div>
</template>

<style scoped>
.ivu-row{
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #e4e4e4;
    background-image: linear-gradient(to bottom,#fff,#e4e4e4);
    border-radius: 10px;
}
.tjbssl Button{
    display: block;
    width: 150px;
    height: 30px;
    line-height: 30px;
    background: #2d8cf0;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-radius: 6px;
    padding: 0;
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

<script>
  export default {
      data () {
          return {
              message: '',
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
                      title: '创建时间',
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
                                          this.show(params.index);
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
                      name: '部署实例1',
                      number: '11',
                      time: '2017-06-05 15:00:00'
                  },
                  {
                      name: '部署实例2',
                      number: '22',
                      time: '2017-06-05 15:00:00'
                  },
                  {
                      name: '部署实例3',
                      number: '33',
                      time: '2017-06-05 15:00:00'
                  },
                  {
                    name: '部署实例4',
                    number: '44',
                    time: '2017-06-05 15:00:00'
                  }
              ]
          }
      },
      methods: {
          show (index) {
              this.$Modal.info({
                  title: '用户信息',
                  content: `年龄：${this.data6[index].name}<br>资源数量：${this.data6[index].number}<br>创建时间：${this.data6[index].time}`
              })
          },
          remove (index) {
              this.data6.splice(index, 1);
          },
          ok () {
              this.$Message.info('点击了确定');
              var stamp = new Date(),
                  year = stamp.getFullYear(),
                  month = (stamp.getMonth() + 1) > 9 ? (stamp.getMonth() + 1) : '0' + (stamp.getMonth() + 1),
                  day = stamp.getDate() > 9 ? stamp.getDate() : '0' + stamp.getDate(),
                  hour = stamp.getHours() > 9 ? stamp.getHours() : '0' + stamp.getHours(),
                  minute = stamp.getMinutes() > 9 ? stamp.getMinutes() : '0' + stamp.getMinutes(),
                  sec = stamp.getSeconds() > 9 ? stamp.getSeconds() : '0' + stamp.getSeconds()
              this.data6.push({
                  name: this.message,
                  number: '0',
                  time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + sec
              });
          },
          cancel () {
              this.$Message.info('点击了取消');
          }
      },
    computed: {}
  }
</script>