/** @requires BEM */
/** @requires BEM.DOM */
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
        var _this = this;

        var images = this._getDataSource().getImages(),
            l = images.length;

        if(l > 0) {
            var img = null;

            for( var i = 0; i < l; i++ ) {
                img = images[i];
                this.__self.append(this._thumbnails, BEMHTML.apply({
                        block: 'b-gallery',
                        elem: 'thumbnail',
                        attrs: {
                            id: img.params.id,
                            src: img.getBySize(this.params.thumbnailSize).href,
                            title: img.params.title,
                            alt: img.params.title,
                            index: i
                        }
                }));
            }
        }

        this.findElem('thumbnail').load(function() {
            _this.setMod($(this), 'loaded', 'yes');
        });

        /*Добавляем обработку клика на миниатюре изображения*/
        return this.bindTo('thumbnail', 'click', function(e) {
            _this._onThumbnailClick(e);
        });
    },

    /*
    * Обработчик события на клик по миниатюре
    */
    _onThumbnailClick: function(e) {

        var thumbnail = e.data.domElem,
            index = thumbnail.attr('index');

        this.switchThumbnail(index, thumbnail);

        /* триггерим BEM событие eventThumbnailClick */
        this.trigger('eventThumbnailClick', { index: index });
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

        var scrl = this._thumbnails.scrollLeft();

        delta && this._thumbnails.scrollLeft(delta > 0 ? scrl + 50 : scrl - 50);

        e.preventDefault && e.preventDefault();

        e.returnValue = false;
    },

    /**
     * Метод для переключения миниатюры слайда
     * @param  {Number} index индекс миниатюры в коллекции
     * @param  {jQuery} [thumbnail] объект миниатюры (необязательный параметр)
     * @return {Object} экземпляр класса b-gallery
     */
    switchThumbnail: function(index, thumbnail) {

        var thumbnail = thumbnail || $(this.elem('thumbnail')[index]);

        /* вычисляем позицию для скроллинга и прокручиваем контейнер с миниатюрами */
        var pos = index * thumbnail.outerWidth(true) - BEM.DOM.getWindowSize().width/2;

        this._thumbnails.scrollLeft(pos > 0 ? pos : 0);

        /* удаляем модификатор active с предыдущей активной миниатюры
            и выставляем на ту по которой было произведено нажатие*/
        return this
            .delMod(this.elem('thumbnail', 'active', 'yes'), 'active')
            .setMod(thumbnail, 'active', 'yes');
    }

});