import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string, {
        authorId: string
    }>;
}>


type QuestionType = {
    id: string,
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string) {
    const { user } = useAuth()
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

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
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, likes]) => likes.authorId === user?.id)?.[0],
                }
            })

            const orderedQuestions = parsedQuestions.sort(function (a, b) {

                let question1 = a.isAnswered ? -10 : (a.isHighLighted ? (a.likeCount > b.likeCount ? 2 : 1) : (a.likeCount > b.likeCount ? 0.5 : 0))
                let question2 = b.isAnswered ? -10 : (b.isHighLighted ? (b.likeCount > a.likeCount ? 2 : 1) : (b.likeCount > a.likeCount ? 0.5 : 0));

                return question2 - question1;
            });

            setTitle(databaseRoom.title)
            setQuestions(orderedQuestions)
        })

        return () => {
            roomRef.off('value');
        }

    }, [roomId, user?.id])

    return { questions, title }
}

// Some -> find or not and return a boolean