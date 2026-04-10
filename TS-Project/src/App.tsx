import './App.css'
import { Card } from './components/Card.tsx'
import { Counter } from './components/Counter.tsx'
import type { coffee } from './types.ts'
import { Colist } from './components/list.tsx'
import OrderForm from './components/OrderForm.tsx'

const menu: coffee[] = [
  {id: 1, name: "Espresso", price: 300},
  {id: 2, name: "Latte", price: 1000},
  {id: 3, name: "Cappuccino", price: 450},
  {id: 4, name: "Mocha", price: 550},
]

function App() {

  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>  
          <Card name={"Headphones"} price={1990}/>
          <Card name={"Iphone 17"} price={120000}/>
        </div>
        <div>
          <Counter/>
        </div>
        <div>
          <Colist items={menu}/>
        </div>
        <div>
          <OrderForm onsubmit={(order)=>{
            console.log('Order received:', order.name, order.cups);

          }}/>
        </div>
      </section>


    </>
  )
}

export default App
