"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios"
import { toast } from 'react-toastify';

export default function useRegister() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
	});

	const { email, username, password, } = formData;
	const [isloading, setIsloading] = useState<boolean>(true)

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const resopnse = await axios.post(`http://localhost:8000/api/register/`,
				formData
			)
			if (resopnse) {
				console.log('succesfully')
			}
		} catch (err) {
			console.error(err)
		} finally {
			console.log('There is no credential')
		}



	};
	return {
		email,
		username,
		password,
		isloading,
		onChange,
		onSubmit,
	};
}
