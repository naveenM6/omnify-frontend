import { Component,React } from "react";
import { v4 as uuidv4 } from "uuid";

import './index.css'

class EventData extends Component {
  getRenderingData = () => {
    const { display } = this.props;
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

  render() {
    return <>{this.getRenderingData()}</>;
  }
}

export default EventData;
