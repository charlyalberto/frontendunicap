import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const AuthContext = React.createContext();

function useAuth() {
  return useContext(AuthContext);
}

function Administracao() {
  let navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = firebase.auth();
    const foodRef = firebase.database().ref('foodList');

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        foodRef.on('value', (snapshot) => {
          const foods = snapshot.val();
          if (foods) {
            const foodArray = Object.entries(foods).map(([id, data]) => ({
              id,
              ...data,
            }));
            setFoodList(foodArray);
          } else {
            setFoodList([]);
          }
        });
      } else {
        setUser(null);
        setFoodList([]);
      }
    });

    return () => {
      unsubscribe();
      foodRef.off();
    };
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleAddFood = () => {
    const newFood = {
      title: title,
      price: price,
      image: image,
    };

    firebase.database().ref('foodList').push(newFood);

    setTitle('');
    setPrice('');
    setImage('');
  };

  const handleEditFood = (foodId, field, value) => {
    firebase
      .database()
      .ref(`foodList/${foodId}`)
      .update({
        [field]: value,
      });
  };

  const handleDeleteFood = (foodId) => {
    firebase.database().ref(`foodList/${foodId}`).remove();
  };

  const handleDeleteAllFoods = () => {
    firebase.database().ref('foodList').remove();
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    navigate('/');
  };

  const authContextValue = {
    user,
    handleLogout,
  };

  return (
    <div className="admin-panel-container">
              <div className="admin-logout-container">

      <h2 className="admin-panel-title">Painel de Administração</h2>
      {user && (
          <button
            className="admin-logout-button"
            onClick={handleLogout}
          >
            Sair
          </button>)}
        </div>
      
      {!user && <p>Por favor, faça login para acessar o painel de administração.</p>}
      {user && (
        <div className="admin-form-container">
          <label htmlFor="title" className="admin-label">
            Título:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="admin-input"
          />
          <label htmlFor="price" className="admin-label">
            Preço:
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
            className="admin-input"
          />
          <label htmlFor="image" className="admin-label">
            URL da Imagem:
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={handleImageChange}
            className="admin-input"
          />
          <button onClick={handleDeleteAllFoods} className="admin-button">
            Apagar cardápio
          </button>
        </div>
      )}
      {user && (
        <div className="food-list-container">
          <h3 className="food-list-title">Lista de Comidas</h3>
          <ul className="food-list">
            {foodList.map((food) => (
              <li key={food.id} className="food-item">
                <div className="food-item-image">
                  <img src={food.image} alt={food.title} />
                </div>
                <div className="food-item-details">
                  <h4 className="food-item-title">
                    {food.editing ? (
                      <input
                        type="text"
                        value={food.title}
                        onChange={(e) =>
                          handleEditFood(food.id, 'title', e.target.value)
                        }
                      />
                    ) : (
                      food.title
                    )}
                  </h4>
                  <p className="food-item-price">
                    {food.editing ? (
                      <input
                        type="text"
                        value={food.price}
                        onChange={(e) =>
                          handleEditFood(food.id, 'price', e.target.value)
                        }
                      />
                    ) : (
                      `R$ ${food.price}`
                    )}
                  </p>
                  {food.editing ? (
                    <input
                      type="text"
                      value={food.image}
                      onChange={(e) =>
                        handleEditFood(food.id, 'image', e.target.value)
                      }
                    />
                  ) : (
                    <p className="food-item-image-url">{food.image}</p>
                  )}
                </div>
                <div className="food-item-buttons">
                  {food.editing ? (
                    <button
                      onClick={() =>
                        handleEditFood(food.id, 'editing', false)
                      }
                      className="food-item-button"
                    >
                      Salvar
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleEditFood(food.id, 'editing', true)
                      }
                      className="food-item-button"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteFood(food.id)}
                    className="food-item-button"
                  >
                    Apagar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="buttonAdmin" onClick={handleAddFood}>
Adicionar ao Cardápio
          </button>
        </div>
      )}
    </div>
  );
}

export default Administracao;
