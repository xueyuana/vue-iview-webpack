<template>
  <div class="inquire">
    <!--查询条件-->
    <div class="inquire-form">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
        <Row :gutter="16">
          <Col span="12">
            <Form-item label="操作系统名称:" prop="image_name">
              <Select clearable v-model="formItem.image_name" style="width: 150px">
                <Option v-for="item in mirrorImage" :value="item.image_name" :key="item">{{ item.image_name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="12">
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
      <div class="inquire-table-title">操作系统列表：</div>
      <Table stripe size="small" :columns="columns" :data="filterDate"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.data.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="less">
  .a {
    text-overflow: ellipsis;
  }
</style>

<script>

  export default {
    data() {
      return {
        formItem: {
          image_name: ''
        },
        ruleValidate: {
          date: [],
          image_format: [],
          image_name: []
        },
        mirrorImage: [],
        columns: [
          {
            title: '序号',
            key: 'index',
            align: 'center',
            width: '100'
          },
          {
            title: '操作系统名称',
            key: 'image_name',
            align: 'center',
            className: 'table-column-overflow',
            render: (h, params) => {
              return h('span', {
                attrs: {
                  title: params.row.image_name
                }
              }, params.row.image_name)
            }
          },
          {
            title: '操作系统尺寸',
            key: 'image_size',
            align: 'center',
            render: (h, params) => {
              let count = parseInt(params.row.image_size / 1024 / 1024)
              return h('p', count > 1024 ? (count/1024).toFixed(2) + ' G' : count + ' M')
            }
          },
          {
            title: '操作系统格式',
            key: 'image_format',
            align: 'center'
          },
          {
            title: '日期',
            key: 'created_time',
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.created_time.replace(/[T]/g, ' ').substring(0, 16))
            }
          }
        ],
        data: [],
        filterDate: [],
        pageSize: 10,
        num: 1
      }
    },

    created() {
      this.onInquire()
      this.getImage ()
    },

    methods: {
      // 查找
      onInquire() {
        let query = {}
        this.formItem.image_name && (query.image_name = this.formItem.image_name)

        this.$http.get('api/image/images', {
          params: query
        }).then(res => {
          console.log('操作系统列表', res)
          if (res.body.code === 200) {
            this.data = res.body.result.res
            this.data.forEach((item, index) => {
              item.index = index + 1
            })
            this.filterDate = this.mockTableData(this.data, this.pageSize, 1)
            this.num = 1
          } else {
            this.$Message.error(res.body.result.msg)
          }
        }, err => {
          console.log('error', err)
          this.$Message.error(err.body.result.msg)
        })
      },

      handleReset(name) {
        this.$refs[name].resetFields()
        this.onInquire()
      },

      getImage () {
        const url = 'api/image/images'
        this.$http.get(url).then(res => {
          if (res.body.code === 200) {
            this.mirrorImage = res.body.result.res
          }
        }, err => {
          console.log(err)
        })
      },

      // 分页
      changePage(val) {
        this.filterDate = this.mockTableData(this.data, this.pageSize, val)
        this.num = val
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