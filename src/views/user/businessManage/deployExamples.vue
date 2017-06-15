<template>
    <div class="">
        <Row>
            <Col span="4">
                <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
            </Col>
            <Col span="4">
                <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
            </Col>
            <Col span="8">
                <Input v-model="value" placeholder="请输入..." style="width: 300px"></Input>
            </Col>
        </Row>
        <div class="tjbssl">
            <Button @click="modal1 = true">添加部署实例</Button>
            <Modal
                v-model="modal1"
                title="添加部署实例"
                @on-ok="ok"
                @on-cancel="cancel">
                <p>名称：<Input v-model="tjname" placeholder="最多10个字符" style="width: 300px"></Input></p>
            </Modal>
        </div>
        <div class="bssl-list">部署实例列表：</div>
        <Table border :columns="columns7" :data="data6"></Table>
        <Page :total="100"></Page>
    </div>
</template>

<style scoped>
.ivu-row{
    padding: 30px;
    border: 1px solid #ccc;
    margin-bottom: 30px;
    border-radius: 10px;
    background: #f8f8f9;
}
.tjbssl{
    padding-bottom: 30px;
}
.tjbssl Button{
    display: block;
    width: 150px;
    height: 40px;
    line-height: 40px;
    background: #2d8cf0;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-radius: 6px;
    padding: 0;
}
.bssl-list{
     height: 40px;
     line-height: 40px;
     font-size: 16px;
}
.ivu-page{
    padding-top: 30px;
}

</style>

<script>
  export default {
      data () {
          return {
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
              this.data6.push({
                  name: '部署实例s',
                  number: '10',
                  time: '2017-06-05 15:00:00'
              });
          },
          cancel () {
              this.$Message.info('点击了取消');
          }
      },
    computed: {}
  }
</script>