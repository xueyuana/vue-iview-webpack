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
      <div>
        <Button class="apply-content-button"
                :class="{active: activeIndex === index}"
                v-for="(item, index) in tabs"
                @click="onTabs(index)"
                size="large"
                shape="circle">{{item}}

        </Button>
      </div>

      <!--项目信息-->
      <div class="apply-content-title">项目信息：</div>
      <Form class="apply-content-form" label-position="right" :label-width="70">
        <Row :gutter="160">
          <Col class="apply-content-form-item" span="12">
          <Form-item label="部署名称:">
            <Input v-model="deploy_name"></Input>
          </Form-item>
          </Col>
          <Col class="apply-content-form-item" span="12">
          <Form-item label="所属项目:">
            <Select v-model="project_name" placeholder="请选择">
              <Option value="名片测试项目">用户测试项目</Option>
              <Option value="名片测试项目">名片测试项目</Option>
            </Select>
          </Form-item>
          </Col>
        </Row>

      </Form>

      <!--数据库-->
      <div class="apply-content-title">数据库：</div>
      <Form class="apply-content-select" label-position="left" :label-width="70">
        <Form-item label="执行目标:">
          <Select v-model="exec_tag" placeholder="请选择">
            <Option value="mysql-node1">mysql-node1</Option>
            <Option value="mysql-node2">mysql-node2</Option>
          </Select>
        </Form-item>
      </Form>
      <Form class="apply-content-textarea" label-position="left" :label-width="70">
        <Form-item label="执行脚本:">
          <Input v-model="exec_context" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>
        </Form-item>
      </Form>
      <!--应用包-->
      <div class="apply-content-title">应用包：</div>
      <Form class="apply-content-mirror" label-position="left" :label-width="70">
        <Form-item label="镜像:">
          <Input v-model="mirror" placeholder="请输入镜像URL"></Input>
        </Form-item>
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
      }
      &-select {
        margin-top: 10px;
        width: 210px;
      }
      &-mirror {
        margin-top: 10px;
        width: 400px;
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

  import {userinfo} from 'tools/user.js'
  console.log(userinfo)

  export default {
    data() {
      return {
        activeIndex: 0,
        funcBtns: ['返回', '提交', '保存到草稿'],
        tabs: ['开发环境', '测试环境', '生产环境'],
        environment: 'dev',
        deploy_name: '',
        project_name: '',
        deploy_id: '',
        exec_tag: 'mysql-node1',
        exec_context: '',
        mirror: ''
      }
    },

    methods: {
      onLink(index) {
        switch (index) {
          case 0:
            this.$router.go(-1)
            break
          case 1:
            this.onSubmit()
            break
          default:
            this.$router.push({name: 'deployHistory'})
            break
        }
      },

      onTabs(index) {
        this.activeIndex = index
        switch (index) {
          case 0:
            this.environment = 'dev'
            break
          case 1:
            this.environment = 'test'
            break
          default:
            this.environment = 'product'
            break
        }
      },

      onSubmit() {
        if (!this.deploy_name.trim()) {
          this.$Message.warning('部署名称不能为空')
        } else if (!this.project_name.trim()) {
          this.$Message.warning('所属项目不能为空')
        } else if (!this.exec_tag.trim()) {
          this.$Message.warning('执行目标不能为空')
        } else if (!this.exec_context.trim()) {
          this.$Message.warning('执行脚本不能为空')
        }  else if (!this.mirror.trim()) {
          this.$Message.warning('镜像URL不能为空')
        } else {
          this.$http.post('http://uop-test.syswin.com/api/deployment/deployments', {
            "environment": this.environment,
            "initiator": "lisi",
            "project_name": this.project_name,
            "exec_tag": this.exec_tag,
            "exec_context": this.exec_context,
            "app_image": this.mirror,
            "deploy_name": this.deploy_name
          }).then(res => {
            console.log('success', res)
            this.$router.push({name: 'deployHistory'})
          }, res => {
            console.log('error', res)
          })
        }
      }
    }
  }
</script>