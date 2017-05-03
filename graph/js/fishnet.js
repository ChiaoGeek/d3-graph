/**
 * Created by chiao on 28/04/2017.
 */

//创建一个fishnet的对象
var FishNet = new Array();


/*
 创建一个节点组不包含SVG元素
 var obj = {
     'svg' : 传入d3返回的SVG元素,
     'x' : 相对于SVG画布的X坐标,
     'y' : 相对于SVG画布的Y坐标
     'text' : 显示的文字
 }
 */
FishNet.createNode = function (obj) {
    //创建节点1
    var node1 = obj.svg.append('g')
        .attr('class', 'node')
        .attr('transform', 'translate('+String(obj.x)+', '+String(obj.y)+')')

    node1.append('rect')
        .attr('width', '88')
        .attr('height', '15')
        .attr('fill', 'rgb(255, 83, 13)')
        .attr('rx', '2')
        .attr('ry', '2')

    node1.append('text')
        .attr('x', 45)
        .attr('y', 11)
        .attr('class', 'svg-npde-font')
        .attr('style', 'fill:rgb(249, 249, 249);font-size:10px;')
        .text(obj.text)

    node1.append('rect')
        .attr('width', '24')
        .attr('height', '24')
        .attr('fill', 'rgb(255, 255, 255)')
        .attr('x', '5')
        .attr('y', '-5')
        .attr('style', 'stroke: rgb(255, 83, 13); ')

    node1.append('image')
        .attr('width', '20')
        .attr('height', '20')
        .attr('x', '7')
        .attr('y', '-3')
        .attr('href', 'http://127.0.0.1/2016/iie/graph/graph/img/user.png')

    return node1;
}

/*
  创建一个拖拽方法
  var obj = {
    'selection' : d3的选择器参数
  }
 */
FishNet.drag = function (obj) {
    var selection = d3.selectAll(obj.selection)
        .call(
            d3.drag()
                .on("start", function () {
                    console.log(1);
                })
                .on("drag", function () {
                    d3.select(this).attr('transform', 'translate('+String(d3.event.x)+', '+String(d3.event.y)+')');
                })
                .on("end", function () {
                    console.log(3);
                })
        );

}