var PORTRAIT = window.innerHeight > window.innerWidth;

$(function() {
    if ($('body').data('navpadding'))
        $('body').css('padding-top', $('nav').innerHeight() + 20 + 'px');

    $('.nav-mobile').click(function() {
        var $bars = $(this);
        if ($bars.is('.clicked')) {
            $bars.removeClass('clicked');
            $('.nav-links').hide();
        } else {
            $bars.addClass('clicked');
            $('.nav-links').show();
        }
    });
});

function loadedFooter() {
    if (PORTRAIT) $('footer').css('margin-top', $('section.image-row').innerHeight() + 40);
    else $('footer').css('margin-top', '40px');
}