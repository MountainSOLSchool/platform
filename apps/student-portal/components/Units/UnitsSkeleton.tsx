import { Skeleton } from 'primereact/skeleton';

export function UnitsSkeleton() {
    return (
        <div className="card">
            <div className="border-round border-1 surface-border p-4 surface-card">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="mt-3 mb-5">
                        <div className="flex mb-3">
                            <div>
                                <Skeleton
                                    height="2rem"
                                    width="10rem"
                                    className="mb-2"
                                ></Skeleton>
                            </div>
                        </div>
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex align-items-center gap-2 mt-1"
                            >
                                <Skeleton width="2rem" height="2rem"></Skeleton>
                                <Skeleton
                                    width="12rem"
                                    height="1rem"
                                ></Skeleton>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
