import {SystemPropertyEntity} from "../services/systemConfigService";

export const defaultGroups = [
    {
        "groupName":"General",
        "groupId":1,
        "propertyKeyList":[
            "com.megazone.dialogflow.user.lock.duration",
            "com.megazone.systemlog.apiserver.logFolder",
            "com.megazone.systemlog.extension",
            "com.megazone.systemlog.chatserver.logFolder",
            "com.megazone.systemlog.cleanup.enable",
            "com.megazone.dialogflow.conversation.log.cleanup.dayOlderThan",
            "com.megazone.systemlog.cleanup.dayOlderThan"
        ]
    },
    {
        "groupName":"Distribution Server",
        "groupId":2,
        "propertyKeyList":[
            "com.megazone.dialogflow.conversation.timeoutInSeconds"
        ]
    },
    {
        "groupName":"NLP / NLU Server",
        "groupId":4,
        "propertyKeyList":[
            "com.megazone.nlu.url",
            "com.megazone.nlu.classifier.threshold"
        ]
    },
    {
        "groupName":"e-Mail Settings",
        "groupId":6,
        "propertyKeyList":[
            "mail.protocol",
            "mail.host",
            "mail.port",
            "mail.smtp.auth",
            "mail.smtp.starttls.enable",
            "mail.debug",
            "mail.username",
            "mail.password",
            "mail.fromsender"
        ]
    },
    {
        "groupName":"Plugin Server",
        "groupId":9,
        "propertyKeyList":[
            "com.megazone.plugins.baseApiUrl",
            "com.megazone.plugins.executorUrl"
        ]
    },
    {
        "groupName":"QA Server",
        "groupId":10,
        "propertyKeyList":[
            "com.megazone.dialogflow.qaserver.url"
        ]
    }
]
export const defaultPropertyList: Array<SystemPropertyEntity> = [
    {
        "key":"com.megazone.dialogflow.user.lock.duration",
        "name":"Temporary User Lock Duration",
        "description":"Lock duration time in seconds. Default is 30s",
        "value":"30",
        "groupId":1
    },
    {
        "key":"com.megazone.systemlog.apiserver.logFolder",
        "name":"Log Folder of API Server",
        "description":"Log folder path. Default is located at /tmp/analytics/dialogflow-resources/apiServer/logs",
        "value":"/tmp/analytics/dialogflow-resources/apiServer/logs",
        "groupId":1
    },
    {
        "key":"com.megazone.systemlog.extension",
        "name":"Log Extension",
        "description":"Log file extension. E.g: log,log.gz",
        "value":"log,log.gz",
        "groupId":1
    },
    {
        "key":"com.megazone.systemlog.chatserver.logFolder",
        "name":"Log Folder of Chat Server",
        "description":"Log folder path of ChatServer. Default is located at /tmp/analytics/dialogflow-resources/chatserver/logs",
        "value":"/tmp/analytics/dialogflow-resources/chatserver/logs",
        "defaultValue":"/home/adam-talk/apache-tomcat-op/logs",
        "groupId":1
    },
    {
        "key":"com.megazone.systemlog.cleanup.enable",
        "name":"Cleanup Status",
        "description":"Cleaning up status",
        "value":"true",
        "defaultValue":"true",
        "groupId":1
    },
    {
        "key":"com.megazone.dialogflow.conversation.log.cleanup.dayOlderThan",
        "name":"Cleanup Condition",
        "description":"The keeping date setting. By default, all conversation logs will be kept until 10 days",
        "value":"10",
        "defaultValue":"30",
        "groupId":1
    },
    {
        "key":"com.megazone.systemlog.cleanup.dayOlderThan",
        "name":"Long Cleanup Condition",
        "description":"The keeping date setting for system log. By default, system log files will be kept until 30 days",
        "value":"30",
        "defaultValue":"30",
        "groupId":1
    },
    {
        "key":"com.megazone.dialogflow.conversation.timeoutInSeconds",
        "name":"ChatServer Timeout",
        "description":"ChatServer Timeout in seconds. Default is 300 seconds",
        "value":"300",
        "defaultValue":"300",
        "groupId":2
    },
    {
        "key":"com.megazone.nlu.url",
        "name":"NLU Server",
        "description":"NLU Server API Configuration. E.g: http://127.0.0.1:5001/api/v1",
        "value":"http://127.0.0.1:20700/api/v1",
        "groupId":4
    },
    {
        "key":"com.megazone.nlu.classifier.threshold",
        "name":"ML Threshold",
        "description":"Define the minimum ML score to qunlity an intent as a probable match",
        "value":"0.65",
        "defaultValue":"0.65",
        "groupId":4
    },
    {
        "key":"mail.protocol",
        "name":"Protocol",
        "description":"The SMTP protocol provider",
        "value":"smtp",
        "defaultValue":"smtp",
        "groupId":6
    },
    {
        "key":"mail.host",
        "name":"Host",
        "description":"The SMTP server to connect to",
        "value":"smtp.gmail.com",
        "defaultValue":"smtp.gmail.com",
        "groupId":6
    },
    {
        "key":"mail.port",
        "name":"Port",
        "description":"The SMTP server port to connect to, if the connect() method doesn't explicitly specify one. Defaults to 25",
        "value":"587",
        "defaultValue":"587",
        "groupId":6
    },
    {
        "key":"mail.smtp.auth",
        "name":"SMTP Auth",
        "description":"If true, attempt to authenticate the user using the AUTH command. Defaults to false",
        "value":"true",
        "defaultValue":"true",
        "groupId":6
    },
    {
        "key":"mail.smtp.starttls.enable",
        "name":"SMTP StartTLS Enable",
        "description":"If true, enables the use of the STARTTLS command (if supported by the server) to switch the connection to a TLS-protected connection before issuing any login commands. If the server does not support STARTTLS, the connection continues without the use of TL",
        "value":"true",
        "defaultValue":"true",
        "groupId":6
    },
    {
        "key":"mail.debug",
        "name":"Debug",
        "description":"Debug flag",
        "value":"false",
        "defaultValue":"false",
        "groupId":6
    },
    {
        "key":"mail.username",
        "name":"Username",
        "description":"SMTP username",
        "value":"example@mz.co.kr",
        "defaultValue":"example@mz.co.kr",
        "groupId":6
    },
    {
        "key":"mail.password",
        "name":"Password",
        "description":"SMTP password",
        "value":"example1234",
        "defaultValue":"example1234",
        "groupId":6
    },
    {
        "key":"mail.fromsender",
        "name":"From Sender",
        "description":"Sender information",
        "value":"MEGAZONE Corp",
        "defaultValue":"MEGAZONE Corp",
        "groupId":6
    },
    {
        "key":"com.megazone.plugins.baseApiUrl",
        "name":"Plugin Server",
        "description":"Plugin Server API Configuration. E.g: http://127.0.0.1:9000",
        "value":"http://127.0.0.1:8002",
        "groupId":9
    },
    {
        "key":"com.megazone.plugins.executorUrl",
        "name":"Plugin Executor",
        "description":"Plugin Executor RESTful API. E.g: http://127.0.0.1:9000/api/v1/script/execute",
        "value":"http://127.0.0.1:8002/api/v1/script/execute",
        "groupId":9
    },
    {
        "key":"com.megazone.dialogflow.qaserver.url",
        "name":"Q&A Server",
        "description":"Q&A Server Configuration. E.g: http://127.0.0.1:5000/api/v1/irqa",
        "value":"http://127.0.0.1:20600/api/v1/irqa",
        "defaultValue":"http://127.0.0.1:5002/api/v1",
        "groupId":10
    }
]
export const defaultPropertyData: {[key: string]: SystemPropertyEntity} = {};
defaultPropertyList.forEach((property)=>{
    defaultPropertyData[property.key] = property;
})
