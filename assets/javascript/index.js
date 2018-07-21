var ARM_SPEED = 1000;
var ARM_DELAY = 4000;

$(function() {
    $('body').css('padding-top', $('nav')[0].clientHeight + 'px');

    var armGroup = Snap.select('#print-group');
    var wires = [Snap.select('#red-wire'), Snap.select('#yellow-wire')];
    var printHead = Snap.select('#print-head');
    var wheel = Snap.select('#circle-group');

    animate();
});

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

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
}