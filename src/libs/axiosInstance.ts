import axios, { AxiosResponse } from 'axios';

/**
|-----------------------------------------------------------
| initiating the axios instance with some base configuration
|-----------------------------------------------------------
*/
const axiosInstance = axios.create({
	baseURL: '/api',
	timeout: 70000,
	headers: {
		'Content-Type': 'application/json',
	},
});

/**
|------------------------------------------------------------------------------------
| Intercepting the request before it is sent and adding a few more properties to it
|------------------------------------------------------------------------------------
*/
axiosInstance.interceptors.request.use(async (req) => {
	return req;
});

/**
|-------------------------------------------------------------------------------------
| Intercepting the response and performing some actions on it based on the status code
|-------------------------------------------------------------------------------------
*/
axiosInstance.interceptors.response.use(
	async (response: AxiosResponse) => {
		if (response.status) {
			/**
			|--------------------------------------------------
			| Do something
			|--------------------------------------------------
			*/
		}
		return response.data;
	},
	(error: any) => {
		if (error.response.status === 401) {
			/**
			|--------------------------------------------------
			| Do something
			|--------------------------------------------------
			*/
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
