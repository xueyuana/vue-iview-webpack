<template>
   <div>
    <div  class="login-container-div ">
        <Row type="flex" justify="center" align="middle" style="text-align: center;font-size: 30px;color:#3399ff;m-top:110px"> <Col span="24">
            技术运维统一管理平台
            </Col>
        </Row>

    <div class="login-container">


        <Tabs size="small" class="demo-tabs-style2">
            <Tab-pane label="普通用户登录">

                <Row type="flex" justify="center" align="middle">
                    <Col span="24">

                    <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="70" >

                        <Form-item prop="user" label="用户命">
                            <Input type="text" v-model="formInline.user" placeholder="" >

                            </Input>
                        </Form-item>

                        <Form-item prop="password" label="密码">
                            <Input type="password" v-model="formInline.password" placeholder="">

                            </Input>
                        </Form-item>

                        <Form-item prop="code" label="验证码">
                            <Row>
                                <Col span="18">
                                <Input type="text" v-model="formInline.code" placeholder="">

                                </Input>
                                </Col>
                                <Col span="4" offset="1"><img width="30" height="30" src=""/>
                                </Col>
                            </Row>
                        </Form-item>


                        <Form-item>
                            <Checkbox v-model="formInline.remeber">记住密码</Checkbox>
                            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                        </Form-item>
                    </Form>

                    </Col>
                </Row>
            </Tab-pane>
            <Tab-pane label="管理员登录">
                <Row type="flex" justify="center" align="middle">
                <Col span="24">

                <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="70" >

                    <Form-item prop="user" label="用户名">
                        <Input type="text" v-model="formInline.user" placeholder="" >

                        </Input>
                    </Form-item>

                    <Form-item prop="password" label="密码">
                        <Input type="password" v-model="formInline.password" placeholder="">

                        </Input>
                    </Form-item>

                    <Form-item prop="code" label="验证码">
                        <Row>
                            <Col span="18">
                            <Input type="text" v-model="formInline.code" placeholder="">

                            </Input>
                            </Col>
                            <Col span="4" offset="1"><img width="30" height="30" src=""/>
                            </Col>
                        </Row>
                    </Form-item>


                    <Form-item>
                        <Checkbox v-model="formInline.remeber">记住密码</Checkbox>
                        <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                    </Form-item>
                </Form>

                </Col>
            </Row></Tab-pane>

        </Tabs>

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
    export default {
        data () {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                this.$Message.success('提交成功!');
            } else {
                this.$Message.error('表单验证失败!');
            }
        })
    }
    }
    }
</script>