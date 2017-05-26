<!--资源申请历史-->
<template>
    <div class="wrap">
        <div class="query">
            <Row class="query-row">
                <Col span="6">
                <div><span>发起人:</span><Input style="width: 160px"></Input></div>
                <div>
                    <span>审批状态:</span>
                    <Select style="width: 160px">
                        <option></option>
                    </Select>
                </div>
                </Col>
                <Col span="10">
                <Row>
                    <Col span="4"><span>发起日期：</span></Col>
                    <Col span="7"><Date-picker type="date" style="width: 160px" v-model="startDate"></Date-picker></Col>
                    <Col span="3"><span>至</span></Col>
                    <Col span="8"><Date-picker type="date" style="width: 160px" :options="option" v-model="endDate" ></Date-picker></Col>
                </Row>
                <div>
                    <span>表单状态：</span>
                    <Select style="width: 160px">
                        <option></option>
                    </Select>
                </div>
                </Col>
                <Col span="6">
                <div><span>资源名称：</span><Input style="width: 160px"></Input></div>
                <div><span>所属部署单元：</span><Input style="width: 160px"></Input></div>
                </Col>
                <Col span="2" class="contain-button">
                <Button size="large">查询</Button>
                </Col>
            </Row>
        </div>
        <div class="result">
            <Table :columns="columns" :data="filterDate" border :width="1200"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="this.queryData.length" :page-size="pageSize" :current="num" show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

    .wrap {
        padding: 10px 20px;
    }
    .query {
        width: 100%;
        height: 130px;
        border: 1px solid #e4e4e4;
        background-image: linear-gradient(to bottom,#fff,#e4e4e4);
        padding: 10px 0;
    }

    .query span {
        color: #000;
        display: inline-block;
        width: 80px;
        text-align: center;
    }

    .query-row >.ivu-col {
        height: 110px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .query-row > .ivu-col.contain-button {
        height: 110px;
        flex-direction: row;
        align-items: flex-end;

    }

    .result {
        margin-top: 50px;
    }


</style>
<script>

    import common from '../../../../tools/common.js';
    import {setStroage, getStroage} from 'tools/cookieAction.js'
    export default {

        data () {
        return {
            endDate: '',
            startDate: '',
            option: {
                disabledDate: (date) => {
                return date && date.valueOf() < this.startDate.valueOf()
            }
            },
                columns: [
            {
                title: '发起人',
                key: 'name',
                align: 'center'
            },
            {
                title: '发起日期',
                key: 'date',
                align: 'center'
            },
            {
                title: '资源名称',
                key: 'resource',
                align: 'center',
                render: (h, params) => {
                //判断是否是管理员只有管理员才能点击
                if(getStroage('userInfo').is_admin){
                return h('a',{on: {
                    click: () => {
                    this.gotoCheck(params.index);}
                   }
                },params.row['resource'])
            }else{
                return h('div',params.row['resource'])
    }

            }
            },
            {
                title: '表单状态',
                key: 'formStatus',
                align: 'center'
            },
            {
                title: '审批状态',
                key: 'approval_status',
                align: 'center'
            },
            {
                title: '所属部署单元',
                key: 'project',
                width: 280,
                align: 'center'
            },
            {
                title: '操作',
                key: 'operate',
                align: 'center',
                render: (h,params) => {
               if(this.filterDate[params.index].approval_status == "审批完成"){
                   return h('div',[
                       h('Button',{
                           props: {
                               type: 'primary',
                               size: 'small'
                           },
                           style: {
                               marginRight: '5px'
                           },
                           on: {
                               click: () => {
                               this.gotoAdd(params.index);
               }}},'创建')])
             }else if(this.filterDate[params.index].approval_status == "审批中"){
        return h('div',[
            h('Button',{
                props: {

                    size: 'small'
                },
                style: {
                    marginRight: '5px'
                }
              },'创建')])
            }{
        return h('div',[
            h('Button',{
                props: {
                    type: 'primary',
                    size: 'small'
                },
                style: {
                    marginRight: '5px'
                },
                on: {
                    click: () => {
                    this.gotoEdit(params.index);
                    }}},'编辑')])
                   } }
                 }
    ],
    queryData: [
        {
            name: 'sdfsd',
            date: 'sdfsf',
            resource: 'sdfsf',
            formStatus: 'sdfdsf',
            approval_status: 'success',
            project: 'sdfsf',
            id:'123'
        },
        {
            name: 'sdfsd',
            date: 'sdfsf',
            resource: 'sdfsf',
            formStatus: 'sdfdsf',
            approval_status: '流程不存在',
            project: 'sdfsf',
            id:'123'
        },
        {
            name: 'sdfsd',
            date: 'sdfsf',
            resource: 'sdfsf',
            formStatus: 'sdfdsf',
            approval_status: 'processing',
            project: 'sdfsf',
            id:'123'
        }
    ],

        // 分页数据
        filterDate: [],
        pageSize: 10,
        num: 1
    }
    },
    beforeCreate(){

      //取得资源申请列表数据
//        let userid= userinfo.user_id;
        console.log(this.queryData)

        //取得资源申请列表数据
        let userid= getStroage('userInfo').user_id;
        let ifadmin = getStroage('userInfo').is_admin;
        let url="";
        if( ifadmin ){
            url=common.apihost+'resource/';
        }else{
            url=common.apihost+'resource/?user_id='+userid;
        }
        console.log(url);
        this.$http.get(url, {emulateJSON:true}  ).then(function (response) {

             console.log(response.body.result.msg);
            if(response.body.code===200 && response.body.result.res=="success") {
                    this.queryData=response.body.result.msg;
               let msgs= response.body.result.msg;

                for (var index in msgs) {
                    if(msgs[index].approval_status == "unsubmit"){
                        this.queryData[index].approval_status="流程不存在";
                    }
                    if(msgs[index].approval_status == "processing"){
                        this.queryData[index].approval_status="审批中";
                    }
                    if(msgs[index].approval_status == "success"){
                        this.queryData[index].approval_status="审批完成";
                    }
                    if(msgs[index].approval_status == "failed"){
                        this.queryData[index].approval_status="审批不通过";
                    }
                }

              this.filterDate = this.mockTableData(this.queryData, this.pageSize, 1)
            }

            // 成功回调
        }, function () {
            this.$Message.error('登陆失败!');
            // 失败回调
        });
    },

    methods:{

        //新增一条资源
        gotoAdd(index){
            const url=common.apihost+'approval/reservation';
            let resourcejson={"resource_id": this.queryData[index].id}
            this.$http.post(url,resourcejson, {emulateJSON:true}  ).then(function (response) {


                if(response.body.code===200 ) {
                   // this.$Message.success('提交成功!');
                    console.log("添加资源预留");
                    this.$router.push({name: 'applicationDeployment',query: { id:  this.filterDate[index].id }});
                }
                // 成功回调
            }, function () {

            });
        },
        //跳转到编辑页面
        gotoEdit(index){
            console.log(this.queryData[index].id);
            this.$router.push({name: 'resourceApplication',query: { id:  this.filterDate[index].id }});
        },
        //跳转到审批页面
        gotoCheck(index){
            console.log(this.queryData[index].id);
            this.$router.push({name: 'res_applicationCheck',query: { id:  this.filterDate[index].id }});
        },

      // 分页
      changePage(val) {
        this.filterDate = this.mockTableData(this.queryData, this.pageSize, val)
      },
      changePageSize(val) {
        this.pageSize = val
        this.changePage(1)
      },
      mockTableData (originData, pageSize, index) {
        let data = [];
        let num = (index - 1) * pageSize
        let maxNum = (num + pageSize) > this.queryData.length ? this.queryData.length : (num + pageSize)
        for (let i = num; i < maxNum; i++) {
          data.push({
            name: originData[i].name,
            date: originData[i].date.substring(0, 16),
            resource: originData[i].resource,
            formStatus: originData[i].formStatus,
            approval_status: originData[i].approval_status,
            project: originData[i].project,
             id: originData[i].id
          })
        }
        return data;
      }



    }

    }

</script>