import React, { Component } from 'react';
import './App.css';

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
    const {breakMin, breakSec} = this.state
      if (breakSec > 0) {
        this.setState(({breakSec}) => ({
          breakSec: breakSec-1
        }))
      }
      if (breakSec === 0) {
        if (breakMin === 0) {
          clearInterval(this.myInterval)
        } else {
          this.setState(({breakMin}) => ({
            breakMin: breakMin -1,
            breakSec: 59
          }))
        }
      }
    }, 1000)
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
    <h1>Under Construction</h1>
      <div id="pomodoro">
        <div id="status"></div>
        <h4>Yikes Forever</h4>
        { isBreak 
          ?<h4>Break Remaining: {this.state.breakMin}:{this.state.breakSec < 10 ? `0${this.state.breakSec}` : this.state.breakSec}</h4>
          : <h4>Time Remaining: {this.state.workMin}:{this.state.workSec < 10 ? `0${this.state.workSec}` : this.state.workSec} </h4>
        }
        <button onClick={this.handleStart} disabled={this.state.disabled}>Start</button>
        <button id="pause" class="btn" onClick={this.handlePause} >Pause</button>
      </div>
      
      <div class="settings">
        <div id="work">
          <p>Work Duration</p>
          <button id="work-plus" onClick={this.handleWorkPlus}>+</button>
          <div><span>{this.state.workMin}</span> mins</div>
          <button id="work-minus" onClick={this.handleWorkMinus}>-</button>
        </div>
        
        <div id="break">
          <p>Break Duration</p>
          <button id="break-plus" onClick={this.handleBreakPlus}>+</button>
          <div><span id="break-min">{this.state.breakMin}</span> mins </div>
          <button id="break-minus" onClick={this.handleBreakMinus}>-</button>
        
        </div>
    </div>
    </div>
  );
}
}
export default App;
