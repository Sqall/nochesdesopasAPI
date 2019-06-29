const express = require('express');
const router = express.Router();


router.get('/',(req,res,next) => {
    /*res.status(200).json({
        message:'Backend Endpoints',
        endpoints: router.stack//CAN CREATE NEW OBJECT TO RETURN
    });*/
    console.log(router.stack);
    res.status(200).json({});
        //.map(r=>r.route).filter(r=>r).map(r=>${Object.keys(r.methods).join(', ')}${r.path}));
});

/*function print (path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
      console.log('%s /%s',
        layer.method.toUpperCase(),
        path.concat(split(layer.regexp)).filter(Boolean).join('/'))
    }
  }
  
  function split (thing) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : '<complex:' + thing.toString() + '>'
    }
  }

    router.stack.forEach(print.bind(null, []));

  
  */


module.exports = router;