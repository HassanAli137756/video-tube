import React, { useEffect, useState } from 'react'
//import  './App.css'
import axios from 'axios'
import {UpdatePassword} from './authServices/UpdatePassword'
import { Register } from './authServices/Register';
import {UpdateAccoutDetails} from './authServices/UpdateAccountDetails'
import { Header } from './Routing/Header';
import { Provider } from 'react-redux';
import {store} from './Redux/store'
import { MyContent } from './components/MyContent';


function App() 
{

  return (
    <div>
      <Provider store={store} >
      <MyContent />
      </Provider>
    </div>
  );
}

export default App