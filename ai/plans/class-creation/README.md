# Class Creation Feature

This document tracks the implementation of class creation and editing functionality in the enrollment portal.

## Overview

Enable admins to create and edit classes directly in the enrollment portal, replacing manual Firestore database entry.

## Current State

### Completed (Phase 1)

- [x] `createClass` Firebase function - creates new classes
- [x] `getInstructors` Firebase function - fetches teacher list for dropdown (queries `teachers` collection)
- [x] `getClassesForAdmin` Firebase function - fetches all classes for a semester (including drafts)
- [x] `createSemester` Firebase function - creates new semesters
- [x] `ClassFormComponent` - Angular Material form for class creation
- [x] `AdminClassListComponent` - Table view of classes by semester
- [x] `ClassDetailDialogComponent` - Dialog for viewing class details
- [x] `AddSemesterDialogComponent` - Dialog for creating new semesters
- [x] Routes at `/admin/classes/management` (list) and `/admin/classes/management/create` (form)
- [x] Dashboard link "Manage Classes"
- [x] Semester pre-selection via query parameter when navigating from list to create

### What Was Built

**Backend** (`libs/firebase/enrollment-functions/class-admin/`):
- `create-class.ts` - Admin-only endpoint to create a class in a semester
- `get-instructors.ts` - Admin-only endpoint to fetch non-archived teachers from `teachers` collection
- `get-classes-for-admin.ts` - Admin-only endpoint to fetch all classes (including non-live) for a semester
- `create-semester.ts` - Admin-only endpoint to create a new semester

**Frontend** (`libs/angular/classes/class-management/`):
- `ClassFormComponent` - Full form with sections for:
  - Basic info (semester, name, description, class type)
  - Schedule (dates, weekday, time, location)
  - Enrollment settings (grade range, max students)
  - Pricing (cost, optional sliding scale)
  - Instructors (multi-select from teachers collection)
  - Visibility (live, information-only toggles)
- `AdminClassListComponent` - Table view with:
  - Semester selector dropdown
  - "Add Semester" button with dialog
  - Class table (status, name, type, schedule, instructors, enrollment, cost)
  - View and Edit action buttons
  - Summary stats (total classes, live count, enrolled count)
- `ClassDetailDialogComponent` - Read-only view of all class fields
- `AddSemesterDialogComponent` - Simple form to create new semesters

**Access**:
- URL: `/admin/classes/management` - Class list (default)
- URL: `/admin/classes/management/create` - Create form
- URL: `/admin/classes/management/create?semesterId=xyz` - Create form with pre-selected semester
- Requires admin role
- Link in admin dashboard Quick Navigation

## Data Model

### SemesterClass (Domain Model)

**Reference**: `libs/ts/classes/classes-domain/src/lib/models/semester-class.ts`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Class name |
| `description` | string | Yes | Class description |
| `classType` | string | Yes | Type of class |
| `gradeRangeStart` | number | Yes | Minimum grade level |
| `gradeRangeEnd` | number | Yes | Maximum grade level |
| `cost` | number | Yes | Base price |
| `paymentRange` | {lowest, highest} | No | Sliding scale range |
| `location` | string | Yes | Where class meets |
| `instructors` | Array<{firstName, lastName}> | Yes | Teachers |
| `weekday` | string | Yes | Day of week |
| `dailyTimes` | string | Yes | Time(s) of day |
| `startMs` | number | Yes | Class start date |
| `endMs` | number | Yes | Class end date |
| `registrationEndMs` | number | Yes | Registration deadline |
| `live` | boolean | Yes | Whether visible |
| `pausedForEnrollment` | boolean | Yes | Pause without hiding |
| `forInformationOnly` | boolean | Yes | Display-only |
| `thumbnailUrl` | string | No | Class image |
| `unitIds` | Array<string> | No | Educational units |
| `additionalOptions` | Array | No | Add-on options |

