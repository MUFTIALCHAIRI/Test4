import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const incrementDownloadCount = () => {
	const count = parseInt(localStorage.getItem('downloadCount') || '0');
	localStorage.setItem('downloadCount', (count + 1).toString());
};

export const checkLimitReached = () => {
	return parseInt(localStorage.getItem('downloadCount') || '0') >= 5;
};
