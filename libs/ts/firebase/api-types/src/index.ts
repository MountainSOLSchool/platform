// Class Management
export type {
    AdditionalOptionInput,
    CreateClassRequest,
    CreateClassResponse,
    UpdateClassRequest,
    UpdateClassResponse,
    UploadClassImageRequest,
    UploadClassImageResponse,
} from './lib/class-management.types';

// Semester Info Panel
export type {
    AdditionalInfoPanel,
    GetSemesterInfoPanelRequest,
    GetSemesterInfoPanelResponse,
    UpdateSemesterInfoPanelRequest,
    UpdateSemesterInfoPanelResponse,
} from './lib/semester-info-panel.types';

// Medic Class Management
export type {
    CreateMedicClassRequest,
    CreateMedicClassResponse,
    UpdateMedicClassRequest,
    UpdateMedicClassResponse,
    GetMedicClassesResponse,
    GetMedicClassesAdminResponse,
    MedicEnrollRequest,
    MedicEnrollResponse,
    GetMedicEnrollmentsRequest,
    GetMedicEnrollmentsResponse,
} from './lib/medic.types';

// Discount Management
export type {
    DiscountType,
    DiscountAdmin,
    GetDiscountsResponse,
    CreateDiscountRequest,
    CreateDiscountResponse,
    UpdateDiscountRequest,
    UpdateDiscountResponse,
    DeleteDiscountRequest,
    DeleteDiscountResponse,
    GetDiscountRequest,
    GetDiscountResponse,
} from './lib/discount.types';

// Enrollment Messages
export type {
    EnrollmentMessageSeverity,
    EnrollmentMessage,
    GetEnrollmentMessagesResponse,
    GetEnrollmentMessagesAdminResponse,
    UpdateEnrollmentMessagesRequest,
    UpdateEnrollmentMessagesResponse,
} from './lib/enrollment-message.types';
