<template>
    <div>
        <Row>
            <Col span="4">
              <div class="view-left">
                <Menu :theme="theme" active-name="1" width="auto" @on-select="goResourceTree">
                    <Menu-item :name="data.item_id" v-for="(data,index) in datas" :key="data">
                        <Icon type="star"></Icon>
                        {{ data.item_name }}
                    </Menu-item>
                </Menu>
            </div>
            </Col>
            <Col span="20">
                <div class="view-right">
                    <router-view></router-view>
                </div>
            </Col>
        </Row>
    </div>
</template>

<style scoped>


</style>
<script>
    import common from '../../../../tools/common.js';
    export default {
        data () {
            return {
                theme: 'light',
                datas:[]
            }
        },
        mounted() {
            this.getDeployUit();
        },
        methods:{
            getDeployUit() {
                const url = common.apihost + 'iteminfo/iteminfoes/project_item';
                // 查询条件
                this.$http.get(url)
                        .then(response => {
                                console.log(response);
                                if (response.body.code === 200) { // 请求成功
                                    let backDatas = response.body.result.res;
                                    this.datas=backDatas;
                                }
                        });
            },
            // 跳转到相应的资源架构图
            goResourceTree (name) {
                console.log(name);
                this.$router.push({ name:"resourceTree",params:{ resource_id:name}})
            }
        }
    }
</script>