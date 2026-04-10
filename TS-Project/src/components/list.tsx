import type { coffee } from "../types"
import { Card } from "./Card"

interface listProps {
    items: coffee[]
}
export function Colist({items}: listProps) {
    
    return (        
        <div>
            {items.map((coffee) => (
                <Card 
                key={coffee.id} 
                name={coffee.name} 
                price={coffee.price}
                isSpecial={coffee.price > 500}
            />
            ))}
        </div>
    )
}
export default Colist