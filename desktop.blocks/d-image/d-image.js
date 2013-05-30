/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.decl('d-image', {

    onSetMod : {

        'js' : function() {
            console.log('-- image model has been created --');
            console.log('- id : ' + this.params.id);
            console.log('- title : ' + this.params.title);
            console.log('- sizes : ' + this.params.sizes);
        }

    },

    /**
    * Возвращает изображение по его размеру
    **/
    getBySize: function(size) {
		return  this.params.sizes[size] || this.getLargestImage();
	},

	/**
	* Возвращает самый большой из существующих вариантов изображения
	**/
	getLargestImage: function() {
		
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
