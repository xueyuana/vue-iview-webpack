<template>
    <div>
        <div class="container">
            <div class="but-container">
                <Button type="primary" class="button">通过</Button>
                <Button type="primary">不通过</Button>
            </div>
            <div>
                <Button class="buttons">开发环境</Button>
                <Button class="buttons">测试环境</Button>
                <Button class="buttons">生产环境</Button>
            </div>
            <div class="project">
                <p>项目信息：</p>
            </div>
        </div>
    </div>

</template>
<style>
    .container {
        width: 860px;
        margin: 20px 30px;
    }

    .but-container{
        text-align: right;
    }
    .button{
        margin-right:20px;
    }
    .buttons{
        margin-right:10px;
    }
    .project{
        margin: 10px 0;
    }
    p{
        height: 20px;
        line-height: 20px;
        font-weight: 700;
        font-style: normal;
        text-align: left;
        font-size: 13px;
        color: #333333;
        background-color: #f2f2f2;
    }
</style>
