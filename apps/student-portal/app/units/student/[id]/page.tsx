'use client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setStudentId } from '../../../../store/studentStore';
import { SmartTreeChart } from '../../../../components/Units/TreeChart';

type PageProps = { params: { id: string } };

export default function Page({ params }: PageProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setStudentId(params.id));
    }, [params.id, dispatch]);

    return (
        <div>
            <SmartTreeChart />
        </div>
    );
}
