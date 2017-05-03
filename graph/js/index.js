/**
 * Created by chiao on 26/04/2017.
 */
var operation, a1;

//获取SVG父节点
var svg_parent = document.getElementById('operation');

//svg
var svg;
var width = svg_parent.offsetWidth;
var height = svg_parent.offsetHeight;



window.onload = function () {

    //SVG操作
    //创建svg 元素
    svg = d3.select('#svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', 'svg');


    FishNet.createNode({
        'svg': d3.select('#hidden-svg'),
        'x': 0,
        'y': 10
    });

    a1 = document.getElementsByClassName('drag-dom')
    operation = document.getElementById('operation');


    operation.ondragover = function (e) {
        e.preventDefault();
    }

    for(var x = 0; x < a1.length; x++){
        a1[x].ondragstart = function (e) {
            var img = document.createElement("img");
            img.src = "http://127.0.0.1/2016/iie/graph/graph/img/create-node.png";
            e.dataTransfer.setData('text', this.getAttribute('name'));
            e.dataTransfer.setDragImage(img, 0, 0);
            // e.dataTransfer.setDragImage(document.getElementById('hidden-svg'), 0, 0);

        }
    }

    operation.ondrop = function (e) {
        drag_drop(e);
        //节点拖拽
        FishNet.drag({
            'selection': '#svg .node'
        });
    }


}



function drag_drop(e) {
    e.preventDefault();
    var text = e.dataTransfer.getData('text');
    console.log(text);
    FishNet.createNode({
        'svg': svg,
        'x': e.offsetX,
        'y': e.offsetY + 10,
        'text': text
    });

}

