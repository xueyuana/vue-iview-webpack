<template>
  <div class="my-resource">
    <div class="query-form">
      <div class="queryInformation">
        <div class="item date-picker">
          <span class="title">申请日期</span>
          <Date-picker type="daterange"  placeholder="选择日期" style="width: 200px"></Date-picker>
        </div>
        <div class="item">
          <span class="title">虚拟机名称</span>
          <Input v-model="value" placeholder="请输入..." style="width: 200px"></Input>
        </div>

        <div class="item">
          <span class="title">资源池</span>
          <Select v-model="model1" style="width:200px">
            <Option v-for="item in resourcePool" :value="item.value" :key="item">{{ item.value }}</Option>
          </Select>
        </div>

        <div class="item">
          <span class="title">状态</span>
          <Select v-model="model1" style="width:200px">
            <Option v-for="item in status" :value="item.value" :key="item">{{ item.value }}</Option>
          </Select>
        </div>
        <div class="item">
          <span class="title">部署实例</span>
          <Select v-model="model1" style="width:200px">
            <Option v-for="item in deployExample" :value="item.value" :key="item" >{{ item.value }} </Option>
          </Select>
        </div>
      </div>
      <div class="query">
        <Button type="primary" >查询</Button>
        <Button class="reset" type="ghost" >重置</Button>
      </div>
    </div>
    <div class="header">资源列表：</div>
    <table>
      <thead>
        <tr>
          <th v-for="item in columns" :key="item.key">{{item.title}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in queryResult" >
          <td>{{index + 1}}</td>
          <td>{{item.virtualMachine}}</td>
          <td>{{item.deployExample}}</td>
          <td>{{item.ip}}</td>
          <td>{{item.mirrorImage}}</td>
          <td>{{item.physicalMachine}}</td>
          <td>{{item.resourcePool}}</td>
          <td>{{item.standard}}</td>
          <td> {{item.status}} </td>
          <td>
            <Dropdown>
              <a href="javascript:void(0)">
                更多
                <Icon type="arrow-down-b"></Icon>
              </a>
              <Dropdown-menu slot="list">
                <Dropdown-item v-for="item in operationList[index]" @click.native="clicknative($event,index)" :selected="item.selected">{{ item.value }}</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </td>
        </tr>

      </tbody>

    </table>
    <div class="page">
      <Button class="pre">上一页</Button>
      <Button>下一页</Button>
    </div>

  </div>


</template>
<script>
  export default {
    data () {
      return {
        status: [
          {
            value: '运行',
          },
          {
            value: '关机'
          },
          {
            value: '异常'
          }
        ],
        deployExample: [
          {
            value: '实例1'
          },
          {
            value: '实例2'
          }
        ],
        resourcePool: [
          {
            value: '资源池1',
          },
          {
            value: '资源池2'
          }
        ],
        operationList: [],
        value: '',
        model1: '',
        model2: '',
        columns: [
          {
            title: '序号',
            key: 'number'
          },
          {
            title: '虚拟机名称',
            key: 'virtualMachine'
          },
          {
            title: '部署实例',
            key: 'deployExample'
          },
          {
            title: 'IP',
            key: 'ip'
          },
          {
            title: '镜像名称',
            key: 'mirrorImage'
          },
          {
            title: '所在物理机',
            key: 'physicalMachine'
          },
          {
            title: '所属资源池',
            key: 'resourcePool'
          },
          {
            title: '规格',
            key: 'standard'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: '操作',
            key: 'operate',
            render: (h,params) => {
              var self = this;
              return h('Select',{
                props: {
                  size: 'small',
                  clearable: true
                },
                domProps: {
                  value: self.model2
                },
                on: {
                  'on-change': (event) => {
                    self.model2 = event

                    if(event == '关机' || event == '重启' || event == '删除'){
                      self.$Modal.info({
                        title: '确认',
                        content: '<p>确认选择'+event+'吗</p>',
                        onOk: () => {
                          console.log('确认')
                        }

                      })
                    }
                  }
                }
              },this.approvalStatus.map(function (item) {
                return h('Option',{
                  attrs: {
                    value: item.value,
                    key: item
                  }
                },item.value)
              }))
            }
          }
        ],
        queryResult: [
          {
            number: 1,
            virtualMachine: '虚拟机1',
            deployExample: '部署实例1',
            ip: '127.29.11.200',
            mirrorImage: 'Centos 7.2',
            physicalMachine: '物理机1',
            resourcePool: 'DMZ',
            standard: '2C/2G/200G',
            status: '运行'
          }

        ]

      }
    },
    created () {
        this.queryResult.forEach((item,index) => {
          switch (item.status) {
            case '运行': this.operationList.push([
              {
                value: '重启',
                selected: false
              },
              {
                value: '关机',
                selected: false
              },
              {
                value: 'VNC',
                selected: false
              }
            ])
              break
            case '异常': this.operationList.push([
              {
                value: '启动',
                selected: false
              },
              {
                value: '开机',
                selected: false
              },
              {
                value: 'VNC',
                selected: false
              }
            ])
              break
            case '开机': this.operationList.push([
              {
                value: '关机',
                selected: false
              },
              {
                value: '重启',
                selected: false
              },
              {
                value: 'VNC',
                selected: false
              }
            ])
              break
          }
        })

    },
    methods: {
      clicknative (event,index) {
        //index指的是行数
        this.operationList[index].forEach((item,index) => {
          if(item.value == event.target.firstChild.data) {
            item.selected = true
          }else {
            item.selected = false
          }
        })


      }
    }
  }

</script>
<style scoped>
  .my-resource {
    width: 100%;
  }
  .queryInformation{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

  }
  .query-form {
    width: 100%;
    border: 1px solid #e4e4e4;
    background-image: linear-gradient(to bottom,#fff,#e4e4e4);
    border-radius: 10px;
    padding-bottom: 10px;
  }
  .date-picker {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .item {
    margin: 10px 5px;
  }
  .title {
    display: inline-block;
    width: 80px;
    margin-right: 10px;
    text-align: center;
  }
  .query {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 26px;
    box-sizing: border-box;
  }
  .reset {
    margin-left: 20px;
  }
  .page {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .pre {
    margin-right: 20px;
  }
  .header {
    margin: 30px 0 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  table td,th{
    text-align: center;
    border: 1px solid #dddee1;
  }
  table tr {
    height: 50px;

  }
  table thead tr{
    background-color: #f8f8f9;
  }
  table tbody tr:hover {
    background-color: #F3FAFF;
  }


</style>
