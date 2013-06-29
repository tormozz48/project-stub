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
            mods: {
                'key-switch': 'yes',
                'slide-show': 'yes'
            },
            js: {
                dataSource : {
                    url: 'http://api-fotki.yandex.ru/api/top/',
                    order: 'updated',
                    limit: 50
                },
                thumbnailSize: 'XXS',
                imageSize: 'XL',
                switchDuration: 300
            }
        },

        { block: 'i-jquery', mods: { version: '1.8.3' } },
        { elem: 'js', url: '_index.js' }
    ]

})
