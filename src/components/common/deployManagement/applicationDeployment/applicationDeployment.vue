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
      <Form class="apply-content-form" :model="itemInfo" label-position="right" :label-width="70">
        <Row :gutter="128">
          <Col class="apply-content-form-item" span="12">
          <Form-item label="部署名称:">
            <Input v-model="itemInfo.input1"></Input>
          </Form-item>
          </Col>
          <Col class="apply-content-form-item" span="12">
          <Form-item label="所属项目:">
            <Select v-model="itemInfo.input2" placeholder="请选择">
              <Option value="userCenter">用户中心</Option>
              <Option value="cardManage">卡片管理</Option>
            </Select>
          </Form-item>
          </Col>
        </Row>
        <Row :gutter="128">
          <Col class="apply-content-form-item apply-content-form-empty" span="12"></Col>
          <Col class="apply-content-form-item" span="12" v-show="itemInfo.input3">
          <Form-item label="部署ID:">
            <Input v-model="itemInfo.input5"></Input>
          </Form-item>
          </Col>
        </Row>
      </Form>

      <!--数据库-->
      <div class="apply-content-title">数据库：</div>
      <Form class="apply-content-select" label-position="left" :label-width="70">
        <Form-item label="执行目标:">
          <Select v-model="exeGoal" placeholder="请选择">
            <Option value="node1">mysql-node1</Option>
            <Option value="node2">mysql-node2</Option>
          </Select>
        </Form-item>
      </Form>
      <Form class="apply-content-textarea" label-position="left" :label-width="70">
        <Form-item label="执行脚本:">
          <Input v-model="exeScript" type="textarea" :autosize="{minRows: 4, maxRows: 6}"></Input>
        </Form-item>
      </Form>
      <!--应用包-->
      <div class="apply-content-title">应用包：</div>
      <Form class="apply-content-mirror" label-position="left" :label-width="70">
        <Form-item label="镜像:">
          <Input v-model="mirror"></Input>
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
        &-empty {
          height: 60px;
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
  export default {
    mounted() {
      this.$http.get()
    },
    data() {
      return {
        activeIndex: 0,
        funcBtns: ['返回', '提交', '保存到草稿'],
        tabs: ['开发环境', '测试环境', '生产环境'],
        itemInfo: {
          input1: '测试项目',
          input2: 'userCenter',
          input3: '1'
        },
        exeGoal: 'node1',
        exeScript: '',
        mirror: '镜像URL'
      }
    },
    computed: {},
    methods: {
      onLink(index) {
        switch (index) {
          case 0:
            this.$router.go(-1)
            break
          case 1:
            this.$router.push({name: 'deployHistory'})
            break
          default:
            this.$router.push({name: 'deployHistory'})
            break
        }
      },
      onTabs(index) {
        this.activeIndex = index
      }
    }
  }
</script>