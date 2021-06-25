import { ButtonHTMLAttributes } from 'react'
import '../styles/button.scss'

// in addition to the attributes of a button, with & + object we can pass other attributes.
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutline?: boolean;
}

// ...props -> rest operator (take the rest of the properties)
export function Button({ isOutline = false, ...props }: ButtonProps) {
    return (
        <button
            className={`button ${isOutline ? 'outline' : ''}`} 
            {...props}
        />
    )
}