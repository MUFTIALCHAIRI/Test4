import { Button } from '@/components/ui/button';
import Header from './components/navbar/header';
import Footer from './components/navbar/footer';
import { Input } from './components/ui/input';

function App() {
	return (
		<>
			<Header />

			<div className='flex min-h-svh flex-col items-center justify-start pt-[2rem]'>
				{/* DOWNLOADER */}
				<div className='flex flex-col items-center justify-center gap-10'>
					<span className='flex flex-col items-center justify-center gap-2'>
						<h1 className='text-4xl font-semibold'>Free Online Video Downloader</h1>
						<p className='text-sm text-muted-foreground'>
							Download videos from YouTube, Instagram, Facebook, and more.
						</p>
					</span>

					{/* DOWNLOADER INPUT */}
					<span className='flex items-center justify-between bg-[#99BC85] p-1 w-2xl rounded-sm gap-2'>
						<Input type='text' placeholder='Enter URL' className='bg-white flex-1 rounded-sm' />
						<Button variant={'ghost'} className='text-white rounded-sm'>
							Download
						</Button>
					</span>

					{/* DOWNLOADER ICON */}
					{/* <span className='flex items-center justify-center gap-2'>
						<img src='./youtube.png' alt='YouTube' className='w-6 h-6' />
						<img src='./instagram.png' alt='Instagram' className='w-6 h-6' />
					</span> */}
				</div>

				{/* FEATURES */}
				{/* <div className='flex flex-col items-center justify-center'>
					<h1 className='text-2xl font-bold'>About</h1>
				</div> */}

				{/* REVIEW */}
				{/* <div className='flex flex-col items-center justify-center'>
					<h1 className='text-2xl font-bold'>Review</h1>
				</div> */}
			</div>

			<Footer />
		</>
	);
}

export default App;
