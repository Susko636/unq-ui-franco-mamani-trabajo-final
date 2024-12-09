import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Board from '../board/Board.jsx'

const Home = () => {

    const navigate = useNavigate();
    const [boardSize, setBoardSize] = useState(4); // Tamaño por defecto
    const emojiList = [...'💣🧤🎩🌮🎱🌶🍕🦖'];
    const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
    const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
    const [animating, setAnimating] = useState(false);

    useEffect( () => {
        const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
        setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i) => ({ index: i, emoji, flipped: false}) ));
    }, []);

    const handleStartGame = () => {
        navigate(`/board`); 
    }

    const shuffleArray = a => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    const handleMemoClick = memoBlock => {
        const flippedMemoBlock = { ...memoBlock, flipped: true };
        let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        if(selectedMemoBlock === null) {
          setselectedMemoBlock(memoBlock);
        } else if(selectedMemoBlock.emoji === memoBlock.emoji) {
          setselectedMemoBlock(null);
        } else {
          setAnimating(true);
          setTimeout(() => {
            shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
            shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
            setShuffledMemoBlocks(shuffledMemoBlocksCopy);
            setselectedMemoBlock(null);
            setAnimating(false);
          }, 1000);
        }
    }

    return (
        
        <div>
            <h1>Juego de Memotest</h1>
            <p>Selecciona el tamaño del tablero:</p>
            <select value={boardSize} onChange={(e) => setBoardSize(e.target.value)}>
                <option value={4}>4x4</option>
                <option value={5}>5x5</option>
                <option value={8}>8x8</option>
            </select>
        <br />
        <button onClick={handleStartGame}> Jugar </button>
        <Board memoBlocks={shuffledMemoBlocks} animating={animating}  handleMemoClick={handleMemoClick} />
        </div>
    )

}

export default Home;