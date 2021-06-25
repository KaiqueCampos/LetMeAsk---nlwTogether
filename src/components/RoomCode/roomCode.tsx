import copyImg from '../../assets/images/copy.svg';
import './styles.scss'
import { sucessNotification } from '../../utils/toastNotification'

type RoomCodeProps = {
    code: string
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipBoard() {
        navigator.clipboard.writeText(props.code)
        sucessNotification("Copy")
    }

    return (
        <button
            className="room-code"
            onClick={copyRoomCodeToClipBoard}
        >
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span> Sala #{props.code}</span>
        </button>
    )
}