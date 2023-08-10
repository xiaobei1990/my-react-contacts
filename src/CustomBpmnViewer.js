import React, { useEffect } from 'react';
import PropsTypes from "prop-types";
import BpmnViewer from  'bpmn-js/lib/Viewer';

import 'bpmn-js/dist/assets/diagram-js.css';

let bpmnViewer = null;

// 设置元素的 stroke 颜色
function setStrokeColor(elements, color) {
  elements.forEach((element) => {
    if(element.nodeName === 'text'){
      element.style.fill = color;
    } else if(element.nodeName === 'path' && element.style.fill !== 'white'){
      element.style.fill = color;
    } else {
      element.style.stroke = color;
    }
  });
}

function CustomBpmnViewer(props) {
  const {contextXML, onClickHandle, elementsColor} = props;


  useEffect(()=>{
    initBpmn(contextXML);

    const canvasDom = document.getElementById('canvasShow');
    let svgDom = canvasDom.getElementsByClassName('bjs-powered-by');
    if(svgDom){
      svgDom[0].style.display = 'none';
    }

    const textDom = document.getElementsByClassName('bjs-breadcrumbs');
    if(textDom){
      textDom[0].style.display = 'none';
    }

    return () => {
        bpmnViewer.detach();
        bpmnViewer.destroy();
    };
  }, [])


  const initBpmn = (file) => {
    bpmnViewer = new BpmnViewer({
      container: '#canvasShow',
    });

    createBpmnDiagram(file);
  }

  const createBpmnDiagram = async (file) => {
    try {
      const result = await bpmnViewer.importXML(file, function(err) {
        if (err) {
          console.error(err);
        } else {

          // 获取绘图板元素和事件Bus
          let eventBus = bpmnViewer.get('eventBus');

          // 监听元素点击事件
          eventBus.on('element.click', function(event) {
            let element = event.element;
           // window.console.log('点击事件---', element);
            onClickHandle(element);
          });

          // 渲染节点为绿色
          setXMLColor(elementsColor);
          //'UserTask_13n5ojs', 'green'

          // 获取视图对象，并重新渲染图表
          let canvas = bpmnViewer.get('canvas');
          canvas.zoom('fit-viewport');
        }
      });
    } catch ( error ) {
      console.log(`打开模型出错,请确认该模型符合Bpmn2.0规范, error: ${error}`);
    }
  };

  // 设置节点的颜色为绿色
  function setXMLColor(elementsColor) {

    if(elementsColor?.length === 0)
      return;

     let elementRegistry = bpmnViewer.get('elementRegistry');

     elementsColor.forEach(element => {
      let bpmnElement = elementRegistry.get(element?.id);
      if(bpmnElement){
        // 获取节点所对应的图形对象
        let gfx = elementRegistry.getGraphics(bpmnElement);
        let domSvg = gfx.childNodes[0].childNodes; 
        setStrokeColor(domSvg, element.color);
      }
     })
     
  }

  return <div  style={{ width: '100%', height: '100%' }} id='canvasShow' className='container' />
}

CustomBpmnViewer.propTypes = {
  contextXML: PropsTypes.string, // 工作流XML
  onClickHandle: PropsTypes.func, // 点击回调方法
  elementsColor: PropsTypes.array, // 按照节点id设置颜色,数据结构：[{id: 1, color: '#fff'}, {}]
};

CustomBpmnViewer.defaultProps = {
  contextXML: '',
  onClickHandle: ()=>{},
  elementsColor: [],
};

export default CustomBpmnViewer;
