<!--资源申请历史-->
<template>
    <div class="addres-wrap">
        <Form ref="json" :model="json"   >
            <div class="addres-top clearfix">
                <Button id="returnButton" ><a href="" style="color: #fff">返回</a> </Button>
                <Button id="submit" type="primary" @click="handleSubmit('json')">提交</Button>
                <Button id="save">保存到草稿</Button>
            </div>
            <div class="addres-container">

                <Tabs>
                    <Tab-pane label="开发环境" name="develop"><div class="allcontent">
                        <div class="title"><span>项目信息:</span></div>
                        <div class="container clearfix">
                            <div class="container-left">

                                <div><span>资源名称：</span> <Input style="width: 180px" :model="json.resource_name" ></Input></div>

                            </div>
                            <div class="container-right">
                                <div>
                                    <span>所属项目：</span>
                                    <Select style="width: 180px" v-model="json.project">
                                        <option></option>
                                    </Select>
                                </div>

                            </div>
                        </div>
                        <div class="title"><span>域名:</span></div>
                        <div class="container">
                            <div><span>自定义域名：</span> <Input style="width: 180px" v-model="json.domain"></Input>.syswin.com</div>
                        </div>

                        <div class="title"><span>计算信息:</span></div>
                        <div class="container">
                            <div class="addres-compute">
                                <div>
                                    <span>实例名称:</span>
                                    <Input style="width: 180px" v-model="json.compute_list.ins_name"></Input>
                                </div>
                                <div>
                                    <span>实例规格：</span>
                                    <Select style="width: 180px" >
                                        <option value="2C,4G">2C 4G</option>
                                        <option value="4C,8G">4C 8G</option>
                                    </Select>
                                </div>
                                <div>
                                    <span>镜像：</span>
                                    <Input style="width: 180px" v-model="json.compute_list.url"></Input>
                                </div>

                            </div>
                        </div>

                        <div class="title"><span>数据库信息:</span></div>
                        <div class="container database">
                            <Tabs>
                                <Tab-pane label="MYSQL" name="mysql">
                                    <div class="container-left" style="height: 100px">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="json.resource_list[0].res_name"></Input>
                                        </div>
                                        <div>
                                            <span>实例数量：</span>
                                            <Input-number v-model="json.resource_list[0].quantity"></Input-number>
                                        </div>
                                        <div >
                                            <span>存储空间：</span>
                                            <Input-number v-model="json.resource_list[0].disk"></Input-number>
                                        </div>
                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px" >
                                                <option value="2C,4G">2C 4G</option>
                                                <option value="4C,8G">4C 8G</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例版本: </span>
                                            <Select style="width: 180px" v-model="json.resource_list[0].version">
                                                <option value="MYSQL5.5">MYSQL5.5</option>
                                                <option value="MYSQL5.6">MYSQL5.6</option>
                                            </Select>
                                        </div>
                                    </div>
                                </Tab-pane>
                                <Tab-pane label="REDIS" name="redis">
                                    <div class="container-left">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="json.resource_list[1].res_name"></Input>
                                        </div>
                                        <div>
                                            <span>实例版本：</span>
                                            <Select style="width: 180px" v-model="json.resource_list[1].version">
                                                <option value="Redis2.8">Redis2.8</option>
                                                <option value="Redis3.0">Redis3.0</option>
                                            </Select>
                                        </div>

                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px">
                                                <option value="2C,4G">2C 4G</option>
                                                <option value="2C,8G">2C 8G</option>
                                                <option value="4C,16G">4C 16G</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例数量: </span>
                                            <Select style="width: 180px">

                                                <Input-number v-model="json.resource_list[1].quantity"></Input-number>
                                            </Select>
                                        </div>
                                    </div>
                                </Tab-pane>
                                <Tab-pane label="MONGODB" name="mongo">
                                    <div class="container-left" style="height:100px;">
                                        <div>
                                            <span>实例名称：</span>
                                            <Input style="width: 180px" v-model="json.resource_list[2].res_name"></Input>
                                        </div>
                                        <div>
                                            <span>实例数量：</span>
                                            <Input-number v-model="json.resource_list[2].quantity" ></Input-number>
                                        </div>
                                        <div >
                                            <span>存储空间：</span>
                                            <Input-number v-model="json.resource_list[2].disk"></Input-number>
                                        </div>
                                    </div>
                                    <div class="container-right">
                                        <div>
                                            <span>实例规格：</span>
                                            <Select style="width: 180px">
                                                <option value="2C,4G">2C 4G</option>
                                                <option value="4C,8G">4C 8G</option>
                                                <option value="4C,16G">4C 16G</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <span>实例版本: </span>
                                            <Select style="width: 180px" v-model="json.resource_list[2].version">
                                                <option value="Mongo3.2">Mongo3.2</option>
                                            </Select>
                                        </div>
                                    </div>
                                </Tab-pane>
                            </Tabs>


                        </div>
                    </div></Tab-pane>

                </Tabs>


            </div>
        </Form>
    </div>
</template>
<style scoped>

    .addres-wrap {
        width: 1200px;
        padding: 10px 30px;
        border-top: 1px dashed #ccc;
    }

    .addres-top Button {
        float: right;
        background-color: #39f;
        color: white;
        margin: 0 4px;
    }

    .addres-container Button{
        border-radius: 10px;
        margin-right: 15px;
    }


    .title {
        width: 100%;
        height: 24px;
        line-height: 24px;
        background-color: #f2f2f2;
        margin-bottom: 10px;
    }

    .title span {
        color: #000;
        font-weight: 500;
        font-size: 18px;
    }

    .container {
        width: 100%;
        margin-left: 10px;
        padding-top: 10px;
        padding-bottom: 50px;
    }

    .container span {
        color: #000;
        display: inline-block;
        width: 100px;
        text-align: center;
    }

    .container-left,.container-right {
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        float: left;
    }

    .container-right {
        float: right;
        margin-right: 180px;
    }

    .addres-compute {
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }

    .database {
        border: 1px solid #d7d7d7;
    }



</style>
<script>



    export default {
        data () {
        return {
            json: {
                "resource_name": "",
                "project": "",
                "department": "syswin",
                "user_name": "",
                "user_id": "",
                "domain": "",
                "env": "",
                "application_status": "notknow",
                "resource_list": [
                    {
                        "res_name": "",
                        "res_type": "mysql",
                        "cpu": 0,
                        "mem": 0,
                        "disk": 0,
                        "quantity": 0,
                        "version": ""
                    },
                    {
                        "res_name": "",
                        "res_type": "mongo",
                        "cpu": 0,
                        "mem": 0,
                        "disk": 0,
                        "quantity": 0,
                        "version": ""
                    } ,
                    {
                        "res_name": "",
                        "res_type": "redis",
                        "cpu": 0,
                        "mem": 0,
                        "disk": 0,
                        "quantity": 0,
                        "version": ""
                    }
                ],
                "compute_list": [
                    {
                        "ins_name": "",
                        "cpu": 0,
                        "mem": 0,
                        "url": "0"
                    }
                ]
            },

            ruleInline: {
                resource_name: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {

            console.log(this.json.resource_name);
            let that=this;
            let data=this.json;
            this.$http.post(
                    'http://172.28.11.111:5000/api/resource/',
                    // 请求体重发送数据给服务端
                    {
                        data

                    }).then(function () {


                        this.$Message.success('提交成功!');
                        // 成功回调
                    }, function () {
                        this.$Message.error('登陆失败!');
                        // 失败回调
                    });

        }
    }}
</script>