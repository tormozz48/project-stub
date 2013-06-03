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
                        // tag: 'img',
                        attrs: {
                            src: images[i].getBySize(size).href,
                            title: images[i].params.title,
                            alt: images[i].params.title,
                        },
                        js: {
                            data_id: images[i].params.id,
                            index: i
                        }
                }));        
            }
        }

        /*Устанавливаем модификатор hovered при наведении мыши на thumbnail*/
        this.bindTo('thumbnail', 'mouseenter', function(e) {
            this.setMod(e.data.domElem, 'hovered', 'yes');
        });

        /*Убираем модификатор hovered когда уводим мышь с thumbnail-а*/
        this.bindTo('thumbnail', 'mouseleave', function(e) {
            this.delMod(e.data.domElem, 'hovered');
        });    
    }

}, {

});

})();
