import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        SliderModule,
        FormsModule,
        SidebarModule,
        PanelModule,
        CheckboxModule,
        OverlayPanelModule,
        TooltipModule,
    ],
    template: `<h2>Create a Class</h2>
        <p-button
            label="Add/Edit Units"
            (onClick)="isUnitsPanelVisible$.next(true)"
        ></p-button>
        <p-sidebar
            [visible]="(isUnitsPanelVisible$ | async) ?? false"
            position="bottom"
            styleClass="p-sidebar-lg"
            [baseZIndex]="10000"
            (onHide)="isUnitsPanelVisible$.next(false)"
        >
            <h3>Select All Units For Which Students Can Get Credit:</h3>
            <div
                style="margin-bottom:10px;"
                *ngFor="let category of categories"
            >
                <p-panel [header]="category.name">
                    <ng-container *ngFor="let unit of category.units">
                        <div class="field-checkbox">
                            <p-checkbox
                                [binary]="true"
                                [inputId]="'unit_' + unit.name"
                            ></p-checkbox>
                            <label [for]="'unit_' + unit.name">{{
                                unit.name
                            }}</label>
                            &nbsp;(<a
                                href="javascript:void(0)"
                                (click)="unitDescriptionTooltip.show($event)"
                                >description</a
                            >)
                            <br />
                        </div>
                        <p-overlayPanel
                            #unitDescriptionTooltip
                            [showCloseIcon]="true"
                            [style]="{ width: '450px' }"
                        >
                            {{ unit.description }}
                        </p-overlayPanel>
                    </ng-container>
                </p-panel>
            </div>
        </p-sidebar>
        <br />
        <br />
        <form>
            <div class="p-fluid">
                <div class="field">
                    <label for="email">Name</label>
                    <div class="p-inputgroup">
                        <input id="name" type="text" pInputText />
                    </div>
                </div>
                <div class="field">
                    <label for="email">Description</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon"
                            ><i class="pi pi-tag"></i
                        ></span>
                        <input id="name" type="text" pInputText />
                    </div>
                </div>
                <div class="field">
                    <label for="email">Type</label>
                    <p-dropdown id="type"></p-dropdown>
                </div>
                <div class="field">
                    <label for="email">Age Range</label>
                    <p-dropdown id="type"></p-dropdown>
                </div>
                <div class="field">
                    <label for="email">Student Limit</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon"
                            ><i class="pi pi-users"></i
                        ></span>
                        <input id="studentLimit" type="number" pInputText />
                    </div>
                </div>
                <div class="field">
                    <label for="email">Location</label>
                    <p-dropdown id="location"></p-dropdown>
                </div>
                <div class="field">
                    <label for="cost">Cost Per Student</label>
                    <input name="cost" type="text" pInputText />
                    <p-slider
                        name="cost"
                        [step]="10"
                        [min]="160"
                        [max]="200"
                    ></p-slider>
                </div>
                <div class="field">
                    <label for="email">Teacher(s)</label>
                    <p-dropdown id="teachers"></p-dropdown>
                </div>
            </div>
        </form>`,
})
export class ClassFormComponent {
    public isUnitsPanelVisible$ = new Subject<boolean>();
    public categories = [
        {
            name: 'Medical',
            units: [
                { name: 'Medical I', description: 'The first medical unit' },
                { name: 'Medical II', description: 'The second medical unit' },
            ],
        },
        {
            name: 'Forest',
            units: [
                { name: 'Forest I', description: 'The first forest unit' },
                { name: 'Forest II', description: 'The second medical unit' },
            ],
        },
    ];
}
