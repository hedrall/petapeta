import Vue from 'vue';

export default ({app}, inject) => {
     (function (d, s, id) {
            var t, js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
            return window.twttr || (t = {_e: [], ready: function (f) { t._e.push(f) }});
     }(document, "script", "twitter-wjs"));

     const interval = setInterval( _ => {
         if ( window.twttr ) {
             clearInterval( interval );
             Vue.prototype.$twttr = window.twttr;
         }
     }, 100);
};
