import React, { useState, useEffect,useRef  } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ColorizeOutlinedIcon from '@mui/icons-material/ColorizeOutlined';
import TextField from '@mui/material/TextField';
import FlexBetween from '../../common/FlexBetween';
import { InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';

function OrganisationList() {
  const [articles, setArticles] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(9);
  const [searchText, setSearchText] = useState("");

  const scrollRef = useRef(null);


  useEffect(() => {
    axios.get(`http://localhost:5000/api/asso/results`)
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


   // Logic for displaying current articles
   const filteredArticles = articles.filter((article) =>
   article.title.toLowerCase().includes(searchText.toLowerCase())
 );
 

  // Logic for displaying current articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  // Logic for displaying page numbers
  const pageNumbers = [];
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const displayRange = 2; // Number of pages to display before/after current page

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= displayRange) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...');
    }
  }

  // Function to handle page click
  const handlePageClick = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCardHover = index => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to first page when search text changes
  };

  return (
    <div style = {{
      marginTop:'50px',
      margin: '0 auto'

    }} ref={scrollRef} >
{/* 
<TextField
  id="outlined-basic"
  label="Search Organizations"
  variant="outlined"
  value={searchText}
  onChange={handleSearchInputChange}
  style={{ marginBottom: "10px" }}
/> */}

          <FlexBetween
            backgroundColor="#ece9e6"
            borderRadius="20px"
            gap="3rem"
            p="0.1rem 1.5rem"
            mb="3rem"
            mt="2rem"
          >
            <InputBase placeholder="Search Organizations"  id="outlined-basic"
  label="Search Organizations"
  variant="outlined"
  value={searchText}
  onChange={handleSearchInputChange} />

            <Search sx={{ color: "#b9b7b4" }} />
          </FlexBetween>
  

      <div style={{
        display: 'grid',
        gridTemplateColumns: " 2fr 2fr 2fr ",
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent:"center",
        gap: "50px",
        gridGap: '50px',
    


      }}>
        {currentArticles.map((article, index) => (
          <Card key={index} sx={{
            width: '100%',
            maxWidth: 300,
            position: 'relative',
            justifyContent: 'center', 
            boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-out',
            transform: index === hoveredCard ? 'scale(1.2)' : 'scale(1)',
            filter: hoveredCard !== null && index !== hoveredCard ? 'blur(4px)' : 'none',
  border: '1px solid #ccc',

  
          }}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="200"
              maxHeight="200"
              image={article.imgSrc}
              sx={{objectFit: 'contain',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',}}
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip title={article.title} placement="top-start">
              <Typography  variant="subtitle1" sx={{ maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}gutterBottom  component="div" >
              <ColorizeOutlinedIcon sx={{ mr: 1 }} />
                {article.title}
              </Typography>
              </Tooltip>

            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <a href={article.href}>
                <Button variant="contained" color="success" size="small">Learn More</Button>
              </a>
            </CardActions>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        {pageNumbers.map((number) => (
          <Button sx={{
            margin: '0 5px',
            padding: '10px',
          }} key={number} variant={number === currentPage ? 'contained' : 'outlined'}  onClick={(event) => handlePageClick(event, number)}>
            {number}
          </Button>
        ))}
      </div>
      
    </div>
  );
}

export default OrganisationList ;
