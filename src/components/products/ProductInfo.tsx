import {
	Box,
	Flex,
	Image,
	Container,
	Heading,
	Text,
	HStack,
	Button,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";


import ProductRateStar from "./ProductRateStar";
import { useRef, useState } from "react";
import { Product,ProductApi,addCart,updateCart,deleteCart } from "../../type";

interface ProductInfoDetails{
	cart:Product[],
	product:ProductApi,
	addCart:addCart,
	updateCart:updateCart

}

function ProductInfo({ cart, product, addCart, updateCart }:ProductInfoDetails) {
	// const inputRef = useRef();
	const [buttonDisable,setButtonDisable]=useState(false)
	const [quantity,setQuantity]=useState(cart?.find((cartproduct)=>{return cartproduct.title===product.title})?.quantity ?? 1)
	console.log(cart)
	

	return (
		<>
			<h1></h1>
			<Flex gap="30px" direction={{base:'column',lg:'row'}}>
				{/* <p>{product.title}</p> */}
				{/* <Box  h='400px' overflow={'hidden'} border={'2px solid red'}> */}
				<Image src={product.image} maxH={{base:"250px",lg:"200px" ,xl:"300px"}}  textAlign={'center'} alignSelf={{base:'center',md:'flex-start'}}></Image>
				{/* </Box> */}

				<Box
					maxW="700px"
					display="Flex"
					flexDirection="column"
					gap="0px"
					px="30px"
				>
					<Heading py="20px">{product.title}</Heading>
					{/* <Text>Rating:{product.rating.rate}</Text> */}
					<Text>
						<span style={{ fontWeight: "bold", paddingRight: "5px" }}>
							Category:
						</span>
						{product.category}
					</Text>
					<Flex gap="30px" align="center">
						<ProductRateStar rating={product.rating}></ProductRateStar>
						<Box display="flex" my="10px">
							<Text fontWeight="bold">{product.rating.rate}</Text>
							<Text>/{product.rating.count}</Text>
						</Box>
					</Flex>

					<Text fontSize="40px">
						<Text as="span" color="green" pr="5px">
							$
						</Text>
						{product.price}
					</Text>

					<Text fontSize="lg">{product.description}</Text>

					<NumberInput
						defaultValue={cart?.find((cartproduct)=>{return cartproduct.title===product.title})?.quantity}
						min={0}
						max={30}
						clampValueOnBlur={true}
						mt="50px"
						size="lg"
						onChange={(val) => {
							// updateCart(product.id, value);
							setQuantity(Number(val))

							setButtonDisable(false)

						}}
					>
						<NumberInputField  />
						<NumberInputStepper>
							<NumberIncrementStepper
								fontSize="20px"
								h="50%"
								children="+"
								_active={{ bg: "grey", color: "white" }}
							/>
							<NumberDecrementStepper
								fontSize="25px"
								h="50%"
								children="-"
								_active={{ bg: "grey", color: "white" }}
							/>
						</NumberInputStepper>
					</NumberInput>
					<Button
						mt="20px"
						
						isDisabled={buttonDisable}
						onClick={() => {
							//console.log(inputRef.current.value);
							setButtonDisable(true)
							addCart({
								id: product.id,
								title: product.title,
								quantity:quantity,
								image: product.image,
								price: product.price,
								category:product.category
							});
						}}
						py="25px"
					>
						Add To Cart
					</Button>
				</Box>
			</Flex>
		</>
	);
}

export default ProductInfo;
