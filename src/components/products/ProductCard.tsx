import {
	Card,
	CardBody,
	CardFooter,
	Image,
	Text,
	Flex,
	Box,
	Button,
	ToastId
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductRateStar from "./ProductRateStar";

// import {Product, ProductApi } from "../../type";
// import { Product,ProductApi } from "../../type";
// console.log(Product,ProductApi)
import { Product,ProductApi } from "../../type";

// console.log(typeof Product)





interface ProductCardProps{
	product:ProductApi,
	addCart: (product: Product) => ToastId
}

function ProductCard({ product, addCart }:ProductCardProps) {
	// const toast=useToast();
	// console.log(productTitle)
	// console.log(product);
	return (
		<>
			<Card  w={{base:'90%',sm:'70%',md:'300px'}} m="auto" mt="50px" p='10px' >
				<Link to={`/products/${product.id}`}>
					<Box height="200px">
						<Image
							src={product.image}
							objectFit={"cover"}
							objectPosition={"center"}
							overflow={"hidden"}
							height={"100%"}
							margin={"auto"}
						></Image>
					</Box>

					<CardBody>
						<Text as="b" fontSize='17px' display="block" align="center" my='5px'>
							{product.title.length>23?product.title.slice(0,22)+"...":product.title}
						</Text>

						<Flex justify={"space-between"} my='10px'>
							{/* <Text>Rate stars</Text> */}
							<ProductRateStar rating={product.rating}></ProductRateStar>
							<Text as='b'>${product.price}</Text>
						</Flex>

						<Text fontSize='13px'>{product.description.slice(0, 100) + "..."}</Text>
					</CardBody>
				</Link>
				<CardFooter py='0' >
					<Button 
					fontSize='14px'
						m="auto"
						onClick={() => {
							addCart({
								id: product.id,
								title: product.title,
								price: product.price,
								category:product.category,
								quantity: 1,
								image:product.image
							});
							
						}}
					>
						Add to Cart
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}

export default ProductCard;
