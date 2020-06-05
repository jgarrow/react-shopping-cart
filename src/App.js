import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Contexts
import ProductContext from "./contexts/ProductContext";
import CartContext from "./contexts/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
    const [products] = useState(data);
    const [cart, setCart] = useState([]);

    const addItem = item => {
        // add the given item to the cart
        setCart([...cart, item]);
    };

    const removeItem = title => {
        let userCart = [...cart];

        // don't need the variable, just need what it's doing in the .find callback
        let isItemInCart = userCart.find((product, index) => {
            if (product.title === title) {
                if (userCart.length <= 1) {
                    userCart = [];
                } else {
                    userCart.splice(1, index);
                }
                return true;
            } else {
                return false;
            }
        });

        setCart(userCart);
    };

    return (
        <ProductContext.Provider value={{ products, addItem }}>
            <CartContext.Provider value={{ cart, removeItem }}>
                <div className="App">
                    <Navigation />
                    {/* Routes */}
                    <Route exact path="/" component={Products} />
                    <Route path="/cart" component={ShoppingCart} />
                </div>
            </CartContext.Provider>
        </ProductContext.Provider>
    );
}

export default App;
