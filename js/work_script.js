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

        function listSuccess(result){
        var idx = 0;
        var items = result.list[idx];
        detailHtml();

            $('.work_nav ul li').click(function(){
                idx = $('.work_nav ul li').index(this);
                console.log(idx);
                items = result.list[idx];
                detailHtml();

                if(idx === 0){
                    $('.work_scroll').css({
                        'background-color':'#323232'
                    });
                }else if(idx ===1){
                    $('.work_scroll').css({
                        'background-color':'#ffe699'
                    });
                }else if(idx===2){
                    $('.work_scroll').css({
                        'background-color':'#4f6aff'
                    });
                }else if(idx===3){
                    $('.work_scroll').css({
                        'background-color':'#e1bec3'
                    });
                }else if(idx ===4){
                    $('.work_scroll').css({
                        'background-color':'#ffe699'
                    });
                }else if(idx ===5){
                    $('.work_scroll').css({
                        'background-color':'#562832'
                    });
                }else if(idx ===6){
                    $('.work_scroll').css({
                        'background-color':'#d3d8dc'
                    });
                }else if(idx ===7){
                    $('.work_scroll').css({
                        'background-color':'#aa8fc2'
                    });
                }

            });


            function detailHtml() {
                
                textTemplate = '',
                scrollTemplate = '',
                title = items['title'],
                subTitle = items['sub-title'],
                period = items['period'],
                workpart = items['workpart'],
                content = items['content'],
                hashtag = items['hashtag'],
                img = items['img'];

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

                $('.work_text').html(textTemplate);
                $('.work_scroll').html(scrollTemplate);
                }

        }
        function listError(error){
            console.log(error);
        }

        
    });
})(jQuery);
