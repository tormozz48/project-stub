exports.baseLevelPath = require.resolve('bem/lib/levels/simple');

exports.getTechs = function() {

    return {
        'blocks': 'bem/lib/techs/blocks',
        'bundles': 'bem/lib/techs/bundles'
    };

};