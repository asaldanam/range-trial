import { Exercise1GetResponse } from '@/app/api/exercise1/route';
import Range from '@/components/ui/Range';
import { api } from '@/lib/api';

import S from './Exercise1.module.css';

export default async function Exercise1() {
    const excercise1 = await api.get<Exercise1GetResponse>('/api/exercise1');

    if (!excercise1.ok) {
        return (
            <div className={S.exercise1}>
                <p>Failed to load data</p>
            </div>
        );
    }

    return (
        <div className={S.exercise1}>
            <Range unit="€" min={excercise1.data.min} max={excercise1.data.max} />
        </div>
    );
}
