import React, { Component } from 'react';

class Marker extends Component {
    componentDidMount() {
        this.renderMarker();
    }

    renderMarker() {
        const {place, map} = this.props;
        place.setMap(map);
    }

    render() {
        return null;
    }
}

export default Marker;