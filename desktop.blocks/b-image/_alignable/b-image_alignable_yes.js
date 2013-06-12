/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ block: 'b-image', modName: 'alignable', modVal: 'yes'}, {

	/**
     * Метод для выравнивания изображения по центру экрана
     * @return {Object} экземпляр блока b-image
     */
    align: function() {
        //размеры окна браузера
        var winSize = BEM.DOM.getWindowSize();

        //DOM элемент блока
        var img = this.domElem;

        //позиция по горизонтали
        var ch = (winSize.width - img.width())/2; 
        
        //позиция по вертикали
        var cv = (winSize.height - img.height())/2; 

        img.css('right', ch + 'px');
        img.css('top', cv + 'px');

        return this;            
    }
    
}, {
	//TODO nothing
});

})();
