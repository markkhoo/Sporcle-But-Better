module.exports = {
    format_country_num: (id) => {
        switch (id) {
            case 1: return 57;
            case 2: return 44;
            case 3: return 27;
            case 4: return 57;
            case 5: return 38;
            case 6: return 13;
            case 7: return 2;
        }
    },
    format_best_time: (s) => {
        // Pad to 2 or 3 digits, default is 2
        function pad(n, z) {
            z = z || 2;
            return ('00' + n).slice(-z);
        };

        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
    },

};



// const exphbs = require('express-handlebars');
// const { handlebars } = exphbs.create({});

// handlebars.registerHelper('ifEquals', function(conditional, options){
//     if (options.hash.value === conditional) {
//         return options.fn(this);
//     } else {
//         return options.inverse(this);
//     }
// });

// module.exports = handlebars;