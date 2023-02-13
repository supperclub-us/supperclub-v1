import React from 'react';
import { FormControl, TextField, Box, Paper, InputBase, IconButton } from '@mui/material';
import './location.css';
import SearchIcon from '@mui/icons-material/Search';


const Location = ({ handleChange, handleSubmit, value, setValue, suggestions, setSuggestions }) => {

  return (
    <>
      <div className='search-function'>
        <Paper
            component="form"
            // sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
            // sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", m: "1em" }}
            sx={{display: "flex", m: "1em"}}
        >
            <InputBase 
                // sx={{ ml: 1, flex: 1, width: "600px", height: "55.5px" }}
                sx={{ ml: 1, flex: 1, width: "600px"}}
                type="search" 
                onChange={handleChange}
                value={value}
                placeholder="Enter city for nearest event" 
            />
            
            <IconButton
                type="button" sx={{ p: '10px' }} 
                onClick={handleSubmit}
                color={'primary'}
            >
                <SearchIcon />
            </IconButton>

            {suggestions?.length > 0 && (
              <Box className="searchBar-suggestionWrapper" sx={{ bgcolor: '#FCFCFC', position: 'absolute', width: "651px", mt: 5.58, mb: 0, mx: 0, borderRadius: '5px', boxShadow: 3 }} >
                {suggestions.map((suggestion, index) => {
                  return (
                    <Box className="searchBar-suggestion" sx={{ width: "600px", p: 1.0, "&:hover": { color: 'blue' } }} key={index}
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
        </Paper>
      </div> 
  </>
  )

}

export default Location



// import React from 'react';
// import { FormControl, TextField, Box } from '@mui/material';
// import './Location.css';
// const Location = ({ handleChange, value, setValue, suggestions, setSuggestions }) => {

//   return (
  //   <FormControl className="form-control" sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", m: "1em" }}>
  //     <TextField
  //       id="outlined-basic"
  //       label="Location"
  //       variant="outlined"
  //       onChange={handleChange}
  //       value={value}
  //       className="searchBar-input"
  //       fullWidth
  //     />
  //     {suggestions?.length > 0 && (
  //       <Box className="searchBar-suggestionWrapper" sx={{ bgcolor: '#FCFCFC', position: 'absolute', width: 400, mt: 7, mb: 0, mx: 0, borderRadius: '5px', boxShadow: 3 }} >
  //         {suggestions.map((suggestion, index) => {
  //           return (
  //             <Box className="searchBar-suggestion" sx={{ maxWidth: 400, p: 0.4, "&:hover": { color: 'blue' } }} key={index}
  //               onClick={() => {
  //                 setValue(suggestion.place_name);
  //                 setSuggestions([]);
  //               }}>
  //               {suggestion.place_name}
  //             </Box>
  //           )
  //         })}
  //       </Box>
  //     )}
  // </FormControl>
//   )
// }

// export default Location


// import React from 'react'
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { IconButton, InputBase, Paper } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// export default function BasicTextFields() {
//   return (
        //   <div className='search-function'>
        //     <Paper
        //         component="form"
        //         sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
        //     >
        //         <InputBase 
        //             sx={{ ml: 1, flex: 1 }}
        //             type="search" 
        //             placeholder="Enter address for nearest event" 
        //             onChange={(e) => {
        //                 setSearchResults(e.target.value)
        //             }}
        //         />
        //         <IconButton
        //             type="button" sx={{ p: '10px' }} 
        //             onClick={ (e) => handleSearch(e.target.value) }
        //             color={'primary'}
        //         >
        //             <SearchIcon />
        //         </IconButton>
        //     </Paper>
        // </div> 
//     </>
//   );
// }


