import { Button } from '@/components/ui/button';
import Header from './components/navbar/header';

function App() {
	return (
		<>
			<Header />

			<div className='flex min-h-svh flex-col items-center justify-center'>
				<Button className='bg-primary'>Click me</Button>
			</div>
		</>
	);
}

export default App;
