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
    CloseDetail
} from './LocationDetailsSetting'

const LocationDetails = ({details, closeDetail}) => {
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
                <telephone>telephone: {telephone}</telephone>
                <br/>
                <CloseDetail onClick={closeDetail}>Close</CloseDetail>
            </DetailCard>
        </DetailsWrapper>
    )
}

export default LocationDetails