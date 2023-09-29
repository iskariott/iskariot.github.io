import { Button } from '@mui/material';
import st from './StButton.module.scss';

export default function StButton(props) {
  return (
    <Button variant="contained" {...props} className={st.btn}>
      {props.children}
    </Button>
  );
}
