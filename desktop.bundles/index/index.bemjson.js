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
        { block: 'b-arrow', mods: { direction: 'back', visible: 'yes'}},
        { block: 'b-arrow', mods: { direction: 'forward', visible: 'yes'}},

        { block: 'b-thumbnail-wrapper', mods: { visible: 'yes'}},

        { block: 'i-jquery', mods: { version: '1.8.3' } },
        { elem: 'js', url: '_index.js' },

        { block: 'd-source'}
    ]
})
