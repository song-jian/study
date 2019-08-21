const data = {
    backgroundColor: "#fff",
    tooltip: {
      trigger: "item",
      showContent: false
    },
    series: [
      {
        type: "graph",
        layout: "force",
        cursor: "pointer", 
        
        // focusNodeAdjacency: true,
        draggable: true,
        force: {
          gravity: 0.2,
          // edgeLength: [50, 100],
          repulsion: 1500
        },
        emphasis: { 
          itemStyle: {
            borderColor: "#F0F0F0",         //边框颜色
            borderWidth: 10,  
          }
        },
        legendHoverLink:true,       //是否启用图例 hover 时的联动高亮。
        hoverAnimation:true,        //是否开启鼠标 hover 节点的提示动画效果。
        waveAnimation: false,
        animationDuration: 0,
        animation:false,
        progressive:0,
        animationDurationUpdate: 0, // 动画的时长。
        // animationEasingUpdate: "none", // 动画的加载效果
        // roam: true,
        grid: {
          top: "15%",
          left: "1%",
          right: "1%",
          bottom: "15%",
          containLabel: true
        },
        
        symbolSize: 120,
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 14,
              color: "#fff"
            }
          }
        },
        lineStyle: {
          normal: {
            color: "#333",
            curveness: 0,
            width: 2
          }
        },
        edgeSymbol: ['arrow',''],
        data: [
          {
            name: "Device",
            symbolSize: 100,
            fixed:true,
            x:100,
            y:300,
            itemStyle: {
              normal: {
                color: "#666666", 
                
              }
  
            }
          },
          {
            name: "line Server01",
            symbolSize: 90,
            x:250,
            y:200,
            fixed:true,
            itemStyle: { normal: { color: "#666666" } }
          },
          {
            name: "line Server02",
            symbolSize: 90,
            x:250,
            y:400,
            fixed:true,
            itemStyle: { normal: { color: "#666666" } }
          },
          {
            name: "IPC01",
            symbolSize: 80,
            x:450,
            y:50,
            fixed:true,
            itemStyle: {
              normal: {
                color: "#666666"
                // borderColor: '#fdb798',
                // borderWidth: 4
              }
            }
          },
          {
            name: "IPC02",
            symbolSize: 80,
            x:450,
            y:200,
            fixed:true,
            itemStyle: { normal: { color: "#00C65B" } }
            // label: {
            //     normal: {
            //         position: 'left',
            //         color: '#000'
            //     }
            // }
          },
  
          {
            name: "Device 01",
            symbolSize: 70,
            x:650,
            y:50,
            fixed:true,
            itemStyle: { normal: { color: "#BEBEBE" } }
          },
          {
            name: "Device 02",
            symbolSize: 70,
            x:650,
            y:150,
            fixed:true,
            itemStyle: { normal: { color: "#BEBEBE" } }
          },
          {
            name: "Device 03",
            symbolSize: 70,
            x:650,
            y:250,
            fixed:true,
            itemStyle: { normal: { color: "#FF0000" } }
          },
          {
            name: "IPC03",
            symbolSize: 70,
            x:350,
            y:450,
            fixed:true,
            itemStyle: { normal: { color: "#666666" } }
          },
          {
            name: "IPC04",
            symbolSize: 70,
            x:450,
            y:550,
            fixed:true,
            itemStyle: { normal: { color: "#00C65B" } }
          },
        ],
        links: [
          {
            source: "line Server01",
            target: "Device",
          },
          {
            source: "line Server01",
            target: "Device",
          //   lineStyle: {
          //     label: {
          //       color: "#1e67e0",
          //       borderColor: "#a3cef5",
          //       borderWidth: 4
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: "#666666", 
          //       borderColor: '#a6e3b3',
          //       borderWidth: 4
          //     }
          // }
          },
          {
            source: "line Server02",
            target: "Device",
            lineStyle: {
              normal: {
                // color: '#1e67e0'
              }
            }
          },
          {
            source: "IPC01",
            target: "line Server01",
            // target: "Device",
            lineStyle: {
              normal: {
                // color: '#fb7032'
              }
            }
          },
  
          {
            source: "IPC02",
            target: "line Server01",
            lineStyle: {
              normal: {
                // color: '#fb7032'
              }
            }
          },
          {
            source: "IPC03",
            target: "line Server02",
            lineStyle: {
              normal: {
                // color: '#fb7032'
              }
            }
          },
          {
            source: "IPC04",
            target: "line Server02",
            lineStyle: {
              normal: {
                // color: '#fb7032'
              }
            }
          },
          {
            source: "Device 01",
            target: "IPC01",
            lineStyle: {
              normal: {
                // color: '#fb7032'
              }
            }
          },
          {
            source: "Device 02",
            target: "IPC02",
            lineStyle: {
              normal: {
                // color: '#fb7032'
              }
            }
          },
          {
            source: "Device 03",
            target: "IPC02",
            lineStyle: {
              normal: {
                // color: '#fb7032'
              }
            }
          },
          {
            source: "Device 04",
            target: "IPC03",
            lineStyle: {
              normal: {
                // color: '#fb7032'
              }
            }
          },
        ]
      }
    ]
  };
  
  export default data