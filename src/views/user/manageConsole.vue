<template>
    <div class="box">
        <div class="sub-title-bg">
            <span>资源概览</span>
        </div>
        <div class="survey">
            <div class="survey-list">
                <Row :gutter="24">
                    <Col span="8">
                        <div class="computer public">
                            <div class="top clearfix">
                                <div class="top_left fl">
                                    <Icon type="ios-monitor" size="62" color="#8BC34A"></Icon>
                                </div>
                                <div class="top_right fr">
                                    <div class="count">{{ instance }}</div>
                                    <div class="name">部署实例</div>
                                </div>
                            </div>

                        </div>
                    </Col>
                    <Col span="8">
                        <div class="deployment public">
                            <div class="top clearfix">
                                <div class="top_left fl">
                                    <Icon type="ios-cloud" size="62" color="#ff8a65"></Icon>
                                </div>
                                <div class="top_right fr">
                                    <div class="count">{{ vm_length }}</div>
                                    <div class="name">云主机</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="database public">
                            <div class="top clearfix">
                                <div class="top_left fl">
                                    <Icon type="easel" size="62" color="#8BC34A"></Icon>
                                </div>
                                <div class="top_right fr">
                                    <div class="count">{{ cpu }}</div>
                                    <div class="name">VCPU</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div class="proMain clearfix">
            <Row :gutter="24">
                <Col span="8">
                    <div class="cache public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <Icon type="android-options" size="62" color="#3BCCE1"></Icon>
                            </div>
                            <div class="top_right fr">
                                <div class="count">{{ memory }}G</div>
                                <div class="name">内存</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="cache public">
                        <div class="top clearfix">
                            <div class="top_left fl">
                                <Icon type="social-instagram" size="62" color="#BA68C8"></Icon>
                            </div>
                            <div class="top_right fr">
                                <div class="count">{{ storage }}G</div>
                                <div class="name">硬盘</div>
                            </div>
                        </div>
                    </div>
                </Col>
               <Col span="8">
                   <div class="proButtons">
                       <div @click="goResourceApp">
                           <div class="title"><Icon type="plus" size="20"></Icon> 资源申请</div>
                       </div>
                   </div>
               </Col>
            </Row>
        </div>
        <div class="sub-title-bg">
            <span>资源审批</span>
        </div>
        <Row class="c_application">
            <Col span="12">
                <div @click="myApplication">
                    <Icon type="record" size="10"></Icon>我的申请
                    <span class="title">待审批：</span><span class="num">{{ wait_approve }}</span>
                    <span class="title">审批完成：</span><span class="num">{{ success }}</span>
                    <span class="title">审批未通过：</span><span class="num">{{ refuse }}</span>
                </div>
            </Col>
            <Col span="12"></Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
              user_info: {},
              flavor: [],
              index: 0,
              vm: [],
                // 统计个数
              instance: 0,
              vm_length: 0,
              cpu: 0,
              memory: 0,
              storage: 0,
              pendingApproval: 1,
              approved: 1,
              success: 0,
              wait_approve: 0,
              refuse: 0

            }
        },

        created() {

          this.getUser()//获取用户信息
          this.getInstance()//获取实例
          this.getFlavor()//获取规格

          this.getVm()
          this.getUserResource()

        },
        methods: {
          getFlavor () {//获取虚拟规格
            const url = 'api/flavor/flavors'

            this.$http.get(url).then((res) => {
//
              this.flavor = res.body.result.res

              this.index ++
              console.log('规格',this.flavor)
            },(err) => {
              console.log(err)
            })

          },
          getInstance () {//获取实例
            const url = 'api/deploy_instance/deploy_instances'

            let params = {
              user_id: this.user_info.id
            }

            this.$http.get(url,{params:params}).then((res) => {

              this.instance = res.body.result.res.length

            },(err) => {
              console.log(err)
            })
          },
          getVm () {//获取虚拟机
            const url = 'api/mpc_resource/mpc_resource_creater'

            let query = {user_id: this.user_info.id}

            this.$http.get(url,{params: query}).then((res) => {

              this.vm_length = res.body.result.res.length
              this.vm = res.body.result.res

              this.index ++
              console.log('虚机',res.body.result.res)

            },(err) => {
              console.log(err)
            })

          },
          getUserResource () {

            const url = 'api/mpc_resource/mpc_resources'

            let query = {user_id: this.user_info.id}


            this.$http.get(url,{params: query}).then((res) => {
              console.log(res)

              res.body.result.res.forEach((item,index) => {

                if(item.status == 'submit' || item.status == 'l_success') {

                  this.wait_approve ++
                }else if(item.status == 'a_success' || item.status == 'created_success') {
                  this.success ++
                }else {
                  this.refuse ++
                }
              })




            },(err) => {
              console.log(err)
            })

          },
          getUser () {

            Object.assign(this.user_info,this.$store.state.userData.userInfo)

          },
          formatData () {

            this.vm.forEach((vm,index) => {

              this.flavor.forEach((flavor,index) => {
                if(vm.flavor_id == flavor.flavor_id) {

                  this.cpu += flavor.cpu

                  this.memory += flavor.memory/1024

                  this.storage += vm.storage

                }

              })


            })
            console.log(this.cpu,this.memory)


          },

          goResourceApp () {
                this.$router.push({name: '资源申请'});
            },
          myApplication () {
                this.$router.push({name: '资源查询'});
            }
        },
      watch: {
        index (newVal) {
          if(newVal == 2) {

            this.formatData()

          }

        }
      }
    }
