([
    {
        tech: 'js',
        mustDeps: [
            {
                block: 'i-bem',
                elem: 'html',
                tech: 'bemhtml'
            },
            {
                block: 'b-thumbnail-wrapper',
                tech: 'bemhtml'
            }
        ]
    },
    {
        mustDeps: [
            {
                block: 'i-bem',
                elem: 'dom'
            }
        ],
        shouldDeps: [
            {   
                mods: {                
                    'visible': 'yes'
                }
            }  
        ]
    }
])