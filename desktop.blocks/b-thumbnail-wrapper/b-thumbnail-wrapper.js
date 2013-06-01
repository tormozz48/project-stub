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
                            src: images[i].get_by_size(size).href,
                            title: images[i].title,
                            alt: images[i].title,
                        },
                        js: {
                            data_id: images[i].id,
                            index: i
                        }
                }));        
            }
        }    
    }

}, {

});

})();
