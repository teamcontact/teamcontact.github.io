var MESSAGE_TIMER = -1;

$(function() {
    $('#contact-send').click(verifyFields);
    $('#message-close').click(hideMessage);
});

function verifyFields(event) {
    var $fields = $('input, textarea');
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
            errors++;
        } else $field.removeClass('incomplete');
    });

    if (!errors) {
        console.log('Okay whatever logic we use for sending is here');
        sendMessage(function(response) {
            message = response;
        });
        $fields.val("");
    }

    showMessage(message, errors);
}

function hideMessage() {
    $('#contact-message').removeClass('show-message').removeClass('message-error');
    clearInterval(MESSAGE_TIMER);
    MESSAGE_TIMER = -1;
}

function sendMessage(callback) {
    Email.send(
        "messages-noreply@teamcontact.github.io",
        "teamcontact2021@gmail.com",
        "This is a subject",
        "<h1>this is the body</h2>",
        {
            token: "6a6edac0-d069-4ef7-b305-31267021cf45",
            done: function(response) {
                callback(response);
            }
        }
    );
}

function showMessage(message, errors) {
    $('#contact-message .message-content').text(message);
    $('#contact-message').addClass('show-message');
    if (errors) $('#contact-message').addClass('message-error');
    if (MESSAGE_TIMER === -1) 
        MESSAGE_TIMER = setTimeout(function() {
            hideMessage();
        }, message.length * 300);
}