import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const RootElement = document.getElementById('root');
const Root = ReactDOM.createRoot(RootElement);

Root.render(
  <App />
);

/*
function cuentaAtras(segundos) {
  let contador = segundos;
  
  const intervalo = setInterval(() => {
    console.log(contador);
    contador --;
    if (contador < 0) {
      clearInterval(intervalo);
      console.log('Ding!');
    }
  }, 1000);
}
*/

function App() {
  
  const [activeTimer, setActiveTimer] = useState('session');    //Estado que define el timer activo
  const [timerState, setTimerState] = useState(0);              //Estado que define si el timer esta activo (1) o inavtivo (0)
  const [tiempoAtras,setTiempoAtras] = useState(0);            //Estado que da seguimiento a la cuenta atrás
  const [timeSetSession, setTimeSetSession] = useState(2);      //Estado que define el tiempo inicial del timer de trabajo
  const [timeSetBreak, setTimeSetBreak] = useState(1);          //Estado que define el tiempo inicial del timer de descanso

  //en el ejemplo esta es renders
  const cuentaAtras = useRef(0);                                //Será la forma de actualizar el contador en cada renderizado
  const timerId = useRef();                                     //Almacena la referencia a la función setInterval para poder cerrarla

  const startTimer = () => {
    timerId.current = setInterval(() => {
      cuentaAtras.current--;
      setTiempoAtras(cuentaAtras.current);
      console.log(`startTimer() cuentaAtras = ${cuentaAtras.current}`);
      if (cuentaAtras.current <= 0) {
        console.log(`Cerrado desde startTimer`);
        clearInterval(timerId.current);
      }
    },1000);
  }

  const stopTimer = () => {
    console.log(`Pausado por stopTimer`);
    clearInterval(timerId.current);
    timerId.current = 0;
  }

  const resetTimer = () => {
    console.log(`Pausado por stopTimer`);
    clearInterval(timerId.current);
    timerId.current = 0;
    setTimerState(0);
    cuentaAtras.current = 0;
    setTiempoAtras(0);
    setActiveTimer('session');
  }

  const controlTimer = () => {
    if (timerState === 0) {
      console.log(`controlTimer(1) cuentaAtras = ${cuentaAtras.current}, timerState = ${timerState}`);
      setTimerState(1);
      cuentaAtras.current = (cuentaAtras.current === 0) ? (activeTimer === 'session' ? timeSetSession*60 : timeSetBreak*60) : cuentaAtras.current;
      console.log(`controlTimer(2) cuentaAtras = ${cuentaAtras.current}, timerState = ${timerState}`);
      startTimer();
    } else {
      console.log(`controlTimer(1) cuentaAtras = ${cuentaAtras.current}, timerState = ${timerState}`);
      setTimerState(0);
      stopTimer();
      console.log(`controlTimer(2) cuentaAtras = ${cuentaAtras.current}, timerState = ${timerState}`);
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
            muestraCuenta={minutosSegundos(tiempoAtras)}/>
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
      className="material-icons" 
      id={`${props.timerType}-increment`}
      onClick={() => props.clickHandel()}>
      arrow_upward
    </span>
  )
}

function Decrementa(props) {
  return(
    <span 
      className="material-icons"
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
      onClick={() => props.clicControl()}>
      {props.estadoDelTimer === 0 ? 'Start' : 'Stop'}
    </button>
  )
}

function Reset(props) {
  return(
    <button 
      id='reset' 
      onClick={() => props.clickHandel()}>
      {'Reset'}
    </button>
  )
}