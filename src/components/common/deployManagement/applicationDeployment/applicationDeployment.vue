<template>
  <div class="apply">
    <!--功能按钮-->
    <div class="apply-button">
      <div>
        <Button class="apply-button-item"
                type="info" size="small"
                v-for="(item, index) in funcBtns"
                @click="onLink(index)">{{item}}


        </Button>
      </div>
    </div>
    <!--内容区-->
    <div class="apply-content">
      <!--项目信息-->
      <div class="apply-content-title">部署单元信息：</div>
      <Form class="apply-content-form" label-position="left" :label-width="95">
        <Row :gutter="16">
          <Col class="apply-content-form-item" span="8">
          <Form-item label="部署实例名称:">
            <Input v-model="deploy_name" disabled></Input>
          </Form-item>
          </Col>
          <Col class="apply-content-form-item" span="8">
          <Form-item label="所属部署单元:">
            <Input v-model="project_name" disabled></Input>
            <!--<Select class="apply-content-form-select" v-model="project_name"-->
                    <!--:placeholder="project_list.length? '请选择' : '空'">-->
              <!--<Option v-for="key in project_list" :value="key.item_name">{{key.item_name}}</Option>-->
            <!--</Select>-->
          </Form-item>
          </Col>
          <Col class="apply-content-form-item" span="8">
          <Form-item label="部署实例类型:">
            <Input :value="environment | filterEnv" disabled></Input>
            <!--<Select class="apply-content-form-select" v-model="environment">-->
              <!--<Option value="develop">开发环境</Option>-->
              <!--<Option value="test">测试环境</Option>-->
              <!--<Option value="product">生产环境</Option>-->
            <!--</Select>-->
          </Form-item>
          </Col>
        </Row>
        <Row>
          <Form-item label="部署详情:">
            <Input v-model="deploy_details" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>
          </Form-item>
        </Row>
      </Form>

      <!--数据库-->
      <div class="apply-content-title">数据库：</div>
      <Form class="apply-content-select" label-position="left" :label-width="70">
        <Form-item label="执行目标:" style="width: 210px">
          <Select v-model="exec_tag" placeholder="请选择">
            <Option value="mysql-node1">mysql-node1</Option>
            <Option value="mysql-node2">mysql-node2</Option>
          </Select>
        </Form-item>
        <Form-item label="执行脚本:">
          <Input v-model="exec_context" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>
        </Form-item>
      </Form>

      <!--应用包-->
      <div class="apply-content-title">应用包：</div>
      <Form class="apply-content-mirror" label-position="left" :label-width="70">
        <Form-item label="镜像:">
          <Input v-model="mirror" placeholder="请输入镜像URL" style="min-width: 250px"></Input>
        </Form-item>
        <Button type="primary" @click="onTest">检测</Button>
      </Form>
      <div>
        <!--切换环境-->
        <!--<Tabs type="card" @on-click="onTabs">-->
        <!--<Tab-pane label="开发环境" name="dev">-->
        <!--&lt;!&ndash;项目信息&ndash;&gt;-->
        <!--<div class="apply-content-title">部署单元信息：</div>-->
        <!--<Form class="apply-content-form" label-position="left" :label-width="95">-->
        <!--<Row :gutter="160">-->
        <!--<Col class="apply-content-form-item" span="12">-->
        <!--<Form-item label="部署名称:">-->
        <!--<Input v-model="deploy_name"></Input>-->
        <!--</Form-item>-->
        <!--</Col>-->
        <!--<Col class="apply-content-form-item" span="12">-->
        <!--<Form-item label="所属部署单元:">-->
        <!--<Select class="apply-content-form-select" v-model="project_name"-->
        <!--:placeholder="project_list.length? '请选择' : '空'">-->
        <!--<Option v-for="key in project_list" :value="key.item_name">{{key.item_name}}</Option>-->
        <!--</Select>-->
        <!--</Form-item>-->
        <!--</Col>-->
        <!--</Row>-->
        <!--<Row>-->
        <!--<Form-item label="部署详情:">-->
        <!--<Input v-model="deploy_details" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>-->
        <!--</Form-item>-->
        <!--</Row>-->
        <!--</Form>-->

        <!--&lt;!&ndash;数据库&ndash;&gt;-->
        <!--<div class="apply-content-title">数据库：</div>-->
        <!--<Form class="apply-content-select" label-position="left" :label-width="70">-->
        <!--<Form-item label="执行目标:" style="width: 210px">-->
        <!--<Select v-model="exec_tag" placeholder="请选择">-->
        <!--<Option value="mysql-node1">mysql-node1</Option>-->
        <!--<Option value="mysql-node2">mysql-node2</Option>-->
        <!--</Select>-->
        <!--</Form-item>-->
        <!--<Form-item label="执行脚本:">-->
        <!--<Input v-model="exec_context" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>-->
        <!--</Form-item>-->
        <!--</Form>-->

        <!--&lt;!&ndash;应用包&ndash;&gt;-->
        <!--<div class="apply-content-title">应用包：</div>-->
        <!--<Form class="apply-content-mirror" label-position="left" :label-width="70">-->
        <!--<Form-item label="镜像:">-->
        <!--<Input v-model="mirror" placeholder="请输入镜像URL" style="min-width: 250px"></Input>-->
        <!--</Form-item>-->
        <!--<Button type="primary" @click="onTest">检测</Button>-->
        <!--</Form>-->
        <!--</Tab-pane>-->
        <!--<Tab-pane label="测试环境" name="test">-->
        <!--&lt;!&ndash;项目信息&ndash;&gt;-->
        <!--<div class="apply-content-title">部署单元信息：</div>-->
        <!--<Form class="apply-content-form" label-position="left" :label-width="95">-->
        <!--<Row :gutter="160">-->
        <!--<Col class="apply-content-form-item" span="12">-->
        <!--<Form-item label="部署名称:">-->
        <!--<Input v-model="deploy_name"></Input>-->
        <!--</Form-item>-->
        <!--</Col>-->
        <!--<Col class="apply-content-form-item" span="12">-->
        <!--<Form-item label="所属部署单元:">-->
        <!--<Select class="apply-content-form-select" v-model="project_name"-->
        <!--:placeholder="project_list.length? '请选择' : '空'">-->
        <!--<Option v-for="key in project_list" :value="key.item_name">{{key.item_name}}</Option>-->
        <!--</Select>-->
        <!--</Form-item>-->
        <!--</Col>-->
        <!--</Row>-->
        <!--<Row>-->
        <!--<Form-item label="部署详情:">-->
        <!--<Input v-model="deploy_details" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>-->
        <!--</Form-item>-->
        <!--</Row>-->
        <!--</Form>-->

        <!--&lt;!&ndash;数据库&ndash;&gt;-->
        <!--<div class="apply-content-title">数据库：</div>-->
        <!--<Form class="apply-content-select" label-position="left" :label-width="70">-->
        <!--<Form-item label="执行目标:" style="width: 210px">-->
        <!--<Select v-model="exec_tag" placeholder="请选择">-->
        <!--<Option value="mysql-node1">mysql-node1</Option>-->
        <!--<Option value="mysql-node2">mysql-node2</Option>-->
        <!--</Select>-->
        <!--</Form-item>-->
        <!--<Form-item label="执行脚本:">-->
        <!--<Input v-model="exec_context" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>-->
        <!--</Form-item>-->
        <!--</Form>-->

        <!--&lt;!&ndash;应用包&ndash;&gt;-->
        <!--<div class="apply-content-title">应用包：</div>-->
        <!--<Form class="apply-content-mirror" label-position="left" :label-width="70">-->
        <!--<Form-item label="镜像:">-->
        <!--<Input v-model="mirror" placeholder="请输入镜像URL" style="min-width: 250px"></Input>-->
        <!--</Form-item>-->
        <!--<Button type="primary" @click="onTest">检测</Button>-->
        <!--</Form>-->
        <!--</Tab-pane>-->
        <!--<Tab-pane label="生产环境" name="product">-->
        <!--&lt;!&ndash;项目信息&ndash;&gt;-->
        <!--<div class="apply-content-title">部署单元信息：</div>-->
        <!--<Form class="apply-content-form" label-position="left" :label-width="95">-->
        <!--<Row :gutter="160">-->
        <!--<Col class="apply-content-form-item" span="12">-->
        <!--<Form-item label="部署名称:">-->
        <!--<Input v-model="deploy_name"></Input>-->
        <!--</Form-item>-->
        <!--</Col>-->
        <!--<Col class="apply-content-form-item" span="12">-->
        <!--<Form-item label="所属部署单元:">-->
        <!--<Select class="apply-content-form-select" v-model="project_name"-->
        <!--:placeholder="project_list.length? '请选择' : '空'">-->
        <!--<Option v-for="key in project_list" :value="key.item_name">{{key.item_name}}</Option>-->
        <!--</Select>-->
        <!--</Form-item>-->
        <!--</Col>-->
        <!--</Row>-->
        <!--<Row>-->
        <!--<Form-item label="部署详情:">-->
        <!--<Input v-model="deploy_details" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>-->
        <!--</Form-item>-->
        <!--</Row>-->
        <!--</Form>-->

        <!--&lt;!&ndash;数据库&ndash;&gt;-->
        <!--<div class="apply-content-title">数据库：</div>-->
        <!--<Form class="apply-content-select" label-position="left" :label-width="70">-->
        <!--<Form-item label="执行目标:" style="width: 210px">-->
        <!--<Select v-model="exec_tag" placeholder="请选择">-->
        <!--<Option value="mysql-node1">mysql-node1</Option>-->
        <!--<Option value="mysql-node2">mysql-node2</Option>-->
        <!--</Select>-->
        <!--</Form-item>-->
        <!--<Form-item label="执行脚本:">-->
        <!--<Input v-model="exec_context" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>-->
        <!--</Form-item>-->
        <!--</Form>-->

        <!--&lt;!&ndash;应用包&ndash;&gt;-->
        <!--<div class="apply-content-title">应用包：</div>-->
        <!--<Form class="apply-content-mirror" label-position="left" :label-width="70">-->
        <!--<Form-item label="镜像:">-->
        <!--<Input v-model="mirror" placeholder="请输入镜像URL" style="min-width: 250px"></Input>-->
        <!--</Form-item>-->
        <!--<Button type="primary" @click="onTest">检测</Button>-->
        <!--</Form>-->
        <!--</Tab-pane>-->
        <!--</Tabs>-->
      </div>

    </div>
  </div>

