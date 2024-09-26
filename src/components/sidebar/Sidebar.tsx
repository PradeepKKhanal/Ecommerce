import {
	Accordion,
	
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MyAccordionItem from "./MyAccordionItem";
// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductApi } from "../../type";

function sideBar() {
	// const [category, setCategory] = useState();
	// const [popular, setPopular] = useState();
	// const [highSell, setHighSell] = useState([]);

	const {data:category,isLoading, isError,error}=useQuery(
		{
			queryKey:['category'],
			queryFn:async function(){
				const response=await axios.get("https://fakestoreapi.com/products/categories")
				console.log(response.data)
				return response.data.map((datum:string)=>{
					return (
						<Link to={`/category/${datum}`}>{datum}</Link>
					)
				})
			}

		}
	)
 



	const{data:popular,isLoading:popularIsLoading,isError:popularIsError,error:popularError}=useQuery(
		{
			queryKey:['popular'],
			queryFn:async function(){
				const response=await axios.get('https://fakestoreapi.com/products')
				const data=response.data
				const sortedData = data.sort((a:ProductApi, b:ProductApi) => {
					return b.rating.rate - a.rating.rate;
				});
				// console.log(sortedData);
				const popular = sortedData
					.slice(0, 5)
					.map((product:ProductApi) =>{

						return (
							<Link to={'/products/'+product.id}>{product.title.length > 25
							? product.title.slice(0, 25) + "..."
							: product.title.slice(0, 25)}</Link>
						)
						
					}
						
					);
					console.log(popular)
					return popular;
			}
		}
	)

	if (isLoading || popularIsLoading){
		return <p>Loading...</p>
	}
	if(isError || popularIsError){
		return <p>{error?.message || popularError?.message}</p>
	}

	return (
		<>
			{category && popular && <Accordion defaultIndex={[1]} allowMultiple>
				<MyAccordionItem
					accordionContent={category}
					accordionName="Category"
				></MyAccordionItem>

				<MyAccordionItem
					accordionName="Popular"
					accordionContent={popular}
				></MyAccordionItem>
			</Accordion>}
		</>
	);
}

export default sideBar;
