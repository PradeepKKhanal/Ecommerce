import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Select,
	Box,
	Text,
	RadioGroup,
	Radio,
	Flex,
	Button,
} from "@chakra-ui/react";
// import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import {
	useForm,
	Controller,
	SubmitHandler,
	SubmitErrorHandler,
	useFieldArray,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formData } from "../../type";
import { redirect } from "react-router-dom";

const formSchema = z.object({
	fullname: z
		.string()
		.min(1, { message: "Name is required" })
		.max(100, { message: "Name cannot access 100 characters" }),
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Invalid email" }),
	phone: z
		.string()
		.regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
	// zone:z.string().min(1,{message:'Zone selection is required'}),
	zone: z
		.string()
		.refine((value) => value !== "", { message: "Zone selection is required" }),

	province: z.string().min(1, { message: "Province selection is required" }),
	// address: z
	// 	.string()
	// 	.min(1, { message: "Address is required" })
	// 	.max(200, { message: "Address cannot exceed 200 characters" }),
	paymentMethod: z.enum(["Debit Card", "Esewa", "Khalti"], {
		errorMap: () => {
			return { message: "Please select a valid payment method" };
		},
	}),
	addresses: z
		.array(
			z.object({
				address: z.string().min(1, { message: "Address is required" }),
			})
		)
		.min(1, "At least one address is required"),
});
const provincesOfNepal = [
	"Koshi Pradesh",
	"Madhesh Province",
	"Bagmati Province",
	"Gandaki Province",
	"Lumbini Province",
	"Karnali Province",
	"Sudurpashchim Province",
];
const zonesOfNepal = [
	"Bagmati",
	"Bheri",
	"Dhawalagiri",
	"Gandaki",
	"Janakpur",
	"Karnali",
	"Kosi",
	"Lumbini",
	"Mahakali",
	"Mechi",
	"Narayani",
	"Rapti",
	"Sagarmatha",
	"Seti",
];
function CheckoutUserInfo() {
	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<formData>({
		defaultValues: { addresses: [{ address: "" }] },
		resolver: zodResolver(formSchema),
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "addresses",
	});

	const onSubmit: SubmitHandler<formData> = (data) => {
		console.log(data);
	};
	const onError: SubmitErrorHandler<formData> = (error) => {
		console.log(error);
	};
	const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.key === 'Enter') {
		  event.preventDefault();
		}
	  };

	return (
		<>
			<Box p="20px">
				<Text fontWeight="bold" fontSize="20px" color="gray" mb="30px">
					Provide your information before purchase
				</Text>
				<form onSubmit={handleSubmit(onSubmit, onError)} onKeyDown={handleKeyDown}>
					<FormControl isInvalid={!!errors.fullname} mb="20px">
						<FormLabel>FullName</FormLabel>
						<Input type="text" {...register("fullname")}></Input>

						<FormErrorMessage>{errors.fullname?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.email} mb="20px">
						<FormLabel>Email</FormLabel>
						<Input type="email" {...register("email")}></Input>
						<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.phone} mb="20px">
						<FormLabel>Phone</FormLabel>
						<Input type="number" {...register("phone")}></Input>
						<FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.zone} mb="20px">
						<FormLabel>Zone</FormLabel>
						<Controller
							name="zone"
							control={control}
							// rules={{required:{value:true,message:'Zone must be selected'}}}
							render={({ field }) => {
								return (
									<Select placeholder="Select zone" {...field}>
										{zonesOfNepal.map((zone) => {
											return (
												<option key={zone} value={zone}>
													{zone}
												</option>
											);
										})}
									</Select>
								);
							}}
						/>
						<FormErrorMessage>{errors.zone?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.province} mb="20px">
						<FormLabel>Province</FormLabel>
						<Controller
							name="province"
							control={control}
							render={({ field }) => (
								<Select placeholder="Select prvoince" {...field}>
									{provincesOfNepal.map((province) => {
										return (
											<option key={province} value={province}>
												{province}
											</option>
										);
									})}
								</Select>
							)}
						/>
						<FormErrorMessage>{errors.province?.message}</FormErrorMessage>
					</FormControl>

					{/* <FormControl isInvalid={!!errors.address} mb="20px">
						<FormLabel>Address</FormLabel>
						<Input type="text" {...register('address'
					
						)}></Input>
						<FormErrorMessage>{errors.address?.message}</FormErrorMessage>
					</FormControl> */}

					<FormControl>
						<FormLabel display={"flex"} alignItems={"center"} gap={"10px"}>
							Addresses{" "}
							<span onClick={() => append({ address: "" })}>
								<IoMdAddCircle color="green" />
							</span>
						</FormLabel>

						{fields.map((field, index) => {
							return (
								<div key={field.id}>
									<span style={{ fontSize: "10px" }}>Address{" " + index}</span>
									<Box display={"flex"} alignItems={"center"} gap={"10px"}>
										<Input
											type="text"
											{...register(`addresses.${index}.address`)}
										></Input>
										{fields.length > 1 && (
											<span onClick={() => remove(index)}>
												<MdDelete></MdDelete>
											</span>
										)}
									</Box>
									{/* <FormErrorMessage>{errors.zone?.message}</FormErrorMessage> */}
									<div style={{color:'red',fontSize:'13px',margin:'10px 0'}}>{errors.addresses?.[index]?.address?.message}</div>
								</div>
							);
						})}
						<FormErrorMessage>{errors.zone?.message}</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.paymentMethod} mb="40px">
						<FormLabel>Choose payment method</FormLabel>
						<Controller
							name="paymentMethod"
							control={control}
							// rules={{required:{value:true,message:'Select the payment method'}}}
							render={({ field }) => {
								return (
									<RadioGroup {...field}>
										<Flex gap="40px">
											<Radio value="Debit Card">Debit Card</Radio>
											<Radio value="Esewa">Esewa</Radio>
											<Radio value="Khalti">Khalti</Radio>
										</Flex>
									</RadioGroup>
								);
							}}
						/>
						<FormErrorMessage>{errors.paymentMethod?.message}</FormErrorMessage>
					</FormControl>

					<Button type="submit">Proceed to Purchase</Button>
				</form>
			</Box>
		</>
	);
}

export default CheckoutUserInfo;
