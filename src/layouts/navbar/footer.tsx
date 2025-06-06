const Footer = () => {
	return (
		<div className='relative'>
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
				<path
					fill='#E4EFE7'
					fill-opacity='1'
					d='M0,64L60,64C120,64,240,64,360,101.3C480,139,600,213,720,234.7C840,256,960,224,1080,213.3C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'
				></path>
			</svg>

			<div className='flex gap-5 items-start justify-center bg-[#e4efe7] text-black/30 absolute top-70 left-13'>
				<span className='grid gap-2 rounded-md p-2'>
					<small className='text-black/60 font-semibold'>Youtube Donwnloader</small>
					<small>Youtube to MP3</small>
					<small>Youtube Shorts</small>
					<small>Youtube to MP4</small>
				</span>
				<span className='grid gap-2 rounded-md p-2'>
					<small className='text-black/60 font-semibold'>Instagram Downloader</small>
					<small>Instagram Shorts</small>
					<small>Instagram to MP4</small>
				</span>
				<span className='grid gap-2 rounded-md p-2'>
					<small className='text-black/60 font-semibold'>Facebook Downloader</small>
					<small>Facebook Shorts</small>
					<small>Facebook to MP4</small>
				</span>
			</div>

			{/* FOOTER ICON */}
			<div className='grid absolute top-40 left-10 gap-0'>
				<img src='./comot.in-header.png' alt='Comot.In' className='w-[20rem] h-20 object-cover' />

				<small className='text-black/30 font-semibold text-center'>
					Free Online Video Downloader
				</small>
			</div>

			<footer className='flex items-center justify-center bg-[#e4efe7] border-t border-black/20 py-2'>
				<small className='text-black/60'>
					&copy; {new Date().getFullYear()} comot.in, All rights reserved
				</small>
			</footer>
		</div>
	);
};

export default Footer;
