import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"

import { Button } from "../components/Button"
import '../styles/auth.scss'
import { database } from '../services/firebase'

export function NewRoom(){
  const { user } = useAuth()
  const history = useHistory()
  
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRom(event: FormEvent){
      event.preventDefault()

      if(newRoom.trim() === ''){/*Verificar se tem algo escrito com newRoom usa o .trim para tirar os espaços para o cara nao digitar (      )*/
        return;
      }

      const roomRef = database.ref('rooms'); 

      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
      })

      history.push(`/rooms/${firebaseRoom.key}`)
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-container">
          <img src={logoImg} alt="Letmeask" />
        <h2>Criar uma nova sala </h2>
        <form onSubmit={handleCreateRom}>
          <input 
          type="text"
          placeholder="Nome da sala"
          onChange={event => setNewRoom(event.target.value)}
          value={newRoom}
          />
          <Button type="submit">
            Criar Sala
          </Button>
        </form>
        <p>
          Quer entrar em uma sala existente?<Link to="#">clique aqui</Link>
        </p>
       </div>
      </main>
    </div>
  )
}