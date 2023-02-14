import React from 'react';
import {
  TextField,
  FormControl,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const StartEndDate = ({ startDate, handleStartDate, endDate, setEndDate, handleEndDate }) => {
  return (
    <>
      <FormControl className="form-control" sx={{ m: "1em", background:"white" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => handleStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
            disablePast
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl className="form-control" sx={{ m: "1em", background: "white" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => handleEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
            sx={{background:"white"}}
            disablePast
          />
        </LocalizationProvider>
      </FormControl>
    </>
  )
}

export default StartEndDate
