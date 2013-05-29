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

    }

}, {

    // live : function() {
    //     /* ... */
    // }

});

})();
