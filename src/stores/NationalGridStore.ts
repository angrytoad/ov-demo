import {makeAutoObservable} from "mobx";
import {CarbonIntensity, EnergyMix, Fuel} from "../types/api.types.ts";
import API from "../api/API.ts";
import {DateTime} from "luxon";


class NationalGridStore {

  intensities: Map<string, CarbonIntensity> = new Map<string, CarbonIntensity>();
  energyMix: Map<string, EnergyMix> = new Map<string, EnergyMix>();

  constructor() {
    makeAutoObservable(this);
  }

  setIntensity(timestamp: string, intensity: CarbonIntensity){
    this.intensities.set(timestamp, intensity);
  }

  setEnergyMix(timestamp: string, energyMix: EnergyMix) {
    this.energyMix.set(timestamp, energyMix);
  }

  fetchCarbonIntensities(from: string | null, to:string | null){
    return API.fetchCarbonIntensities(from, to)
      .then((carbonIntensities) => {
        carbonIntensities.forEach((carbonIntensity: CarbonIntensity) => {
          this.setIntensity(DateTime.fromISO(carbonIntensity.from).toFormat("yyyy-MM-dd'T'HH:mm'Z'"), carbonIntensity)
        })
      })
  }

  fetchEnergyMixes(from: string | null, to: string | null) {
    return API.fetchEnergyMixes(from, to)
      .then((energyMixes) => {
        energyMixes.forEach((energyMix: EnergyMix) => {
          this.setEnergyMix(DateTime.fromISO(energyMix.from).toFormat("yyyy-MM-dd'T'HH:mm'Z'"), energyMix)
        })
      })
  }


  averagedEnergyMix(from: string, to:string){
    const start = DateTime.fromJSDate(new Date(from)).toMillis();
    const end = DateTime.fromJSDate(new Date(to)).toMillis();
    const mixes = [...this.energyMix.entries()].filter(([, mix]) => {
      const timestamp = DateTime.fromISO(mix.from).toMillis();
      return timestamp >= start && timestamp <= end;
    });
    const totals = {
      [Fuel.BIO]: 0,
      [Fuel.GAS]: 0,
      [Fuel.COAL]: 0,
      [Fuel.HYDRO]: 0,
      [Fuel.IMPORTS]: 0,
      [Fuel.NUCLEAR]: 0,
      [Fuel.OTHER]: 0,
      [Fuel.SOLAR]: 0,
      [Fuel.WIND]: 0,
    }
    mixes.forEach(([,mix]) => {
      mix.generationmix.forEach((fuel) => {
        totals[fuel.fuel] += fuel.perc;
      })
    })
    Object.keys(totals).forEach((key) => {
      totals[key as Fuel] = (totals[key as Fuel]/mixes.length)
    })
    return totals;
  }

}

const store = new NationalGridStore();
export default store
