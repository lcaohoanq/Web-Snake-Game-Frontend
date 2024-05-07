// import scss
import importAll from './util/importAll';

// import scss
importAll(require.context('./styles/', true, /scss/i));

// import ts
importAll(require.context('./components/', true, /ts/i));

// import image
importAll(require.context('./assets/images', false, /\.(gif|png|jpe?g|svg|ico)$/i));

// import sound
importAll(require.context('./assets/sounds', false, /\.(wav)$/i));

// import constants
importAll(require.context('./constants/', true, /ts/i));

// import util
importAll(require.context('./util/', true, /ts/i));

// import model
importAll(require.context('./models/', true, /ts/i));
