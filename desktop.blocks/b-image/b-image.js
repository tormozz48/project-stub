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

         	this.bindToWin('resize', function(){
                _this.hasMod('visible') && _this.resize().align();
            });
        }
    },

    /**
     * Метод для вычисления горизонтальной позиции того
     * изображения которое будет показано
     * @private
     * @param  {Number} direction направление переключения изображения [1, -1]
     * @return {Object} объект с вычисленными css параметрами положения
     */
    _getTransitInConfig: function(direction) {
        return { right: ((BEM.DOM.getWindowSize().width - this.domElem.width())/2) + 'px' };
    },

    /**
     * Метод для вычисления горизонтальной позиции того
     * изображения которое будет скрыто
     * @private
     * @param  {Number} direction направление переключения изображения [1, -1]
     * @return {Object} объект с вычисленными css параметрами положения
     */
    _getTransitOutConfig: function(direction) {
        return { right: (direction > 0 ? BEM.DOM.getWindowSize().width : (-1)*this.domElem.width()) + 'px' };
    },

    /**
     * Метод для изменения размера изображения для
     * подгонки его под текущий размер экрана
     * @protected
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
    },

    /**
     * Метод для выравнивания изображения по центру экрана
     * @protected
     * @return {Object} экземпляр блока b-image
     */
    align: function(direction) {
        //размеры окна браузера
        var winSize = BEM.DOM.getWindowSize();

        //DOM элемент блока
        var img = this.domElem;

        //позиция по горизонтали
        var ch = direction ?
            (direction > 0 ? (-1)*img.width() : winSize.width) : (winSize.width - img.width())/2;

        //позиция по вертикали
        var cv = (winSize.height - img.height())/2;

        img.css('right', ch + 'px');
        img.css('top', cv + 'px');

        return this;
    },

    /**
     * Метод для перемещения DOM элемента блока b-image
     * @param  {Number} direction направление перемещения блока [-1, 1]
     * @param  {Number} duration длительность перемещения блока в миллисекундах
     * @param  {Boolean} newImage булевский флаг (true для слайда который будет показан;
     * false для слайда который будет скрыт)
     * @protected
     */
    transit: function(direction, duration, newImage) {
        var _this = this;

        this.domElem.animate(
            newImage ? this._getTransitInConfig(direction) : this._getTransitOutConfig(direction), duration, function(){
                _this.trigger('eventTransitionFinished');
            });
    },

    /**
     * Делаем блока b-image видимым
     * @protected
     * @return {Object} экземпляр блока b-image
     */
    show: function() {
        return this.setMod('visible', 'yes');
    },

    /**
     * Прячем блок b-image
     * @protected
     * @return {Object} экземпляр блока b-image
     */
    hide: function() {
        return this.delMod('visible');
    }

}, {

});

})();
