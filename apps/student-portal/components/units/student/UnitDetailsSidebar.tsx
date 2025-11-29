const sidebarDimensions = {
    width: 400,
    paddingTop: '2rem',
    paddingHoriz: '1rem',
    fontSize: 15,
    headerFontSize: 25,
};

export interface UnitDetails {
    name: string;
    description: string;
}

interface UnitDetailsSidebarProps {
    unitDetails: UnitDetails;
}

export function UnitDetailsSidebar({ unitDetails }: UnitDetailsSidebarProps) {
    return (
        <div
            className="smart-tree-sidebar"
            style={{
                border: '2px solid black',
                paddingLeft: sidebarDimensions.paddingHoriz,
                paddingBottom: sidebarDimensions.paddingTop,
                paddingTop: sidebarDimensions.paddingTop,
                width: sidebarDimensions.width,
                fontSize: sidebarDimensions.fontSize,
            }}
        >
            <h2 className="sidebar-header">{unitDetails.name}</h2>
            <p className="sidebar-description">{unitDetails.description}</p>
        </div>
    );
}
