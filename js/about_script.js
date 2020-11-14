console.log("Script Load");

(function($) {
    $(document).ready(function() {
        console.log('jQuery Ready');

        $('img').attr('draggable', false);
    });
})(jQuery);

//선택한 글자에 따라 이미지가 나오는 함수
var castCrewEl = document.getElementById("workList"),
    ulEl = castCrewEl.querySelector(".workList"),

    divEls = ulEl.querySelectorAll("div"),
    divArrayEls = Array.prototype.slice.call(divEls),

    picListEls=document.getElementsByClassName("pic_list"),
    PicItemEls = Array.prototype.slice.call(picListEls),
    
    textListEls=document.getElementsByClassName("text_list"),
    textItemEls = Array.prototype.slice.call(textListEls);
    
    for(var i=0; i<divArrayEls.length; i++){
        divArrayEls[i].addEventListener("mouseover", onMouse);
        divArrayEls[i].addEventListener("mouseout", onMouse);
        PicItemEls[i].classList.add("hide"),
        textItemEls[i].classList.add("hide");
    }

    function onMouse(e){
        //마우스가 선택한 현재 이벤트 값
        var el=e.currentTarget,
        //선택한 text의 순서 
            index=divArrayEls.indexOf(el);
        //console.log(el);

        e.preventDefault();
        if(e.type==="mouseover"){
            PicItemEls[index].classList.remove("hide");
            PicItemEls[index].classList.add("show");
            textItemEls[index].classList.remove("hide");
            textItemEls[index].classList.add("show");
            //console.log("mouse over");
        }
        else if(e.type==="mouseout"){
            //console.log("mouse out");
            PicItemEls[index].classList.remove("show");
            PicItemEls[index].classList.add("hide");        
            textItemEls[index].classList.remove("show");
            textItemEls[index].classList.add("hide");        

        }
    }

