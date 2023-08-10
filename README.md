# virsical-bpmn-viewer

安装：
yarn add virsical-bpmn-viewer

使用方式：

```js
import CustomBpmnViewer from 'virsical-bpmn-viewer';

const xml = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:camunda=\"http://camunda.org/schema/1.0/bpmn\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" id=\"Definitions_1\" targetNamespace=\"http://bpmn.io/schema/bpmn\">\n  <bpmn:process id=\"Process_2jqs1dr\" name=\"出差申请流程\" isExecutable=\"true\">\n    <bpmn:extensionElements />\n    <bpmn:startEvent id=\"StartEvent_1\">\n      <bpmn:outgoing>SequenceFlow_0213i0q</bpmn:outgoing>\n    </bpmn:startEvent>\n    <bpmn:userTask id=\"UserTask_13n5ojs\" name=\"出差申请\" camunda:formKey=\"111\" camunda:assignee=\"${assignee}\">\n      <bpmn:extensionElements />\n      <bpmn:incoming>SequenceFlow_0213i0q</bpmn:incoming>\n      <bpmn:outgoing>SequenceFlow_01m7r09</bpmn:outgoing>\n      <bpmn:multiInstanceLoopCharacteristics camunda:collection=\"assigneeListUserTask_13n5ojs\" camunda:elementVariable=\"assignee\" />\n    </bpmn:userTask>\n    <bpmn:sequenceFlow id=\"SequenceFlow_0213i0q\" sourceRef=\"StartEvent_1\" targetRef=\"UserTask_13n5ojs\" />\n    <bpmn:userTask id=\"UserTask_1dfnxmc\" name=\"部门领导审批\" camunda:assignee=\"${assignee}\" camunda:dueDate=\"P3DT0H0M0S\">\n      <bpmn:extensionElements />\n      <bpmn:incoming>SequenceFlow_01m7r09</bpmn:incoming>\n      <bpmn:outgoing>SequenceFlow_1x0lqbr</bpmn:outgoing>\n      <bpmn:multiInstanceLoopCharacteristics camunda:collection=\"assigneeList_UserTask_1dfnxmc\" camunda:elementVariable=\"assignee\" />\n    </bpmn:userTask>\n    <bpmn:sequenceFlow id=\"SequenceFlow_01m7r09\" sourceRef=\"UserTask_13n5ojs\" targetRef=\"UserTask_1dfnxmc\" />\n    <bpmn:userTask id=\"UserTask_0lffoa1\" name=\"财务审批\" camunda:assignee=\"${assignee}\" camunda:candidateUsers=\"123\" camunda:dueDate=\"P1DT0H0M0S\">\n      <bpmn:extensionElements />\n      <bpmn:incoming>SequenceFlow_1x0lqbr</bpmn:incoming>\n      <bpmn:outgoing>SequenceFlow_1mqswbs</bpmn:outgoing>\n      <bpmn:multiInstanceLoopCharacteristics camunda:collection=\"assigneeList_UserTask_0lffoa1\" camunda:elementVariable=\"assignee\" />\n    </bpmn:userTask>\n    <bpmn:sequenceFlow id=\"SequenceFlow_1x0lqbr\" sourceRef=\"UserTask_1dfnxmc\" targetRef=\"UserTask_0lffoa1\" />\n    <bpmn:userTask id=\"UserTask_1xj782x\" name=\"公司领导审批\" camunda:assignee=\"${assignee}\" camunda:dueDate=\"P7DT0H0M0S\">\n      <bpmn:extensionElements />\n      <bpmn:incoming>SequenceFlow_1mqswbs</bpmn:incoming>\n      <bpmn:outgoing>Flow_1hcbor9</bpmn:outgoing>\n      <bpmn:multiInstanceLoopCharacteristics camunda:collection=\"assigneeList_UserTask_1xj782x\" camunda:elementVariable=\"assignee\" />\n    </bpmn:userTask>\n    <bpmn:sequenceFlow id=\"SequenceFlow_1mqswbs\" sourceRef=\"UserTask_0lffoa1\" targetRef=\"UserTask_1xj782x\" />\n    <bpmn:endEvent id=\"Event_1y3z2dh\">\n      <bpmn:incoming>Flow_1hcbor9</bpmn:incoming>\n    </bpmn:endEvent>\n    <bpmn:sequenceFlow id=\"Flow_1hcbor9\" sourceRef=\"UserTask_1xj782x\" targetRef=\"Event_1y3z2dh\" />\n  </bpmn:process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_2jqs1dr\">\n      <bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\">\n        <dc:Bounds x=\"173\" y=\"102\" width=\"36\" height=\"36\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"UserTask_13n5ojs_di\" bpmnElement=\"UserTask_13n5ojs\">\n        <dc:Bounds x=\"260\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"UserTask_1dfnxmc_di\" bpmnElement=\"UserTask_1dfnxmc\">\n        <dc:Bounds x=\"420\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"UserTask_0lffoa1_di\" bpmnElement=\"UserTask_0lffoa1\">\n        <dc:Bounds x=\"580\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"UserTask_1xj782x_di\" bpmnElement=\"UserTask_1xj782x\">\n        <dc:Bounds x=\"740\" y=\"80\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Event_1y3z2dh_di\" bpmnElement=\"Event_1y3z2dh\">\n        <dc:Bounds x=\"902\" y=\"102\" width=\"36\" height=\"36\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_0213i0q_di\" bpmnElement=\"SequenceFlow_0213i0q\">\n        <di:waypoint x=\"209\" y=\"120\" />\n        <di:waypoint x=\"260\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_01m7r09_di\" bpmnElement=\"SequenceFlow_01m7r09\">\n        <di:waypoint x=\"360\" y=\"120\" />\n        <di:waypoint x=\"420\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_1x0lqbr_di\" bpmnElement=\"SequenceFlow_1x0lqbr\">\n        <di:waypoint x=\"520\" y=\"120\" />\n        <di:waypoint x=\"580\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"SequenceFlow_1mqswbs_di\" bpmnElement=\"SequenceFlow_1mqswbs\">\n        <di:waypoint x=\"680\" y=\"120\" />\n        <di:waypoint x=\"740\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_1hcbor9_di\" bpmnElement=\"Flow_1hcbor9\">\n        <di:waypoint x=\"840\" y=\"120\" />\n        <di:waypoint x=\"902\" y=\"120\" />\n      </bpmndi:BPMNEdge>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn:definitions>';

<CustomBpmnViewer contextXML={xml} />

```

属性介绍：

contextXML: PropsTypes.string, // 工作流XML,必填

componentWidth: PropsTypes.number, // 组件宽度

componentHeight: PropsTypes.number, // 组件高度

onClickHandle: PropsTypes.func, // 点击回调方法

elementsColor: PropsTypes.array, // 按照节点id设置颜色,数据结构：[{id: 1, color: '#fff'}, {}]

SVGStyle: PropsTypes.object, // 工作流组件外部样式

