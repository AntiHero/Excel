import './module';
import './scss/style.scss';

/**
 * @return {void}
 */
async function start() {
  await Promise.resolve(console.log('babel-works!!!'));
}

start();
