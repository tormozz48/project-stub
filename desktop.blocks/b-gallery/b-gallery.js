/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-gallery', {

    _dataSource: null,
	
    onSetMod : {

        'js' : function() {
         	this._dataSource = BEM.create('d-source', this.params.data_source);	
        
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

    _onDataLoaded: function() {
    	console.log('_onDataLoaded');
    },

    _switchToPreviousImage: function() {
        console.log('_switchToPreviousImage');
    },

    _switchToNextImage: function() {
        console.log('_switchToNextImage');
    }

}, {

    // live : function() {
    //     /* ... */
    // }

});

})();
