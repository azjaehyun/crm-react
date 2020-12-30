interface Question {
    time: string;
    message: string;
}

interface Response {
    type: string;
    content: string;
    templateCode?: string;
    json?: any;
}

interface TurnContext {
    detectedIntent?: any;
    filledSlots: [];
}

interface Answer {
    time: string;
    responses: Array<Response>;
    context: any;
    responseType: string;
    isWaiting: Boolean;
    error?: string;
}

export interface Turn {
    botId: any;
    botName: string;
    conversationType: string;
    turnId: number;
    question?: Question;
    answer?: Answer;
}

class Conversation {
    botId: any;
    turnList: Array<Turn>;

    constructor(botId: any, turnList: Array<Turn>) {
        this.botId = botId;
        this.turnList = turnList;
    }

    addUnknownError() {}

    addQuestion(message: any) {
        let turnId = this.nextTurnId();
        const question: Question = {
            time: this.currentTime(),
            message: message,
        };

        const turn: Turn = {
            botId: this.botId,
            botName: '',
            conversationType: '',
            turnId: turnId,
            question: question,
            answer: {
                time: this.currentTime(),
                responses: [],
                context: {},
                responseType: '',
                isWaiting: true,
            },
        };

        this.turnList.push(turn);
        return turn.turnId;
    }

    addAnswer(botResp: any) {
        if (botResp.turnContext) {
            const turnNo = botResp.turnContext.turnNo;
            const turnId = turnNo === '' ? 0 : parseInt(botResp.turnContext.turnNo);

            const answer: Answer = {
                time: this.currentTime(),
                responses: [...botResp.responses],
                context: botResp.turnContext,
                responseType: botResp.responseType,
                isWaiting: false,
            };

            /* => already parser smart-card on TestZone.tsx
            answer.responses.forEach(reply => {
                if (reply.type === MESSAGE_CONTENT_TYPE.SMART_CARD) {
                    try {
                        const json = JSON.parse(reply.content);
                        reply.templateCode = json['templateCode'];
                        reply.json = json;
                    } catch (e) {
                        console.log('addAnswer parser smart-card', reply.content, e);
                        reply.json = {};
                    }
                }
            }); */

            let turn = null;
            if (turnId > 0) {
                turn = this.findTurn(turnId);
                if (turn) {
                    turn.answer = answer;
                    turn.botId = botResp.botId;
                    turn.botName = botResp.botName;
                    turn.conversationType = botResp.conversationType;
                }
            } else {
                const turn: Turn = {
                    botId: botResp.botId,
                    botName: botResp.botName,
                    conversationType: botResp.conversationType,
                    turnId: 0,
                    answer: answer,
                };
                this.turnList.push(turn);
            }
        } else {
            // error occurred
            let currentTurn = this.getCurrentTurn();
            if (currentTurn) {
                let answer: Answer = {
                    time: this.currentTime(),
                    responses: [],
                    context: null,
                    responseType: '',
                    isWaiting: false,
                    error: 'An unknown error occurred. Please try again later.',
                };
                currentTurn.answer = answer;
            }
        }

        // console.log('addAnswer', this.turnList);
    }

    findTurn(turnId: number) {
        if (this.turnList.length === 0) {
            return null;
        }
        return this.turnList.find((turn: Turn) => turn.turnId === turnId);
    }

    nextTurnId() {
        if (this.turnList.length === 0) return 1;
        return Math.max(...this.turnList.map((turn: Turn) => turn.turnId)) + 1;
    }

    currentTurnId() {
        if (this.turnList.length === 0) return 0;
        return Math.max(...this.turnList.map((turn: Turn) => turn.turnId));
    }

    getCurrentTurn() {
        const currentTurnId = this.currentTurnId();
        const currentTurn = this.findTurn(currentTurnId);
        return currentTurn;
    }

    currentTime() {
        const today = new Date();
        let hour = today.getHours().toString();
        let minute = today.getMinutes().toString();

        if (hour.length === 1) hour = '0' + hour;
        if (minute.length === 1) minute = '0' + minute;

        const time = hour + ':' + minute;
        return time;
    }
}

export default Conversation;
