import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
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
					</div>

					{/* NAVIGATION */}
					<ul className='flex items-center  justify-center gap-10 w-1/2'>
						<li>
							<p>
								<a href='/' className=''>
									Home
								</a>
							</p>
						</li>
						<li>
							<p>
								<a href='/' className=''>
									History
								</a>
							</p>
						</li>
						<li>
							<p>
								<a href='/' className=''>
									Pricing
								</a>
							</p>
						</li>
						<li>
							<p>
								<a href='/' className=''>
									About
								</a>
							</p>
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
