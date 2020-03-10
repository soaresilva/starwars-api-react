import React, { Component } from "react";
import "./App.css";

const url = "https://swapi.co/api/people/4/";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: null,
      attendance: []
    };
  }

  componentDidMount() {
    this.getData();
  }
  // it's better to have the componentDidMount and the fetching separately in case we want to do more operations with the data, like search, etc
  getData = async () => {
    await sleep(1000);
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        ...data,
        loading: false
      });
    } catch (err) {
      this.setState({
        error: true,
        errorMessage: err.message
        // the err.message is a default thing: for example in this case if we put a wrong URL it will return 'Failed to fetch'
      });
    }
  };

  whatIShouldDisplay = attendanceComponents => {
    if (this.state.error) {
      return <ErrorMessage message={this.state.errorMessage} />;
    }
    if (this.state.loading) return <Loader />;

    return (
      <div className="App">
        <AttendanceRecordsList
          date={this.state.date}
          attendanceComponents={attendanceComponents}
        />
      </div>
    );
  };

  render() {
    console.log("state", this.state);
    const attendanceComponents = this.state.attendance.map(getAttendanceRecord);
    return this.whatIShouldDisplay(attendanceComponents);
  }
}

export default App;

function getAttendanceRecord(item) {
  return (
    <div key={`attendanceRecord-${item.id}`} className="attendance">
      <h4>{item.name}</h4>
      <h4>{item.from ? item.from : "Absent"}</h4>
    </div>
  );
}

async function sleep(time) {
  await new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

function AttendanceRecordsList(props) {
  const { attendanceComponents, date } = props;
  return (
    <div className="attendance-container">
      <strong>{date}</strong>
      {attendanceComponents}
    </div>
  );
}

function Loader() {
  return <p>Loading...</p>;
}

function ErrorMessage(props) {
  return <strong>{props.message}</strong>;
}
