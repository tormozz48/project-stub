/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-thumbnail-wrapper', {

    onSetMod : {

        'js' : function() {
            
            var _this = this;

        	this.bindToDoc('mouseenter', function(e){
        		_this.setMod('visible', 'yes');
        	});

			this.bindToDoc('mouseleave', function(e){
        		_this.delMod('visible');
        	});        	
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
        this.bindTo('thumbnail', 'mouseenter', function(e) {
            _this.setMod(e.data.domElem, 'hovered', 'yes');
        });

        /*Убираем модификатор hovered когда уводим мышь с thumbnail-а*/
        this.bindTo('thumbnail', 'mouseleave', function(e) {
            _this.delMod(e.data.domElem, 'hovered');
        });
        
        /*Добавляем обработку прокрутки колеса мыши*/
        if (BEM.DOM.win[0].addEventListener){
             this.bindToWin('DOMMouseScroll', function(e) {
                _this._onScroll(e);
            });
        }

        // /*Добавляем обработку прокрутки колеса мыши*/
        // this.bindToWin('mousewheel', function(e) { 
        //     _this._onScroll(e);
        // });
        
        /*Добавляем обработку прокрутки колеса мыши*/
        this.bindToDoc('mousewheel', function(e) {
            _this._onScroll(e);
        });
            
    },

    /*
    *  Обрабатываем событие скроллирования колесом мыши
    *  и прокручиваем галерею миниатюр вперед или назад
    */
    _onScroll: function(e){
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
    }        

}, {

});

})();
