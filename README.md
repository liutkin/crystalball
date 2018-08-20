# Overview

`jackinthebox` is a frontend project scaffolding tool to get web development quickly up and running. Out of the box it has:

- [`pug`](https://pugjs.org/api/getting-started.html) HTML templating.
- [`sass`](https://sass-lang.com/) CSS styling.
- [`imagemin`](https://github.com/imagemin/imagemin) for images optimization.
- [`faker`](https://github.com/marak/Faker.js/) to pull off some random simple content.
- [`webpack`](https://webpack.js.org/) for JS modules.
- [`jest`](https://facebook.github.io/jest/) for JS testing.

# Getting started
- Clone the repository and install all dependencies via npm:
```
git clone https://github.com/lyutkin/jackinthebox.git
cd jackinthebox
npm install && npm start
```

- Commands:
	- `npm start` starts web server with hot reloading.
	- `npm test` runs tests.
	- `npm run prod` makes a production build.
	- `npm run zip` makes a `.zip` archive of `dist` folder.
