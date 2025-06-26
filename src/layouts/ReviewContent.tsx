import { REVIEW } from '@/constant';

// Define the review item type
interface ReviewItem {
	id: number;
	star: number;
	review: string;
	profile: string;
}

const ReviewContent = () => {
	return (
		<div id='reviews' className='flex flex-col items-center justify-center gap-5 w-7xl'>
			<h1 className='text-xl font-semibold text-black/80'>Our Users Love Us</h1>{' '}
			{/* LIST REVIEWS */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl'>
				{REVIEW.map((item: ReviewItem) => (
					<div
						key={item.id}
						className='rounded-md border px-5 py-4 grid gap-3 shadow-sm hover:shadow-md transition-shadow'
					>
						{/* STAR */}
						<span className='flex items-center justify-start gap-1'>
							{Array(item.star)
								.fill('⭐')
								.map((star, idx) => (
									<span key={idx}>{star}</span>
								))}
						</span>
						{/* REVIEW */}
						<p className='text-sm text-muted-foreground'>{item.review}</p>
						{/* PROFILE */}
						<p className='font-semibold'>{item.profile}</p>
					</div>
				))}{' '}
			</div>
		</div>
	);
};

export default ReviewContent;
