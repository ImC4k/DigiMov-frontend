import React, { Component } from 'react';
import {v4 as uuidv4} from 'uuid';
import CinemaCard from '../CinemaCard';
import {getAllCinemas} from '../../apis/cinema';
class index extends Component {
    componentDidMount(){
        getAllCinemas().then((response)=>{
            this.props.initCinemaList(response.data);
        })
    }
    render() {
        const cinemas = this.props.cinemaList.map((cinema)=>
            <CinemaCard key={cinema.id} cinema={cinema}/>
        );
        return (
            //todo: check whether the cinemaList is empty abd display message.
            <div>
                <p>Cinemas</p>
                <input type="text" placeholder="Search"/><br />
                {cinemas}
            </div>
        );
    }
}

export default index;