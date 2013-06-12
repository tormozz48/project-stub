/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-gallery', {

    onSetMod : {

        'js' : function() {
            
            this.__base.apply(this, arguments);

            var _this = this;

            this._thumbnails = this.elem('thumbnails');

            this
                .bindTo('mouseenter', function(e){
                    _this._showThumbnails();    
                })
                .bindTo('mouseleave', function(e){
                    _this._hideThumbnails();
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

    /**
     * Метод для создания миниатюр, добавления их в контейнер
     * и подписки на события наведения 
     * и отведения курсора мыши и нажатия
     * @param  {Array} images - коллекция данных об изображениях
     * @param  {String} size - размер для миниатюры изобажения
     */
    _drawThumbnails: function() {
        var images = this._getDataSource().getImages(); 
        var l = images.length;

        if(l > 0) {
            var img = null;

            for( var i = 0; i < l; i++ ) {
                img = images[i];
                this.__self.append(this._thumbnails, BEMHTML.apply({
                        block: 'b-gallery',
                        elem: 'thumbnail',
                        attrs: {
                            src: img.getBySize(this.params.thumbnail_size).href,
                            title: img.params.title,
                            alt: img.params.title,
                            data_id: img.params.id,
                            index: i
                        }
                }));        
            }
        }

        var _this = this;

        this.findElem('thumbnail').load(function() {
            _this.setMod($(this), 'loaded', 'yes');
        });

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
    * Обработчик события на клик по миниатюре
    */
    _onThumbnailClick: function(e) {

        var thumbnail = e.data.domElem;

        /* получаем index и data_id как аттрибуты миниатюры */
        var index = thumbnail.attr('index');
        var data_id = thumbnail.attr('data_id');       

        /* вычисляем позицию для скроллинга и прокручиваем контейнер с миниатюрами */
        var pos = index * thumbnail.outerWidth(true) - BEM.DOM.getWindowSize().width/2;
        this._thumbnails.scrollTo(pos > 0 ? pos + 'px' : 0, 300);

        /* удаляем модификатор active с предыдущей активной миниатюры 
            и выставляем на ту по которой было произведено нажатие*/
        this
            .delMod(this.elem('thumbnail', 'active', 'yes'), 'active')
            .setMod(thumbnail, 'active', 'yes');

        /* триггерим BEM событие eventThumbnailClick */
        this.trigger('eventThumbnailClick', { index: index, id: data_id });
    },

    /**
     * Показываем контейнер с миниатюрами
     * @return {Object}  экземпляр блока b-gallery
     */
    _showThumbnails: function() {
        return this.setMod(this._thumbnails, 'visible', 'yes');
    },

    /**
     * Прячем контейнер с миниатюрами
     * @return {Object}  экземпляр блока b-gallery
     */
    _hideThumbnails:  function() {
        return this.delMod(this._thumbnails, 'visible');
    },

    /**
     * Обрабатываем событие скроллирования колесом мыши
     * и прокручиваем галерею миниатюр вперед или назад
     * @param  {Object} e объект события
     */
    _onScroll: function(e) {
        var delta = 0;

        e = e.originalEvent || window.event;
                
        if(e.wheelDelta) { 
            delta = e.wheelDelta/120;
        }else if (e.detail) {
            delta = -e.detail/3;
        }
        
        delta && this._thumbnails.scrollTo(delta > 0 ? '+=50px' : '-=50px', 30);

        e.preventDefault && e.preventDefault();
        
        e.returnValue = false;
    }

}, {
	//TODO nothing
});

})();
