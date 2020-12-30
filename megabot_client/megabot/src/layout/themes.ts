export const darkTheme = {
    palette: {
        primary: {
            main: '#90caf9',
        },
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
};

// 테마 변경 하기 참고 사이트 https://github.com/mui-org/material-ui/issues/10980
export const lightTheme = {
    palette: {
        text: {
            primary: '#1890ff', // red   // #1890ff blue  // 왼쪽 메뉴 선택되었을때의 색깔
            secondary: '#8a959f', // left menu font color
            // contrastText: 'yellow', // 버튼들 안에 글씨 색깔
        },
        typography: {
            color: 'yellow',
        },
        primary: {
            main: '#90caf9', // 왼쪽 메뉴 마우스 오버 했을때 색깔
            // contrastText: 'yellow',
        },
        secondary: {
            light: '#26344a',
            main: '#26344a',
            dark: '#26344a',
            contrastText: '#FFFFFF', // 상단 글씨 색깔
        },
    },

    overrides: {
        MuiFilledInput: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '&$disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
        MuiListItemIcon: {
            root: {
                //fontWeight: "bold",
                color: '#8a959f', // left menu icon color
                marginTop: '5px',
                marginBottom: '5px',
                fontFamily: ['lato'].join(','),
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)', // 왼쪽 메뉴 마우스 오버햇을때 튜명하게
                },
            },
        },
        MuiList: {
            root: {
                //fontWeight: "bold",
                backgroundColor: '#26344a', // 컨피그 백그라운드 색
                //margin: "10px",
            },
        },
    },
};
