/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-arrow', {

    onSetMod : {

        'js' : function() {
        	
        	var _this = this;

        	this.bindToDoc('mouseenter', function(e){
        		_this._onMouseEnter();
        	});

            this.bindToDoc('mouseleave', function(e){
                _this._onMouseLeave();
            });

            this.bindTo('click', function(e) {
                _this._onClick();    
            });
        }
    },

    /**
     * Добавляет модификатор visible когда пользователь
     * возвращает курсор в окно браузера
     * @return {Object} экземпляр блока b-arrow
     */
    _onMouseEnter: function() {
        return this.setMod('visible', 'yes');
    },

    /**
     * Удаляет модификатор visible когда пользователь
     * уводит курсор мыши за пределы окна браузера
     * @return {Object} экземпляр блока b-arrow
     */
    _onMouseLeave: function() {
        return this.delMod('visible');
    },

    /**
     * Обработчик события click на стрелке
     * при условии, что блок не имеет модификатора disable
     * триггерится событие click
     */
    _onClick: function() {
        this.hasMod('disable') || this.trigger('click');
    },

    /**
     * Удаляет модификатор disable
     * @return {Object} экземпляр блока b-arrow
     */
    enable: function() {
        return this.delMod('disable');
    },  
    
    /**
     * Добавляет модификатор disable для случаев
     * когда отображается первое или последнее изображения галереи
     * @return {Object} экземпляр блока b-arrow
     */  
    disable: function() {
        return this.setMod('disable', 'yes');
    }

}, {

    // live : function() { }

});

})();
