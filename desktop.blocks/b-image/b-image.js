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
    },

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

        //В случае когда ширина или высота окна браузера
        //меньше соотвественно ширины или высоты изображения
        //то подгоняем размеры изображения под размер окна браузера
        //при этом сохраняем пропорции  
        if(winSize.width < dSize.width || winSize.height < dSize.height) {
            if (winSize.width/winSize.height > ar){
                this.domElem.height(winSize.height);
                this.domElem.width(winSize.height * ar);
            }else{
                this.domElem.width(winSize.width);
                this.domElem.height(winSize.width / ar);
            }
        }

        return this;
    },

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

});

})();
