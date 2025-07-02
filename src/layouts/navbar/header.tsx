import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { LoginModal } from '@/components/modal/LoginModal';
import { SignupModal } from '@/components/modal/SignupModal';
import { UserAvatar } from '@/components/ui/user-avatar';
import { AUTH_TOKEN_KEY } from '@/constant';
import { useNavigate } from 'react-router-dom';

const Header = ({ setToken }: { setToken: (token: string) => void }) => {
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState('home');
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignupOpen, setIsSignupOpen] = useState(false);
	const [token, setLocalToken] = useState(localStorage.getItem(AUTH_TOKEN_KEY) || '');

	// Update local token state when localStorage changes
	useEffect(() => {
		const storedToken = localStorage.getItem(AUTH_TOKEN_KEY) || '';
		setLocalToken(storedToken);
	}, []);

	// Listen for storage changes (in case token is modified in another tab)
	useEffect(() => {
		const handleStorageChange = () => {
			const storedToken = localStorage.getItem(AUTH_TOKEN_KEY) || '';
			setLocalToken(storedToken);
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	// Create a custom event listener for token changes within the same tab
	useEffect(() => {
		const handleTokenChange = () => {
			const storedToken = localStorage.getItem(AUTH_TOKEN_KEY) || '';
			setLocalToken(storedToken);
		};

		// Listen for custom token change events
		window.addEventListener('tokenChanged', handleTokenChange);

		return () => {
			window.removeEventListener('tokenChanged', handleTokenChange);
		};
	}, []);

	// Helper function to update token and trigger change event
	const updateToken = (newToken: string) => {
		setToken(newToken);
		setLocalToken(newToken);
		// Dispatch custom event to notify other components
		window.dispatchEvent(new Event('tokenChanged'));
	};

	const isLoggedIn = !!token;

	const handleLogoClick = () => {
		navigate('/');
		setActiveSection('home');
	};

	// Scroll navigation effect
	useEffect(() => {
		const handleScroll = () => {
			const sections = ['home', 'guide', 'features', 'pricing', 'reviews'];

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
						<div
							className='w-32 h-12 overflow-hidden rounded cursor-pointer'
							onClick={handleLogoClick}
						>
							<img
								src='./comot.in-header.png'
								alt='Comot.In'
								className='w-full h-full object-cover'
							/>
						</div>{' '}
						{/* NAVIGATION */}
						<ul className='flex items-center justify-center gap-10 w-1/2'>
							<li>
								<button
									onClick={() => {
										navigate('/');
										setActiveSection('home');
										// Scroll to home section after navigation
										setTimeout(() => {
											document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
										}, 100);
									}}
									className={`${
										activeSection === 'home'
											? 'text-[#99BC85] font-semibold'
											: 'text-black hover:text-[#99BC85]'
									} transition-colors`}
								>
									Home
								</button>
							</li>
							<li>
								<button
									onClick={() => {
										navigate('/');
										setActiveSection('guide');
										// Scroll to guide section after navigation
										setTimeout(() => {
											document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' });
										}, 100);
									}}
									className={`${
										activeSection === 'guide'
											? 'text-[#99BC85] font-semibold'
											: 'text-black hover:text-[#99BC85]'
									} transition-colors`}
								>
									Guide
								</button>
							</li>
							<li>
								<button
									onClick={() => {
										navigate('/');
										setActiveSection('features');
										// Scroll to features section after navigation
										setTimeout(() => {
											document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
										}, 100);
									}}
									className={`${
										activeSection === 'features'
											? 'text-[#99BC85] font-semibold'
											: 'text-black hover:text-[#99BC85]'
									} transition-colors`}
								>
									Features
								</button>
							</li>
														<li>
								<button
									onClick={() => {
										navigate('/');
										setActiveSection('pricing');
										// Scroll to features section after navigation
										setTimeout(() => {
											document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
										}, 100);
									}}
									className={`${
										activeSection === 'pricing'
											? 'text-[#99BC85] font-semibold'
											: 'text-black hover:text-[#99BC85]'
									} transition-colors`}
								>
									Pricing
								</button>
							</li>
							<li>
								<button
									onClick={() => {
										navigate('/');
										setActiveSection('reviews');
										// Scroll to reviews section after navigation
										setTimeout(() => {
											document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
										}, 100);
									}}
									className={`${
										activeSection === 'reviews'
											? 'text-[#99BC85] font-semibold'
											: 'text-black hover:text-[#99BC85]'
									} transition-colors`}
								>
									Reviews
								</button>
							</li>
						</ul>
						{/* ACTIONS */}
						<div className='flex items-center gap-2'>
							{isLoggedIn ? (
								<UserAvatar setToken={updateToken} />
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
					updateToken(token);
					setIsLoginOpen(false);
				}}
			/>
			<SignupModal
				isOpen={isSignupOpen}
				onClose={() => setIsSignupOpen(false)}
				setToken={(token) => {
					updateToken(token);
					setIsSignupOpen(false);
				}}
			/>
		</>
	);
};

export default Header;
