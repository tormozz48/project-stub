/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.DOM.decl('b-gallery', {

    onElemSetMod : {

        'slide_show' : {

            'slide' : {

                'yes' : function() {
                    this._count = 0;
                    this.channel('sys').on('tick', this._onTick, this );
                    this.on('eventSwitchToImageWithIndex', function(e, data) {
                        ( data && data.source !== 'slide_show' ) &&
                            this.delMod(this.elem('slide_show'), 'slide');
                    }, this);
                },

                '' : function() {
                    this.channel('sys').un('tick', this._onTick, this );
                    this.un('eventSwitchToImageWithIndex');
                }
            }

        }
    },

    /**
     * Обработчик события tick канала system
     * @return {[type]} [description]
     */
    _onTick: function() {

        //рассчитываем сколько раз должен сработать tick
        //учетом того времени переключения слайда, которое мы выставили
        var n = Math.round(this.params.slide_show_switch_time/50);

        if(this._count%n == 0) {
            this._getDataSource().isLast() ?
                this._switchToImageWithIndex(0, { source: 'slide_show' }) :
                this._switchToNextImage({ source: 'slide_show' });
            this._count = 0;
        }

        this._count++;
    }

}, {
    //TODO nothing
});

})();
