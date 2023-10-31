import {makeAutoObservable} from "mobx";
import API from "../api/API.ts";
import {Customer} from "../types/api.types.ts";


class CustomerStore {

  customers: Map<string, Customer> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  setCustomer(key: string, customer: Customer){
    this.customers.set(key, customer);
  }

  fetchAll(){
    return API.fetchAllCustomers()
      .then((customers) => {
        console.log(customers);
        customers.forEach((customer) => {
          this.setCustomer(customer._id, customer);
        })
      })
  }

}

const store = new CustomerStore();
export default store
