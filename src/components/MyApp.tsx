import React from 'react';
import SwapGrid from './ComponentsGrid';
import ButtonAppBar from './ButtonAppBar';
import MySorobanReactProvider from '../MySorobanReactProvider';


export default function MyApp() {
  return (
      <MySorobanReactProvider>
        <ButtonAppBar/>
        <SwapGrid/>
      </MySorobanReactProvider>
  )
}
