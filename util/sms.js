const accountSid = 'ACfce5dc4ced2603407620dd2fc180d77a';
const authToken = '8573b7f8cf4447171777323ba5d89025';
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (body, phoneNum) => {
    try {
        client.messages
        .create({
            body: body,
            from: '+14787394303',
            to: "+"+phoneNum
        })
        .then(message => console.log(message.sid));
    } catch (error) {
        console.error(`Error sending SMS: ${error}`);
    }
};

module.exports = {
    sendSMS
};