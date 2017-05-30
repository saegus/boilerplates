import Inferno from 'inferno';
import './style.scss';

export default props =>
  <button className={`ExampleButton ${props.className}`} type={props.type} onClick={props.onClick}>
    {props.children}
  </button>
;
