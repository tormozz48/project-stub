/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-gallery', {
	
    onSetMod : {

        'js' : function() {
            this._parseConfig();

         	this._dataSource = BEM.create('d-source', this.params.data_source);	
            
            this._thumbnailWrapper = this.findBlockInside('b-thumbnail-wrapper');
            this._loader = this.findBlockInside('b-loader');

            this._arrowBack = this.elem('arrow', 'direction','back');
            this._arrowForward = this.elem('arrow', 'direction', 'forward');

            //Подписываем блок dataSource на событие eventDataLoaded окончания загрузки данных
        	this._dataSource.on('eventDataLoaded', function(){
        		this._onDataLoaded();
        	}, this);

            this._bindEventsToArrows();

            this._loader.show();                   
        }
    },

    /**
     * Подписываем элементы arrow на события
     * @return {Object} экземпляр класса b-gallery
     */
    _bindEventsToArrows: function(){
        var _this = this;    

        //когда курсор мыши входит в область окна браузера показываем навигационные стрелки
        this.bindToDoc('mouseenter', function() {
            _this.setMod(_this._arrowBack, 'visible', 'yes');
            _this.setMod(_this._arrowForward, 'visible', 'yes');
        });

        //когда курсор мыши уходит из области окна браузера скрываем навигационные стрелки
        this.bindToDoc('mouseleave', function() {
            _this.delMod(_this._arrowBack, 'visible');
            _this.delMod(_this._arrowForward, 'visible');
        });

        //Подписываем блок стрелки возврата на предыдущее изображение на 
        //событие eventBack которое этот блок триггерит при нажатии на него
        this.bindTo(this._arrowBack, 'click', function() {
            this._switchToPreviousImage();
        }, this);

        //Подписываем блок стрелки перехода на следующее изображение на 
        //событие eventForward которое этот блок триггерит при нажатии на него    
        this.bindTo(this._arrowForward, 'click', function() {
            this._switchToNextImage();
        }, this);

        return this;
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
     * Колбэк индиации загрузки данных
     * в данном методе: 
     * - отрисовывается контейнер с миниатюрами 
     * @return {Object} экземпляр блока b-gallery
     */
    _onDataLoaded: function() {
    	console.log('_onDataLoaded');

        this._thumbnailWrapper.drawThumbnails(
            this._dataSource.getImages(), this.params.thumbnail_size
        );

        this._initFirstImage();

        return this;
    },

    /**
     * Метод для переключения на предыдущее изображение
     * @return {Object} экземпляр блока b-gallery
     */
    _switchToPreviousImage: function() {
        console.log('_switchToPreviousImage');
        this._getDataSource().isFirst() || 
            this._switchToImageWithIndex(this._getDataSource().getCurrentIndex() - 1);

        return this;
    },

    /**
     * Метод для переключения на следующее изображение
     * @return {Object} экземпляр блока b-gallery
     */
    _switchToNextImage: function() {
        console.log('_switchToNextImage');
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
        console.log('_switchToImageWithIndex : ' + index);
    },

    /**
     * Возвращает объект dataSource для галереи
     * @return {Object} объект dataSource
     */
    _getDataSource: function() {
        return this._dataSource;
    },

    /**
     * [ description]
     * @return {[type]} [description]
     */
    _initFirstImage: function() {
        console.log('_initFirstImage');

        var index = this._getDataSource().loadIndex();
        var img = this._getDataSource().getImages()[index];

        this.__self.append(this.domElem, BEMHTML.apply({
            block: 'b-image',
            attrs: {
                src: img.getBySize(this.params.image_size).href,
                title: img.params.title,
                alt: img.params.title,
                data_id: img.params.id,
                index: index
            },
            js: {
                size: img.getBySize(this.params.image_size)
            }
        }));

        this.findBlockInside('b-image').on('eventImageLoaded', function(arguments) {
            console.log('eventImageLoaded');

            arguments.block
                .resize() //Маштабируем изображение под размеры окна браузера
                .align() //Выравниваем изображение по горизонтали и вертикали
                .setMod('visible', 'yes'); //делаем изображение видимым

            //Устанавливаем текущий индекс в модели данных    
            this._getDataSource().setCurrentIndex(index);
            
            //переключаем состояние навигационных стрелок
            //прячем индикатор загрузки
            this
                ._toggelArrows()
                ._loader.hide();    
                
        }, this);
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
         
    }

}, {

    DEFAULT_THUMBNAIL_SIZE: 'XXS',
    DEFAULT_IMAGE_SIZE: 'M',

    AVAILABLE_SIZES: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],

    DEFAULT_SWITCH_DURATION: 300
});

})();
