 interface Cardprop {
    name: string;
    price: number;
    isSpecial?: boolean;
  }

export function Card({name,price,isSpecial=false}: Cardprop) {
  return (
    <article>
      <h2>{name} {isSpecial&&<span>😊</span>}</h2>
      <p>{price}</p>
    </article>
  )
}