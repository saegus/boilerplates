import Inferno from 'inferno';

import ExampleButton from 'components/atoms/ExampleButton';
import ExampleAtom from 'components/atoms/ExampleAtom';

import './style.scss';

export default props =>
  <div className="ExampleMolecule">
    <div className="ExampleMolecule__label">{props.children}</div>
    <ExampleButton {...props}>
      <ExampleAtom />
    </ExampleButton>
  </div>
;
