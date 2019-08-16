(function( $ ) {
    'use strict'; 
    $.fn.suSlider = function( options ) {

        return this.each(function() {
            var i,
                suSlider,
                suSlider_ul,
                leftBtn,
                rightBtn,
                suDotMenu,
                suDotMenu_li,
                currentImgIndex = 0,
                pseudoIndex,
                imgInterval = 2200,
                intervalId,
                cloneFirst,
                cloneLast,
                imgCount,
                unitWidth,
                suSliderWidth = 1024,
                suSliderHeight = 768
                ;

            var slideRollTo = function( targetIndex ) {
                var targetLeft = 0;
                targetIndex = (targetIndex + imgCount) % imgCount;

                if(currentImgIndex===0 && targetIndex===imgCount-1) {
                    targetLeft = 0;
                } else if(currentImgIndex===imgCount-1 && targetIndex===0) {
                    targetLeft = -(imgCount + 1) * unitWidth;
                } else {
                    targetLeft = -(targetIndex + 1) * unitWidth;;
                }
                currentImgIndex = targetIndex;

                suSlider_ul.stop().animate({
                    left: targetLeft
                }, 500, function() {
                    suSlider_ul.css({
                        left: -(currentImgIndex + 1) * unitWidth
                    });
                });

                suDotMenu_li.eq(currentImgIndex).addClass('active').siblings('li').removeClass('active');
            };

            var autoShowNextImg = function () {
                slideRollTo( currentImgIndex+1 );
            };

            suSlider = $(this);
            suSlider.addClass('suSlider');

            if(options) {
                suSliderWidth = options.width || suSliderWidth;
                suSliderHeight = options.height || suSliderHeight;
                imgInterval = options.interval || imgInterval;
            }
            suSlider.css({width: suSliderWidth, height: suSliderHeight});

            suSlider_ul = $('ul', suSlider);
            imgCount = $('li', suSlider_ul).length,
            unitWidth = suSliderWidth;

            leftBtn = $('<a class="suArrowBtn" href="javascript:;"><i>&lt;</i></a>');
            rightBtn = $('<a class="suArrowBtn" href="javascript:;"><i>&gt;</i></a>');
            suSlider.prepend(rightBtn).prepend(leftBtn);

            cloneFirst = $('li', suSlider_ul).first().clone();
            cloneLast = $('li', suSlider_ul).last().clone();
            suSlider_ul.append( cloneFirst );
            suSlider_ul.prepend( cloneLast );

            suSlider_ul.css({
                width: (imgCount + 2) * unitWidth,
                left: -unitWidth
            });

            suDotMenu = $('<ol class="suDotMenu"/>');
            for(i=0; i<imgCount; i++) {
                suDotMenu.append('<li/>');
            }
            // suSlider.append( suDotMenu );

            suDotMenu_li = $('li', suDotMenu);
            suDotMenu_li.eq(currentImgIndex).addClass('active');

            suDotMenu_li.click(function() {
                slideRollTo( $(this).index() );
            });

            leftBtn.click(function() {
                slideRollTo( currentImgIndex-1 );
            });

            rightBtn.click(function() {
                slideRollTo( currentImgIndex+1 );
            });

            // suSlider.hover(
            //     function() {
            //         clearInterval(intervalId);
            //     }, function() {
            //         intervalId = setInterval(autoShowNextImg, imgInterval);
            //     }
            // );

            // intervalId = setInterval(autoShowNextImg, imgInterval);
        });
    };
}( jQuery ));