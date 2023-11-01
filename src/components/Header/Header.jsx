import { NavLink } from 'react-router-dom';
import st from './Header.module.scss';
import HomeIcon from '@mui/icons-material/Home';

export default function Header() {
  return (
    <header>
      <nav className={st.container}>
        <NavLink
          className={({ isActive }) => (isActive ? [st.link, st.active].join(' ') : st.link)}
          to={'/'}>
          <HomeIcon className={st.home} />
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? [st.link, st.active].join(' ') : st.link)}
          to={'zksync'}>
          Zksync
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? [st.link, st.active].join(' ') : st.link)}
          to={'starknet'}>
          Starknet
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? [st.link, st.active].join(' ') : st.link)}
          to={'aptos'}>
          Aptos
        </NavLink>
      </nav>
    </header>
  );
}
