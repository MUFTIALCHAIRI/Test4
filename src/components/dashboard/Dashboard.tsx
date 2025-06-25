import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { API_BASE_URL, USER_ENDPOINT, AUTH_TOKEN_KEY } from '@/constant';
import { LogoutConfirmationModal } from '../modal/LogoutConfirmationModal';

interface DashboardProps {
	token: string;
	setToken: (token: string) => void;
}

interface UserData {
	username: string;
	email: string;
	downloads: number;
}

interface DownloadItem {
	id: number;
	url: string;
	date: string;
	type: string;
}

// Function to decode JWT token
const parseJwt = (token: string) => {
	try {
		// Get the payload part of the JWT (second part)
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join('')
		);
		return JSON.parse(jsonPayload);
	} catch (e) {
		console.error('Error parsing JWT:', e);
		return null;
	}
};

export function Dashboard({ token, setToken }: DashboardProps) {
	const [userData, setUserData] = useState<UserData | null>(null);
	const [downloadHistory, setDownloadHistory] = useState<DownloadItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [downloadUrl, setDownloadUrl] = useState('');
	const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

	useEffect(() => {
		// Check if user has valid token
		if (!token) {
			return;
		}

		// Get user data from token if possible
		const tokenData = parseJwt(token);

		const fetchUserData = async () => {
			setIsLoading(true);
			try {
				// Extract user info from token or fetch from API
				if (tokenData && tokenData.username && tokenData.email) {
					// User info is in the token
					setUserData({
						username: tokenData.username,
						email: tokenData.email,
						downloads: parseInt(localStorage.getItem('downloadCount') || '0'),
					});
				} else {
					// Fallback to API call if token doesn't contain user info
					// In a real app, this would be an API call to your backend
					try {
						const response = await fetch(`${API_BASE_URL}${USER_ENDPOINT}`, {
							headers: { Authorization: `Bearer ${token}` },
						});

						if (response.ok) {
							const data = await response.json();
							setUserData({
								username: data.username || 'User',
								email: data.email || 'user@example.com',
								downloads: parseInt(localStorage.getItem('downloadCount') || '0'),
							});
						} else {
							throw new Error('Failed to fetch user data');
						}
					} catch (error) {
						console.error('API error:', error);
						// Set fallback user data if API fails
						setUserData({
							username: 'User',
							email: 'user@example.com',
							downloads: parseInt(localStorage.getItem('downloadCount') || '0'),
						});
					}
				}

				// Get recent downloads from local storage or API
				const recentDownloads = JSON.parse(localStorage.getItem('recentDownloads') || '[]');
				setDownloadHistory(recentDownloads.slice(0, 5)); // Show only last 5 downloads

				setIsLoading(false);
			} catch (error) {
				console.error('Error processing user data:', error);
				toast.error('Could not load user data');
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, [token]);

	const handleLogout = () => {
		localStorage.removeItem(AUTH_TOKEN_KEY);
		setToken('');
		setIsLogoutConfirmOpen(false);
		toast.success('Logout successful! See you again soon.');
	};

	const handleDownload = (event: React.FormEvent) => {
		event.preventDefault();
		if (!downloadUrl.trim()) {
			toast.error('Please enter a URL');
			return;
		}

		toast.info('Processing your download request...');
		// In a real app, you would call your download API here

		// For now, just add to history for demo purposes
		const newDownload = {
			id: Date.now(),
			url: downloadUrl,
			date: new Date().toISOString().split('T')[0],
			type: downloadUrl.includes('youtube')
				? 'youtube'
				: downloadUrl.includes('facebook')
				? 'facebook'
				: downloadUrl.includes('instagram')
				? 'instagram'
				: 'other',
		};

		const history = [newDownload, ...downloadHistory].slice(0, 5);
		setDownloadHistory(history);
		localStorage.setItem('recentDownloads', JSON.stringify(history));

		// Update download count
		const newCount = (userData?.downloads || 0) + 1;
		setUserData((prev) => (prev ? { ...prev, downloads: newCount } : null));
		localStorage.setItem('downloadCount', newCount.toString());

		setDownloadUrl('');
		toast.success('Download added to your history');
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-gray-50'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#99BC85] mx-auto'></div>
					<p className='mt-4 text-[#99BC85]'>Loading your dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className='min-h-screen bg-gray-50'>
				{/* Header */}
				<div className='bg-white shadow'>
					<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='flex justify-between items-center py-4'>
							<div className='flex items-center'>
								<img src='/comot.in-logo.png' alt='Comot.in Logo' className='h-10 w-auto' />
								<h1 className='ml-3 text-xl font-semibold text-gray-900'>Dashboard</h1>
							</div>
							<Button
								onClick={() => setIsLogoutConfirmOpen(true)}
								className='bg-[#99BC85] hover:bg-[#88ab74] text-white'
							>
								Logout
							</Button>
						</div>
					</div>
				</div>

				<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					{/* Welcome Card */}
					<div className='bg-white shadow rounded-lg p-6 mb-6'>
						<div className='flex items-center'>
							<div className='h-14 w-14 rounded-full bg-[#99BC85] flex items-center justify-center text-white text-xl font-bold'>
								{userData?.username.charAt(0).toUpperCase()}
							</div>
							<div className='ml-4'>
								<h2 className='text-lg font-semibold'>Welcome, {userData?.username}</h2>
								<p className='text-gray-600 text-sm'>{userData?.email}</p>
							</div>
							<div className='ml-auto bg-gray-100 px-3 py-1.5 rounded-full'>
								<span className='text-sm font-medium text-gray-700'>
									{userData?.downloads} downloads
								</span>
							</div>
						</div>
					</div>

					{/* New Download - Simplified */}
					<div className='bg-white shadow rounded-lg p-6 mb-6'>
						<h2 className='text-lg font-semibold mb-4'>Download New Video</h2>
						<form onSubmit={handleDownload} className='flex flex-col sm:flex-row gap-3'>
							<Input
								type='text'
								value={downloadUrl}
								onChange={(e) => setDownloadUrl(e.target.value)}
								placeholder='Enter YouTube, Facebook or Instagram URL'
								className='flex-1'
							/>
							<Button type='submit' className='bg-[#99BC85] hover:bg-[#88ab74] text-white'>
								Download
							</Button>
						</form>
					</div>

					{/* Recent Downloads - Simplified */}
					<div className='bg-white shadow rounded-lg overflow-hidden'>
						<div className='p-4 border-b border-gray-200'>
							<h2 className='font-semibold text-gray-900'>Recent Downloads</h2>
						</div>

						{downloadHistory.length > 0 ? (
							<div className='divide-y divide-gray-200'>
								{downloadHistory.map((item) => (
									<div key={item.id} className='p-4 hover:bg-gray-50'>
										<div className='flex items-center'>
											<div
												className={`w-2 h-2 rounded-full mr-3 ${
													item.type === 'youtube'
														? 'bg-red-500'
														: item.type === 'facebook'
														? 'bg-blue-500'
														: item.type === 'instagram'
														? 'bg-pink-500'
														: 'bg-gray-500'
												}`}
											></div>
											<a
												href={item.url}
												target='_blank'
												rel='noopener noreferrer'
												className='flex-1 text-sm text-blue-600 hover:underline truncate'
											>
												{item.url}
											</a>
											<span className='text-xs text-gray-500 ml-2'>{item.date}</span>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className='p-8 text-center text-gray-500'>
								<p>No download history yet.</p>
								<p className='text-sm mt-1'>Your recent downloads will appear here.</p>
							</div>
						)}
					</div>
				</div>
			</div>

			<LogoutConfirmationModal
				isOpen={isLogoutConfirmOpen}
				onClose={() => setIsLogoutConfirmOpen(false)}
				onConfirm={handleLogout}
			/>
		</>
	);
}

export default Dashboard;
