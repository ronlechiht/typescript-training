//Import
import { GeneralInformationService } from '../services/generalInformationService';

const generalService = new GeneralInformationService();

//Display general information in general table
export async function displayGeneralInformation(): Promise<void> {
  const generalInformation = await generalService.getGeneralInformation();

  //General information HTML DOM elements
  const totalCustomers = document.querySelector('.customers-quantity')!;
  const totalActiveCustomers = document.querySelector('.active-quantity')!;

  totalCustomers.innerHTML = generalInformation.totalCustomers;
  totalActiveCustomers.innerHTML = generalInformation.totalActiveCustomers;
}
