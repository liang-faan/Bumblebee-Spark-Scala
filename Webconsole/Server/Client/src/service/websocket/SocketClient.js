var W3CWebSocket = require('websocket').w3cwebsocket;

export function createSocketClient(port, callback) {
    var client = new W3CWebSocket(`ws://localhost:${port}/`, 'echo-protocol');

    client.onerror = function (err) {
        console.log('Connection Error');
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        client.close();
        
    };

    client.onopen = function () {
        console.log('WebSocket Client Connected');

        function sendNumber() {
            if (client.readyState === client.OPEN) {
                var number = Math.round(Math.random() * 0xFFFFFF);
                console.log("Heart Beat: " + number)
                client.send(number.toString());
                setTimeout(sendNumber, 3000);
            }
        }
        sendNumber();
    };

    client.onclose = function (e) {
        console.log('echo-protocol Client Closed');
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        // client._readyState = 0;
        client.close();
        // setTimeout(function() {
        //     createSocketClient(8080);
        // }, 1000);
    };

    client.onmessage = function (e) {
        if (typeof e.data === 'string') {
            console.log("Received: '" + e.data + "'");

            callback(e.data)
        }
    };
};