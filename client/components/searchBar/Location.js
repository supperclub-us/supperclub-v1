import React from 'react';
import { FormControl, TextField, Box } from '@mui/material';
import './location.css';

const Location = ({ handleChange, value, setValue, suggestions, setSuggestions }) => {

  return (
    <FormControl className="form-control" sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", m: "1em" }}>
      <TextField
        id="outlined-basic"
        // label="Location"
        variant="outlined"
        onChange={handleChange}
        value={value}
        className="searchBar-input"
        placeholder="Enter an address to search for nearest Supper Club"
      />
      {suggestions?.length > 0 && (
        <Box className="searchBar-suggestionWrapper" sx={{ bgcolor: '#FCFCFC', position: 'absolute', width: 600, mt: 7, mb: 0, mx: 0, borderRadius: '5px', boxShadow: 3 }} >
          {suggestions.map((suggestion, index) => {
            return (
              <Box className="searchBar-suggestion" sx={{ maxWidth: 600, p: 0.4, "&:hover": { color: 'blue' } }} key={index}
                onClick={() => {
                  setValue(suggestion.place_name);
                  setSuggestions([]);
                }}>
                {suggestion.place_name}
              </Box>
            )
          })}
        </Box>
      )}
  </FormControl>
  )
}

export default Location



// import React from 'react';
// import { FormControl, TextField, Box } from '@mui/material';
// import './Location.css';
// const Location = ({ handleChange, value, setValue, suggestions, setSuggestions }) => {

//   return (
//     <FormControl className="form-control" sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", m: "1em" }}>
//       <TextField
//         id="outlined-basic"
//         label="Location"
//         variant="outlined"
//         onChange={handleChange}
//         value={value}
//         className="searchBar-input"
//         fullWidth
//       />
//       {suggestions?.length > 0 && (
//         <Box className="searchBar-suggestionWrapper" sx={{ bgcolor: '#FCFCFC', position: 'absolute', width: 400, mt: 7, mb: 0, mx: 0, borderRadius: '5px', boxShadow: 3 }} >
//           {suggestions.map((suggestion, index) => {
//             return (
//               <Box className="searchBar-suggestion" sx={{ maxWidth: 400, p: 0.4, "&:hover": { color: 'blue' } }} key={index}
//                 onClick={() => {
//                   setValue(suggestion.place_name);
//                   setSuggestions([]);
//                 }}>
//                 {suggestion.place_name}
//               </Box>
//             )
//           })}
//         </Box>
//       )}
//   </FormControl>
//   )
// }

// export default Location

