/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-arrow', {

    onSetMod : {

        'js' : function() {
        	
        	var _this = this;

        	this.bindToDoc('mouseenter', function(e){
        		_this.setMod('visible', 'yes');
        	});
        }

    }

}, {

    // live : function() { }

});

})();
