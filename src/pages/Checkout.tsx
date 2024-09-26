import CheckoutOrderSummary from "../components/checkout/CheckoutOrderSummary";
import CheckoutUserInfo from "../components/checkout/CheckoutUserInfo";

import { Flex,Container,Box } from "@chakra-ui/react";

import { Product} from "../type";

interface CheckoutProps{
	cart:Product[]
}
function Checkout({cart}:CheckoutProps) {
	return (
		// <>This is checkout page</>
		<>
			<Container maxW='1440px' my='100px'>
				<Flex justifyContent='space-between' flexDirection={{base:'column',md:'row'}}>
					<Box minW='70%'>
						<CheckoutUserInfo></CheckoutUserInfo>
					</Box>
					
					<CheckoutOrderSummary cart={cart}></CheckoutOrderSummary>

				</Flex>
			</Container>
		</>
	);
}

export default Checkout;
