module.exports = {
	theme: {
		backgroundPosition: {
			'bg-image-y': 'center top 1rem',
		},
		extend: {
			screens: {
				xs: '280px',
			},
			transitionProperty: {
				width: 'width',
				height: 'height',
			},
			colors: {
				pud_green: '#477A7C',
				pud_light_green: '#b5cacb',
				pud_gray: '#E7E7E7',
				pud_dark_gray: '#C4C4C4',
				pud_green_sec: '#DEF2F1',
				pud_red: '#C53B33',
			},
			fontFamily: {
				lato: ['Lato'],
			},
			height: (theme) => ({
				'screen-3/5': '60vh',
				'screen-3/4': '75vh',
				'screen-4/5': '90vh',
				'screen/2': '50vh',
				'screen/3': 'calc(100vh / 3)',
				'screen/4': 'calc(100vh / 4)',
				'screen/5': 'calc(100vh / 5)',
			}),
			transitionTimingFunction: {
				'search-in-out': 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
				'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
			},
			backgroundImage: (theme) => ({
				'car-1': "url('../images/hero.png')",
				'wave-pattern': "url('../images/wave-pattern.svg",
			}),
		},
	},
	variants: {
		extend: {
			width: ['focus-within', 'hover', 'focus'],
			padding: ['focus'],
			transitionTimingFunction: ['hover', 'focus'],
			transform: ['hover', 'focus'],
			display: ['group-hover'],
		},
	},
};
