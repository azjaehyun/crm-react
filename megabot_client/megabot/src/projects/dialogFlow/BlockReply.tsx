import React, { FC, useEffect, useState } from 'react';
import { Button, Col, Collapse, Empty, Input, Popover, Row, Select } from 'antd';
import AddConditionForm from './AddConditionForm';
import AddScriptForm from './AddScriptForm';
import SlotConditionList from './SlotConditionList';
import ResponsePanel from './ResponsePanel';
import { ArrowsAltOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Condition } from '../../types';
const { Panel } = Collapse;
const { Option, OptGroup } = Select;

interface Props {
    block: any;
    condNo: number;
    operators: any;
    resources: any;
}
const BlockReply: FC<Props> = props => {
    // const [block, setBlock] = useState();
    //
    // const [slotVisible, setSlotVisible] = useState(false);
    // const [popoverVisible, setPopoverVisible] = useState(false);
    // const [scriptPopoverVisible, setScriptPopoverVisible] = useState(false);
    //
    // const onDeleteCondition = (condition: any, orderNo: any) => {
    //     console.log('Request to delete condition: ', condition, '---at  no: ', orderNo);
    //     // In case delete a full script
    //     if (condition.fullScript) {
    //         setBlock({ ...block, conditions: block.conditions.filter((cond: any) => cond.value !== condition.value) });
    //     } else {
    //         setBlock({
    //             ...block,
    //             conditions: block.conditions.filter((cond: any) =>
    //                 cond.value === ''
    //                     ? cond.variable !== condition.variable && cond.expression != condition.expression
    //                     : cond.variable !== condition.variable &&
    //                       cond.expression != condition.expression &&
    //                       cond.value != condition.value
    //             ),
    //         });
    //     }
    // };
    // const onAddConditionScriptCallBack = (script: Condition) => {
    //     console.log('append new script condition: ', script, '-- to block', condNo);
    //     setStep({
    //         ...step,
    //         blockReplies: step.blockReplies.map((block: any) =>
    //             block.orderNo == condNo ? { ...block, conditions: [script, ...block.conditions] } : block
    //         ),
    //     });
    //     setScriptPopoverVisible(false);
    // };
    // const onAddConditionCallBack = (newCond: Condition) => {
    //     console.log('append condition: ', newCond, '---to block: ', condNo);
    //     setStep({
    //         ...step,
    //         blockReplies: step.blockReplies.map((block: any) =>
    //             block.orderNo == condNo ? { ...block, conditions: [newCond, ...block.conditions] } : block
    //         ),
    //     });
    //     setPopoverVisible(false);
    // };
    // const onAddConditionFaileCallBack = (error: any) => {
    //     console.log('Failure add condition: ', error);
    // };
    // const onDeleteBlock = (e: any, orderNo: any) => {
    //     e.stopPropagation();
    //     console.log(step);
    //     // setStep({
    //     //     ...step,
    //     //     blockReplies: step.blockReplies.filter((block: any) => {
    //     //         return block.orderNo !== orderNo;
    //     //     }),
    //     // });
    // };
    //
    // useEffect(() => {
    //     if (props.block) {
    //         setBlock(props.block);
    //     }
    // }, [props.block]);
    // return (
    //     <Collapse defaultActiveKey={['1']} expandIconPosition="right" style={{ borderRadius: 5 }}>
    //         <Panel
    //             header={
    //                 <Row>
    //                     <Col flex="30px">
    //                         <span>IF: {block.orderNo}</span>
    //                     </Col>
    //                     <Col flex="auto">
    //                         {block.conditions &&
    //                             block.conditions.length > 0 &&
    //                             block.conditions.map((cond: any, ci: number) => (
    //                                 <>
    //                                     {ci > 0 && <Button style={{ paddingLeft: '2px' }}>AND</Button>}
    //                                     {cond.fullScript == false ? (
    //                                         <Input
    //                                             value={cond.variable
    //                                                 .concat(' ')
    //                                                 .concat(cond.expression)
    //                                                 .concat(' ')
    //                                                 .concat(cond.value)}
    //                                             readOnly={true}
    //                                             style={{ width: 'auto' }}
    //                                             addonAfter={
    //                                                 <DeleteOutlined
    //                                                     onClick={() => onDeleteCondition(cond, block.orderNo)}
    //                                                 />
    //                                             }
    //                                         />
    //                                     ) : (
    //                                         <Input
    //                                             value={cond.value}
    //                                             readOnly={true}
    //                                             style={{ width: 'auto' }}
    //                                             addonAfter={
    //                                                 <DeleteOutlined
    //                                                     onClick={() => onDeleteCondition(cond, block.orderNo)}
    //                                                 />
    //                                             }
    //                                         />
    //                                     )}
    //                                 </>
    //                             ))}
    //                         <Popover
    //                             placement="bottom"
    //                             content={
    //                                 <AddConditionForm
    //                                     operators={props.operators}
    //                                     resources={props.resources}
    //                                     onFinish={onAddConditionCallBack}
    //                                     onFinishFailed={onAddConditionFaileCallBack}
    //                                 />
    //                             }
    //                             trigger="click"
    //                             visible={popoverVisible && block.orderNo == props.condNo}
    //                             onVisibleChange={handleVisibleChange}
    //                         >
    //                             <Button
    //                                 icon={<PlusOutlined onClick={e => onAddCondition(e, block.orderNo)} />}
    //                                 style={{ margin: '0 5px', color: '#1890FF' }}
    //                             />
    //                         </Popover>
    //                         {block.conditions && block.conditions.length <= 0 && (
    //                             <Popover
    //                                 placement="bottom"
    //                                 content={<AddScriptForm onFinish={onAddConditionScriptCallBack} />}
    //                                 trigger="click"
    //                                 visible={scriptPopoverVisible && block.orderNo == condNo}
    //                                 onVisibleChange={scriptHandleVisibleChange}
    //                             >
    //                                 <Button
    //                                     icon={<ArrowsAltOutlined />}
    //                                     onClick={e => onAddScript(e, block.orderNo)}
    //                                     style={{ margin: '0 5px', color: '#1890FF' }}
    //                                 />
    //                             </Popover>
    //                         )}
    //                     </Col>
    //                     <Col flex="60px">
    //                         <Button onClick={e => onDeleteBlock(e, block.orderNo)}>Delete</Button>
    //                     </Col>
    //                 </Row>
    //             }
    //             key="1"
    //         >
    //             <Row onClick={() => onClickRow(block.orderNo)}>
    //                 <Col flex="60px">
    //                     <span>THEN</span>
    //                 </Col>
    //                 <Col flex="auto">
    //                     <Collapse
    //                         defaultActiveKey={['1']}
    //                         bordered={false}
    //                         style={{ borderRadius: 5, backgroundColor: '#FFF' }}
    //                     >
    //                         <Panel
    //                             header={<div style={{ display: 'inline-block', marginTop: 5 }}>Slot Condition</div>}
    //                             key="2"
    //                             extra={
    //                                 <Button
    //                                     icon={<PlusOutlined />}
    //                                     style={{
    //                                         border: 'none',
    //                                         color: '#1890FF',
    //                                     }}
    //                                     onClick={(e: any) => onAddSlotTable(e, block.orderNo)}
    //                                 >
    //                                     Add
    //                                 </Button>
    //                             }
    //                         >
    //                             <SlotConditionList slotTables={block.slotTables} onDeleteSlot={onDeleteSlot} />
    //                         </Panel>
    //                         <Panel header="Response" key="3">
    //                             <ResponsePanel replies={block.replies} />
    //                         </Panel>
    //                     </Collapse>
    //                 </Col>
    //             </Row>
    //         </Panel>
    //     </Collapse>
    // );
    return <Empty />;
};
export default BlockReply;
