/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ block: 'b-gallery', modName: 'slideshow', modVal: 'yes'}, {

    onSetMod : {

        'js' : function() {
            this.__base.apply(this, arguments);
        }

    }

}, {

    live : function() {
        this.__base.apply(this, arguments);

        return false;
    }

});

})();
