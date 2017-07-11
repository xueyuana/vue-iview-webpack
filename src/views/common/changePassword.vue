<template>
  <div class="page-changePwd">
    <div class="sub-title cp_title">修改密码</div>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="95">
      <Row type="flex" justify="start">
        <Col span="14">
        <Form-item label="原密码:" prop="originPasswd">
          <Input type="password" v-model="formCustom.originPasswd" placeholder="可为空"></Input>
        </Form-item>
        <Form-item label="新密码:" prop="passwd">
          <Input type="password" v-model="formCustom.passwd" :maxlength="15" placeholder="最少6位最多15位"></Input>
        </Form-item>
        <Form-item label="新密码确认:" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck" :maxlength="15" placeholder="最少6位最多15位"></Input>
        </Form-item>
        <Form-item class="btnCss">
          <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
          <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </Form-item>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<style scoped>
  .cp_title {
    margin-bottom: 40px;
  }

  .btnCss {
    text-align: right;
  }
</style>

<script type="text/ecmascript-6">
  //引入sha256加密
  import crypto from 'crypto-js'
  import sha256 from 'crypto-js/sha256'
  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value.length < 6) {
            callback(new Error('最少输入6位'));
          }
          if (value.length > 15) {
            callback(new Error('最多可输入15位'));
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
          if (value.length < 6) {
            callback(new Error('最少输入6位'));
          }
          if (value.length > 15) {
            callback(new Error('最多可输入15位'));
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
          originPasswd: [
            {required: true, trigger: 'blur', message: '请填写原密码'},
            {min: 6, max: 15, trigger: 'blur', message: '原密码必须在6到15位'}
          ],
          passwd: [
            {required: true, min: 6, max: 15, validator: validatePass, trigger: 'blur'}
          ],
          passwdCheck: [
            {required: true, min: 6, max: 15, validator: validatePassCheck, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {},
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const url = 'api/user/chpasswd/' + this.$store.state.userData.userInfo.id;
            let passwordData;

            passwordData = {
              old_password: sha256(this.formCustom.originPasswd + '!@#$%^').toString(crypto.enc.Hex),
              new_password: sha256(this.formCustom.passwd + '!@#$%^').toString(crypto.enc.Hex)
            }


              this.$http.put(url, passwordData).then((res) => {
                console.log(res.body);
                if (res.body.code === 200) {
                  this.$Message.success('修改密码成功!');
                }
                if (res.body.code == 400) {
                  this.$Message.error('原密码不正确');
                }
              }, err => {
                this.$Message.error(err.body.result.msg)
              });
            }

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