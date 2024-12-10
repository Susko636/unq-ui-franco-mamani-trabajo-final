import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
    const [boardSize, setBoardSize] = useState(4);

    const handleStartGame = () => {
        navigate(`/board?size=${boardSize}`);
    };

    return (
        <div>
            <h1>Juego de Memotest</h1>
            <p>Selecciona el tamaño del tablero:</p>
            <select value={boardSize} onChange={(e) => setBoardSize(parseInt(e.target.value))}>
                <option value={2}>2x2</option>
                <option value={4}>4x4</option>
                <option value={6}>6x6</option>
                <option value={8}>8x8</option>
            </select>
            <br />
            <button onClick={handleStartGame}>Jugar</button>
        </div>
    );
};

export default Home;