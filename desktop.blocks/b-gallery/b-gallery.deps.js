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
      	{ 
          elem: 'thumbnails', 
          mods: {'visible': 'yes'} 
        },
        {
          elem: 'thumbnail', 
          mods: {
              'hovered': 'yes', 
              'active':  'yes',
              'loaded': 'yes'
          }    
        }, 
      	{ block: 'b-image' },
        { block: 'b-loader' }  
    ]
})