import {
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Table,
	Tbody,
	Tr,
	Td,
	TableContainer,
} from "@chakra-ui/react";

interface MyAccordionItem{
	accordionName:string,
	accordionContent:JSX.Element[]
}

function MyAccordionItem({ accordionName, accordionContent }:MyAccordionItem) {
	// console.log(accordionContent)
	// console.log(accordionContent[0]===accordionContent[1])
	return (
		<AccordionItem>
			<AccordionButton p="15px" fontWeight={"bold"}>
				<Box flex={"1"} textAlign={"left"}>
					{accordionName}
				</Box>
				<AccordionIcon></AccordionIcon>
			</AccordionButton>
			<AccordionPanel p="0">
				<TableContainer>
					<Table>
						<Tbody>
							{accordionContent.map((data) => {
								return (
									
									<Tr key={Math.random()}>
										<Td>{data}</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</TableContainer>
			</AccordionPanel>
		</AccordionItem>
	);
}

export default MyAccordionItem;
