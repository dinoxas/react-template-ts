import dayjs from 'dayjs';
import './ExpensesTable.scss'
import { expensesDataType, useExpensesData } from '../../hooks/useExpensesData';


export const ExpensesTable = () => {
  const { data, loading } = useExpensesData();

  if (loading) {
    return (
      <div className='loader'>Loading...</div>
    );
  }

  // more semantic to use a <table> but used flexbox instead for a demo purpose
  // the easiest way would be to use util classes of tailwind, bootstrap etc
  return (
    <div className='expenses-table'>
      <h1>Expenses</h1>
      <div className='table'>
        <div className='headings'>
          <div className='cell heading'>Date</div>
          <div className='cell heading'>Merchant</div>
          <div className='cell heading'>Amount</div>
          <div className='cell heading'>Category</div>
          <div className='cell heading'>Description</div>
          <div className='cell heading'>Status</div>
        </div>
        <div>
          {
            // todo: move to separate file/component
            data?.map(({ date, merchant, amount, category, description, id, status }: expensesDataType) => (
              <div key={id} className='row'>
                <div className='cell'>
                  <div className='heading-mobile'>Date</div>
                  <div>{dayjs(date).format('MMMM D')}</div>
                </div>
                <div className='cell'>
                  <div className='heading-mobile'>Merchant</div>
                  <div>{merchant}</div>
                </div>
                <div className='cell'>
                  <div className='heading-mobile'>Amount</div>
                  <div>£{amount.toLocaleString()}</div>
                </div>
                <div className='cell'>
                  <div className='heading-mobile'>Category</div>
                  <div>{category}</div>
                </div>
                <div className='cell'>
                  <div className='heading-mobile'>Description</div>
                  <div>{description}</div>
                </div>
                <div className='cell'>
                  <div className='heading-mobile'>Status</div>
                  <div>{status}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
