const path = require('path');

const dirs = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
};

const subDirs = {
  assets: 'assets/',
  images: 'assets/images',
  fonts: 'assets/fonts',
  styles: 'assets/styles',
  scripts: 'assets/scripts',
};

module.exports = {
  ...dirs,
  ...subDirs,
};
