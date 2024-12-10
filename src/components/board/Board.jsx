import MemoCard from '../memoCard/MemoCard';
import './Board.css';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Board = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const boardSize = parseInt(searchParams.get("size")) || 4;
    const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
    const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [score, setScore] = useState(0);
    const emojiList = [
        "💣", "🧤", "🎩", "🌮", "🎱", "🌶", "🍕", "🦖",
        "🍩", "🦄", "🎃", "🚀", "🐠", "🌈", "🥑", "🛸",
        "🐼", "🍓", "🍔", "🎮", "📚", "🖌", "🎯", "🐧",
        "🐢", "🍇", "🎹", "🐸", "🍒", "🧸", "🎈", "🏀"
    ];

    useEffect(() => {
        resetGame();
    }, [boardSize]);

    const resetGame = () => {
        const totalBlocks = boardSize * boardSize;
        const numPairs = totalBlocks / 2;
        const selectedEmojis = emojiList.slice(0, numPairs);
        const shuffledEmojiList = shuffleArray([...selectedEmojis, ...selectedEmojis]);

        setShuffledMemoBlocks(
            shuffledEmojiList.map((emoji, index) => ({
                index,
                emoji,
                flipped: false,
            }))
        );
        setSelectedMemoBlock(null);
        setAnimating(false);
        setGameWon(false);
        setScore(0);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleMemoClick = (memoBlock) => {
        if (animating || gameWon || memoBlock.flipped) return;

        const flippedMemoBlock = { ...memoBlock, flipped: true };
        const shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
        shuffledMemoBlocksCopy[memoBlock.index] = flippedMemoBlock;
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);

        if (selectedMemoBlock === null) {
            setSelectedMemoBlock(flippedMemoBlock);
        } else if (selectedMemoBlock.emoji === memoBlock.emoji) {
            setSelectedMemoBlock(null);
            setScore((prevScore) => prevScore + 10);
            checkWinCondition(shuffledMemoBlocksCopy);
        } else {
            setAnimating(true);
            setTimeout(() => {
                shuffledMemoBlocksCopy[memoBlock.index] = { ...memoBlock, flipped: false };
                shuffledMemoBlocksCopy[selectedMemoBlock.index] = { ...selectedMemoBlock, flipped: false };
                setShuffledMemoBlocks(shuffledMemoBlocksCopy);
                setSelectedMemoBlock(null);
                setAnimating(false);
            }, 1000);
        }
    };

    const checkWinCondition = (memoBlocks) => {
        const allFlipped = memoBlocks.every((block) => block.flipped);
        if (allFlipped) {
            setGameWon(true);
        }
    };

    const backMenu = () => {
        navigate(`/`)
    }

    return (
        <div className="board-screen">
            <div className="score-bar">Puntaje: {score}</div>
            {gameWon && (
                <div className="notification">
                    <h2>¡Felicidades, ganaste!</h2>
                    <button className="play-again-button" onClick={resetGame}>Jugar de nuevo</button>
                    <br />
                    <button className="exit-button" onClick={backMenu}>Salir</button>
                </div>
            )}
            <div
                className={`board board-${boardSize}x${boardSize}`}
            >
                {shuffledMemoBlocks.map((memoBlock) => (
                    <MemoCard
                        key={memoBlock.index}
                        memoBlock={memoBlock}
                        animating={animating}
                        handleMemoClick={handleMemoClick}
                    />
                ))}
            </div>
            <button className="exit-button" onClick={backMenu}> Abandonar Partida </button>
        </div>
    );
};

export default Board;