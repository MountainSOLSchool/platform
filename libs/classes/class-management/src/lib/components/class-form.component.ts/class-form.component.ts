import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<h2>Create a Class</h2>
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
                    <input
                        name="cost"
                        type="text"
                        pInputText
                        [(ngModel)]="val2"
                    />
                    <p-slider
                        name="cost"
                        [(ngModel)]="val2"
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
    public val2 = 180;
}
