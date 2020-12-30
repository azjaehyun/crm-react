import { TranslationMessages } from 'ra-core';
import englishMessages from 'ra-language-english';

const customEnglishMessages: TranslationMessages = {
    ...englishMessages,
    pos: {
        search: 'Search',
        configuration: 'Profile',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        dashboard: {
            monthly_revenue: 'Monthly Revenue',
            new_orders: 'New Orders',
            pending_reviews: 'Pending Reviews',
            new_customers: 'New Customers',
            pending_orders: 'Pending Orders',
            order: {
                items: 'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
            },
            welcome: {
                title: 'Welcome to react-admin demo',
                subtitle:
                    "This is the admin of an imaginary poster shop. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
                aor_button: 'react-admin site',
                demo_button: 'Source for this demo',
            },
        },
        menu: {
            projects: 'Projects',
            usermanagement: 'User Management',
            board: 'Board',
            sales: 'Sales',
            catalog: 'Catalog',
            customers: 'Customers',
        },
    },
    common: {
        button: {
            save: 'Save',
            cancel: 'Cancel',
            reload: 'Reload',
            import: 'Import',
            export: 'Export',
            edit: 'Edit',
            delete: 'Delete',
            try_it: 'Try it',
            yes: 'Yes',
            no: 'No',
            retrain: 'Retrain',
            assign: 'Assign',
            add: 'Add',
            deploy: 'Deploy',
            undeploy: 'Un-eploy',
            redeploy: 'Re-Deploy',
        },
        label: {
            private: 'Private',
            public: 'Public',
            no_description: 'No description provided.',
            update: 'Update',
            create: 'Create',
            success: 'Success',
            error: 'Error',
            more: 'more',
            created_on: 'Created',
            updated_on: 'Updated',
        },
        message: {
            error: 'Error',
            success: 'Success',
            unknown_error: 'An unknown error occurred.',
            unknown_error_try_again: 'An unknown error occurred. Please try again later.',
            processing: 'Processing...',
            loading: 'Loading...',
            delete_completed: '%{objectName} have been removed.',
            search: 'Search ...',
        },
        switch: {
            enable: 'Enable',
            disable: 'Disable',
        },
        error_message: {},
    },
    resources: {
        projects: {
            name: 'Projects',
            subtitle: 'You can see the list of created talkbots.',
            page: {
                create: 'Create New Talkbot',
                fork: 'Fork Talkbot',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
            create_project: {
                form: {
                    name: {
                        hint:
                            'Bot name should start with a letter and can contain only the following: A-Z, a-z, 0-9, _ (underscore), - (dash)',
                    },
                },
            },
            my_projects: {
                title: 'My Projects',
                create: 'New Project',
                sort: {
                    title: 'Sort',
                    name: 'Name',
                    create_date: 'Create Date',
                    update_date: 'Update Date',
                    ascending: 'Ascending',
                    descending: 'Descending',
                },
            },
            shared: {
                title: 'Shared',
                sort: {
                    title: 'Sort',
                    name: 'Name',
                    create_date: 'Create Date',
                    update_date: 'Update Date',
                    ascending: 'Ascending',
                    descending: 'Descending',
                },
            },
            recycle_bin: {
                title: 'Recycle Bin',
                sort: {
                    title: 'Sort',
                    name: 'Name',
                    create_date: 'Create Date',
                    update_date: 'Update Date',
                    ascending: 'Ascending',
                    descending: 'Descending',
                },
            },
            menu: {
                bot_summary: {
                    title: 'Bot Summary',
                    description: 'General, QA Setting, ...',
                },
                automate_tasks: {
                    title: 'Automate Tasks',
                    description: 'Message',
                },
                intents: 'Intents',
                entities: 'Entities',
                action_tasks: 'Action Tasks',
                small_talk: {
                    title: 'QuAC',
                    description: 'Q&A, MRC',
                },
                dialog_flow: 'Context Flow',
                bot_members: 'Bot Members',
                deploy: 'Deploy',
                channel: {
                    title: 'Bot Channel',
                    description: 'slack, facebook, ...',
                },
            },
            bot_summary: {
                tab: {
                    general: 'General',
                    message_setting: 'Message Setting',
                    backup_restore: 'Backup & Restore',
                    ml_setting: 'ML Setting',
                    qa_setting: 'QA Setting',
                    danger_zone: 'Danger Zone',
                },
                general: {
                    title: 'Bot Profile',
                    name: 'Bot Name',
                    full_name: 'Full Name',
                    description: 'Description',
                    language: 'Default Language',
                    bot_type: {
                        title: 'Bot Type',
                        single: 'Single Bot',
                        service: 'Bot Service',
                    },
                },
                backup: {
                    title: 'Back up',
                    description:
                        'Create a backup by downloading all Bot resources: intents, entities, actions, step...',
                },
                restore: {
                    title: 'Restore',
                    description: 'Restore a backup. Warning! Data will be replaced with the newer version.',
                },
                danger_zone: {
                    delete: 'DELETE BOT',
                    delete_description:
                        'Are you sure you want to delete this Bot? This will destroy the agent with all corresponding data and cannot be undone!',
                    make_public: 'MAKE PUBLIC',
                    public_description:
                        'Your bot will be open to everyone. This option is enabled if your bot processes only non-personal data.',
                },
            },
            social_channels: {
                tab: {
                    facebook: 'facebook',
                    slack: 'slack',
                    line: 'line',
                    telegram: 'telegram',
                    twitter: 'twitter',
                },
            },
            message_error: {
                name_exist: 'Name already exists',
                name_invalid: 'Name is invalid',
                bot_not_found: 'Bot not found',
                template_not_found: 'Template not found',
                group_not_found: 'Group not found',
                user_not_found: 'User not found',
                language_not_support: 'Language does not support',
                unable_change_type: 'Can not change the bot type, because it is being used by another bot',
            },
        },
        shared: {
            name: 'Shared',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        recoverbot: {
            name: 'Recycle Bin',
            fields: {
                commands: 'Orders',
                first_seen: 'First seen',
                groups: 'Segments',
                last_seen: 'Last seen',
                last_seen_gte: 'Visited Since',
                name: 'Name',
                total_spent: 'Total spent',
                password: 'Password',
                confirm_password: 'Confirm password',
            },
            fieldGroups: {
                identity: 'Identity',
                address: 'Address',
                stats: 'Stats',
                history: 'History',
                password: 'Password',
                change_password: 'Change Password',
            },
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        automate: {
            name: 'Automate Tasks',
            placeholder: 'What should bot say?',
            button: {
                create: 'Smart Card',
            },
            filter: {
                all: 'All',
                text_message: 'Text Message',
                smart_card: 'Smart Card',
            },
            message_type: {
                welcome: 'Welcome Message',
                default_answer: 'Default Answer',
            },
            message_description: {
                welcome: 'Every person communicating with the bot sees this block first.',
                default_answer: 'A person will see this block if the bot does not recognize...',
            },
        },
        entities: {
            name: 'Entities',
            placeholder: 'Search entities...',
            button: {
                create_entity: 'Create Entity',
                add_synonym: 'Add synonym',
            },
            table_header: {
                entity: 'Entity',
                description: 'Description',
                turn_on: 'Turn_on',
                values: 'Values',
            },
            tab_title: {
                my_entities: 'My entities',
                system_entities: 'System entities',
            },
            message: {
                empty: 'Have no entity',
                confirm_delete: 'Are you sure delete this entity?',
            },
            label: {
                value_definition: 'VALUE DEFINITION',
                create_entity: 'Create entity',
                update_entity: 'Update entity',
                entity_name: 'Entity name',
                use_prefix_suffix: 'Use prefix/suffix',
                enrichment: 'Enrichment',
                value: 'Value',
                synonym: 'Synonyms',
                regex: 'Regexs',
                not_set: 'NOT SET',
            },
            form: {
                entity_name: {
                    label: 'Entity name',
                    placeholder: 'Enter entity name',
                    hint:
                        'Entity name should start with a letter and can contain only the following: A-Z, a-z, 0-9, _ (underscore), - (dash)',
                    error: {
                        required: "Entity's name is required.",
                        invalid:
                            "Entity's name should start with a letter and can contain only the following: A-Z, a-z, 0-9, _ (underscore), - (dash)",
                    },
                },
            },
            message_error: {
                name_exist: 'Name already exists',
                name_invalid: 'Name is invalid',
                bot_not_found: 'Bot not found',
                template_not_found: 'Template not found',
                group_not_found: 'Group not found',
                user_not_found: 'User not found',
                language_not_support: 'Language does not support',
                unable_change_type: 'Can not change the bot type, because it is being used by another bot',
            },
            system_entities_description:
                "The following entities are prebuilt by Megazone to recognize references to things like numbers and dates in user input. Turn on a system entity to start using it. You can't edit entities. Learn more new system entities are available that are even better at detecting dates, times, and numbers.",
        },
        intents: {
            name: 'Intents',
            placeholder: 'Search Intent...',
            button: {
                create_intent: 'Create Intent',
            },
            message: {
                update_completed: 'Update intent "%{intent_name}" successful!',
                create_completed: 'Create intent "%{intent_name}" successful!',
                can_not_analysis: 'Can not analysis this sentence. Please try again!',
                no_sample_yet: 'No example yet.',
                no_intent_yet: 'No intent yet.',
                delete_intent_confirm: 'Are you sure delete this intent?',
                delete_sample_confirm: 'Are you sure delete this sample?',
                delete_completed: 'Intent "%{intent_name}" have been removed.',
                retrain_completed: 'Training completed.',
                retrain_confirm: {
                    title: 'Do you Want to retrain these intents?',
                    description:
                        'Retraining can take a long time, sometimes not working. Please be careful before use.',
                },
                update_linked_confirm_intent_completed: 'The linked confirm intents have been updated',
            },
            form: {
                intent_name: {
                    label: 'Intent name',
                    placeholder: 'Enter Intent name',
                    hint:
                        'Intent name should start with a letter and can contain only the following: A-Z, a-z, 0-9, _ (underscore), - (dash).',
                    error: {
                        required: 'Intent name is required.',
                        invalid:
                            'Intent name should start with a letter and can contain only the following: A-Z, a-z, 0-9, _ (underscore), - (dash).',
                    },
                },
                user_sample: {
                    label: 'User Examples',
                    placeholder: 'Add user example',
                    enter_hint: 'Enter to add sample',
                },
                create_intent: 'Create Intent',
                update_intent: 'Update Intent',
            },
            table_header: {
                intent: 'Intent',
                information: 'Information',
                samples: 'Samples',
                lastUpdate: 'Last Update',
                linked: 'Linked',
            },
        },
        action: {
            name: 'Action Tasks',
            button: {
                create_action: 'Create Action',
            },
            table_header: {
                task: 'Task',
                argument: 'Argument',
                response_type: 'Response Type',
                test_result: 'Test Result',
            },
            message: {
                empty: 'Have no Action',
                confirm_delete: 'Are you sure delete this action?',
            },
            form: {
                title: 'Create Action Task',
                task_info: {
                    name: 'Task Info',
                    label: 'Task Name',
                    description: 'Description',
                    categories: 'Categories',
                },
                argument: {
                    name: 'Argument',
                },
                response: {
                    name: 'Response',
                    format: 'JSON Format',
                },
                terminal: {
                    name: 'Terminal',
                },
                code_template: {
                    name: 'Code Template',
                },
                name: {
                    hint:
                        'Action name must start with a letter and can contain only A-Z, a-z, 0-9, _ (underscore),-(dash). Limit number of characters to 15',
                    required: 'Action name is required',
                    duplicate: 'The name already exists on the system',
                },
            },
        },
        smalltalk: {
            name: 'QuAC',
            button: {
                create_smalltalk: 'Create',
            },
            message: {
                update_completed: 'Update QuAC successful!',
                create_completed: 'Create QuAC successful!',
                no_smalltalk_yet: 'No QuAC yet.',
                delete_confirm: 'Are you sure delete this QuAC?',
                delete_completed: 'QuAC have been removed.',
                retrain_completed: 'Training completed.',
                retrain_confirm: {
                    title: 'Do you Want to retrain these QuAC?',
                    description:
                        'Retraining can take a long time, sometimes not working. Please be careful before use.',
                },
            },
            form: {
                question: {
                    label: 'Question',
                    placeholder: 'User say...',
                    hint: '',
                    error: {
                        required: 'Question is required.',
                        invalid: '',
                    },
                },
                answer: {
                    label: 'Answer',
                    placeholder: 'Bot say...',
                    hint: '',
                    error: {
                        required: 'Answer is required.',
                        invalid: '',
                    },
                },
                create_smalltalk: 'Create QuAC',
                update_smalltalk: 'Update QuAC',
            },
            table_header: {
                question: 'Question',
                answer: 'Answer',
            },
        },
        context_flow: {
            trigger_global: 'Trigger global step',
            label: {
                or: 'OR',
                slot_condition: 'Slot Condition',
                responses: 'Responses',
                setting_advanced: 'Setting Advanced',
            },
            button: {
                create: 'New Step',
                add_block: 'Add Block here...',
            },
            placeholder: {
                step_name: 'Step Name',
            },
            message: {
                setting_advanced:
                    'Define a list of slots will be automatically filled during conversation. Without definition, all slots will be selected by default.',
            },
            errors: {
                step_name: 'Please input step name.',
            },
            slot: {
                modal_title: 'Slot Condition',
                label: {
                    slot: 'Slot',
                    default_value: 'Default Value',
                    required: 'Required',
                },
                placeholder: {
                    prompt: 'Typing prompt to the user...',
                },
                table: {
                    required: 'Required',
                    slot: 'Slot',
                    default_value: 'Default Value',
                    ask_to_user: 'Ask to user',
                },
            },
        },
        botmember: {
            name: 'Members',
            button: {
                add_bot: 'Add Bot',
            },
            table_header: {
                bot_member: 'Member',
                switch_context: 'Switch Context',
                show_confirm: 'Show Confirm',
                remove_context: 'Remove Context',
                trigger_start_step: 'Trigger Start Step',
                focus_out_message: 'Messages',
            },
            form: {
                bot_setting: 'Bot Member Setting',
                focus_out_message: 'Focus out messages',
                focus_out_message_desc:
                    'The message will be show when switch context. The default system message will be take if there are not messages setting.',
            },
        },
        testzone: {
            message: {
                assign_sample_title: 'Assign user sentence to intent?',
                assign_sample_confirm: 'Do you want assign sentence "%{sentence}" to intent "%{intent_name}"',
                assign_completed: 'Assign completed!',
            },
            placeholder: 'Type a message...',
        },
        roles: {
            name: 'Roles',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        groups: {
            name: 'Groups',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        users: {
            name: 'Users',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        company: {
            name: 'Company',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        department: {
            name: 'Department',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        usermanagement: {
            name: 'User Management',
            menu: {
                roles: 'Roles',
                groups: 'Groups',
                users: 'Users',
                company: 'Company',
                department: 'Department',
            },
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        smartcardtemplate: {
            name: 'Smartcard Template',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        systemconfiguration: {
            name: 'System Configuration',
            menu: {
                general: 'General',
                serverconfig: 'Server Config',
                email: 'E-mail Settings',
            },
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        systemlog: {
            name: 'System Log',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        systemstatus: {
            name: 'System Status',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        systemmonitor: {
            name: 'System Monitor',
            server_status: 'Server Status',
            system_log: 'System Log',
            message: {
                have_no_log: 'Have no log file',
            },
        },
        distributionservers: {
            name: 'Distribution Servers',
            table_header: {
                name: 'Name',
                database: 'Database',
                api_server: 'API Server',
                chat_server: 'Chat Server',
            },
            form: {
                add_server: 'Add Server',
                edit_server: 'Edit Server',
                database_connection: 'Database Connection',
                api_server: 'API Server',
                test_connection: 'Test Connection',
                server_name: {
                    label: 'Server name',
                    error: {
                        required: 'Server name is required',
                    },
                },
                host: {
                    label: 'Host',
                    error: {
                        required: 'Host is required',
                    },
                },
                port: {
                    label: 'Port',
                    error: {
                        required: 'Port is required',
                    },
                },
                username: {
                    label: 'Username',
                    error: {
                        required: 'Username is required',
                    },
                },
                password: {
                    label: 'Password',
                    error: {
                        required: 'Password is required',
                    },
                },
                database: {
                    label: 'Database',
                    error: {
                        required: 'Database is required',
                    },
                },
                server_context_path: {
                    label: 'Server Context Path',
                },
                chat_server: {
                    label: 'Chat Server',
                },
            },
            message: {
                confirm_delete: 'Are you sure to un-deploy server "%{server_name}"?',
            },
        },
        botmonitor: {
            name: 'Bot Monitor',
            placeholder: 'Enter Message...',
        },
        termsandconditions: {
            name: 'Terms and Conditions',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        notice: {
            name: 'Notice',
            page: {
                create: 'Create Notice',
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        faq: {
            name: 'FAQ',
            page: {
                create: 'Create FAQ',
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        qna: {
            name: 'Q&A',
            page: {
                create: 'Create Q&A',
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        userguide: {
            name: 'User Guide',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        channels: {
            name: 'Channels',
            page: {
                delete: 'Delete Channels',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        deploy: {
            name: 'Deploy',
            title: 'Deploy Status',
            message: {
                no_deploy_servers: 'No deploy servers yet.',
            },
            table_header: {
                server: 'Server',
                chat_client: 'Chat Client',
                status: 'Status',
            },
            form: {
                title: 'Deploying',
                select_server: {
                    label: 'Select distribution server:',
                    error: {
                        required: 'Select at least one distribution server',
                    },
                },
                deploy_at: {
                    label: 'Deploy at:',
                    options: {
                        immediately: 'Immediately',
                        specific_time: 'Specific Time',
                    },
                },
                deploy_date: {
                    label: 'Date:',
                    error: {
                        required: 'Deploy date is required',
                    },
                },
                deploy_time: {
                    label: 'Time:',
                    error: {
                        required: 'Deploy time is required',
                    },
                },
            },
        },
        profile: {
            label: {
                user_name: 'User Name',
                full_name: 'Full Name',
                password: 'Password',
                confirm_password: 'Confirm Password',
                department: 'Department',
                company: 'Company',
                email: 'Email',
            },
            placeholder: {
                user_name: 'Enter User Name...',
                full_name: 'Enter Full Name...',
                password: 'Enter Password...',
                confirm_password: 'Enter Confirm Password...',
                department: 'Enter Department...',
                company: 'Enter Company...',
                email: 'Enter Email...',
            },
        },
    },
};

export default customEnglishMessages;
