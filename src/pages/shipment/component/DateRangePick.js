import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import Button from '@mui/material/Button';

export default function ResponsiveDateRangePicker() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <nav>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="row" spacing={3}>
        <Box p={3}>
          <div >일자</div>
        </Box>
        <DesktopDateRangePicker
          startText="시작일자"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
              <Button variant="contained">조회</Button>
            </React.Fragment>
          )}
        />
      </Stack>
    </LocalizationProvider>
    </nav>
  );
}
