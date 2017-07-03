import { observable } from "mobx";

import mockUser from "./mocks/auth.json";

export default class AuthStore {
  @observable user = mockUser || null;
  logIn({ email, password }) {
    this.user = { id: 1, email };
  }
  logOut() {
    document.location.hash = "";
    this.user = null;
  }
}
