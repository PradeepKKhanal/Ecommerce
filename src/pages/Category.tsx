import ProductCard from "../components/products/ProductCard";
// import { useEffect, useState } from "react";
import { Container, Flex, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import { addCart,ProductApi } from "../type";

interface CategoryProps{
	addCart:addCart
}

function Category({ addCart }:CategoryProps) {
	const { categoryName } = useParams<{categoryName:string}>();
	// console.log(categoryName);
	// const [products, setProducts] = useState([]);

	const {data:products,isLoading,isError,error}=useQuery(
		{
			queryKey:['categories',categoryName],
			queryFn:async function (){
				const response=await axios.get("https://fakestoreapi.com/products/category/" + categoryName)
				return response.data;
			}
		}
	)
	// useEffect(() => {
	// 	fetch("https://fakestoreapi.com/products/category/" + categoryName)
	// 		.then((response) => response.json())
	// 		.then((data) => setProducts(data));
	// }, [categoryName]);
	if(isLoading){
		return (<p>Loading...</p>)
	}
	if(isError){
		return <p>{error.message}</p>
	}
	return (
		<>
			<Container maxW="85%" my="100px">
				<Heading
					m="auto"
					fontFamily={"cursive"}
					borderBottom={"5px solid gray"}
					w="fit-content"
					p='20px 0px'
				>
					{(categoryName || "").charAt(0).toUpperCase() + (categoryName || "").slice(1)}
				</Heading>
				<Flex wrap={"wrap"} gap={"50px"} justifyContent={"center"}>
					{products?.length && (
						products.map((product:ProductApi) => {
							return (
								<div key={product.id}>
									<ProductCard
										product={product}
										addCart={addCart}
									></ProductCard>
								</div>
							);
						})
					) }
				</Flex>
			</Container>
		</>
	);
}

export default Category;
