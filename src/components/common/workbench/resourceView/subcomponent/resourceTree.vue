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
    import echarts from 'echarts2';
    import  tree from 'echarts2/chart/tree.js';

//    let echarts = require('echarts/lib/echarts');

//    let echarts1 = require('echarts');
    export default{
        data (){
            return {
                msg:"123"
            }
        },
//        mounted (){
//            let myChart = echarts.init(document.getElementById('treeContent'));
//            let option={
//                title : {
//                    text: '树图',
//                    subtext: '虚构数据'
//                },
//                toolbox: {
//                    show : true,
//                    feature : {
//                        mark : {show: true},
//                        dataView : {show: true, readOnly: false},
//                        restore : {show: true},
//                        saveAsImage : {show: true}
//                    }
//                },
//                calculable : false,
//
//                series : [
//                    {
//                        name:'树图',
//                        type:'tree',
//                        orient: 'vertical',  // vertical horizontal
//                        rootLocation: {x: 'center',y: 50}, // 根节点位置  {x: 100, y: 'center'}
//                        nodePadding: 40,
//                        roam: true,
//                        itemStyle: {
//                            normal: {
//                                color: '#2EC7C9',
//                                label: {
//                                    show: true,
//                                    formatter: "{b}"
//                                },
//                                lineStyle: {
//                                    color: '#48b',
//                                    shadowColor: '#000',
//                                    shadowBlur: 3,
//                                    shadowOffsetX: 3,
//                                    shadowOffsetY: 5,
//                                    type: 'curve' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
//
//                                }
//                            },
//                            emphasis: {
//                                label: {
//                                    show: true
//                                }
//                            }
//                        },
//
//                        data: [
//                            {
//                                name: '根节点',
//                                value: 6,
//                                children: [
//                                    {
//                                        name: '节点1',
//                                        value: 4,
//                                        children: [
//                                            {
//                                                name: '叶子节点1',
//                                                value: 4
//                                            },
//                                            {
//                                                name: '叶子节点2',
//                                                value: 4
//                                            },
//                                            {
//                                                name: '叶子节点3',
//                                                value: 2
//                                            },
//                                            {
//                                                name: '叶子节点4',
//                                                value: 2
//                                            },
//                                            {
//                                                name: '叶子节点5',
//                                                value: 2
//                                            },
//                                            {
//                                                name: '叶子节点6',
//                                                value: 4
//                                            }
//                                        ]
//                                    },
//                                    {
//                                        name: '节点2',
//                                        value: 4,
//                                        children: [{
//                                            name: '叶子节点7',
//                                            value: 4
//                                        },
//                                            {
//                                                name: '叶子节点8',
//                                                value: 4
//                                            }]
//                                    },
//                                    {
//                                        name: '节点3',
//                                        value: 1,
//                                        children: [
//                                            {
//                                                name: '叶子节点9',
//                                                value: 4
//                                            },
//                                            {
//                                                name: '叶子节点10',
//                                                value: 4
//                                            },
//                                            {
//                                                name: '叶子节点11',
//                                                value: 2
//                                            },
//                                            {
//                                                name: '叶子节点12',
//                                                value: 2
//                                            }
//                                        ]
//                                    }
//                                ]
//                            }
//                        ]
//                    }
//                ]
//            };
//            myChart.setOption(option);
//        }

    }
</script>