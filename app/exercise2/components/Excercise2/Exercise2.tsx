import Range from '@/components/ui/Range';
import { api } from '@/lib/api';

import S from './Exercise2.module.css';
import { Exercise2GetResponse } from '@/app/api/exercise2/route';

export default async function Exercise2() {
    const excercise2 = await api.get<Exercise2GetResponse>('/api/exercise2');

    if (!excercise2.ok) {
        return (
            <div className={S.exercise2}>
                <p>Failed to load data</p>
            </div>
        );
    }

    return (
        <div className={S.exercise2}>
            <Range className={S.range} unit="€" range={excercise2.data.range} />
        </div>
    );
}
