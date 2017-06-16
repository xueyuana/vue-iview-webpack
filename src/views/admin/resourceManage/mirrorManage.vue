<template>
  <div class="inquire">
    <!--查询条件-->
    <div class="inquire-form">
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="70" inline>
        <Row :gutter="16">
          <Col span="10">
            <Form-item label="日期:">
              <Row>
                <Col span="11">
                  <Form-item prop="start_time">
                    <Date-picker type="datetime" placeholder="起始日期" @on-change="formatCreateData"></Date-picker>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                  <Form-item prop="end_time">
                    <Date-picker type="datetime" placeholder="截止日期" @on-change="formatEndData"></Date-picker>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="镜像格式:" prop="image_format">
              <Input v-model="formItem.image_format" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="镜像名称:" prop="image_name">
              <Input v-model="formItem.image_name" placeholder="请输入"></Input>
            </Form-item>
          </Col>
        </Row>

        <Row>
          <Col span="20" style="min-height: 20px"></Col>
          <Col span="2">
            <Button type="primary" @click.native="onInquire">查询</Button>
          </Col>
          <Col span="2">
            <Button type="ghost" @click.native="handleReset('formItem')">重置</Button>
          </Col>
        </Row>
      </Form>
    </div>

    <!--查询结果-->
    <div class="inquire-table">
      <div>镜像列表：</div>
      <Table border size="small" :columns="columns" :data="filterDate"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="this.data.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .inquire {
    margin-top: 30px;
    &-form {
      padding: 15px;
      background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(228, 228, 228) 100%, rgb(228, 228, 228) 100%);
      border: 1px solid rgb(228, 228, 228);
      border-radius: 10px;
      &-project_name {
        width: 30%;
      }
      &-formStatus {
        width: 50%;
      }

      .btns-wrap {
        float: right;
      }
    }
    &-table {
      padding: 20px 20px;
    }
  }
</style>

<script>
  import baseUrl from 'tools/common.js'
  import {getStroage} from 'tools/cookieAction.js'

  export default {
    data() {
      return {
        formItem: {
          start_time: '',
          end_time: '',
          image_format: '',
          image_name: ''
        },
        ruleValidate: {
          start_time: [],
          end_time: [],
          image_format: [],
          image_name: [],
        },
        userInfo: '',
        columns:  [
          {
            title: '序号',
            type: 'index',
            align: 'center'
          },
          {
            title: '镜像名称',
            key: 'image_name',
            align: 'center'
          },
          {
            title: '尺寸',
            key: 'image_size',
            align: 'center'
          },
          {
            title: '镜像格式',
            key: 'image_size',
            align: 'center'
          },
          {
            title: '日期',
            key: 'created_time',
            align: 'center'
          }
        ],
        data: [],
        filterDate: [
          {
            image_name: 'Centos 7.2',
            image_size : '8G',
            image_format : 'qcow2',
            created_time : '2017-06-23 11:05'
          }
        ],
        pageSize: 10,
        num: 1
      }
    },

    mounted() {
//      this.onInquire()
    },

    methods: {
        // 查找
      onInquire() {

        let query = {}
        this.formItem.start_time && (query.start_time = this.formItem.start_time)
        this.formItem.end_time && (query.end_time = this.formItem.end_time)
        this.formItem.image_format && (query.image_format = this.formItem.image_format)
        this.formItem.image_name && (query.image_name = this.formItem.image_name)

        this.$http.get('api/image/images', {
          params: query
        }).then(res => {
          if (res.code === 200) {
            console.log('镜像列表', res)
            this.data = res.body
            this.filterDate = this.mockTableData(this.data, this.pageSize, 1)
          } else {
            this.$Message.error(res.result.msg)
          }
        }, err => {
          console.log('error', err)
          this.$Message.error(err.result.msg)
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields()
      },
        // 时间选择器
      formatCreateData(value) {
        this.formItem.start_time = value
      },
      onUnitChange(val) {
        this.formItem.image_name = ''
        this.getDeployList()
        this.onInquire()
      },
      onDeployChange(val) {
        if (!val) return
        this.onInquire()
      },
      formatEndData(value) {
        this.formItem.end_time = value
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
        let maxNum = (num + pageSize) > this.data.length ? this.data.length : (num + pageSize)
        for (let i = num; i < maxNum; i++) {
          data.push({
            id: originData[i].id,
            created_time: originData[i].created_time.substring(0, 16),
            image_name: originData[i].image_name,
            image_size: originData[i].image_size,
            image_format: originData[i].image_format
          })
        }
        return data;
      }
    }
  }
</script>