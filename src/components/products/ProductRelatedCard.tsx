import { Flex, Box, Image, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductRateStar from "./ProductRateStar";
import { addCart, Product,ProductApi } from "../../type";

interface ProductRelatedCardProps{
	product:ProductApi,
	addCart:addCart
}
function ProductRelatedCard({ product, addCart }:ProductRelatedCardProps) {
	// //console.log(product)
	// console.log(product);
	// //console.log(product.id)
	//console.log(addCart)
	// console.log('product realted to card is called')

	return (
		<>
			<Box p="10px" w="170px" boxShadow={"0 0 10px 1px gray"}>
				{/* <Box height='50px' width={
					'100px'
					}> */}
				<Link to={`/products/${product.id}`}>
					<Image
						src={product.image}
						height="100px"
						margin="auto"
						width="100px"
					></Image>
					{/* </Box> */}
					<Text fontWeight="bold" fontSize="14px">
						{product.title.length > 25
							? product.title.slice(0, 17) + "..."
							: product.title}
					</Text>
					<Flex justifyContent="space-between" alignItems="center">
						<Text>${product.price}</Text>
						<ProductRateStar rating={product.rating}></ProductRateStar>
					</Flex>
				</Link>
				<Button
					width="100%"
					onClick={() => {
						addCart({
							id: product.id,
							title: product.title,
							quantity: 1,
							image: product.image,
							price: product.price,
						});
					}}
				>
					Add to Cart
				</Button>
			</Box>
		</>
	);
}

export default ProductRelatedCard;
