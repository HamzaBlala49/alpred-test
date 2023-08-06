// import { useState } from 'react'
import React from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {AuthProvider} from 'react-auth-kit';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"
import AllContent from './components/AllContent';
import axios from "axios"


function App() {
  return (
    <AuthProvider 
        authType={'cookie'}
        authName={'_auth'}
        cookieSecure={window.location.protocol === "https:"}
      >
          <AllContent/>
      </AuthProvider>
  )
}

export default App
