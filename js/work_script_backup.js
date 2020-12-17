console.log("Script Load");

(function($) {
    $(document).ready(function() {
        console.log('jQuery Ready');

        $('img').attr('draggable', false);

        $.ajax({
            url:"../data/list.json",
            dataType : 'json',
            success:listSuccess,
            error:listError
        });
        
        var current = "arrival"

        function listSuccess(result){

            var items = result[current],
                textTemplate = '',
                scrollTemplate = ''

            $.each(items, function(index, item){
                var title = item['title'],
                    subTitle = item['sub-title'],
                    period = item['period'],
                    workpart = item['workpart'],
                    content = item['content'],
                    hashtag = item['hashtag'],
                    img = item['img'];
                
                    textTemplate += "<h1>"+title+"</h1>";
                    textTemplate += "<h2>"+subTitle+"</h2>";
                    textTemplate += '<div class="work_text_container">';
                    textTemplate +=     '<ul>';

                    textTemplate +=         '<li>';
                    textTemplate +=             '<span>제작기간</span>';
                    textTemplate +=             '<p>'+ period +'</p>';
                    textTemplate +=         '</li>';

                    textTemplate +=         '<li>';
                    textTemplate +=             '<span>작업파트</span>';
                    textTemplate +=             '<p>'+ workpart +'</p>';
                    textTemplate +=         '</li>';
                    
                    textTemplate +=         '<li>';
                    textTemplate +=             '<span>프로젝트 내용</span>';
                    textTemplate +=             '<p>'+ content +'</p>';
                    textTemplate +=         '</li>';

                    textTemplate +=     '</ul>';
                    textTemplate += '</div>';
                    
                    textTemplate += '<div id="hashtag">';
                    textTemplate +=     '<ul>';
                    textTemplate +=         '<p>'+ hashtag +'</p>';
                    textTemplate +=     '</ul>';
                    textTemplate += '</div>';


                    scrollTemplate +=     '<ul>';
                    for(var i=0; i < img.length; i++){
                        scrollTemplate +=         '<li><img src="'+img[i]+'"/></li>';
                    }
                    scrollTemplate +=     '</ul>';

            });
            $('.work_text').html(textTemplate);
            $('.work_scroll').html(scrollTemplate);
                    
            $('.work_nav ul li').click(function(){
                console.log($(this).index());
                var currentIndex = $(this).index();

                if(currentIndex === 0){
                    $('.work_text').empty().html(textTemplate);
                    $('.work_scroll').empty().html(scrollTemplate);
                }
            });
        }
        function listError(error){
            console.log(error);
        }
    });
})(jQuery);
