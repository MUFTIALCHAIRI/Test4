import { Button } from '@/components/ui/button';
import Header from './layouts/navbar/header';
import Footer from './layouts/navbar/footer';
import { Input } from './components/ui/input';
import { useState, useEffect } from 'react';
import ReviewContent from './layouts/ReviewContent';
import FeatureContent from './layouts/FeatureContent';
import GuideContent from './layouts/GuideContent';
import { incrementDownloadCount, checkLimitReached } from '@/lib/utils';
import { toast } from 'sonner';
import Dashboard from './components/dashboard/Dashboard';
import { AUTH_TOKEN_KEY } from '@/constant';

function App() {
	const [link, setLink] = useState('');
	const [thumbnail, setThumbnail] = useState('');
	const [videoTitle, setVideoTitle] = useState('');
	const [videoType, setVideoType] = useState('');
	const [isValidUrl, setIsValidUrl] = useState(false);
	const [resolution, setResolution] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN_KEY) || '');

	// Function to extract YouTube video ID
	const getYoutubeVideoId = (url: string) => {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	};

	// Function to extract Facebook video ID (placeholder - would need server implementation)
	const getFacebookVideoId = (url: string) => {
		// Various FB URL patterns
		const patterns = [
			/facebook\.com\/.*\/videos\/(?:t\.\d+\/)?(\d+)/,
			/facebook\.com\/watch\/?\?v=(\d+)/,
			/fb\.watch\/([^\/]+)/,
		];

		for (const pattern of patterns) {
			const match = url.match(pattern);
			if (match && match[1]) return match[1];
		}
		return null;
	};

	// Function to extract Instagram post ID (placeholder - would need server implementation)
	const getInstagramPostId = (url: string) => {
		const regExp = /instagram\.com\/(?:p|reel)\/([^\/\?]+)/;
		const match = url.match(regExp);
		return match ? match[1] : null;
	};

	// Get thumbnail when link changes
	useEffect(() => {
		// Clear the thumbnail if input is empty
		if (!link.trim()) {
			setThumbnail('');
			setVideoTitle('');
			setVideoType('');
			setIsValidUrl(false);
			setResolution(1);
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
				// YouTube thumbnails have multiple resolutions, try the best quality first
				setThumbnail(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
				setVideoTitle('YouTube Video');
				setVideoType('youtube');
				setIsValidUrl(true);
				// Keep existing resolution if already set for YouTube
			} else {
				setIsValidUrl(false);
				setThumbnail('');
				setVideoTitle('');
				setVideoType('');
			}
		}
		// Check for Facebook URL
		else if (checkedLink.match(/(facebook\.com|fb\.com|fb\.watch)/i)) {
			const videoId = getFacebookVideoId(checkedLink);

			setVideoTitle(videoId ? 'Facebook Video' : 'Invalid Facebook URL');
			setVideoType('facebook');
			// Facebook thumbnails require API access, use a placeholder
			setIsValidUrl(true);
			setResolution(1); // Reset resolution for non-YouTube URL
		}
		// Check for Instagram URL
		else if (checkedLink.match(/(instagram\.com|instagr\.am)/i)) {
			const postId = getInstagramPostId(checkedLink);

			setVideoTitle(postId ? 'Instagram Post' : 'Invalid Instagram URL');
			setVideoType('instagram');
			// Instagram thumbnails require API access, use a placeholder
			setThumbnail('/instagram-placeholder.jpg');
			setIsValidUrl(!!postId);
			setResolution(1); // Reset resolution for non-YouTube URL
		} else {
			setIsValidUrl(false);
			setThumbnail('');
			setVideoTitle('');
			setVideoType('');
			setResolution(1); // Reset resolution for invalid URL
		}
	}, [link]);

	const handleSubmit = async () => {
		const checkedLink = link.trim();

		if (!checkedLink) {
			toast.error('Please enter a URL');
			return;
		}

		if (!/^https?:\/\//.test(checkedLink)) {
			toast.error('Please enter a valid URL starting with http:// or https://');
			return;
		}

		// Check for download limits before proceeding
		if (checkLimitReached() && !localStorage.getItem('token')) {
			toast.error('You need to login after 5 downloads.');
			// Instead of redirecting, show login modal
			// You could dispatch an event or use context to tell the Header to open login modal
			return;
		}

		setIsLoading(true);

		try {
			// Check if the URL is from YouTube, Facebook, or Instagram
			if (checkedLink.match(/(youtube\.com|youtu\.be)/i)) {
				if (videoType === 'youtube' && resolution === 1) {
					toast.warning('Please select a resolution first');
					setIsLoading(false);
					return;
				}

				// Get resolution text for better UX
				let resolutionText = '';
				switch (resolution) {
					case 5:
						resolutionText = '1080p';
						break;
					case 4:
						resolutionText = '720p';
						break;
					case 3:
						resolutionText = '480p';
						break;
					case 2:
						resolutionText = '360p';
						break;
					default:
						resolutionText = 'unknown';
				}

				toast.info(`Processing YouTube download at ${resolutionText} resolution...`);

				// Here you would add your actual YouTube download logic
				// For example:
				await downloadYouTubeVideo(checkedLink, resolution);
			} else if (checkedLink.match(/(facebook\.com|fb\.com|fb\.watch)/i)) {
				toast.info('Processing Facebook video download...');

				// Here you would add your actual Facebook download logic
				// For example:
				await downloadFacebookVideo(checkedLink);
			} else if (checkedLink.match(/(instagram\.com|instagr\.am)/i)) {
				toast.info('Processing Instagram download...');

				// Here you would add your actual Instagram download logic
				// For example:
				await downloadInstagramMedia(checkedLink);
			} else {
				toast.error('Please enter a valid URL from YouTube, Facebook, or Instagram');
				setIsLoading(false);
				return;
			}

			// After successful download
			incrementDownloadCount();
			toast.success('Download complete!');

			// Clear the input after successful download
			setLink('');
		} catch (error) {
			toast.error(`Download failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
			console.error('Download error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// Placeholder functions for actual download implementations
	const downloadYouTubeVideo = async (url: string, quality: number) => {
		const apiUrl = `http://localhost:8000/download?platform=youtube&url=${encodeURIComponent(
			url
		)}&quality=${quality}`;

		const res = await fetch(apiUrl, {
			method: 'POST',
			headers: token ? { Authorization: `Bearer ${token}` } : {},
		});

		if (!res.ok) throw new Error('Failed to download YouTube video');

		const blob = await res.blob();
		const blobUrl = window.URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = blobUrl;
		a.download = 'youtube_video.mp4';
		document.body.appendChild(a);
		a.click();
		a.remove();
	};

	const downloadFacebookVideo = async (url: string) => {
		const apiUrl = `http://localhost:8000/download?platform=facebook&url=${encodeURIComponent(
			url
		)}`;

		const res = await fetch(apiUrl, {
			method: 'POST',
			headers: token ? { Authorization: `Bearer ${token}` } : {},
		});

		if (!res.ok) throw new Error('Failed to download Facebook video');

		const blob = await res.blob();
		const blobUrl = window.URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = blobUrl;
		a.download = 'facebook_video.mp4';
		document.body.appendChild(a);
		a.click();
		a.remove();
	};

	const downloadInstagramMedia = async (url: string) => {
		const apiUrl = `http://localhost:8000/download?platform=instagram&url=${encodeURIComponent(
			url
		)}`;

		const res = await fetch(apiUrl, {
			method: 'POST',
			headers: token ? { Authorization: `Bearer ${token}` } : {},
		});

		if (!res.ok) throw new Error('Failed to download Instagram media');

		const blob = await res.blob();
		const blobUrl = window.URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = blobUrl;
		a.download = 'instagram_video.mp4';
		document.body.appendChild(a);
		a.click();
		a.remove();
	};

	// Effect to redirect to dashboard if token exists
	useEffect(() => {
		// If token exists in localStorage but not in state, set it
		const storedToken = localStorage.getItem('token');
		if (storedToken && !token) {
			setToken(storedToken);
		}
	}, [token]);

	// If user has token, show Dashboard
	if (token) {
		return <Dashboard token={token} setToken={setToken} />;
	}

	// Otherwise show the main app
	return (
		<>
			<Header setToken={setToken} />

			<main className='flex min-h-svh flex-col items-center justify-start pt-[2rem] gap-10'>
				{/* DOWNLOADER */}
				<div className='flex flex-col items-center justify-center gap-5' id='home'>
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
							disabled={isLoading}
						/>
						<Button
							variant={'ghost'}
							className='text-white rounded-sm hover:bg-[#99BC85] hover:text-white cursor-pointer'
							onClick={handleSubmit}
							disabled={!isValidUrl || (videoType === 'youtube' && resolution === 1) || isLoading}
						>
							{isLoading ? 'Processing...' : 'Download'}
						</Button>
					</span>

					{/* VIDEO PREVIEW */}
					{thumbnail && (
						<span className='flex flex-col items-center justify-center gap-4'>
							<div className='w-full max-w-md rounded-lg overflow-hidden shadow-lg'>
								<div className='relative'>
									{videoType === 'youtube' && (
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
									)}
									<div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3'>
										<div className='flex items-center'>
											{videoType === 'youtube' && (
												<i className='bxl bx-youtube text-red-600 text-xl mr-2'></i>
											)}
											{videoType === 'facebook' && (
												<i className='bxl bx-facebook-square text-blue-600 text-xl mr-2'></i>
											)}
											{videoType === 'instagram' && (
												<i className='bxl bx-instagram text-pink-600 text-xl mr-2'></i>
											)}
											<span className='text-sm font-medium'>{videoTitle}</span>
										</div>
									</div>
								</div>
							</div>

							{/* Resolution buttons - only show for YouTube */}
							{videoType === 'youtube' && (
								<div className='flex items-center justify-center gap-2 mt-2'>
									<Button
										variant={resolution === 5 ? 'default' : 'outline'}
										className={
											'cursor-pointer ' +
											(resolution === 5
												? 'bg-[#99BC85] text-white hover:bg-[#88ab74]'
												: 'bg-white text-black hover:bg-gray-100 hover:text-black ')
										}
										disabled={!isValidUrl || videoType !== 'youtube' || isLoading}
										onClick={() => setResolution(5)}
									>
										1080p
									</Button>
									<Button
										variant={resolution === 4 ? 'default' : 'outline'}
										className={
											'cursor-pointer ' +
											(resolution === 4
												? 'bg-[#99BC85] text-white hover:bg-[#88ab74]'
												: 'bg-white text-black hover:bg-gray-100 hover:text-black ')
										}
										disabled={!isValidUrl || videoType !== 'youtube' || isLoading}
										onClick={() => setResolution(4)}
									>
										720p
									</Button>
									<Button
										variant={resolution === 3 ? 'default' : 'outline'}
										className={
											'cursor-pointer ' +
											(resolution === 3
												? 'bg-[#99BC85] text-white hover:bg-[#88ab74]'
												: 'bg-white text-black hover:bg-gray-100 hover:text-black ')
										}
										disabled={!isValidUrl || videoType !== 'youtube' || isLoading}
										onClick={() => setResolution(3)}
									>
										480p
									</Button>
									<Button
										variant={resolution === 2 ? 'default' : 'outline'}
										className={
											'cursor-pointer ' +
											(resolution === 2
												? 'bg-[#99BC85] text-white hover:bg-[#88ab74]'
												: 'bg-white text-black hover:bg-gray-100 hover:text-black ')
										}
										disabled={!isValidUrl || videoType !== 'youtube' || isLoading}
										onClick={() => setResolution(2)}
									>
										360p
									</Button>
								</div>
							)}
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
								disabled={isLoading}
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
								disabled={isLoading}
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
								disabled={isLoading}
							>
								<i className='bxl bx-instagram'></i>
								<small>Instagram</small>
							</button>
						</span>
					</div>
				</div>

				{/* GUIDE */}
				<GuideContent />

				{/* FEATURES */}
				<FeatureContent />

				{/* REVIEW */}
				<ReviewContent />
			</main>

			<Footer />
		</>
	);
}

export default App;
