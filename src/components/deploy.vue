<template>
  <div class="deplay">
    <div class="deplay-button">
      <div>
        <Button class="deplay-button-item"
                type="info" size="small"
                v-for="(item, index) in funcBtns"
                @click="onFunction(index)">{{item}}</Button>
      </div>
    </div>
    <div class="deplay-content">
      <div>
        <Button class="deplay-content-button"
                :class="{active: activeIndex === index}"
                v-for="(item, index) in tabs"
                @click="onTabs(index)"
                size="large"
                shape="circle">{{item}}</Button>
      </div>
      <!--项目信息-->
      <div class="deplay-content-title">项目信息：</div>
      <Form class="deplay-content-form" :model="itemInfo" label-position="right" :label-width="70">
        <div class="deplay-content-form-item">
          <Form-item label="部署名称">
            <Input v-model="itemInfo.input1"></Input>
          </Form-item>
        </div>
        <div class="deplay-content-form-item">
          <Form-item label="所属项目">
            <Input v-model="itemInfo.input2"></Input>
          </Form-item>
        </div>
        <div class="deplay-content-form-item">
          <Form-item label="所属资源">
            <Input v-model="itemInfo.input3"></Input>
          </Form-item>
        </div>
        <div class="deplay-content-form-item">
          <Form-item label="归属部门">
            <Input v-model="itemInfo.input3"></Input>
          </Form-item>
        </div>
        <div class="deplay-content-form-item">
          <Form-item label="部署ID">
            <Input v-model="itemInfo.input3"></Input>
          </Form-item>
        </div>
      </Form>
      <!--数据库-->
      <div class="deplay-content-title">数据库：</div>
      <Form class="deplay-content-select" label-position="left" :label-width="70">
        <Form-item label="执行目标:">
          <Select v-model="dataBase" placeholder="请选择">
            <Option value="MYSQL">MYSQL</Option>
            <Option value="MONGODB">MONGODB</Option>
          </Select>
        </Form-item>
      </Form>
      <Form class="deplay-content-textarea" label-position="top">
        <Form-item label="执行脚本：">
          <Input v-model="exeScript" type="textarea" :autosize="{minRows: 2, maxRows: 5}"></Input>
        </Form-item>
      </Form>
      <!--应用包-->
      <div class="deplay-content-title">应用包：</div>
      <Form class="deplay-content-select" label-position="left" :label-width="70">
        <Form-item label="镜像:">
          <Input v-model="mirror"></Input>
        </Form-item>
      </Form>
      <!--添加相关附件-->
      <div class="deplay-content-title">添加相关附件：</div>
      <div class="deplay-content-upload">
        <div class="deplay-content-upload-name">上传附件</div>
        <Upload
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/">
          <div style="padding: 20px 50px">
            <Icon type="plus" size="52" style="color: #000"></Icon>
          </div>
        </Upload>
      </div>


    </div>
  </div>

</template>

<style lang="less" scoped>
  .deplay {
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
      &-button.active {
        color: #000;
        border-color: cyan;
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
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        &-item {
          width: 50%;
          display: flex;
          align-items: center;
        }
      }
      &-select {
        margin-top: 10px;
        width: 250px;
      }
      &-upload {
        display: flex;
        padding-left: 50px;
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

    },
    data() {
      return {
        activeIndex: 0,
        funcBtns: ['返回', '提交', '保存到草稿'],
        tabs: ['开发环境', '测试环境', '生产环境'],
        itemInfo: {
          input1: '测试项目',
          input2: '测试项目',
          input3: '测试项目',
          input4: '测试项目',
          input5: '测试项目'
        },
        dataBase: 'MYSQL',
        exeScript: '脚本说明：',
        mirror: '镜像URL'
      }
    },
    computed: {},
    methods: {
      onFunction(index) {
        switch (index) {
          case 0:
            break
          case 0:
            break
          default:
            break
        }
      },
      onTabs(index) {
        this.activeIndex = index
      }
    }
  }
</script>