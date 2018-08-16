CURRENT_LOCATION = 3;

$(function() {
    $('.timeline-items li').each(function(index, elem) {
        if (index < CURRENT_LOCATION) $(elem).addClass('timeline-complete');
    });

    $('.timeline-items li').eq(CURRENT_LOCATION).addClass('timeline-current');
});