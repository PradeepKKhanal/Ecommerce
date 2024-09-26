import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,

	TableContainer,
	Flex,

	Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Product } from "../../type";

interface CartCalculationProps{
	cart:Product[]
}

function CartCalculation({ cart }:CartCalculationProps) {
	const navigate = useNavigate();
	const handleCheckoutClick = () => {
		navigate("/checkout");
	};
	console.log(cart);
	return (
		<>
			<Flex  direction="column"  alignItems={'center'} >
				<TableContainer>
					<Table variant="simple">
						{/* <TableCaption>Product Calculation</TableCaption> */}
						<Thead>
							<Tr>
								<Th fontSize="16px">Product</Th>
								<Th fontSize="16px">Quantity</Th>
								<Th fontSize="16px">Price</Th>
							</Tr>
						</Thead>
						<Tbody>
							{cart.map((product) => {
								return (
									<Tr key={product.id}>
										<Td>
											{product.title.length < 20
												? product.title
												: product.title.slice(0, 20) + "..."}
										</Td>
										<Td>{product.quantity}</Td>
										<Td>
											{Math.floor(product.price * product.quantity * 100) / 100}
										</Td>
									</Tr>
								);
							})}
						</Tbody>

						<Tfoot>
							<Tr>
								<Td fontWeight="bold">Total</Td>
								<Td fontWeight="bold">
									{cart.reduce((a, c) => {
										return a + Number(c.quantity);
									}, 0)}
								</Td>
								<Td fontWeight="bold">
									$ {Math.floor(
									cart.reduce((a, c) => {
										// console.log(a ,c)
										// console.log(c.quantity,c.price)
										return a + c.quantity * c.price;
									}, 0)*100
									)/100}
								</Td>
							</Tr>
						</Tfoot>
					</Table>
				</TableContainer>

				<Button onClick={handleCheckoutClick} mt="30px" py="25px">
					Proceed to CheckOut
				</Button>
			</Flex>
		</>
	);
}

export default CartCalculation;
