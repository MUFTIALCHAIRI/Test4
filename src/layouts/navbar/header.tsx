import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

const Header = () => {
	const [activeSection, setActiveSection] = useState('home');

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
				}) || 'home'; // Default to home if none found

			setActiveSection(current);
		};

		window.addEventListener('scroll', handleScroll);

		// Initial check
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	return (
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
					{/* SEARCH */}
					<div className='flex items-center gap-4'>
						<Input type='text' placeholder='Search' />
					</div>
					{/* ACTIONS */}
					<div className='flex items-center gap-2'>
						<Button variant='ghost'>Login</Button>
						<Button variant='outline'>Sign Up</Button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
