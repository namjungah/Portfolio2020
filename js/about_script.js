
(function($) {
    $(document).ready(function() {
        console.log('jQuery Ready');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 5) {
            $(".scroll-btn").stop().animate({
                opacity: 0
            }, 500);
        } else {
            $(".scroll-btn").stop().animate({
                opacity: 1
            }, 500);
        }
    })

    $.fn.writeText = function(content) {
		var contentArray = content.split(""),
			current = 0,
			elem = this;
		setInterval(function() {
			if(current < contentArray.length) {
				elem.text(elem.text() + contentArray[current++]);
			}
		}, 150);
    };
    
	$("#holder").writeText("안녕하세요"); 

    });
})(jQuery);