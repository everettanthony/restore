import { MetaData } from "../models/pagination";
import { Box, Typography, Pagination } from "@mui/material";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({metaData, onPageChange}: Props) {
  const {currentPage, totalCount, totalPages, pageSize} = metaData;

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
    <Typography>
      Displaying {(currentPage-1)*pageSize+1}–
      {currentPage*pageSize > totalCount ? totalCount : currentPage*pageSize} of {totalCount} items
    </Typography>
    <Pagination 
      color='primary'
      size='large' 
      count={totalPages}
      page={currentPage} 
      onChange={(e, page) => onPageChange(page)} />
    </Box>
  )
}