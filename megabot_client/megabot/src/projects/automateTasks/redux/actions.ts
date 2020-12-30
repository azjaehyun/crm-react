import { MessageEntity } from '../../service/automateTaskService';
import { ADD_MESSAGE } from './actionTypes';

export const addMessage = (messageEntity: MessageEntity) => ({
    type: ADD_MESSAGE,
    payload: messageEntity,
});
