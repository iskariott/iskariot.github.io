import st from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={st.container}>
      <span className={st.loader}></span>
    </div>
  );
}
