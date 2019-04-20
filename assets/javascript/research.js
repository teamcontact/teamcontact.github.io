CURRENT_LOCATION = 9;

ARTICLES = [{
    type: 'pdf',
    title: 'Team CONTACT - Project Sheet',
    authors: ['Lauren Cho', 'Varun Iyer', 'Sean Winters'],
    source: 'Gemstone Honors Program',
    univ: 'University of Maryland',
    date: '26 February 2018',
    link: '/assets/pdfs/Team-CONTACT.pdf'
}, {
    type: 'journal',
    title: 'Three-dimensional printing of transparent fused silica glass',
    authors: ["Frederik Kotz", "Karl Arnold", "Werner Bauer", "Dieter Schild", "Nico Keller", "Kai Sachsenheimer", "Tobias M. Nargang", "Christiane Richter", "Dorothea Helmer", "Bastian E. Rapp"],
    source: 'Nature International Journal of Science',
    univ: 'Karlsruhe Institute of Technology',
    date: '20 April 2017',
    link: 'https://www.nature.com/articles/nature22061'
}, {
    type: 'pdf',
    title: 'The Sensimed Triggerfish contact lens sensor: efficacy, safety, and patient perspectives',
    authors: ['Grace E Dunbar', 'Bailey Yuguan Shen', 'Ahmad A Aref'],
    source: 'Clinical Ophthalmology, Dove Press',
    univ: 'Illinois Eye and Ear Infirmary, Department of Ophthalmology and Visual Sciences, University of Illinois at Chicago, Chicago, IL, USA',
    date: '8 May 2017',
    link: '/assets/pdfs/opth-11-875.pdf'
}, {
    type: 'journal',
    title: '3D Printing: High-Speed 3D Printing of Millimeter-Size Customized Aspheric Imaging Lenses with Sub 7 nm Surface Roughness',
    authors: ['Chen, Xiangfan', 'Liu, Wenzhong', 'Dong, Biqin', 'Lee, Jongwoo', 'Ware, Henry Oliver T.', 'Zhang, Hao F.', 'Sun, Cheng'],
    source: 'Advanced Materials',
    univ: 'Northwestern University',
    date: '2 May 2018',
    link: 'https://onlinelibrary.wiley.com/doi/abs/10.1002/adma.201870123'
}, {
    type: 'link',
    title: 'Laser curing of contact lens',
    authors: ['Vincent McBrierty', 'John Magan', 'Werner Blau'],
    source: 'US Patent / Grant',
    univ: 'Bausch and Lomb Inc.',
    date: '13 October 1992',
    link: 'https://patents.google.com/patent/US5154861A/en'
}, {
    type: 'journal',
    title: 'Printed Optics: 3D Printing of Embedded Optical Elements for Interactive Devices',
    authors: ['Willis, Karl', 'Brockmeyer, Eric', 'Hudson, Scott', 'Poupyrev, Ivan'],
    source: 'ACM Press',
    univ: 'Disney Research Pittsburgh & Carnegie Mellon University',
    date: '7 October 2012',
    link: 'https://dl.acm.org/citation.cfm?id=2380190'
}];

$(function() {
    $('#subteams-link').click(function() {
        window.scrollTo({
            behavior: 'smooth',
            top: document.getElementById('subteams-container').offsetTop - 80,
            left: 0
        });
    });

    $('.timeline-items li').each(function(index, elem) {
        if (index < CURRENT_LOCATION) $(elem).addClass('timeline-complete');
    });

    $('.timeline-items li').eq(CURRENT_LOCATION).addClass('timeline-current');

    for (var i = 0; i < ARTICLES.length; i++) {
        var article = ARTICLES[i];

        var $item = $('<div class="research-item"></div>');
        $item.addClass('research-' + article.type);
        $item.append('<a class="research-title" href="' + article.link + '">' + article.title + '</a>');
        
        var $authors = $('<ul class="research-authors"></ul>');
        for (var j = 0; j < article.authors.length; j++) {
            $authors.append('<li>' + article.authors[j] + '</li>');
        }
        $item.append($authors);

        $item.append('<div class="research-source">' + article.source + '</div>');
        if (article.univ) $item.append('<div class="research-univ">' + article.univ + '</div>');
        $item.append('<div class="research-date">' + article.date + '</div>');

        $item.click(function(event) {
            if ($(event.target).hasClass('research-title')) window.location.href = article.link;
        });

        $('#research-container').append($item);
    }

        PANE_WIDTH = document.documentElement.clientWidth / 4;
        FULL_HEIGHT = document.documentElement.clientHeight - $('nav')[0].clientHeight;
        
        $('.subteam-row').height(FULL_HEIGHT);
        if (!PORTRAIT) $('.subteam-row').width(PANE_WIDTH);
        else $('.subteam-row').css('min-height', 5 * ($('.subteam-title')[0].clientHeight + $('.subteam-blurb')[0].clientHeight) + 25 + 'px');
});