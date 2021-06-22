import { createContext, ReactNode, useEffect, useState } from "react"
import { auth, firebase } from '../services/firebase'

type User = {
    id: string;
    name: string;
    avatar: string
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => void;
}

export const AuthContext = createContext({} as AuthContextType)

type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthContextProviderProps({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();

    // Keeps user information in the application
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user

                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account')
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })

        return () => {
            unsubscribe()
        }

    }, [])

    async function signInWithGoogle() {

        //Login with Google
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { displayName, photoURL, uid } = result.user

            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account')
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }


    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// export const useAuthContext = () => {
//     return useContext(AuthContext)
// }

// whenever you use an EventListener inside useEffect it is good practice to disconnect from it at the end of its execution.