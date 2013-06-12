({
    mustDeps: [
        { block: 'i-bem', elem: 'dom' },
        { block: 'd-source' }
    ],
    shouldDeps: [
      	{ 
      		elem: 'arrow',
      		mods: {                
                'direction': ['forward','back'],
                'visible': 'yes',
                'disable': 'yes'
          }
      	},
      	{ block: 'b-thumbnail-wrapper' },
      	{ block: 'b-image' },
        { block: 'b-loader' }  
    ]
})