import { Link, useHistory } from 'react-router-dom'
import { FormEvent } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button/button'
import { useAuth } from '../hooks/useAuth'
import '../styles/auth.scss'
import { useState } from 'react'
import { database } from '../services/firebase'
import { sucessNotification, warningNotification } from '../utils/toastNotification'

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        // remove spaces and check if it is empty
        if (newRoom.trim() === '') {
            warningNotification("newRoom title has empty")
            return;
        }

        // reference to database entity
        const roomRef = database.ref('rooms');

        // push the data into reference
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        sucessNotification(`${newRoom} room successfully created`)
        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Ilustração - Perguntas e Respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                        />

                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}