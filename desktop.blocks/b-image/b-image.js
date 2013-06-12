/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-image', {

    onSetMod : {

        'js' : function() {
         	
         	var _this = this;

         	this.domElem.load(function(){
         		_this.trigger('eventImageLoaded');
         	});  
        }
    }
    
}, {

});

})();
