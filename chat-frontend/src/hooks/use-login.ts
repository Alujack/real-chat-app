"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios"


export default function useLogin() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const [isloading,setIsloading] = useState<boolean>(false)

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const resopnse = await axios.post(`http://localhost:8000/api/token/`,
				formData
			)
			if (resopnse) {
				console.log('succesfully')
				router.push('/avatarselector');
			}
		} catch (err) {
			console.error(err)
		} finally {
			console.log('There is no credential')
		}
	};

	return {
		email,
		password,
		isloading,
		onChange,
		onSubmit,
	};
}
