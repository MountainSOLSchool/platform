import React from 'react';
import { StudentUnitsPage } from '../../../../components/units/student/StudentUnitsPage';

type PageProps = { params: Promise<{ id: string }> };

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    return <StudentUnitsPage studentId={id} />;
}
