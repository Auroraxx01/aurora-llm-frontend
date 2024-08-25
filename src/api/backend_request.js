import axios from "axios";

export default function getPicture(file_id, file_type) {
    let formData = new FormData();
    formData.append('file_id', file_id);
    formData.append('file_type', file_type);

    return axios.post('/v1/retrieve_file', formData)
}

export function sendMessage(threadID, message) {
    let formData = new FormData();
    formData.append('thread_id', threadID);
    formData.append('message', message);

    return axios.post('/v1/send_message', formData)
}

export function checkMessages(threadID, msgID) {
    let url = '/v1/messages' + '?thread_id=' + threadID
    if (!!msgID) {
        url += '&message_id=' + msgID
    }

    return axios.get(url)
}

export function getFileUri(fileID, fileType) {
    let formData = new FormData();
    formData.append('file_id', fileID);
    formData.append('file_type', fileType);

    return axios.post('/v1/retrieve_file', formData)
}

export function getConversations() {
    return axios.get('/v1/conversations')
}

export function newConversation() {
    return axios.post('/v1/new_conversation')
}