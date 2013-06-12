/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.decl('d-image', {

    onSetMod : {

        'js' : function() {
            //TODO nothing
        }

    },

    /**
     * Возвращает изображение по его размеру
     * @param  {String} size - строковый ключ для указания размера изображения
     * @return {Object} объект для хранения параметров размера изображения
     */
    getBySize: function(size) {
		return  this.params.sizes[size] || this._getLargestImage();
	},

	/**
	 * Возвращает самый большой из существующих вариантов изображения
	 * @return {Object} объект для хранения параметров размера изображения
	 */
	_getLargestImage: function() {
		
		var largest_img = null;

		for(var i in this.params.sizes){
			if( !largest_img || this.params.sizes[i].width > largest_img.width){
				largest_img = this.params.sizes[i];
			}
		}

		return largest_img;
	}

}, {
	//TODO nothing
});

})();
