/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-gallery', {
	
    onSetMod : {

        'js' : function() {
            this._parseConfig();

         	this._dataSource = BEM.create('d-source', this.params.data_source);	
            
            this._thumbnailWrapper = this.findBlockInside('b-thumbnail-wrapper');
            this._arrowBack = this.findBlockInside({ block: 'b-arrow', modName: 'direction', modVal: 'back' });
            this._arrowForward = this.findBlockInside({ block: 'b-arrow', modName: 'direction', modVal: 'forward' });

            //Подписываем блок dataSource на событие eventDataLoaded окончания загрузки данных
        	this._dataSource.on('eventDataLoaded', function(){
        		this._onDataLoaded();
        	}, this);

            //Подписываем блок стрелки возврата на предыдущее изображение на 
            //событие eventBack которое этот блок триггерит при нажатии на него
            this._arrowBack.on('click', function() {
                this._switchToPreviousImage();
            }, this);

            //Подписываем блок стрелки перехода на следующее изображение на 
            //событие eventForward которое этот блок триггерит при нажатии на него    
            this._arrowForward.on('click', function() {
                this._switchToNextImage();
            }, this);       
        }
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
        
        // берем направление перемещения изображения из конфигурации или устанавливаем по умолчанию
        this.params.switch_direction = this.params.switch_direction || this.__self.SWITCH_DIRECTIONS[0];
        
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

        this._thumbnailWrapper.drawThumbnails(this._dataSource.getImages(), this.params.thumbnail_size);

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
    }

}, {

    DEFAULT_THUMBNAIL_SIZE: 'XXS',
    DEFAULT_IMAGE_SIZE: 'M',

    AVAILABLE_SIZES: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],

    DEFAULT_SWITCH_DURATION: 300
});

})();
