<template>
    <div>
        <Row>
            <Col span="6">
              <div class="view-left">
                <Menu :theme="light" active-name="1" width="auto">
                    <Menu-item name="1">
                        <Icon type="document-text"></Icon>
                        文章管理
                    </Menu-item>
                    <Menu-item name="2">
                        <Icon type="chatbubbles"></Icon>
                        评论管理
                    </Menu-item>
                    <Menu-item name="3">
                        <Icon type="heart"></Icon>
                        用户留存
                    </Menu-item>
                    <Menu-item name="4">
                        <Icon type="heart-broken"></Icon>
                        流失用户
                    </Menu-item>
                </Menu>
            </div>
            </Col>
            <Col span="18">
                <div class="view-right">

                </div>
            </Col>
        </Row>
    </div>
</template>

<style scoped>


</style>
<script>

</script>