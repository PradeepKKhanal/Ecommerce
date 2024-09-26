// import { useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import { Flex, Container, ToastId } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product,ProductApi } from "../type";


interface ProductProps {
	addCart: (product: Product) => ToastId;
}
function Products({ addCart }: ProductProps) {
	// console.log(addCart)
	// const [products, setProducts] = useState([]);
	// const [loading, setLoading] = useState(true);
	// const [productTitle,setProductTitle]=useState([])

	const {
		data: products,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: function () {
			return axios.get("https://fakestoreapi.com/products").then((response) => {
				return response.data;
			});
		},
	});

	if (isLoading) {
		return <p>Loading..</p>;
	}
	if (isError) {
		return <p>{error.message}</p>;
	}
	return (
		<>
			<Container maxW="1400px" my="100px">
				<Flex wrap={"wrap"} gap={"50px"} justifyContent={"center"}>
					{products?.length &&
						products.map((product:ProductApi) => {
							return (
								<div key={product.id}>
									<ProductCard
										product={product}
										addCart={addCart}
									></ProductCard>
								</div>
							);
						})}
				</Flex>
			</Container>
		</>
	);
}
export default Products;
