var CURR_IMAGE = 0;
var IMAGES = [
    "contact.jpg",
    "contact.jpg",
    "contact.jpg"
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
    avatar: 'sean.jpg',
    name: 'Sean Winters',
    title: 'Team Member',
    email: 'swinter2@umd.edu'
}];

$(function() {
    $('.landing-background')
        .css('height', window.innerHeight - $('nav').innerHeight() + 'px');

    showTeam();
});

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