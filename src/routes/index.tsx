import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';

import { SignIn } from '../screens/SignIn';
import { AuthRoutes } from './auth.routes';

import { Background } from "../components/Background";

export function Routes(){
  const { user } = useAuth();

  return(

    <Background>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Background>

    // <NavigationContainer>
    //  { user.id ? <AuthRoutes /> : <SignIn /> }
    // </NavigationContainer>
  )
}