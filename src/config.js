const config = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: '/tips',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    theme: 'light', // light, dark
    presetColor: 'theme5', // default, theme1, theme2, theme3, theme4, theme5, theme6
    i18n: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    jwt: {
        secret: 'SECRET-KEY',
        timeout: '1 days'
    },
    firebase: {
        apiKey: 'AIzaSyCSNGOw9MXS8QbsC0vtxw274vuCQXgglY0',
        authDomain: 'tiptiptop-2c60f.firebaseapp.com',
        projectId: 'tiptiptop-2c60f',
        storageBucket: 'tiptiptop-2c60f.appspot.com',
        messagingSenderId: '123700552642',
        appId: '1:123700552642:web:c82d553e75a74ac6a02c5b',
        measurementId: 'G-YPZEBYKQXP'
    },
    auth0: {
        client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
        domain: 'dev-w0-vxep3.us.auth0.com'
    }
};

export default config;
