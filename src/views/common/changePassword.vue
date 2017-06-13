<template>
  <div class="page-changePwd">
    <div class="title">修改密码</div>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
      <Row>
        <Col span="10">
          <Form-item label="原密码" prop="originPasswd">
            <Input type="password" v-model="formCustom.originPasswd" placeholder="可为空"></Input>
          </Form-item>
          <Form-item label="新密码" prop="passwd">
            <Input type="password" v-model="formCustom.passwd" :maxlength="16" placeholder="最多16位"></Input>
          </Form-item>
          <Form-item label="新密码确认" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck" :maxlength="16" placeholder="最多16位"></Input>
          </Form-item>
          <Form-item class="btnCss">
            <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
            <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
          </Form-item>
        </Col>
        <Col span="14"></Col>
      </Row>
    </Form>
  </div>
</template>

<style scoped>
  .title{
    width: 80%;
    height: 20px;
    padding-left: 5px;
    background-color: #f2f2f2;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 40px;
    color:#000;
  }
  .btnCss{
    text-align: right;
  }
</style>

<script>
  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value.length > 16) {
            callback(new Error('最多可输入16位'));
          }
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          if (value.length > 16) {
            callback(new Error('最多可输入16位'));
          } else {
            callback();
          }
        }
      };
      return {
        formCustom: {
          originPasswd: '',
          passwd: '',
          passwdCheck: ''
        },
        ruleCustom: {
          originPasswd: [],
          passwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {},
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('修改密码成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>