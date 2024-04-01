//Import
import { GENERAL_API } from '../../constants/constants';
import { HttpService } from '../../services/httpServices';
import { GeneralInformation } from '../../types/generalInformationType';

//General information HTML DOM elements
const totalCustomers = document.querySelector('.customers-quantity')!;
const totalActiveCustomers = document.querySelector('.active-quantity')!;

//Get general information from API
async function getGeneralInformation(): Promise<GeneralInformation> {
  const res = await HttpService.get(GENERAL_API);
  const totalCustomers = res[0]['totalCustomers'];
  const totalActiveCustomers = res[0]['totalActiveCustomers'];
  return { totalCustomers, totalActiveCustomers };
}

//Display general information in general table
export async function displayGeneralInformation(): Promise<void> {
  const generalInformation = await getGeneralInformation();

  totalCustomers.innerHTML = generalInformation.totalCustomers;
  totalActiveCustomers.innerHTML = generalInformation.totalActiveCustomers;
}
