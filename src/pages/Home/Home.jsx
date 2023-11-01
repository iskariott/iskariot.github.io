import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import st from './Home.module.scss';

const PROJECTS = {
  apt: 'APTOS',
  zk: 'ZKSYNC',
  stark: 'STARKNET',
};

export default function Home() {
  const data = useSelector((state) => state.red.table.data);
  return (
    <div className={st.wrapper}>
      <div className={st.wrapper2}>
        {Object.keys(data).map((key) => {
          if (!data[key].total?.wallets) return <></>;
          return (
            <div key={uuidv4()} className={st.container}>
              <span className={st.head}>{PROJECTS[key]}</span>
              <span>
                Wallets:
                <span className={st.text}>{data[key].total.wallets}</span>
              </span>
              <span>
                Balance:
                <span className={st.text}>{'$' + data[key].total.balance?.toFixed(2)}</span>{' '}
              </span>
              <span>
                Gas burned:
                <span className={st.text}>{'$' + data[key].total.gas?.toFixed(2)}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// export default function Home() {
//   const data = useSelector((state) => state.red.table.data);
//   const aptos = data.apt.total;
//   return (
//     <div className={st.wrapper}>
//       <div className={st.wrapper2}>
//         {Array.from(Array(1)).map((itm) => (
//           <div className={st.container}>
//             <span className={st.head}>ZKSYNC</span>
//             <span>Wallets: {aptos.wallets}</span>
//             <span>Balance: {aptos.balance?.toFixed(2)}</span>
//             <span>Gas burned: {aptos.gas?.toFixed(2)}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
