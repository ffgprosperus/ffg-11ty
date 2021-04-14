module.exports = {
    theme: {
        extend: {
          transitionProperty: {
              'width': 'width',
              'height': 'height'
          },
          colors: {
            pud_green: '#477A7C',
            pud_gray: '#E7E7E7'
          },
          fontFamily: {
            lato: ["Lato"]
          },
          transitionTimingFunction: {
            'search-in-out': 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
            'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
            'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
           },
           backgroundImage: theme => ({
            'car-1': "url('../images/hero.jpg')",
           })
        },

    },
    variants: {
      extend: {
        width: ['focus-within', 'hover', 'focus'],
        padding: ['focus'],
        transitionTimingFunction: ['hover', 'focus'],
        transform: ['hover', 'focus'],
      }
    },
}