export interface InfoCard {
    title: string;
    icon: string;
    content: InfoCardContent[];
}

export interface InfoCardContent {
    type: 'text' | 'list' | 'grid';
    text?: string;
    items?: string[];
    gridItems?: GridItem[];
}

export interface GridItem {
    label: string;
    value: string;
    description?: string;
}

export interface HighlightBox {
    text: string;
    type: 'warning' | 'info' | 'success' | 'promotional';
}

export interface AdditionalInfoPanel {
    title: string;
    subtitle: string;
    gradient: string;
    highlightBoxes: HighlightBox[];
    infoCards: InfoCard[];
    isExpandedByDefault: boolean;
    active: boolean;
}
