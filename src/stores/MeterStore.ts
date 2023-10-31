import {makeAutoObservable} from "mobx";
import API from "../api/API.ts";
import {CarbonIntensity, IntervalData, Meter} from "../types/api.types.ts";
import {DateTime} from "luxon";


class MeterStore {

  meters: Map<string, Meter> = new Map();
  meterData: Map<string, IntervalData[]> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  setMeter(key: string, meter: Meter){
    this.meters.set(key, meter)
  }

  setMeterData(key: string, data: IntervalData[]){
    this.meterData.set(key, data);
}

  fetchAll(){
    return API.fetchAllMeters()
      .then((customers) => {
        customers.forEach((meter) => {
          this.setMeter(meter._id, meter);
        })
      })
  }

  metersForCustomer(customerId: string){
    return [...this.meters.entries()].filter(([, meter]) => {
      return meter.customer._id === customerId
    })
  }

  fetchMeter(meterId: string){
    return API.fetchMeterData(meterId)
      .then((intervals) => {
        console.log(intervals);
        this.setMeterData(meterId, intervals)
      })
  }

  totalUsageForMeter(meterId: string){
    const meter = this.meterData.get(meterId);
    if(meter){
      const start = DateTime.fromJSDate(new Date('2023-01-01')).toMillis();
      const end = DateTime.fromJSDate(new Date('2023-02-01')).toMillis();
      const intervals = meter.filter((interval) => {
        const timestamp = DateTime.fromISO(interval.start_interval).toMillis();
        return timestamp >= start && timestamp <= end;
      });
      return intervals.reduce((prev, curr) => {
        return prev + parseInt(curr.consumption);
      }, 0)
    }
    return 0;
  }

  totalEmissionForMeter(meterId: string, intensities: Map<string, CarbonIntensity>){
    const meter = this.meterData.get(meterId);
    let total = 0;
    if(meter){
      const start = DateTime.fromJSDate(new Date('2023-01-01')).toMillis();
      const end = DateTime.fromJSDate(new Date('2023-02-01')).toMillis();
      const intervals = meter.filter((interval) => {
        const timestamp = DateTime.fromISO(interval.start_interval).toMillis();
        return timestamp > start && timestamp < end;
      });
      return intervals.reduce((prev, curr) => {
        const key = DateTime.fromJSDate(new Date(curr.start_interval)).toFormat("yyyy-MM-dd'T'HH:mm'Z'");
        const intensity = intensities.get(key);
        const consumption = parseInt(curr.consumption)
        if(intensity){
          /**
           * We need to multiply the consumption (kwH) by the intensity (gCO2/kwH) to calculate the emission for each 30 minute segment.
           */
          return prev + (consumption * intensity.intensity.actual);
        }
        return prev;
      }, 0)
    }
    return total;
  }

}

const store = new MeterStore();
export default store
