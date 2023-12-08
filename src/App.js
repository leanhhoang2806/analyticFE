import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInSide from './components/login';
import Dashboard from './components/dashboard';
import {AuthenticationGuard} from './components/authed-routes';
import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from './components/page-loader';
import { Auth0ProviderWithNavigate } from './components/auth0-provider-with-navigate';
import { NotFoundPage } from './components/not-found';

import './App.css';

function App() {
  return (
    <Router>
        <Auth0ProviderWithNavigate>
          <Routes>
            <Route exact path="/" element={<SignInSide/>}/>
            <Route
              path="/dashboard"
              element={<AuthenticationGuard component={Dashboard} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Auth0ProviderWithNavigate>
    </Router>
  );
}

export default App;
