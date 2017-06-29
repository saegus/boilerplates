import React from "react";

import ExampleMolecule from "components/molecules/ExampleMolecule";
import ExampleAtom from "components/atoms/ExampleAtom";

import "./style.scss";

export default ({ name, onClick, showAtom, message }) =>
  <div className="ExampleTemplate">
    <h1>{name}</h1>
    <ExampleMolecule type="button" onClick={onClick}>
      {/* Escape syntaxically ambiguous strings between {' ... '} */}
      {"Click there -->"}
    </ExampleMolecule>
    {/* ExampleAtom is only displayed when showAtom is present. */}
    {!!showAtom && <ExampleAtom />}
    <b>{message}</b>
  </div>;
