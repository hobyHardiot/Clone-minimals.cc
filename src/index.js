// i18n

// highlight
import './utils/highlight';

// scroll bar
import 'simplebar/dist/simplebar.min.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// redux
import { store, persistor } from './redux/store';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';

// Check our docs
// https://docs-minimals.vercel.app/authentication/ts-version

// import { AuthProvider } from './contexts/Auth0Context';
// import { AuthProvider } from './contexts/FirebaseContext';
// import { AuthProvider } from './contexts/AwsCognitoContext';

//
import App from './App'; 
import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <SettingsProvider>
            <CollapseDrawerProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CollapseDrawerProvider>
          </SettingsProvider>
      </PersistGate>
    </ReduxProvider>
  </HelmetProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();