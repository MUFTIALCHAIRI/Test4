const PricingContent = () => {
    return (
        <div id='pricing' className='flex flex-col items-center justify-center gap-5 w-7xl'>
            <h1 className='text-xl font-semibold text-black/80'>Pricing Plans</h1>
            {/* Pricing Plans */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl'>
                {/* Free Plan */}
                <div className='rounded-md border px-5 py-4 grid gap-3 shadow-sm hover:shadow-md transition-shadow'>
                    <h2 className='text-lg font-semibold text-black'>Free</h2>
                    <p className='text-3xl font-bold text-black'>$0.00</p>
                    <p className='text-sm text-muted-foreground'>/Month (cancel any time)</p>
                    <ul className='list-disc pl-5'>
                        <li>20 downloads / day</li>
                        <li>200 MB maximum file size</li>
                        <li>High priority</li>
                        <li>CPU-based video encoding</li>
                    </ul>
                    <button className='bg-blue-500 text-white py-2 px-4 rounded-md mt-4'>Sign Up</button>
                </div>

                {/* Basic Plan */}
                <div className='rounded-md border px-5 py-4 grid gap-3 shadow-sm hover:shadow-md transition-shadow'>
                    <h2 className='text-lg font-semibold text-black'>Basic</h2>
                    <p className='text-3xl font-bold text-black'>$9.99</p>
                    <p className='text-sm text-muted-foreground'>/Month (cancel any time)</p>
                    <ul className='list-disc pl-5'>
                        <li>1,500 downloads / month</li>
                        <li>1.5 GB maximum file size</li>
                        <li>High priority</li>
                        <li>CPU-based video encoding</li>
                        <li>100% Money Back Guarantee</li>
                    </ul>
                    <button className='bg-blue-500 text-white py-2 px-4 rounded-md mt-4'>Get Started</button>
                </div>

                {/* Pro Plan */}
                <div className='rounded-md border px-5 py-4 grid gap-3 shadow-sm hover:shadow-md transition-shadow'>
                    <h2 className='text-lg font-semibold text-black'>Pro</h2>
                    <p className='text-3xl font-bold text-black'>$29.99</p>
                    <p className='text-sm text-muted-foreground'>/Month (cancel any time)</p>
                    <ul className='list-disc pl-5'>
                        <li>4,000 downloads / month</li>
                        <li>6 GB maximum file size</li>
                        <li>Highest priority</li>
                        <li>GPU/CPU-based video encoding</li>
                        <li>100% Money Back Guarantee</li>
                    </ul>
                    <button className='bg-blue-500 text-white py-2 px-4 rounded-md mt-4'>Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default PricingContent;

