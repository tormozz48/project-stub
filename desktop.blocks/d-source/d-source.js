/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.decl('d-source', {

    onSetMod : {

        'js' : function() {
            console.log('-- data source initialized --');
            console.log('- url : ' + this.params.url);
            console.log('- order : ' + this.params.order);
            console.log('- limit : ' + this.params.limit);

            this._loadData();
        }

    },

    DEFAULT_URL: 'http://api-fotki.yandex.ru/api/top/',
	DEFAULT_LIMIT: 50,

	DATA_FORMAT: 'format=json',
	CALLBACK: 'callback=?',

	ORDERS: ['updated', 'rupdated', 'published', 'rpublished', 'created', 'rcreated'],
	MIN_LIMIT: 0,
	MAX_LIMIT: 100,

    /**
    * Метод для построения ссылки для загрузки данных с Яндекс фоток
    **/
	_createUrl : function() {
        var url = null;

        //добавляем url из параметров или берем url по умолчанию
        url = this.params.url || this.DEFAULT_URL;
        
        //добавляем order из параметров или берем order по умолчанию
        url += this.params.order ? this.params.order : this.ORDERS[0];
        
        url += '/';

        //добавляем limit из парамеров или берем по умолчанию
        // проводим дополнительные проверки на то, что limit положительный и меньше максимального лимита
        var limit = (this.params.limit && this.params.limit > 0) ? this.params.limit : this.DEFAULT_LIMIT;
        limit = this.params.limit <= this.MAX_LIMIT ? this.params.limit : this.MAX_LIMIT;
        
        url += '?limit=' + limit;
        
        //добавляем формат данных и callback для JSONP запроса
        url += '&' + this.DATA_FORMAT + '&' + this.CALLBACK;
        
        console.log('-- url has been created --');
        console.log('- url : ' + url);

        return url;
	},

	_loadData : function() {
        this._createUrl();
	},

    _parseData : function() {

    }

}, {


});

//TODO подумать как сделать проброс параметров из страницы bemjson

BEM.create('d-source', {
    url: 'http://api-fotki.yandex.ru/api/top/',
    order: 'updated',
    limit: 50
});

})();
