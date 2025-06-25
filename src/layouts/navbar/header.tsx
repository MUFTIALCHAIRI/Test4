import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { LoginModal } from '@/components/modal/LoginModal';
import { SignupModal } from '@/components/modal/SignupModal';
import { LogoutConfirmationModal } from '@/components/modal/LogoutConfirmationModal';
import { toast } from 'sonner';
import { AUTH_TOKEN_KEY } from '@/constant';

const Header = ({ setToken }: { setToken: (token: string) => void }) => {
	const [activeSection, setActiveSection] = useState('home');
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignupOpen, setIsSignupOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

	// Check if user is logged in on component mount
	useEffect(() => {
		const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
		setIsLoggedIn(!!storedToken);
	}, []);

	// Listen for changes to the token via props
	useEffect(() => {
		// This will run whenever a token is set via the setToken prop
		const checkLoginStatus = () => {
			const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
			setIsLoggedIn(!!storedToken);
		};

		checkLoginStatus();

		// Add event listener for storage changes (in case token is modified in another tab)
		window.addEventListener('storage', checkLoginStatus);

		return () => {
			window.removeEventListener('storage', checkLoginStatus);
		};
	}, []);

	// We're now directly using setIsLogoutConfirmOpen(true) instead of a separate function

	// Actual logout handler once confirmed
	const handleLogout = () => {
		localStorage.removeItem(AUTH_TOKEN_KEY);
		setIsLoggedIn(false);
		setToken(''); // Clear token in parent component
		setIsLogoutConfirmOpen(false);
		toast.success('Logout successful! See you again soon.');
	};

	// Scroll navigation effect
	useEffect(() => {
		const handleScroll = () => {
			const sections = ['home', 'guide', 'features', 'reviews'];

			// Find which section is currently in view
			const current =
				sections.find((section) => {
					const element = document.getElementById(section);
					if (element) {
						const rect = element.getBoundingClientRect();
						// Consider a section "active" when it's top part is in the upper half of the viewport
						return rect.top <= 300 && rect.bottom >= 300;
					}
					return false;
				}) || 'home';
			setActiveSection(current);
		};

		window.addEventListener('scroll', handleScroll);

		// Initial check
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			<header className='shadow-sm rounded-b-lg sticky top-0 z-50 bg-white'>
				<div className='flex items-center justify-center py-2'>
					<div className='flex items-center justify-between w-7xl'>
						{/* LOGO */}
						<div className='w-32 h-12 overflow-hidden rounded'>
							<img
								src='./comot.in-header.png'
								alt='Comot.In'
								className='w-full h-full object-cover'
							/>
						</div>{' '}
						{/* NAVIGATION */}
						<ul className='flex items-center justify-center gap-10 w-1/2'>
							<li>
								<a
									href='#home'
									onClick={(e) => {
										e.preventDefault();
										document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
										setActiveSection('home');
									}}
									className={`${
										activeSection === 'home'
											? 'text-[#99BC85] font-semibold'
											: 'text-black hover:text-[#99BC85]'
									} transition-colors`}
								>
									Home
								</a>
							</li>
							<li>
								<a
									href='#guide'
									onClick={(e) => {
										e.preventDefault();
										document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' });
										setActiveSection('guide');
									}}
									className={`${
										activeSection === 'guide'
											? 'text-[#99BC85] font-semibold'
											: 'text-black hover:text-[#99BC85]'
									} transition-colors`}
								>
									Guide
								</a>
							</li>
							<li>
								<a
									href='#features'
									onClick={(e) => {
										e.preventDefault();
										document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
										setActiveSection('features');
									}}
									className={`${
										activeSection === 'features'
											? 'text-[#99BC85] font-semibold'
											: 'text-black hover:text-[#99BC85]'
									} transition-colors`}
								>
									Features
								</a>
							</li>
							<li>
								<a
									href='#reviews'
									onClick={(e) => {
										e.preventDefault();
										document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
										setActiveSection('reviews');
									}}
									className={`${
										activeSection === 'reviews'
											? 'text-[#99BC85] font-semibold'
											: 'text-black hover:text-[#99BC85]'
									} transition-colors`}
								>
									Reviews
								</a>
							</li>
						</ul>
						{/* ACTIONS */}
						<div className='flex items-center gap-2'>
							{isLoggedIn ? (
								<Button
									variant='outline'
									className='cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
									onClick={() => setIsLogoutConfirmOpen(true)}
								>
									Logout
								</Button>
							) : (
								<>
									<Button
										variant='ghost'
										className='cursor-pointer hover:text-[#99BC85]'
										onClick={() => setIsLoginOpen(true)}
									>
										Login
									</Button>
									<Button
										variant='outline'
										className='cursor-pointer border-[#99BC85] text-[#99BC85] hover:bg-[#99BC85] hover:text-white'
										onClick={() => setIsSignupOpen(true)}
									>
										Sign Up
									</Button>
								</>
							)}
						</div>
					</div>
				</div>
			</header>

			{/* Modals */}
			<LoginModal
				isOpen={isLoginOpen}
				onClose={() => setIsLoginOpen(false)}
				setToken={(token) => {
					setToken(token);
					setIsLoggedIn(true);
					setIsLoginOpen(false);
				}}
			/>
			<SignupModal
				isOpen={isSignupOpen}
				onClose={() => setIsSignupOpen(false)}
				setToken={(token) => {
					setToken(token);
					setIsLoggedIn(true);
					setIsSignupOpen(false);
				}}
			/>
			<LogoutConfirmationModal
				isOpen={isLogoutConfirmOpen}
				onClose={() => setIsLogoutConfirmOpen(false)}
				onConfirm={handleLogout}
			/>
		</>
	);
};

export default Header;
