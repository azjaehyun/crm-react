import React, { FC } from 'react';
import Editor from '@monaco-editor/react';

interface Props {
    language?: string;
}

const ActionEditor: FC<Props> = (props: Props) => {
    return <Editor width="550px" height="580px" language={props.language} theme="vs-dark" />;
};

export default ActionEditor;
