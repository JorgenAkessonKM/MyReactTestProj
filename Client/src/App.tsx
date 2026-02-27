import "./App.css";

import Header from "./Components/Header/Header";
import Content from "./Components/Content/Content";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Security } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";
import AuthProvider from "./contexts/AuthProvider";

const oktaAuth = new OktaAuth({
  issuer: import.meta.env.VITE_OKTA_DOMAIN,
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  redirectUri: import.meta.env.VITE_OKTA_REDIRECT_URI,
});

export default function App() {
  const restoreOriginalUri = async (
    _oktaAuth: OktaAuth,
    originalUri: string,
  ) => {
    window.location.replace(originalUri || "/");
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Header />
              <Content />
              <Footer />
            </div>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </Security>
  );
}
