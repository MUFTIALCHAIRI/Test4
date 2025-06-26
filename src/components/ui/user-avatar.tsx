import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LogoutConfirmationModal } from '../modal/LogoutConfirmationModal';
import { AUTH_TOKEN_KEY } from '@/constant';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/constant';

// Function to decode JWT token
const parseJwt = (token: string) => {
	try {
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
		return null;
	}
};

export function UserAvatar({ setToken }: { setToken: (token: string) => void }) {
	const navigate = useNavigate();
	const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
	const [username, setUsername] = useState('User');
	const [email, setEmail] = useState('user@example.com');

	useEffect(() => {
		const token = localStorage.getItem(AUTH_TOKEN_KEY);

		if (!token) {
			setUsername('User');
			setEmail('user@example.com');
			return;
		}

		// Try to get user data from token first
		const tokenData = parseJwt(token);

		if (tokenData?.username && tokenData?.email) {
			// User info is in the token
			setUsername(tokenData.username);
			setEmail(tokenData.email);
		} else {
			// Fallback to API call if token doesn't contain user info
			const fetchUserData = async () => {
				try {
					const response = await fetch(`${API_BASE_URL}/user/me`, {
						headers: { Authorization: `Bearer ${token}` },
					});

					if (response.ok) {
						const data = await response.json();
						setUsername(data.username || 'User');
						setEmail(data.email || 'user@example.com');
					} else {
						// Use fallback values if API fails
						setUsername('User');
						setEmail('user@example.com');
					}
				} catch (error) {
					console.error('API error:', error);
					// Use fallback values if API fails
					setUsername('User');
					setEmail('user@example.com');
				}
			};

			fetchUserData();
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem(AUTH_TOKEN_KEY);
		setToken('');
		setIsLogoutConfirmOpen(false);
		toast.success('Logout successful! See you again soon.');
		navigate('/');
		// Dispatch custom event to notify other components
		window.dispatchEvent(new Event('tokenChanged'));
	};

	const goToDashboard = () => {
		navigate('/dashboard');
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='relative h-10 w-10 rounded-full'>
						<Avatar className='h-10 w-10'>
							<AvatarImage src='https://github.com/evilrabbit.png' alt='@evilrabbit' />
							<AvatarFallback>ER</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56' align='end' forceMount>
					<DropdownMenuLabel className='font-normal'>
						<div className='flex flex-col space-y-1'>
							<p className='text-sm font-medium leading-none'>{username}</p>
							<p className='text-xs leading-none text-muted-foreground'>{email}</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={goToDashboard} className='cursor-pointer'>
						<User className='mr-2 h-4 w-4' />
						<span>Dashboard</span>
					</DropdownMenuItem>
					<DropdownMenuItem className='cursor-pointer'>
						<Settings className='mr-2 h-4 w-4' />
						<span>Settings</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => setIsLogoutConfirmOpen(true)}
						className='cursor-pointer text-red-600 focus:text-red-600'
					>
						<LogOut className='mr-2 h-4 w-4' />
						<span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<LogoutConfirmationModal
				isOpen={isLogoutConfirmOpen}
				onClose={() => setIsLogoutConfirmOpen(false)}
				onConfirm={handleLogout}
			/>
		</>
	);
}
