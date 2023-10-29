import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material';
import { useCallback } from 'react';
import st from './ScrollTop.module.scss';

export default function ScrollToTop() {
  const trigger = useScrollTrigger({
    threshold: 300,
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Zoom in={trigger}>
      <Box role="presentation" className={st.box}>
        <Fab onClick={scrollToTop} size="small" aria-label="Scroll back to top" className={st.fab}>
          <KeyboardArrowUp fontSize="medium" sx={{ color: 'white' }} />
        </Fab>
      </Box>
    </Zoom>
  );
}
