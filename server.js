var express = require('express'),
    app     = express();

app
    .use(express.static('./dist'))
    .listen(3030);

