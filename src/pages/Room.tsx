import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss'

type RoomParams = {
    id: string,
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}>

type Question = {
    id: string,
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}

export function Room() {
    const { user } = useAuth()
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')

    const roomId = params.id;


    // Get questions in databse -> firebase documentation
    useEffect(() => {

        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
            // Take the questions from the room and type them.
            const databaseRoom = room.val()

            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })

    }, [roomId])

    async function handleSendQuestiion(event: FormEvent) {
        event.preventDefault();

        // Check 
        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in')
        }

        // Get question informations
        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighLighted: false,
            isAnswered: false
        }

        // Send question to database
        await database.ref(`rooms/${roomId}/questions`).push(question);

        // Clear textarea
        setNewQuestion('')
    }

    return (
        <div id="page-room">
            <header>
                <div className='content'>
                    <img src={logoImg} alt="LetMeAsk" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 ?? (<span>{questions.length}</span>)}
                </div>

                <form onSubmit={handleSendQuestiion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">

                        {(user) ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta faça seu login <button>Faça seu Login</button></span>
                        )}

                        <Button
                            type="submit"
                            disabled={!user}
                        >
                            Enviar pergunta
                        </Button>
                    </div>
                </form>

                {/* {JSON.stringify(questions)} */}
                {JSON.stringify(questions.map(value => value.content))}

            </main>
        </div >
    )
}