<template>
    <div class="rsource-approval">
        <div class="approval-button">
            <div v-for="(item, index) in funcBtns">
                <Button @click="onLink(index)" v-if="item =='返回'" type="ghost">{{item}}</Button>
                <div v-if="role === 'admin' && buttonDisable">
                    <Button @click="onLink(index)" v-if="item =='通过'" type="primary" :disabled="jxwFlag">{{item}}</Button>
                    <Button @click="onLink(index)" v-if="item =='不通过'" type="error" :disabled="jxwFlag">{{item}}</Button>
                </div>
                <div v-else-if="role === 'leader' && buttonDisable">
                    <Button @click="onLink(index)" v-if="item =='通过'" type="primary" :disabled="xzFlag">{{item}}</Button>
                    <Button @click="onLink(index)" v-if="item =='不通过'" type="error" :disabled="xzFlag">{{item}}</Button>
                </div>
            </div>
        </div>
        <div class="approval-status">
            <Steps :current="stepNum" :status="stepsStatus">
                <Step title="提交申请"></Step>
                <Step title="直属领导审批"></Step>
                <Step title="经信委技术审批"></Step>
                <Step title="审批完成"></Step>
            </Steps>
        </div>
        <!--DMZ部署区域资源使用情况-->
        <div class="status-list" v-if="$store.state.userData.userInfo.role == 'admin'">
            <div class="sub-title">{{formValidate.az_name}}部署区域资源使用情况</div>

            <ul class="status-content">
                <li>
                    <Row>
                        <Col span="5" class="rd_right">
                        <div class="rd_pro1" style="padding-right:12px;">vCPU个</div>
                        </Col>
                        <Col span="10">
                        <Progress
                                :percent="poolStatus.cpu_use/poolStatus.cpu_total*100 > 100 ? 100 : poolStatus.cpu_use/poolStatus.cpu_total*100"
                                :stroke-width="18" class="rd_progress"
                                hide-info></Progress>
                        </Col>
                        <Col span="5" class="rd_left">
                        <div class="rd_pro2">{{poolStatus.cpu_use + '&nbsp;/&nbsp;' + poolStatus.cpu_total}}</div>
                        </Col>
                    </Row>
                </li>
                <li>
                    <Row>
                        <Col span="5" class="rd_right">
                        <div class="rd_pro1">内存（GB）</div>
                        </Col>
                        <Col span="10">
                        <Progress :percent="poolStatus.memory_use/poolStatus.memory_total*100" :stroke-width="18"
                                  class="rd_progress"
                                  hide-info></Progress>
                        </Col>
                        <Col span="5" class="rd_left">
                        <div class="rd_pro2">{{poolStatus.memory_use + '&nbsp;/&nbsp;' + poolStatus.memory_total}}</div>
                        </Col>
                    </Row>
                </li>
                <li>
                    <Row>
                        <Col span="5" class="rd_right">
                        <div class="rd_pro1">硬盘（GB）</div>
                        </Col>
                        <Col span="10" class="rd_progress">
                        <Progress :percent="poolStatus.storage_use/poolStatus.storage_total*100" :stroke-width="18"
                                  class="rd_progress" hide-info></Progress>
                        </Col>
                        <Col span="5" class="rd_left">
                        <div class="rd_pro2">{{poolStatus.storage_use + '&nbsp;/&nbsp;' + poolStatus.storage_total}}
                        </div>
                        </Col>
                    </Row>
                </li>
            </ul>

        </div>
        <div class="status-list" v-if="$store.state.userData.userInfo.role == 'admin'">
            <div class="sub-title">本次申请占用资源情况</div>

            <ul class="status-content">
                <li>
                    <Row>
                        <Col span="5" class="rd_right">
                        <div class="rd_pro1" style="padding-right:12px;">vCPU个</div>
                        </Col>
                        <Col span="10">
                        <Progress :percent="100" :stroke-width="18" class="rd_progress" hide-info></Progress>
                        </Col>
                        <Col span="5" class="rd_left">
                        <div class="rd_pro2">{{formValidate.vCPU_total}}</div>
                        </Col>
                    </Row>
                </li>
                <li>
                    <Row>
                        <Col span="5" class="rd_right">
                        <div class="rd_pro1">内存（GB）</div>
                        </Col>
                        <Col span="10">
                        <Progress :percent="100" :stroke-width="18" class="rd_progress" hide-info></Progress>
                        </Col>
                        <Col span="5" class="rd_left">
                        <div class="rd_pro2">{{formValidate.memory_total}}</div>
                        </Col>
                    </Row>
                </li>
                <li>
                    <Row>
                        <Col span="5" class="rd_right">
                        <div class="rd_pro1">硬盘（GB）</div>
                        </Col>
                        <Col span="10" class="rd_progress">
                        <Progress :percent="100" :stroke-width="18" class="rd_progress" hide-info></Progress>
                        </Col>
                        <Col span="5" class="rd_left">
                        <div class="rd_pro2">{{formValidate.storage_total}}</div>
                        </Col>
                    </Row>
                </li>
            </ul>


        </div>
        <!--资源信息-->
        <div class="form-info">
            <Form :model="formValidate" :label-width="120">
                <Row type="flex" justify="start">
                    <Col span="24">
                    <div class="sub-title">资源信息</div>
                    </Col>

                    <Col span="24">
                    <Form-item label="申请单号:" class="form-item">
                        {{formValidate.resource_id}}


                    </Form-item>
                    </Col>
                    <Col span="8">
                    <Form-item label="部署实例:" class="form-item">
                        {{formValidate.deploy_name}}
                        <span class="form-item-span" @click="onInstanceDetails"
                              v-if="$store.state.userData.userInfo.role == 'admin'">推荐配置</span>

                        <!--推荐配置-->
                        <Modal v-model="instanceCreate" title="提示" :ok-text="okText" :mask-closable="false"
                               :closable="false">
                            <div class="modal-wrap">
                                <div class="instance-title">您的业务类型:</div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>用户群体规模</td>
                                        <td>{{recomConfig.user_size}}</td>
                                    </tr>
                                    <tr>
                                        <td>用户活跃度</td>
                                        <td>{{recomConfig.liveness}}</td>
                                    </tr>
                                    <tr>
                                        <td>业务类型</td>
                                        <td>{{recomConfig.business_type}}</td>
                                    </tr>
                                    <tr>
                                        <td>数据大小</td>
                                        <td>{{recomConfig.data_unit}}</td>
                                    </tr>
                                    <tr>
                                        <td>高可用</td>
                                        <td>{{recomConfig.ha}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="instance-title">推荐配置:</div>
                                <Table :columns="tj_columns" :data="configuration"></Table>
                            </div>
                            <div slot="footer">
                                <Button type="primary" size="large" v-text="okText" @click.native="closeModal"></Button>
                            </div>
                        </Modal>

                    </Form-item>
                    </Col>
                    <Col span="8">
                    <Form-item label="部署区域:" class="form-item">{{formValidate.az_name}}</Form-item>
                    </Col>
                    <Col span="8">
                    <Form-item label="部门:" class="form-item">
                        {{formValidate.department}}


                    </Form-item>
                    </Col>
                </Row>
            </Form>

            <Form v-for="(item, idx) in formValidate.resources" :label-width="120"
                  :class="{border: idx == 0?false:true}">
                <Row>
                    <Col span="8">
                    <Form-item label="虚拟机:" class="form-item">
                        <span class="form-item-virtual" :title="item.vm_name">{{item.vm_name}}</span>
                    </Form-item>
                    <Form-item label="存储空间:" class="form-item">{{item.storage}} G</Form-item>
                    </Col>
                    <Col span="8">
                    <Form-item label="操作系统:" class="form-item">
                        <div class="jingx">{{item.image_name}}</div>
                    </Form-item>
                    <Form-item label="数量:" class="form-item">{{item.vm_num}}</Form-item>
                    </Col>
                    <Col span="8">
                    <Form-item label="规格:" class="form-item">{{item.flavor_name}}</Form-item>
                    </Col>
                </Row>
            </Form>

            <Row>
                <Col span="24">
                <div class="sub-title">业务信息</div>
                <Input v-model="ywInfo" type="textarea" :maxlength="100" :rows="4" disabled
                       placeholder="示例：xxx业务为xxx提供互联网服务，此业务位于政务外网区域，业务上线日期预计xxx日，建设周期xx日"></Input>
                </Col>
                <Col span="24">
                <div class="sub-title"><Icon v-if="role === 'leader'" type="ios-medical"></Icon>直属领导审批意见</div>
                <Input v-model="xzInfo" type="textarea" :maxlength="100" :rows="4" :disabled="leaderDisable"></Input>
                </Col>
                <Col span="24" v-if="role === 'admin'">
                <div class="sub-title"><Icon type="ios-medical"></Icon>经信委技术审批意见</div>
                <Input v-model="jxwInfo" type="textarea" :maxlength="100" :rows="4" :disabled="adminDisable"></Input>
                </Col>
            </Row>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .rsource-approval {
        .sub-title {
            margin: 20px 0 10px 0;
            .ivu-icon-ios-medical{
                color:red;
                margin-right: 5px;
            }
        }
        .approval-button {
            display: flex;
            justify-content: flex-end;
            box-sizing: border-box;
            Button {
                /*background-color: #39f;*/
                margin: 0 4px;
            }
        }

        .approval-status {
            width: 90%;
            margin: 30px auto;
        }

        .status-list {
            clear: both;
            .rd_right {
                text-align: right;
            }
            .rd_left {
                text-align: left;
            }
            .rd_pro1 {
                display: inline-block;
                vertical-align: top;
                padding-right: 10px;
                width: 80px;
                min-width: 80px;
                height: 23px;
                line-height: 23px;
            }
            .rd_pro2 {
                display: inline-block;
                vertical-align: top;
                padding-left: 10px;
                min-width: 80px;
                height: 23px;
                line-height: 23px;
            }

            .status-content {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li {
                    width: 340px;
                    margin: 10px 0;
                }
            }
        }
        .form-info {
            .border {
                border-top: 1px solid #e4e4e4
            }
            .form-item {
                margin-bottom: 8px;
                .form-item-virtual {
                    display: inline-block;
                    width: 159px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    /*border: 1px solid #000;*/
                }
                .jingx {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .form-item-span {
                    padding-left: 10px;
                    color: #3F94FC;
                    cursor: pointer;
                }
                .case-title {
                    height: 45px;
                    line-height: 45px;
                    font-style: normal;
                    font-size: 16px;
                    clear: both;
                }
                .case-btn {
                    margin-top: 5px;
                    float: right;
                }
                .case-content {
                    .case-sub-title {
                        margin-bottom: 5px;
                        font-size: 14px;
                    }
                    .case-custom-table {
                        width: 50%;
                        border-collapse: collapse;
                        color: #657180;
                        td {
                            text-align: center;
                            border: 1px solid #dddee1;
                        }
                        tr {
                            height: 35px;
                        }
                    }
                    .case-data-table {
                        width: 100%;
                        border-collapse: collapse;
                        color: #657180;
                        tr {
                            height: 35px;
                        }
                        th {
                            text-align: center;
                            border: 1px solid #dddee1;
                        }
                        td {
                            text-align: center;
                            border: 1px solid #dddee1;
                        }
                        thead {
                            tr {
                                background-color: #ebf4fe;
                            }
                        }
                    }

                }
            }
        }
    }

    .rs_title {
        width: 100%;
        height: 20px;
        padding-left: 5px;
        background-color: #f2f2f2;
        font-size: 14px;
        line-height: 20px;
        margin: 20px 0;
        color: #000;
    }

    .rd_status_title {
        width: 100%;
        height: 20px;
        padding-left: 5px;
        font-size: 14px;
        line-height: 20px;
        margin: 20px 0;
        color: #000;
    }

    .rd_center {
        text-align: center;
    }

    .rd_graph {
        display: inline-block;
        vertical-align: top;
        width: 80px;
        min-width: 80px;
        height: 23px;
        line-height: 23px;
    }

    .graph {
        /*float:left;*/
        display: inline-block;
        margin: 0 0 0 15px;
        background-color: #D7D7D7;
        -moz-box-shadow: 0px 4px 5px #D7D7D7; /* 老的 Firefox */
        box-shadow: 0px 4px 5px #D7D7D7;
        /*position:relative;*/
        width: 100%;
        padding: 0
    }

    .graph .bar {
        display: block;
        position: relative;
        background-color: #FFDF25;
        text-align: center;
        color: #fff;
        height: 19px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
    }

    .graph .bar span {
        position: absolute;
        left: 1em
    }

    .instance-title {
        font-size: 16px;
        line-height: 38px;
    }

    .modal-wrap {
        width: 90%;
        margin: 0 auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        color: #657180;
    }

    table td, th {
        text-align: center;

    }

    table tr {
        height: 40px;
        border: 1px solid #dddee1;
    }

    table thead tr {
        background-color: #ebf4fe;
    }

    table tbody tr:hover {
        background-color: #F3FAFF;
    }

    table tbody tr td:first-child {
        background-color: #ebf4fe;
        width: 120px;
    }

    @media all and (max-width: 1024px) {
        .approval-status {
            width: 90%;
        }
    }

    @media all and (max-width: 1024px) {
        .approval-status {
            width: 90%;
        }
    }

</style>

<script>

    export default {
        data() {
            return {
                instanceCreate: false,
                okText: '关闭',
                tj_columns: [
                    {
                        title: '配置',
                        key: 'configuration',
                        align: 'center'
                    },
                    {
                        title: '数量(台)',
                        key: 'number',
                        align: 'center',
                        width: '150'
                    }
                ],

                stepNum: 0,
                stepsStatus: 'process',
                userId: '',
                resourceId: '',
                isTjpz: false,//推荐配置
                flavor_name: '',//规格名称
                flavorList: [],
                image_name: '',//操作系统名称
                imageList: [],
                funcBtns: ['返回', '通过', '不通过'],

                formValidate: {
                    status: ''
                },

                someHosts: [],      // 某个hosts

                poolStatus: {
                    cpu_use: 0,
                    cpu_total: 0,
                    memory_use: 0,
                    memory_total: 0,
                    storage_use: 0,
                    storage_total: 0,
                },  // 资源池使用情况

                recomConfig: {},    // 推荐配置
                configData: {
                    cpu: 2,
                    memory: 4,
                    storage: 50,
                    num: 1
                },

                ywInfo: '',
                xzInfo: '',
                xzFlag:true,
                jxwInfo: '',
                jxwFlag:true,
                role: '',

                index: 0
            }
        },

        created () {
            this.resourceId = this.$route.query.id;
            this.role = this.$store.state.userData.userInfo.role
            console.log("****************",this.role);
            if (this.resourceId) {
                const query = {resource_id: this.resourceId};
                // 规格列表
                this.getFlaver()
                // 镜像列表
                this.getImage()
                // 资源信息
                this.getInfo(query)
            }
        },

        computed: {
            buttonDisable() {
                if (this.role === 'leader') {
                    switch (this.formValidate.status) {
                        case 'submit':
                            return true
                        default:
                            return false
                    }
                } else if (this.role === 'admin') {
                    switch (this.formValidate.status) {
                        case 'l_success':
                            return true
                        default:
                            return false
                    }
                }

            },

            leaderDisable() {
                return this.role !== 'leader' || !(this.formValidate.status === 'submit')
            },

            adminDisable() {
                return !(this.formValidate.status === 'l_success')
            },

            configuration() {
                return [
                    {
                        configuration: 'CPU：' + this.configData.cpu + '核 | 内存：' + this.configData.memory + 'G | 硬盘：' + this.configData.storage + 'G',
                        number: this.configData.num
                    }
                ]
            }
        },

        watch: {
            index(newVal)  {
                if (newVal === 3) {
                    switch (this.formValidate.status) {
                        case 'submit':
                            this.stepNum = 1;
                            this.stepsStatus = 'process'
                            break
                        case 'l_success':
                            this.stepNum = 2;
                            this.stepsStatus = 'process'
                            break
                        case 'l_fail':
                            this.stepNum = 1;
                            this.stepsStatus = 'error'
                            break
                        case 'a_success':
                            this.stepNum = 3;
                            this.stepsStatus = 'finish'
                            break
                        case 'a_fail':
                            this.stepNum = 2;
                            this.stepsStatus = 'error'
                            break
                        case 'created_success':
                            this.stepNum = 3;
                            this.stepsStatus = 'finish'

                            break
                    }

                    this.ywInfo = this.formValidate.business_info;
                    this.xzInfo = this.formValidate.suggestion || '';
                    this.jxwInfo = this.formValidate.admin_suggestion || '';

                    this.formValidate.vCPU_total = 0
                    this.formValidate.memory_total = 0
                    this.formValidate.storage_total = 0

                    this.formValidate.resources.forEach((ritem, index) => {

                        this.flavorList.forEach((fitem, index) => {
                            if (ritem.flavor_id == fitem.flavor_id) {
                                ritem.flavor_name = fitem.flavor_name;
                                ritem.cpu = fitem.cpu;
                                ritem.memory = fitem.memory;
                                return;
                            }
                        });
                        this.imageList.forEach((iitem, index) => {
                            if (ritem.image_id == iitem.id) {
                                ritem.image_name = iitem.image_name;
                                return;
                            }
                        })
                        this.formValidate.vCPU_total += ritem.cpu
                        this.formValidate.memory_total += ritem.memory
                        this.formValidate.storage_total += ritem.storage
                    })
                    console.log('formValidate', this.formValidate)
                    // 请求资源池列表
                    this.getPoolList()
                }
            },
            "xzInfo":function (newVal,oldVal) {
                if(newVal){
                    this.xzFlag=false;
                }else {
                    this.xzFlag=true;
                }
            },
            "jxwInfo":function (newVal,oldVal) {
                if(newVal){
                    this.jxwFlag=false;
                }else {
                    this.jxwFlag=true;
                }
            }
        },

        methods: {
            onLink(index) {
                switch (index) {
                    case 0:
                        this.$router.go(-1);
                        break;
                    case 1:
                        if (this.role === 'leader') {
                            this.onSubmit('l_success');//审批完成
                        } else if (this.role === 'admin') {
                            this.onSubmit('a_success');//审批完成
                        }
                        break;
                    default:
                        if (this.role === 'leader') {
                            this.onSubmit('l_fail');//审批完成
                        } else {
                            this.onSubmit('a_fail');//审批完成
                        }
                }
            },

            onSubmit (status) {
                let query = {resource_id: this.resourceId, status: status}

                if (this.role === 'leader') {
                    query.suggestion = this.xzInfo
                } else if (this.role === 'admin') {
                    query.admin_suggestion = this.jxwInfo
                }

                const url = 'api/mpc_resource/mpc_resources';

                this.$http.put(url, query).then(res => {
                    if (res.body.code === 200) {
                        if (status == 'l_success' || status == 'a_success') {
                            this.$Message.success('通过完成!');
                        } else if (status == 'l_fail' || status == 'a_fail') {
                            this.$Message.success('不通过完成!');
                        }
                        if (this.role === 'leader') {
                            this.$router.push({name: '资源查询'});
                        } else {
                            this.$router.push({name: '资源审批管理'});
                        }
                    }
                }, err => {
                    this.$Message.error(err.body.result.msg)
                });
            },

            // 点击推荐配置
            onInstanceDetails () {    //展示实例详情推荐配置
                if (this.formValidate.instance_id) {
                    this.instanceCreate = true
                    this.getDeploy(this.formValidate.instance_id)
                } else {
                    this.$Message.error('没有实例ID')
                }

            },

            getInfo (query) {
                const url = 'api/mpc_resource/mpc_resources';
                this.$http.get(url, {params: query}).then((res) => {
                    if (res.body.code === 200) {
                        this.formValidate = res.body.result.res[0]
                        this.index++
                    }
                }, (err) => {
                    console.log(err)
                });
            },

            getFlaver () {//获取规格
                const url = 'api/flavor/flavors'
                this.$http.get(url).then((res) => {
                    if (res.body.code === 200) {
                        this.flavorList = res.body.result.res;
                        this.index++
                    }
                }, (err) => {
                    console.log(err)
                });
            },

            getImage () { //  获取操作系统
                const url = 'api/image/images'
                this.$http.get(url).then((res) => {
                    if (res.body.code === 200) {
                        this.imageList = res.body.result.res;
                        this.index++
                    }
                }, (err) => {
                    console.log(err)
                })
            },

            getPoolList() {
                let url = 'api/pool/pools'
                this.$http.get(url).then(res => {
                    if (res.body.code === 200) {
                        let someHosts = null
                        res.body.result.res.forEach(item => {
                            if (item.pool_name === this.formValidate.az_name) {
                                someHosts = item.hosts
                                return
                            }
                        })
                        // 请求资源池详情
                        this.getHosts(someHosts)
                    } else {
                        this.$Message.error(res.body.result.msg)
                    }
                }, err => {
                    this.$Message.error(res.body.result.msg)
                })
            },

            getHosts(hosts) {
                let url = 'api/pool/getHosts'
                let params = ''
                hosts.forEach(item => {
                    params += ('&host=' + item)
                })
                url += ('?' + params.slice(1))

                this.$http.get(url).then(res => {
                    if (res.body.code === 200) {
                        this.poolStatus.cpu_use = this.countSum(res.body.result.res, 'vcpu_use')
                        this.poolStatus.cpu_total = this.countSum(res.body.result.res, 'vcpu_total')
                        this.poolStatus.memory_use = parseInt(this.countSum(res.body.result.res, 'memory_mb_use') / 1024)
                        this.poolStatus.memory_total = parseInt(this.countSum(res.body.result.res, 'memory_mb_total') / 1024)
                        this.poolStatus.storage_use = this.countSum(res.body.result.res, 'storage_gb_use')
                        this.poolStatus.storage_total = this.countSum(res.body.result.res, 'storage_gb_total')
                    } else {
                        this.$Message.error(res.body.result.msg)
                    }
                }, err => {
                    console.log('error', err)
                })
            },

            getDeploy(id) {
                let url = 'api/deploy_instance/deploy_instances'
                let query = {instance_id: id}
                this.$http.get(url, {params: query}).then((res) => {
                    if (res.body.code === 200) {
                        if (res.body.result.res.length) {
                            this.recomConfig = res.body.result.res[0]
                            this.countConfig(this.recomConfig)
                        } else {
                            this.$Message.error('没有部署实例')
                        }
                    }
                }, (err) => {
                    console.log(err)
                });
            },

            countConfig(config) {
                let cpu = []
                let memory = []
                let storage = []
                let num = []
                switch (config.user_size) {
                    case '内网少量用户':
                        cpu.push(2);
                        memory.push(4);
                        storage.push(50);
                        num.push(1)
                        break
                    case '内网大量用户':
                        cpu.push(4);
                        memory.push(8);
                        storage.push(100);
                        num.push(1)
                        break
                    case '外网少量用户':
                        cpu.push4;
                        memory.push(8);
                        storage.push(100);
                        num.push(1)
                        break
                    case '外网大量用户':
                        cpu.push(8);
                        memory.push(16);
                        storage.push(200);
                        num.push(1)
                        break
                    default:
                }
                switch (config.liveness) {
                    case '偶尔使用':
                        cpu.push(2);
                        memory.push(4);
                        storage.push(50);
                        num.push(1)
                        break
                    case '经常使用':
                        cpu.push(4);
                        memory.push(8);
                        storage.push(100);
                        num.push(2)
                        break
                    case '频繁使用':
                        cpu.push(8);
                        memory.push(16);
                        storage.push(200);
                        num.push(4)
                        break
                    default:
                }
                switch (config.business_type) {
                    case '网站':
                        cpu.push(2);
                        memory.push(4);
                        storage.push(50);
                        num.push(2)
                        break
                    case '存储类应用':
                        cpu.push(4);
                        memory.push(8);
                        storage.push(500);
                        num.push(4)
                        break
                    case '视频':
                        cpu.push(8);
                        memory.push(16);
                        storage.push(500);
                        num.push(4)
                        break
                    case '大数据':
                        cpu.push(8);
                        memory.push(16);
                        storage.push(500);
                        num.push(4)
                        break
                    default:
                }
                switch (config.data_unit) {
                    case 'MB':
                        cpu.push(2);
                        memory.push(4);
                        storage.push(50);
                        num.push(1)
                        break
                    case 'GB':
                        cpu.push(4);
                        memory.push(8);
                        storage.push(500);
                        num.push(2)
                        break
                    case 'TB':
                        cpu.push(8);
                        memory.push(16);
                        storage.push(500);
                        num.push(4)
                        break
                    default:
                }
                cpu.sort((a, b) => {
                    return b - a
                });
                memory.sort((a, b) => {
                    return b - a
                });
                storage.sort((a, b) => {
                    return b - a
                });
                num.sort((a, b) => {
                    return b - a
                });
                this.configData.cpu = cpu[0]
                this.configData.memory = memory[0]
                this.configData.storage = storage[0]
                this.configData.num = num[0]

                switch (config.ha) {
                    case '需要':
                        this.configData.cpu *= 2
                        this.configData.memory *= 2
                        this.configData.storage *= 2
                        this.configData.num *= 2
                        break
                    default:
                }

            },

            closeModal () {
                this.instanceCreate = false
            },

            // 计算数据中某条信息的总和
            countSum(data, attr) {
                var sum = 0
                data.forEach(item => {
                    if ((typeof item[attr]) == 'number') {
                        sum += item[attr]
                    } else {
                        this.$Message.error('非数字')
                    }
                })
                return sum
            },
        }
    }
</script>