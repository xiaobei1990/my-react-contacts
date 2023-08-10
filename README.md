# virsical-bpmn-viewer

安装：
yarn add virsical-bpmn-viewer

使用方式：

```js
import CustomBpmnViewer from 'virsical-bpmn-viewer';

const xml = '<?xml version="1.0" encoding="UTF-8"?>';

<CustomBpmnViewer contextXML={xml} />

```

属性介绍：

contextXML: PropsTypes.string, // 工作流XML,必填

componentWidth: PropsTypes.number, // 组件宽度

componentHeight: PropsTypes.number, // 组件高度

onClickHandle: PropsTypes.func, // 点击回调方法

elementsColor: PropsTypes.array, // 按照节点id设置颜色,数据结构：[{id: 1, color: '#fff'}, {}]

SVGStyle: PropsTypes.object, // 工作流组件外部样式

