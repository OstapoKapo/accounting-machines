'use client'

import { Provider } from "react-redux";
import {store} from './store';

interface Providers {
    children: any
}

export function Providers({children}: any){
 return(
    <Provider store={store}>
        {children}
    </Provider>
 )
}