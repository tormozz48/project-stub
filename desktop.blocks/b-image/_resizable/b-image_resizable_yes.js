/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ block: 'b-image', modName: 'resizable', modVal: 'yes'}, {

	/**
     * Метод для изменения размера изображения для 
     * подгонки его под текущий размер экрана
     * @return {Object} экземпляр блока b-image
     */
    resize: function() {
        
        //установленный размер большого изображения
        var dSize = this.params.size;

        //размеры окна браузера
        var winSize = BEM.DOM.getWindowSize(); 

        //соотношение сторон изображения
        var ar = dSize.width/dSize.height; 

        //DOM элемент блока
        var img = this.domElem;

        //В случае когда ширина или высота окна браузера
        //меньше соотвественно ширины или высоты изображения
        //то подгоняем размеры изображения под размер окна браузера
        //при этом сохраняем пропорции  
        if(winSize.width < dSize.width || winSize.height < dSize.height) {
            if (winSize.width/winSize.height > ar){
                img.height(winSize.height);
                img.width(winSize.height * ar);
            }else{
                img.width(winSize.width);
                img.height(winSize.width / ar);
            }
        }

        return this;
    }
    
}, {
	//TODO nothing
});

})();
