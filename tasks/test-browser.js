import path from 'path';
import karma from 'karma';

export const Server = karma.Server;
export default function ( configFile ) {
  return callback => {
    (new Server({
      configFile: path.join(__dirname, '../karma.conf.js')
    }, callback)).start();
  };
}