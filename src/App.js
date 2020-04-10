import React, { Component } from 'react';
import './App.css';

// TODO: -set up authorization with google or email
// - have pomodoro's written to db connected by the auth username

class App extends Component {
  constructor(props) {
    super(props);
    // placeholder
    this.state = {
      configMin: 25,
      workMin: 25,
      workSec: 0,
      breakMin: 10, 
      breakSec: 0,
      isBreak: false,
      disabled: false,
      pomodoroThisMonth: 0,
      allTimePomodoro: 0,
      month: new Date().toLocaleDateString()
    }
  }

  

  componentDidMount(){
    // not sure how to tell from different buttons
    this.handleWorkPlus = this.handleWorkPlus.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleStart = e => {
    e.preventDefault();
    this.setState({disabled:true});
    this.myInterval = setInterval(() => {
      const {workSec, workMin} = this.state
 
      if (workSec > 0) {
        this.setState(({workSec}) => ({
          workSec: workSec-1
        }))
      }
      if (workSec === 0) {
        if (workMin === 0) {
          this.setState ({
            isBreak: true
          });
          this.handleBreakStart();
        } else {
          this.setState(({workMin}) => ({
            workMin: workMin -1,
            workSec: 59
          }))
        }
      }
    }, 1000)
  }
  // This acts like a pause button currently
  handlePause = e => {
    e.preventDefault();
    this.setState({disabled:false});
    clearInterval(this.myInterval)
  }

  handleBreakStart = () => {
    clearInterval(this.myInterval)
    this.myInterval = setInterval(() => {
    const {breakMin, breakSec, allTimePomodoro} = this.state
      if (breakSec > 0) {
        this.setState(({breakSec}) => ({
          breakSec: breakSec-1
        }))
      }
      if (breakSec === 0) {
        if (breakMin === 0) {
          this.setState ({
            isBreak: false,
            allTimePomodoro: allTimePomodoro + 1
          });
          clearInterval(this.myInterval)
          this.handleReset()
        } else {
          this.setState(({breakMin}) => ({
            breakMin: breakMin -1,
            breakSec: 59
          }))
        }
      }
    }, 1000)
  }

  handleReset = () => {
    clearInterval(this.myInterval);
    this.setState ({
      isBreak: false,
      workMin: 25,
      workSec: 0,
      breakMin: 10
    });
  }
 

  handleWorkPlus = e => {
    const {workMin} = this.state;
    e.preventDefault();
    this.setState({
      workMin: workMin + 1,
    });
  }

  handleWorkMinus = e => {
   const {workMin} = this.state
    e.preventDefault();
    if (this.state.workMin > 1) {
      this.setState({
        workMin: workMin - 1
      });
    }    
  }

  handleBreakPlus = e => {
    let breakcopy = this.state.breakMin;
    e.preventDefault();
    this.setState({
      breakMin: breakcopy += 1
    });
  }

  handleBreakMinus = e => {
    let breakcopy = this.state.breakMin;
    e.preventDefault();
    if (this.state.breakMin > 1) {
      this.setState({
        breakMin: breakcopy -= 1
      });
    }    
  }
 

render() {
  const isBreak = this.state.isBreak;
  return (
    <div className="container">
    <h1 className = "title">Pomodoro Timer</h1>
      <div id="pomodoro">
        <div id="status"></div>
        { isBreak 
          ?<h4>Break Remaining: {this.state.breakMin}:{this.state.breakSec < 10 ? `0${this.state.breakSec}` : this.state.breakSec}</h4>
          : <h4>Time Remaining: {this.state.workMin}:{this.state.workSec < 10 ? `0${this.state.workSec}` : this.state.workSec} </h4>
        }
        <button className="button" onClick={this.handleStart} disabled={this.state.disabled}>Start</button>
        <button id="pause" className="button"  onClick={this.handlePause} >Pause</button>
        <button id="reset" className="button" onClick={this.handleReset}>Reset</button>
      </div>
      
      <div class="settings">
        <div id="work">
          <p>Work Duration</p>
          <button id="work-plus" className="button"  onClick={this.handleWorkPlus} disabled={this.state.disabled}>+</button>
          <div><span>{this.state.workMin}</span> mins</div>
          <button id="work-minus" className="button"  onClick={this.handleWorkMinus} disabled={this.state.disabled}>-</button>
        </div>
        
        <div id="break">
          <p>Break Duration</p>
          <button id="break-plus" className="button"  onClick={this.handleBreakPlus} disabled={this.state.disabled}>+</button>
          <div><span id="break-min">{this.state.breakMin}</span> mins </div>
          <button id="break-minus"  className="button" onClick={this.handleBreakMinus} disabled={this.state.disabled}>-</button>
        
        </div>
        <h4 className="allTime">Pomodoro's completed all time: <span>{this.state.allTimePomodoro}</span></h4>
        <h4><span>{this.state.month}</span></h4>
    </div>
    </div>
  );
}
}
export default App;
