<template>
    <div class="inquire">
        <div class="inquire-form">
            <Form :model="formValidate" ref="formValidate" :rules="ruleValidate" :label-width="90">
                <div class="form-wrap">
                    <Form-item label="创建日期:" prop="created_time" class="form-item">
                        <Date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间"
                                     v-model="formValidate.created_time" style="min-width: 250px"></Date-picker>
                    </Form-item>
                    <Form-item label="部署实例名称:" prop="instance_name" class="form-item">
                        <Input v-model="formValidate.instance_name" placeholder="请输入" style="min-width: 250px"></Input>
                    </Form-item>
                </div>
                <Row type="flex" justify="end">
                    <Col span="24">
                    <Form-item>
                        <div class="inquire-form-query">
                            <Button type="primary" class="inquire-form-query-add" @click.native="goQuery">查询</Button>
                            <Button type="ghost" @click="handleReset('formValidate')">重置</Button>
                        </div>
                    </Form-item>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="inquire-table">
            <div class="inquire-table-title">部署实例列表</div>
            <div class="tjbssl">
                <Button type="primary" @click.native="addCase">添加部署实例</Button>
                <Modal
                        v-model="modal"
                        title="添加部署实例"
                        width="440"
                        :mask-closable="false">
                    <Form ref="createUser" :model="createUser" :rules="ruleInline" label-position="right"
                          :label-width="130">
                        <Form-item label="名称：" prop="instance_name">
                            <Input v-model="createUser.instance_name" :maxlength="15" placeholder="最多15个字符"
                                   style="width: 200px"></Input>
                        </Form-item>
                        <Form-item label="用户群体规模：" prop="user_size">
                            <Select v-model="createUser.user_size" style="width:200px">
                                <Option v-for="item in az" :value="item.az_id" :key="item">{{ item.az_name }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="用户活跃度：" prop="liveness">
                            <Select v-model="createUser.liveness" style="width:200px">
                                <Option v-for="item in az2" :value="item.az_id2" :key="item">{{ item.az_name2 }}
                                </Option>
                            </Select>
                        </Form-item>
                        <Form-item label="业务类型：" prop="business_type">
                            <Select v-model="createUser.business_type" style="width:200px">
                                <Option v-for="item in az3" :value="item.az_id3" :key="item">{{ item.az_name3 }}
                                </Option>
                            </Select>
                        </Form-item>
                        <Form-item label="数据大小：" prop="data_unit">
                            <Select v-model="createUser.data_unit" style="width:200px">
                                <Option v-for="item in az4" :value="item.az_id4" :key="item">{{ item.az_name4 }}
                                </Option>
                            </Select>
                        </Form-item>
                        <Form-item label="高可用：" prop="ha">
                            <Select v-model="createUser.ha" style="width:200px">
                                <Option v-for="item in az5" :value="item.az_id5" :key="item">{{ item.az_name5 }}
                                </Option>
                            </Select>
                        </Form-item>
                    </Form>
                    <div slot="footer">
                        <Button type="ghost" @click="closeAddMsg">取消</Button>
                        <Button type="primary" :style="{ disabled:createUser.validate}"
                                @click="addmessage('createUser')">确定
                        </Button>
                    </div>
                </Modal>
            </div>
            <Table :columns="columns7" stripe :data="data6"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="data_length" show-sizer @on-change="changePage"
                          @on-page-size-change="page_size_change" :current="current_page"></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                data_length: 0,
                page_size: 10,
                current_page: 1,
                modal: false,
                value: '',
                index: '',
                user_id: '',
                getResult: [],
                az: [
                    {
                        az_id: "内网少量用户",
                        az_name: "内网少量用户",
                    },
                    {
                        az_id: "内网大量用户",
                        az_name: "内网大量用户",
                    },
                    {
                        az_id: "外网少量用户",
                        az_name: "外网少量用户",
                    },
                    {
                        az_id: "外网大量用户",
                        az_name: "外网大量用户",
                    }
                ],
                az2: [
                    {
                        az_id2: "偶尔使用",
                        az_name2: "偶尔使用",
                    },
                    {
                        az_id2: "经常使用",
                        az_name2: "经常使用",
                    },
                    {
                        az_id2: "频繁使用",
                        az_name2: "频繁使用",
                    }
                ],
                az3: [
                    {
                        az_id3: "视频",
                        az_name3: "视频",
                    },
                    {
                        az_id3: "网站",
                        az_name3: "网站",
                    },
                    {
                        az_id3: "大数据",
                        az_name3: "大数据",
                    },
                    {
                        az_id3: "存储类应用",
                        az_name3: "存储类应用",
                    },
                    {
                        az_id3: "移动应用",
                        az_name: "移动应用",
                    }
                ],
                az4: [
                    {
                        az_id4: "MB级",
                        az_name4: "MB级",
                    },
                    {
                        az_id4: "GB级",
                        az_name4: "GB级",
                    },
                    {
                        az_id4: "TB级",
                        az_name4: "TB级",
                    }
                ],
                az5: [
                    {
                        az_id5: "需要",
                        az_name5: "需要",
                    },
                    {
                        az_id5: "不需要",
                        az_name5: "不需要",
                    }
                ],
                formValidate: {
                    instance_name: '',
                    created_time: ''
                },
                ruleValidate: {
                    instance_name: [],
                    created_time: []
                },
                createUser: {
                    instance_name: '',
                    instance_num: '',
                    created_time: '',
                    user_size: '',
                    liveness: '',
                    business_type: '',
                    data_unit: '',
                    ha: ''
                },
                ruleInline: {
                    instance_name: [
                        {required: true, message: '请填写部署实例名称', trigger: 'change'}
                    ],
                    user_size: [
                        {required: true, message: '请选择用户群体规模', trigger: 'change'}
                    ],
                    liveness: [
                        {required: true, message: '请选择用户活跃度', trigger: 'change'}
                    ],
                    business_type: [
                        {required: true, message: '请选择业务类型', trigger: 'change'}
                    ],
                    data_unit: [
                        {required: true, message: '请选择数据大小', trigger: 'change'}
                    ],
                    ha: [
                        {required: true, message: '请选择高可用', trigger: 'change'}
                    ]

                },
                columns7: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '部署实例名称',
                        key: 'instance_name',
                        align: 'center'
                    },
                    {
                        title: '资源数量',
                        key: 'instance_num',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {

                                          this.$router.push({name: '资源查询', query: {instance_id: params.row.id}});
                                        }

                                    }
                                }, params.row.instance_num)
                            ]);
                        }
                    },
                    {
                        title: '创建日期',
                        key: 'created_time',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 260,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal = true;
                                            let rowDate = {};
                                            for (var key in params.row) {
                                                rowDate[key] = params.row[key]
                                            }
                                            Object.assign(this.createUser, rowDate)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '是否下线' + params.row.instance_name + '，下线操作将删除此部署实例内的所有资源并不可恢复，请慎重操作！！！',
                                                content: '注：删除此部署实例后，实例所属的资源也将一并删除，请谨慎操作！',
                                                onOk: () => {
                                                    const url = 'api/deploy_instance/deploy_instances/' + params.row.id
                                                    this.$http.delete(url).then((res) => {
                                                        //重新获取用户
                                                        const query_user = {user_id: this.$store.state.userData.userInfo.id}
                                                        this.getUserResource(query_user)
                                                    }, (err) => {
                                                        console.log('err', err)
                                                    })

                                                },
                                                onCancel: () => {
                                                    this.$Message.info('点击了取消');
                                                }
                                            });
                                        }
                                    }
                                }, '下线')
                            ]);
                        }
                    }
                ],
                data6: [
                    //{
                    //    name: '实例1',
                    //    instance_num: '10',
                    //    created_time: '2017-06-23 15:00:00'
                    //}
                ]
            }
        },
        created () {
            //获取用户的所有申请资源
            const id = this.$store.state.userData.userInfo.id
            const query = {user_id: id}
            this.getUserResource(query)
        },
        methods: {
            goQuery () {
                let instance_name = this.formValidate.instance_name
                let start_time = this.formValidate.created_time[0]
                let end_time = this.formValidate.created_time[1]
                let user_id = this.$store.state.userData.userInfo.id
                this.current_page = 1
                let params = {}
                instance_name && (params.instance_name = instance_name)
                start_time && (params.start_time = this.timeFormat(start_time))
                end_time && (params.end_time = this.timeFormat(end_time))
                user_id && (params.user_id = user_id)
                this.getUserResource(params)
            },
            getUserResource (query) {
                this.getResult = []
                this.data6 = []
                const url = 'api/deploy_instance/deploy_instances'
                this.$http.get(url, {
                    params: query
                }).then((res) => {
                    this.data_length = res.body.result.res.length
                    this.current_page = 1
                    res.body.result.res.forEach((item, index) => {
                        this.getResult.push({
                            user_id: item.user_id,
                            instance_name: item.instance_name,
                            instance_num: item.resource_num,
                            created_time: item.created_date,
                            user_name: item.user_name,
                            id: item.instance_id,
                            user_size: item.user_size,
                            liveness: item.liveness,
                            business_type: item.business_type,
                            data_unit: item.data_unit,
                            ha: item.ha
                        })
                    })
                    this.data6 = this.mockTableData(this.getResult, this.page_size, this.current_page)
                }, (err) => {
                    console.log(err)
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            addCase (){
                this.modal = true;
            },
            closeAddMsg(){
                this.modal = false;
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
            addmessage (create_name) {
                this.$refs[create_name].validate((valid) => {
                    if (valid) {
                        //发送请求
                        const url = 'api/deploy_instance/deploy_instances';
                        this.createUser.user_id=this.$store.state.userData.userInfo.id;
                        this.createUser.user_name = this.$store.state.userData.userInfo.username;
                        this.createUser.instance_num='0';
                        delete this.createUser.created_time;
                        if(this.createUser.hasOwnProperty("id")){
                            this.createUser.instance_id=this.createUser.id;
                            this.$http.put(url, this.createUser).then((res) => {
                                this.current_page = 1
                                this.goQuery();
                            }, (err) => {
                                this.$Message.error({
                                    content: '编辑部署实例失败!',
                                    duration: 10
                                });
                                //重置
                                this.$refs[create_name].resetFields()
                            })
                        }else {
                            this.$http.post(url, this.createUser).then((res) => {
                                //重新获取用户
                                const query_user = {user_id: this.$store.state.userData.userInfo.id}
                                this.getUserResource(query_user)
                                //重置
                                this.$refs[create_name].resetFields()
                            }, (err) => {
                                this.$Message.error({
                                    content: '创建部署实例失败!',
                                    duration: 10
                                });
                            })
                        }

                        this.createUser.instance_name = '';
                        this.$Message.success('提交成功!');
                        this.modal = false;
                    } else {
                        this.$Message.error(
                            {
                                content: '表单验证失败!',
                                duration: 10
                            }
                        );
                    }
                })
            },
            // 分页
            changePage(page) {
                this.data6 = this.mockTableData(this.getResult, this.page_size, page)
                this.current_page = page
            },
            mockTableData (originData, pageSize, index) {//进行分页
                let data = [];
                let num = (index - 1) * pageSize
                let maxNum = (num + pageSize) > originData.length ? originData.length : (num + pageSize)
                data = originData.slice(num, maxNum)
                data.forEach((item, index) => {
                    item.created_time = item.created_time.slice(0, 19)
                })
                return data;
            },
            page_size_change(size) {
                this.page_size = size
                this.data6 = this.mockTableData(this.getResult, this.page_size, 1)
            },
            timeFormat (date) {//时间格式化
                let Y = date.getFullYear();
                let M = date.getMonth() + 1;
                let D = date.getDate()
                let h = date.getHours()
                let m = date.getMinutes()
                let s = date.getSeconds()
                M = M < 10 ? '0' + M : M
                D = D < 10 ? '0' + D : D
                h = h < 10 ? '0' + h : h
                m = m < 10 ? '0' + m : m
                s = s < 10 ? '0' + s : s
                let applyDate = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
                return applyDate
            },
        },
        computed: {}
    }
</script>

<style lang="less" scoped>
    .tjbssl Button {
        margin-bottom: 20px;
    }

    .bssl-list {
        height: 35px;
        line-height: 35px;
        font-size: 14px;
    }

    .ivu-page {
        padding-top: 20px;
        float: right;
    }

    .c_font {
        line-height: 32px;
        text-align: right;
        padding-right: 10px;
    }

    .c_font2 {
        line-height: 32px;
        text-align: center;
    }
</style>