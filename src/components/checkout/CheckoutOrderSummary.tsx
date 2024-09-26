import { Text,  Flex, } from "@chakra-ui/react";
import {
	Table,

	Tbody,
	
	Tr,

	Td,
	TableContainer,
	
} from "@chakra-ui/react";
import { Product } from "../../type";

interface CheckoutOrderSummaryProps{
	cart:Product[]
}
const CheckoutOrderSummary = ({ cart }:CheckoutOrderSummaryProps) => {
	console.log(cart);
	let itemCost = cart.reduce((a:number, b:Product) => {
		return a + b.quantity * b.price;
	}, 0);
	// console.log(itemCost)
	let itemQuantity = cart.reduce((a:number, b:Product) => {
		return a + Number(b.quantity);
	}, 0);

	let taxCost = (5 / 100) * itemCost;
	let deliveryCost = 150;
	return (
		<>
			<Flex direction="column" p="20px" >
				<TableContainer>
					<Text fontSize="20px" fontWeight="bold" textAlign="center" mb="10px">
						Order Summary
					</Text>
					<Table variant="simple">
						<Tbody>
							<Tr>
								<Td fontWeight="bold">Item quantity</Td>
								<Td>{itemQuantity}</Td>
							</Tr>
							<Tr>
								<Td fontWeight="bold">Item cost</Td>
								<Td>{Math.round(itemCost)}</Td>
							</Tr>
							<Tr>
								<Td fontWeight="bold">Delivery Cost</Td>
								<Td>{deliveryCost}</Td>
							</Tr>
							<Tr>
								<Td fontWeight="bold">Tax</Td>
								<Td>{Math.round(taxCost)}</Td>
							</Tr>
							<Tr>
								<Td fontWeight="bold">Total Cost</Td>
								<Td>343</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
			
			</Flex>
		</>
	);
};

export default CheckoutOrderSummary;
