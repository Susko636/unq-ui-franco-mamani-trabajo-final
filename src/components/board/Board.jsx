import MemoCard from '../memoCard/MemoCard';
import './Board.css';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import cardIcons from "./CardIcons"

const Board = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const boardSize = parseInt(searchParams.get("size")) || 4;
    const [shuffledMemoCards, setShuffledMemoCards] = useState([]);
    const [selectedMemoCard, setSelectedMemoCard] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        resetGame();
    }, [boardSize]);
    const resetGame = () => {
        const shuffledImageList = createShuffledImageList(boardSize, Object.values(cardIcons));
        const memoCards = shuffledImageList.map((image, index) => ({
            index,
            image,
            flipped: false,
        }));
    
        setShuffledMemoCards(memoCards);
        setSelectedMemoCard(null);
        setAnimating(false);
        setGameWon(false);
        setScore(0);
    };
    
    const createShuffledImageList = (boardSize, imageList) => {
        const numPairs = (boardSize * boardSize) / 2;
        const selectedImages = imageList.slice(0, numPairs);
        return shuffleArray([...selectedImages, ...selectedImages]);
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
        if (currentCard.image === selectedMemoCard.image) {
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
        <div className="game-wrapper">
            <header className="game-header"> Puntaje: {score}</header>
            {gameWon && (
                <div className="notification-popup">
                    <p> Ganaste </p>
                    <button className="button-play-again" onClick={resetGame}>Jugar de nuevo</button>
                    <br />
                    <button className="button-exit" onClick={backMenu}>Salir</button>
                </div>
            )}
            <div className={`game-board game-board-${boardSize}x${boardSize}`}>
                {shuffledMemoCards.map((memoCard) => (
                    <MemoCard
                        key={memoCard.index}
                        memoCard={memoCard}
                        animating={animating}
                        handleMemoClick={handleMemoClick}
                    />
                ))}
            </div>
            <button className="button-exit" onClick={backMenu}> Abandonar Partida </button>
        </div>
    );
    
};

export default Board;