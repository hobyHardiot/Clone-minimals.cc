import { useState } from 'react';
import { kebabCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper } from '@mui/material';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import InputStyle from '../../../components/InputStyle';
import SearchNotFound from '../../../components/SearchNotFound';

// Tableau statique de posts
const staticPosts = [
    { id: 1, title: 'Première publication', cover: '/static/mock/images/posts/cover_1.jpg' },
    { id: 2, title: 'Deuxième publication', cover: '/static/mock/images/posts/cover_2.jpg' },
    { id: 3, title: 'Troisième publication', cover: '/static/mock/images/posts/cover_3.jpg' }
];

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important'
});

export default function BlogPostsSearch() {
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = async (value) => {
    setSearchQuery(value);
    if (value) {
      // Filtrer le tableau statique en fonction de la query
      const results = staticPosts.filter((post) =>
        post.title.toLowerCase().includes(value.toLowerCase())
      );
      if (isMountedRef.current) {
        setSearchResults(results);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleClick = (title) => {
    navigate(`${PATH_DASHBOARD.blog.root}/post/${kebabCase(title)}`);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleClick(searchQuery);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(post) => post.title}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={200}
          placeholder="Search post..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            )
          }}
        />
      )}
      renderOption={(props, post, { inputValue }) => {
        const { title, cover } = post;
        const matches = match(title, inputValue);
        const parts = parse(title, matches);

        return (
          <li {...props}>
            <Image alt={cover} src={cover} sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }} />
            <Link underline="none" onClick={() => handleClick(title)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}