</template>

<style lang="less" scoped>
  .apply {
    width: 100%;
    padding: 10px 30px;
    &-button {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      &-item {
        margin-right: 10px;
      }
    }
    &-content {
      width: 100%;
      color: #000;
      &-button {
        margin-right: 10px;
      }
      &-title {
        width: 100%;
        height: 20px;
        margin-top: 5px;
        padding-left: 5px;
        background-color: rgba(242, 242, 242, 1);
        font-size: 14px;
        line-height: 20px;
      }
      &-form {
        margin-top: 10px;
        &-item {
          display: flex;
        }
        &-select {
          width: 150px;
        }
      }
      &-select {
        margin-top: 10px;
      }
      &-mirror {
        margin-top: 10px;
        width: 400px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      &-upload {
        display: flex;
        padding-top: 20px;
        &-name {
          margin-right: 20px;
        }

      }
    }

  }
</style>

<script>
  import baseUrl from 'tools/common.js'
  import USER from 'tools/user.js'

  export default {
    data() {
      return {
        activeIndex: 0,
        funcBtns: ['返回', '提交', '保存到草稿'],
        project_list: [],
        environment: 'dev',
        resource_id: '',
        deploy_name: '',
        project_name: '',
        project_id: '',
        deploy_details: '',
        exec_tag: 'mysql-node1',
        exec_context: '',
        mirror: ''
      }
    },

    mounted() {
      this.getProjectList()

      this.resource_id = this.$route.query.id || '85574524-41f3-11e7-ac05-fa163e9474c9'
      this.getRrsource()
    },

    filters: {
      filterEnv(val) {
        switch (val) {
          case 'develop':
            return '开发环境'
          case 'test':
            return '测试环境'
          default:
            return '生产环境'
        }
      }
    },

    methods: {
      onLink(index) {
        switch (index) {
          case 0:
            this.$router.go(-1)
            break
          default:
            this.onSubmit(index)
            break
        }
      },
      // 获取申请资源信息
      getRrsource() {
//        if (this.resource_id) {
          const url = baseUrl.apihost + 'resource/' + '85574524-41f3-11e7-ac05-fa163e9474c9'
          this.$http.get(url, {emulateJSON: true}).then(res => {
            console.log("获取申请资源信息:", res)
            if (res.body.code === 200 && res.body.result.res == "success") {
              this.initInfo(res.data.result.msg)
            }
          })
//        }
      },
      initInfo(data) {
        this.project_name = data.project
        this.project_id = data.project_id
        this.deploy_name = data.domain
        this.environment = data.env
      },
      // 环境切换
      onTabs(name) {
        this.environment = name
      },
      // 保存到草稿 和 提交
      onSubmit(index) {
        if (!this.deploy_name.trim()) {
          this.$Message.warning('部署名称不能为空')
        } else if (!this.project_name.trim()) {
          this.$Message.warning('所属部署单元不能为空')
        } else if (!this.exec_tag.trim()) {
          this.$Message.warning('执行目标不能为空')
        } else if (!this.mirror.trim()) {
          this.$Message.warning('镜像URL不能为空')
        } else {
          let body = {
            "action": '',
            "initiator": USER.username,
            "deploy_name": this.deploy_name,
            "resource_id": this.resource_id,
            "resource_name": this.deploy_name,
            "project_id": this.project_id,
            "project_name": this.project_name,
            "environment": this.environment,
            "exec_tag": this.exec_tag,
            "exec_context": this.exec_context,
            "app_image": this.mirror
          }
          if (index === 1) {  // 提交
            body.action = "deploy_to_crp"
          } else if (index === 2) { // 保存到草稿
            body.action = "save_to_db"
          }
          console.log(body)
          let url = 'http://172.31.30.43:5000/api/' + 'deployment/deployments'
          this.$http.post(url, body, {method: 'POST'}).then(res => {
            console.log('保存到草稿', res)
            if (index === 1) {
              this.$router.push({name: 'deployHistory'})
            } else if (index === 2) {
              this.$router.push({name: 'myResource'})
            }
          }, err => {
            console.log('error', err)
          })
        }
      },
      // 请求部署单元列表
      getProjectList() {
        let url = baseUrl.apihost + 'iteminfo/iteminfoes/local/' + USER.user_id

        this.$http.get(url).then(data => {
          console.log('ProjectList', data)
          this.project_list = data.body.result.res
        }, err => {
          console.log('error', err)
        })
      },
      // 检查镜像url
      onTest() {
        let url = baseUrl.apihost + ''
        this.$http.post(url, {}).then(data => {
          this.$Message.warning('此镜像可用')
        }, err => {
          this.$Message.warning('此镜像可用')
        })
      }
    }
  }
</script>