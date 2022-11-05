import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <Stack >
      <CircularProgress color="inherit" />
    </Stack>
  );
}
 
export default Loading