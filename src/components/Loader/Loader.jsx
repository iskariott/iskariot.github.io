import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Backdrop } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import st from './Loader.module.scss';
import Countdown from 'react-countdown';

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <></>;
  } else {
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  }
};

export default function LoadProgress() {
  const { isLoading, totalCount, loadedCount, isDelay } = useSelector(
    (state) => state.red.load.data,
  );
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (isLoading) setProgress((Number(loadedCount) * 100) / Number(totalCount));
    else if (progress) setProgress(0);
  }, [loadedCount]);

  return (
    <Backdrop className={st.backdrop} open={isLoading}>
      {isDelay ? (
        <div className={st.delayContainer}>
          <span className={st.delay}>
            Delay:
            <Countdown date={Date.now() + 90000} renderer={renderer} />
          </span>
          <span className={st.notice}>API limitation: delay after load every 30 adresses</span>
        </div>
      ) : (
        <></>
      )}

      {/* <Button variant="contained" className={st.btnStop}>
        stop loading
      </Button> */}
      <Box className={st.container}>
        <CircularProgress color="primary" variant="determinate" size={80} value={progress} />
        <Box className={st.progress}>
          <Typography variant="caption" component="div" fontSize={20}>
            {Math.round(progress) + '%'}
          </Typography>
        </Box>
      </Box>
    </Backdrop>
  );
}
