import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const StyledSearchButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  backgroundColor: '#C3C36A',
  '&:hover': {
    backgroundColor: '#A3A359',
  },
}));

const SearchBarContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const SearchLabel = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  border: '1px solid',
  padding: theme.spacing(1),
  borderRadius: '5px',
  backgroundColor: '#f5f5f5',
  color: '#757575',
  minWidth: '100px',
}));

const FaqSearchBar = ({ keyword, setKeyword, onSearch }) => {
  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <SearchBarContainer>
      <SearchLabel variant="body1">제목+내용</SearchLabel>
      <TextField
        label="Search"
        variant="outlined"
        value={keyword}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        size="small"
        style={{ flexGrow: 1, width: '80%' }}
      />
      <StyledSearchButton
        variant="contained"
        color="primary"
        onClick={onSearch}
      >
        <SearchIcon />
      </StyledSearchButton>
    </SearchBarContainer>
  );
};

export default FaqSearchBar;
