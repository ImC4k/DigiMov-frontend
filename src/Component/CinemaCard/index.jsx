import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
            shouldRedirect: false,
        };
    }

    setImage(imageUrl) {
        this.setState({
            imageUrl: imageUrl,
        });
    }
    toggleCinemaCard() {
        this.setState({ shouldRedirect: true });
    }
    redirectToCinemaSession(cinemaId) {
        return <Redirect to={'/cinemas/' + cinemaId}></Redirect>;
    }

    render() {
        const { shouldRedirect } = this.state;
        const { name, address, id } = this.props.cinema;
        if (shouldRedirect) {
            return this.redirectToCinemaSession(id);
        } else {
            return (
                <Card
                    className={'custom-card'}
                    onClick={() => this.toggleCinemaCard()}
                >
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
                            <Typography gutterBottom className={'card-title'}>
                                {name}
                            </Typography>
                            <Typography
                                className={'card-description'}
                                color='textSecondary'
                                component='p'
                            >
                                {address}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            );
        }
    }
}

export default index;
