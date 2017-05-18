<template>
    <div>
        <div class="add-container">
            <Form :model="formDynamic" ref="formDynamic">
                <Button type="primary" class="button" @click="handleAdd" icon="plus-round">
                    创建新账号
                </Button>
                <div>
                    <ul class="form-header">
                        <li>用户名</li>
                        <li>角色类型</li>
                        <li>归属部门</li>
                        <li>密码</li>
                        <li class="hidden">删除</li>
                    </ul>
                </div>

                <!--<div>-->
                    <!--<ul>-->
                        <!--<li>{{ item.value }}</li>-->
                        <!--<li>{{ item.userType }}</li>-->
                        <!--<li>{{ item.depart }}</li>-->
                        <!--<li>{{ item.password }}</li>-->
                        <!--<li><Button type="ghost" @click="handleRemove(index)" class="del">删除</Button> </li>-->
                    <!--</ul>-->
                <!--</div>-->

                <div v-for="item in formDynamic.items" class="form-container">
                    <ul class="form-content">
                        <li>
                            <input type="text" v-model="item.value" placeholder="请输入用户名">
                        </li>
                        <li>
                            <select v-model="item.userType">
                                <option value='' disabled selected style='display:none; color:#757575;'>请选择用户类型</option>
                                <option value="admin" selected="selected">管理员</option>
                                <option value="commonuser">普通用户</option>
                                <option value="proleader">项目负责人</option>
                            </select>
                        </li>
                        <li>
                            <select v-model="item.depart">
                                <option value='' disabled selected style='display:none; color:#757575'>请选择归属部门</option>
                                <option value="cloud">云服务</option>
                                <option value="operation">运维</option>
                                <option value="bigdata">大数据</option>
                            </select>
                        </li>
                        <li>
                            <input type="password" v-model="item.password" placeholder="Password"></input>
                        </li>
                        <li>
                            <Button type="ghost" @click="handleRemove(index)" class="del">删除</Button>
                        </li>
                    </ul>
                </div>
                <div class="split-line">
                    <img src="../static/line.png">
                </div>
                <div class="save">
                    <Button type="ghost" class="more">添加更多账号
                        <Icon type="plus-round"></Icon>
                    </Button>
                    <div>
                        <Button type="ghost" @click="handleReset" style="margin-right: 15px">取消</Button>
                        <Button type="primary" @click="handleSubmit('formDynamic')">保存</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
//        mounted() {
//            console.log("fff")
//        },
        data () {
            return {
                formDynamic: {
                    items: [{
                        value: '',
                        userType: '',
                        depart: '',
                        password: ''
                    }]
                }
            }
        },
        methods: {
            handleReset () {

                this.formDynamic.items.pop()
                console.log(this.formDynamic.items)
            },
            handleAdd () {
                this.formDynamic.items.push({
                    value: '',
                    userType: '',
                    depart: '',
                    password: ''
                });
            },
            handleRemove (index) {
                this.formDynamic.items.splice(index, 1);
            }
        }
    }
</script>

<style>
    .add-container {
        width: 935px;
        margin: 25px;
    }

    .button {
        width: 120px;
    }

    .form-header {
        margin-top: 15px;
        width: 875px;
        height: 40px;
        background-color: #f2f2f2;
    }

    .form-header li {
        height: 40px;
        width: 175px;
        line-height: 40px;
        text-align: center;
        float: left;
        border-right: 1px solid #aaa;
        font-weight: 700;
        font-size: 13px;
        color: #333;
    }

    .form-header .hidden {
        border-right: none !important;
    }

    .form-container {
        width: 875px;
    }

    .form-content {
        margin-top: 15px;
        width: 875px;
        height: 40px;
        border: 1px solid #aaa;
    }

    .form-content li {
        height: 40px;
        width: 174px;
        float: left;
        text-align: center;
        line-height: 40px;
    }

    input {
        width: 120px;
        height: 28px;
        border-radius: 5px;
        border: 1px solid #ccc;
        -webkit-appearance: none;
        text-align: center;
    }

    input::-webkit-input-placeholder {
        text-align: center;
    }

    input:hover {
        border: 1px solid #5cadff;
    }

    select {
        width: 120px;
        height: 28px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .del {
        height: 28px;
    }

    .split-line {
        width: 875px;
        height: 4px;
        line-height: 4px;
        text-align: center;
        margin: 20px 0;
    }

    .save {
        width: 875px;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    }

    .more {
        height: 32px;
    }
</style>