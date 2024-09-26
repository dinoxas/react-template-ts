import { useEffect, useState } from 'react';
import { mockData } from '../mockData';

export type expensesDataType = {
    id: number;
    merchant: string;
    amount: number;
    description: string;
    date: string;
    category: 'training' | 'travel' | 'meal';
    status: string;
};

export const useExpensesData = () => {
    const [data, setData] = useState<expensesDataType[]>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const loadExpensesData = async() => {
      try {
        const response = await fetch('https://expenses-backend-mu.vercel.app/expenses', {
          // https://caniuse.com/mdn-api_abortsignal_timeout_static
          signal: AbortSignal.timeout(5000),
          headers: {
            'Content-Type': 'application/json',
            Username: 'dinoxas'
          }
        });

        const expensesData = await response.json();

        if (Array.isArray(expensesData)) {
          setData(expensesData);
          setLoading(false);
        } else {
          // Uses mock data if response is rubbish!
          setData(mockData as expensesDataType[]);
          setLoading(false);
          throw new Error('Response is not an array');
        }
      } catch (error) {
        // Timeouts if the request takes longer than 5 seconds
        // Uses mock data if it times out or api fails
        setData(mockData as expensesDataType[]);
        setLoading(false);
        throw new Error('Timeout or API failure');
      }
    }
    loadExpensesData();
  }, []);

  return {
    data,
    loading
  }
}