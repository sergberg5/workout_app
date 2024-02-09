import React, { useState } from 'react';

const App = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [restTime, setRestTime] = useState(5); // Default rest time of 5 seconds
  const [isResting, setIsResting] = useState(false);

  const handleExerciseSubmit = (exercise) => {
    setExercises([...exercises, exercise]);
  };

  const handleRestTimer = () => {
    setIsResting(true);
    setTimeout(() => {
      setIsResting(false);
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }, restTime * 1000); // Convert seconds to milliseconds
  };

  return (
    <div>
      <h1>Exercise App</h1>
      <ExerciseForm onSubmit={handleExerciseSubmit} />
      <ExerciseList exercises={exercises} currentExerciseIndex={currentExerciseIndex} />
      {isResting && <RestTimer restTime={restTime} />}
      {!isResting && currentExerciseIndex < exercises.length && (
        <button onClick={handleRestTimer}>Start Rest Timer</button>
      )}
      <input
        type="number"
        value={restTime}
        onChange={(e) => setRestTime(parseInt(e.target.value))}
        placeholder="Rest Timer (seconds)"
      />
    </div>
  );
};

const ExerciseForm = ({ onSubmit }) => {
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ sets, reps });
    setSets('');
    setReps('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Sets" value={sets} onChange={(e) => setSets(e.target.value)} />
      <input type="number" placeholder="Reps" value={reps} onChange={(e) => setReps(e.target.value)} />
      <button type="submit">Add Exercise</button>
    </form>
  );
};

const ExerciseList = ({ exercises, currentExerciseIndex }) => {
  return (
    <div>
      {exercises.map((exercise, index) => (
        <div key={index}>
          <p>Exercise {index + 1}</p>
          <p>Sets: {exercise.sets}, Reps: {exercise.reps}</p>
          {index === currentExerciseIndex && <p>Current Exercise</p>}
        </div>
      ))}
    </div>
  );
};

const RestTimer = ({ restTime }) => {
  return (
    <div>
      <p>Rest Timer: {restTime} seconds</p>
      {/* Timer display */}
    </div>
  );
};

export default App;

