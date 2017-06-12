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
    <div class="apply-content">
      <!--项目信息-->
      <div class="apply-content-title">部署单元信息：</div>
      <Form class="apply-content-form" label-position="left" :label-width="98">
        <Row :gutter="16">
          <Col class="apply-content-form-item" span="6">
            <Form-item label="所属部署单元:">
              <Input :value="project_name" disabled></Input>
            </Form-item>
          </Col>
          <Col class="apply-content-form-item" span="6">
            <Form-item label="部署实例名称:">
              <Input :value="resource_name" disabled></Input>
            </Form-item>
          </Col>
          <Col class="apply-content-form-item" span="6">
            <Form-item label="部署实例类型:">
              <Input :value="environment | filterEnv" disabled></Input>
            </Form-item>
          </Col>
          <Col class="apply-content-form-item" span="6">
            <Form-item label="部署编号:">
              <Input v-model="deploy_name"></Input>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Form-item label="部署详情:">
            <Input v-model="release_notes" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>
          </Form-item>
        </Row>
      </Form>

      <!--数据库-->
      <div class="apply-content-title">数据库：</div>
      <Form class="apply-content-select" label-position="left" :label-width="70">
        <Row :gutter="16">
          <Col class="apply-content-form-item" span="8">
          <Form-item label="执行目标:" style="width: 210px">
            <Input v-model="mysql_tag"></Input>
          </Form-item>
          </Col>
          <Col class="apply-content-form-item" span="8">
          <Form-item label="IP:" style="width: 210px">
            <Input v-model="mysql_ip"></Input>
          </Form-item>
          </Col>
        </Row>
        <Form-item label="执行脚本:">
          <Input v-model="mysql_context" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>
        </Form-item>
      </Form>
      <Form class="apply-content-select" label-position="left" :label-width="70">
        <Row :gutter="16">
          <Col class="apply-content-form-item" span="8">
          <Form-item label="执行目标:" style="width: 210px">
            <Input v-model="mongodb_tag"></Input>
          </Form-item>
          </Col>
          <Col class="apply-content-form-item" span="8">
          <Form-item label="IP:" style="width: 210px">
            <Input v-model="mongodb_ip"></Input>
          </Form-item>
          </Col>
        </Row>
        <Form-item label="执行脚本:">
          <Input v-model="mongodb_context" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>
        </Form-item>
      </Form>
      <Form class="apply-content-select" label-position="left" :label-width="70">
        <Row :gutter="16">
          <Col class="apply-content-form-item" span="8">
          <Form-item label="执行目标:" style="width: 210px">
            <Input v-model="redis_tag"></Input>
          </Form-item>
          </Col>
          <Col class="apply-content-form-item" span="8">
          <Form-item label="IP:" style="width: 210px">
            <Input v-model="redis_ip"></Input>
          </Form-item>
          </Col>
        </Row>
        <Form-item label="执行脚本:">
          <Input v-model="redis_context" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>
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
  import {getStroage} from 'tools/cookieAction.js'
//  import USER from 'tools/user.js'

  export default {
    data() {
      return {
        userInfo: '',
        activeIndex: 0,
        funcBtns: ['返回', '提交'],

        project_id: '',
        project_name: '',

        resource_id: '',
        resource_name: '',

        environment: '',

        deploy_name: '',
        release_notes: '',

        mongodb_context: '',
        mongodb_ip: '172.20.110',
        mongodb_tag: 'mongo',
        mysql_context: '',
        mysql_ip: '172.20.119',
        mysql_tag: 'mysql',
        redis_context: '',
        redis_ip: '172.20.120',
        redis_tag: 'redis',

        mirror: '',
      }
    },

    mounted() {
      this.userInfo = getStroage('userInfo')
      if (this.$route.query.id) {
        this.resource_id = this.$route.query.id
        this.getRrsource()
      } else {
        this.$Message.warning('没有获取到ID')
      }
    },

    filters: {
      filterEnv(val) {
        switch (val) {
          case 'develop':
            return '开发环境'
          case 'test':
            return '测试环境'
          case 'produce':
            return '生产环境'
          default:
            break
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
            this.onSubmit()
            break
        }
      },
      // 获取申请资源信息
      getRrsource() {
        const url = baseUrl.apihost + 'resource/' + this.resource_id
        this.$http.get(url, {emulateJSON: true}).then(res => {
          console.log("资源信息获取成功:", res)
          if (res.body.code === 200 && res.body.result.res == "success") {
            // 初始化数据
            this.initInfo(res.data.result.msg)
          }
        })
      },
      initInfo(data) {
        this.project_name = data.project
        this.project_id = data.project_id
        this.resource_name = data.resource_name
        this.environment = data.env
      },

      // 提交
      onSubmit() {
        if (!this.resource_name.trim()) {
          this.$Message.warning('部署实例名称不能为空')
          return
        }
        if (!this.project_name.trim()) {
          this.$Message.warning('所属部署单元不能为空')
          return
        }
        if (!this.mirror.trim()) {
          this.$Message.warning('镜像URL不能为空')
          return
        }

        let body = {
          "action": 'deploy_to_crp',
          "initiator": this.userInfo.username,

          "deploy_name": this.deploy_name,

          "resource_id": this.resource_id,
          "resource_name": this.resource_name,

          "project_id": this.project_id,
          "project_name": this.project_name,

          "environment": this.environment,

          "release_notes": this.release_notes,

          "mongodb_context": this.mongodb_context,
          "mongodb_tag": this.mongodb_tag,
          "mysql_context": this.mysql_context,
          "mysql_tag": this.mysql_tag,
          "redis_context": this.redis_context,
          "redis_tag": this.redis_tag,

          "app_image": this.mirror
        }

        console.log('POST数据', body)
        let url = baseUrl.apihost + 'deployment/deployments'
        this.$http.post(url, JSON.stringify(body)).then(res => {
          console.log('提交成功', res)
          this.$router.push({name: 'myResource'})
        }, err => {
          this.$Message.warning('错误')
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