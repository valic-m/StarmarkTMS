import api from '../api';

interface Company {
  id: number;
  name: string;
  industry: string;
  // Add other fields as needed
}

export const getCompanies = async (): Promise<Company[]> => {
  return api('/api/companies/');
};

export const addCompany = async (companyData: Omit<Company, 'id'>) => {
  return api('/api/companies/', {
    method: 'POST',
    body: companyData,
  });
};
