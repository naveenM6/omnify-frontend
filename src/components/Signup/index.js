import { Component } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

import "./index.css";

export default class Signup extends Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    checked: false,
    passwordCheck: false,
    readyToValidate: false,
    msg: "",
    dbMessage: "",
  };

  getStatus = (jT) => {
    const { history } = this.props;
    Cookies.set("j_token", jT, {
      expires: 30,
      path: "/",
    });
    history.replace("/");
  };

  onClickSubmit = async (event) => {
    event.preventDefault();
    const { email, firstName, lastName, password, passwordCheck, checked } =
      this.state;
    if (
      email !== "" &&
      firstName !== "" &&
      checked === true &&
      passwordCheck === false
    ) {
      this.setState({ readyToValidate: false });
    } else {
      this.setState({ readyToValidate: true, msg: "*Fill all feilds" });
      return;
    }
    const data = {
      uid: uuidv4(),
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };
    const jsonData = await JSON.stringify(data);
    const url = `http://localhost:5004/users/`;
    const options = {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: jsonData,
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    if (response.ok === true) {
      this.getStatus(responseData);
    } else {
      this.setState({ dbMessage: responseData.dataMsg });
    }
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangeFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  };

  onChangeLastName = (event) => {
    this.setState({ lastName: event.target.value });
  };

  onChangePassword = (event) => {
    const value = event.target.value;
    this.setState({ password: value });
    if (
      value.match(/[a-z]/g) &&
      value.match(/[A-Z]/g) &&
      value.match(/[0-9]/g) &&
      value.match(/[^a-zA-Z0-9\d]/g) &&
      value.length >= 6
    ) {
      this.setState({ passwordCheck: false });
    } else {
      this.setState({ passwordCheck: true });
    }
  };

  onChangeCheckBox = (event) => {
    this.setState((prevstate) => ({ checked: !prevstate.checked }));
  };

  render() {
    const { readyToValidate, passwordCheck, dbMessage, msg } = this.state;
    return (
      <div className="main-container">
        <h1 className="omnify-header">Omnify</h1>
        <form className="signup-form-container" onSubmit={this.onClickSubmit}>
          <h1>Sign Up</h1>
          <input
            className="input form-control"
            type="text"
            placeholder="First Name"
            onChange={this.onChangeFirstName}
          />
          <input
            className="input form-control"
            type="text"
            placeholder="Last Name"
            onChange={this.onChangeLastName}
          />
          <input
            className="input form-control"
            type="text"
            placeholder="Email address"
            onChange={this.onChangeEmail}
          />
          <input
            className="input form-control"
            type="password"
            placeholder="Password"
            onBlur={this.onChangePassword}
          />
          {passwordCheck && (
            <p className="passwordCheck">
              Password should contain combination of
              <br />
              *letters(Cap &amp; small), *numbers and *character.
            </p>
          )}
          <div className="license">
            <input
              className="checkbox-input"
              id="checkbox"
              type="checkbox"
              onChange={this.onChangeCheckBox}
            />
            <label htmlFor="checkbox">
              I agree to the{" "}
              <span className="terms">Terms &amp; Conditions</span>
            </label>
          </div>
          {readyToValidate && <p className="warning">{msg}</p>}
          {readyToValidate === false && <p className="warning">{dbMessage}</p>}
          <button type="submit" className="btn">
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="sign">
              Login
            </Link>
          </p>
        </form>
      </div>
    );
  }
}
