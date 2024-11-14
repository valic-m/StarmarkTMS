import api from '../api';

interface AccountingRecord {
  id: number;
  description: string;
  amount: number;
  // Add other fields as needed
}

export const getAccountingRecords = async (): Promise<AccountingRecord[]> => {
  return api('/api/accounting/');
};

export const addAccountingRecord = async (
  recordData: Omit<AccountingRecord, 'id'>
) => {
  return api('/api/accounting/', {
    method: 'POST',
    body: recordData
  });
};
