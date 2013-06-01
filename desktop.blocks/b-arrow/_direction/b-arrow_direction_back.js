/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ block: 'b-arrow', modName: 'direction', modVal: 'back'}, {

    onSetMod : {

        'js' : function() {

            this.__base.apply(this, arguments);

            var _this = this;

        	this.bindToDoc('mouseleave', function(e){
        		_this.delMod('visible');
        	});

            this.bindTo('click', function() {
                _this.trigger('eventBack');
            });
        }

    }

}, {

    // live : function() { }

});

})();
