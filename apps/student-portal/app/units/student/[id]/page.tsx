import React from 'react';
import { SmartTreeChart } from '../../../../components/units/student/TreeChart';

type PageProps = { params: Promise<{ id: string }> };

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    return (
        <div>
            <SmartTreeChart studentId={id} />
        </div>
    );
}
