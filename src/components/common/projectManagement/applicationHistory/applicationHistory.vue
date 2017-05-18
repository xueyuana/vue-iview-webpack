<template lang="html">
  <div class="container">
    <div class="query">
      <div class="inside">
        <Form :label-width="100" label-positon="center" :model="formItem" ref="formItem">
          <Row :gutter="32">
            <Col span="5">
              <Form-item label="创建人：" prop="user">
                <Input placeholder="请输入" v-model="formItem.user"></Input>
              </Form-item>
            </Col>
            <Col span="10">
              <Form-item label="创建日期：" pop="date">
                <Row>
                  <Col span="11">
                    <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="10">
                    <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
                  </Col>
                </Row>
             </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="项目名称：" prop="name">
                <Input placeholder="请输入" v-model="formItem.name"></Input>
              </Form-item>
           </Col>
           <Col span="2">
              <Button type="primary">查询</Button>
           </Col>
        </Row>
        <Row :gutter="32">
          <Col span="5">
            <Form-item label="归属部门：" prop="group">
              <Select v-model="formItem.select">
                <Option v-for="item in list" :value="item.value" :key="item">{{ item.label }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="项目编号：" prop="id">
              <Input placeholder="请输入" v-model="formItem.id"></Input>
            </Form-item>
          </Col>
          <Col span="11">
            <div class="button">
              <Form-item>
                <Button type="ghost" @click="handleReset('formItem')">重置</Button>
              </Form-item>
          </div>
          </Col>
        </Row>
        </Form>
      </div>
    </div>
    <div class="data">
      <div class="table">
        <Table border :columns="columns" :data="data"></Table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'projectQuery',
  data () {
    return {
      columns: [
        {
          title: '项目名称',
          key: 'name',
          align: "center",
          // width: 300
        },
        {
          title: '创建日期',
          key: 'date',
          align: "center",
          // width: 300
        },
        {
          title: '创建人',
          key: 'user',
          align: "center",
          // width: 300
        },
        {
          title: '项目编号',
          key: 'itemid',
          align: "center",
          // width: 300
        },
        {
          title: '归属部门',
          key: 'group',
          align: "center",
          // width: 300
        }
      ],
      data: [
        {
          name: '项目一',
          date: '',
          user: '',
          itemid: '',
          group: ''
        }
      ],
      list: [
        {
          value: '1',
          label: '运维部'
        },
        {
          value: '2',
          label: '应用引擎部'
        },
        {
          value: '3',
          label: '大数据部'
        }
      ],
      formItem: {
          user: '',
          date: '',
          group: '',
          name: '',
          id: '',
          select:'',
          date: ''
      }
    }
  },
  methods: {
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>

<style lang="css">
.data {
  padding-top: 50px;
  /*padding-left: 100px;*/
  /*padding-right: 100px;*/
  width: 80%;
  height: 100%;
}
.inside {
  padding-top: 30px;
  padding-right: 50px;
  border: 1px solid #ccc;
  background: -webkit-gradient(linear, 0 0, 0 bottom, from(#FFFFFF), to(rgba(224, 224, 224, 0.8)));
}
.query {
   /*border: 1px solid black;*/
   padding-top: 100px;
   padding-left: 60px;
   padding-right: 60px;
   width: 80%;
}
.table {
   width: 88.1%;
   height: 80%;
   margin: 10px auto;
}
.button {
  float: right;
  /*padding-right: 48px;*/
}
</style>
