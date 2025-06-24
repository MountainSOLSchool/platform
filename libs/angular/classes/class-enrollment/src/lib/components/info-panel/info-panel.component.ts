import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

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

export interface PanelConfig {
    title: string;
    subtitle: string;
    gradient: string;
    highlightBoxes: HighlightBox[];
    infoCards: InfoCard[];
    isExpandedByDefault: boolean;
}

@Component({
    selector: 'sol-info-panel',
    template: `
        <div class="info-panel" [style.background]="config.gradient">
            <div class="panel-header" (click)="togglePanel()">
                <div>
                    <h2 class="panel-title">{{ config.title }}</h2>
                    <p class="panel-subtitle">{{ config.subtitle }}</p>
                </div>
                <span class="chevron" [class.expanded]="isExpanded">▼</span>
            </div>

            <div class="panel-content" [class.expanded]="isExpanded">
                <div class="content-inner">
                    <!-- Highlight Boxes -->
                    @for (
                        highlight of config.highlightBoxes;
                        track highlight.text
                    ) {
                        <div
                            class="highlight-box"
                            [ngClass]="'highlight-' + highlight.type"
                        >
                            <markdown>{{ highlight.text }}</markdown>
                        </div>
                    }

                    <!-- Info Cards Grid -->
                    <div class="info-grid">
                        @for (card of config.infoCards; track card.title) {
                            <div class="info-card">
                                <h3>
                                    <span class="icon">{{ card.icon }}</span>
                                    {{ card.title }}
                                </h3>

                                @for (
                                    content of card.content;
                                    track content.type
                                ) {
                                    <div>
                                        <!-- Text Content -->
                                        @if (content.type === 'text') {
                                            <markdown>{{
                                                content.text
                                            }}</markdown>
                                        }

                                        <!-- List Content -->
                                        @if (content.type === 'list') {
                                            <ul>
                                                @for (
                                                    item of content.items;
                                                    track item
                                                ) {
                                                    <li>
                                                        <markdown>{{
                                                            item
                                                        }}</markdown>
                                                    </li>
                                                }
                                            </ul>
                                        }

                                        <!-- Grid Content (for pricing, etc.) -->
                                        @if (content.type === 'grid') {
                                            <div class="content-grid">
                                                @for (
                                                    item of content.gridItems;
                                                    track item.label
                                                ) {
                                                    <div class="grid-item">
                                                        <strong>{{
                                                            item.value
                                                        }}</strong>
                                                        <span>{{
                                                            item.label
                                                        }}</span>
                                                        @if (item.description) {
                                                            <small>{{
                                                                item.description
                                                            }}</small>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .info-panel {
                border-radius: 12px;
                margin-bottom: 24px;
                overflow: hidden;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            }

            .panel-header {
                padding: 20px 24px;
                color: white;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.3s ease;
            }

            .panel-header:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            .panel-title {
                font-size: 18px;
                font-weight: 600;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .panel-subtitle {
                font-size: 14px;
                opacity: 0.9;
                margin: 4px 0 0 0;
            }

            .chevron {
                transition: transform 0.3s ease;
                font-size: 20px;
            }

            .chevron.expanded {
                transform: rotate(180deg);
            }

            .panel-content {
                background: white;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.4s ease;
            }

            .panel-content.expanded {
                max-height: 10000px;
            }

            .content-inner {
                padding: 24px;
            }

            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 24px;
                margin-bottom: 24px;
            }

            .info-card {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 20px;
                border-left: 4px solid #667eea;
            }

            .info-card h3 {
                margin: 0 0 12px 0;
                font-size: 16px;
                color: #333;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .info-card p,
            .info-card ul {
                margin: 8px 0;
                font-size: 14px;
                line-height: 1.5;
                color: #666;
            }

            .info-card ul {
                padding-left: 16px;
            }

            .highlight-box {
                border-radius: 8px;
                padding: 16px;
                margin: 16px 0;
                border-left: 4px solid;
            }

            .highlight-promotional {
                background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
                border-left-color: #ff8a80;
            }

            .highlight-info {
                background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
                border-left-color: #2196f3;
            }

            .highlight-success {
                background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
                border-left-color: #4caf50;
            }

            .highlight-warning {
                background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
                border-left-color: #ff9800;
            }

            .content-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 16px;
                margin: 16px 0;
            }

            .grid-item {
                background: #e8f5e8;
                padding: 12px 16px;
                border-radius: 6px;
                text-align: center;
                border: 2px solid #4caf50;
            }

            .grid-item strong {
                display: block;
                color: #2e7d32;
                font-size: 16px;
            }

            .grid-item small {
                display: block;
                font-size: 12px;
                color: #666;
                margin-top: 4px;
            }

            .icon {
                font-size: 18px;
            }
        `,
    ],
    imports: [NgClass, MarkdownComponent],
})
export class InfoPanelComponent implements OnInit {
    @Input() config!: PanelConfig;

    isExpanded = false;

    ngOnInit() {
        this.isExpanded = this.config?.isExpandedByDefault || false;
    }

    togglePanel() {
        this.isExpanded = !this.isExpanded;
    }
}
