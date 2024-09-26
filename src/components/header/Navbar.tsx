import {
	Box,
	HStack,
	Flex,
	Spacer,
	Icon,
	IconButton,
	InputGroup,
	Input,
	InputLeftElement,
	Container,
	Button,
	VStack,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
// import { SearchIcon } from "@chakra-ui/icons";
import { MdShoppingCart } from "react-icons/md";
import SearchBar from "./SearchBar";

function Navbar({ count }:{count:number}) {
	return (
		<>
			<Box bg="black" w="100%" p={10} color="white">
				<Container maxW="1400px" textAlign="center">
					<Flex align="center" flexWrap={'wrap'} gap='10px' direction={{base:'column',md:'row'}} justifyContent={{base:'center'}}>
						{/* <Box fontSize="40px">Eshop</Box> */}
						<Text fontSize="40px" fontFamily="cursive" w={{base:'100%',md:'25%'}}>
							<span style={{ fontSize: "60px" }}>E</span>shop
						</Text>
						<Spacer></Spacer>
						{/* <HStack spacing="70px"> */}
						<HStack  justifyContent={{base:'center',md:'flex-end',lg:'center'}} spacing="30px" fontSize="20px" fontFamily="cursive" w={{base:'100%',md:'65%',lg:'25%'}}>
							<Link to="/">Home</Link>
							<Link to="/products">Products</Link>

							{/* <Link to="/category/jewelery">Category</Link> */}
							<Menu>
								<MenuButton color='white' bg={'none'}
								 size='20px' fontWeight='normal'
								  as={Button} rightIcon={<ChevronDownIcon />}
								
								  _focusVisible={{outline:'none'}}
								  _active={{bg:'transparent'}}
								  _focus={{ bg: 'transparent' }}
								  _hover={{bg:'none'}}

								  >
									Category
								</MenuButton>
								<MenuList>
									
									<MenuItem color='black'><Link to="/category/electronics">Electronics</Link></MenuItem>
									<MenuItem color='black'><Link to="/category/jewelery">Jewelery</Link> </MenuItem>
									<MenuItem color='black'><Link to="/category/men's clothing">Men's clothing</Link> </MenuItem>
									<MenuItem color='black'><Link to="/category/women's clothing">Women's clothing</Link> </MenuItem>
								</MenuList>
							</Menu>
						</HStack>
						{/* </HStack> */}
						<Spacer></Spacer>
						<HStack  w={{base:'100%',lg:'25%'}} spacing="30px" justifyContent={{base:'center'}}>
							<HStack spacing="20px">
								<Button>Login</Button>
								<Button variant="outline" colorScheme="white">
									SignUp
								</Button>
							</HStack>

							<Flex alignItems="center" gap="5px">
								<Link to="/cart">
									<Icon as={MdShoppingCart} boxSize="30px"></Icon>
								</Link>
								<Text>{count}</Text>
							</Flex>
						</HStack>
					</Flex>
					<Box mt={'30px'}>
						<SearchBar ></SearchBar>
					</Box>
					
				</Container>
			</Box>
		</>
	);
}

export default Navbar;
