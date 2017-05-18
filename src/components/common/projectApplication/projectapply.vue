<template lang="html">
  <Form label-width="100" ref="formInline" :model="formInline" label-pisiton="left">
    <div class="header">
      <div class="button">
        <Form-item>
          <Button type="primary" style="background-color: #39f" @click="handleReset('formInline')">取消</Button>
          <Button type="primary" style="margin-left: 8px;background-color: #39f" @click="clicked">保存</Button>
        </Form-item>
      </div>
    </div>
    <div class="title">
       <p>项目信息：</p>
    </div>
    <div class="main">
      <div class="left">
        <Form-item label="项目名称：" prop="info">
          <Input placeholder="测试项目" v-model="formInline.info"></Input>
        </Form-item>
        <Form-item label="归属部门：" prop="department">
          <Input placeholder="互联-运维部" v-model="formInline.department"></Input>
        </Form-item>
      </div>
      <div class="right">
        <Form-item label="项目编号：" prop="number">
          <Input placeholder="syswin-ton-0001" v-model="formInline.number"></Input>
        </Form-item>
        <Form-item class="ID" label="项目ID：" :class="{clicked:isClicked}">
          <Input placeholder="测试项目"></Input>
        </Form-item>
      </div>
        <div class="textarea">
          <div class="title1">
            <p>项目描述</p>
          </div>
          <div class="textarea">
            <Form-item prop="desc">
              <Input type="textarea" placeholder="请输入..." v-model="formInline.desc"></Input>
            </Form-item>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Form>
</template>

<script>
export default {
  name:'projectApply',
  data() {
    return {
      isClicked: false,
      formInline: {
          info: '',
          department: '',
          number: '',
          desc: ''
      }
      // ruleInline: {
      //     info: [
      //         { required: true, message: '请填写项目名称', trigger: 'blur' }
      //     ],
      //     departmen: [
      //         { required: true, message: '请填写所属部门', trigger: 'blur' }
      //     ],
      //     departmen: [
      //         { required: true, message: '请填写项目编号', trigger: 'blur' }
      //     ]
      // }
    }
  },
  methods: {
    clicked() {
      this.isClicked=true;
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>

<style lang="css">
.header {
  display: flex;
  flex-direction: row-reverse;
  /*position: absolute;*/
  top:0;
  width: 95%
}

.title {
  text-align: left;
  background-color: #eee;
  width: 95%;
}

.button {
  padding-top: 20px;
  padding-right: 50px;
}

.textarea {
  margin-left: 0;
  width: 95%;
  float: left;
  padding-left: 0;
}
.left {
  float:left;
}
.right {
  float: right;
  padding-right: 80px;
}
.main {
  width: 95%;
  padding-top: 20px;
}
.ID {
  display:none;
}

.clicked {
  display: block;
}

</style>
