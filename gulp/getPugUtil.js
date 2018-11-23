export default () => {
  const util = require('../src/pug/local/util');
  delete require.cache[require.resolve('../src/pug/local/util')]; // prevent module caching

  return util;
};
