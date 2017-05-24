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
                    <tr v-for="(data,index) in $store.state.resourceData.datas" :key="data">
                        <td>{{ index+1 }}</td>
                        <td><a href="#">{{data.item_name}}</a></td>
                        <td>{{data.create_date}}</td>
                        <td>{{data.user}}</td>
                        <td>{{data.item_code}}</td>
                        <td>{{data.item_depart}}</td>
                        <td>
                            <Button type="primary">查看详情</Button>
                        </td>
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
   }

   table td {
       text-align: center;
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
                        title: '编号',
                        key: 'identifier'
                    },
                    {
                        title: '部署单元名称',
                        key: 'project_name'
                    },
                    {
                        title: '创建日期',
                        key: 'create_date'
                    },
                    {
                        title: '创建人',
                        key: 'creator'
                    },
                    {
                        title: '部署单元编号',
                        key: 'project_code'
                    },
                    {
                        title: '归属部门',
                        key: 'department'
                    },
                    {
                        title: '操作',
                        key: 'action'
                    }
                ],
//                datas:[
//                    {
//                        project_name: '企通签到',
//                        create_date: '2017-5-24',
//                        creator: '赵舜东',
//                        project_code: 'qitong-0001',
//                        department: '应用统筹部'
//                    },
//                    {
//                        project_name: '用户中心1',
//                        create_date: '2017-5-24',
//                        creator: '赵舜东',
//                        project_code: 'user-0001',
//                        department: '应用统筹部'
//                    },
//                    {
//                        project_name: '用户中心2',
//                        create_date: '2017-5-24',
//                        creator: '赵舜东',
//                        project_code: 'user-0002',
//                        department: '应用统筹部'
//                    },
//                    {
//                        project_name: '用户中心3',
//                        create_date: '2017-5-24',
//                        creator: '赵舜东',
//                        project_code: 'user-0003',
//                        department: '应用统筹部'
//                    }
//
//                ],
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