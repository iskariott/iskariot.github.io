import { NavLink } from 'react-router-dom';
import st from './Header.module.scss';

export default function Header() {
  return (
    <header>
      <nav className={st.container}>
        <NavLink
          className={({ isActive }) => (isActive ? [st.link, st.active].join(' ') : st.link)}
          to={'starknet'}>
          Starknet
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? [st.link, st.active].join(' ') : st.link)}
          to={'zksync'}>
          Zksync
        </NavLink>
      </nav>
    </header>
  );
}
