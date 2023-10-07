import { Button } from '@mui/material';

export default function StButton(props) {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      sx={{ ...props.sx, bgcolor: '#1a2229', ':hover': { bgcolor: '#202a33' } }}>
      {props.children}
    </Button>
  );
}
