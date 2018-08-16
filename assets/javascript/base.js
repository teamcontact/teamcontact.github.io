var PORTRAIT = window.innerHeight > window.innerWidth;

$(function() {
    if (PORTRAIT) $('#statement-section').addClass('check-top');

    $(window).scroll(function() {
        $('.fade-blurred').not('.fade-shown').each(function(index, elem) {
            var fromTop = $(elem).is('.check-top');
            var rect = elem.getBoundingClientRect();
            var topBound = window.pageYOffset + window.innerHeight + 130;

            if (((fromTop) ? rect.top : rect.bottom) + window.pageYOffset + 150 <= topBound) {
                setTimeout(function() {
                    $(elem).addClass('fade-shown');
                }, 100);
            }
        });
    });

    if ($('body').data('navpadding'))
        var bonus = $('body').data('bonuspadding') || 0;
        $('body').css('padding-top', $('nav').innerHeight() + bonus + 'px');

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