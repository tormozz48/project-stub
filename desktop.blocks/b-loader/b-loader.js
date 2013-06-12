/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-loader', {

	/**
	 * Показываем индикатор загрузки
	 * @return {Object} экземпляр блока b-loader
	 */
    show: function() {
    	var winSize = BEM.DOM.getWindowSize();
    	var domElem = this.domElem;

    	domElem.css('left', (winSize.width - domElem.width())/2 + 'px');
		domElem.css('top', (winSize.height - domElem.height())/2 + 'px');

    	return this.setMod('visible', 'yes');
    },

    /**
     * Прячем индикатор загрузки
     * @return {Object} экземпляр блока b-loader
     */
    hide: function() {
    	return this.delMod('visible');
    }

}, {

});

})();
