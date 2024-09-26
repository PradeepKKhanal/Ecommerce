import { Box, Image, Flex, Heading, Container, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import Category from './Category';
import Products from "./Products";
import ImageSlider from "../components/header/ImageSlider";
import { Link } from "react-router-dom";
import { addCart } from "../type";

interface HomeProps{
	addCart:addCart
}
function Home({ addCart }:HomeProps) {
	const [category, setCategory] = useState([]);
	useEffect(() => {
		fetch("https://fakestoreapi.com/products/categories")
			.then((response) => response.json())
			.then((data) => {
				// console.log(data)
				setCategory(data);
			});
	}, []);
	const images = [
		"https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
		"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
		"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
		"https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
	];
	return (
		<>
			<Box
				// width="100%"
				// height="300px"
				// clipPath={'polygon(0% 50%,20% 0%, 100% 0%, 100% 0%, 70% 100%,0% 100%)'}
				bg={"#09094b"}
				py={'50px'}
				
				
			>
				<Container maxW="1400px">
					<Heading color={"red"}  textAlign={{base:'center',sm:'left'}} >Get 50% off</Heading>
				<Heading color="Yellow" fontSize={{base:'70px',sm:"100px"}} textAlign={{base:'center',sm:'left'}}>
					Big Offer
				</Heading>
				</Container>
				
			</Box>
			<Container maxW="1400px" margin="auto" mt={"50px"}>
						
				<Box my="100px">
					<Heading fontFamily="cursive" textAlign="center" mb="50px">
						{" "}
						Categories
					</Heading>
					<Flex justifyContent={"space-around"} flexWrap="wrap" gap="20px">
						{category.map((data:string, index:number) => {
							return (
								<Box key={index} w={{base:'100%',md:'auto'}} ><Link to={`/category/${data}`}  >
									<Box    m='auto' 
										w={{base:'90%' ,  sm:"400px", md:'300px'}}
										h={{base:'300px' ,  sm:"300px", md:"270px"}}
										boxShadow="0 0 10px 2px gray"
										borderRadius="3px"
										p="10px"
									
										transition={"transform 0.5s"}
										_hover={{ transform: "scale(1.03)" }}
									>
										<Image height="200px" src={images[index]} m="auto"></Image>
										<Text
											// m="10px"
											// w="320px"
											// minW='350px'

											mt="20px"
											textAlign="center"
											fontFamily="cursive"
										>
											{data.toUpperCase()}
										</Text>
									</Box>
								</Link></Box>
								
							);
						})}
					</Flex>
				</Box>
			</Container>
			<Box my="100px" mx="0">
				<Heading fontFamily="cursive" textAlign="center" mb="-79px">
					Our Products
				</Heading>
				<Products addCart={addCart}></Products>
			</Box>
		</>
	);
}

export default Home;
