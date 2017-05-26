<template>
    <div class="public-content">
        <!--部署单元内容-->
        <div class="table-search clearfix">
            <div class="search-select fl">
                <Select v-model="selectedValue" style="width:200px">
                    <Option v-for="item in selectList" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="search-input fl">
                <Input v-model="inputValue" placeholder="请输入实例名称模糊查询" style="width: 300px"></Input>
            </div>
            <div class="search-btn fl">
                <Button type="primary" icon="ios-search">搜索</Button>
            </div>
        </div>
        <div class="table-content">
            <table>
                <thead>
                    <tr>
                        <th v-for="column in columns" :key="column.key">{{column.title}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data,index) in datas" :key="data">
                        <td>{{ index+1 }}</td>
                        <td>{{data.instanceID}}</td>
                        <td>{{ data.ip }}</td>
                        <td>{{data.status}}</td>
                        <td>
                            <span v-for="configObj in data.config" :key="configObj">
                                 {{ configObj.name}} : {{configObj.value}}
                                <br>
                            </span>
                        </td>
                        <td>{{data.max_memory}}</td>
                        <td>{{data.default_user}}</td>
                        <td>{{data.default_pwd}}</td>
                        <td>{{data.create_date}}</td>
                        <td>{{data.in_deploy_unit}}</td>
                    </tr>
                </tbody>
            </table>
           <!--分页-->
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page
                            :total="100"
                            :page-size="pageSize"
                            :current="1"
                            show-sizer
                            @on-change="changePage"
                            @on-page-size-change="changePageSize"
                    ></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .public-content {
        min-height: 500px;
    }
   .search-input {
       margin: 0 10px;
   }
   .table-content {
       margin-top: 20px;
   }
    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
    }

    table td, table th{
        text-align: center;
        border: 1px solid #D7DDE4;
    }

   table tr {
       height: 50px;
       border: 1px solid #D7DDE4;
   }

   table thead tr {
       background-color: #F5F7F9;
   }

   table tbody tr:hover {
       background-color: #F3FAFF;
   }

</style>
<script>
    export default {
        data () {
            return {
                // 搜索输入框内容
                inputValue:'',
                // 下拉列表内容
                selectList: [
                    {
                        value: 'instanceName',
                        label: '实例名称'
                    },
                    {
                        value: 'ip',
                        label: 'ip地址'
                    }
                ],
                // 下拉列表选中的值
                selectedValue: '',

                // 表格数据
                columns: [
                    {
                        title: '序号',
                        key: 'identifier'
                    },
                    {
                        title: '实例ID/名称',
                        key: 'instanceID'
                    },
                    {
                        title: 'IP地址',
                        key: 'ip'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '配置',
                        key: 'config'
                    },
                    {
                        title: '最大内存',
                        key: 'max_memory'
                    },
                    {
                        title: '默认用户',
                        key: 'default_user'
                    },
                    {
                        title: '默认密码',
                        key: 'default_pwd'
                    },
                    {
                        title: '创建日期',
                        key: 'create_date'
                    },
                    {
                        title: '所属部署单元',
                        key: 'in_deploy_unit'
                    }
                ],
                datas:[
                    {
                        instanceID: 'redis_node1',
                        ip: '192.168.56.11',
                        status: '运行中',
                        config: [
                            {
                                name: 'CPU',
                                value: '1核'
                            },
                            {
                                name: '内存',
                                value: '2GB'
                            }
                        ],
                        max_memory:3000,
                        default_user: 'root',
                        default_pwd: '123456',
                        create_date: '2017-5-24',
                        in_deploy_unit: '企通签到'
                    },
                    {
                        instanceID: 'redis_node2',
                        ip: '192.168.56.11',
                        status: '运行中',
                        config: [
                            {
                                name: 'CPU',
                                value: '1核'
                            },
                            {
                                name: '内存',
                                value: '2GB'
                            }
                        ],
                        max_memory:3000,
                        default_user: 'root',
                        default_pwd: '123456',
                        create_date: '2017-5-24',
                        in_deploy_unit: '企通签到'
                    }
                ],
                // 分页数据
                pageSize: 10
            }
        },
        methods:{
            //实现分页  改变后的页码
            changePage (page) {
                console.log(page);

            },
            // 返回切换后的每页条数
            changePageSize (pageSize) {
                console.log(pageSize);
            }
        }
    }
</script>