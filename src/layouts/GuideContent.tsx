const GuideContent = () => {
	return (
		<div id='guide' className='flex flex-col items-center justify-center gap-5 w-5xl'>
			<span className='flex items-center justify-center flex-col gap-2'>
				<h1 className='text-xl font-semibold text-black/80'>How to Download Videos</h1>
				<p className='text-center text-sm text-muted-foreground max-w-2xl'>
					Follow these simple steps to download your favorite videos from YouTube, Facebook, and
					Instagram
				</p>
			</span>

			<span className='grid grid-cols-1 md:grid-cols-3 gap-5'>
				{/* Step 1 */}
				<div className='flex flex-col items-center text-center p-6 rounded-lg border shadow-sm'>
					<div className='h-12 w-12 flex items-center justify-center rounded-full bg-[#99BC85] text-white font-bold text-xl mb-4'>
						1
					</div>
					<h3 className='font-semibold mb-2'>Paste Video URL</h3>
					<p className='text-sm text-muted-foreground'>
						Copy the URL of the video you want to download from YouTube, Facebook, or Instagram and
						paste it in the input box.
					</p>
				</div>

				{/* Step 2 */}
				<div className='flex flex-col items-center text-center p-6 rounded-lg border shadow-sm'>
					<div className='h-12 w-12 flex items-center justify-center rounded-full bg-[#99BC85] text-white font-bold text-xl mb-4'>
						2
					</div>
					<h3 className='font-semibold mb-2'>Select Resolution</h3>
					<p className='text-sm text-muted-foreground'>
						For YouTube videos, select your preferred resolution (1080p, 720p, 480p, or 360p). The
						thumbnail preview will help you confirm the correct video.
					</p>
				</div>

				{/* Step 3 */}
				<div className='flex flex-col items-center text-center p-6 rounded-lg border shadow-sm'>
					<div className='h-12 w-12 flex items-center justify-center rounded-full bg-[#99BC85] text-white font-bold text-xl mb-4'>
						3
					</div>
					<h3 className='font-semibold mb-2'>Download Video</h3>
					<p className='text-sm text-muted-foreground'>
						Click the "Download" button and your video will start downloading automatically. No
						registration required!
					</p>
				</div>
			</span>
		</div>
	);
};

export default GuideContent;
