import React, { useState, useEffect } from 'react';
import './App.css';
import { formatDate } from './utils';
import config from './config.json';

const App = () => {
  const [InExerciseScreen, setInExerciseScreen] = useState(false);
  const [exercises, setExercises] = useState([]);

  return (
    <div>
      <h1 id="main_header">Exercise App</h1>
      {InExerciseScreen === true ? (
        <div>
          <Workout exercises={exercises}/>
        </div>
      ) : (
        <div id="main_app_div">
          <Selector set_exercises={setExercises}/>
          <WorkoutItemList exercises={exercises}/>
          <button onClick={() => {
            setInExerciseScreen(true)
        }}>Start Exercise</button>
        </div>
      )}
    </div>
  );
};


function Selector({set_exercises}) {
  const workout_options = config.workout_options;

  const [workoutItem, setWorkoutItem] = useState({
    name: "",
    type: workout_options[0],  
    value: {
      number: 0,
      sets: 0,
      reps: 0
    }
  });

  const handleNameChange = (event) => {
    setWorkoutItem({
      ...workoutItem,
      name: event.target.value
    });
  };

  const handleTypeChange = (event) => {
    setWorkoutItem({
      ...workoutItem,
      type: event.target.value
    });
  };

  const handleNumberChange = (event) => {
    setWorkoutItem({
      ...workoutItem,
      value: {
        ...workoutItem.value,
        number: event.target.value
      }
    });
  };

  const handleSetsChange = (event) => {
    setWorkoutItem({
      ...workoutItem,
      value: {
        ...workoutItem.value,
        sets: event.target.value
      }
    });
  };

  const handleRepsChange = (event) => {
    setWorkoutItem({
      ...workoutItem,
      value: {
        ...workoutItem.value,
        reps: event.target.value
      }
    });
  };

  const addItemToArray = (newItem) => {
    set_exercises(currentArray => [...currentArray, newItem]);
  };

  return (
    <div id="selector_row">
      <input value={workoutItem.name} onChange={handleNameChange} type="text" id="workout-name"></input>
      <label for="cars">Select Exercise Type:</label>
      <select onChange={handleTypeChange} value={workoutItem.type} name="cars" id="cars">
        {workout_options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))} 
      </select> 
      {workoutItem.type === 'Sets and Reps' ? (
        <div id="number_input">
          <input value={workoutItem.value.sets} onChange={handleSetsChange} type="number"></input>
          <input value={workoutItem.value.reps} onChange={handleRepsChange} type="number"></input>
        </div>
      ) : (
        <div id="number_input">
          <input value={workoutItem.value.number} onChange={handleNumberChange} type="number"></input>
        </div>
      )}
      <button id="add_button" onClick={() => addItemToArray(workoutItem)} >Add</button>
    </div>
  );
}

function WorkoutItemList({exercises}) {
  return (
    <div>
      {exercises.map((option, index) => (
          <WorkoutItem option={option} />
        ))}
    </div>
  );
}

function WorkoutItem({option}) {
  return(
    <div id="workout_item">
      <h2>{option.name}</h2>
      <h3>{option.type}</h3>
      {option.type === 'Sets and Reps' ? (
        <div>
          <h3>{option.number}</h3>
        </div>
      ) : (
        <div>
          <h3>{option.number}</h3>
        </div>
      )}
    </div>
  );
}

function Workout({exercises}){
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex(currentIndex => Math.min(currentIndex + 1, exercises.length - 1))
  };

  return (
    <div id="workout">
      <WorkoutDisplay option={exercises[currentIndex]} />
      <button id="next_button" onClick={handleNextClick}>Next</button>
    </div>
  );
}

const SetsAndRepsDisplay = ({ option }) => (
  <div id="current_workout">
      <h2>{option.name}</h2>
      <h3>{option.type}</h3>
      <h3 class="display_static">{option.value.sets}</h3>:<h3 class="display_static">{option.value.reps}</h3>
</div>
);

const TimerDisplay = ({ option }) => {
  const [time, setTime] = useState(parseInt(option.value.number));

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  return (
    <div>
      <h2>{option.name}</h2>
      <h3>{option.type}</h3>
      <h3>{time}</h3>
    </div>
  );
};

const StopwatchDisplay = ({option}) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <h2>{option.name}</h2>
      <h3>{option.type}</h3>
      <h3>{time}</h3>
      <button onClick={() => setRunning(!running)}>
        {running ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

const WorkoutDisplay = ({option}) => {
  console.log(option)
  return (
    <div>
      {option.type === 'Sets and Reps' && <SetsAndRepsDisplay option={option} />}
      {option.type === 'Timer' && <TimerDisplay option={option} />}
      {option.type === 'Stopwatch' && <StopwatchDisplay option={option}/>}
    </div>
  );
};

export default App;

