import MemoCard from '../memoCard/MemoCard';
import './Board.css';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Board = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const boardSize = parseInt(searchParams.get("size")) || 4;
    const [shuffledMemoCards, setShuffledMemoCards] = useState([]);
    const [selectedMemoCard, setSelectedMemoCard] = useState(null);
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
        const shuffledImagesList = shuffledList(boardSize, emojiList);
        const memoCards = shuffledImagesList.map((emoji, index) => ({
            index,
            emoji,
            flipped: false,
        }));
    
        setShuffledMemoCards(memoCards);
        setSelectedMemoCard(null);
        setAnimating(false);
        setGameWon(false);
        setScore(0);
    };
    
    const shuffledList = (boardSize, emojiList) => {
        const numPairs = (boardSize * boardSize) / 2;
        const selectedEmojis = emojiList.slice(0, numPairs);
        return shuffleArray([...selectedEmojis, ...selectedEmojis]);
    };
    
    const shuffleArray = (array) => {
        return array
            .map((item) => ({ item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ item }) => item);
    };
    
    const handleMemoClick = (memoCard) => {
        if (animating || gameWon || memoCard.flipped) return;
    
        const flippedMemoCard = { ...memoCard, flipped: true };
        const updatedCards = [...shuffledMemoCards];
        updatedCards[memoCard.index] = flippedMemoCard;
        setShuffledMemoCards(updatedCards);
    
        if (!selectedMemoCard) {
            setSelectedMemoCard(flippedMemoCard);
        } else {
            processMemoMatch(flippedMemoCard, updatedCards);
        }
    };
    
    const processMemoMatch = (currentCard, updatedCards) => {
        if (currentCard.emoji === selectedMemoCard.emoji) {
            handleCorrectMatch(updatedCards);
        } else {
            handleIncorrectMatch(currentCard, updatedCards);
        }
    };
    
    const handleCorrectMatch = (updatedCards) => {
        setSelectedMemoCard(null);
        setScore((prevScore) => prevScore + 10);
        checkWinCondition(updatedCards);
    };
    
    const handleIncorrectMatch = (currentCard, updatedCards) => {
        setAnimating(true);
        setTimeout(() => {
            updatedCards[currentCard.index] = { ...currentCard, flipped: false };
            updatedCards[selectedMemoCard.index] = { ...selectedMemoCard, flipped: false };
            setShuffledMemoCards(updatedCards);
            setSelectedMemoCard(null);
            setAnimating(false);
        }, 1000);
    };        

    const checkWinCondition = (memoCards) => {
        const allFlipped = memoCards.every((card) => card.flipped);
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
                {shuffledMemoCards.map((memoCard) => (
                    <MemoCard
                        key={memoCard.index}
                        memoCard={memoCard}
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