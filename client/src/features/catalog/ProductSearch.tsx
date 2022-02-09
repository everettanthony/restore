import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function ProductSearch() {
  const {productParams} = useAppSelector(state => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  function handleSearch() {
    dispatch(setProductParams({searchTerm: searchTerm}));
  }

  function resetSearch() {
    dispatch(setProductParams({searchTerm: ''}));
  }

  return (
    <TextField 
      label='Search Products'
      variant='outlined'
      fullWidth
      value={searchTerm || ''}
      onChange={(event: any) => {
        setSearchTerm(event.target.value);

        if (event.target.value === '')
          resetSearch();
      }}
      onKeyPress={(event: any) => {
        if (event.key === 'Enter') {
          setSearchTerm(event.target.value);
          handleSearch();
        }      
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end"><IconButton onClick={handleSearch}><SearchIcon /></IconButton></InputAdornment>,
      }}
    /> 
  )
}