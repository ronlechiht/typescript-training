//Import
import { GENERAL_API } from '../constants/constants';
import { HttpService } from '../services/httpServices';
import { GeneralInformation } from '../types/generalInformationType';

const generalService = new HttpService(GENERAL_API);

//Get general information from API
async function getGeneralInformation(): Promise<GeneralInformation> {
  const res = await generalService.get();
  return res[0] as GeneralInformation;
}

//Display general information in general table
export async function displayGeneralInformation(): Promise<void> {
  const generalInformation = await getGeneralInformation();

  //General information HTML DOM elements
  const totalCustomers = document.querySelector('.customers-quantity')!;
  const totalActiveCustomers = document.querySelector('.active-quantity')!;

  totalCustomers.innerHTML = generalInformation.totalCustomers;
  totalActiveCustomers.innerHTML = generalInformation.totalActiveCustomers;
}
