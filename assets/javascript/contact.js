var MESSAGE_TIMER = -1;

$(function() {
    $('#contact-send').click(verifyFields);
    $('#message-close').click(hideMessage);

    if (window.location.href.indexOf('?sent') !== -1) {
        showMessage('Your message was sent successfully!', 0);
    }
});

function verifyFields(event) {
    var $fields = $('input:not([type=hidden]), textarea');
    var errors = 0;
    var message = "";

    $fields.each(function(index, elem) {
        var complete = true;
        var $field = $(elem);
        var type = $field.attr('placeholder');
        var value = $field.val();
        
        if (value.trim() === "") {
            complete = false;
            message = "Please fill in all fields.";
        } else if (type === 'Email' && value.indexOf('@') === -1) {
            complete = false;
            message = "Please enter a valid email.";
        }

        if (!complete) {
            $field.addClass('incomplete');
            $field.focus();
            errors++;
        } else $field.removeClass('incomplete');
    });

    if (!errors) {
        sendMessage(function(response) {
            showMessage(response, 0);
        });
        $fields.val("");
    } else {
        console.log(errors);
        console.log('errors!');
        showMessage(message, errors);
    }
}

function hideMessage() {
    $('#contact-message').removeClass('show-message').removeClass('message-error');
    clearInterval(MESSAGE_TIMER);
    MESSAGE_TIMER = -1;
}

function sendMessage(callback) {
    console.log($('form'))
    $('form').submit();
}

function showMessage(message, errors) {
    $('#contact-message').removeClass('show-message').removeClass('message-error');
    $('#contact-message .message-content').text(message);
    $('#contact-message').addClass('show-message');
    if (errors) $('#contact-message').addClass('message-error');
    if (MESSAGE_TIMER === -1) 
        MESSAGE_TIMER = setTimeout(function() {
            hideMessage();
        }, message.length * 100);
}