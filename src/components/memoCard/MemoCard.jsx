import './MemoCard.css';

const MemoCard = ({animating, handleMemoClick, memoCard}) => {

    return (
    <div className="memo-block" onClick={() => (!memoCard.flipped && !animating) && handleMemoClick(memoCard)}>
        <div className={`memo-block-inner ${memoCard.flipped && 'memo-block-flipped'}`}>
            <div className="memo-block-front">
            </div>
            <div className="memo-block-back">
                {memoCard.emoji}
            </div>
        </div>
    </div>
    );
};

export default MemoCard;