import Server from './server';
import log from './logHandler';

const port = parseInt(process.env.PORT || '4000');

const starter = new Server().start(port)
  .then(port => log.debug(`Running on port ${port}`))
  .catch(error => {
    console.log(error)
  });

export default starter;