### ClassDbo (Database Object)

**Reference**: `libs/firebase/classes/class-repository/src/lib/class.repository.ts:7-37`

Uses snake_case field names and Firestore references for instructors, students, and units.

## Implementation Plan

### Phase 1: Basic Class Creation ✅ COMPLETE

1. **Backend**
   - [x] Create `createClass` Firebase function
   - [x] Create `getInstructors` Firebase function (for dropdown)

2. **Frontend**
   - [x] Create basic class form component (Angular Material)
   - [x] Add route under admin section
   - [x] Connect form to backend

### Phase 2: Class Editing

- [ ] Create `updateClass` Firebase function
- [ ] Create `getClassForEdit` Firebase function
- [ ] Update form to support edit mode (route exists: `/admin/classes/management/edit/:id`)

### Phase 3: Enhanced Features

- [ ] Duplicate class functionality
- [ ] Class groups management
- [ ] Additional options management
- [ ] Bulk operations

### Phase 4: Reference Data Management

- [ ] Locations management (currently hardcoded)
- [ ] Class types management (currently hardcoded)
- [ ] Instructor management (add new inline)

## Key Files

### Backend
- `libs/firebase/enrollment-functions/class-admin/src/lib/create-class.ts`
- `libs/firebase/enrollment-functions/class-admin/src/lib/get-instructors.ts`
- `libs/firebase/enrollment-functions/class-admin/src/lib/get-classes-for-admin.ts`
- `libs/firebase/enrollment-functions/class-admin/src/lib/create-semester.ts`
- `libs/firebase/enrollment-functions/class-admin/src/index.ts`

### Frontend
- `libs/angular/classes/class-management/src/lib/components/class-form/class-form.component.ts`
- `libs/angular/classes/class-management/src/lib/components/class-list/class-list.component.ts`
- `libs/angular/classes/class-management/src/lib/components/class-list/class-detail-dialog.component.ts`
- `libs/angular/classes/class-management/src/lib/components/class-list/add-semester-dialog.component.ts`
- `libs/angular/classes/class-management/src/lib/class-management-routes.ts`

### Registration
- `apps/functions/src/functions/index.ts` - exports createClass, getInstructors, getClassesForAdmin, createSemester
- `tsconfig.base.json` - path mapping for @sol/firebase/enrollment-functions/class-admin

### Shared
- `libs/ts/classes/classes-domain/src/lib/models/semester-class.ts`
- `libs/firebase/classes/class-repository/src/lib/class.repository.ts`

## UX Guardrails

1. Require semester selection before creating class
2. Validate required fields with clear error messages
3. Date validation (end > start, registration <= start) - TODO: add validation
4. Warn before changes that affect enrolled students
5. Confirm destructive actions

## Reference Patterns

- Admin auth: `libs/firebase/functions/src/lib/utilities/auth.utility.ts`
- Function builder: `libs/firebase/functions/src/lib/utilities/functions.utility.ts`
- Form patterns: `apps/enrollment-portal/src/app/donate-full.component.ts`
- Validation: `libs/angular/classes/class-enrollment/src/lib/components/info/info.component.ts`

## Notes

### Data Model Discovery

The codebase uses a `teachers` collection (not `instructors`) for storing teacher/instructor data. Classes store document references to `teachers/{id}`. The teachers collection has fields:
- `first_name`: string
- `last_name`: string
- `archived`: boolean (optional)

### Hardcoded Values (Phase 4 will address)

The following are currently hardcoded in the form component:
- Class types: Homeschool, Afterschool, Weekend, Camp, Workshop, Special Event
- Locations: Farm, Forest, Mountain, Stream, Garden, Classroom
- Weekdays: Monday-Sunday

### Future Considerations

- Unit assignment (checkboxes for educational units)
- Thumbnail image upload
- Additional options (add-ons with costs)
- Class duplication for new semesters
- Batch creation tools
