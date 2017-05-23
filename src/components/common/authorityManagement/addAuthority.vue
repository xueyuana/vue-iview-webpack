<template>
  <div class="autho">
    <Input v-model="searchData"
           icon="search"
           placeholder="请输入用户姓名或工号..."
           @on-click="onSearch"
           @on-enter="onSearch"
           style="width: 300px"></Input>

    <!--查询列表-->
    <div class="autho-list">
      <div class="title">用户列表</div>
      <div class="title btns">
        <Button-group>
          <Button type="dashed" v-for="(key, index) in btns" @click="onAction(index)" style="width: 80px">{{key}}</Button>
        </Button-group>
      </div>
      <Table border
             :columns="columns"
             :data="filterDate"
             @on-selection-change="onSelectChange"
             @on-select="onSelect"
             style="margin-top: -1px"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.searchList.length" :page-size="pageSize" :current="1" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>
    <Modal
        v-model="confirm"
        title="用户信息"
        width="400"
        class-name="vertical-center-modal">
      <Form class="autho-form" :model="formItem" label-position="left" :label-width="70">
        <Form-item label="员工号:">
          <Input v-model="formItem.jobNum" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="姓名:">
          <Input v-model="formItem.name" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="部门:">
          <Input v-model="formItem.belongs" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="添加权限:">
          <Select v-model="formItem.autho" placeholder="请选择">
            <Option value="管理员">管理员</Option>
            <Option value="普通用户">普通用户</Option>
          </Select>
        </Form-item>
        <Form-item label="创建时间:">
          <Input v-model="formItem.time" placeholder="请输入"></Input>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="onSubmit">提交</Button>
        <Button type="ghost" @click="onReset">重置</Button>
      </div>
    </Modal>
  </div>
</template>

<style lang="less">
  .autho {
    padding: 0 20px;
    &-list {
      margin-top: 20px;
      .title {
        color: #000;
        line-height: 25px;
        text-indent: 10px;
        background-color: #f2f2f2;
        border: 1px solid rgb(0, 157, 217);
      }
      .btns {
        text-indent: 0;
        border-color: #e3e8ee;
      }
    }
    &-form {
      padding: 0 20px;
    }

  }
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
      top: 0;
    }
  }

</style>

<script>
  export default {
    data() {
      return {
        searchData: '',
        btns: ['添加', '修改', '删除'],
        confirm: false,
        loading: false,
        pageSize: 10,
        columns: [
          {
            title: '序号',
            type: 'index',
            key: 'index',
            align: 'center'
          },
          {
            type: 'selection',
            title: '选择',
            align: 'center'
          },
          {
            title: '工号',
            key: 'jobNum',
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '所属部门',
            key: 'belongs',
            align: 'center'
          },
          {
            title: '用户名',
            key: 'userId',
            align: 'center'
          },
          {
            title: '权限',
            key: 'autho',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'time',
            align: 'center'
          }
        ],
        filterDate: [],
        searchList: [
          {
            jobNum: 147523,
            name: '赵瞬东',
            belongs: '运维部',
            userId: 101253,
            autho: '管理员',
            time: '2017-5-22'
          }
        ],
        selected: {},
        formItem: {}
      }
    },

    mounted() {
      this.filterDate = this.mockTableData(this.searchList, this.pageSize, 1)
    },

    methods: {
      // 搜索
      onSearch() {
        console.log(111)
      },
      // 功能按钮
      onAction(index) {
        switch (index) {
          case 0:
            break
          case 1:
            this.formItem = this.selected
            this.confirm = true
            break
          default:
            break
        }
      },
      // 选项
      onSelect(selection, row) {
        this.selected = row
      },
      onSelectChange(selection) {
        let len = selection.length
        if (len === 0) {
          this.selected = {}
        } else {
          this.selected = selection[len - 1]
        }
      },
      // 提交和重置
      onSubmit() {

      },
      onReset() {
        this.formItem = {}
      },
      // 分页
      changePage(val) {
        this.filterDate = this.mockTableData(this.searchList, this.pageSize, val)
      },
      changePageSize(val) {
        this.pageSize = val
        this.changePage(1)
      },
      mockTableData (originData, pageSize, index) {
        let data = []
        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > this.searchList.length ? this.searchList.length : (num + pageSize)
        for (let i = num; i < maxNum; i++) {
          data.push({
            jobNum: originData[i].jobNum,
            name: originData[i].name,
            belongs: originData[i].belongs,
            userId: originData[i].userId,
            autho: originData[i].autho,
            time: originData[i].time
          })
        }
        return data;
      }
    }
  }
</script>