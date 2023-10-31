import CustomerStore from './CustomerStore.ts';
import MeterStore from "./MeterStore.ts";
import NationalGridStore from "./NationalGridStore.ts";
import {createContext} from "react";

export const AppContext = createContext({
  CustomerStore,
  MeterStore,
  NationalGridStore,
});

