import React from 'react'
import {
    DetailsWrapper,
    DetailCard,
    Name,
    Address,
    IsOpen,
    Rating,
    Telephone,
    OpenTimeDetails,
    CloseDetail,
    AddPoint,
} from './LocationDetailsSetting'

const LocationDetails = ({details, closeDetail, addPoint}) => {
    const {
        name,
        address,
        telephone,
        rating,
        isOpen,
        openTime
    } = details

    return (
        <DetailsWrapper>
            <DetailCard>
                <Name>{name}</Name>
                <Address>{address}</Address>
                <IsOpen isOpen={isOpen}>{isOpen ? 'Open':'Close'}</IsOpen>
                <Rating rating={rating}>rating: {rating}</Rating>
                {openTime && openTime.map((time,i)=>
                    <OpenTimeDetails key={i}>
                        {time}
                    </OpenTimeDetails>
                )}
                <Telephone>telephone: {telephone}</Telephone>
                <br/>
                <CloseDetail onClick={closeDetail}>Close</CloseDetail>
                <AddPoint onClick={addPoint}>add point</AddPoint>
            </DetailCard>
        </DetailsWrapper>
    )
}

export default LocationDetails