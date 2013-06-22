/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl({ block: 'b-gallery', modName: 'slide_show', modVal: 'yes'}, {

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

            key == 13 && this._toggleSlideShow();
        });
    },

    _toggleSlideShow: function() {

        this._count = 0;

        if(this._isInSlideShowState) {
            this._isInSlideShowState = false;
            this.channel('sys').un('tick', this._onTick, this );
        }else{
            this._isInSlideShowState = true;
            this.channel('sys').on('tick', this._onTick, this );
        }
    },

    _onTick: function(){
        this._count++;

        if(this._count%50 == 0) {
             this._getDataSource().isLast() ? this._switchToImageWithIndex(0) : this._switchToNextImage();
             this._count = 0;
        }
    }

}, {


});

})();
