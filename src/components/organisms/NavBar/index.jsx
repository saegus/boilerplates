import React from "react";

import { tl, setLanguage } from "utils/Translations";

import Logo from "components/atoms/Logo";
import LinkButton from "components/atoms/LinkButton";
import SearchInput from "components/molecules/SearchInput";

import "./style.scss";

export default ({ user, onSearch, onLogOut }) =>
  user &&
  <div className="NavBar">
    <Logo />
    <SearchInput placeholder={tl("SEARCH")} onSearch={onSearch} />
    <div className="NavBar__user">
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
    <div className="NavBar__actions">
      <div>
        <LinkButton onClick={() => setLanguage("fr")}>
          FR
        </LinkButton>&nbsp;&nbsp;
        <LinkButton onClick={() => setLanguage("en")}>EN</LinkButton>
      </div>
      <LinkButton onClick={onLogOut}>{tl("LOG_OUT")}</LinkButton>
    </div>
  </div>;
