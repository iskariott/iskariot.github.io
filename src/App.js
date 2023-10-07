import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ManageWallets from './components/ManageWallets/ManageWallets';
import WalletsTable from './components/Table/Table';
import StButton from './components/StButton/StButton';
import getStark from './utils';
import './App.scss';

function App() {
  const [isModalOpen, setModal] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const input = useSelector((state) => state.red.input.data);

  const formatInputData = (input) => {
    return input.split(/\r?\n/).flatMap((itm) => {
      const tmp = itm.split(' ');
      if (tmp[0].slice(0, 2) === '0x') return { label: '', address: tmp[0] };
      else return { label: tmp[0], address: tmp[1] };
    });
  };

  useEffect(() => {
    (async () => {
      console.log('update');
      if (!input) return;
      setTableRows([]);
      const formatedInput = formatInputData(input);
      for (let i = 0; i < formatedInput.length; i++) {
        const resp = await getStark(formatedInput[i].address);
        setTableRows((prev) => [
          ...prev,
          {
            number: i + 1,
            label: formatedInput[i].label,
            balance: resp.balance.total,
            offbridge: resp.bridge.DepositTx ? 'yes' : 'no',
            volume: resp.volume,
            txs: resp.tx,
            fee: resp.fee,
            contract: resp.activity.contractActivity,
            mwd: `${resp.activity.monthActivity}/${resp.activity.weekActivity}/${resp.activity.dayActivity}`,
            witm: resp.witm,
            collapse: {
              address: formatedInput[i].address,
              balance: resp.balance.tokens,
              transactions: resp.transactions,
            },
            result: resp.result,
          },
        ]);
      }
    })();
  }, [input]);
  return (
    <div className="App">
      <StButton sx={{ mb: 1 }} onClick={() => setModal(true)}>
        manage wallets
      </StButton>
      <ManageWallets isModalOpen={isModalOpen} setModal={setModal} setTableRows={setTableRows} />
      <WalletsTable rows={tableRows} loadingData={false} />
    </div>
  );
}

export default App;
