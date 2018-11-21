var CURR_IMAGE = 0;
var IMAGES = [
    "contact.jpg",
    "20181006_161743.jpg",
    "20181006_162309.jpg",
    "20181006_162450.jpg"
];
var TEAM = [{
    avatar: 'aaron.jpg',
    name: 'Aaron Green',
    title: 'Team Member',
    email: 'agreen19@umd.edu'
}, {
    avatar: 'dylan.jpg',
    name: 'Dylan Langone',
    title: 'Team Member',
    email: 'dlangone@umd.edu'
}, {
    avatar: 'eliana.jpg',
    name: 'Eliana Krakovsky',
    title: 'Team Member',
    email: 'ekrakovs@umd.edu'
}, {
    avatar: 'hongyi.jpg',
    name: 'Hongyi Wu',
    title: 'Team Member',
    email: 'hwu1@umd.edu'
}, {
    avatar: 'james.jpg',
    name: 'James Muessig',
    title: 'Team Member',
    email: 'jmuessig@umd.edu'
}, {
    avatar: 'jon.jpg',
    name: 'Jonathan Lin',
    title: 'Team Member',
    email: 'jlin1212@terpmail.umd.edu'
}, {
    avatar: 'kun.jpg',
    name: 'Kun Do',
    title: 'Team Member',
    email: 'kdo520@terpmail.umd.edu'
}, {
    avatar: 'lauren.jpg',
    name: 'Lauren Cho',
    title: 'Team Member',
    email: 'lcho418@umd.edu'
}, {
    avatar: 'moshe.jpg',
    name: 'Moshe Ackman',
    title: 'Team Member',
    email: 'mackman@umd.edu'
}, {
    avatar: 'ross.jpg',
    name: 'Ross Locraft',
    title: 'Team Member',
    email: 'rlocraft@terpmail.umd.edu'
}, {
    avatar: 'sam.jpg',
    name: 'Sam Klueter',
    title: 'Team Member',
    email: 'sklueter@umd.edu'
}, {
    avatar: 'scarcelli.png',
    name: 'Giuliano Scarcelli',
    title: 'Team Mentor',
    email: 'scarc@umd.edu'
}, {
    avatar: 'rachel.jpg',
    name: 'Rachel Gammons',
    title: 'Team Librarian',
    email: 'rgammons@umd.edu'
}, {
    avatar: (Math.random() >= 0.5) ? 'sean.jpg' : 'sean2.png',
    name: 'Sean Winters',
    title: 'Team Member',
    email: 'swinter2@umd.edu'
}];

$(function() {
    $('.carousel-left').hide();
    $('#image-carousel')
        .css('height', window.innerHeight - $('nav').innerHeight() + 'px');

    for (var i = 0; i < IMAGES.length; i++) {
        var $thumb = $('<img src="/assets/images/album/' + IMAGES[i] + '" class="carousel-thumb" />');
        $('.size-fix').append($thumb);
    }

    updateCurrent(0);

    $('#carousel-current').click(function() {
        $('#large-background, #image-enlarged').fadeIn();
    });

    $('.carousel-left').click(function() {
        shiftCurrent(-1)
    });

    $('.carousel-right').click(function() {
        shiftCurrent(1);
    });

    $('.carousel-thumb').click(function() {
        updateCurrent($(this).index());
    });

    showTeam();

    $('#large-background, #image-enlarged').click(function() {
        closeLarge();
    });

    $(document).keydown(function(evt) {
        if (evt.key == "Escape" || evt.key == "Backspace") closeLarge();
    });
});

function closeLarge() {
    if ($('#large-background').is(':visible')) {
        $('#large-background').fadeOut();
        $('#image-enlarged').fadeOut();
    }
}

function shiftCurrent(offset) {
    CURR_IMAGE += offset;
    if (CURR_IMAGE < 0) CURR_IMAGE = 0;
    else if (CURR_IMAGE >= IMAGES.length) CURR_IMAGE = IMAGES.length - 1;
    updateCurrent(CURR_IMAGE);
}

function updateCurrent(index) {
    CURR_IMAGE = index;

    if (index == 0) {
        $('.carousel-left').fadeOut(300);
    } else {
        $('.carousel-left').fadeIn(300);
    }

    if (index == IMAGES.length - 1) {
        $('.carousel-right').fadeOut(300);
    } else {
        $('.carousel-right').fadeIn(300);
    }

    var newSrc = '/assets/images/album/' + IMAGES[CURR_IMAGE];

    $('#image-enlarged').attr('src', newSrc);
    $('#carousel-current').attr('src', newSrc);
    $('.carousel-thumb').removeClass('current-thumb');
    $($('.carousel-thumb').get(CURR_IMAGE)).addClass('current-thumb');

    $('.size-fix').scrollTo($('.carousel-thumb').get(CURR_IMAGE), 400, { axis: 'x', offset: -10 });
}

function showTeam() {
    for (var i = 0; i < TEAM.length; i++) {
        var member = TEAM[i];

        var $card = $('<div class="member-card">');
        $card.append('<img class="member-avatar" src="/assets/images/team/' + member['avatar'] + '" />');
        $card.append('<span class="member-name">' + member['name'] + '</span>');
        $card.append('<span class="member-title">' + member['title'] + '</span>');
        $card.append('<a href="mailto:' + member['email'] + '" class="member-contact">' + member['email'] + '</a>');

        $('#team-container').append($card);
    }
}