import './Game.css'
import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';


const CELL_SIZE = 20;

const operations = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

const generateEmptyGrid = (numRows, numCols) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => false))
  }

  return rows
}

const generateRandomGrid = (numRows, numCols) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? true : false)))
  }

  return rows

}

const Game = () => {
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)

  const numRows = height / CELL_SIZE;
  const numCols = width / CELL_SIZE;

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid(numRows, numCols)
  });

  const [interval, setInterval] = useState(100)

  const [isRunning, setIsRunning] = useState(false)
  const runningRef =  useRef(isRunning);
  runningRef.current = isRunning;

  const runIteration = useCallback(() => {
    if (!runningRef.current) {
      return;
    } 
    
    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ]
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = false;
            } else if (g[i][j] === false && neighbors === 3) {
              gridCopy[i][j] = true
            }
          }
        }
      })
    })

    setTimeout(runIteration, interval)
  },[interval, numRows, numCols])

  const handleIntervalChange = (event) => {
     setInterval(event.target.value);
  }

  return (
    <>
      <p>Riafugemu</p>
      <div
        className="Grid"
        style={{ width: width, height: height, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map((rows, i) => 
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid =  produce(grid, gridCopy => {
                  gridCopy[i][j] = grid[i][j] ? false : true;
                });
                setGrid(newGrid);
              }}
              style={{
                left: `${CELL_SIZE * i + 1}px`,
                top: `${CELL_SIZE * j + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
                backgroundColor: grid[i][j] ? '#32f720' : undefined
              }} 
            />
          ))
        )}
      </div>
      <div className="Controls">
        Update every <input type="text" pattern="[0-9]*" value={interval} onChange={handleIntervalChange} /> msec
        <button
          className="Button"
          onClick={() => {
            setIsRunning(!isRunning);
            if (!isRunning) {
              runningRef.current = true;
              runIteration();
            }
          }}
          >
          {isRunning ? "stop" : "start"}
        </button>
        
        <button
          className="Button"
          onClick={() => {
            setGrid(generateRandomGrid(numRows, numCols))
          }}
        >
          Random
        </button>

        <button
          className="Button"
          onClick={() => {
            setGrid(generateEmptyGrid(numRows, numCols))
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
}

export default Game;