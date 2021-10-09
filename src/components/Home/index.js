import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import EventData from "../EventData";

import "./index.css";

const daysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let datesArr = [];

class Home extends Component {
  state = {
    name: "",
    description: "",
    start: "",
    end: "",
    day: "0",
    msg: "",
    update: "",
  };

  SetName = (e) => this.setState({ name: e.target.value });

  setDescription = (e) => this.setState({ description: e.target.value });

  setStartTime = (e) => this.setState({ start: e.target.value });

  setEndTime = (e) => this.setState({ end: e.target.value });

  setDay = (e) => this.setState({ day: e.target.value });

  findDates = async () => {
    const { day } = this.state;
    const today = new Date();
    const duplicateDate = new Date();
    const requiredDate = duplicateDate.setDate(duplicateDate.getDate() + 90);
    const finalDate = new Date(requiredDate);
    const dateArr = [];
    for (var d = today; d < finalDate; d.setDate(d.getDate() + 1)) {
      const date = new Date(d);
      if (date.getDay().toString() === day) {
        const gDate = date.getDate();
        const gMonth = date.getMonth() + 1;
        const gYear = date.getFullYear();
        const gFullDate = `${gDate}/${gMonth}/${gYear}`;
        dateArr.push(gFullDate);
      }
    }
    datesArr = [...dateArr];
    this.setState({ update: "dataUpdated" });
  };

  updateData = async () => {
    const { name, description, start, end, day } = this.state;
    const url = `http://localhost:5004/event`;
    const data = {
      name,
      description,
      start,
      end,
      day: daysArray[day],
      datesArr,
    };
    const jsonData = await JSON.stringify(data);
    const options = {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: jsonData,
    };
    await fetch(url, options);
    // this.setState({ name: "", description: "", start: "", end: "", day: "" });
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { name, description, start, end, day } = this.state;
    if (
      name === "" ||
      description === "" ||
      start === "" ||
      end === "" ||
      day === ""
    ) {
      this.setState({ msg: "*Fill all details" });
    } else {
      this.findDates();
      this.updateData();
    }
  };

  logOut = () => {
    const { history } = this.props;
    this.setState({ name: "", description: "", start: "", end: "", day: "" });
    datesArr = [];
    Cookies.remove("j_token");
    history.push("/login");
  };

  render() {
    const { name, description, start, end, msg, day } = this.state;

    const renderData = {
      name,
      description,
      start,
      end,
      day: daysArray[day],
      datesArr,
    };

    const jwtToken = Cookies.get("j_token");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="home-container">
        <div className="header">
          <h1 className="logo-header">Omnify</h1>
          <button type="button" className="logout" onClick={this.logOut}>
            Log Out
          </button>
        </div>
        <div className="content-container">
          <form className="event-form-container" onSubmit={this.formSubmit}>
            <div className="ip-div">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                className="event-inputs"
                onChange={this.SetName}
                value={name}
              />
            </div>
            <div className="ip-div">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                placeholder="Description"
                id="description"
                className="event-inputs"
                onChange={this.setDescription}
                value={description}
              />
            </div>
            <div className="ip-div">
              <label htmlFor="start-time">Start Time</label>
              <input
                type="time"
                placeholder="select time"
                id="start-time"
                className="event-inputs"
                onChange={this.setStartTime}
                value={start}
              />
            </div>
            <div className="ip-div">
              <label htmlFor="end-time">Start Time</label>
              <input
                type="time"
                placeholder="select time"
                id="end-time"
                className="event-inputs"
                onChange={this.setEndTime}
                value={end}
              />
            </div>
            <div className="ip-div">
              <label htmlFor="weekday">Select Day</label>
              <select
                className="event-option"
                id="weekday"
                onChange={this.setDay}
              >
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
              </select>
            </div>
            <p className="msg">{msg}</p>
            <button type="submit" className="create-btn">
              Create Event
            </button>
          </form>
          <div className="fetched-date">
            <EventData display={renderData} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
