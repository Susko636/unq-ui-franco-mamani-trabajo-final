import './MemoCard.css';
import signo from "../../assets/pregunta.svg"

const MemoCard = ({animating, handleMemoClick, memoCard}) => {

    return (
        <div className="memo-block" onClick={() => (!memoCard.flipped && !animating) && handleMemoClick(memoCard)}>
        <div className={`memo-block-inner ${memoCard.flipped && 'memo-block-flipped'}`}>
            <div className="memo-block-front"> <img src={signo} alt="" /> </div>
            <div className="memo-block-back">
                {memoCard.flipped ? (
                    <img src={memoCard.image} alt={`card-${memoCard.index}`} />
                ) : (
                    <div className="card-placeholder"> <img src={signo} alt="" /> </div>
                )}
            </div>
        </div>
    </div>
    );
};

export default MemoCard;