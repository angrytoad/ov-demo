import axios, {InternalAxiosRequestConfig} from "axios";
import { DateTime } from 'luxon';
import {CarbonIntensity, Customer, EnergyMix, IntervalData, Meter} from "../types/api.types.ts";

axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    request.headers.set('x-api-key', import.meta.env.OPENVOLT_API_KEY);
    request.headers.setContentType('application/json');

    return request;
  }
);

class API {

  private readonly ENDPOINT;
  constructor() {
    this.ENDPOINT = import.meta.env.OPENVOLT_API_ENDPOINT;
  }

  fetchAllCustomers(): Promise<Customer[]>{
    return axios.get(`${this.ENDPOINT}/customers`)
      .then((res) => {
        return res.data.data;
      })
  }

  fetchAllMeters(): Promise<Meter[]>{
    return axios.get(`${this.ENDPOINT}/meters`)
      .then((res) => {
        return res.data.data;
      })
  }

  fetchMeterData(meterId: string): Promise<IntervalData[]> {
    const start = DateTime.fromJSDate(new Date('2023-01-01')).toISO();
    const end = DateTime.fromJSDate(new Date('2023-02-01')).toISO();
    return axios.get(`${this.ENDPOINT}/interval-data/`, {
      params: {
        meter_id: meterId,
        granularity: 'hh',
        start_date: start,
        end_date: end,
      }
    })
      .then((res) => {
        return res.data.data;
      })
  }

  fetchCarbonIntensities(
    from: string | null,
    to: string | null,
  ): Promise<CarbonIntensity[]> {
    return axios.get(`https://api.carbonintensity.org.uk/intensity/${from}/${to}`)
      .then((res) => {
        return res.data.data;
      })
  }

  fetchEnergyMixes(
    from: string | null,
    to: string | null,
  ): Promise<EnergyMix[]> {
    return axios.get(`https://api.carbonintensity.org.uk/generation/${from}/${to}`)
      .then((res) => {
        return res.data.data;
      })
  }
}


const singleton = new API();

export default singleton;
