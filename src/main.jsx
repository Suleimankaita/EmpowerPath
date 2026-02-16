import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import { store } from './components/Features/Store.jsx'
// import ScrollToTop from './User/ScrollTo.jsx'
// import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* <Auth0Provider
      domain="dev-y7oc2w2k2cibsf76.us.auth0.com"
      clientId="qJ5ehWK5NkfYDMTrT3tqTSxWQrBPWCXn"
      authorizationParams={{ redirect_uri: window.location.origin }}
    > */}
    {/* <App /> */}
    {/* <Provider store={store}> */}
      <Router>
        <Routes>
          
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    {/* </Provider> */}
  {/* </Auth0Provider> */}
  </StrictMode>
)
