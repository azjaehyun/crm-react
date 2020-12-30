import React, { FC, useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useDataProvider, useTranslate } from 'react-admin';
import DialogFlow from './DialogFlow';
import dialogflowService from '../service/dialogflowService';
import { Step } from '../../types';
import { IndicatorIcon } from '../common/Constants';
interface Props {
    botId: any;
}
const Dialog: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [loading, setLoading] = useState<boolean>(false);
    const [steps, setSteps] = useState();

    /**
     * Load all step of bot
     */
    const loadStep = useCallback(async () => {
        setLoading(true);
        dialogflowService
            .getList(dataProvider, props.botId)
            .then(({ data }: any) => {
                setSteps(data);
                setLoading(false);
            })
            .catch((error: any) => {
                console.log(error);
                setLoading(false);
            });
    }, [dataProvider, props.botId]);

    /**
     * Do delete a step by id
     */
    const doDeleteStep = useCallback(
        async (step: Step) => {
            setLoading(true);
            dialogflowService
                .deleteStep(dataProvider, props.botId, step.id)
                .then(({ status, data }: any) => {
                    setLoading(false);
                    if (status === 200) {
                        loadStep().then();
                    } else {
                    }
                })
                .catch((error: any) => {
                    setLoading(false);
                    console.log(error);
                });
        },
        [dataProvider, loadStep, props.botId]
    );

    useEffect(() => {
        loadStep().then();
    }, [loadStep]);

    return (
        <Spin
            wrapperClassName="mz-drawer-spin"
            indicator={IndicatorIcon}
            spinning={loading}
            tip={translate(`common.message.loading`)}
        >
            <DialogFlow
                botId={props.botId}
                steps={steps}
                onDeleteStep={(step: Step) => doDeleteStep(step)}
                onChange={() => loadStep()}
            />
        </Spin>
    );
};

export default Dialog;
