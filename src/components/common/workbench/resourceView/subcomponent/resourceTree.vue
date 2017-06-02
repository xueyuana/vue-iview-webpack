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

     var echarts = require('echarts');
    // 关系图
    require('echarts/lib/chart/graph');

    export default{
        data (){
            return {
                datas: [
                    // 部署实例层
                    {
                        layerName:"deployInstance",
                        children:[
                            {
                                name: '部署实例',
                                imageUrl:'deployInstance',
                                // 提示信息
                                tooltip: 'uop-test.syswin.com',
                                // 关系
                                target:['应用']
                            }
                        ]
                    },
                    // 集群层数据
                    {
                        layerName:"clusterLayer",
                        children:[
                            {
                                name: 'Mysql',
                                imageUrl:'mysqlCluster',
                                tooltip: 'Mysql集群',
                                target:['VM1','应用']
                            },
                            {
                                name: '应用',
                                imageUrl:'applicationCluster',
                                tooltip: '应用集群',
                                target:['VM2']
                            },
                            {
                                name: 'Redis',
                                imageUrl:'redisCluster',
                                tooltip:'Redis集群',
                                target:['VM3','应用']
                            },
                        ]
                    },
                    //   虚拟机层数据
                    {
                        layerName:"virtualLayer",
                        children:[
                            {
                                name: 'VM1',
                                imageUrl:'virtual',
                                tooltip: 'VM1 192.168.33.77',
                                target:['物理机1']
                            },

                            {
                                name: 'VM2',
                                imageUrl:'virtual',
                                tooltip:'VM2 192.168.33.78',
                                target:['物理机1']
                            },
                            {
                                name: 'VM3',
                                imageUrl:'virtual',
                                tooltip: 'VM3 192.168.33.38',
                                target:['物理机2']
                            }
                        ]
                    },

                    //   物理机层数据
                    {
                        layerName:"physicalLayer",
                        children:[
                            {
                                name: '物理机1',
                                imageUrl:'physical',
                                tooltip: '物理机1',
                                target:['机架']
                            },

                            {
                                name: '物理机2',
                                imageUrl:'physical',
                                tooltip: '物理机2',
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
                                imageUrl:'',
                                tooltip:'机架',
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
                                tooltip: '资源池',
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
                                tooltip: '数据中心',
                                target:[]
                            }
                        ]
                    }
                ]
            }
        },
        mounted (){
          this.getDatas();
        },
        methods: {
            // 获取数据
            getDatas () {
                // 图的尺寸
                let width=600;
                let height=400;
                // 初始坐标
                let divObj=document.getElementById("treeContent");
                console.log(divObj.offsetLeft);
                console.log(divObj.offsetTop);


                let x=width/2;
                let y=300;
                // y轴每次递增 200
                let stepY=100;
                // x轴进行平分


                // 给每一个点配置坐标 指定位置
                for(let i=0;i<this.datas.length;i++) {
                    let dataObj=this.datas[i];
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
                let categories = [];
                for (let i = 0; i < this.datas.length; i++) {
                    let dataObj=this.datas[i];
                    switch (dataObj.layerName) {
                        case "deployInstance":
                            categories.push({
                                name:'部署单元',
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
                }


                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('treeContent'));
                //  myChart.showLoading();
                let option = {
                    backgroundColor:'#5cff8f',
                    width:  width,
                    height: height,
                    tooltip: {},
                    legend: [{
                        // selectedMode: 'single',
                        data: categories.map(function (a) {
                            return a.name;
                        })
                    }],
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
//                            data: [
//                                // 域名
//                                {
//                                    name: '部署实例',
//                                    // 初始位置 横坐标在画布的中间
//                                    x: 500,
//                                    y: 100,
////                                    x: initX,
////                                    y: initY,
//                                    symbol: 'image://../../../../../../static/image/deployInstance.png',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    // 提示信息
//                                    tooltip: {
//                                        formatter:'uop-test.syswin.com'
//                                    }
//                                },
//                                // 集群层数据
//                                {
//                                    name: 'Mysql',
//                                    x: 100,
//                                    y: 400,
//                                    symbol: 'image://../../../../../../static/image/mysqlCluster.png',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    tooltip: {
//                                        formatter:'Mysql集群'
//                                    }
//                                },
//
//                                {
//                                    name: '应用',
//                                    x: 500,
//                                    y: 400,
//                                    symbol: 'image://../../../../../../static/image/applicationCluster.png',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    tooltip: {
//                                        formatter:'应用集群'
//                                    }
//
//                                },
//
//                                {
//                                    name: 'Redis',
//                                    x: 900,
//                                    y: 400,
//                                    symbol: 'image://../../../../../../static/image/redisCluster.png',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    tooltip: {
//                                        formatter:'Redis集群'
//                                    }
//                                },
//
//                                //   虚拟机层数据
//                                {
//                                    name: 'VM1',
//                                    // x: 50,   // 100-50
//                                    x: 100,   // 100-50
//                                    y: 700,
//                                    symbol: 'image://../../../../../../static/image/virtual.png',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    tooltip: {
//                                        formatter:'VM1 192.168.33.77'
//                                    }
//                                },
//
//
//                                {
//                                    name: 'VM2',
//                                    // x: 450, // 500-50
//                                    x: 500, // 500-50
//                                    y: 700,
//                                    symbol: 'image://../../../../../../static/image/virtual.png',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    tooltip: {
//                                        formatter:'VM2 192.168.33.78'
//                                    }
//                                },
//
//
//                                {
//                                    name: 'VM3',
//                                    // x: 850, // 900-50
//                                    x: 900, // 900-50
//                                    y: 700,
//                                    symbol: 'image://../../../../../../static/image/virtual.png',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    tooltip: {
//                                        formatter:'VM3 192.168.33.38'
//                                    }
//                                },
//                                //   物理机层数据
//                                {
//                                    name: '物理机1',
//                                    // x: 850, // 900-50
//                                    x: 300, // 900-50
//                                    y: 900,
//                                    symbol: 'image://../../../../../../static/image/physical.png',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    tooltip: {
//                                        formatter:'物理机1'
//                                    }
//                                },
//
//                                {
//                                    name: '物理机2',
//                                    // x: 850, // 900-50
//                                    x: 700, // 900-50
//                                    y: 900,
//                                    symbol: 'image://../../../../../../static/image/physical.png',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    tooltip: {
//                                        formatter:'物理机2'
//                                    }
//                                },
//
//                                //   机架层
//                                {
//                                    name: "机架",
//                                    // x: 850, // 900-50
//                                    x: 500, // 900-50
//                                    y: 1100,
//                                    symbol: 'circle',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    tooltip: {
//                                        formatter:'机架'
//                                    }
//                                },
//                                {
//                                    name: "资源池",
//                                    // x: 850, // 900-50
//                                    x: 500, // 900-50
//                                    y: 1400,
//                                    symbol: 'image://../../../../../../static/image/resDomain.png',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    tooltip: {
//                                        formatter:'资源池'
//                                    }
//                                },
//                                {
//                                    name: "DC",
//                                    // x: 850, // 900-50
//                                    x: 500, // 900-50
//                                    y: 1700,
//                                    symbol: 'image://../../../../../../static/image/DC.png',
//                                    symbolSize:[80,80],
//                                    itemStyle:{
//                                        normal: {
//                                            color: 'blue',
//                                            label: {
//                                                show: true,
//                                                position: 'right',
//
//                                            }
//                                        }
//                                    },
//                                    tooltip: {
//                                        formatter:'数据总心'
//                                    }
//                                }
//
//                            ],
                            data:[],
//                            links: [
//                                // 一级到二级
//                                {
//                                    source: '部署实例',
//                                    target: '应用',
//                                    lineStyle: {
//                                        normal: { curveness: 0 }
//                                    }
//                                },
//
//                                // 二级关系
//                                {
//                                    source: "Redis",
//                                    target: "应用",
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: -0.2
//                                        }
//                                    }
//                                },
//                                {
//                                    source: 'Mysql',
//                                    target: '应用',
//
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: 0.2
//                                        }
//                                    }
//                                },
//                                // 二级到三级
//                                {
//                                    source: "Mysql",
//                                    target: "VM1",
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: 0
//                                        }
//                                    }
//                                },
//                                {
//                                    source: "应用",
//                                    target: "VM2",
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: 0
//                                        }
//                                    }
//                                },
//                                {
//                                    source: "Redis",
//                                    target: "VM3",
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: 0
//                                        }
//                                    }
//                                },
//
//                                // 二级到三级
//                                {
//                                    source: 'VM1',
//                                    target: '物理机1',
//
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: -0.2
//                                        }
//                                    }
//                                },
//                                {
//                                    source: 'VM2',
//                                    target: '物理机1',
//
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: 0.2
//                                        }
//                                    }
//                                },
//                                {
//                                    source: 'VM3',
//                                    target: '物理机2',
//
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: 0.2
//                                        }
//                                    }
//                                },
//
//                                // 三级到四级
//
//
//                                {
//                                    source: '物理机1',
//                                    target: '机架',
//
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: -0.2
//                                        }
//                                    }
//                                },
//                                {
//                                    source: '物理机2',
//                                    target: '机架',
//
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: 0.2
//                                        }
//                                    }
//                                },
//                                {
//                                    source: '机架',
//                                    target: '资源池',
//
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: 0
//                                        }
//                                    }
//                                },
//                                {
//                                    source: '资源池',
//                                    target: 'DC',
//
//                                    lineStyle: {
//                                        normal: {
//                                            width: 2,
//                                            curveness: 0
//                                        }
//                                    }
//                                },
//
//
//                            ],
                            links:[],
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
                };

                for (let i= 0;i<this.datas.length;i++) {
                    let dataObj=this.datas[i];
                    for(let j=0;j<dataObj.children.length;j++) {
                        let child=dataObj.children[j];
                        // 设置data
                        let symbol="";
                        if(child.imageUrl){
                            symbol='image://../../../../../../static/image/'+child.imageUrl+".png";
                        }else {
                            symbol="circle";
                        }
                        option.series[0].data.push({
                            name: child.name,
                            x: child.x,
                            y: child.y,
                            category: i,
                            symbol: symbol,
                            symbolSize:[60,60],
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
                                formatter: child.tooltip
                            }
                        });

                        // 设置links
                        for(let k=0;k<child.target.length;k++) {
                            let linkObj=child.target[k];

                            option.series[0].links.push({
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

                console.log(option.series[0].data);
                console.log(option.series[0].links);

                myChart.setOption(option);
            }

        }

    }
</script>