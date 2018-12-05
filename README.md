# 🔮 Crystalball

Crystalball is a web app project scaffolding tool powered with [Gulp](https://gulpjs.com) for frontend development. Out-of-the box it has:

- [`pug`](https://pugjs.org/api/getting-started.html) templating
- [`sass`](https://sass-lang.com/) styling
- [`webpack`](https://webpack.js.org/) bundler with [TypeScript](https://www.typescriptlang.org/) support

# Getting started
- Clone and install dependencies via npm:
```
git clone https://github.com/lyutkin/crystalball.git
cd crystalball && npm install && npm start
```

# Commands
- `npm start` start web server with hot reloading
- `npm test` run tests
- `npm run prod` make build in `dist` folder
- `npm run zip` archive of `dist` folder

# Vendor

Put vendor files in `src/vendor/js` or `src/vendor/css`. Files `*.dev.[js|css]` go for development vendor bundle, `*.prod.[js|css]` for production. It comes in handy if you want to specify separate files for development and production.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
