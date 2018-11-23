import browserSync from 'browser-sync';

const server = browserSync.create();

export const stream = server.stream;

export const reload = done => {
  server.reload();
  done();
};

export const serve = done => {
  server.init({
    notify: false,
    port: 9000,
    logLevel: 'silent',
    server: {
      baseDir: 'dev',
    },
  });
  done();
};
