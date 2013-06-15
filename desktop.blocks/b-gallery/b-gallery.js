/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-gallery', {
	
    onSetMod : {

        'js' : function() {
            this._parseConfig();

         	this._dataSource = BEM.create('d-source', this.params.data_source);	
            
            this._arrowBack = this.elem('arrow', 'direction','back');
            this._arrowForward = this.elem('arrow', 'direction', 'forward');
            this._loader = this.findBlockInside('b-loader');

            //Подписываем блок dataSource на событие eventDataLoaded окончания загрузки данных
        	this._getDataSource().on('eventDataLoaded', function(){
        		this._drawThumbnails();
                this._switchToImageWithIndex(this._getDataSource().loadIndex());
        	}, this);

            this
                ._bindEventsToArrows()
                ._loader.show();                   
        }
    },

    /**
     * Подписываем элементы arrow на события
     * @return {Object} экземпляр класса b-gallery
     */
    _bindEventsToArrows: function(){
        var _this = this;    

        //когда курсор мыши входит в область окна браузера показываем навигационные стрелки
        //когда курсор мыши уходит из области окна браузера скрываем навигационные стрелки
        //Подписываем элемент стрелки возврата на предыдущее изображение на событие click
        //Подписываем элемент стрелки перехода на следующее изображение на событие click
        return this
            .bindToDoc('mouseenter', function() {
                _this.setMod(_this._arrowBack, 'visible', 'yes');
                _this.setMod(_this._arrowForward, 'visible', 'yes');
            })
            .bindToDoc('mouseleave', function() {
                _this.delMod(_this._arrowBack, 'visible');
                _this.delMod(_this._arrowForward, 'visible');
            })
            .bindTo(this._arrowBack, 'click', function() {
                _this._switchToPreviousImage();
            })
            .bindTo(this._arrowForward, 'click', function() {
                _this._switchToNextImage();
            });
    },

    /**
     * Метод для парсинга конфигурации и выставления дефолтных параметров
     * в случае отсутствия переданных конфигурационных параметров
     * @return {Object} экземпляр блока b-gallery
     */
    _parseConfig: function() {
        
        // берем размер для миниатюры из конфига или устанавливаем по умолчанию 
        this.params.thumbnail_size = this.params.thumbnail_size || this.__self.DEFAULT_THUMBNAIL_SIZE;
        
        // берем размер для полного изображения из конфига или устанавливаем по умолчанию
        this.params.image_size = this.params.image_size || this.__self.DEFAULT_IMAGE_SIZE;
        
        // берем время для анимации переключения или устанавливаем по умолчанию
        this.params.switch_duration = this.params.switch_duration || this.__self.DEFAULT_SWITCH_DURATION;

        return this;
    },

    /**
     * Метод для переключения на предыдущее изображение
     * @return {Object} экземпляр блока b-gallery
     */
    _switchToPreviousImage: function() {

        this._getDataSource().isFirst() || 
            this._switchToImageWithIndex(this._getDataSource().getCurrentIndex() - 1);

        return this;
    },

    /**
     * Метод для переключения на следующее изображение
     * @return {Object} экземпляр блока b-gallery
     */
    _switchToNextImage: function() {

        this._getDataSource().isLast() || 
            this._switchToImageWithIndex(this._getDataSource().getCurrentIndex() + 1);

        return this;    
    },

    /**
     * Метод для переключения на изображение с определенным индексом
     * @param  {Number} index - индекс изображения на которое необходимо перейти
     * @return {type}
     */
    _switchToImageWithIndex: function(index) {

        if(this.isInSwitchState){
            return;
        }

        this.isInSwitchState = true;
        
        var images = this._getDataSource().getImages();

        var imageBlock = this.findBlockInside({block: 'b-image', modName: 'index', modVal: index.toString() });

        if(imageBlock) {
            this._switchTransit(index);
        } else {
            this
                ._drawImage(index)
                .findBlockInside({block: 'b-image', modName: 'index', modVal: index.toString() })
                .on('eventImageLoaded', function(arguments) {
                    if( this._getDataSource().getCurrentIndex() < 0){
                        arguments.block
                            .resize() //Маштабируем изображение под размеры окна браузера
                            .align() //Выравниваем изображение по горизонтали и вертикали
                            .show(); //делаем изображение видимым

                        this._switchFinalize(index);                    
                    }else{                        
                        this._loader.hide();
                        this._switchTransit(index);
                    }    
                }, this);        
        }
    },

    _switchTransit: function(index) {
        console.log('_switchTransit' + index);
        var currentIndex = this._getDataSource().getCurrentIndex();

        var newImage = this._getDataSource().getImages()[index],
            oldImage = this._getDataSource().getImages()[currentIndex],
            newImageBlock = this.findBlockInside({block: 'b-image', modName: 'index', modVal: index.toString() }),
            oldImageBlock = this.findBlockInside({block: 'b-image', modName: 'index', modVal: currentIndex.toString()});

        var winSize = BEM.DOM.getWindowSize();

        var direction = index > currentIndex ? 1 : -1;

        //TODO переключить миниатюру    

        oldImageBlock.on('eventTransitionOldFinished', function(){
            oldImageBlock.hide();

            newImageBlock
                .resize()
                .align(direction)
                .show()
                .transit(direction, this.params.switch_duration, true);            
        }, this);

        newImageBlock.on('eventTransitionNewFinished', function(){
            this._switchFinalize(index);
        }, this);

        oldImageBlock.transit(direction, this.params.switch_duration, false);
            
    },

    /**
     * Финальная часть функционала для смены слайдов в галерее
     * Устанавливаем текущий индекс в модели данных
     * Переключаем состояние навигационных стрелок
     * Прячем индикатор загрузки
     * @param  {Number} index индекс изображения которое будет показано
     * @return {Object} экземпляр класса b-gallery
     */
    _switchFinalize: function(index) {        
        this._getDataSource().setCurrentIndex(index);
                
        this
            ._toggelArrows()
            ._loader.hide();

        this.isInSwitchState = false;    

        return this;    
    },

    /**
     * Метод для добавления нового блока b-image по index
     * @param  {Number} index индекс элемента в галерее
     * @return {Object} экземпляр блока b-gallery 
     */
    _drawImage: function(index) {

        var img = this._getDataSource().getImages()[index];
        var size = img.getBySize(this.params.image_size);

        this.__self.append(this.domElem, BEMHTML.apply({
            block: 'b-image',
            attrs: {
                id: img.params.id,
                src: size.href,
                title: img.params.title,
                alt: img.params.title
            },
            mods: { index: index },
            js: {
                size: size
            }
        }));

        return this;
    },

    /**
     * Метод для блокирования/разблокирования навигационных стрелок
     * Если мы находимся на первой картине в гелерее, то блокируется стрелка назад
     * Если мы находимся на последней картине в галерее, то блокируется стрелка вперед
     * @return {Object} экземпляр блока b-gallery
     */
    _toggelArrows: function() {
        return this
                .toggleMod(this._arrowBack, 'disable', 'yes', this._getDataSource().isFirst())
                .toggleMod(this._arrowForward, 'disable', 'yes', this._getDataSource().isLast());
         
    },

    /**
     * Возвращает объект dataSource для галереи
     * @return {Object} объект dataSource
     */
    _getDataSource: function() {
        return this._dataSource;
    }

}, {

    DEFAULT_THUMBNAIL_SIZE: 'XXS',
    DEFAULT_IMAGE_SIZE: 'M',

    AVAILABLE_SIZES: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],

    DEFAULT_SWITCH_DURATION: 300
});

})();
