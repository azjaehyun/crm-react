import React, { FC, useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined, DeleteOutlined, BranchesOutlined } from '@ant-design/icons';
import ProjectContents from './ProjectContents';
import './scss/Projects.scss';
import { useTranslate } from 'react-admin';

const Projects: FC = () => {
    const translate = useTranslate();
    const [selectMenu, setSelectMenu] = useState('myProjects');

    const onClick = (e: any) => {
        setSelectMenu(e.key);
    };

    return (
        <div className="projects-container">
            <div className="projects-menu">
                <Menu onClick={onClick} selectedKeys={[selectMenu]} mode="horizontal">
                    <Menu.Item key="myProjects" icon={<UserOutlined />}>
                        {translate(`resources.projects.my_projects.title`)}
                    </Menu.Item>
                    <Menu.Item key="shared" icon={<BranchesOutlined />}>
                        {translate(`resources.projects.shared.title`)}
                    </Menu.Item>
                    <Menu.Item key="recycleBin" icon={<DeleteOutlined />}>
                        {translate(`resources.projects.recycle_bin.title`)}
                    </Menu.Item>
                </Menu>
            </div>
            <ProjectContents selectMenu={selectMenu} />
        </div>
    );
};

export default Projects;
