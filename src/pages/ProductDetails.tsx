import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/products/ProductInfo";
import { Container, Box, Flex } from "@chakra-ui/react";
import ProductRelated from "../components/products/ProductRelated";

import SideBar from "../components/sidebar/Sidebar";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { Product,ProductApi,addCart,updateCart } from "../type";
interface ProductDetailsProps{
	cart:Product[],
	addCart:addCart
	updateCart:updateCart
}

function ProductDetails({ cart, addCart, updateCart }:ProductDetailsProps) {
	// const [product, setProduct] = useState<ProductApi|null>(null);
	const { id } = useParams<{id:string}>();
	// console.log(id)
	// console.log('product Details called',id)


	const {data:product,isLoading,isError,error}=useQuery({
		queryKey:['product',id],
		queryFn:async function (){
			const response=await axios.get<ProductApi>("https://fakestoreapi.com/products" + "/" + id)
			window.scrollTo(0,0);
			return response.data
		},
	
	})
	// useEffect(() => {
	// 	fetch("https://fakestoreapi.com/products" + "/" + id)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setProduct(data);
	// 			window.scrollTo(0, 0);
	// 		});
	// }, [id]);

	if(isLoading){
		return <p>Loading...</p>

	}
	if(isError){
		return <p>{error.message}</p>
	}

	return (
		<>
			<Container maxW="1400px" my="100px">
				<Flex justifyContent='space-between' flexWrap={"wrap"} w="100%" gap='20px'>
					<Box w={{base:"100%",md:"70%"}}>
						{product && (
							<ProductInfo
								cart={cart}
								product={product}
								addCart={addCart}
								updateCart={updateCart}
							></ProductInfo>
						)}
					</Box>
					<Box w={{base:"100%",md:"25%"}} display={{base:'none',md:'block'}}>
						<SideBar></SideBar>
					</Box>
				</Flex>

				<Box my="100px">
					{product && (
						<ProductRelated
							product={product}
							addCart={addCart}
						></ProductRelated>
					)}
				</Box>
			</Container>
		</>
	);
}

export default ProductDetails;
