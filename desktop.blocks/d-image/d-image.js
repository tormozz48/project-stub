/** @requires BEM */
/** @requires BEM.DOM */
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

		var largestImg = null;

		for(var i in this.params.sizes){
			if( !largestImg || this.params.sizes[i].width > largestImg.width){
				largestImg = this.params.sizes[i];
			}
		}

		return largestImg;
	}
});
