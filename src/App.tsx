import { Button } from '@/components/ui/button';
import Header from './components/navbar/header';
import Footer from './components/navbar/footer';
import { Input } from './components/ui/input';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import ReviewContent from './components/layouts/ReviewContent';

function App() {
	const [link, setLink] = useState('');
	const [thumbnail, setThumbnail] = useState('');
	const [videoTitle, setVideoTitle] = useState('');
	const [videoType, setVideoType] = useState('');
	const [isValidUrl, setIsValidUrl] = useState(false);

	// Function to extract YouTube video ID
	const getYoutubeVideoId = (url: string) => {
		// Match for both youtube.com and youtu.be URLs
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	};

	// Get thumbnail when link changes
	useEffect(() => {
		// Clear the thumbnail if input is empty
		if (!link.trim()) {
			setThumbnail('');
			setVideoTitle('');
			setVideoType('');
			setIsValidUrl(false);
			return;
		}

		// Validate URL format
		if (!/^https?:\/\//.test(link.trim())) {
			setIsValidUrl(false);
			return;
		}

		const checkedLink = link.trim();

		// Check for YouTube URL
		if (checkedLink.match(/(youtube\.com|youtu\.be)/i)) {
			const videoId = getYoutubeVideoId(checkedLink);

			if (videoId) {
				setThumbnail(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
				setVideoTitle('YouTube Video');
				setVideoType('youtube');
				setIsValidUrl(true);
			}
		}
		// Check for Facebook URL
		else if (checkedLink.match(/(facebook\.com|fb\.com|fb\.watch)/i)) {
			setVideoTitle('Facebook Video');
			setVideoType('facebook');
			setIsValidUrl(true);
		}
		// Check for Instagram URL
		else if (checkedLink.match(/(instagram\.com|instagr\.am)/i)) {
			setVideoTitle('Instagram Post');
			setVideoType('instagram');
			setIsValidUrl(true);
		} else {
			setIsValidUrl(false);
			setThumbnail('');
			setVideoTitle('');
			setVideoType('');
		}
	}, [link]);

	const handleSumbit = () => {
		const checkedLink = link.trim();

		if (!checkedLink) {
			alert('Please enter a valid URL');
			return;
		}

		if (!/^https?:\/\//.test(checkedLink)) {
			alert('Please enter a valid URL starting with http:// or https://');
			return;
		}

		// Check if the URL is from YouTube, Facebook, or Instagram
		if (checkedLink.match(/(youtube\.com|youtu\.be)/i)) {
			alert('YouTube URL detected! Processing...');
			// Add YouTube download logic here
			return;
		} else if (checkedLink.match(/(facebook\.com|fb\.com|fb\.watch)/i)) {
			alert('Facebook URL detected! Processing...');
			// Add Facebook download logic here
			return;
		} else if (checkedLink.match(/(instagram\.com|instagr\.am)/i)) {
			alert('Instagram URL detected! Processing...');
			// Add Instagram download logic here
			return;
		} else {
			alert('Please enter a valid URL from YouTube, Facebook, or Instagram');
			return;
		}
	};

	return (
		<>
			<Header />

			<div className='flex min-h-svh flex-col items-center justify-start pt-[2rem] gap-10'>
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
						<Input
							type='text'
							placeholder='Enter URL'
							className='bg-white flex-1 rounded-sm ring-0'
							onChange={(e) => setLink(e.target.value)}
							value={link}
						/>
						<Button
							variant={'ghost'}
							className='text-white rounded-sm hover:bg-[#99BC85] hover:text-white cursor-pointer'
							onClick={handleSumbit}
							disabled={!isValidUrl}
						>
							Download
						</Button>
					</span>

					{/* VIDEO PREVIEW */}
					{thumbnail && (
						<span className='flex flex-col items-center justify-center gap-4'>
							<div className='w-full max-w-md rounded-lg overflow-hidden shadow-lg'>
								<div className='relative'>
									<img
										src={thumbnail}
										alt={videoTitle}
										className='w-full h-auto'
										onError={(e) => {
											// Fallback image if thumbnail fails to load
											const target = e.target as HTMLImageElement;
											target.src = 'https://via.placeholder.com/480x360?text=Video+Preview';
										}}
									/>
									<div className='absolute bottom-0 left-0 right-0 bg-black/50 bg-opacity-60 text-white p-3'>
										<div className='flex items-center'>
											{videoType === 'youtube' && (
												<i className='bxl bx-youtube text-red-600 text-xl mr-2'></i>
											)}
											<span className='text-sm font-medium'>{videoTitle}</span>
										</div>
									</div>
								</div>
							</div>

							<div className='flex items-center justify-center gap-2 mt-2'>
								<Button
									variant='outline'
									className='bg-white text-black hover:bg-gray-100'
									disabled={!isValidUrl || videoType !== 'youtube'}
									onClick={() => alert('Download in 1080p')}
								>
									1080p
								</Button>
								<Button
									variant='outline'
									className='bg-white text-black hover:bg-gray-100'
									disabled={!isValidUrl || videoType !== 'youtube'}
									onClick={() => alert('Download in 720p')}
								>
									720p
								</Button>
								<Button
									variant='outline'
									className='bg-white text-black hover:bg-gray-100'
									disabled={!isValidUrl || videoType !== 'youtube'}
									onClick={() => alert('Download in 480p')}
								>
									480p
								</Button>
								<Button
									variant='outline'
									className='bg-white text-black hover:bg-gray-100'
									disabled={!isValidUrl || videoType !== 'youtube'}
									onClick={() => alert('Download in 360p')}
								>
									360p
								</Button>
							</div>
						</span>
					)}

					{/* DOWNLOADER ICON */}
					<div className='grid gap-2'>
						<small className='text-center font-semibold text-black/60'>Download Provider</small>
						<span className='flex items-center justify-center gap-2 font-semibold'>
							<button
								className={
									'bg-red-600 button-action' +
									(videoType === 'youtube'
										? ' active'
										: videoType && videoType !== 'youtube'
										? ' disabled'
										: '')
								}
							>
								<i className='bxl bx-youtube'></i>
								<small>Youtube</small>
							</button>

							<button
								className={
									'bg-[#015DC5] button-action' +
									(videoType === 'facebook'
										? ' active'
										: videoType && videoType !== 'facebook'
										? ' disabled'
										: '')
								}
							>
								<i className='bxl  bx-facebook-square'></i>
								<small>Facebook</small>
							</button>

							<button
								className={
									'bg-gradient-to-r from-[#fa7e1e] via-[#d62976] to-[#962fbf] button-action' +
									(videoType === 'instagram'
										? ' active'
										: videoType && videoType !== 'instagram'
										? ' disabled'
										: '')
								}
							>
								<i className='bxl bx-instagram'></i>
								<small>Instagram</small>
							</button>
						</span>
					</div>
				</div>

				{/* FEATURES */}
				{/* <div className='flex flex-col items-center justify-center'>
					<h1 className='text-2xl font-bold'>About</h1>
				</div> */}

				{/* REVIEW */}
				<ReviewContent />
			</div>

			<Footer />
		</>
	);
}

export default App;
