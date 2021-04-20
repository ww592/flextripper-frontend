import React from "react";
const TripLists = (props) => {
    return props.places.map((val, idx) => {
        let place = `place-${idx}`,
            startTime = `startTime-${idx}`,
            endTime = `endTime-${idx}`;

        return (
            <div className="form-row" key={val.index}>
                <div className="col">
                    <label>Place</label>
                    <input
                        type="text"
                        className="form-control required"
                        placeholder="Place"
                        name="place"
                        data-id={idx}
                        id={place}
                    />
                </div>
                <div className="col">
                    <label>Start Time</label>
                    <input
                        type="text"
                        className="form-control required"
                        placeholder="Start Time"
                        name="startTime"
                        id={startTime}
                        data-id={idx}
                    />
                </div>
                <div className="col">
                    <label>End Time</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="End Time"
                        name="endTime"
                        id={endTime}
                        data-id={idx}
                    />
                </div>
                <div className="col p-4">
                    {idx === 0 ? (
                        <button
                            onClick={() => props.add()}
                            type="button"
                            className="btn btn-primary text-center"
                        >
                            <i className="fa fa-plus-circle" aria-hidden="true" />
                        </button>
                    ) : (
                        <button
                            className="btn btn-danger"
                            onClick={() => props.delete(val)}
                        >
                            <i className="fa fa-minus" aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>
        );
    });
};
export default TripLists;
