/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ block: 'b-gallery', modName: 'slide-show', modVal: 'yes'}, {

    /**
     * Подписываемся на события
     * @private
     * @return {Object} экземпляр класса b-gallery
     */
    _bindEvents: function(){

        this.__base.apply(this, arguments);

        var _this = this;

        //Подписываемся на события клавиатуры
        return this.bindToWin('keydown', function(e) {
            var key = e.charCode || e.keyCode || 0;

            key == 13 && _this.toggleMod(_this.elem('slide-show'), 'slide', 'yes');
        });
    },

    /**
     * Метод для парсинга конфигурации и выставления дефолтных параметров
     * в случае отсутствия переданных конфигурационных параметров
     * @private
     * @return {Object} экземпляр блока b-gallery
     */
    _parseConfig: function() {

        this.__base.apply(this, arguments);

        // берем время для показа одного слайда в режиме слайд-шоу или устанавливаем по умолчанию
        this.params.slideShowSwitchTime = this.params.slideShowSwitchTime || this.__self.SLIDE_SHOW_SWITCH_TIME;

        return this;
    }

}, {

    SLIDE_SHOW_SWITCH_TIME: 2000

});

})();
