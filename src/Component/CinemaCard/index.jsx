import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ERROR_IMAGE } from '../../assets';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: this.props.cinema.imageUrl,
    };
  }

  setImage(imageUrl) {
    this.setState({
      imageUrl: imageUrl,
    });
  }

  render() {
    const { name, address } = this.props.cinema;
    return (
      <Card style={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            style={{ height: 140 }}
            src={this.state.imageUrl}
            component='img'
            onError={(e) => {
              e.target.onError = null;
              this.setImage(ERROR_IMAGE);
            }}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {name}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {address}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default index;
