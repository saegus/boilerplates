/*
  An emulation of ExampleFactory.js made to run without a backend
  Particularly useful for front-end exclusive developping
  Make sure to return Promises
*/

import GET from './mocks/ExampleFactory/get.json';
import POST from './mocks/ExampleFactory/post.json';

const getSomething = () => Promise.resolve(GET);
const postSomething = () => Promise.resolve(POST);

export { getSomething, postSomething };
