([
  {
      tech: 'js',
      mustDeps: [
          {
              block: 'b-gallery',
              tech: 'bemhtml'
          }
      ]
  },
  {
      mustDeps: [
          { block: 'i-bem', elems: ['dom', 'html'] },
          { block: 'i-system' },
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
                'active': 'yes',
                'loaded': 'yes'
            }
          },
          {
            elem: 'slide_show',
            mods: {
                'slide': 'yes'
            }
          },
          {
            mods: {
              'slide_show': 'yes',
              'key_switch': 'yes'
            }
          },
        	{ block: 'b-image' },
          { block: 'b-loader' }
      ]
  }
])