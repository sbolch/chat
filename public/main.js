const socket = io();

$(document).ready(() => {
    $('form').submit((e) => {
        e.preventDefault();
        socket.emit('message', $('#message').val());
        $('#message').val('');
    });

    socket.on('message', (msg) => {
        let li = $('<li>');
        li.append($('<span>').css('background', msg.color).text(msg.text));
        li.appendTo($('#messages'));
    });
});
