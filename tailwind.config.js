module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            width:{
                "1000":"1000px"
            },
            maxWidth:{
                "600":"600px",
                "800":"800px",
                "1000":"1000px",
                "1200":"1200px",
                "1300":"1300px",
                "1400":"1400px",
            },
            minHeight:{
                "120":"120px",
                "100":"100px",
                "70":"70px",
                "50":"50px"
            },
            textColor:{
                "black":"#424242"
            },
            fontFamily: {
                'noto-regular': ['noto-regular'],
                'noto-bold': ['noto-bold'],
                'noto-black': ['noto-black'],
                'noto-thin': ['noto-thin'],
                'noto-light': ['noto-light'],
                'noto-medium': ['noto-medium'],
                'pacifico': ['pacifico'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
