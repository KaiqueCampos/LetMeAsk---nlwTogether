import { useHistory, useParams } from 'react-router-dom';
import answerImg from '../assets/images/answer.svg';
import checkImg from '../assets/images/check.svg';
import deleteImg from '../assets/images/delete.svg';
import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logoDark.svg'
import { Button } from '../components/Button/button';
import { Question } from '../components/Question/question';
import { RoomCode } from '../components/RoomCode/roomCode';
import { useRoom } from '../hooks/useRoom';
import { useTheme } from '../hooks/useTheme';
import { database } from '../services/firebase';
import '../styles/room.scss';
import { sucessNotification } from '../utils/toastNotification';

type RoomParams = {
    id: string,
}

export function AdminRoom() {
    // const { user } = useAuth()
    const history = useHistory()
    const params = useParams<RoomParams>();
    const {theme} = useTheme();

    const roomId = params.id;
    const { questions, title } = useRoom(roomId)

    async function handleEndRoom() {
        database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        sucessNotification(`Room was finished on ${new Date().toLocaleString()}`)
        history.push('/')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja deletar essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
            sucessNotification('Question was deleted successfully!')
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update(({
            isAnswered: true,
        }))
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update(({
            isHighLighted: true,
        }))
    }

    return (
        <div id="page-room">
            <header>
                <div className='content'>
                    <img src={theme === 'light' ? logoImg : logoDarkImg} alt="LetMeAsk" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button
                            isOutline
                            onClick={handleEndRoom}
                        >Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 ?? (<span>{questions.length}</span>)}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighLighted={question.isHighLighted}
                            >

                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar como respondida" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque a pergunta" />
                                        </button>
                                    </>
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover Pergunda" />
                                </button>
                            </Question>
                        )
                    })}
                </div>

            </main>
        </div >
    )
}