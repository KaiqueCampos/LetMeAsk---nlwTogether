import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button'

import '../styles/room.scss'

export function Room() {
    return (
        <div id="page-room">
            <header>
                <div className='content'>
                    <img src={logoImg} alt="LetMeAsk" />
                    <div>Código da sala</div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React </h1>
                    <span>4</span>
                </div>

                <form>
                    <textarea
                        placeholder="O que você quer perguntar?"
                    />

                    <div className="form-footer">
                        <span>Para enviar uma pergunta faça seu login <button>Faça seu Login</button></span>
                        <Button type="submit">
                            Enviar pergunta
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}