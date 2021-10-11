import { v4 as uuidv4 } from "uuid";

import "./index.css";

const EventData = props => {
  const getRenderingData = () => {
    const { display } = props;
    const { name, description, start, end, day, datesArr } = display;
    return (
      <div className="event-data-content">
        {datesArr.map((item) => {
          return (
            <div className="item-container" key={uuidv4()}>
              <p>Event Name:- {name}</p>
              <p>Description:- {description}</p>
              <p>
                Start Time:- {start} , End Time :- {end}
              </p>
              <p>Selected Weekday:- {day}</p>
              <p>Date of the Day:- {item}</p>
            </div>
          );
        })}
      </div>
    );
  };
  return <>{getRenderingData()}</>;
};

export default EventData;
