import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ex01 = () => {
    return (
        <Stack spacing={2} direction="Array<column-reverse>">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      );
    }
 
export default ex01