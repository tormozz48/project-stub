/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.decl('d-image', {

    /**
     * Возвращает изображение по его размеру
     * Если изображение с указанным размером не найдено, то возвращает
     * самое большое изображение из тех что существуют
     * @private
     * @param  {String} size - строковый ключ для указания размера изображения
     * @return {Object} объект для хранения параметров размера изображения
     */
    getBySize: function(size) {
		return  this.params.sizes[size] || this._getLargestImage();
	},

	/**
	 * Возвращает самый большой из существующих вариантов изображения
	 * @private
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
