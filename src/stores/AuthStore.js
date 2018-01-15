import { UserAgentApplication } from "msal";
import { observable } from "mobx";
import Http from "utils/Http";

import mockUser from "./mocks/auth.json";

const GRAPH_API = "https://graph.microsoft.com/v1.0/me";
const SCOPES = ["https://graph.microsoft.com/user.read"];

export default class AuthStore {
  @observable user = null;
  constructor() {
    // App initialization
    this.userAgentApplication = new UserAgentApplication(
      process.env.SSO.appId,
      null,
      // This callback is called whenever a login is attempted
      (errMessage, token, err, tokenType) => {
        if (errMessage) console.error(msal.authority, err, errMessage);
        else this.callAuth();
      },
      {
        redirectUri: location.origin
      }
    );
    // Automatically redirect to the next page if already authed
    const user = this.userAgentApplication.getUser();
    if (user) this.callAuth();
  }
  callAuth() {
    // Check if user is authenticated
    const user = this.userAgentApplication.getUser();
    // If they are not authenticated, redirect to the O365 login page for the appropriate scopes.
    if (!user) this.userAgentApplication.loginRedirect(SCOPES);
    else {
      // Else, they are already logged in. In this case, retrieve their info.
      this.userAgentApplication
        .acquireTokenSilent(SCOPES)
        .then(token =>
          // https://graph.microsoft.com/v1.0/me gets the full information about
          // the authenticated user, including phone number, office location, etc...
          Http.get(GRAPH_API, null, {
            headers: { Authorization: `Bearer ${token}` }
          })
        )
        .then(user => {
          this.user = { email: user.mail, name: user.displayName };
        });
    }
  }
  logIn() {
    // Try to see if the user is already authenticated. If so, populate the user object.
    const user = this.userAgentApplication.getUser();
    if (!user) this.callAuth();
    else {
      // this.user = { email: user.displayableId, name: user.name };
    }
  }
  logOut() {
    // Redirect to Office 365's logout
    this.userAgentApplication.logout();
  }
}
