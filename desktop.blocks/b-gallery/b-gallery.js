/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-gallery', {

    _dataSource: null,
    _thumbnail_wrapper: null,
	
    onSetMod : {

        'js' : function() {
            this._parseConfig();

         	this._dataSource = BEM.create('d-source', this.params.data_source);	
            
            this._thumbnail_wrapper = this.findBlockInside('b-thumbnail-wrapper');

        	this._dataSource.on('eventDataLoaded', function(){
        		this._onDataLoaded();
        	}, this);

            //Подписываем блок стрелки возврата на предыдущее изображение на 
            //событие eventBack которое этот блок триггерит при нажатии на него
            this.findBlockInside({ block: 'b-arrow', modName: 'direction', modVal: 'back' })
                .on('eventBack', function() {
                    this._switchToPreviousImage();
                }, this);

            //Подписываем блок стрелки перехода на следующее изображение на 
            //событие eventForward которое этот блок триггерит при нажатии на него    
            this.findBlockInside({ block: 'b-arrow', modName: 'direction', modVal: 'forward' })
                .on('eventForward', function() {
                    this._switchToNextImage();
                }, this);       
        }
    },

    _parseConfig: function() {
        
        // берем размер для миниатюры из конфига или устанавливаем по умолчанию 
        this.params.thumbnail_size = this.params.thumbnail_size || this.__self.DEFAULT_THUMBNAIL_SIZE;
        
        // берем размер для полного изображения из конфига или устанавливаем по умолчанию
        this.params.image_size = this.params.image_size || this.__self.DEFAULT_IMAGE_SIZE;
        
        // берем направление перемещения изображения из конфигурации или устанавливаем по умолчанию
        this.params.switch_direction = this.params.switch_direction || this.__self.SWITCH_DIRECTIONS[0];
        
        // берем время для анимации переключения или устанавливаем по умолчанию
        this.params.switch_duration = this.params.switch_duration || this.__self.DEFAULT_SWITCH_DURATION;
    },

    _onDataLoaded: function() {
    	console.log('_onDataLoaded');

        this._thumbnail_wrapper.drawThumbnails(this._dataSource.images, this.params.thumbnail_size);

    },

    _switchToPreviousImage: function() {
        console.log('_switchToPreviousImage');
    },

    _switchToNextImage: function() {
        console.log('_switchToNextImage');
    }

}, {

    DEFAULT_THUMBNAIL_SIZE: 'XXS',
    DEFAULT_IMAGE_SIZE: 'M',

    AVAILABLE_SIZES: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],

    SWITCH_DIRECTIONS: ['left', 'bottom', 'right', 'top'], 

    DEFAULT_SWITCH_DURATION: 300,

    THUMBNAILS_WRAPPER_HEIGHT_ADDITION: 10

    // live : function() {
    //     /* ... */
    // }

});

})();
