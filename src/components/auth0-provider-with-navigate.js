import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const redirectUri =  window.location.origin + "/dashboard";

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };


  return (
    <Auth0Provider
    domain="dev-1wecvjynzqyw78g0.us.auth0.com"
    clientId="NSaedQleuwPbqfdgR6RF5PTX9T7hvRS4"
    authorizationParams={{
      redirect_uri: redirectUri,
      audience: "https://dev-1wecvjynzqyw78g0.us.auth0.com/api/v2/"
    }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};