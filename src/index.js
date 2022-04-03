import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const RootElement = document.getElementById('root');
const Root = ReactDOM.createRoot(RootElement);

Root.render(
  <App />
);

function App() {
  
  const [activeTimer, setActiveTimer] = useState('session');    //Estado que define el timer activo
  const [timerState, setTimerState] = useState(0);              //Estado que define si el timer esta activo (1) o inavtivo (0)
  const [tiempoAtras,setTiempoAtras] = useState(0);             //Estado que da seguimiento a la cuenta atrás
  const [timeSetSession, setTimeSetSession] = useState(25);     //Estado que define el tiempo inicial del timer de trabajo
  const [timeSetBreak, setTimeSetBreak] = useState(5);          //Estado que define el tiempo inicial del timer de descanso

  //en el ejemplo esta es renders
  const cuentaAtras = useRef(0);                                //Será la forma de actualizar el contador en cada renderizado
  const timerId = useRef();                                     //Almacena la referencia a la función setInterval para poder cerrarla
  const alarma = document.getElementById('beep');

  const startTimerSession = () => {
    timerId.current = setInterval(() => {
      setTiempoAtras(cuentaAtras.current);
      cuentaAtras.current--;
      if (cuentaAtras.current < 0) {
        alarma.play();                                          //beep
        clearInterval(timerId.current);
        cuentaAtras.current = timeSetBreak*60;
        setActiveTimer('break');
        startTimerBreak();
      }
    },1000);
  }

  const startTimerBreak = () => {
    timerId.current = setInterval(() => {
      setTiempoAtras(cuentaAtras.current);
      cuentaAtras.current--;
      if (cuentaAtras.current < 0) {
        alarma.play();                                          //beep
        clearInterval(timerId.current);
        cuentaAtras.current = timeSetSession*60;
        setActiveTimer('session');
        startTimerSession();
      }
    },1000);
  }

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  }

  const resetTimer = () => {
    alarma.play();                                              //beep
    clearInterval(timerId.current);
    timerId.current = 0;
    setTimerState(0);
    cuentaAtras.current = 0;
    setTiempoAtras(0);
    setActiveTimer('session');
  }

  const controlTimer = () => {
    if (timerState === 0) {
      if (activeTimer === 'session') {
        setTimerState(1);
        cuentaAtras.current = (cuentaAtras.current === 0) ? timeSetSession*60 : cuentaAtras.current;
        startTimerSession();
      } else {
        setTimerState(1);
        cuentaAtras.current = (cuentaAtras.current === 0) ? timeSetBreak*60 : cuentaAtras.current;
        startTimerBreak();
      }
    } else {
      setTimerState(0);
      stopTimer();
    }
  }

  const minutosSegundos = n => {
    let minuto = Math.floor(n/60);
    let segundo = n%60;
    return `${minuto > 9 ? minuto : `0${minuto}`}:${segundo > 9 ? segundo : `0${segundo}`}`;
  }

  const incTimeSetSession = () => {
    if (timeSetSession < 60 && timerState === 0 && cuentaAtras.current === 0) {
      setTimeSetSession(timeSetSession + 1);
    } 
  }
  
  const decTimeSetSession = () => {
    if (timeSetSession > 1 && timerState === 0 && cuentaAtras.current === 0) {
      setTimeSetSession(timeSetSession - 1);
    } 
  }

  const incTimeSetBreak = () => {
    if (timeSetBreak < 60 && timerState === 0 && cuentaAtras.current === 0) {
      setTimeSetBreak(timeSetBreak + 1);
    } 
  }

  const decTimeSetBreak = () => {
    if (timeSetBreak > 1 && timerState === 0 && cuentaAtras.current === 0) {
      setTimeSetBreak(timeSetBreak - 1);
    } 
  }

  return (
    <div className='main-container'>
      <div className='config-container'>
        <div className='titulo-config'>
          Configuración
        </div>
        <div 
          className='label-session' 
          id='session-label'>
          Trabajo
        </div>
        <div className='session-container'>
          <div className='session-display'>
            <TimeSet 
              timerType={'session'} 
              setTimer={timeSetSession} 
            />
          </div>
          <div className='session-control'>
            <Incrementa 
              timerType={'session'} 
              clickHandel={incTimeSetSession} 
            />
            <Decrementa 
              timerType={'session'} 
              clickHandel={decTimeSetSession} 
            />
          </div>
        </div>
        <div 
          className='label-session' 
          id='break-label'>
          Descanso
        </div>
        <div className='break-container'>
          <div className='break-display'>
            <TimeSet 
              timerType={'break'} 
              setTimer={timeSetBreak} 
            />
          </div>
          <div className='break-control'>
            <Incrementa 
              timerType={'break'} 
              clickHandel={incTimeSetBreak} 
            />
            <Decrementa 
              timerType={'break'} 
              clickHandel={decTimeSetBreak}
            />
          </div>
        </div>
      </div>
      <div className='timer-container'>
        <div className='titulo-timer'>
          Temporizador
        </div>
        <div className='timer-cont-display'>
          <TimerLabel 
            activeLabel={activeTimer} />
          <TimeLeft 
            muestraCuenta={minutosSegundos((timerState === 0 && cuentaAtras.current === 0) ? timeSetSession*60 : tiempoAtras)}/>
        </div>
      </div>
      <div className='control-container'>
        <div className='titulo-control'>
          Control
        </div>
        <div className='ctrl-btn-container'>
          <StartStop 
            clicControl={controlTimer}
            timerActivo={activeTimer} 
            estadoDelTimer={timerState} 
          />
          <Reset 
            clickHandel={resetTimer}/>
        </div>
      </div>
      <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
  )
}

function TimeSet(props) {
  return(
    <div className='time-set' id={`${props.timerType}-length`}>
      {props.setTimer} min
    </div>
  );
}

function Incrementa(props) {
  return(
    <span 
      className="material-icons arrows" 
      id={`${props.timerType}-increment`}
      onClick={() => props.clickHandel()}>
      arrow_upward
    </span>
  )
}

function Decrementa(props) {
  return(
    <span 
      className="material-icons arrows"
      id={`${props.timerType}-decrement`}
      onClick={() => props.clickHandel()}>
      arrow_downward
    </span>
  )
}

function TimerLabel(props) {
  return(
    <div id='timer-label'>
      {props.activeLabel}
    </div>
  );
}

function TimeLeft(props) {
  return(
    <div id='time-left'>
      {props.muestraCuenta}
    </div>
  );
}

function StartStop(props) {
  return(
    <button 
      id='start_stop' 
      className='botones' 
      onClick={() => props.clicControl()}>
      {props.estadoDelTimer === 0 ? 'Start' : 'Stop'}
    </button>
  )
}

function Reset(props) {
  return(
    <button 
      id='reset' 
      className='botones' 
      onClick={() => props.clickHandel()}>
      {'Reset'}
    </button>
  )
}