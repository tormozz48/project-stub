/** @requires BEM */
/** @requires BEM.DOM */

(function(undefined) {

BEM.decl('d-source', {

    _images: [],
    _currentIndex: null,

    onSetMod : {

        'js' : function() {
            console.log('-- data source initialized --');
            console.log('- url : ' + this.params.url);
            console.log('- order : ' + this.params.order);
            console.log('- limit : ' + this.params.limit);

            this._loadData();
        }

    },

    /**
     * Метод для построения ссылки для загрузки данных с Яндекс фоток
     * @return {String} - url для загрузки файлов
     */
	_createUrl : function() {
        var url = null;

        //добавляем url из параметров или берем url по умолчанию
        url = this.params.url || this.__self.DEFAULT_URL;
        
        //добавляем order из параметров или берем order по умолчанию
        url += this.params.order ? this.params.order : this.__self.ORDERS[0];
        
        url += '/';

        //добавляем limit из парамеров или берем по умолчанию
        // проводим дополнительные проверки на то, что limit положительный и меньше максимального лимита
        var limit = (this.params.limit && this.params.limit > 0) ? this.params.limit : this.__self.DEFAULT_LIMIT;
        limit = this.params.limit <= this.__self.MAX_LIMIT ? this.params.limit : this.__self.MAX_LIMIT;
        
        url += '?limit=' + limit;
        
        //добавляем формат данных и callback для JSONP запроса
        url += '&' + this.__self.DATA_FORMAT + '&' + this.__self.CALLBACK;
        
        console.log('-- url has been created --');
        console.log('- url : ' + url);

        return url;
	},

    /**
     * Метод для загрузки данных с Яндекс фоток по сгенерированной ссылке
     */
	_loadData : function() {
        var _this = this;
        $.getJSON(this._createUrl(), function(data){
            _this._parseData(data);
        });
	},

    /**
     * Метод для парсинга загруженных данных и заполнения модели изображений
     * @param  {Object} data - данные от сервера с описанием коллекции изображений
     */
    _parseData : function(data) {
        var l = data.entries.length;

        console.log('-- images has been loaded --');
        console.log('- images size : ' + l);

        if( l > 0 ){
            for( var i = 0; i < l; i++ ){

                //Для каждого изображения создаем блок d-image хранящий всю информацию
                this._images[i] = BEM.create('d-image', {
                    id: data.entries[i].id, 
                    title: data.entries[i].title, 
                    sizes: data.entries[i].img
                });
            }            
        }

        //триггерим событие для индикации окончания загрузки данных
        this.trigger('eventDataLoaded');
    },
    
    /**
     * Проверка условия, что текущее изображение является первым в галерее
     * @return {Boolean} true || false
     */
    isFirst: function(){
        return this.getCurrentIndex() == 0;
    },

    /**
     * Проверка условия, что текущее изображение является последним в галерее
     * @return {Boolean} true || false
     */
    isLast: function(){
        var l = this.getImages() ? this.getImages().length : 0;    
        return this.getCurrentIndex() == l - 1;           
    },

    /**
     * Метод для возврата коллекции данных об изображениях
     * @return {Array}
     */
    getImages: function() {
        return this._images;
    },

    /**
     * Метод для возврата текущего индекса в галерее
     * @return {Number} индекс текущего изображения
     */
    getCurrentIndex: function() {
        return this._current_index;
    },

    /**
     * Метод для установки текущего индекса в галерее
     * @param  {Number} index индекс, который мы выставляем в галерее
     */
    setCurrentIndex: function(index) {
        this._current_index = index;
    },

    loadIndex: function() {
        //TODO load index from cookie
        return 0;
    }

}, {
    DEFAULT_URL: 'http://api-fotki.yandex.ru/api/top/',
    DEFAULT_LIMIT: 50,

    DATA_FORMAT: 'format=json',
    CALLBACK: 'callback=?',

    ORDERS: ['updated', 'rupdated', 'published', 'rpublished', 'created', 'rcreated'],
    MIN_LIMIT: 0,
    MAX_LIMIT: 100
});

})();   
