import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/Navbar";

import Home from "./pages/Home.tsx";
import Products from "./pages/Products.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import Checkout from "./pages/Checkout.tsx";
import Cart from "./pages/Cart.tsx";
import Category from "./pages/Category.tsx";
import { useEffect, useState } from "react";
import { ToastId, useToast } from "@chakra-ui/react";
import { Product } from "./type.ts";




function App() {
	const toast = useToast();

	const [cart, setCart] = useState<Product[]>(()=>{

      const storedCart=localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  

		// localStorage.getItem("cart") != null || 'undefined'? JSON.parse(localStorage.getItem("cart"))
		// 	: []
	);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const addCart = (product:Product):ToastId => {
		//console.log(product);
		const id = product.id;
		const quantity = product.quantity;
		let newProduct:Product[] = [];

		if (
			cart?.every((product) => {
				return product.id !== id;
			})
		) {
			newProduct = [...cart, product];
		} else {
			if (cart?.length>0) {
				// newProduct = [...cart];
				cart?.forEach((product) => {
					if (id === product.id) {
						updateCart(
							product.id,
							quantity > 1 ? quantity :quantity===0 ?0:quantity + 1
						);
					}
				});
			} else {
				newProduct = [product];
			}
		}

		if (newProduct.length != 0) {
			setCart(newProduct);
		}
		return toast({
			title: "Item added",
			description: "Item is added in cart.Please visit cart",
			status: "success",
			duration: 1000,
		});
	};



	const deleteCart = (id:number) => {
		let newProduct = cart.filter((product) => {
			return product.id !== id;
		});
		setCart(newProduct);
	};



	const updateCart = (id:number, quantity:number) => {
		let newProduct = cart.map((product) => {
			return product.id !== id ? product : { ...product, quantity: quantity };
		});
		setCart(newProduct);
	};

	return (
		<>
			<BrowserRouter>
				<Navbar
					count={cart?.reduce((a, b) => {
						return a + Number(b.quantity);
					}, 0)}
				></Navbar>

				<Routes>
					<Route path="/" element={<Home addCart={addCart} />}></Route>
					<Route
						path="/products"
						element={<Products addCart={addCart} />}
					></Route>
					<Route
						path="/products/:id"
						element={
							<ProductDetails
								cart={cart}
								addCart={addCart}
								updateCart={updateCart}
							/>
						}
					></Route>
					<Route path="/checkout" element={<Checkout cart={cart} />}></Route>
					<Route
						path="/cart"
						element={
							<Cart
								cart={cart}
								addCart={addCart}
								updateCart={updateCart}
								deleteCart={deleteCart}
							/>
						}
					></Route>
					<Route
						path="/category/:categoryName"
						element={<Category addCart={addCart} />}
					></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