</script>

<style scoped>
    .survey-list {
        margin-top: 10px;
    }
    .survey-list h3 {
        padding: 5px 10px;
        background-color: #D7D7D7;
    }
    .survey-list li {
        margin: 10px 0px;
    }

    .public .top {
        height: 144px;
        background: #FFFFFF;
        border: 1px solid #EAEDF1;
        padding: 0 20px;
        color: #AEAEAE;
        border-radius: 2px;
    }
    .public .bottom {
        height: 40px;
        line-height: 40px;
        border: 1px solid #aaa;
        padding: 0 10px;
        cursor: pointer;
        border-radius: 4px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
    .top .top_left {
        font-size: 40px;
        line-height: 100px;

    }
    .top .top_right {
        font-size: 20px;
        text-align: center;
        margin-top: 20px;
    }
    .top_right .name {
        margin-top: 20px;
    }
    .bottom {
        color: #333333;
    }
    .bottom .arrow {
        font-size: 18px;
    }
    .proMain {
        margin: 40px 0;
    }
    .proCard {
        border: 1px solid #39f;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        height: 120px;

    }
    .proCardTitle {
        height: 30px;
        background-color: #39f;
        color: #fff;
        font-size: 16px;
        text-align: left;
        padding-left: 10px;
        padding-top: 5px;
    }
    .proCardContent {
        padding: 20px;
        color: #0066cc;
        font-size: 16px;
    }
    .proCardContent li {
        cursor: pointer;
    }
    .proCardContent .name {
        padding-right: 10px;
        display: block;
        float: left;
    }
    .proCardContent .name:hover {
        text-decoration: underline;
    }
    .proCardContent .number {
        -webkit-border-radius: 13px;
        border-radius: 13px;
        -moz-border-radius: 13px;
        background-color: red;
        color: #fff;
        width: 22px;
        height: 22px;
        text-align: center;
        display: -moz-box;
        display: -webkit-box;
        display: box;
        -moz-box-orient: horizontal;
        -webkit-box-orient: horizontal;
        box-orient: horizontal;
        -moz-box-pack: center;
        -moz-box-align: center;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        box-pack: center;
        box-align: center;

    }
    .proButtons {
        height: 120px;
    }
    .proButtons>div {
        cursor: pointer;
        font-size: 20px;
        color: #AEAEAE;
        line-height: 20px;
    }
    .proButtons .title {
        text-align: center;
        height: 144px;
        line-height: 144px;
        font-size: 20px;
        border: 1px solid #EAEDF1;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-border-radius: 2px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
    .proContent h3 {
        color: #39f;
        margin: 5px
    }
    .proContent .precontents ul li {
        margin: 5px
    }
    .box{
        /*border:1px dashed #CCC;
        padding: 30px 100px;*/
    }
</style>