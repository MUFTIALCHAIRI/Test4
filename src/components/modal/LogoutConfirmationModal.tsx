import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

interface LogoutConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export function LogoutConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
}: LogoutConfirmationModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold'>Confirm Logout</DialogTitle>
					<DialogDescription>
						Are you sure you want to logout from comot.in? You can log back in at any time.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='flex gap-2 sm:justify-end'>
					<Button
						type='button'
						variant='outline'
						onClick={onClose}
						className='flex-1 sm:flex-none cursor-pointer'
					>
						Cancel
					</Button>
					<Button
						type='button'
						onClick={onConfirm}
						className='flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white cursor-pointer'
					>
						Logout
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
