import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ERROR_IMAGE } from '../../assets';
import './CinemaCard.css';
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
      <Card className={'custom-card'}>
        <CardActionArea>
          <CardMedia
            className={'card-image'}
            src={this.state.imageUrl}
            component='img'
            onError={(e) => {
              e.target.onError = null;
              this.setImage(ERROR_IMAGE);
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              className={'card-title'}
            >
              {name}
            </Typography>
            <Typography className={'card-description'}color='textSecondary' component='p'>
              {address}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default index;
