<template>
    <div id="treeContent"  style="
    width: 800px;
    height: 500px;
    background-color: #000;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    cursor: default;">

    </div>
</template>

<style scoped>
 #treeContent {
     margin: 0 auto;
 }
</style>
<script>
//    import echarts from 'echarts2';
//    import  tree from 'echarts2/chart/tree.js';
     var echarts = require('echarts');
    // 关系图
    require('echarts/lib/chart/graph');

//    let echarts = require('echarts/lib/echarts');

//    let echarts1 = require('echarts');
    export default{
        data (){
            return {
                msg:"123"
            }
        },
        mounted (){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('treeContent'));

            let option = {
                // backgroundColor:'#000',
                width:  600,
                height: 600,
                tooltip: {},
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series : [
                    {
                        type: 'graph',
                        layout: 'none',
                        symbolSize: 50,
                        roam: true,
                        symbol:'roundRect', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                        symbolSize:[100,50],
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
                        data: [
                            // 域名
                            {
                                name: 'uop-test.syswin.com',
                                x: 500,
                                y: 100,
                                tooltip: {
                                    formatter:'域名'
                                },
                                symbol:'rect',
                                symbolSize:[200,50]
                            },
                            // 集群层数据
                            {
                                name: 'Mysql',
                                x: 100,
                                y: 400,
                                tooltip: {
                                    formatter:'Mysql集群'
                                }
                            },

                            {
                                name: '应用',
                                x: 500,
                                y: 400,
                                tooltip: {
                                    formatter:'应用集群'
                                }

                            },

                            {
                                name: 'Redis',
                                x: 900,
                                y: 400,
                                tooltip: {
                                    formatter:'Redis集群'
                                }
                            },

                            //   虚拟机层数据
                            {
                                name: 'VM1',
                                // x: 50,   // 100-50
                                x: 100,   // 100-50
                                y: 700,
                                tooltip: {
                                    formatter:'VM1 192.168.33.77'
                                }
                            },


                            {
                                name: 'VM2',
                                // x: 450, // 500-50
                                x: 500, // 500-50
                                y: 700,
                                tooltip: {
                                    formatter:'VM2 192.168.33.78'
                                }
                            },


                            {
                                name: 'VM3',
                                // x: 850, // 900-50
                                x: 900, // 900-50
                                y: 700,
                                tooltip: {
                                    formatter:'VM3 192.168.33.38'
                                }
                            },
                            //   物理机层数据

                            {
                                name: '物理机1',
                                // x: 850, // 900-50
                                x: 300, // 900-50
                                y: 900,
                                tooltip: {
                                    formatter:'物理机1'
                                }
                            },

                            {
                                name: '物理机2',
                                // x: 850, // 900-50
                                x: 700, // 900-50
                                y: 900,
                                tooltip: {
                                    formatter:'物理机2'
                                }
                            },

                            //   机架层
                            {
                                name: "机架",
                                // x: 850, // 900-50
                                x: 500, // 900-50
                                y: 1100,
                                tooltip: {
                                    formatter:'机架'
                                }
                            },
                            {
                                name: "资源池",
                                // x: 850, // 900-50
                                x: 500, // 900-50
                                y: 1400,
                                tooltip: {
                                    formatter:'资源池'
                                }
                            },
                            {
                                name: "DC",
                                // x: 850, // 900-50
                                x: 500, // 900-50
                                y: 1700,
                                tooltip: {
                                    formatter:'数据中心'
                                }
                            }

                        ],
                        // links: [],
                        links: [
                            // 一级到二级
                            {
                                source: 'uop-test.syswin.com',
                                target: 'Mysql',
                                lineStyle: {
                                    normal: { curveness: 0 }
                                }
                            },

                            // 二级关系
                            {
                                source: "Redis",
                                target: "应用",
                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: -0.2
                                    }
                                }
                            },
                            {
                                source: 'Mysql',
                                target: '应用',

                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: 0.2
                                    }
                                }
                            },
                            // 二级到三级
                            {
                                source: "Mysql",
                                target: "VM1",
                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: 0
                                    }
                                }
                            },
                            {
                                source: "应用",
                                target: "VM2",
                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: 0
                                    }
                                }
                            },
                            {
                                source: "Redis",
                                target: "VM3",
                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: 0
                                    }
                                }
                            },

                            // 二级到三级
                            {
                                source: 'VM1',
                                target: '物理机1',

                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: -0.2
                                    }
                                }
                            },
                            {
                                source: 'VM2',
                                target: '物理机1',

                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: 0.2
                                    }
                                }
                            },
                            {
                                source: 'VM3',
                                target: '物理机2',

                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: 0.2
                                    }
                                }
                            },

                            // 三级到四级


                            {
                                source: '物理机1',
                                target: '机架',

                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: -0.2
                                    }
                                }
                            },
                            {
                                source: '物理机2',
                                target: '机架',

                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: 0.2
                                    }
                                }
                            },
                            {
                                source: '机架',
                                target: '资源池',

                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: 0
                                    }
                                }
                            },
                            {
                                source: '资源池',
                                target: 'DC',

                                lineStyle: {
                                    normal: {
                                        width: 2,
                                        curveness: 0
                                    }
                                }
                            },


                        ],
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

            myChart.setOption(option);
        }

    }
</script>