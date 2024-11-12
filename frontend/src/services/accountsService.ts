import api from '../api';

interface Account {
  id: number;
  accountName: string;
  balance: number;
  // Add other fields as needed
}

export const getAccounts = async (): Promise<Account[]> => {
  return api('/api/accounts/');
};

export const addAccount = async (accountData: Omit<Account, 'id'>) => {
  return api('/api/accounts/', {
    method: 'POST',
    body: accountData,
  });
};
