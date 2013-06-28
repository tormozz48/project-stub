/** @requires BEM */
/** @requires BEM.DOM */
BEM.DOM.decl({ block: 'b-gallery', modName: 'key_switch', modVal: 'yes'}, {

    /**
     * Подписываемся на события
     * @private
     * @return {Object} экземпляр класса b-gallery
     */
    _bindEvents: function(){

        this.__base.apply(this, arguments);

        var _this = this;

        //Подписываемся на события клавиатуры:
        //по нажатию на стрелку вправо переходим на следующий слайд
        //по нажатию на стрелку влево возвращаемся на предыдущий слайд
        return this.bindToWin('keydown', function(e) {
            var key = e.charCode || e.keyCode || 0;

            key == 37  && _this._switchToPreviousImage({ source: 'keyboard' });
            key == 39 && _this._switchToNextImage({ source: 'keyboard' });
        });
    }

});