import { TranslationMessages } from 'ra-core';
import koreanMessages from 'ra-language-korean';

const customKoreanMessages: TranslationMessages = {
    ...koreanMessages,
    pos: {
        search: '검색',
        configuration: '프로필',
        language: '언어',
        theme: {
            name: '테마',
            light: '밝은',
            dark: '어두운',
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
            projects: '프로젝트',
            usermanagement: '사용자 관리',
            board: '게시판',
            sales: 'Sales',
            catalog: 'Catalog',
            customers: 'Customers',
        },
    },
    common: {
        button: {
            save: '저장',
            cancel: '취소',
            reload: '새로고침',
            import: '가져오기',
            export: '내보내기',
            edit: '수정',
            delete: '삭제',
            try_it: '시도',
            yes: '예',
            no: '아니요',
            retrain: '재교육',
            assign: '할당',
            add: '추가',
            deploy: '배포',
            undeploy: '배포 해제',
            redeploy: '다시 배포',
        },
        label: {
            private: '개인의',
            public: '공공의',
            no_description: '설명이 제공되지 않았습니다',
            update: '최신 정보',
            create: '생성',
            success: '성공',
            error: '오류',
            more: '더',
            created_on: '만들어진',
            updated_on: '업데이트 됨',
        },
        message: {
            error: '오류',
            success: '성공',
            unknown_error: '알 수 없는 오류가 발생했습니다.',
            unknown_error_try_again: '알 수 없는 오류가 발생했습니다. 나중에 다시 시도하십시오.',
            processing: '처리 중 ...',
            loading: '불러오는 중 ...',
            search: '검색 ...',
        },
        switch: {
            enable: '활성화',
            disable: '비활성화',
        },
    },
    resources: {
        projects: {
            name: '프로젝트',
            subtitle: '생성된 톡봇 리스트를 보실 수 있습니다.',
            page: {
                create: '톡봇 생성',
                fork: '톡봇 복구',
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
                title: '나의 프로젝트',
                create: '프로젝트 생성',
                sort: {
                    title: '정렬',
                    name: '이름',
                    create_date: '생성 날짜',
                    update_date: '업데이트 날짜',
                    ascending: '오름차순',
                    descending: '내림차순',
                },
            },
            shared: {
                title: '공유 프로젝트',
                create: '프로젝트 생성',
                sort: {
                    title: '정렬',
                    name: '이름',
                    create_date: '생성 날짜',
                    update_date: '업데이트 날짜',
                    ascending: '오름차순',
                    descending: '내림차순',
                },
            },
            recycle_bin: {
                title: '삭제한 프로젝트',
            },
            menu: {
                bot_summary: {
                    title: '봇 요약',
                    description: '일반, QA 설정, ...',
                },
                automate_tasks: {
                    title: '작업 자동화',
                    description: '메시지',
                },
                intents: '인텐트',
                entities: '엔터티',
                action_tasks: '액션 태스크',
                small_talk: {
                    title: '질의응답',
                    description: 'Q&A, 기계독해',
                },
                dialog_flow: '대화모델',
                bot_members: '봇 멤버',
                deploy: '배포',
                channel: {
                    title: '봇 채널',
                    description: '슬랙, 페이스북, ...',
                },
            },
            bot_summary: {
                tab: {
                    general: '일반',
                    backup_restore: '백업 및 복원',
                    message_setting: '메시지 설정',
                    ml_setting: 'ML 설정',
                    qa_setting: 'QA 설정',
                    danger_zone: '위험 지대',
                },
                general: {
                    title: '봇 정보',
                    name: '봇 이름',
                    full_name: '전체 이름',
                    description: '설명',
                    language: '기본 언어',
                    bot_type: {
                        title: '봇 종류',
                        single: 'Single Bot',
                        service: 'Bot Service',
                    },
                },
                backup: {
                    title: '백업',
                    description: '모든 봇 리소스를 다운로드하여 백업합니다: 인텐트, 엔티티, 액션 등... ',
                },
                restore: {
                    title: '복구',
                    description: '백업되어 있는 것으로 복구합니다.\n 경고! 데이터는 최신 버전으로 대체됩니다.',
                },
                danger_zone: {
                    delete: '봇 삭제',
                    delete_description:
                        '봇을 삭제 하시겠습니까? 삭제하면 봇에 있는 모든 데이터가 삭제되며 되돌릴 수 없습니다!',
                    make_public: '공용 봇',
                    public_description:
                        '귀하의 봇은 모든 사람에게 개방됩니다. 이 옵션은 봇이 비 개인 데이터 만 처리하는 경우 활성화됩니다.',
                },
            },
            social_channels: {
                tab: {
                    facebook: '페이스북',
                    slack: '슬렉',
                    line: '라인',
                    telegram: '텔레그램',
                    twitter: '트위터',
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
        automate: {
            name: '작업 자동화',
            placeholder: '봇은 무슨 말을 해야 합니까?',
            button: {
                create: '스마트 카드',
            },
            filter: {
                all: '모두',
                text_message: '문자 메시지',
                smart_card: '스마트 카드',
            },
            message_type: {
                welcome: '환영 인사',
                default_answer: '기타 답변',
            },
            message_description: {
                welcome: '봇과 통신하는 모든 사람이 이 블록을 먼저 봅니다.',
                default_answer: '봇이 인식하지 못하면 사람은 이 블록을 볼 수 있습니다 ...',
            },
        },
        entities: {
            name: '엔터티',
            placeholder: '엔티티 검색...',
            button: {
                create_entity: '엔터티 만들기',
                add_synonym: '동의어 추가',
            },
            table_header: {
                entity: '엔티티',
                description: '설명',
                turn_on: '활성화',
                values: '값',
            },
            tab_title: {
                my_entities: '내 엔터티',
                system_entities: '시스템 엔터티',
            },
            message: {
                empty: '엔티티가 없습니다.',
                confirm_delete: '이 엔티티를 삭제 하시겠습니까?',
            },
            label: {
                value_definition: '가치 정의',
                create_entity: '엔터티 만들기',
                update_entity: '엔터티 업데이트',
                entity_name: '엔터티 이름',
                use_prefix_suffix: '접두사 사용',
                enrichment: '풍부하게 함',
                value: '값',
                synonym: '동의어',
                regex: '정규식',
                not_set: '미 설정',
            },
            form: {
                entity_name: {
                    label: '엔티티 이름',
                    placeholder: '엔티티를 입력하십시오.',
                    hint:
                        '엔티티 이름은 문자로 시작해야하며 다음 만 포함 할 수 있습니다: A-Z, a-z, 0-9, _ (underscore), - (dash)',
                    error: {
                        required: '엔티티 이름은 필수입력 항목입니다.',
                        invalid:
                            '엔터티 이름은 문자로 시작해야하며 다음 만 포함 할 수 있습니다.: A-Z, a-z, 0-9, _ (underscore), - (dash)',
                    },
                },
            },
            system_entities_description:
                '다음 엔티티는 사용자 입력에서 숫자 및 날짜와 같은 항목에 대한 참조를 인식하기 위해 메가존에 의해 미리 빌드됩니다. 시스템 엔티티를 켜서 사용을 시작하십시오. 엔티티를 편집 할 수 없습니다. 날짜, 시간 및 숫자를 더 잘 감지하는 새로운 시스템 엔터티를 사용할 수 있습니다.',
        },
        intents: {
            name: '인텐트',
            placeholder: '인텐트 검색...',
            button: {
                create_intent: '인텐트 만들기',
            },
            message: {
                update_completed: '업데이트 인텐트 %{intent_name} 성공',
                create_completed: '인텐트 %{intent_name}를 성공적으로 만듭니다.',
                can_not_analysis: '이 문장을 분석 할 수 없습니다. 다시 시도하십시오!',
                no_sample_yet: '아직 샘플이 없습니다.',
                no_intent_yet: '인텐트가 없습니다.',
                delete_intent_confirm: '이 인텐트를 삭제 하시겠습니까?',
                delete_sample_confirm: '이 샘플을 삭제 하시겠습니까?',
                delete_completed: '인텐트 "%{intent_name}"가 제거되었습니다.',
                retrain_completed: '교육이 완료되었습니다.',
                retrain_confirm: {
                    title: '이러한 의도를 재교육 하시겠습니까?',
                    description:
                        '재교육에는 시간이 오래 걸리며 때로는 작동하지 않을 수도 있습니다. 사용하기 전에주의하십시오.',
                },
                update_linked_confirm_intent_completed: '링크 된 확인 인 텐트가 업데이트되었습니다.',
            },
            form: {
                intent_name: {
                    label: '인텐트 이름',
                    placeholder: '인텐트 이름 입력',
                    hint: '인텐트 이름은 문자로 시작해야하며 A-Z, a-z, 0-9, _ (밑줄),-(대시) 만 포함 할 수 있습니다.',
                    error: {
                        required: '인텐트 이름이 필요합니다.',
                        invalid:
                            '인텐트 이름은 문자로 시작해야하며 A-Z, a-z, 0-9, _ (밑줄),-(대시) 만 포함 할 수 있습니다.',
                    },
                },
                user_sample: {
                    label: '사용자 예',
                    placeholder: '사용자 예제 추가',
                    enter_hint: '샘플을 추가하려면 입력',
                },
                create_intent: '인텐트 생성',
                update_intent: '인텐트 수정',
            },
            table_header: {
                intent: '인텐트',
                information: '정보',
                samples: '샘플',
                lastUpdate: '마지막 업데이트',
                linked: '연결됨',
            },
        },
        action: {
            name: '액션 태스크',
            button: {
                create_action: '액션 만들기',
            },
            table_header: {
                task: '태스',
                argument: '인수',
                response_type: '응답 종류',
                test_result: '테스트 결과',
            },
            message: {
                empty: '액션이 없습니다.',
                confirm_delete: '이 액션 삭제 하시겠습니까?',
            },
            form: {
                title: '액션 생성',
                task_info: {
                    name: '액션 정보',
                    label: '액션 이름',
                    description: '설명',
                    categories: '카테고리',
                },
                argument: {
                    name: '인수',
                },
                response: {
                    name: '결과',
                    format: 'JSON 형태',
                },
                terminal: {
                    name: '터미널',
                },
                code_template: {
                    name: '코드 양식',
                },
                name: {
                    hint: '작업 이름은 문자로 시작해야하며 A-Z, a-z, 0-9, _ (밑줄),-(대시) 만 포함 할 수 있습니다.',
                    required: '작업 이름이 필요합니다.',
                    duplicate: '이름이 이미 시스템에 있습니다.',
                },
            },
        },
        smalltalk: {
            name: '메시지',
            button: {
                create_smalltalk: '질의응답 생성',
            },
            message: {
                update_completed: '작은 대화를 성공적으로 업데이트하십시오!',
                create_completed: '작은 대화를 성공적으로 만드십시오!',
                no_smalltalk_yet: '아직 질의응답이 없습니다.',
                delete_confirm: '이 질의응답을 삭제 하시겠습니까?',
                delete_completed: '질의응답이 제거되었습니다.',
                retrain_completed: '교육이 완료되었습니다.',
                retrain_confirm: {
                    title: '이 질의응답을 다시 배우고 싶습니까?',
                    description:
                        '재교육에는 시간이 오래 걸리며 때로는 작동하지 않을 수도 있습니다. 사용하기 전에주의하십시오.',
                },
            },
            form: {
                question: {
                    label: '질문',
                    placeholder: '사용자 말...',
                    hint: '',
                    error: {
                        required: '질문이 필요합니다.',
                        invalid: '',
                    },
                },
                answer: {
                    label: '대답',
                    placeholder: '봇 말...',
                    hint: '',
                    error: {
                        required: '답변이 필요합니다.',
                        invalid: '',
                    },
                },
                create_smalltalk: '작은 대화 만들기',
                update_smalltalk: '작은 대화 업데이트',
            },
            table_header: {
                question: '질문',
                answer: '대답',
            },
        },
        context_flow: {
            trigger_global: '글로벌 단계 트리거',
            label: {
                or: '또는',
                slot_condition: '슬롯 상태',
                responses: '응답',
                setting_advanced: '고급 설정',
            },
            button: {
                create: '단계 만들기',
                add_block: '여기서 블럭 추가...',
            },
            placeholder: {
                step_name: '단계 이름',
            },
            message: {
                setting_advanced:
                    '대화 중에 자동으로 채워지는 슬롯 목록을 정의합니다. 정의하지 않으면 기본적으로 모든 슬롯이 선택됩니다.',
            },
            errors: {
                step_name: '단계 이름을 입력하세요.',
            },
            slot: {
                modal_title: '슬롯 상태',
                label: {
                    slot: '슬롯',
                    default_value: '기본값',
                    required: '필수값',
                },
                placeholder: {
                    prompt: '사용자에게 보낼 프롬프트 입력...',
                },
                table: {
                    required: '필수값',
                    slot: '슬롯',
                    default_value: '기본값',
                    ask_to_user: '사용자에게 요청한 수',
                },
            },
        },
        botmember: {
            name: '봇 회원',
            button: {
                add_bot: '봇 추가',
            },
            table_header: {
                bot_member: '회원',
                switch_context: '컨텍스트 전환',
                show_confirm: '확인 표시',
                remove_context: '컨텍스트 제거',
                trigger_start_step: '시작 단계 트리거',
                focus_out_message: '메시지',
            },
            form: {
                bot_setting: '봇 멤버 설정',
                focus_out_message: '메시지에 집중',
                focus_out_message_desc:
                    '컨텍스트를 전환하면 메시지가 표시됩니다. 메시지 설정이 없으면 기본 시스템 메시지가 적용됩니다.',
            },
        },
        testzone: {
            message: {
                assign_sample_title: '의도에 사용자 문장을 할당 하시겠습니까?',
                assign_sample_confirm: '"%{intent_name}" 인 텐트에 "%{sentence}" 문장을 할당 하시겠습니까?',
                assign_completed: '할당 완료!',
            },
            placeholder: '메시지를 입력하세요...',
        },
        roles: {
            name: '역할',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        groups: {
            name: '그룹',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        users: {
            name: '사용자',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        company: {
            name: '회사',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        department: {
            name: '부서',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        usermanagement: {
            name: '사용자 관리',
            menu: {
                roles: '역할',
                groups: '그룹',
                users: '사용자',
                company: '회사',
                department: '부서',
            },
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        smartcardtemplate: {
            name: '스마트카드 템플릿',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        systemconfiguration: {
            name: '시스템 설정',
            menu: {
                general: '일반',
                serverconfig: '서버 설정',
                email: '이메일 설정',
            },
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        systemlog: {
            name: '시스템 기록',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        systemstatus: {
            name: '서버 상태',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        systemmonitor: {
            name: '시스템 모니터',
            server_status: '서버 상태',
            system_log: '시스템 로그',
        },
        distributionservers: {
            name: '배포 서버',
            table_header: {
                name: '서버 이름',
                database: '데이터 베이스',
                api_server: 'API 서버',
                chat_server: '채팅 서버',
            },
            form: {
                add_server: '서버 추가',
                edit_server: '서버 편집',
                database_connection: '데이터베이스 연결',
                api_server: 'API 서버',
                test_connection: '연결 테스트',
                server_name: {
                    label: '서버 이름',
                    error: {
                        required: '서버 이름이 필요합니다.',
                    },
                },
                host: {
                    label: '주최자',
                    error: {
                        required: '호스트가 필요합니다',
                    },
                },
                port: {
                    label: '포트',
                    error: {
                        required: '포트가 필요합니다',
                    },
                },
                username: {
                    label: '사용자 이름',
                    error: {
                        required: '사용자 이름이 필요합니다',
                    },
                },
                password: {
                    label: '암호',
                    error: {
                        required: '비밀번호가 필요합니다',
                    },
                },
                database: {
                    label: '데이터 베이스',
                    error: {
                        required: '데이터베이스가 필요합니다.',
                    },
                },
                server_context_path: {
                    label: '서버 컨텍스트 경로',
                },
                chat_server: {
                    label: '채팅 서버',
                },
            },
            message: {
                confirm_delete: '서버 "%{server_name}"을 배포 해제 하시겠습니까?',
            },
        },
        botmonitor: {
            name: '봇 모니터',
            placeholder: '메시지를 입력하세요...',
        },
        termsandconditions: {
            name: '약관',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        notice: {
            name: '공지사항',
            page: {
                create: '공지사항 작성',
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        faq: {
            name: 'FAQ',
            page: {
                create: 'FAQ 작성',
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        qna: {
            name: 'Q&A',
            page: {
                create: 'Q&A 작성',
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        userguide: {
            name: '사용 설명서',
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        channels: {
            name: '채널',
            page: {
                delete: '채널 삭제',
            },
            errors: {
                password_mismatch: 'The password confirmation is not the same as the password.',
            },
        },
        deploy: {
            name: '배포',
            title: '배포 상태',
            message: {
                no_deploy_servers: '아직 배포 서버가 없습니다.',
            },
            table_header: {
                server: '섬기는 사람',
                chat_client: '채팅 클라이언트',
                status: '상태',
            },
            form: {
                title: '배포',
                select_server: {
                    label: '배포 서버 선택:',
                    error: {
                        required: '배포 서버를 하나 이상 선택하십시오.',
                    },
                },
                deploy_at: {
                    label: '배포 위치:',
                    options: {
                        immediately: '바로',
                        specific_time: '특정 시간',
                    },
                },
                deploy_date: {
                    label: '데이트:',
                    error: {
                        required: '배포 날짜가 필요합니다.',
                    },
                },
                deploy_time: {
                    label: '시각:',
                    error: {
                        required: '배포 시간이 필요합니다.',
                    },
                },
            },
        },
        profile: {
            label: {
                user_name: '사용자 이름',
                full_name: '전체 이름',
                password: '비밀번호',
                confirm_password: '비밀번호 확인',
                department: '부서',
                company: '회사',
                email: '이메일',
            },
            placeholder: {
                user_name: '사용자 이름을 입력하세요...',
                full_name: '전체 이름을 입력하세요...',
                password: '비밀번호를 입력하세요...',
                confirm_password: '비밀번호를 다시 한번 입력하세요...',
                department: '부서을 입력하세요...',
                company: '회사를 입력하세요...',
                email: '이메일을 입력하세요...',
            },
        },
    },
};

export default customKoreanMessages;
