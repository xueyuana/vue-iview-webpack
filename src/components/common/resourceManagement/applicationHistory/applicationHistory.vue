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
                <div><span>所属项目：</span><Input style="width: 160px"></Input></div>
                </Col>
                <Col span="2" class="contain-button">
                <Button size="large">查询</Button>
                </Col>
            </Row>
        </div>
        <div class="result">
            <Table size="large" :columns="columns" :data="queryData" border :width="1200"></Table>
        </div>
    </div>
</template>
<style scoped>

    .wrap {
        padding: 10px 20px;
    }
    .query {
        width: 1200px;
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
                align: 'center'
            },
            {
                title: '表单状态',
                key: 'formStatus',
                align: 'center'
            },
            {
                title: '审批状态',
                key: 'approveStatus',
                align: 'center'
            },
            {
                title: '所属项目',
                key: 'project',
                width: 280,
                align: 'center'
            },
            {
                title: '操作',
                key: 'operate',
                align: 'center',
                render: (h,params) => {
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
                            console.log('点击了')
                    }
            }
    },'查看')
    ])
    }
    }
    ],
    queryData: [
        {
            name: '发起人',
            date: '2017.12.1',
            resource: '资源',
            formStatus: '审批中',
            approveStatus: '审批中',
            project: '项目'
        }
    ]
    }
    }

    }
</script>