var ARM_SPEED = 1000;
var ARM_DELAY = 4000;
var FALLBACK_PHOTO;
var MOBILE;

$(function() {
    $(window).on('orientationchange', rerender);
    render();
});

function rerender() {
    render();
    loadedFooter();
}

function constants() {
    FALLBACK_PHOTO = (!PORTRAIT) ? 
    {
        name: 'Bud Helisson',
        profile: 'https://unsplash.com/@budhelisson',
        url: '/assets/images/glasses.jpg',
        username: 'budhelisson'
    } :
    {
        name: 'Saketh Garuda',
        profile: 'https://unsplash.com/@sakethgaruda',
        url: '/assets/images/glasses_portrait.jpg',
        username: 'sakethgaruda'
    };
    MOBILE = /Mobi/.test(navigator.userAgent);
}

function render() {
    constants();

    $('canvas').hide();
    $(document.body).css('padding-top', window.innerHeight + 'px');

    var $focus = $('#landing-focus');
    $focus.hide();
    var $landing = $('#landing-background').add($('#fallback-background')).add($('#landing'));
    $landing.attr('width', window.innerWidth);
    $landing.attr('height', window.innerHeight);

    var fallback = new Image();
    fallback.src = FALLBACK_PHOTO.url;
    fallback.onload = function() {
        drawAndBlurImage('fallback-background', fallback, FALLBACK_PHOTO);
        setTimeout(function() {
            drawRandomBg();
        }, 2000);
    };

    var focusHeight = window.innerHeight / 1.5;
    var focusLeft = (window.innerWidth - focusHeight) / 2;
    var focusTop = (window.innerHeight - focusHeight + $('nav')[0].clientHeight) / 2;
    $focus
        .css('height', focusHeight + 'px')
        .css('width', focusHeight + 'px')
        .css('background-size', window.innerWidth + 'px auto')
        .css('background-position', '-' + focusLeft + 'px -' + focusTop + 'px')
        .css('left', focusLeft)
        .css('top', focusTop);

    $('.small-title').css('font-size', 0.0408163265 * focusHeight + 'px');
    $('.big-title').css('font-size', 0.142857143 * focusHeight + 'px');
    $('.contact-blurb').css('font-size', 0.037414949 * focusHeight + 'px');
}

function drawAndBlurImage(canvas, image, photoData, tile) {
    var $focus = $('#landing-focus');
    var imgWidth = window.innerWidth;
    var imgHeight = image.height * window.innerWidth / image.width;
    var iterX = 1;
    var iterY = 1;

    if (tile) {
        imgWidth = image.width;
        imgHeight = image.height;
        iterX = Math.floor(window.innerWidth / imgWidth);
        iterY = Math.floor(window.innerHeight / imgHeight);
    }
    
    var ctx = document.getElementById(canvas).getContext('2d');
    
    for (var i = 0; i < iterX; i++) {
        for (var j = 0; j < iterY; j++) {
            ctx.drawImage(image, imgWidth * i, imgHeight * j, imgWidth, imgHeight);
        }
    }

    boxBlurCanvasRGB(canvas, 0, 0, window.innerWidth, window.innerHeight, (MOBILE) ? 1 : 5, 1);
    
    if (photoData === undefined) return;
    $focus.css('background-image', 'url(' + photoData.url + ')');
    $('#' + canvas).fadeIn(1000);
    $focus.fadeIn(1000);
    $('#photo-author').text(photoData.name);
    $('#photo-user').html("<a href='" + photoData.profile + "' target='_blank'>" + '@' + photoData.username + '</a>');
}

function drawRandomBg() {
    getBackgroundPhoto(function(photo) {
        var image = new Image();
        image.crossOrigin = "Anonymous";
        image.src = photo.url;

        image.onload = function() {
            if (image.height && image.width) {
                $('#landing-focus').fadeOut(200);
                drawAndBlurImage('landing-background', image, photo);
            }
        };
    });
}

function parseRelativeString(delta) {
    return ((delta >= 0) ? '+' : '') + delta.toString();
}

function getElementTransform(elem) {
    var transforms = elem.attr('transform').string.split(',');
    return {
        x: parseFloat(transforms[0].replace(/[^0-9.]/g, '') || 0),
        y: parseFloat(transforms[1] || 0)
    };
}

function getBackgroundPhoto(callback) {
    var existingPhotos = Cookies.get('background-29');
    var orientation = Cookies.get('portrait');

    console.log(orientation);

    if (existingPhotos === undefined || orientation !== PORTRAIT.toString()) {
        console.log('no cached photos, using ajax.');
        $.ajax({
            cache: false,
            data: {
                count: 30,
                orientation: (PORTRAIT) ? 'portrait' : 'landscape',
                query: 'color lens'
            },
            headers: {
                'Authorization': 'Client-ID 96c93293756f65c68a9219b16745f85bdf7cc274bee506764e6afdfeb3233944'
            },
            error: function() {
                callback(FALLBACK_PHOTO);
            },
            method: 'GET',
            success: function(data) {
                var photos = [];
                for (var i = 0; i < data.length; i++) {
                    let photo = {
                        name: data[i].user['name'],
                        profile: data[i].user['links']['html'],
                        url: (MOBILE) ? data[i].urls['regular'] : data[i].urls['full'],
                        username: data[i].user['username']
                    };

                    photos.push(photo);
                    Cookies.set('background-' + i, JSON.stringify(photo), { expires: 1 / 24 });
                    Cookies.set('portrait', PORTRAIT.toString(), { expires: 1 / 24 });
                }

                callback(photos[Math.floor(Math.random() * 30)]);
            },
            url: 'https://api.unsplash.com/photos/random'
        });
    } else {
        console.log('fetching bg from cache');
        var photo = JSON.parse(Cookies.get('background-' + Math.floor(Math.random() * 30)));
        callback(photo);
    }
}

function _refreshBackgrounds() {
    for (var cookie in Cookies.get()) {
        Cookies.remove(cookie);
    }
}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
}