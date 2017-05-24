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
          <Button type="dashed" v-for="(key, index) in btns" @click="onAction(index)" style="width: 80px">{{key}}
          </Button>
        </Button-group>
      </div>
      <Table border
             :columns="columns"
             :data="filterDate"
             @on-selection-change="onSelectChange"
             style="margin-top: -1px"></Table>
      <div style="margin: 10px; overflow: hidden">
        <div style="float: right;">
          <Page :total="this.searchList.length"
                :page-size="pageSize"
                :current="1"
                show-sizer
                @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>
    <!--弹窗-->
    <Modal
        v-model="confirm"
        title="用户信息"
        width="400"
        class-username="vertical-center-modal">
      <Form class="autho-form" :model="formItem" label-position="left" :label-width="70">
        <Form-item label="员工号:">
          <Input v-model="formItem.id" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="姓名:">
          <Input v-model="formItem.username" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="部门:">
          <Input v-model="formItem.department" placeholder="请输入"></Input>
        </Form-item>
        <Form-item label="添加权限:">
          <Select v-model="formItem.autho" placeholder="请选择权限">
            <Option value="True">管理员</Option>
            <Option value="False">普通用户</Option>
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

  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }

</style>

<script>
  import baseUrl from 'tools/common.js'

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
            key: 'id',
            align: 'center'
          },
          {
            title: '姓名',
            key: 'username',
            align: 'center'
          },
          {
            title: '所属部门',
            key: 'department',
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
        searchList: [],
        selected: {},
        formItem: {},
        index: ''
      }
    },

    mounted() {
      this.getUserList()
    },

    methods: {
      // 获取用户列表
      getUserList() {
        let url = baseUrl.apihost + (this.searchData ? ('auth/admindetail/' + this.searchData) : 'auth/all_user')
        this.$http.get(url).then(data => {
          console.log('success', data)
          this.searchList = data.body.map(item => {
            return {
              id: item.id,
              username: item.username,
              department: item.department,
              autho: item.is_admin ? '管理员' : '普通用户',
              time: item.created_time.substring(0, 10)
            }
          })
          this.filterDate = this.mockTableData(this.searchList, this.pageSize, 1)
        }, err => {
          console.log('error', err)
        })
      },
      // 搜索
      onSearch() {
        this.getUserList()
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
      onSelectChange(selection) {
        let len = selection.length
        if (len === 0) {
          this.selected = {}
        } else {
          this.selected = selection[len - 1]
          this.indexOfSelected(this.selected)
        }
      },
      // 提交和重置
      onSubmit() {
        if (this.formItem.id) {
          this.loading = true
          let url = baseUrl.apihost + 'auth/admindetail/' + this.formItem.id
          let params = {
            'admin_user': this.formItem.autho
          }
          console.log(JSON.stringify(params))
          this.$http.put(url, JSON.stringify(params), {emulateJSON:true}).then(data => {
            console.log(data)
            this.filterDate[this.index].autho = data.body.is_admin ? '管理员' : '普通用户'
            this.loading = false
            this.confirm = false
          }, err => {
            console.log('error', err)
          })
        }
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
            id: originData[i].id,
            username: originData[i].username,
            department: originData[i].department,
            userId: originData[i].userId,
            autho: originData[i].autho,
            time: originData[i].time
          })
        }
        return data;
      },
      indexOfSelected(selected) {
        for (let i=0;i<this.filterDate.length;i++) {
          if (this.filterDate[i].id === selected.id && this.filterDate[i].autho == selected.autho) {
            this.index = i
          }
        }
        console.log(this.index)
      }
    }
  }
</script>