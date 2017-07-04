<template>
  <div class="inquire">
    <!--查询结果-->
    <div class="inquire-table">
      <div class="inquire-table-title font-large">部署区域列表：</div>
      <Table stripe size="small" :columns="columns" :data="filterDate"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.data1.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>

<script>
  import {getStroage} from 'tools/cookieAction.js'
  import {formatDate} from 'tools/formatDate.js'

  export default {
    data() {
      return {
        formItem: {
          date: [],
          image_name: ''
        },
        ruleValidate: {
          date: [],
          image_name: []
        },
        userInfo: '',
        columns: [
          {
            title: '序号',
            key: 'index',
            align: 'center',
            width: '100'
          },
          {
            title: '部署区域',
            key: 'pool_name',
            align: 'center',
            render: (h, params) => {
              return h('a', {
                on: {
                  click: () => {
                    this.$router.push({name: 'admin_poolDetails', query: {hosts: JSON.stringify(params.row.hosts)}})
                  }
                }
              }, params.row.pool_name)
            }
          },
          {
            title: '物理机',
            key: 'physical_machine',
            align: 'center',
            render: (h, params) => {
              return h('p', params.row.hosts.length)
            }
          },
          {
            title: '虚拟机总数',
            key: 'vms_count',
            align: 'center'
          }
        ],
        data1: [],
        filterDate: [],
        index: 0,
        pageSize: 10,
        num: 1
      }
    },

    created() {
      this.onInquire()
    },

    methods: {
        // 查找
      onInquire() {
        let url = 'api/pool/pools'
        this.$http.get(url).then(res => {
          if (res.body.code === 200) {
            this.data1 = res.body.result.res

            this.data1.forEach((item, index) => {
              item.index = index + 1
                // 查找对应 物理机添加到数据
              this.onVirtulCount(item, this.data1.length)
            })

          } else {
            this.$Message.error(res.body.result.msg)
          }
        }, err => {
          this.$Message.error(res.body.result.msg)
        })
      },
        // 查找虚拟机
      onVirtulCount(obj, len) {
        let url = 'api/pool/getHosts'
        let query = ''
        obj.hosts.forEach(item => {
          query += ('&host=' + item)
        })
        url += ('?' +  query.slice(1))

        this.$http.get(url).then(res => {
          if (res.body.code === 200) {

            let sum = 0
            res.body.result.res.forEach(item => {
              sum += item.running_vms
            })
            obj.vms_count = sum

            this.index ++
            if (this.index == len) {
              this.filterDate = this.mockTableData(this.data1, this.pageSize, 1)
            }

          } else {
            this.$Message.error(res.body.result.msg)
          }
        }, err => {
          this.$Message.error(res.body.result.msg)
        })
      },

      handleReset(name) {
        this.$refs[name].resetFields()
      },

        // 分页
      changePage(val) {
        this.filterDate = this.mockTableData(this.data1, this.pageSize, val)
      },
      changePageSize(val) {
        this.pageSize = val
        this.changePage(1)
      },
      mockTableData (originData, pageSize, index) {
        let data = [];
        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > this.data1.length ? this.data1.length : (num + pageSize)

        return originData.slice(num, maxNum)
      }
    }
  }
</script>