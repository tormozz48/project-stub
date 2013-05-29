/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.decl('d-source', {

    onSetMod : {

        'js' : function() {
            console.log('data source inited');
        }

    }

}, {


});

BEM.create('d-source');

})();
