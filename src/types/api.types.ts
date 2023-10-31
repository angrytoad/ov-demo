/**
 * Take these typings with a pinch of salt as these are guessed from the API docs.
 */

export enum ObjectType {
  METER = 'meter',
  CUSTOMER = 'customer'
}

export type IntervalData = {
  consumption: string,
  consumption_units: string,
  customer_id: string,
  meter_id: string,
  meter_number: string,
  start_interval: string,
}

export type Meter = {
  _id: string,
  object: ObjectType,
  account: string,
  meter_number: string,
  customer: Customer,
  address: string,
  updated_frequency: string,
  data_source: string,
  status: string,
  notes: string[],
  created_at: string,
  description: string,
}

export type Customer = {
  _id: string,
  object: ObjectType,
  account: string,
  name: string,
  email: string,
  address?: string,
  notes: string[],
  created_at: string,
}

/**
 * Types for national grid api
 */
export type CarbonIntensity = {
  from: string,
  to: string,
  intensity: {
    forecast: number,
    actual: number,
    index: string,
  }
}

export enum Fuel {
  GAS = 'gas',
  COAL = 'coal',
  BIO = 'biomass',
  NUCLEAR = 'nuclear',
  HYDRO = 'hydro',
  IMPORTS = 'imports',
  OTHER = 'other',
  WIND = 'wind',
  SOLAR = 'solar'
}

export type Mix = {
  fuel: Fuel,
  perc: number,
}

export type EnergyMix = {
  from: string,
  to: string,
  generationmix: Mix[],
}
