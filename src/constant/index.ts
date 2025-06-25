export const REVIEW = [
	{
		id: 1,
		star: 5,
		review:
			"This is the best video downloader I've ever used! It's fast, reliable, and supports all major platforms. Highly recommended!",
		profile: 'Supriyadi',
	},
	{
		id: 2,
		star: 5,
		review:
			"This is the best video downloader I've ever used! It's fast, reliable, and supports all major platforms. Highly recommended!",
		profile: 'Anto Gepeng',
	},
	{
		id: 3,
		star: 5,
		review:
			"This is the best video downloader I've ever used! It's fast, reliable, and supports all major platforms. Highly recommended!",
		profile: 'Siti Nurhaliza',
	},
	{
		id: 4,
		star: 4,
		review:
			"I've been using this downloader for months now and it's really impressive. The interface is clean and user-friendly. Just wish it had batch download features.",
		profile: 'Ahmad Dhani',
	},
	{
		id: 5,
		star: 5,
		review:
			'Absolutely love this tool! Downloaded videos from YouTube with perfect quality. The different resolution options are exactly what I needed for my project.',
		profile: 'Raisa Andriana',
	},
	{
		id: 6,
		star: 4,
		review:
			'Great service overall! Very convenient for saving content for offline viewing. The Facebook video downloads work flawlessly. Would be perfect with a mobile app.',
		profile: 'Tulus',
	},
];

// API endpoints
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export const LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT || '/login';
export const REGISTER_ENDPOINT = import.meta.env.VITE_REGISTER_ENDPOINT || '/register';
export const USER_ENDPOINT = import.meta.env.VITE_USER_ENDPOINT || '/users/me';

// Configuration
export const AUTH_TOKEN_KEY = 'token';
