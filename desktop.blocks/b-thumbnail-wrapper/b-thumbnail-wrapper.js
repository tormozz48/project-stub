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

    drawThumbnails: function(images) {
        var l = images.length;

        if(l > 0) {
            for(var i = 0; i < l; i++) {
                
            }
        }    
    }

}, {

});

})();
