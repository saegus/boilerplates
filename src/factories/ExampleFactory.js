/*
  An example of a factory that grabs/sends data to a server via HTTP requests.
  Example usage in handlers:
  ```
  import { getSomething } from 'factories/ExampleFactory';

  export default class SomeComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { result: {} };
      getSomething()
      .then(result => this.setState({ result }));
    }
    render() ...
  }
  ```
*/

import Http from 'utils/Http';

const getSomething = () => Http.get('/api/something');
const postSomething = params => Http.post('/api/something', params);

export { getSomething, postSomething };
