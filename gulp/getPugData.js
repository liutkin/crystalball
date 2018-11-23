export default () => {
  const data = require('../src/pug/local/data');
  delete require.cache[require.resolve('../src/pug/local/data')]; // prevent module caching

  return data;
};
