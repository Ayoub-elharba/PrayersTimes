// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import PropTypes from 'prop-types'; // ES6

function MediaCard({image ,name, time}) {


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image} 
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h1" color="text.secondary" style={{color:' #ff00fb'}}>
          {time}
        </Typography>
      </CardContent>
     
    </Card>
  );
}
// MediaCard.PropTypes = {
//     name: PropTypes.string,
//     time: PropTypes.number,
// }
export default MediaCard; 
