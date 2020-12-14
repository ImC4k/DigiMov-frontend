import React, { Component } from 'react';
import {v4 as uuidv4} from 'uuid'
import CinemaCard from '../CinemaCard'
class index extends Component {
    constructor(props){
        super(props);
        this.state={cinemas:[{
            id: uuidv4(),
            name: "MCL Cinema",
            address: "11/F, D2 Place TWO, No. 15 Cheung Shun Street, Lai Chi Kok, Kowloon",
            openingHours: "",
            hotline: "",
            imageUrl: "https://media.timeout.com/images/105284473/630/472/image.jpg"
        },
        {
            id: uuidv4(),
            name: "MCL Cinema",
            address: "11/F, D2 Place TWO, No. 15 Cheung Shun Street, Lai Chi Kok, Kowloon",
            openingHours: "",
            hotline: "",
            imageUrl: "https://media.timeout.com/images/105284473/630/472/image.jpg"
        }
        ]}
    }
    render() {
        const cinemas = this.state.cinemas.map((cinema)=>
            <CinemaCard key={cinema.id} cinema={cinema}/>
        );
        return (
            <div>
                <p>Cinemas</p>
                <input type="text" placeholder="Search"/><br />
                {cinemas}
            </div>
        );
    }
}

export default index;