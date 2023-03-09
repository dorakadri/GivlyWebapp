import { Grid, Paper } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

const items = [
  {
    name: "Partner 1",
    image: "https://picsum.photos/200/300/?random",
  },
  {
    name: "Partner 2",
    image: "https://picsum.photos/200/300/?random",
  },
  {
    name: "Partner 3",
    image: "https://picsum.photos/200/300/?random",
  },
  {
    name: "Partner 4",
    image: "https://picsum.photos/200/300/?random",
  },
  {
    name: "Partner 5",
    image: "https://picsum.photos/200/300/?random",
  },
];

export default function Carouselfinal(props) {
  const { autoPlay } = props;

  const itemsToDisplay = [...items, ...items.slice(0, 4)]; // display 4 images at a time and loop continuously

  return (
    <Carousel
      autoPlay={autoPlay}
      interval={3000}
      animation="slide"
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
    >
      {[0, 1, 2, 3].map((startIndex) => (
        <Grid container spacing={2} key={startIndex}>
          {itemsToDisplay.slice(startIndex, startIndex + 4).map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper>
                <Grid container justifyContent="center" alignItems="center" style={{ height: 300 }}>
                  <Grid item>
                    <img src={item.image} alt={item.name} />
                    <div>{item.name}</div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ))}
    </Carousel>
  );
}
