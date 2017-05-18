<template>
    <div class="addid-container">
        <Form ref="formDynamic" :model="formDynamic">
            <Form-item>
                <Row>
                    <Col span="4">
                        <Button type="primary" class="button" @click="handleAdd" icon="plus-round">
                            创建新账号
                        </Button>
                    </Col>
                </Row>
            </Form-item>
            <div>
                <ul class="form-header">
                    <li>用户名</li>
                    <li>角色类型</li>
                    <li>归属部门</li>
                    <li>密码</li>
                    <li class="hidden">删除</li>
                </ul>
            </div>
            <Form-item  v-for="(item, index) in formDynamic.items"
                        :key="item"
                        :prop="'items.' + index + '.value'"
                        :rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">
                <Row>
                    <ul class="form-content">
                        <li>
                            <Col span="15">
                                <Input type="text" class="change" v-model="item.value" placeholder="请输入用户名"></Input>
                            </Col>
                        </li>
                        <li>
                            <Col span="18">
                                <Select v-model="formDynamic.user" placeholder="请选择用户类型">
                                    <Option value="admin" selected="selected">管理员</Option>
                                    <Option value="commonuser">普通用户</Option>
                                    <Option value="proleader">项目负责人</Option>
                                </Select>
                            </Col>
                        </li>
                        <li>
                            <Col span="18">
                                <Select v-model="formDynamic.department" placeholder="请选择归属部门">
                                    <Option value="cloud" selected="selected">云服务</Option>
                                    <Option value="operation">运维</Option>
                                    <Option value="bigdata">大数据</Option>
                                </Select>
                            </Col>
                        </li>
                        <li>
                            <Col span="18">
                                <Input type="password" v-model="item.password" placeholder="Password"></Input>
                            </Col>
                        </li>
                        <li>
                            <Col span="5" offset="1">
                                <Button type="ghost" @click="handleRemove(index)">删除</Button>
                            </Col>
                        </li>
                    </ul>
                </Row>
            </Form-item>
            <div class="split-line">
                <img src="../static/line.png">
            </div>
            <Form-item>
                <div class="save">
                    <Button type="ghost" class="more">添加更多账号
                        <Icon type="plus-round"></Icon>
                    </Button>
                    <div>
                        <Button type="ghost" @click="handleReset('formDynamic')" style="margin-right: 15px">取消</Button>
                        <Button type="primary" @click="handleSubmit('formDynamic')">保存</Button>
                    </div>
                </div>
            </Form-item>
        </Form>
    </div>
</template>



<script>
    export default {
        data () {
            return {
                formDynamic: {
                    items: [
                        {
                            value: '',
                            userType: '',
                            depart: '',
                            password: ''
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
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


<style scoped>
    .addid-container {
        width: 935px;
        margin: 25px;
    }

    .form-header {
        margin:15px 0;
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

    .form-content {
        margin-top:10px;
        padding:0;
        width: 875px;
        height: 42px;
        border: 1px solid #aaa;

    }
    .form-content li {
        height: 42px;
        width: 174px;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .save {
        width: 875px;
        height: 140px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    }
    .more {
        height: 32px;
    }
    .split-line {
        width: 875px;
        height: 4px;
        line-height: 4px;
        text-align: center;
        margin: 20px 0;
    }
</style>