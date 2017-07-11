<template>
  <div>
    <div class="login-container-div">
      <Row type="flex" justify="center" align="middle"
           style="text-align: center;font-size: 30px;color:#3399ff;margin-bottom:20px">
        <Col span="24" @click.native="goHome" style="cursor: pointer">
        <h1 class="title">门头沟政务云资源管理平台</h1>
      </Col>
      </Row>

      <div class="login-container">
        <Row type="flex" justify="center" align="middle">

          <Col span="24">
          <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="70">

            <Form-item prop="userName" label="用户名">
              <Input type="text" v-model="formInline.userName" placeholder="请输入账号" @keydown.native.enter="handleSubmit('formInline')"></Input>
            </Form-item>

            <Form-item prop="passWord" label="密码">
              <Input type="password" v-model="formInline.passWord" @keydown.native.enter="handleSubmit('formInline')"
                     placeholder="请输入密码">
              </Input>
            </Form-item>

            <!--   <Form-item prop="code" label="验证码">
                   <Row>
                       <Col span="18">
                       <Input type="text" v-model="formInline.code" placeholder="">

                       </Input>
                       </Col>
                       <Col span="4" offset="1">
                         <img width="30" height="30" src="">
                       </Col>
                   </Row>
               </Form-item>-->

            <Form-item>
              <Button type="primary" @click="handleSubmit('formInline')" style="float: right">登录</Button>
            </Form-item>

          </Form>
          </Col>

        </Row>

      </div>
    </div>
  </div>
</template>


<style scoped>
  .login-container-div {
    margin: 180px auto;
    width: 380px;
  }

  .login-container-div .title {
    font-size: 30px;
  }

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    padding: 35px 100px 15px 35px;

    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>

<script>
  import crypto from 'crypto-js';
  import sha256 from 'crypto-js/sha256';

  export default {
    data () {
      return {
        formInline: {
          userName: '',
          passWord: '',
          rememberPassword: false
        },
        ruleInline: {
          userName: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          passWord: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 4, message: '密码长度不能小于4位', trigger: 'blur'}
          ]
        }
      }
    },


    mounted: function () {
      //读取cookie中的账号信息，如果有accountInfo的话，则说明该用户之前勾选了记住密码的功能，则需要自动填上账号密码
      // this.loadAccountInfo();
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let userName = this.formInline.userName;
            let passWord = sha256(this.formInline.passWord + '!@#$%^').toString(crypto.enc.Hex);
            let rememberStatus = this.formInline.rememberPassword;
            let accountInfo = "";
            accountInfo = userName + "&" + passWord;


            let body = {
              username: userName,
              password: passWord,
              user_id: this.$store.state.userData.userInfo.id,
              user_name: this.$store.state.userData.userInfo.username
            }
            this.$http.post('api/user/login', body)
              .then(res => {
//                if (rememberStatus) {
//                  console.log("勾选了记住密码，现在开始写入cookie");
//                  setCookie('accountInfo', accountInfo, 1440 * 3);
//                } else {
//                  console.log("没有勾选记住密码，现在开始删除账号cookie");
//                  delCookie('accountInfo');
//                }

                if (res.body.code === 200) {
                  this.$Message.success('登录成功!');

                  let userinfo = {}
                  userinfo.id = res.body.result.id
                  userinfo.role = res.body.result.role
//                  this.$Cookie.set('userInfo', userinfo)
                  window.sessionStorage.setItem('userInfo', JSON.stringify(userinfo))

                  this.$router.push({path: '/home'})
                }

                if (res.body.code == 400) {
                  this.$Message.error(res.body.result.msg)
                }
                // 成功回调
              }, err => {
                this.$Message.error(err.body.result.msg)
              });

          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },

      doRememberPassword: function (event) {
        let mySelf = this;
        let rememberStatus = mySelf.formInline.rememberPassword;
        mySelf.formInline.rememberPassword = !rememberStatus;
      },

      loadAccountInfo: function () {

        let mySelf = this;

        let accountInfo = getCookie('accountInfo');

        //如果cookie里没有账号信息
        if (Boolean(accountInfo) == false) {
          console.log('cookie中没有检测到账号信息！');
          return false;
        }
        else {
          //如果cookie里有账号信息
          console.log('cookie中检测到账号信息！现在开始预填写！');
          let userName = "";
          let passWord = "";
          let index = accountInfo.indexOf("&");

          userName = accountInfo.substring(0, index);
          passWord = accountInfo.substring(index + 1);

          mySelf.formInline.userName = userName;
          mySelf.formInline.passWord = passWord;
          mySelf.formInline.rememberPassword = true;
        }
      },

      goHome() {
        this.$router.push({path: '/'})
      }
    }
  }

</script>