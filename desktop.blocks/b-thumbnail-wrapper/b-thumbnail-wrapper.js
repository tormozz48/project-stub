/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-thumbnail-wrapper', {

    onSetMod : {

        'js' : function() {
            
            var _this = this;

        	this
                .bindTo('mouseenter', function(e){
                    _this.setMod('visible', 'yes');
    	        })
                .bindTo('mouseleave', function(e){
                    _this.delMod('visible');
    	        })
                .bindToDoc('mousewheel', function(e) {
                    _this._onScroll(e);
                });

            /*Добавляем обработку прокрутки колеса мыши*/
            if (BEM.DOM.win[0].addEventListener){
                this.bindToWin('DOMMouseScroll', function(e) {
                    _this._onScroll(e);
                });
            }         	
        }
    },

    drawThumbnails: function(images, size) {
        var l = images.length;

        if(l > 0) {
            for( var i = 0; i < l; i++ ) {
                this.__self.append(this.domElem, BEMHTML.apply({
                        block: 'b-thumbnail-wrapper',
                        elem: 'thumbnail',
                        attrs: {
                            src: images[i].getBySize(size).href,
                            title: images[i].params.title,
                            alt: images[i].params.title,
                            data_id: images[i].params.id,
                            index: i
                        }
                }));        
            }
        }

        var _this = this;

        /*Устанавливаем модификатор hovered при наведении мыши на thumbnail*/
        /*Убираем модификатор hovered когда уводим мышь с thumbnail-а*/
        /*Добавляем обработку клика на миниатюре изображения*/
        this
            .bindTo('thumbnail', 'mouseenter', function(e) {
                _this.setMod(e.data.domElem, 'hovered', 'yes');
            })
            .bindTo('thumbnail', 'mouseleave', function(e) {
                _this.delMod(e.data.domElem, 'hovered');
            })
            .bindTo('thumbnail', 'click', function(e) {
                this._onThumbnailClick(e);
            });    
    },

    /*
    *  Обрабатываем событие скроллирования колесом мыши
    *  и прокручиваем галерею миниатюр вперед или назад
    */
    _onScroll: function(e) {
        var delta = 0;

        e = e.originalEvent || window.event;
                
        if(e.wheelDelta) { 
            delta = e.wheelDelta/120;
        }else if (e.detail) {
            delta = -e.detail/3;
        }
        
        delta && this.domElem.scrollTo(delta > 0 ? '+=50px' : '-=50px', 30);

        e.preventDefault && e.preventDefault();
        
        e.returnValue = false;
    },

    /*
    * Обработчик события на клик по миниатюре
    */
    _onThumbnailClick: function(e) {

        var thumbnail = e.data.domElem;

        /* получаем index и data_id как аттрибуты миниатюры */
        var index = thumbnail.attr('index');
        var data_id = thumbnail.attr('data_id');       

        /* вычисляем позицию для скроллинга и прокручиваем контейнер с миниатюрами */
        var pos = index * thumbnail.outerWidth(true) - BEM.DOM.getWindowSize().width/2;
        this.domElem.scrollTo(pos > 0 ? pos + 'px' : 0, 300);

        /* удаляем модификатор active с предыдущей активной миниатюры 
            и выставляем на ту по которой было произведено нажатие*/
        this
            .delMod(this.elem('thumbnail', 'active', 'yes'), 'active')
            .setMod(thumbnail, 'active', 'yes');

        /* триггерим BEM событие eventThumbnailClick */
        this.trigger('eventThumbnailClick', { index: index, id: data_id });
    }

}, {
    //TODO nothing
});

})();
