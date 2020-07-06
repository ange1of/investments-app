import React from 'react';
import SectorListElement from './SectorListElement';
import './SectorList.css';

class SectorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectors: [],
        }
    }

    componentDidMount() {
        let key = 0;
        fetch('http://localhost:3001/api/sector-list')
        .then(result => result.json())
        .then(result => {
            console.log('got data');
            this.setState({
                sectors: result.sectors.map(
                    (item) => <SectorListElement key={key++} {...item}/>
                )
            });
        });
    }

    render() {
        if (!this.state.sectors.length) {
            return (
                <div>Loading sector list...</div>
            )
        }
        return (
            <div className="SectorList">
                {this.state.sectors}
            </div>
        );
    }
}

export default SectorList;