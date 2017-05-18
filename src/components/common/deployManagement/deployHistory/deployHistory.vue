<template>
  <div class="inquire">
    <div class="inquire-form">
      <Form :model="formItem" :label-width="70">
        <Row :gutter="16">
          <Col span="5">
            <Form-item label="发起人:">
              <Input v-model="formItem.sponsor" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="10">
            <Form-item label="发起日期:">
              <Row>
                <Col span="11">
                <Date-picker type="date" placeholder="选择日期" v-model="formItem.fromDate"></Date-picker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                <Date-picker type="date" placeholder="选择日期" v-model="formItem.endDate"></Date-picker>
                </Col>
              </Row>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="部署名称:">
              <Input v-model="formItem.name" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="3"></Col>
        </Row>

        <Row :gutter="16">
          <Col span="21">
            <div class="inquire-form-belongs">
              <Form-item label="所属项目:">
                <Input v-model="formItem.belongs" placeholder="请输入"></Input>
              </Form-item>
            </div>
          </Col>
          <Col span="3">
            <Button type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="inquire-table">
      <Table border size="small" :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .inquire {
    margin-top: 30px;
    &-form {
      padding-top: 15px;
      background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(228, 228, 228) 100%, rgb(228, 228, 228) 100%);;
      border: 1px solid rgb(228, 228, 228);
      border-radius: 10px;
      &-belongs {
        width: 30%;
      }
      &-formStatus {
        width: 50%;
      }
    }
    &-table {
      padding: 20px 20px;
    }
  }
</style>

<script>
  export default {
    mounted() {
      console.log(this.$root.$data)
    },
    data() {
      return {
        formItem: {
          sponsor: '',
          fromDate: '',
          endDate: '',
          name: '',
          proStatus: '',
          formStatus: '',
          belongs: ''
        },
        columns1: [
          {
            title: '发起人',
            key: 'sponsor',
            align: 'center'
          },
          {
            title: '发起日期',
            key: 'fromDate',
            align: 'center'
          },
          {
            title: '部署名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '所属项目',
            key: 'belongs',
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
                      this.show(params.index)
                    }
                  }
                }, '查看')
              ]);
            }
          }
        ],
        data1: [
          {
            sponsor: '1',
            fromDate: '2',
            name: '3',
            belongs: '6'
          }
        ]
      }
    },
    computed: {},
    methods: {}
  }
</script>