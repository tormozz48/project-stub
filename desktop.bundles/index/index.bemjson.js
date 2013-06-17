({
    block: 'b-page',
    title: 'Галерея изображений',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: '_index.css', ie: false },
        { elem: 'css', url: '_index', ie: true },
        { elem: 'meta', attrs: { name: 'description', content: '' }},
        { elem: 'meta', attrs: { name: 'keywords', content: '' }}
    ],
    content:[
        {
            block: 'b-gallery',
            js: {
                data_source : {
                    url: 'http://api-fotki.yandex.ru/api/top/',
                    order: 'updated',
                    limit: 50
                },
                thumbnail_size: 'XXS',
                image_size: 'XL',
                switch_direction: 'left',
                switch_duration: 300
            }
        },

        { block: 'i-jquery', mods: { version: '1.8.3' } },
        { elem: 'js', url: '_index.bemhtml.js'},
        { elem: 'js', url: '_index.js' }
    ]

})
