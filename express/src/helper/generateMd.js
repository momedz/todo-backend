const fs = require('fs');
var stream = fs.createWriteStream('README.md');

const generateRoute = (path, layer) => {
  if (layer.route) {
    layer.route.stack.forEach(generateRoute.bind(null, path.concat(split(layer.route.path))));
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(generateRoute.bind(null, path.concat(split(layer.regexp))));
  } else if (layer.method) {
    const file_path = `| ${layer.method.toUpperCase()} \t| ${path.concat(split(layer.regexp)).filter(Boolean).join('/')} |\r\n`;
    stream.write(file_path);
  }
};

const split = (thing) => {
  if (typeof thing === 'string') return thing.split('/');
  else if (thing.fast_slash) return '';
  else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\/]|[^.*+?^${}()|[\]\\/])*)\$\//);
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>';
  }
};

const apply = app => {
  stream.write('# Science-mis-room-back\r\n');
  stream.write('## API LIST TABLE\r\n');
  stream.write('| TYPE | PATH |\r\n|:--:|:--|\r\n');
  app._router.stack.forEach(generateRoute.bind(null, []));
};

module.exports = {
  apply: apply,
  route: generateRoute,
};