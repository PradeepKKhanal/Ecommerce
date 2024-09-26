import {
	Flex,
	Box,
	Image,
	Heading,
	NumberInput,
	IconButton,
	Text,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	
	Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import{Product,updateCart,deleteCart} from '../../type'

interface CartCardProps{
	product:Product,
	updateCart:updateCart,
	deleteCart:deleteCart
}

function CartCard({ product, updateCart, deleteCart }:CartCardProps) {
	// console.log(product);

	return (
		<>
			{/* <h1>cart</h1> */}
			<Flex
				gap="30px"
				// m="auto"
				// maxW="800px"
				// border="1px solid gray"
				boxShadow="0 0 10px 1px #c6c3c336"
				p="20px"
				borderRadius="10px"
				alignItems="center"
				mb="20px"
			>
				{/* <Box h="100px"
					w="200px" border='2px solid green'> */}
				<Image
					src={product.image}
					// objectFit="cover"
					// objectPosition="center"
					// border='2px solid red'
					// h="150px"
					w="100px"
				></Image>
				{/* </Box> */}

				<Box
				// border="2px solid yellow"
				>
					<Heading fontSize="20px" textAlign="left" mb="20px">
						{product.title}
					</Heading>

					<Flex gap="20px" alignItems="center">
						<Box>
							{/* <Text>{product.category}</Text> */}
							<Text fontSize="20px">$ {product.price}</Text>
						</Box>

						<Box>
							<NumberInput
								defaultValue={product.quantity}
								onChange={(value) => {
									console.log(updateCart)
									
									updateCart(product.id, Number(value));
									console.log("update");
									console.log(product.id, value);
								}}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper children="+" />
									<NumberDecrementStepper children="-" />
								</NumberInputStepper>
							</NumberInput>
						</Box>

						<Popover>
							<PopoverTrigger>
								<IconButton
									aria-label="Delete cart product"
									icon={<DeleteIcon />}
									size="lg"
									// onClick={() => {
									// 	deleteCart(product.id);
									// }}
								></IconButton>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverArrow></PopoverArrow>
								<PopoverCloseButton></PopoverCloseButton>
								<PopoverHeader>Confirmation!</PopoverHeader>
								<PopoverBody>
									Are you sure your want to delete the product from cart?
									<Button
										colorScheme="red"
										onClick={() => {
											deleteCart(product.id);
										}}
										 ml='4'
										 
									>
										Confirm
									</Button>
								</PopoverBody>
							</PopoverContent>
						</Popover>
					</Flex>
				</Box>
			</Flex>
		</>
	);
}

export default CartCard;
