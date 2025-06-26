import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL, AUTH_TOKEN_KEY } from '@/constant';

export function SignupModal({
	isOpen,
	onClose,
	setToken,
}: {
	isOpen: boolean;
	onClose: () => void;
	setToken: (token: string) => void;
}) {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords don't match!");
			return;
		}

		setIsSubmitting(true);
		try {
			const res = await fetch(`${API_BASE_URL}/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: name, email: email, password }),
			});

			// Parse the response JSON regardless of success/failure
			const data = await res.json();

			if (!res.ok) {
				// Handle different error response formats
				if (data.detail) {
					// Could be a string or an object with message property
					if (typeof data.detail === 'string') {
						throw new Error(data.detail);
					} else if (Array.isArray(data.detail) && data.detail.length > 0) {
						// FastAPI validation errors format
						if (data.detail[0].msg) {
							throw new Error(data.detail[0].msg);
						} else {
							throw new Error(JSON.stringify(data.detail[0]));
						}
					} else if (data.detail.message) {
						throw new Error(data.detail.message);
					}
				} else if (data.message) {
					// Some APIs use message directly
					throw new Error(data.message);
				} else if (data.error) {
					// Or direct error property
					throw new Error(data.error);
				} else {
					throw new Error('Registration failed');
				}
			}

			localStorage.setItem(AUTH_TOKEN_KEY, data.access_token);
			// Using setToken will trigger the App component to show Dashboard
			setToken(data.access_token);
			// Dispatch custom event to notify other components
			window.dispatchEvent(new Event('tokenChanged'));
			toast.success('Registration successful! Redirecting to dashboard...');

			setName('');
			setEmail('');
			setPassword('');
			setConfirmPassword('');
			onClose();

			// Navigate to dashboard after a short delay to allow token to be set
			setTimeout(() => {
				navigate('/dashboard');
			}, 500);
		} catch (error) {
			// Display the actual error message from the server
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';

			// Format specific error messages more user-friendly
			if (errorMessage.includes('already exists')) {
				// Extract the exact field that already exists
				if (errorMessage.includes('username already exists')) {
					toast.error('Username already exists. Please choose a different username.');
				} else if (errorMessage.includes('email already exists')) {
					toast.error('Email already exists. Please use a different email or try logging in.');
				} else {
					toast.error(`Registration failed: ${errorMessage}`);
				}
			} else if (errorMessage.includes('password')) {
				toast.error(`Password error: ${errorMessage}`);
			} else {
				toast.error(`Registration failed: ${errorMessage}`);
			}

			console.error('Registration error:', error);
		} finally {
			setIsSubmitting(false);
			setName('');
			setEmail('');
			setPassword('');
			setConfirmPassword('');
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle className='text-2xl font-bold'>Create an Account</DialogTitle>
						<DialogDescription>
							Join comot.in to save your favorite videos and more!
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid gap-2'>
							<Label htmlFor='name'>Full Name</Label>
							<Input
								id='name'
								placeholder='John Doe'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='name@example.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								placeholder='••••••••'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='confirm-password'>Confirm Password</Label>
							<Input
								id='confirm-password'
								type='password'
								placeholder='••••••••'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type='button'
							variant='outline'
							onClick={onClose}
							disabled={isSubmitting}
							className='cursor-pointer'
						>
							Cancel
						</Button>
						<Button
							type='submit'
							className='bg-[#99BC85] hover:bg-[#88ab74] text-white cursor-pointer'
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Signing up...' : 'Sign Up'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
