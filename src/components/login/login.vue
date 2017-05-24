<template>
   <div>
    <div  class="login-container-div ">
        <Row type="flex" justify="center" align="middle" style="text-align: center;font-size: 30px;color:#3399ff;margin-bottom:20px"> <Col span="24">
            技术运维统一管理平台
            </Col>
        </Row>

    <div class="login-container">

                <Row type="flex" justify="center" align="middle">
                    <Col span="24">

                    <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="70" >

                        <Form-item prop="user" label="用户名">
                            <Input type="text" v-model="formInline.userName" placeholder="请输入工号" >

                            </Input>
                        </Form-item>

                        <Form-item prop="password" label="密码">
                            <Input type="password" v-model="formInline.passWord" placeholder="请输入密码">

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
                            <Checkbox v-model="formInline.rememberPassword"  @click.prevent.native="doRememberPassword">记住密码</Checkbox>
                            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                        </Form-item>
                    </Form>

                    </Col>
                </Row>

    </div>
   </div>
   </div>
</template>


<style scoped >
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    h1{
        height: 150px;
    img{
        height: 100%;
    }
    }
    h2{
        color: #666;
        margin-bottom: 200px;
    p{
        margin: 0 0 50px;
    }
    }
    .ivu-row-flex{
        height: 100%;
    }
    }
    .login-container-div{
        margin: 180px auto;
        width: 350px;

    }
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        padding: 35px 35px 15px 35px;

        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    .title {
        margin: 0px auto;
        text-align: center;
        color: #505458;
        font-size: 30px;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
    }
</style>

<script>
    import {setCookie, getCookie, delCookie, setStroage} from 'tools/cookieAction.js';

    import common from '../../tools/common.js';
    import {userinfo} from '../../tools/user.js';

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
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    // 相当于init doAjax
    beforeCreate() {
        // console.log('login页面 加载完成！')
    },
    // 相当于ready 模板编译挂载之后
    mounted: function() {
        //读取cookie中的账号信息，如果有accountInfo的话，则说明该用户之前勾选了记住密码的功能，则需要自动填上账号密码
        this.loadAccountInfo();
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {

                if (valid) {
                    let userName = this.formInline.userName;
                    let passWord = this.formInline.passWord;
                    let rememberStatus = this.formInline.rememberPassword;
                    let accountInfo = "";
                    accountInfo = userName + "&" + passWord;
                    console.log(this.formInline.userName);

                    const url=common.apihost+'auth/userlist';
                    this.$http.post(
                            url,
                            {
                                'id':userName,
                                'password':passWord

                            }, {emulateJSON:true} ).then(response=>{
                                console.log('账号密码', response);
                                if (rememberStatus){
                                    console.log("勾选了记住密码，现在开始写入cookie");
                                    setCookie('accountInfo',accountInfo,1440*3);
                                }
                                else{
                                    console.log("没有勾选记住密码，现在开始删除账号cookie");
                                    delCookie('accountInfo');
                                }
                                  if(response.body.code===200){
                                    this.$Message.success('提交成功!');
                                    console.log(response)
                                    userinfo.username=response.body.result.msg.username;
                                    userinfo.user_id=response.body.result.msg.user_id;
                                    userinfo.is_admin=response.body.result.msg.is_admin;
                                    userinfo.department=response.body.result.msg.department;

                                    setStroage('userInfo', userinfo)

                                    // 根据身份跳转不同界面
                                    if (response.body.result.msg.is_admin) {
                                      this.$router.push({path:'/admin_console'})
                                    }else {
                                      this.$router.push({path:'/management_console'})
                                    }
                                }

                                // 成功回调
                            }, function () {
                               /* this.$Message.error('登陆失败!');*/
                                // 失败回调
                            });



                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        doRememberPassword: function(event){
            let mySelf = this;
            let rememberStatus = mySelf.formInline.rememberPassword;
            // event.preventDefault();
            mySelf.formInline.rememberPassword = !rememberStatus;

        },

        loadAccountInfo: function(){

            let mySelf = this;

            let accountInfo = getCookie('accountInfo');

            //如果cookie里没有账号信息
            if(Boolean(accountInfo) == false){
                console.log('cookie中没有检测到账号信息！');
                return false;
            }
            else{
                //如果cookie里有账号信息
                console.log('cookie中检测到账号信息！现在开始预填写！');
                let userName = "";
                let passWord = "";
                let index = accountInfo.indexOf("&");

                userName = accountInfo.substring(0,index);
                passWord = accountInfo.substring(index+1);

                mySelf.formInline.userName = userName;
                mySelf.formInline.passWord = passWord;
                mySelf.formInline.rememberPassword = true;
            }
        }
    }
    }

</script>