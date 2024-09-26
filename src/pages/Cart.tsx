import CartCard from "../components/cart/CartCard";
import CartCalculation from "../components/cart/CartCalculation";
import { Flex, Container ,Box} from "@chakra-ui/react";
import { Product,ProductApi,addCart,deleteCart,updateCart } from "../type";

interface CartProps{
	cart:Product[],
	addCart:addCart,
	deleteCart:deleteCart,
	updateCart:updateCart
}

function Cart({ cart, addCart, deleteCart, updateCart }:CartProps) {
    // console.log(cart,updateCart,deleteCart)
	return (
		<>
			{/* <div>
            This is cart page
        </div> */}
			<Container maxW="1400px" my='100px'>
				<Flex gap='50px' justifyContent='space-between' flexDirection={{base:'column',md:'row'}}>
                    <Box minW='60%' >

                        {cart.map((product:Product) => {
						return <CartCard key={product.id} product={product} updateCart={updateCart} deleteCart={deleteCart}></CartCard>;
					})}
                    </Box>
					
					<Box minW='35%'>
						<CartCalculation cart={cart}></CartCalculation>
					</Box>
					
				</Flex>
			</Container>
		</>
	);
}

export default Cart;
