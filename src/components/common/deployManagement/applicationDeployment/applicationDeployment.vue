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
      <!--切换环境-->
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
      <div class="apply-content-title">部署单元信息：</div>
      <Form class="apply-content-form" label-position="left" :label-width="90">
        <Row :gutter="160">
          <Col class="apply-content-form-item" span="12">
          <Form-item label="部署名称:">
            <Input v-model="deploy_name"></Input>
          </Form-item>
          </Col>
          <Col class="apply-content-form-item" span="12">
          <Form-item label="所属部署单元:">
            <Select class="apply-content-form-select" v-model="project_name" :placeholder="project_list.length? '请选择' : '空'">
              <Option v-for="key in project_list" :value="key.item_name">{{key.item_name}}</Option>
            </Select>
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
  // 读取cookie
//  function getCookie(c_name){
//    if (document.cookie.length>0)
//    {
//      var c_start=document.cookie.indexOf(c_name + "=");
//      if (c_start!=-1)
//      {
//        c_start=c_start + c_name.length+1;
//        var c_end=document.cookie.indexOf(";",c_start);
//        if (c_end==-1)
//          c_end = document.cookie.length
//        return unescape(document.cookie.substring(c_start, c_end))
//      }
//    }
//    return ""
//  }
  // 获取用户信息
//  function getUserInfo() {
//    let userInfo = {}
//    let accountInfo = getCookie('accountInfo')
//
//    let index = accountInfo.indexOf("&");
//
//    userInfo.userName = accountInfo.substring(0,index)
//    userInfo.passWord = accountInfo.substring(index+1)
//
//    return userInfo
//  }

  export default {
    data() {
      return {
        activeIndex: 0,
        funcBtns: ['返回', '提交', '保存到草稿'],
        tabs: ['开发环境', '测试环境', '生产环境'],
        project_list: [],
        environment: 'dev',
        deploy_name: '',
        project_name: '',
        deploy_details: '',
        exec_tag: 'mysql-node1',
        exec_context: '',
        mirror: ''
      }
    },

    mounted() {
      this.getProjectList()
    },

    methods: {
      onLink(index) {
        switch (index) {
          case 0:
            this.$router.go(-1)
            break
          case 1:
            break
          default:
            this.onSaveDraft()
            break
        }
      },
      // 环境切换
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
      // 保存到草稿
      onSaveDraft() {
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
          this.$http.post(baseUrl.apihost + 'deployment/deployments', {
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
      },
      // 请求部署单元列表
      getProjectList() {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        console.log(userInfo)
        let url = baseUrl.apihost + 'iteminfo/iteminfoes/local/' + userInfo.username
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
        this.$http.post(url, {

        }).then(data => {
          this.$Message.warning('此镜像可用')
        }, err => {
          this.$Message.warning('此镜像可用')
        })
      }
    }
  }
</script>