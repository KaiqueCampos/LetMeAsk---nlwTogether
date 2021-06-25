import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import googleIconImg from '../assets/images/google-icon.svg'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import logoDarkImg from '../assets/images/logoDark.svg'
import { Button } from '../components/Button/button'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { database } from '../services/firebase'
import '../styles/auth.scss'
import { errorNotification, warningNotification } from '../utils/toastNotification'

export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
    const { toggleTheme, theme, buttonThemeState } = useTheme();


    function handleCreateRoom() {

        // if user are not logged, call SignIn function
        if (!user) {
            signInWithGoogle();
        }

        history.push('rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        // check if input is empty
        if (roomCode.trim() === '') {
            warningNotification('RoomCode has empty!');
            return;
        }

        // Get the room with key
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            errorNotification('Room does not exists!')
            return;
        }

        if (roomRef.val().endedAt) {
            errorNotification(`Room was closed`)
            return;
        }

        history.push(`rooms/${roomCode}`)
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Ilustração - Perguntas e Respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <button
                className='toggleButtonTheme'
                onClick={() => toggleTheme(theme)}
            >
                Mudar Tema
            </button>

            <main>
                <div className="main-content">
                    <img src={theme === 'light' ? logoImg : logoDarkImg} alt="Letmeask" />

                    <button className='create-room' onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Login com o Google" />
                        Crie sua sala com o Google
                    </button>

                    <div className='separator'>Entre em uma sala</div>

                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />

                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

// &amp; -> & comercial