<template>
  <VueEcharts :options="options" auto-resize />
</template>

<script>
export default {
  data () {
    const title = {
      // show: true,                                 //是否显示
      text: "画布关系图",                             //大标题
      subtext: "图形可拖动、缩放",                          //小标题
      // sublink: "http://www.baidu.com",          //小标题链接
      // target: "blank",                            //'self' 当前窗口打开，'blank' 新窗口打开
      // subtarget: "blank",                        //小标题打开链接的窗口
      // textAlign: "center",                       //文本水平对齐
      // textBaseline: "top",                       //文本垂直对齐
      // textStyle: mytextStyle,                     //标题样式
      // subtextStyle: mytextStyle,                 //小标题样式
      // padding: 5,                                  //标题内边距 5  [5, 10]  [5,10,5,10]
      // itemGap: 10,                                 //大小标题间距
      // zlevel: 0,                                   //所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
      // z: 2,                                         //所属组件的z分层，z值小的图形会被z值大的图形覆盖
      // left: "center",                              //组件离容器左侧的距离,'left', 'center', 'right','20%'
      // top: "top",                                   //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
      // right: "auto",                               //组件离容器右侧的距离,'20%'
      // bottom: "auto",                              //组件离容器下侧的距离,'20%'
      // backgroundColor: "transparent",            //标题背景色
      // borderColor: "#ccc",                         //边框颜色
      // borderWidth: 0,                               //边框线宽
      // shadowColor: "red",                          //阴影颜色
      // shadowOffsetX: 0,                            //阴影水平方向上的偏移距离
      // shadowOffsetY: 0,                            //阴影垂直方向上的偏移距离
      // shadowBlur: 10,                               //阴影的模糊大小
    };
    const tooltip = {                             //提示框组件
      trigger: 'item',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      // triggerOn: "mousemove",                      //提示框触发的条件,'mousemove'鼠标移动时触发。'click'鼠标点击时触发。'mousemove|click'同时鼠标移动和点击时触发。'none'不在 'mousemove' 或 'click' 时触发
      // showContent: true,                           //是否显示提示框浮层
      // alwaysShowContent: true,                     //是否永远显示提示框内容
      // showDelay: 0,                                  //浮层显示的延迟，单位为 ms
      // hideDelay: 100,                                //浮层隐藏的延迟，单位为 ms
      // enterable: false,                             //鼠标是否可进入提示框浮层中
      // confine: false,                               //是否将 tooltip 框限制在图表的区域内
      // transitionDuration: 0.4,                      //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
      // position: ['50%', '50%'],                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10, 10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
      formatter: "{b}",                          //提示框浮层内容格式器，支持字符串模板和回调函数两种形式,模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等<br />{b1}: {c1}
      // backgroundColor: "transparent",            //标题背景色
      // borderColor: "#ccc",                        //边框颜色
      // borderWidth: 0,                              //边框线宽
      // padding: 5,                                  //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
      // textStyle: mytextStyle,                     //文本样式
    };
    const toolbox = {
      // show: true,                                 //是否显示工具栏组件
      orient: "horizontal",                        //工具栏 icon 的布局朝向'horizontal' 'vertical'
      // itemSize: 15,                                 //工具栏 icon 的大小
      // itemGap: 10,                                  //工具栏 icon 每项之间的间隔
      // showTitle: true,                             //是否在鼠标 hover 的时候显示每个工具 icon 的标题
      feature: {
        mark: {                                 // '辅助线开关'
          show: true
        },
        dataView: {                            //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
          show: true,                         //是否显示该工具。
          title: "数据视图",
          readOnly: false,                    //是否不可编辑（只读）
          lang: ['数据视图', '关闭', '刷新'],  //数据视图上有三个话术，默认是['数据视图', '关闭', '刷新']
          backgroundColor: "#fff",             //数据视图浮层背景色。
          textareaColor: "#fff",               //数据视图浮层文本输入区背景色
          textareaBorderColor: "#333",         //数据视图浮层文本输入区边框颜色
          textColor: "#000",                    //文本颜色。
          buttonColor: "#c23531",              //按钮颜色。
          buttonTextColor: "#fff",             //按钮文本颜色。
        },
        magicType: {                            //动态类型切换
          show: true,
          title: "切换",                       //各个类型的标题文本，可以分别配置。
          type: ['line', 'bar'],              //启用的动态类型，包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）
        },
        restore: {                             //配置项还原。
          show: true,                         //是否显示该工具。
          title: "还原",
        },
        saveAsImage: {                         //保存为图片。
          show: true,                         //是否显示该工具。
          type: "png",                         //保存的图片格式。支持 'png' 和 'jpeg'。
          name: "pic1",                        //保存的文件名称，默认使用 title.text 作为名称
          backgroundColor: "#ffffff",        //保存的图片背景色，默认使用 backgroundColor，如果backgroundColor不存在的话会取白色
          title: "保存为图片",
          pixelRatio: 1                        //保存图片的分辨率比例，默认跟容器相同大小，如果需要保存更高分辨率的，可以设置为大于 1 的值，例如 2
        },
        dataZoom: {                             //数据区域缩放。目前只支持直角坐标系的缩放
          show: true,                         //是否显示该工具。
          title: "缩放",                       //缩放和还原的标题文本
          xAxisIndex: 0,                       //指定哪些 xAxis 被控制。如果缺省则控制所有的x轴。如果设置为 false 则不控制任何x轴。如果设置成 3 则控制 axisIndex 为 3 的x轴。如果设置为 [0, 3] 则控制 axisIndex 为 0 和 3 的x轴
          yAxisIndex: false,                   //指定哪些 yAxis 被控制。如果缺省则控制所有的y轴。如果设置为 false 则不控制任何y轴。如果设置成 3 则控制 axisIndex 为 3 的y轴。如果设置为 [0, 3] 则控制 axisIndex 为 0 和 3 的y轴
        },
      },
      // zlevel: 0,                                   //所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
      // z: 2,                                         //所属组件的z分层，z值小的图形会被z值大的图形覆盖
      // left: "center",                              //组件离容器左侧的距离,'left', 'center', 'right','20%'
      // top: "top",                                   //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
      right: "2%",                               //组件离容器右侧的距离,'20%'
      // bottom: "auto",                              //组件离容器下侧的距离,'20%'
      // width: "auto",                               //图例宽度
      // height: "auto",                              //图例高度
    };
    const legend = {
      // show: true,                                  //是否显示
      // zlevel: 0,                                   //所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
      // z: 2,                                         //所属组件的z分层，z值小的图形会被z值大的图形覆盖
      // left: "center",                              //组件离容器左侧的距离,'left', 'center', 'right','20%'
      // top: "top",                                   //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
      // right: "auto",                               //组件离容器右侧的距离,'20%'
      // bottom: "auto",                              //组件离容器下侧的距离,'20%'
      // width: "auto",                               //图例宽度
      // height: "auto",                              //图例高度
      // orient: "horizontal",                        //图例排列方向
      // align: "auto",                               //图例标记和文本的对齐,left,right
      // padding: 5,                                   //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
      // itemGap: 10,                                  //图例每项之间的间隔
      // itemWidth: 25,                               //图例标记的图形宽度
      // itemHeight: 14,                              //图例标记的图形高度
      // formatter: function (name) {                 //用来格式化图例文本，支持字符串模板和回调函数两种形式。模板变量为图例名称 {name}
      //   return 'Legend ' + name;
      // },
      // selectedMode: "single",                    //图例选择的模式,true开启,false关闭,single单选,multiple多选
      // inactiveColor: "#ccc",                     //图例关闭时的颜色
      // textStyle: mytextStyle,                    //文本样式
      data: ['当前特征', '个人特征', '公共特征', '特征画布'],          //series中根据名称区分
      // backgroundColor: "transparent",            //标题背景色
      // borderColor: "#ccc",                         //边框颜色
      // borderWidth: 0,                               //边框线宽
      // shadowColor: "red",                          //阴影颜色
      // shadowOffsetX: 0,                            //阴影水平方向上的偏移距离
      // shadowOffsetY: 0,                            //阴影垂直方向上的偏移距离
      // shadowBlur: 10,                               //阴影的模糊大小
    };
    const dataZoom = [                                      //区域缩放
      {
        id: 'dataZoomX',
        show: true,                              //是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
        backgroundColor: "rgba(47,69,84,0)",  //组件的背景颜色
        type: 'slider',                         //slider表示有滑动块的，inside表示内置的
        dataBackground: {                        //数据阴影的样式。
          lineStyle: mylineStyle,              //阴影的线条样式
          areaStyle: myareaStyle,              //阴影的填充样式
        },
        fillerColor: "rgba(167,183,204,0.4)",  //选中范围的填充颜色。
        borderColor: "#ddd",                     //边框颜色。
        filterMode: 'filter',                   //'filter'：当前数据窗口外的数据，被 过滤掉。即 会 影响其他轴的数据范围。每个数据项，只要有一个维度在数据窗口外，整个数据项就会被过滤掉。
        //'weakFilter'：当前数据窗口外的数据，被 过滤掉。即 会 影响其他轴的数据范围。每个数据项，只有当全部维度都在数据窗口同侧外部，整个数据项才会被过滤掉。
        //'empty'：当前数据窗口外的数据，被 设置为空。即 不会 影响其他轴的数据范围。
        //'none': 不过滤数据，只改变数轴范围。
        xAxisIndex: 0,                            //设置 dataZoom-inside 组件控制的 x轴,可以用数组表示多个轴
        yAxisIndex: [0, 2],                        //设置 dataZoom-inside 组件控制的 y轴,可以用数组表示多个轴
        radiusAxisIndex: 3,                       //设置 dataZoom-inside 组件控制的 radius 轴,可以用数组表示多个轴
        angleAxisIndex: [0, 2],                    //设置 dataZoom-inside 组件控制的 angle 轴,可以用数组表示多个轴
        start: 30,                                //数据窗口范围的起始百分比,表示30%
        end: 70,                                  //数据窗口范围的结束百分比,表示70%
        startValue: 10,                           //数据窗口范围的起始数值
        endValue: 100,                            //数据窗口范围的结束数值。
        orient: "horizontal",                    //布局方式是横还是竖。不仅是布局方式，对于直角坐标系而言，也决定了，缺省情况控制横向数轴还是纵向数轴。'horizontal'：水平。'vertical'：竖直。
        zoomLock: false,                          //是否锁定选择区域（或叫做数据窗口）的大小。如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
        throttle: 100,                             //设置触发视图刷新的频率。单位为毫秒（ms）。
        zoomOnMouseWheel: true,                  //如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。
        moveOnMouseMove: true,                   //如何触发数据窗口平移。true：表示不按任何功能键，鼠标移动能触发数据窗口平移。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标移动能触发数据窗口平移。'ctrl'：表示按住 ctrl 和鼠标移动能触发数据窗口平移。'alt'：表示按住 alt 和鼠标移动能触发数据窗口平移。
        left: "center",                           //组件离容器左侧的距离,'left', 'center', 'right','20%'
        top: "top",                                //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
        right: "auto",                             //组件离容器右侧的距离,'20%'
        bottom: "auto",                            //组件离容器下侧的距离,'20%'
      },
      {
        id: 'dataZoomY',
        type: 'inside',
        filterMode: 'empty',
        disabled: false,                         //是否停止组件的功能。
        xAxisIndex: 0,                           //设置 dataZoom-inside 组件控制的 x轴,可以用数组表示多个轴
        yAxisIndex: [0, 2],                       //设置 dataZoom-inside 组件控制的 y轴,可以用数组表示多个轴
        radiusAxisIndex: 3,                      //设置 dataZoom-inside 组件控制的 radius 轴,可以用数组表示多个轴
        angleAxisIndex: [0, 2],                   //设置 dataZoom-inside 组件控制的 angle 轴,可以用数组表示多个轴
        start: 30,                               //数据窗口范围的起始百分比,表示30%
        end: 70,                                  //数据窗口范围的结束百分比,表示70%
        startValue: 10,                           //数据窗口范围的起始数值
        endValue: 100,                            //数据窗口范围的结束数值。
        orient: "horizontal",                    //布局方式是横还是竖。不仅是布局方式，对于直角坐标系而言，也决定了，缺省情况控制横向数轴还是纵向数轴。'horizontal'：水平。'vertical'：竖直。
        zoomLock: false,                          //是否锁定选择区域（或叫做数据窗口）的大小。如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
        throttle: 100,                             //设置触发视图刷新的频率。单位为毫秒（ms）。
        zoomOnMouseWheel: true,                   //如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。
        moveOnMouseMove: true,                    //如何触发数据窗口平移。true：表示不按任何功能键，鼠标移动能触发数据窗口平移。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标移动能触发数据窗口平移。'ctrl'：表示按住 ctrl 和鼠标移动能触发数据窗口平移。'alt'：表示按住 alt 和鼠标移动能触发数据窗口平移。
      }
    ];
    const visualMap = [                                     //视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素。视觉元素可以是：symbol: 图元的图形类别。symbolSize: 图元的大小。color: 图元的颜色。
      // colorAlpha: 图元的颜色的透明度。opacity: 图元以及其附属物（如文字标签）的透明度。colorLightness: 颜色的明暗度。colorSaturation: 颜色的饱和度。colorHue: 颜色的色调。
      {
        show: true,                              //是否显示 visualMap-continuous 组件。如果设置为 false，不会显示，但是数据映射的功能还存在
        type: 'continuous',                     // 定义为连续型 viusalMap
        min: 10,                                  //指定 visualMapContinuous 组件的允许的最小值
        max: 100,                                 //指定 visualMapContinuous 组件的允许的最大值
        range: [15, 40],                          //指定手柄对应数值的位置。range 应在 min max 范围内
        calculable: true,                        //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
        realtime: true,                          //拖拽时，是否实时更新
        inverse: false,                          //是否反转 visualMap 组件
        precision: 0,                            //数据展示的小数精度，默认为0，无小数点
        itemWidth: 20,                           //图形的宽度，即长条的宽度。
        itemHeight: 140,                         //图形的高度，即长条的高度。
        align: "auto",                           //指定组件中手柄和文字的摆放位置.可选值为：'auto' 自动决定。'left' 手柄和label在右。'right' 手柄和label在左。'top' 手柄和label在下。'bottom' 手柄和label在上。
        text: ['High', 'Low'],                   //两端的文本
        textGap: 10,                              //两端文字主体之间的距离，单位为px
        dimension: 2,                            //指定用数据的『哪个维度』，映射到视觉元素上。『数据』即 series.data。 可以把 series.data 理解成一个二维数组,其中每个列是一个维度,默认取 data 中最后一个维度
        seriesIndex: 1,                          //指定取哪个系列的数据，即哪个系列的 series.data,默认取所有系列
        hoverLink: true,                         //鼠标悬浮到 visualMap 组件上时，鼠标位置对应的数值 在 图表中对应的图形元素，会高亮
        inRange: {                               //定义 在选中范围中 的视觉元素
          color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
          symbolSize: [30, 100]
        },
        outOfRange: {  //定义 在选中范围外 的视觉元素。
          color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
          symbolSize: [30, 100]
        },
        zlevel: 0,                                   //所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
        z: 2,                                         //所属组件的z分层，z值小的图形会被z值大的图形覆盖
        left: "center",                              //组件离容器左侧的距离,'left', 'center', 'right','20%'
        top: "top",                                   //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
        right: "auto",                               //组件离容器右侧的距离,'20%'
        bottom: "auto",                              //组件离容器下侧的距离,'20%'
        orient: "vertical",                         //图例排列方向
        padding: 5,                                   //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
        backgroundColor: "transparent",            //标题背景色
        borderColor: "#ccc",                         //边框颜色
        borderWidth: 0,                               //边框线宽
        textStyle: mytextStyle,                      //文本样式
        formatter: function (value) {                 //标签的格式化工具。
          return 'aaaa' + value;                    // 范围标签显示内容。
        }
      },
      {
        show: true,                          //是否显示 visualMap-continuous 组件。如果设置为 false，不会显示，但是数据映射的功能还存在
        type: 'piecewise',                  // 定义为分段型 visualMap
        splitNumber: 5,                      //对于连续型数据，自动平均切分成几段。默认为5段
        pieces: [                           //自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
          { min: 1500 },                     // 不指定 max，表示 max 为无限大（Infinity）。
          { min: 900, max: 1500 },
          { min: 310, max: 1000 },
          { min: 200, max: 300 },
          { min: 10, max: 200, label: '10 到 200（自定义label）' },
          { value: 123, label: '123（自定义特殊颜色）', color: 'grey' }, // 表示 value 等于 123 的情况。
          { max: 5 }                        // 不指定 min，表示 min 为无限大（-Infinity）。
        ],
        categories: ['严重污染', '重度污染', '中度污染', '轻度污染', '良', '优'],  //用于表示离散型数据（或可以称为类别型数据、枚举型数据）的全集
        min: 10,                             //指定 visualMapContinuous 组件的允许的最小值
        max: 100,                             //指定 visualMapContinuous 组件的允许的最大值
        minOpen: true,                       //界面上会额外多出一个『< min』的选块
        maxOpen: true,                       //界面上会额外多出一个『> max』的选块。
        selectedMode: "multiple",           //选择模式，可以是：'multiple'（多选）。'single'（单选）。
        inverse: false,                      //是否反转 visualMap 组件
        precision: 0,                        //数据展示的小数精度，默认为0，无小数点
        itemWidth: 20,                       //图形的宽度，即长条的宽度。
        itemHeight: 140,                     //图形的高度，即长条的高度。
        align: "auto",                       //指定组件中手柄和文字的摆放位置.可选值为：'auto' 自动决定。'left' 手柄和label在右。'right' 手柄和label在左。'top' 手柄和label在下。'bottom' 手柄和label在上。
        text: ['High', 'Low'],               //两端的文本
        textGap: 10,                          //两端文字主体之间的距离，单位为px
        showLabel: true,                     //是否显示每项的文本标签
        itemGap: 10,                          //每两个图元之间的间隔距离，单位为px
        itemSymbol: "roundRect",             //默认的图形。可选值为： 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
        dimension: 2,                          //指定用数据的『哪个维度』，映射到视觉元素上。『数据』即 series.data。 可以把 series.data 理解成一个二维数组,其中每个列是一个维度,默认取 data 中最后一个维度
        seriesIndex: 1,                        //指定取哪个系列的数据，即哪个系列的 series.data,默认取所有系列
        hoverLink: true,                      //鼠标悬浮到 visualMap 组件上时，鼠标位置对应的数值 在 图表中对应的图形元素，会高亮
        inRange: {                             //定义 在选中范围中 的视觉元素
          color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
          symbolSize: [30, 100]
        },
        outOfRange: {                            //定义 在选中范围外 的视觉元素。
          color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
          symbolSize: [30, 100]
        },
        zlevel: 0,                                   //所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
        z: 2,                                         //所属组件的z分层，z值小的图形会被z值大的图形覆盖
        left: "center",                              //组件离容器左侧的距离,'left', 'center', 'right','20%'
        top: "top",                                   //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
        right: "auto",                               //组件离容器右侧的距离,'20%'
        bottom: "auto",                              //组件离容器下侧的距离,'20%'
        orient: "vertical",                        //图例排列方向
        padding: 5,                                   //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
        backgroundColor: "transparent",            //标题背景色
        borderColor: "#ccc",                         //边框颜色
        borderWidth: 0,                               //边框线宽
        textStyle: mytextStyle,                      //文本样式
        formatter: function (value) {                //标签的格式化工具。
          return 'aaaa' + value;                   // 范围标签显示内容。
        }
      }
    ];
    const mytextStyle = {
      color: "#333",               //文字颜色
      fontStyle: "normal",         //italic斜体  oblique倾斜
      fontWeight: "normal",        //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
      fontFamily: "sans-serif",    //字体系列
      fontSize: 18,                  //字体大小
    };
    const mylineStyle = {
      color: "#333",               //颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
      shadowColor: "red",          //阴影颜色
      shadowOffsetX: 0,            //阴影水平方向上的偏移距离。
      shadowOffsetY: 0,            //阴影垂直方向上的偏移距离
      shadowBlur: 10,              //图形阴影的模糊大小。
      type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
      width: 1,                    //坐标轴线线宽
      opacity: 1,                  //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
    };
    const myareaStyle = {
      color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],//分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
      shadowColor: "red",          //阴影颜色
      shadowOffsetX: 0,            //阴影水平方向上的偏移距离。
      shadowOffsetY: 0,            //阴影垂直方向上的偏移距离
      shadowBlur: 10,              //图形阴影的模糊大小。
      opacity: 1,                  //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
    };
    const myitemStyle = {
      color: "blue",                 //颜色
      borderColor: "#000",         //边框颜色
      borderWidth: 0,              //柱条的描边宽度，默认不描边。
      borderType: "solid",         //柱条的描边类型，默认为实线，支持 'dashed', 'dotted'。
      barBorderRadius: 0,          //柱形边框圆角半径，单位px，支持传入数组分别指定柱形4个圆角半径。
      shadowBlur: 10,              //图形阴影的模糊大小。
      shadowColor: "#000",         //阴影颜色
      shadowOffsetX: 0,            //阴影水平方向上的偏移距离。
      shadowOffsetY: 0,            //阴影垂直方向上的偏移距离。
      opacity: 1,                  //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
    };
    const mylabel = {
      show: false,                  //是否显示标签。
      position: "inside",          //标签的位置。// 绝对的像素值[10, 10],// 相对的百分比['50%', '50%'].'top','left','right','bottom','inside','insideLeft','insideRight','insideTop','insideBottom','insideTopLeft','insideBottomLeft','insideTopRight','insideBottomRight'
      offset: [30, 40],             //是否对文字进行偏移。默认不偏移。例如：[30, 40] 表示文字在横向上偏移 30，纵向上偏移 40。
      formatter: '{b}: {c}',       //标签内容格式器。模板变量有 {a}、{b}、{c}，分别表示系列名，数据名，数据值。
      textStyle: mytextStyle
    };
    const mypoint = {
      symbol: "pin",               //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      symbolSize: 50,              //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
      symbolRotate: 0,             //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
      symbolOffset: [0, 0],         //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
      silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
      label: {
        normal: mylabel,
        emphasis: mylabel
      },
      itemStyle: {
        normal: myitemStyle,
        emphasis: myitemStyle
      }
    };
    const myline = {
      symbol: ["pin", "circle"],    //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
      symbolSize: 50,              //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
      precision: 2,                //标线数值的精度，在显示平均值线的时候有用。
      silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
      label: {
        normal: mylabel,
        emphasis: mylabel
      },
      lineStyle: {
        normal: mylineStyle,
        emphasis: mylineStyle
      }
    };
    const myarea = {
      silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
      label: {
        normal: mylabel,
        emphasis: mylabel
      },
      itemStyle: {
        normal: myitemStyle,
        emphasis: myitemStyle
      }
    };
    return {
      options: {
        title: title,// 标题设置
        tooltip: tooltip,// 节点悬浮提示
        // toolbox: toolbox,// 切换下载
        legend: legend,// 分组筛选提示
        // dataZoom: dataZoom,// 可缩放
        // visualMap: visualMap,// 地图映射
        animationDurationUpdate: 1500, // 动画的时长。
        animationEasingUpdate: 'quinticInOut', // 动画的加载效果
        // hasChanged: false,
        // flag: false,
        series: [
          {
            type: "graph",               //关系图
            // zlevel: 0,                   //柱状图所有图形的 zlevel 值。
            // z: 2,                         //柱状图组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
            // left: "10%",                 //组件离容器左侧的距离,百分比字符串或整型数字
            top: '15%',                      //组件离容器上侧的距离，百分比字符串或整型数字
            // right: "auto",               //组件离容器右侧的距离,百分比字符串或整型数字
            bottom: "15%",              //组件离容器下侧的距离,百分比字符串或整型数字
            // width: "auto",               //图例宽度
            // height: "auto",              //图例高度
            // silent: false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
            // name: "公共特征",            //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            // legendHoverLink: true,       //是否启用图例 hover 时的联动高亮。
            // hoverAnimation: true,        //是否开启鼠标 hover 节点的提示动画效果。
            // coordinateSystem: null,      //null无坐标系，'cartesia个人特征d'使用二维的直角坐标系。'geo'使用地理坐标系，'polar'使用极坐标系
            // xAxisIndex: 0,                //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
            // yAxisIndex: 0,                //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
            // polarIndex: 0,                //使用的极坐标系的 index，在单个图表实例中存在多个极坐标系的时候有用。
            // geoIndex: 0,                  //使用的地理坐标系的 index，在单个图表实例中存在多个地理坐标系的时候有用。
            // calendarIndex: 0,            //使用的日历坐标系的 index，在单个图表实例中存在多个日历坐标系的时候有用。
            layout: 'circular',              //'none' 不采用任何布局，使用节点中提供的 x， y 作为节点的位置.'circular' 采用环形布局，'force' 采用力引导布局。
            //circular:{},               //环形布局相关配置
            //force:{},                  //力引导布局相关的配置项
            roam: true,                 //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            nodeScaleRatio: 0.6,         //鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
            // draggable: true,            //节点是否可拖拽，只在使用力引导布局的时候有用。
            // focusNodeAdjacency: true,   //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。放大
            symbol: "circle",               //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: 50,              //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
            // symbolRotate: 0,             //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
            // symbolOffset: [0, 0],         //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
            edgeSymbol: ['', 'arrow'],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头
            // edgeSymbolSize: [5, 2],       //边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
            cursor: "pointer",           //鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 cursor。
            label: {                      //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
              // normal: mylabel,
              // emphasis: mylabel
            },
            edgeLabel: { // 显示线中间的标签
              // show: true,
              // normal: mylabel,
              // emphasis: mylabel
            },
            emphasis: { // 悬浮出现的高亮的图形样式。
              // lineStyle: mylineStyle,
              // itemStyle: myitemStyle,
              // label: mylineStyle,
              // edgeLabel: mylineStyle,
            },
            itemStyle: {                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              // normal: myitemStyle,
              // emphasis: myitemStyle,
            },
            lineStyle: {                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              // normal: mylineStyle,
              // emphasis: mylineStyle,
            },
            categories: [                //节点分类的类目，可选。
              {
                name: "当前特征",    //类目名称
                // symbol: "circle",       //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                // symbolSize: 50,      //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                // symbolRotate: 0,     //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
                // symbolOffset: [0, 0], //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
                // label: {              //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
                //   normal: mylabel,
                //   emphasis: mylabel
                // },
                // itemStyle: {         //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                //   normal: myitemStyle,
                //   emphasis: myitemStyle,
                // },
              },
              {
                name: "个人特征",    //类目名称
                // symbol: "rect",       //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                // symbolSize: 50,      //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                // symbolRotate: 0,     //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
                // symbolOffset: [0, 0], //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
                // label: {              //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
                //   normal: mylabel,
                //   emphasis: mylabel
                // },
                // itemStyle: {         //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                //   normal: myitemStyle,
                //   emphasis: myitemStyle,
                // },
              },
              {
                name: "公共特征",    //类目名称
                // symbol: "roundRect",       //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                // symbolSize: 50,      //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                // symbolRotate: 0,     //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
                // symbolOffset: [0, 0], //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
                // label: {              //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
                //   normal: mylabel,
                //   emphasis: mylabel
                // },
                // itemStyle: {         //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                //   normal: myitemStyle,
                //   emphasis: myitemStyle,
                // },
              },
              {
                name: "特征画布",    //类目名称
                // symbol: "pin",       //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                // symbolSize: 50,      //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                // symbolRotate: 0,     //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
                // symbolOffset: [0, 0], //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
                // label: {              //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
                //   normal: mylabel,
                //   emphasis: mylabel
                // },
                // itemStyle: {         //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                //   normal: myitemStyle,
                //   emphasis: myitemStyle,
                // },
              },
            ],
            data: [                     //data就是node
              {
                name: '当前特征',
                // x: 100,
                // y: 100,
                // value: 20,
                // symbolSize: 20,
                itemStyle: {
                  normal: {
                    color: 'blank'
                  }
                }
              }, {
                name: '个人特征',
                // x: 100,
                // y: 100,
                // value: 20,
                // symbolSize: 20,
                itemStyle: {
                  normal: {
                    color: '#15a4fa'
                  }
                }
              }, {
                name: '公共特征',
                // x: 100,
                // y: 100,
                // value: 20,
                // symbolSize: 20,
                itemStyle: {
                  color: 'blue'
                }
              }, {
                name: '特征画布',
                // x: 100,
                // y: 100,
                // value: 20,
                // symbolSize: 100,
                itemStyle: {
                  color: 'red'
                }
              }
            ],
            links: [                 //links就是edges
              {
                source: '当前特征',
                target: '个人特征'
              }, {
                source: '当前特征',
                target: '公共特征'
              }, {
                source: '当前特征',
                target: '特征画布'
              }
            ],
            //markPoint:同bar
            //markLine:同bar
            //markArea:同bar
            // tooltip: tooltip
          },
        ]
      }
    };
  },
  mounted () { }
}
</script>