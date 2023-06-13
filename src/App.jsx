import React, { useState, useEffect } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { CreateModal } from './components/create-modal/create-modal';
import { NavLink } from 'react-router-dom';
import firebase from '../firebase';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const foodRef = firebase.database().ref('foodList');
    foodRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const foodArray = Object.entries(data).map(([id, food]) => ({
          id,
          ...food,
        }));
        setFoodData(foodArray);
      } else {
        setFoodData([]);
      }
    });

    return () => {
      foodRef.off();
    };
  }, []);


  return (
    <div className="container">
     
      <h1 className='titleCardapio'>Cardápio </h1>
      <div className="card-grid">
        {foodData.map((food) => (
          <Card
            key={food.id}
            price={food.price}
            title={food.title}
            image={food.image}
          />
        ))}
      </div>
       <NavLink to="/entrar">
        <button className="containerbutton">Administração</button>
      </NavLink>
    </div>
  );
}

export default App;
