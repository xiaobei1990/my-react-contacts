import React, { useEffect } from 'react';
import PropsTypes from "prop-types";
import BpmnViewer from  'bpmn-js/lib/Viewer';


const DEFAULT_WIDTH = 1920; // 缺省宽度
const DEFAULT_HEIGHT = 1080; // 缺省高度

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


// class CustomBpmnViewer extends Component{
//   constructor(props) {
//     super(props);
//   }

//   render(){

//   }
// }

function CustomBpmnViewer(props) {
  const {contextXML, componentWidth, componentHeight, onClickHandle, elementsColor, SVGStyle} = props;


  useEffect(()=>{
    initBpmn(contextXML);

    const canvasDom = document.getElementById('canvasShow');
    let svgDom = canvasDom.getElementsByClassName('bjs-powered-by');
    if(svgDom){
      svgDom[0].style.display = 'none';
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
            window.console.log('点击事件---', element);
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

 // const styleShow = {...SVGStyle, width: componentWidth, height: componentHeight};
  return <div style={{width: componentWidth, height: componentHeight}}>
    <div  style={{ width: '100%', height: '100%' }} id='canvasShow' className='container' />
  </div>
}

CustomBpmnViewer.propTypes = {
  contextXML: PropsTypes.string, // 工作流XML
  componentWidth: PropsTypes.number, // 组件宽度
  componentHeight: PropsTypes.number, // 组件高度
  onClickHandle: PropsTypes.func, // 点击回调方法
  elementsColor: PropsTypes.array, // 按照节点id设置颜色,数据结构：[{id: 1, color: '#fff'}, {}]
  SVGStyle: PropsTypes.object, // svg样式
};

CustomBpmnViewer.defaultProps = {
  contextXML: '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:camunda=\"http://camunda.org/schema/1.0/bpmn\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" id=\"Definitions_1\" targetNamespace=\"http://bpmn.io/schema/bpmn\">\n  <bpmn:process id=\"Process_2jqs1dr\" name=\"出差申请流程\" isExecutable=\"true\">\n    <bpmn:extensionElements />\n    <bpmn:startEvent id=\"StartEvent_1\">\n      <bpmn:outgoing>SequenceFlow_0213i0q</bpmn:outgoing>\n    </bpmn:startEvent>\n    <bpmn:userTask id=\"UserTask_13n5ojs\" name=\"出差申请\" camunda:formKey=\"111\" camunda:assignee=\"${assignee}\">\n      <bpmn:extensionElements />\n      <bpmn:incoming>SequenceFlow_0213i0q</bpmn:incoming>\n      <bpmn:outgoing>SequenceFlow_01m7r09</bpmn:outgoing>\n      <bpmn:multiInstanceLoopCharacteristics camunda:collection=\"assigneeListUserTask_13n5ojs\" camunda:elementVariable=\"assignee\" />\n    </bpmn:userTask>\n    <bpmn:sequenceFlow id=\"SequenceFlow_0213i0q\" sourceRef=\"StartEvent_1\" targetRef=\"UserTask_13n5ojs\" />\n    <bpmn:userTask id=\"UserTask_1dfnxmc\" name=\"部门领导审批\" camunda:assignee=\"${assignee}\" camunda:dueDate=\"P3DT0H0M0S\">\n      <bpmn:extensionElements />\n      <bpmn:incoming>SequenceFlow_01m7r09</bpmn:incoming>\n      <bpmn:outgoing>SequenceFlow_1x0lqbr</bpmn:outgoing>\n      <bpmn:multiInstanceLoopCharacteristics camunda:collection=\"assigneeList_UserTask_1dfnxmc\" camunda:elementVariable=\"assignee\" />\n    </bpmn:userTask>\n    <bpmn:sequenceFlow id=\"SequenceFlow_01m7r09\" sourceRef=\"UserTask_13n5ojs\" targetRef=\"UserTask_1dfnxmc\" />\n    <bpmn:userTask id=\"UserTask_0lffoa1\" name=\"财务审批\" camunda:assignee=\"${assignee}\" camunda:candidateUsers=\"123\" camunda:dueDate=\"P1DT0H0M0S\">\n      <bpmn:extensionElements />\n      <bpmn:incoming>SequenceFlow_1x0lqbr</bpmn:incoming>\n      <bpmn:outgoing>SequenceFlow_1mqswbs</bpmn:outgoing>\n      <bpmn:multiInstanceLoopCharacteristics camunda:collection=\"assigneeList_UserTask_0lffoa1\" camunda:elementVariable=\"assignee\" />\n    </bpmn:userTask>\n    <bpmn:sequenceFlow id=\"SequenceFlow_1x0lqbr\" sourceRef=\"UserTask_1dfnxmc\" targetRef=\"UserTask_0lffoa1\" />\n    <bpmn:userTask id=\"UserTask_1xj782x\" name=\"公司领导审批\" camunda:assignee=\"${assignee}\" camunda:dueDate=\"P7DT0H0M0S\">\n      <bpmn:extensionElements />\n      <bpmn:incoming>SequenceFlow_1mqswbs</bpmn:incoming>\n      <bpmn:outgoing>Flow_1hcbor9</bpmn:outgoing>\n      <bpmn:multiInstanceLoopCharacteristics camunda:collection=\"assigneeList_UserTask_1xj782x\" camunda:elementVariable=\"assignee\" />\n    </bpmn:userTask>\n    <bpmn:sequenceFlow id=\"SequenceFlow_1mqswbs\" sourceRef=\"UserTask_0lffoa1\" targetRef=\"UserTask_1xj782x\" />\n    <bpmn:endEvent id=\"Event_1y3z2dh\">\n      <bpmn:incoming>Flow_1hcbor9</bpmn:incoming>\n    </bpmn:endEvent>\n    <bpmn:sequenceFlow id=\"Flow_1hcbor9\" sourceRef=\"UserTask_1xj782x\" targetRef=\"Event_1y3z2dh\" />\n  </bpmn:process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_2jqs1dr\">\n      <bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\">\n        <dc:Bounds x=\"173\" y=\"102\" width=\"36\" height=\"36\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"UserTask_13n5ojs_di\" bpmnElement=\"UserTask_13n5ojs\">\n        <dc:Bounds x=\"260\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"UserTask_1dfnxmc_di\" bpmnElement=\"UserTask_1dfnxmc\">\n        <dc:Bounds x=\"420\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"UserTask_0lffoa1_di\" bpmnElement=\"UserTask_0lffoa1\">\n        <dc:Bounds x=\"580\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"UserTask_1xj782x_di\" bpmnElement=\"UserTask_1xj782x\">\n        <dc:Bounds x=\"740\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Event_1y3z2dh_di\" bpmnElement=\"Event_1y3z2dh\">\n        <dc:Bounds x=\"902\" y=\"102\" width=\"36\" height=\"36\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_0213i0q_di\" bpmnElement=\"SequenceFlow_0213i0q\">\n        <di:waypoint x=\"209\" y=\"120\" />\n        <di:waypoint x=\"260\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_01m7r09_di\" bpmnElement=\"SequenceFlow_01m7r09\">\n        <di:waypoint x=\"360\" y=\"120\" />\n        <di:waypoint x=\"420\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_1x0lqbr_di\" bpmnElement=\"SequenceFlow_1x0lqbr\">\n        <di:waypoint x=\"520\" y=\"120\" />\n        <di:waypoint x=\"580\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_1mqswbs_di\" bpmnElement=\"SequenceFlow_1mqswbs\">\n        <di:waypoint x=\"680\" y=\"120\" />\n        <di:waypoint x=\"740\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_1hcbor9_di\" bpmnElement=\"Flow_1hcbor9\">\n        <di:waypoint x=\"840\" y=\"120\" />\n        <di:waypoint x=\"902\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn:definitions>',
  componentWidth: DEFAULT_WIDTH,
  componentHeight: DEFAULT_HEIGHT,
  onClickHandle: ()=>{},
  elementsColor: [],
  SVGStyle: {},
};

export default CustomBpmnViewer;
