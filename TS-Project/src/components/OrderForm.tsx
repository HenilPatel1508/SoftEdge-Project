import React from 'react'
import { useState } from 'react'

interface OrderFormProps {
    onsubmit: (order: { name: string; cups: number }) => void
}
export function OrderForm({onsubmit}: OrderFormProps) {
    const [name, setName] = useState<string>("Masala")
    const [cups, setCups] = useState<number>(1)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onsubmit({name, cups})
    }
  return (
    <form onSubmit={handleSubmit}>           
        <label>
            Name:
            <input type="text" value={name} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                setName(e.target.value)
            } />    
        </label>
        <label>
            Cups:
            <input type="number" value={cups} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                setCups(Number(e.target.value))
            } />    
        </label>
        <button type="submit">Submit</button>

    </form>
  )
}

export default OrderForm
