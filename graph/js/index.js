var operation, a1;

//获取SVG父节点
var svg_parent = document.getElementById('operation');

//svg
var svg;
var width = svg_parent.offsetWidth;
var height = svg_parent.offsetHeight;

// simulation
var simulation;

//预定义函数

function drag_drop(e) {
    e.preventDefault();
    var text = e.dataTransfer.getData('text');
    FishNet.createNode({ //创建节点
        'svg': svg,
        'x': e.offsetX,
        'y': e.offsetY + 10,
        'text': text
    });
}

//程序执行入口
window.onload = function () {

    //SVG操作
    //创建svg 元素
    svg = d3.select('#svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', 'svg');

    FishNet.createNode({ //可有可无
        'svg': d3.select('#hidden-svg'),
        'x': 0,
        'y': 10
    });

    a1 = document.getElementsByClassName('drag-dom')
    operation = document.getElementById('operation');


    operation.ondragover = function (e) { //阻止默认操作
        e.preventDefault();
    }

    for(var x = 0; x < a1.length; x++){ //为链接分配拖拽属性
        a1[x].ondragstart = function (e) {
            var img = document.createElement("img");
            img.src = "http://127.0.0.1/2016/iie/graph/graph/img/create-node.png";
            e.dataTransfer.setData('text', this.getAttribute('name'));
            e.dataTransfer.setDragImage(img, 0, 0);
            // e.dataTransfer.setDragImage(document.getElementById('hidden-svg'), 0, 0);

        }
    }
    operation.ondrop = function (e) {   //为接受者分配一个接受属性
        // drag_drop(e);
        var text = e.dataTransfer.getData('text');
        //节点拖拽
        // FishNet.drag({
        //     'selection': '#svg .node'
        // });
        console.log(node_data);
        node_data.push({
            'name': text,
            'sex': 'F'
        });
        console.log(node_data);
        // simulation.alpha(1).restart();
    }

    // ****************************插入网络图*************************

    //定义节点
    var node_data = d3.range(20).map(function (d) {
        var obj = {};
        obj.name = String(d);
        obj.sex = (Math.random() > 0.5) ? "F" : "M";
        return obj;
    });

    console.log(node_data);
    //定义边
    var link_data = node_data.map(function (node) {
        var obj = {};
        if(node.name != "0" || node.name != "1"){
            obj.source = "0";
            obj.target = node.name;
            obj.type = (Math.random() > 0.5) ? "A" : "E";
        }
        return obj;

    });

    //去除数组的第一个元素。
    link_data.shift();

    // set up force simulation
    simulation = d3.forceSimulation()
        .nodes(node_data);

    // add two kinds of force 1. charge force 2. centering force
    simulation
        .force('charge_force', d3.forceManyBody().strength(-2000))
        .force('center_force', d3.forceCenter(width / 2, height / 2))

    // 创建节点
    var nodes = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(node_data)
        .enter()
        .append('g')

    nodes.append('rect')
        .attr('width', '88')
        .attr('height', '15')
        .attr('fill', 'rgb(255, 83, 13)')
        .attr('rx', '2')
        .attr('ry', '2')

    nodes.append('text')
        .attr('x', 45)
        .attr('y', 11)
        .attr('class', 'svg-npde-font')
        .attr('style', 'fill:rgb(249, 249, 249);font-size:10px;')
        .text(function (d) {
            return d.name;
        })

    nodes.append('rect')
        .attr('width', '24')
        .attr('height', '24')
        .attr('fill', 'rgb(255, 255, 255)')
        .attr('x', '5')
        .attr('y', '-5')
        .attr('style', 'stroke: rgb(255, 83, 13); ')

    nodes.append('image')
        .attr('width', '20')
        .attr('height', '20')
        .attr('x', '7')
        .attr('y', '-3')
        .attr('href', 'http://127.0.0.1/2016/iie/graph/graph/img/user.png');

    // create lines of links
    var links = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(link_data)
        .enter()
        .append('line')
        .attr('stroke-width', 3)
        .style('stroke', stroke_color)

    // link color function
    function stroke_color(d){
        if(d.type == "A"){
            return "green";
        } else {
            return "red";
        }
    }

    // add link force
    var link_force = d3.forceLink(link_data)
        .id(function (d) {
            return d.name;
        })

    simulation
        .force('link_force', link_force);



    // create tickActions
    function tickActions() {
        nodes
            .attr('transform', function (d) {
                return 'translate('+String(d.x)+', '+String(d.y)+')';
            });

        links
            .attr('x1', function (d) {
                return d.source.x;
            })
            .attr('y1', function (d) {
                return d.source.y;
            })
            .attr('x2', function (d) {
                return d.target.x;
            })
            .attr('y2', function (d) {
                return d.target.y;
            })
    }


    // create tick
    simulation.on('tick', tickActions);

    //创建拖拽属性
    var drag_handler = d3.drag()
        .on("start", drag_start)
        .on("drag", drag_drag)
        .on("end", drag_end);

    //same as using .call on the node variable as in https://bl.ocks.org/mbostock/4062045
    drag_handler(nodes);

    //d is the node
    function drag_start(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function drag_drag(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function drag_end(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // 创建zoom 属性
    var zoom_handler = d3.zoom()
        .on('zoom', zoom_actions);

    function zoom_actions() {
        d3.selectAll('.nodes').attr("transform", d3.event.transform);
        d3.selectAll('.links').attr("transform", d3.event.transform);

    }

    svg.call(zoom_handler);
    svg.transition().duration(1).call(zoom_handler.transform, d3.zoomIdentity.translate(-90,-20).scale(1));


}



