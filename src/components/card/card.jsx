import "./card.css";



export function Card({ price, image, title }){
    return(
        <div className="card">
            <img src={image}/>
            <h2>{title}</h2>
            <p> R$ {price}</p>
        </div>
    )
}