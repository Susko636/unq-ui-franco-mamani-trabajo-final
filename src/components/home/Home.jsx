import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css'

const Home = () => {

    const navigate = useNavigate();
    const [boardSize, setBoardSize] = useState(4);
    const [showRules, setShowRules] = useState(false);

    const handleStartGame = () => {
        navigate(`/board?size=${boardSize}`);
    };

    const toggleRules = () => {
        setShowRules((prev) => !prev); 
    };

    return (
        <div className='home'>
            <header className='home-header'>
                <h1>Juego de Memotest</h1>
            </header>
            <div className='home-content'>
                <div className='game-options'>
                    <p>Selecciona la dificultad </p>
                    <select className="difficulty-select" value={boardSize} onChange={(e) => setBoardSize(parseInt(e.target.value))}>
                        <option value={2}>2x2</option>
                        <option value={4}>fácil</option>
                        <option value={6}>medio</option>
                        <option value={8}>difícil</option>
                    </select>
                    <br />
                    <button className='play-button' onClick={handleStartGame}>Jugar</button>
                </div>
            </div>
            <div>
                <button className="info-button" onClick={toggleRules}>
                    {showRules ? "Ocultar Info" : "Mostrar Info"}
                </button>
                {showRules && (
                    <div className="rules">
                        <h2>Info</h2>
                        <p>
                            - Dificultades: fácil(4x4) medio(6x6) difícil(8x8). <br />
                            - Selecciona dos cartas para voltearlas.<br />
                            - Si las cartas coinciden, permanecerán descubiertas.<br />
                            - Si no coinciden, se voltearán nuevamente después de un segundo.<br />
                            - El objetivo es descubrir todas las cartas.<br />
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;