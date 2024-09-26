import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { ProductApi } from "../../type";

function SearchBar() {
	const [query, setQuery] = useState<string>("");
	const [products, setProducts] = useState<ProductApi[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<ProductApi[]>([]);

	// useEffect()
	useEffect(() => {
		fetch("https://fakestoreapi.com/products")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				// //console.log(data);
				setProducts(data);
			});
	}, []);

	useEffect(() => {
		
		setFilteredProducts(
			products.filter((product) => {
				// //console.log(product)
				return product.title.toLowerCase().includes(query.toLowerCase());
			})
		);
	}, [query]);
	//console.log(filteredProducts);

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		// //console.log(e.target.value);
		setQuery(e.target.value);
	};
	const handleMouseLeave = (e:React.MouseEvent<HTMLInputElement>) => {
		setTimeout(() => {
			setQuery("");
			//   e.target.value=''
		}, 2000);
	};
	// const handleMouseEnter = (e:React.MouseEvent<HTMLInputElement>) => {
	// 	setTimeout(() => {
	// 		setQuery(e.target.value);
	// 	}, 500);
	// };

	return (
		<>
			<Box style={{ position: "relative", maxWidth: "500px" }}>
				<InputGroup maxW="600px" >
					<InputLeftElement h="50px">
						<SearchIcon fontSize="15px" />
					</InputLeftElement>
					<Input
						focusBorderColor='white'
						h="50px"
						placeholder="Search the product"
						onChange={handleChange}
						onMouseLeave={handleMouseLeave}
						// onMouseEnter={handleMouseEnter}
					></Input>
				</InputGroup>

				{/* {query && <p style={{position:'absolute',top:'50px',backgroundColor:'white',color:'black',border:'2px solid green'}}> {[<p>hone</p>, <p>laptop</p>, <p>charger</p>]}</p>} */}
				<Box
					className="product-list"
					bg='white'
					position='absolute'
					zIndex='9'
					color='black'
					w='100%'
					mt='10px'
					boxShadow='0 3px  10px 1px #180e0e'
					borderBottomRadius='7px'
					overflow='hidden'
					// p='10px'
					
					// style={{
					// 	// position: "absolute",
					// 	// backgroundColor: "white",
					// 	color: "black",
					// 	zIndex: 9,
					// 	maxHeight: "300px",
					// 	width: "500px",
					// 	overflowY: "auto",
					// 	padding:'50px'
					// }}
				>
					{query &&
						filteredProducts.slice(0, 5).map((product) => {
							return (
								<Link to={`/products/${product.id}`}>
									
									<Text  fontSize='17px' textAlign='left' p='10px' borderBottom=
									'2px solid #e9e9e9'
										key={product.id} 
										
										
									>
										{product.title}
									</Text>
								</Link>
							);
						})}
				</Box>
			</Box>
		</>
	);
}

export default SearchBar;
