import MemoCard from '../memoCard/MemoCard';
import './Board.css';

const Board = ({animating, handleMemoClick, memoBlocks}) => {
    return (
        <main className="board">
            {memoBlocks.map( (memoBlock, i) => {
                return <MemoCard key={`${i}_${memoBlock.emoji}`} animating={animating} handleMemoClick={handleMemoClick} memoBlock={memoBlock} />
            })}
        </main>
    );
}

export default Board;
