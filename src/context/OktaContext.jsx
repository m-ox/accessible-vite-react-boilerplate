import { useNavigate, useLocation } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

export const OktaProvider = ({ children }) => {
    const navigate = useNavigate();

    const domain = import.meta.env.VITE_OKTA_DOMAIN;
    const clientId = import.meta.env.VITE_OKTA_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_OKTA_REDIRECT_URI;

    if (!domain || !clientId || !redirectUri) {
        console.error("Missing Auth0 environment variables");
        return null;
    }

    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || "/dashboard", { replace: true });
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
            }}
            onRedirectCallback={onRedirectCallback}
            cacheLocation="localstorage"
            useRefreshTokens
        >
            {children} </Auth0Provider>
    )
};

export const useOkta = () => useAuth0();