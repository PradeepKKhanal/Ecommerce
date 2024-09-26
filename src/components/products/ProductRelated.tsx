// import { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
import ProductRelatedCard from "./ProductRelatedCard";
import { Flex,Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import { addCart,ProductApi } from "../../type";

interface ProductRelatedProps{
	product:ProductApi,
	addCart:addCart
}
function ProductRelated({ product, addCart }:ProductRelatedProps) {
    const category=product.category;
    const id=product.id;
	console.log(id)
	// //console.log(category)
	// const [products, setProducts] = useState();
	console.log('hello')
	// useEffect(() => {
	// 	fetch(`https://fakestoreapi.com/products/category/${category}`)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			//console.log(data)
	// 			setProducts(data);
	// 		});
	// }, [id]);

	const {data:products,isLoading,isError,error}=useQuery({
		queryKey:['categories'],
		queryFn:async function(){
			const response=await axios.get(`https://fakestoreapi.com/products/category/${category}`)
			return response.data
		}
	})
	if(isLoading){
		return <p>Loading...</p>
	}
	if(isError){
		return <p>{error.message}</p>
	}
	return (
		<>
            <Heading textAlign='center' >You may also Like</Heading>
			<Flex gap='50px' justify='center' my='50px' flexWrap={'wrap'}>
				{products &&
					products.map((product:ProductApi) => {
						// console.log(product)
                        
						return product.id!=id?(<ProductRelatedCard key={product.id} product={product} addCart={addCart} />):'';
					})}
			</Flex>
		</>
	);
}

export default ProductRelated;
