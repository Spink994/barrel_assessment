/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import '../global.css';
import styles from './layout.module.css';
import Sidebar from './layout/Sidebar';
import ChildrenWrapper from './components/ChildrenWrapper';

const monteserrat = Montserrat({ subsets: ['latin'] });

/**
|--------------------------------------------------
| Meta data for the website
|--------------------------------------------------
*/
export const metadata: Metadata = {
	title: 'Procurement Application',
	description: 'This is procurement application',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	/**
	|--------------------------------------------------
	| Rendered View
	|--------------------------------------------------
	*/
	return (
		<html lang="en">
			<body
				style={{ backgroundColor: 'white', padding: 0, margin: 0 }}
				className={monteserrat.className}
			>
				<ChildrenWrapper
					className={`${styles.layout} ${monteserrat.className}`}
				>
					{children}
				</ChildrenWrapper>
			</body>
		</html>
	);
}
