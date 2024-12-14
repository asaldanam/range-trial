import Link from 'next/link';
import S from './page.module.css';

export default function Home() {
    return (
        <div className={S.home}>
            <ul>
                <li>
                    <Link href="/exercise1">Exercise1</Link>
                </li>
                <li>
                    <Link href="/exercise2">Exercise2</Link>
                </li>
            </ul>
        </div>
    );
}
