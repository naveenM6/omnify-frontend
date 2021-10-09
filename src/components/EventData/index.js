import { Component,React } from "react";

import './index.css'

class EventData extends Component {
  getRenderingData = () => {
    const { display } = this.props;
    const { name, description, start, end, day, datesArr } = display;
    return (
      <div className="event-data-content">
        {datesArr.map((item) => {
          return (
            <div className="item-container">
              <p>{name}</p>
              <p>{description}</p>
              <p>
                {start} - {end}
              </p>
              <p>{day}</p>
              <p>{item}</p>
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
