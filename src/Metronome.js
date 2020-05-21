import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Metronome.css';
import clickOne from './sounds/click1.wav';
import clickTwo from './sounds/click2.wav';

function Metronome() {

  const [bpm, setBpm] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [count, setcount] = useState(0);
  const beatsPerMeasure = 4;
  const timer = useRef()
  const click1 = new Audio(clickOne);
  const click2 = new Audio(clickTwo);

  const playClick = useCallback(() => {
    if (count % beatsPerMeasure === 0) {
      click2.play()
    } else {
      click1.play()
    }
    setcount(prevCount => (prevCount + 1) % beatsPerMeasure)
  }, [count, click1, click2])

  useEffect(() => {
    if (playing) {
      clearInterval(timer.current)
      timer.current = setInterval(playClick, (60 / bpm) * 1000)
    } else {
      clearInterval(timer.current)
    }
  }, [bpm, playing, playClick, count, click1, click2])

  const startStop = () => {
    if (playing) {
      setPlaying(false)
    } else {
      setcount(0)
      setPlaying(true)
    }
  }

  const handleBpmChange = e => {
    setBpm(e.target.value)

    if (playing) {
      setcount(0)
    }
  }

  return (
    <div className="metronome">
      <div className="bpm-slider">
        <div>{bpm} BPM</div>
        <input
          type="range"
          min="60"
          max="240"
          value={bpm}
          onChange={handleBpmChange}></input>
      </div>

      <button onClick={startStop}>
        {playing ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}

export default Metronome;