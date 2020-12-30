import React, { FC } from 'react';
import MyProjects from './MyProjects';
import Shared from './Shared';
import RecycleBin from './RecycleBin';

interface Props {
    selectMenu?: String;
}

const ProjectContents: FC<Props> = ({ selectMenu }) => {
    const loginUser = JSON.parse(localStorage.getItem('logged-user') || '{}');
    let render = <MyProjects loginUsername={loginUser.username} />;
    switch (selectMenu) {
        case 'myProjects':
            render = <MyProjects loginUsername={loginUser.username} />;
            break;
        case 'shared':
            render = <Shared loginUsername={loginUser.username} />;
            break;
        case 'recycleBin':
            render = <RecycleBin loginUsername={loginUser.username} />;
            break;
    }

    return <div className="projects-contents">{render}</div>;
};

export default ProjectContents;
