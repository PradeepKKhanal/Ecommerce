import { Icon, Flex } from "@chakra-ui/react";
import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";


interface ProductRateStar{
	rating:{
		count:number,
		rate:number
	}
}
function ProductRateStar({ rating }:ProductRateStar) {
	// console.log(rating);
	const rate = rating.rate;
	const fullStars = Math.floor(rate);
	const halfStars = rate - fullStars >= 0.5;
	const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);
	// console.log(Array(fullStars));

	return (
		<>
			{/* <p>hello</p> */}
			<Flex>
				{[...Array(fullStars)].map((_, i) => {
					return <Icon as={MdStar} key={i} color={'goldenrod'}></Icon>;
				})}

				{halfStars && <Icon as={MdStarHalf} color={'goldenrod'}></Icon>}

				{[...Array(emptyStars)].map((_, i) => {
					return <Icon as={MdStarOutline} key={i} color={'goldenrod'}></Icon>;
				})}
			</Flex>
		</>
	);
}

export default ProductRateStar;
