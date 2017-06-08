<template>
    <div id="treeContent"  style="
    width: 800px;
    height: 500px;
    -webkit-tap-highlight-color: transparent;
    use-select: none;
    cursor: default;">
    </div>
</template>

<style scoped>
     #treeContent {
         margin: 0 auto;
     }
</style>
<script>
    import common from '../../../../../tools/common.js';

     var echarts = require('echarts');
    // 关系图
     require('echarts/lib/chart/graph');
    // 图的尺寸
    let width=600;
    let height=400;

    // 初始坐标
    let y=300;
    // y轴每次递增
    let stepY=100;
    let myChart;

    export default{
        data (){
            return {
//                datas: [
//                    // 部署实例层
//                    {
//                        layerName:"deployInstance",
//                        children:[
//                            {
//                                name: '部署实例',
//                                imageUrl:'deployInstance',
//                                // 提示信息
//                                tooltip: 'uop-test.syswin.com',
//                                // 关系
//                                target:['应用']
//                            }
//                        ]
//                    },
//                    // 集群层数据
//                    {
//                        layerName:"clusterLayer",
//                        children:[
//                            {
//                                name: 'Mysql',
//                                imageUrl:'mysqlCluster',
//                                tooltip: 'Mysql集群',
//                                target:['VM1','应用']
//                            },
//                            {
//                                name: '应用',
//                                imageUrl:'applicationCluster',
//                                tooltip: '应用集群',
//                                target:['VM2']
//                            },
//                            {
//                                name: 'Redis',
//                                imageUrl:'redisCluster',
//                                tooltip:'Redis集群',
//                                target:['VM3','应用']
//                            },
//                        ]
//                    },
//                    //   虚拟机层数据
//                    {
//                        layerName:"virtualLayer",
//                        children:[
//                            {
//                                name: 'VM1',
//                                imageUrl:'virtual',
//                                tooltip: 'VM1 192.168.33.77',
//                                target:['物理机1']
//                            },
//
//                            {
//                                name: 'VM2',
//                                imageUrl:'virtual',
//                                tooltip:'VM2 192.168.33.78',
//                                target:['物理机1']
//                            },
//                            {
//                                name: 'VM3',
//                                imageUrl:'virtual',
//                                tooltip: 'VM3 192.168.33.38',
//                                target:['物理机2']
//                            }
//                        ]
//                    },
//
//                    //   物理机层数据
//                    {
//                        layerName:"physicalLayer",
//                        children:[
//                            {
//                                name: '物理机1',
//                                imageUrl:'physical',
//                                tooltip: '物理机1',
//                                target:['机架']
//                            },
//
//                            {
//                                name: '物理机2',
//                                imageUrl:'physical',
//                                tooltip: '物理机2',
//                                target:['机架']
//                            }
//                        ]
//                    },
//                    //   机架层
//                    {
//                        layerName:"frameLayer",
//                        children:[
//                            {
//                                name: "机架",
//                                imageUrl:'frame',
//                                tooltip:'机架',
//                                target:['资源池']
//                            }
//                        ]
//                    },
//                    //   资源池层
//                    {
//                        layerName:"resDomainLayer",
//                        children:[
//                            {
//                                name: "资源池",
//                                imageUrl:'resDomain',
//                                tooltip: '资源池',
//                                target:['DC']
//                            }
//                        ]
//                    },
//                    //   数据中心层
//                    {
//                        layerName:"dcLayer",
//                        children:[
//                            {
//                                name: "DC",
//                                imageUrl:'DC',
//                                tooltip: '数据中心',
//                                target:[]
//                            }
//                        ]
//                    }
//                ]
            }
        },
        mounted () {
            // 基于准备好的dom，初始化echarts实例
            myChart = echarts.init(document.getElementById('treeContent'));
            myChart.showLoading();

            const url=common.apihost+"bench/source_unit_detail/"+this.$route.params.resource_id;
            this.$http.get(url)
                    .then(response => {
                           console.log(response);
                           let backDatas = response.body;
                           let mockData=[
                                {
                                    layerName:"physicalLayer",
                                    children:[
                                        {
                                            name: '物理机',
                                            imageUrl:'physical',
                                            tooltip: ['物理机'],
                                            target:['机架']
                                        }
                                    ]
                                },
                                //   机架层
                                {
                                    layerName:"frameLayer",
                                    children:[
                                        {
                                            name: "机架",
                                            imageUrl:'frame',
                                            tooltip:['机架'],
                                            target:['资源池']
                                        }
                                    ]
                                },
                                //   资源池层
                                {
                                    layerName:"resDomainLayer",
                                    children:[
                                        {
                                            name: "资源池",
                                            imageUrl:'resDomain',
                                            tooltip: ['资源池'],
                                            target:['DC']
                                        }
                                    ]
                                },
                                //   数据中心层
                                {
                                    layerName:"dcLayer",
                                    children:[
                                        {
                                            name: "DC",
                                            imageUrl:'DC',
                                            tooltip: ['数据中心'],
                                            target:[]
                                        }
                                    ]
                                }
                           ];

                            for(let i=0;i<backDatas.length;i++) {
                                let dataObj=backDatas[i];
                                if(dataObj.layerName==="virtualLayer") {
                                    dataObj.children[0].target[0]=mockData[0].children[0].name;
                                }
                            }
                           this.getDatas(backDatas.concat(mockData));
                    });
        },
        methods: {
            // 获取数据
            getDatas (datas) {
                myChart.hideLoading();
                console.log(datas);

                // 给每一个点配置坐标 指定位置
                for(let i=0;i<datas.length;i++) {
                    let dataObj=datas[i];
                    // 指定每一层的y坐标
                        // 分为几份
                    let copiesNum=dataObj.children.length+1;
                    //每一份的数量
                    let everyVal=width/copiesNum;

                    for(let j=0;j<dataObj.children.length;j++) {
                        let child=dataObj.children[j];
                        child.x=everyVal*(j+1);
                        child.y=y+stepY;
                    }
                    // 重新给y赋值  上一步的 y+stepY
                    y=dataObj.children[0].y;
                }

                // 2.0  配置筛选条目
                let categories = [],myChartLegend=[];
                for (let i = 0; i < datas.length; i++) {
                    let dataObj=datas[i];
                    switch (dataObj.layerName) {
                        case "deployInstance":
                            categories.push({
                                name:'部署实例',
                                itemStyle:{
                                    normal: {
                                    color: '#C71919'
                                    }
                                }
                            });
                            break;
                        case "clusterLayer":
                            categories.push({
                                name:'集群',
                                itemStyle:{
                                    normal: {
                                        color: '#C78419'
                                    }
                                }
                            });
                            break;
                        case "virtualLayer":
                            categories.push({
                                name:'虚拟机',
                                itemStyle:{
                                    normal: {
                                        color: '#B9C719'
                                    }
                                }
                            });
                            break;
                        case "physicalLayer":
                            categories.push({
                                name:'物理机',
                                itemStyle:{
                                    normal: {
                                        color: '#19C719'
                                    }
                                }
                            });
                            break;
                        case "frameLayer":
                            categories.push({
                                name:'机架',
                                itemStyle:{
                                    normal: {
                                        color: '#19C7B9'
                                    }
                                }
                            });
                            break;
                        case "resDomainLayer":
                            categories.push({
                                name:'资源池',
                                itemStyle:{
                                    normal: {
                                        color: '#3419C7'
                                    }
                                }
                            });
                            break;
                        case "dcLayer":
                            categories.push({
                                name:'数据中心',
                                itemStyle:{
                                    normal: {
                                        color: '#8419C7'
                                    }
                                }
                            });
                            break;
                    }
                };

                // 设置条目
                myChartLegend[0]={
                    data: categories.map(function (a) {
                        return a.name;
                    })
                };
//                let option = {
////                    backgroundColor:'#5cff8f',
//                    width:  width,
//                    height: height,
//                    tooltip: {},
//                    legend: [{
//                        // selectedMode: 'single',
//                        data: categories.map(function (a) {
//                            return a.name;
//                        })
//                    }],
//                    animationDurationUpdate: 1500,
//                    animationEasingUpdate: 'quinticInOut',
//                    series : [
//                        {
//                            type: 'graph',
//                            layout: 'none',
//                            symbolSize: 50,
//                            roam: true,
//                            draggable:true,
//                            symbol:'circle', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
//                            symbolSize:[100,100],
//                            label: {
//                                normal: {
//                                    show: true
//                                }
//                            },
//                            edgeSymbol: ['circle', 'arrow'],
//                            edgeSymbolSize: [4, 10],
//                            edgeLabel: {
//                                normal: {
//                                    textStyle: {
//                                        fontSize: 20
//                                    }
//                                }
//                            },
//                            data:[],
//                            links:[],
//                            categories: categories,
//                            lineStyle: {
//                                normal: {
//                                    opacity: 0.9,
//                                    width: 2,
//                                    curveness: 0
//                                }
//                            }
//                        }
//                    ]
//                };
                // 设置data
                let myChartData=[],myChartLinks=[];

                for (let i= 0;i<datas.length;i++) {
                    let dataObj=datas[i];
                        for(let j=0;j<dataObj.children.length;j++) {
                            let child=dataObj.children[j];
                            let symbol="";
                            if(child.imageUrl){
                                symbol='image://../../../../../../static/image/'+child.imageUrl+".svg";
                            }else {
                                symbol="circle";
                            }
                            myChartData.push({
                                name: child.name,
                                x: child.x,
                                y: child.y,
                                category: i,
                                symbol: symbol,
                                symbolSize:[80,160],
                                itemStyle:{
                                    normal: {
//                                    color: 'blue',
                                        label: {
                                            show: true,
                                            position: 'right',

                                        }
                                    }
                                },
                                tooltip: {
                                    formatter: child.tooltip[0]
                                }
                            });
                            // 设置links
                            if(child.target) {
                                for(let k=0;k<child.target.length;k++) {
                                    let linkObj=child.target[k];
                                    myChartLinks.push({
                                        source: child.name,
                                        target: linkObj,
                                        lineStyle: {
                                            normal: {
                                                width: 1,
                                                curveness: 0
                                            }
                                        }
                                    })

                                }
                            }

                        }

                }

                myChart.clear();
                myChart.setOption({
                    width:  width,
                    height: height,
                    tooltip: {},
                    legend: myChartLegend,
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series : [
                        {
                            type: 'graph',
                            layout: 'none',
                            symbolSize: 50,
                            roam: true,
                            draggable:true,
                            symbol:'circle', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                            symbolSize:[100,100],
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [4, 10],
                            edgeLabel: {
                                normal: {
                                    textStyle: {
                                        fontSize: 20
                                    }
                                }
                            },
                            data:myChartData,
                            links:myChartLinks,
                            categories: categories,
                            lineStyle: {
                                normal: {
                                    opacity: 0.9,
                                    width: 2,
                                    curveness: 0
                                }
                            }
                        }
                    ]
                });
            }
        },

        watch: {
            '$route' (to, from) {
                console.log("路由变化了");
                // 获取动态路径参数 根据路径参数请求数据
                const url=common.apihost+"bench/source_unit_detail/"+this.$route.params.resource_id;
                this.$http.get(url)
                        .then(response => {
                                console.log(response);
                                let backDatas = response.body;
                                let mockData=[
                                    {
                                        layerName:"physicalLayer",
                                        children:[
                                            {
                                                name: '物理机',
                                                imageUrl:'physical',
                                                tooltip: ['物理机'],
                                                target:['机架']
                                            }
                                        ]
                                    },
                                    //   机架层
                                    {
                                        layerName:"frameLayer",
                                        children:[
                                            {
                                                name: "机架",
                                                imageUrl:'frame',
                                                tooltip:['机架'],
                                                target:['资源池']
                                            }
                                        ]
                                    },
                                    //   资源池层
                                    {
                                        layerName:"resDomainLayer",
                                        children:[
                                            {
                                                name: "资源池",
                                                imageUrl:'resDomain',
                                                tooltip: ['资源池'],
                                                target:['DC']
                                            }
                                        ]
                                    },
                                    //   数据中心层
                                    {
                                        layerName:"dcLayer",
                                        children:[
                                            {
                                                name: "DC",
                                                imageUrl:'DC',
                                                tooltip: ['数据中心'],
                                                target:[]
                                            }
                                        ]
                                    }
                                ];

                                for(let i=0;i<backDatas.length;i++) {
                                    let dataObj=backDatas[i];
                                    if(dataObj.layerName==="virtualLayer") {
                                        dataObj.children[0].target[0]=mockData[0].children[0].name;
                                    }
                                }
                                this.getDatas(backDatas.concat(mockData));
                        });
            }
        }

    }
</script>