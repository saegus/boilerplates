import Inferno from "inferno";

import "assets/images/saegus__logo.png";

import "./style.scss";

export default props =>
  <div className="ExampleAtom" {...props}>
    <div className="ExampleAtom__image-container">
      <img
        className="ExampleAtom__image"
        src="/assets/images/saegus__logo.png"
        alt="Logo Saegus"
      />
    </div>
  </div>;
