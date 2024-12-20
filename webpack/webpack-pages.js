// automation for `HtmlWebpackPlugin`

// Notes:
// - remember to restart server after new page added
// - link on the html must be with .html suffix (i.g. <a href="/about.html">About</a>)

const pages = [
  {
    title: 'Home page',
    template: 'index.html',
    filename: 'index.html',

    // you can pass a hash of configuration options to html-webpack-plugin.
    // Allowed values are as follows:
    // read more: https://github.com/jantimon/html-webpack-plugin#options
  },
];

module.exports = pages;
