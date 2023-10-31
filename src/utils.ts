export function extractPostcode(address: string){
  return address.split(",").map(s => s.trim().match(/[A-Za-z]{1,2}\d{1,2}(?:\s?(?:\d?\w{2}))?/)).filter(e => e);
}
