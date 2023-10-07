import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loader({ loadingData }) {
  const { loaderProgress, loadingTotal } = loadingData;
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const pr = (Number(loaderProgress) * 100) / Number(loadingTotal);
    setProgress(pr);
  }, [loaderProgress]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
