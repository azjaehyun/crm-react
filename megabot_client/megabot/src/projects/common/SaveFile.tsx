export default class SaveFile {
    static saveJson = (data: any, fileName: string) => {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = fileName;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    };

    static exportExcel = (fileName: string, data: any, link: any) => {
        const url = window.URL.createObjectURL(data);
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
    };
}
