'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [775],
    {
        8775: (xi, et, Z) => {
            Z.r(et);
            var o = Z(5861),
                _e = Z(3942),
                d = Z(2090),
                V = Z(9681),
                De = Z(655),
                tt = Z(1877),
                xe = Z(4859);
            const Ir = function rt() {
                    return {
                        'admin-restricted-operation':
                            'This operation is restricted to administrators only.',
                        'argument-error': '',
                        'app-not-authorized':
                            "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
                        'app-not-installed':
                            'The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.',
                        'captcha-check-failed':
                            'The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.',
                        'code-expired':
                            'The SMS code has expired. Please re-send the verification code to try again.',
                        'cordova-not-ready': 'Cordova framework is not ready.',
                        'cors-unsupported': 'This browser is not supported.',
                        'credential-already-in-use':
                            'This credential is already associated with a different user account.',
                        'custom-token-mismatch':
                            'The custom token corresponds to a different audience.',
                        'requires-recent-login':
                            'This operation is sensitive and requires recent authentication. Log in again before retrying this request.',
                        'dependent-sdk-initialized-before-auth':
                            'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
                        'dynamic-link-not-activated':
                            'Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.',
                        'email-change-needs-verification':
                            'Multi-factor users must always have a verified email.',
                        'email-already-in-use':
                            'The email address is already in use by another account.',
                        'emulator-config-failed':
                            'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',
                        'expired-action-code': 'The action code has expired.',
                        'cancelled-popup-request':
                            'This operation has been cancelled due to another conflicting popup being opened.',
                        'internal-error': 'An internal AuthError has occurred.',
                        'invalid-app-credential':
                            'The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.',
                        'invalid-app-id':
                            'The mobile app identifier is not registed for the current project.',
                        'invalid-user-token':
                            "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
                        'invalid-auth-event':
                            'An internal AuthError has occurred.',
                        'invalid-verification-code':
                            'The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.',
                        'invalid-continue-uri':
                            'The continue URL provided in the request is invalid.',
                        'invalid-cordova-configuration':
                            'The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.',
                        'invalid-custom-token':
                            'The custom token format is incorrect. Please check the documentation.',
                        'invalid-dynamic-link-domain':
                            'The provided dynamic link domain is not configured or authorized for the current project.',
                        'invalid-email':
                            'The email address is badly formatted.',
                        'invalid-emulator-scheme':
                            'Emulator URL must start with a valid scheme (http:// or https://).',
                        'invalid-api-key':
                            'Your API key is invalid, please check you have copied it correctly.',
                        'invalid-cert-hash':
                            'The SHA-1 certificate hash provided is invalid.',
                        'invalid-credential':
                            'The supplied auth credential is malformed or has expired.',
                        'invalid-message-payload':
                            'The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.',
                        'invalid-multi-factor-session':
                            'The request does not contain a valid proof of first factor successful sign-in.',
                        'invalid-oauth-provider':
                            'EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.',
                        'invalid-oauth-client-id':
                            'The OAuth client ID provided is either invalid or does not match the specified API key.',
                        'unauthorized-domain':
                            'This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.',
                        'invalid-action-code':
                            'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
                        'wrong-password':
                            'The password is invalid or the user does not have a password.',
                        'invalid-persistence-type':
                            'The specified persistence type is invalid. It can only be local, session or none.',
                        'invalid-phone-number':
                            'The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].',
                        'invalid-provider-id':
                            'The specified provider ID is invalid.',
                        'invalid-recipient-email':
                            'The email corresponding to this action failed to send as the provided recipient email address is invalid.',
                        'invalid-sender':
                            'The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.',
                        'invalid-verification-id':
                            'The verification ID used to create the phone auth credential is invalid.',
                        'invalid-tenant-id':
                            "The Auth instance's tenant ID is invalid.",
                        'login-blocked':
                            'Login blocked by user-provided method: {$originalMessage}',
                        'missing-android-pkg-name':
                            'An Android Package Name must be provided if the Android App is required to be installed.',
                        'auth-domain-config-required':
                            'Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.',
                        'missing-app-credential':
                            'The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.',
                        'missing-verification-code':
                            'The phone auth credential was created with an empty SMS verification code.',
                        'missing-continue-uri':
                            'A continue URL must be provided in the request.',
                        'missing-iframe-start':
                            'An internal AuthError has occurred.',
                        'missing-ios-bundle-id':
                            'An iOS Bundle ID must be provided if an App Store ID is provided.',
                        'missing-or-invalid-nonce':
                            'The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.',
                        'missing-multi-factor-info':
                            'No second factor identifier is provided.',
                        'missing-multi-factor-session':
                            'The request is missing proof of first factor successful sign-in.',
                        'missing-phone-number':
                            'To send verification codes, provide a phone number for the recipient.',
                        'missing-verification-id':
                            'The phone auth credential was created with an empty verification ID.',
                        'app-deleted':
                            'This instance of FirebaseApp has been deleted.',
                        'multi-factor-info-not-found':
                            'The user does not have a second factor matching the identifier provided.',
                        'multi-factor-auth-required':
                            'Proof of ownership of a second factor is required to complete sign-in.',
                        'account-exists-with-different-credential':
                            'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
                        'network-request-failed':
                            'A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.',
                        'no-auth-event': 'An internal AuthError has occurred.',
                        'no-such-provider':
                            'User was not linked to an account with the given provider.',
                        'null-user':
                            'A null user object was provided as the argument for an operation which requires a non-null user object.',
                        'operation-not-allowed':
                            'The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.',
                        'operation-not-supported-in-this-environment':
                            'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
                        'popup-blocked':
                            'Unable to establish a connection with the popup. It may have been blocked by the browser.',
                        'popup-closed-by-user':
                            'The popup has been closed by the user before finalizing the operation.',
                        'provider-already-linked':
                            'User can only be linked to one identity for the given provider.',
                        'quota-exceeded':
                            "The project's quota for this operation has been exceeded.",
                        'redirect-cancelled-by-user':
                            'The redirect operation has been cancelled by the user before finalizing.',
                        'redirect-operation-pending':
                            'A redirect sign-in operation is already pending.',
                        'rejected-credential':
                            'The request contains malformed or mismatching credentials.',
                        'second-factor-already-in-use':
                            'The second factor is already enrolled on this account.',
                        'maximum-second-factor-count-exceeded':
                            'The maximum allowed number of second factors on a user has been exceeded.',
                        'tenant-id-mismatch':
                            "The provided tenant ID does not match the Auth instance's tenant ID",
                        timeout: 'The operation has timed out.',
                        'user-token-expired':
                            "The user's credential is no longer valid. The user must sign in again.",
                        'too-many-requests':
                            'We have blocked all requests from this device due to unusual activity. Try again later.',
                        'unauthorized-continue-uri':
                            'The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.',
                        'unsupported-first-factor':
                            'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.',
                        'unsupported-persistence-type':
                            'The current environment does not support the specified persistence type.',
                        'unsupported-tenant-operation':
                            'This operation is not supported in a multi-tenant context.',
                        'unverified-email':
                            'The operation requires a verified email.',
                        'user-cancelled':
                            'The user did not grant your application the permissions it requested.',
                        'user-not-found':
                            'There is no user record corresponding to this identifier. The user may have been deleted.',
                        'user-disabled':
                            'The user account has been disabled by an administrator.',
                        'user-mismatch':
                            'The supplied credentials do not correspond to the previously signed in user.',
                        'user-signed-out': '',
                        'weak-password':
                            'The password must be 6 characters long or more.',
                        'web-storage-unsupported':
                            'This browser is not supported or 3rd party cookies and data may be disabled.',
                        'already-initialized':
                            'initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.',
                    };
                },
                st = function it() {
                    return {
                        'dependent-sdk-initialized-before-auth':
                            'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
                    };
                },
                X = new d.LL('auth', 'Firebase', {
                    'dependent-sdk-initialized-before-auth':
                        'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
                }),
                ot = new tt.Yd('@firebase/auth');
            function ge(n, ...e) {
                ot.logLevel <= tt.in.ERROR &&
                    ot.error(`Auth (${V.SDK_VERSION}): ${n}`, ...e);
            }
            function k(n, ...e) {
                throw ve(n, ...e);
            }
            function b(n, ...e) {
                return ve(n, ...e);
            }
            function at(n, e, t) {
                const r = Object.assign(Object.assign({}, st()), { [e]: t });
                return new d.LL('auth', 'Firebase', r).create(e, {
                    appName: n.name,
                });
            }
            function Q(n, e, t) {
                if (!(e instanceof t))
                    throw (
                        (t.name !== e.constructor.name &&
                            k(n, 'argument-error'),
                        at(
                            n,
                            'argument-error',
                            `Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`
                        ))
                    );
            }
            function ve(n, ...e) {
                if ('string' != typeof n) {
                    const t = e[0],
                        r = [...e.slice(1)];
                    return (
                        r[0] && (r[0].appName = n.name),
                        n._errorFactory.create(t, ...r)
                    );
                }
                return X.create(n, ...e);
            }
            function p(n, e, ...t) {
                if (!n) throw ve(e, ...t);
            }
            function c(n) {
                const e = 'INTERNAL ASSERTION FAILED: ' + n;
                throw (ge(e), new Error(e));
            }
            function l(n, e) {
                n || c(e);
            }
            const f = new Map();
            function h(n) {
                l(n instanceof Function, 'Expected a class definition');
                let e = f.get(n);
                return e
                    ? (l(
                          e instanceof n,
                          'Instance stored in cache mismatched with class'
                      ),
                      e)
                    : ((e = new n()), f.set(n, e), e);
            }
            function E() {
                var n;
                return (
                    ('undefined' != typeof self &&
                        (null === (n = self.location) || void 0 === n
                            ? void 0
                            : n.href)) ||
                    ''
                );
            }
            function R() {
                return 'http:' === x() || 'https:' === x();
            }
            function x() {
                var n;
                return (
                    ('undefined' != typeof self &&
                        (null === (n = self.location) || void 0 === n
                            ? void 0
                            : n.protocol)) ||
                    null
                );
            }
            class M {
                constructor(e, t) {
                    (this.shortDelay = e),
                        (this.longDelay = t),
                        l(t > e, 'Short delay should be less than long delay!'),
                        (this.isMobile = (0, d.uI)() || (0, d.b$)());
                }
                get() {
                    return (function T() {
                        return (
                            !(
                                'undefined' != typeof navigator &&
                                navigator &&
                                'onLine' in navigator &&
                                'boolean' == typeof navigator.onLine &&
                                (R() ||
                                    (0, d.ru)() ||
                                    'connection' in navigator)
                            ) || navigator.onLine
                        );
                    })()
                        ? this.isMobile
                            ? this.longDelay
                            : this.shortDelay
                        : Math.min(5e3, this.shortDelay);
                }
            }
            function A(n, e) {
                l(n.emulator, 'Emulator should always be set here');
                const { url: t } = n.emulator;
                return e ? `${t}${e.startsWith('/') ? e.slice(1) : e}` : t;
            }
            class z {
                static initialize(e, t, r) {
                    (this.fetchImpl = e),
                        t && (this.headersImpl = t),
                        r && (this.responseImpl = r);
                }
                static fetch() {
                    return this.fetchImpl
                        ? this.fetchImpl
                        : 'undefined' != typeof self && 'fetch' in self
                        ? self.fetch
                        : void c(
                              'Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
                          );
                }
                static headers() {
                    return this.headersImpl
                        ? this.headersImpl
                        : 'undefined' != typeof self && 'Headers' in self
                        ? self.Headers
                        : void c(
                              'Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
                          );
                }
                static response() {
                    return this.responseImpl
                        ? this.responseImpl
                        : 'undefined' != typeof self && 'Response' in self
                        ? self.Response
                        : void c(
                              'Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
                          );
                }
            }
            const Ie = {
                    CREDENTIAL_MISMATCH: 'custom-token-mismatch',
                    MISSING_CUSTOM_TOKEN: 'internal-error',
                    INVALID_IDENTIFIER: 'invalid-email',
                    MISSING_CONTINUE_URI: 'internal-error',
                    INVALID_PASSWORD: 'wrong-password',
                    MISSING_PASSWORD: 'internal-error',
                    EMAIL_EXISTS: 'email-already-in-use',
                    PASSWORD_LOGIN_DISABLED: 'operation-not-allowed',
                    INVALID_IDP_RESPONSE: 'invalid-credential',
                    INVALID_PENDING_TOKEN: 'invalid-credential',
                    FEDERATED_USER_ID_ALREADY_LINKED:
                        'credential-already-in-use',
                    MISSING_REQ_TYPE: 'internal-error',
                    EMAIL_NOT_FOUND: 'user-not-found',
                    RESET_PASSWORD_EXCEED_LIMIT: 'too-many-requests',
                    EXPIRED_OOB_CODE: 'expired-action-code',
                    INVALID_OOB_CODE: 'invalid-action-code',
                    MISSING_OOB_CODE: 'internal-error',
                    CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'requires-recent-login',
                    INVALID_ID_TOKEN: 'invalid-user-token',
                    TOKEN_EXPIRED: 'user-token-expired',
                    USER_NOT_FOUND: 'user-token-expired',
                    TOO_MANY_ATTEMPTS_TRY_LATER: 'too-many-requests',
                    INVALID_CODE: 'invalid-verification-code',
                    INVALID_SESSION_INFO: 'invalid-verification-id',
                    INVALID_TEMPORARY_PROOF: 'invalid-credential',
                    MISSING_SESSION_INFO: 'missing-verification-id',
                    SESSION_EXPIRED: 'code-expired',
                    MISSING_ANDROID_PACKAGE_NAME: 'missing-android-pkg-name',
                    UNAUTHORIZED_DOMAIN: 'unauthorized-continue-uri',
                    INVALID_OAUTH_CLIENT_ID: 'invalid-oauth-client-id',
                    ADMIN_ONLY_OPERATION: 'admin-restricted-operation',
                    INVALID_MFA_PENDING_CREDENTIAL:
                        'invalid-multi-factor-session',
                    MFA_ENROLLMENT_NOT_FOUND: 'multi-factor-info-not-found',
                    MISSING_MFA_ENROLLMENT_ID: 'missing-multi-factor-info',
                    MISSING_MFA_PENDING_CREDENTIAL:
                        'missing-multi-factor-session',
                    SECOND_FACTOR_EXISTS: 'second-factor-already-in-use',
                    SECOND_FACTOR_LIMIT_EXCEEDED:
                        'maximum-second-factor-count-exceeded',
                    BLOCKING_FUNCTION_ERROR_RESPONSE: 'internal-error',
                },
                ut = new M(3e4, 6e4);
            function S(n, e) {
                return n.tenantId && !e.tenantId
                    ? Object.assign(Object.assign({}, e), {
                          tenantId: n.tenantId,
                      })
                    : e;
            }
            function N(n, e, t, r) {
                return ct.apply(this, arguments);
            }
            function ct() {
                return (ct = (0, o.Z)(function* (n, e, t, r, i = {}) {
                    return yr(
                        n,
                        i,
                        (0, o.Z)(function* () {
                            let s = {},
                                a = {};
                            r &&
                                ('GET' === e
                                    ? (a = r)
                                    : (s = { body: JSON.stringify(r) }));
                            const u = (0, d.xO)(
                                    Object.assign({ key: n.config.apiKey }, a)
                                ).slice(1),
                                m = yield n._getAdditionalHeaders();
                            return (
                                (m['Content-Type'] = 'application/json'),
                                n.languageCode &&
                                    (m['X-Firebase-Locale'] = n.languageCode),
                                z.fetch()(
                                    Er(n, n.config.apiHost, t, u),
                                    Object.assign(
                                        {
                                            method: e,
                                            headers: m,
                                            referrerPolicy: 'no-referrer',
                                        },
                                        s
                                    )
                                )
                            );
                        })
                    );
                })).apply(this, arguments);
            }
            function yr(n, e, t) {
                return lt.apply(this, arguments);
            }
            function lt() {
                return (lt = (0, o.Z)(function* (n, e, t) {
                    n._canInitEmulator = !1;
                    const r = Object.assign(Object.assign({}, Ie), e);
                    try {
                        const i = new Zi(n),
                            s = yield Promise.race([t(), i.promise]);
                        i.clearNetworkTimeout();
                        const a = yield s.json();
                        if ('needConfirmation' in a)
                            throw ye(
                                n,
                                'account-exists-with-different-credential',
                                a
                            );
                        if (s.ok && !('errorMessage' in a)) return a;
                        {
                            const u = s.ok ? a.errorMessage : a.error.message,
                                [m, g] = u.split(' : ');
                            if ('FEDERATED_USER_ID_ALREADY_LINKED' === m)
                                throw ye(n, 'credential-already-in-use', a);
                            if ('EMAIL_EXISTS' === m)
                                throw ye(n, 'email-already-in-use', a);
                            if ('USER_DISABLED' === m)
                                throw ye(n, 'user-disabled', a);
                            const y =
                                r[m] || m.toLowerCase().replace(/[_\s]+/g, '-');
                            if (g) throw at(n, y, g);
                            k(n, y);
                        }
                    } catch (i) {
                        if (i instanceof d.ZR) throw i;
                        k(n, 'network-request-failed');
                    }
                })).apply(this, arguments);
            }
            function G(n, e, t, r) {
                return dt.apply(this, arguments);
            }
            function dt() {
                return (dt = (0, o.Z)(function* (n, e, t, r, i = {}) {
                    const s = yield N(n, e, t, r, i);
                    return (
                        'mfaPendingCredential' in s &&
                            k(n, 'multi-factor-auth-required', {
                                _serverResponse: s,
                            }),
                        s
                    );
                })).apply(this, arguments);
            }
            function Er(n, e, t, r) {
                const i = `${e}${t}?${r}`;
                return n.config.emulator
                    ? A(n.config, i)
                    : `${n.config.apiScheme}://${i}`;
            }
            class Zi {
                constructor(e) {
                    (this.auth = e),
                        (this.timer = null),
                        (this.promise = new Promise((t, r) => {
                            this.timer = setTimeout(
                                () => r(b(this.auth, 'network-request-failed')),
                                ut.get()
                            );
                        }));
                }
                clearNetworkTimeout() {
                    clearTimeout(this.timer);
                }
            }
            function ye(n, e, t) {
                const r = { appName: n.name };
                t.email && (r.email = t.email),
                    t.phoneNumber && (r.phoneNumber = t.phoneNumber);
                const i = b(n, e, r);
                return (i.customData._tokenResponse = t), i;
            }
            function ht() {
                return (ht = (0, o.Z)(function* (n, e) {
                    return N(n, 'POST', '/v1/accounts:delete', e);
                })).apply(this, arguments);
            }
            function Wi(n, e) {
                return ft.apply(this, arguments);
            }
            function ft() {
                return (ft = (0, o.Z)(function* (n, e) {
                    return N(n, 'POST', '/v1/accounts:update', e);
                })).apply(this, arguments);
            }
            function Hi(n, e) {
                return pt.apply(this, arguments);
            }
            function pt() {
                return (pt = (0, o.Z)(function* (n, e) {
                    return N(n, 'POST', '/v1/accounts:lookup', e);
                })).apply(this, arguments);
            }
            function Ee(n) {
                if (n)
                    try {
                        const e = new Date(Number(n));
                        if (!isNaN(e.getTime())) return e.toUTCString();
                    } catch (e) {}
            }
            function mt() {
                return (mt = (0, o.Z)(function* (n, e = !1) {
                    const t = (0, d.m9)(n),
                        r = yield t.getIdToken(e),
                        i = Me(r);
                    p(
                        i && i.exp && i.auth_time && i.iat,
                        t.auth,
                        'internal-error'
                    );
                    const s =
                            'object' == typeof i.firebase ? i.firebase : void 0,
                        a = null == s ? void 0 : s.sign_in_provider;
                    return {
                        claims: i,
                        token: r,
                        authTime: Ee(_t(i.auth_time)),
                        issuedAtTime: Ee(_t(i.iat)),
                        expirationTime: Ee(_t(i.exp)),
                        signInProvider: a || null,
                        signInSecondFactor:
                            (null == s ? void 0 : s.sign_in_second_factor) ||
                            null,
                    };
                })).apply(this, arguments);
            }
            function _t(n) {
                return 1e3 * Number(n);
            }
            function Me(n) {
                const [e, t, r] = n.split('.');
                if (void 0 === e || void 0 === t || void 0 === r)
                    return (
                        ge('JWT malformed, contained fewer than 3 sections'),
                        null
                    );
                try {
                    const i = (0, d.tV)(t);
                    return i
                        ? JSON.parse(i)
                        : (ge('Failed to decode base64 JWT payload'), null);
                } catch (i) {
                    return (
                        ge('Caught error parsing JWT payload as JSON', i), null
                    );
                }
            }
            function q(n, e) {
                return gt.apply(this, arguments);
            }
            function gt() {
                return (gt = (0, o.Z)(function* (n, e, t = !1) {
                    if (t) return e;
                    try {
                        return yield e;
                    } catch (r) {
                        throw (
                            (r instanceof d.ZR &&
                                qi(r) &&
                                n.auth.currentUser === n &&
                                (yield n.auth.signOut()),
                            r)
                        );
                    }
                })).apply(this, arguments);
            }
            function qi({ code: n }) {
                return (
                    'auth/user-disabled' === n ||
                    'auth/user-token-expired' === n
                );
            }
            class ji {
                constructor(e) {
                    (this.user = e),
                        (this.isRunning = !1),
                        (this.timerId = null),
                        (this.errorBackoff = 3e4);
                }
                _start() {
                    this.isRunning || ((this.isRunning = !0), this.schedule());
                }
                _stop() {
                    !this.isRunning ||
                        ((this.isRunning = !1),
                        null !== this.timerId && clearTimeout(this.timerId));
                }
                getInterval(e) {
                    var t;
                    if (e) {
                        const r = this.errorBackoff;
                        return (
                            (this.errorBackoff = Math.min(
                                2 * this.errorBackoff,
                                96e4
                            )),
                            r
                        );
                    }
                    {
                        this.errorBackoff = 3e4;
                        const i =
                            (null !==
                                (t =
                                    this.user.stsTokenManager.expirationTime) &&
                            void 0 !== t
                                ? t
                                : 0) -
                            Date.now() -
                            3e5;
                        return Math.max(0, i);
                    }
                }
                schedule(e = !1) {
                    var t = this;
                    if (!this.isRunning) return;
                    const r = this.getInterval(e);
                    this.timerId = setTimeout(
                        (0, o.Z)(function* () {
                            yield t.iteration();
                        }),
                        r
                    );
                }
                iteration() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        try {
                            yield e.user.getIdToken(!0);
                        } catch (t) {
                            return void (
                                'auth/network-request-failed' === t.code &&
                                e.schedule(!0)
                            );
                        }
                        e.schedule();
                    })();
                }
            }
            class Tr {
                constructor(e, t) {
                    (this.createdAt = e),
                        (this.lastLoginAt = t),
                        this._initializeTime();
                }
                _initializeTime() {
                    (this.lastSignInTime = Ee(this.lastLoginAt)),
                        (this.creationTime = Ee(this.createdAt));
                }
                _copy(e) {
                    (this.createdAt = e.createdAt),
                        (this.lastLoginAt = e.lastLoginAt),
                        this._initializeTime();
                }
                toJSON() {
                    return {
                        createdAt: this.createdAt,
                        lastLoginAt: this.lastLoginAt,
                    };
                }
            }
            function Te(n) {
                return vt.apply(this, arguments);
            }
            function vt() {
                return (vt = (0, o.Z)(function* (n) {
                    var e;
                    const t = n.auth,
                        r = yield n.getIdToken(),
                        i = yield q(n, Hi(t, { idToken: r }));
                    p(null == i ? void 0 : i.users.length, t, 'internal-error');
                    const s = i.users[0];
                    n._notifyReloadListener(s);
                    const a = (
                            null === (e = s.providerUserInfo) || void 0 === e
                                ? void 0
                                : e.length
                        )
                            ? Ki(s.providerUserInfo)
                            : [],
                        u = $i(n.providerData, a),
                        y =
                            !!n.isAnonymous &&
                            !(
                                (n.email && s.passwordHash) ||
                                (null == u ? void 0 : u.length)
                            ),
                        I = {
                            uid: s.localId,
                            displayName: s.displayName || null,
                            photoURL: s.photoUrl || null,
                            email: s.email || null,
                            emailVerified: s.emailVerified || !1,
                            phoneNumber: s.phoneNumber || null,
                            tenantId: s.tenantId || null,
                            providerData: u,
                            metadata: new Tr(s.createdAt, s.lastLoginAt),
                            isAnonymous: y,
                        };
                    Object.assign(n, I);
                })).apply(this, arguments);
            }
            function It() {
                return (It = (0, o.Z)(function* (n) {
                    const e = (0, d.m9)(n);
                    yield Te(e),
                        yield e.auth._persistUserIfCurrent(e),
                        e.auth._notifyListenersIfCurrent(e);
                })).apply(this, arguments);
            }
            function $i(n, e) {
                return [
                    ...n.filter(
                        (r) => !e.some((i) => i.providerId === r.providerId)
                    ),
                    ...e,
                ];
            }
            function Ki(n) {
                return n.map((e) => {
                    var { providerId: t } = e,
                        r = (0, De._T)(e, ['providerId']);
                    return {
                        providerId: t,
                        uid: r.rawId || '',
                        displayName: r.displayName || null,
                        email: r.email || null,
                        phoneNumber: r.phoneNumber || null,
                        photoURL: r.photoUrl || null,
                    };
                });
            }
            function yt() {
                return (yt = (0, o.Z)(function* (n, e) {
                    const t = yield yr(
                        n,
                        {},
                        (0, o.Z)(function* () {
                            const r = (0, d.xO)({
                                    grant_type: 'refresh_token',
                                    refresh_token: e,
                                }).slice(1),
                                { tokenApiHost: i, apiKey: s } = n.config,
                                a = Er(n, i, '/v1/token', `key=${s}`),
                                u = yield n._getAdditionalHeaders();
                            return (
                                (u['Content-Type'] =
                                    'application/x-www-form-urlencoded'),
                                z.fetch()(a, {
                                    method: 'POST',
                                    headers: u,
                                    body: r,
                                })
                            );
                        })
                    );
                    return {
                        accessToken: t.access_token,
                        expiresIn: t.expires_in,
                        refreshToken: t.refresh_token,
                    };
                })).apply(this, arguments);
            }
            class Re {
                constructor() {
                    (this.refreshToken = null),
                        (this.accessToken = null),
                        (this.expirationTime = null);
                }
                get isExpired() {
                    return (
                        !this.expirationTime ||
                        Date.now() > this.expirationTime - 3e4
                    );
                }
                updateFromServerResponse(e) {
                    p(e.idToken, 'internal-error'),
                        p(void 0 !== e.idToken, 'internal-error'),
                        p(void 0 !== e.refreshToken, 'internal-error');
                    const t =
                        'expiresIn' in e && void 0 !== e.expiresIn
                            ? Number(e.expiresIn)
                            : (function Gi(n) {
                                  const e = Me(n);
                                  return (
                                      p(e, 'internal-error'),
                                      p(void 0 !== e.exp, 'internal-error'),
                                      p(void 0 !== e.iat, 'internal-error'),
                                      Number(e.exp) - Number(e.iat)
                                  );
                              })(e.idToken);
                    this.updateTokensAndExpiration(
                        e.idToken,
                        e.refreshToken,
                        t
                    );
                }
                getToken(e, t = !1) {
                    var r = this;
                    return (0, o.Z)(function* () {
                        return (
                            p(
                                !r.accessToken || r.refreshToken,
                                e,
                                'user-token-expired'
                            ),
                            t || !r.accessToken || r.isExpired
                                ? r.refreshToken
                                    ? (yield r.refresh(e, r.refreshToken),
                                      r.accessToken)
                                    : null
                                : r.accessToken
                        );
                    })();
                }
                clearRefreshToken() {
                    this.refreshToken = null;
                }
                refresh(e, t) {
                    var r = this;
                    return (0, o.Z)(function* () {
                        const {
                            accessToken: i,
                            refreshToken: s,
                            expiresIn: a,
                        } = yield (function Ji(n, e) {
                            return yt.apply(this, arguments);
                        })(e, t);
                        r.updateTokensAndExpiration(i, s, Number(a));
                    })();
                }
                updateTokensAndExpiration(e, t, r) {
                    (this.refreshToken = t || null),
                        (this.accessToken = e || null),
                        (this.expirationTime = Date.now() + 1e3 * r);
                }
                static fromJSON(e, t) {
                    const {
                            refreshToken: r,
                            accessToken: i,
                            expirationTime: s,
                        } = t,
                        a = new Re();
                    return (
                        r &&
                            (p('string' == typeof r, 'internal-error', {
                                appName: e,
                            }),
                            (a.refreshToken = r)),
                        i &&
                            (p('string' == typeof i, 'internal-error', {
                                appName: e,
                            }),
                            (a.accessToken = i)),
                        s &&
                            (p('number' == typeof s, 'internal-error', {
                                appName: e,
                            }),
                            (a.expirationTime = s)),
                        a
                    );
                }
                toJSON() {
                    return {
                        refreshToken: this.refreshToken,
                        accessToken: this.accessToken,
                        expirationTime: this.expirationTime,
                    };
                }
                _assign(e) {
                    (this.accessToken = e.accessToken),
                        (this.refreshToken = e.refreshToken),
                        (this.expirationTime = e.expirationTime);
                }
                _clone() {
                    return Object.assign(new Re(), this.toJSON());
                }
                _performRefresh() {
                    return c('not implemented');
                }
            }
            function K(n, e) {
                p('string' == typeof n || void 0 === n, 'internal-error', {
                    appName: e,
                });
            }
            class ee {
                constructor(e) {
                    var { uid: t, auth: r, stsTokenManager: i } = e,
                        s = (0, De._T)(e, ['uid', 'auth', 'stsTokenManager']);
                    (this.providerId = 'firebase'),
                        (this.proactiveRefresh = new ji(this)),
                        (this.reloadUserInfo = null),
                        (this.reloadListener = null),
                        (this.uid = t),
                        (this.auth = r),
                        (this.stsTokenManager = i),
                        (this.accessToken = i.accessToken),
                        (this.displayName = s.displayName || null),
                        (this.email = s.email || null),
                        (this.emailVerified = s.emailVerified || !1),
                        (this.phoneNumber = s.phoneNumber || null),
                        (this.photoURL = s.photoURL || null),
                        (this.isAnonymous = s.isAnonymous || !1),
                        (this.tenantId = s.tenantId || null),
                        (this.providerData = s.providerData
                            ? [...s.providerData]
                            : []),
                        (this.metadata = new Tr(
                            s.createdAt || void 0,
                            s.lastLoginAt || void 0
                        ));
                }
                getIdToken(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        const r = yield q(
                            t,
                            t.stsTokenManager.getToken(t.auth, e)
                        );
                        return (
                            p(r, t.auth, 'internal-error'),
                            t.accessToken !== r &&
                                ((t.accessToken = r),
                                yield t.auth._persistUserIfCurrent(t),
                                t.auth._notifyListenersIfCurrent(t)),
                            r
                        );
                    })();
                }
                getIdTokenResult(e) {
                    return (function zi(n) {
                        return mt.apply(this, arguments);
                    })(this, e);
                }
                reload() {
                    return (function Bi(n) {
                        return It.apply(this, arguments);
                    })(this);
                }
                _assign(e) {
                    this !== e &&
                        (p(this.uid === e.uid, this.auth, 'internal-error'),
                        (this.displayName = e.displayName),
                        (this.photoURL = e.photoURL),
                        (this.email = e.email),
                        (this.emailVerified = e.emailVerified),
                        (this.phoneNumber = e.phoneNumber),
                        (this.isAnonymous = e.isAnonymous),
                        (this.tenantId = e.tenantId),
                        (this.providerData = e.providerData.map((t) =>
                            Object.assign({}, t)
                        )),
                        this.metadata._copy(e.metadata),
                        this.stsTokenManager._assign(e.stsTokenManager));
                }
                _clone(e) {
                    return new ee(
                        Object.assign(Object.assign({}, this), {
                            auth: e,
                            stsTokenManager: this.stsTokenManager._clone(),
                        })
                    );
                }
                _onReload(e) {
                    p(!this.reloadListener, this.auth, 'internal-error'),
                        (this.reloadListener = e),
                        this.reloadUserInfo &&
                            (this._notifyReloadListener(this.reloadUserInfo),
                            (this.reloadUserInfo = null));
                }
                _notifyReloadListener(e) {
                    this.reloadListener
                        ? this.reloadListener(e)
                        : (this.reloadUserInfo = e);
                }
                _startProactiveRefresh() {
                    this.proactiveRefresh._start();
                }
                _stopProactiveRefresh() {
                    this.proactiveRefresh._stop();
                }
                _updateTokensIfNecessary(e, t = !1) {
                    var r = this;
                    return (0, o.Z)(function* () {
                        let i = !1;
                        e.idToken &&
                            e.idToken !== r.stsTokenManager.accessToken &&
                            (r.stsTokenManager.updateFromServerResponse(e),
                            (i = !0)),
                            t && (yield Te(r)),
                            yield r.auth._persistUserIfCurrent(r),
                            i && r.auth._notifyListenersIfCurrent(r);
                    })();
                }
                delete() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        const t = yield e.getIdToken();
                        return (
                            yield q(
                                e,
                                (function Vi(n, e) {
                                    return ht.apply(this, arguments);
                                })(e.auth, { idToken: t })
                            ),
                            e.stsTokenManager.clearRefreshToken(),
                            e.auth.signOut()
                        );
                    })();
                }
                toJSON() {
                    return Object.assign(
                        Object.assign(
                            {
                                uid: this.uid,
                                email: this.email || void 0,
                                emailVerified: this.emailVerified,
                                displayName: this.displayName || void 0,
                                isAnonymous: this.isAnonymous,
                                photoURL: this.photoURL || void 0,
                                phoneNumber: this.phoneNumber || void 0,
                                tenantId: this.tenantId || void 0,
                                providerData: this.providerData.map((e) =>
                                    Object.assign({}, e)
                                ),
                                stsTokenManager: this.stsTokenManager.toJSON(),
                                _redirectEventId: this._redirectEventId,
                            },
                            this.metadata.toJSON()
                        ),
                        {
                            apiKey: this.auth.config.apiKey,
                            appName: this.auth.name,
                        }
                    );
                }
                get refreshToken() {
                    return this.stsTokenManager.refreshToken || '';
                }
                static _fromJSON(e, t) {
                    var r, i, s, a, u, m, g, y;
                    const I =
                            null !== (r = t.displayName) && void 0 !== r
                                ? r
                                : void 0,
                        P = null !== (i = t.email) && void 0 !== i ? i : void 0,
                        F =
                            null !== (s = t.phoneNumber) && void 0 !== s
                                ? s
                                : void 0,
                        Qe =
                            null !== (a = t.photoURL) && void 0 !== a
                                ? a
                                : void 0,
                        Pi =
                            null !== (u = t.tenantId) && void 0 !== u
                                ? u
                                : void 0,
                        mr =
                            null !== (m = t._redirectEventId) && void 0 !== m
                                ? m
                                : void 0,
                        Ni =
                            null !== (g = t.createdAt) && void 0 !== g
                                ? g
                                : void 0,
                        Oi =
                            null !== (y = t.lastLoginAt) && void 0 !== y
                                ? y
                                : void 0,
                        {
                            uid: _r,
                            emailVerified: Ci,
                            isAnonymous: Li,
                            providerData: gr,
                            stsTokenManager: Di,
                        } = t;
                    p(_r && Di, e, 'internal-error');
                    const Ru = Re.fromJSON(this.name, Di);
                    p('string' == typeof _r, e, 'internal-error'),
                        K(I, e.name),
                        K(P, e.name),
                        p('boolean' == typeof Ci, e, 'internal-error'),
                        p('boolean' == typeof Li, e, 'internal-error'),
                        K(F, e.name),
                        K(Qe, e.name),
                        K(Pi, e.name),
                        K(mr, e.name),
                        K(Ni, e.name),
                        K(Oi, e.name);
                    const vr = new ee({
                        uid: _r,
                        auth: e,
                        email: P,
                        emailVerified: Ci,
                        displayName: I,
                        isAnonymous: Li,
                        photoURL: Qe,
                        phoneNumber: F,
                        tenantId: Pi,
                        stsTokenManager: Ru,
                        createdAt: Ni,
                        lastLoginAt: Oi,
                    });
                    return (
                        gr &&
                            Array.isArray(gr) &&
                            (vr.providerData = gr.map((Au) =>
                                Object.assign({}, Au)
                            )),
                        mr && (vr._redirectEventId = mr),
                        vr
                    );
                }
                static _fromIdTokenResponse(e, t, r = !1) {
                    return (0, o.Z)(function* () {
                        const i = new Re();
                        i.updateFromServerResponse(t);
                        const s = new ee({
                            uid: t.localId,
                            auth: e,
                            stsTokenManager: i,
                            isAnonymous: r,
                        });
                        return yield Te(s), s;
                    })();
                }
            }
            const ae = (() => {
                class n {
                    constructor() {
                        (this.type = 'NONE'), (this.storage = {});
                    }
                    _isAvailable() {
                        return (0, o.Z)(function* () {
                            return !0;
                        })();
                    }
                    _set(t, r) {
                        var i = this;
                        return (0, o.Z)(function* () {
                            i.storage[t] = r;
                        })();
                    }
                    _get(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            const i = r.storage[t];
                            return void 0 === i ? null : i;
                        })();
                    }
                    _remove(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            delete r.storage[t];
                        })();
                    }
                    _addListener(t, r) {}
                    _removeListener(t, r) {}
                }
                return (n.type = 'NONE'), n;
            })();
            function te(n, e, t) {
                return `firebase:${n}:${e}:${t}`;
            }
            class ue {
                constructor(e, t, r) {
                    (this.persistence = e), (this.auth = t), (this.userKey = r);
                    const { config: i, name: s } = this.auth;
                    (this.fullUserKey = te(this.userKey, i.apiKey, s)),
                        (this.fullPersistenceKey = te(
                            'persistence',
                            i.apiKey,
                            s
                        )),
                        (this.boundEventHandler = t._onStorageEvent.bind(t)),
                        this.persistence._addListener(
                            this.fullUserKey,
                            this.boundEventHandler
                        );
                }
                setCurrentUser(e) {
                    return this.persistence._set(this.fullUserKey, e.toJSON());
                }
                getCurrentUser() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        const t = yield e.persistence._get(e.fullUserKey);
                        return t ? ee._fromJSON(e.auth, t) : null;
                    })();
                }
                removeCurrentUser() {
                    return this.persistence._remove(this.fullUserKey);
                }
                savePersistenceForRedirect() {
                    return this.persistence._set(
                        this.fullPersistenceKey,
                        this.persistence.type
                    );
                }
                setPersistence(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        if (t.persistence === e) return;
                        const r = yield t.getCurrentUser();
                        return (
                            yield t.removeCurrentUser(),
                            (t.persistence = e),
                            r ? t.setCurrentUser(r) : void 0
                        );
                    })();
                }
                delete() {
                    this.persistence._removeListener(
                        this.fullUserKey,
                        this.boundEventHandler
                    );
                }
                static create(e, t, r = 'authUser') {
                    return (0, o.Z)(function* () {
                        if (!t.length) return new ue(h(ae), e, r);
                        const i = (yield Promise.all(
                            t.map(
                                (function () {
                                    var g = (0, o.Z)(function* (y) {
                                        if (yield y._isAvailable()) return y;
                                    });
                                    return function (y) {
                                        return g.apply(this, arguments);
                                    };
                                })()
                            )
                        )).filter((g) => g);
                        let s = i[0] || h(ae);
                        const a = te(r, e.config.apiKey, e.name);
                        let u = null;
                        for (const g of t)
                            try {
                                const y = yield g._get(a);
                                if (y) {
                                    const I = ee._fromJSON(e, y);
                                    g !== s && (u = I), (s = g);
                                    break;
                                }
                            } catch (y) {}
                        const m = i.filter((g) => g._shouldAllowMigration);
                        return s._shouldAllowMigration && m.length
                            ? ((s = m[0]),
                              u && (yield s._set(a, u.toJSON())),
                              yield Promise.all(
                                  t.map(
                                      (function () {
                                          var g = (0, o.Z)(function* (y) {
                                              if (y !== s)
                                                  try {
                                                      yield y._remove(a);
                                                  } catch (I) {}
                                          });
                                          return function (y) {
                                              return g.apply(this, arguments);
                                          };
                                      })()
                                  )
                              ),
                              new ue(s, e, r))
                            : new ue(s, e, r);
                    })();
                }
            }
            function Rr(n) {
                const e = n.toLowerCase();
                if (
                    e.includes('opera/') ||
                    e.includes('opr/') ||
                    e.includes('opios/')
                )
                    return 'Opera';
                if (br(e)) return 'IEMobile';
                if (e.includes('msie') || e.includes('trident/')) return 'IE';
                if (e.includes('edge/')) return 'Edge';
                if (Ar(e)) return 'Firefox';
                if (e.includes('silk/')) return 'Silk';
                if (Sr(e)) return 'Blackberry';
                if (wr(e)) return 'Webos';
                if (Et(e)) return 'Safari';
                if ((e.includes('chrome/') || kr(e)) && !e.includes('edge/'))
                    return 'Chrome';
                if (Ae(e)) return 'Android';
                {
                    const r = n.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
                    if (2 === (null == r ? void 0 : r.length)) return r[1];
                }
                return 'Other';
            }
            function Ar(n = (0, d.z$)()) {
                return /firefox\//i.test(n);
            }
            function Et(n = (0, d.z$)()) {
                const e = n.toLowerCase();
                return (
                    e.includes('safari/') &&
                    !e.includes('chrome/') &&
                    !e.includes('crios/') &&
                    !e.includes('android')
                );
            }
            function kr(n = (0, d.z$)()) {
                return /crios\//i.test(n);
            }
            function br(n = (0, d.z$)()) {
                return /iemobile/i.test(n);
            }
            function Ae(n = (0, d.z$)()) {
                return /android/i.test(n);
            }
            function Sr(n = (0, d.z$)()) {
                return /blackberry/i.test(n);
            }
            function wr(n = (0, d.z$)()) {
                return /webos/i.test(n);
            }
            function ce(n = (0, d.z$)()) {
                return /iphone|ipad|ipod/i.test(n);
            }
            function Pr(n = (0, d.z$)()) {
                return (
                    ce(n) ||
                    Ae(n) ||
                    wr(n) ||
                    Sr(n) ||
                    /windows phone/i.test(n) ||
                    br(n)
                );
            }
            function Nr(n, e = []) {
                let t;
                switch (n) {
                    case 'Browser':
                        t = Rr((0, d.z$)());
                        break;
                    case 'Worker':
                        t = `${Rr((0, d.z$)())}-${n}`;
                        break;
                    default:
                        t = n;
                }
                const r = e.length ? e.join(',') : 'FirebaseCore-web';
                return `${t}/JsCore/${V.SDK_VERSION}/${r}`;
            }
            class ts {
                constructor(e) {
                    (this.auth = e), (this.queue = []);
                }
                pushCallback(e, t) {
                    const r = (s) =>
                        new Promise((a, u) => {
                            try {
                                a(e(s));
                            } catch (m) {
                                u(m);
                            }
                        });
                    (r.onAbort = t), this.queue.push(r);
                    const i = this.queue.length - 1;
                    return () => {
                        this.queue[i] = () => Promise.resolve();
                    };
                }
                runMiddleware(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        if (t.auth.currentUser === e) return;
                        const r = [];
                        try {
                            for (const i of t.queue)
                                yield i(e), i.onAbort && r.push(i.onAbort);
                        } catch (i) {
                            r.reverse();
                            for (const s of r)
                                try {
                                    s();
                                } catch (a) {}
                            throw t.auth._errorFactory.create('login-blocked', {
                                originalMessage: i.message,
                            });
                        }
                    })();
                }
            }
            class ns {
                constructor(e, t, r) {
                    (this.app = e),
                        (this.heartbeatServiceProvider = t),
                        (this.config = r),
                        (this.currentUser = null),
                        (this.emulatorConfig = null),
                        (this.operations = Promise.resolve()),
                        (this.authStateSubscription = new Or(this)),
                        (this.idTokenSubscription = new Or(this)),
                        (this.beforeStateQueue = new ts(this)),
                        (this.redirectUser = null),
                        (this.isProactiveRefreshEnabled = !1),
                        (this._canInitEmulator = !0),
                        (this._isInitialized = !1),
                        (this._deleted = !1),
                        (this._initializationPromise = null),
                        (this._popupRedirectResolver = null),
                        (this._errorFactory = X),
                        (this.lastNotifiedUid = void 0),
                        (this.languageCode = null),
                        (this.tenantId = null),
                        (this.settings = {
                            appVerificationDisabledForTesting: !1,
                        }),
                        (this.frameworks = []),
                        (this.name = e.name),
                        (this.clientVersion = r.sdkClientVersion);
                }
                _initializeWithPersistence(e, t) {
                    var r = this;
                    return (
                        t && (this._popupRedirectResolver = h(t)),
                        (this._initializationPromise = this.queue(
                            (0, o.Z)(function* () {
                                var i, s;
                                if (
                                    !r._deleted &&
                                    ((r.persistenceManager = yield ue.create(
                                        r,
                                        e
                                    )),
                                    !r._deleted)
                                ) {
                                    if (
                                        null ===
                                            (i = r._popupRedirectResolver) ||
                                        void 0 === i
                                            ? void 0
                                            : i._shouldInitProactively
                                    )
                                        try {
                                            yield r._popupRedirectResolver._initialize(
                                                r
                                            );
                                        } catch (a) {}
                                    yield r.initializeCurrentUser(t),
                                        (r.lastNotifiedUid =
                                            (null === (s = r.currentUser) ||
                                            void 0 === s
                                                ? void 0
                                                : s.uid) || null),
                                        !r._deleted && (r._isInitialized = !0);
                                }
                            })
                        )),
                        this._initializationPromise
                    );
                }
                _onStorageEvent() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        if (e._deleted) return;
                        const t = yield e.assertedPersistence.getCurrentUser();
                        if (e.currentUser || t) {
                            if (
                                e.currentUser &&
                                t &&
                                e.currentUser.uid === t.uid
                            )
                                return (
                                    e._currentUser._assign(t),
                                    void (yield e.currentUser.getIdToken())
                                );
                            yield e._updateCurrentUser(t, !0);
                        }
                    })();
                }
                initializeCurrentUser(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        var r;
                        const i = yield t.assertedPersistence.getCurrentUser();
                        let s = i,
                            a = !1;
                        if (e && t.config.authDomain) {
                            yield t.getOrInitRedirectPersistenceManager();
                            const u =
                                    null === (r = t.redirectUser) ||
                                    void 0 === r
                                        ? void 0
                                        : r._redirectEventId,
                                m = null == s ? void 0 : s._redirectEventId,
                                g = yield t.tryRedirectSignIn(e);
                            (!u || u === m) &&
                                (null == g ? void 0 : g.user) &&
                                ((s = g.user), (a = !0));
                        }
                        if (!s) return t.directlySetCurrentUser(null);
                        if (!s._redirectEventId) {
                            if (a)
                                try {
                                    yield t.beforeStateQueue.runMiddleware(s);
                                } catch (u) {
                                    (s = i),
                                        t._popupRedirectResolver._overrideRedirectResult(
                                            t,
                                            () => Promise.reject(u)
                                        );
                                }
                            return s
                                ? t.reloadAndSetCurrentUserOrClear(s)
                                : t.directlySetCurrentUser(null);
                        }
                        return (
                            p(t._popupRedirectResolver, t, 'argument-error'),
                            yield t.getOrInitRedirectPersistenceManager(),
                            t.redirectUser &&
                            t.redirectUser._redirectEventId ===
                                s._redirectEventId
                                ? t.directlySetCurrentUser(s)
                                : t.reloadAndSetCurrentUserOrClear(s)
                        );
                    })();
                }
                tryRedirectSignIn(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        let r = null;
                        try {
                            r =
                                yield t._popupRedirectResolver._completeRedirectFn(
                                    t,
                                    e,
                                    !0
                                );
                        } catch (i) {
                            yield t._setRedirectUser(null);
                        }
                        return r;
                    })();
                }
                reloadAndSetCurrentUserOrClear(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        try {
                            yield Te(e);
                        } catch (r) {
                            if ('auth/network-request-failed' !== r.code)
                                return t.directlySetCurrentUser(null);
                        }
                        return t.directlySetCurrentUser(e);
                    })();
                }
                useDeviceLanguage() {
                    this.languageCode = (function C() {
                        if ('undefined' == typeof navigator) return null;
                        const n = navigator;
                        return (
                            (n.languages && n.languages[0]) ||
                            n.language ||
                            null
                        );
                    })();
                }
                _delete() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        e._deleted = !0;
                    })();
                }
                updateCurrentUser(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        const r = e ? (0, d.m9)(e) : null;
                        return (
                            r &&
                                p(
                                    r.auth.config.apiKey === t.config.apiKey,
                                    t,
                                    'invalid-user-token'
                                ),
                            t._updateCurrentUser(r && r._clone(t))
                        );
                    })();
                }
                _updateCurrentUser(e, t = !1) {
                    var r = this;
                    return (0, o.Z)(function* () {
                        if (!r._deleted)
                            return (
                                e &&
                                    p(
                                        r.tenantId === e.tenantId,
                                        r,
                                        'tenant-id-mismatch'
                                    ),
                                t ||
                                    (yield r.beforeStateQueue.runMiddleware(e)),
                                r.queue(
                                    (0, o.Z)(function* () {
                                        yield r.directlySetCurrentUser(e),
                                            r.notifyAuthListeners();
                                    })
                                )
                            );
                    })();
                }
                signOut() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        return (
                            yield e.beforeStateQueue.runMiddleware(null),
                            (e.redirectPersistenceManager ||
                                e._popupRedirectResolver) &&
                                (yield e._setRedirectUser(null)),
                            e._updateCurrentUser(null, !0)
                        );
                    })();
                }
                setPersistence(e) {
                    var t = this;
                    return this.queue(
                        (0, o.Z)(function* () {
                            yield t.assertedPersistence.setPersistence(h(e));
                        })
                    );
                }
                _getPersistence() {
                    return this.assertedPersistence.persistence.type;
                }
                _updateErrorMap(e) {
                    this._errorFactory = new d.LL('auth', 'Firebase', e());
                }
                onAuthStateChanged(e, t, r) {
                    return this.registerStateListener(
                        this.authStateSubscription,
                        e,
                        t,
                        r
                    );
                }
                beforeAuthStateChanged(e, t) {
                    return this.beforeStateQueue.pushCallback(e, t);
                }
                onIdTokenChanged(e, t, r) {
                    return this.registerStateListener(
                        this.idTokenSubscription,
                        e,
                        t,
                        r
                    );
                }
                toJSON() {
                    var e;
                    return {
                        apiKey: this.config.apiKey,
                        authDomain: this.config.authDomain,
                        appName: this.name,
                        currentUser:
                            null === (e = this._currentUser) || void 0 === e
                                ? void 0
                                : e.toJSON(),
                    };
                }
                _setRedirectUser(e, t) {
                    var r = this;
                    return (0, o.Z)(function* () {
                        const i = yield r.getOrInitRedirectPersistenceManager(
                            t
                        );
                        return null === e
                            ? i.removeCurrentUser()
                            : i.setCurrentUser(e);
                    })();
                }
                getOrInitRedirectPersistenceManager(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        if (!t.redirectPersistenceManager) {
                            const r = (e && h(e)) || t._popupRedirectResolver;
                            p(r, t, 'argument-error'),
                                (t.redirectPersistenceManager = yield ue.create(
                                    t,
                                    [h(r._redirectPersistence)],
                                    'redirectUser'
                                )),
                                (t.redirectUser =
                                    yield t.redirectPersistenceManager.getCurrentUser());
                        }
                        return t.redirectPersistenceManager;
                    })();
                }
                _redirectUserForId(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        var r, i;
                        return (
                            t._isInitialized &&
                                (yield t.queue((0, o.Z)(function* () {}))),
                            (null === (r = t._currentUser) || void 0 === r
                                ? void 0
                                : r._redirectEventId) === e
                                ? t._currentUser
                                : (null === (i = t.redirectUser) || void 0 === i
                                      ? void 0
                                      : i._redirectEventId) === e
                                ? t.redirectUser
                                : null
                        );
                    })();
                }
                _persistUserIfCurrent(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        if (e === t.currentUser)
                            return t.queue(
                                (0, o.Z)(function* () {
                                    return t.directlySetCurrentUser(e);
                                })
                            );
                    })();
                }
                _notifyListenersIfCurrent(e) {
                    e === this.currentUser && this.notifyAuthListeners();
                }
                _key() {
                    return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
                }
                _startProactiveRefresh() {
                    (this.isProactiveRefreshEnabled = !0),
                        this.currentUser &&
                            this._currentUser._startProactiveRefresh();
                }
                _stopProactiveRefresh() {
                    (this.isProactiveRefreshEnabled = !1),
                        this.currentUser &&
                            this._currentUser._stopProactiveRefresh();
                }
                get _currentUser() {
                    return this.currentUser;
                }
                notifyAuthListeners() {
                    var e, t;
                    if (!this._isInitialized) return;
                    this.idTokenSubscription.next(this.currentUser);
                    const r =
                        null !==
                            (t =
                                null === (e = this.currentUser) || void 0 === e
                                    ? void 0
                                    : e.uid) && void 0 !== t
                            ? t
                            : null;
                    this.lastNotifiedUid !== r &&
                        ((this.lastNotifiedUid = r),
                        this.authStateSubscription.next(this.currentUser));
                }
                registerStateListener(e, t, r, i) {
                    if (this._deleted) return () => {};
                    const s = 'function' == typeof t ? t : t.next.bind(t),
                        a = this._isInitialized
                            ? Promise.resolve()
                            : this._initializationPromise;
                    return (
                        p(a, this, 'internal-error'),
                        a.then(() => s(this.currentUser)),
                        'function' == typeof t
                            ? e.addObserver(t, r, i)
                            : e.addObserver(t)
                    );
                }
                directlySetCurrentUser(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        t.currentUser &&
                            t.currentUser !== e &&
                            (t._currentUser._stopProactiveRefresh(),
                            e &&
                                t.isProactiveRefreshEnabled &&
                                e._startProactiveRefresh()),
                            (t.currentUser = e),
                            e
                                ? yield t.assertedPersistence.setCurrentUser(e)
                                : yield t.assertedPersistence.removeCurrentUser();
                    })();
                }
                queue(e) {
                    return (
                        (this.operations = this.operations.then(e, e)),
                        this.operations
                    );
                }
                get assertedPersistence() {
                    return (
                        p(this.persistenceManager, this, 'internal-error'),
                        this.persistenceManager
                    );
                }
                _logFramework(e) {
                    !e ||
                        this.frameworks.includes(e) ||
                        (this.frameworks.push(e),
                        this.frameworks.sort(),
                        (this.clientVersion = Nr(
                            this.config.clientPlatform,
                            this._getFrameworks()
                        )));
                }
                _getFrameworks() {
                    return this.frameworks;
                }
                _getAdditionalHeaders() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        var t;
                        const r = { 'X-Client-Version': e.clientVersion };
                        e.app.options.appId &&
                            (r['X-Firebase-gmpid'] = e.app.options.appId);
                        const i = yield null ===
                            (t = e.heartbeatServiceProvider.getImmediate({
                                optional: !0,
                            })) || void 0 === t
                            ? void 0
                            : t.getHeartbeatsHeader();
                        return i && (r['X-Firebase-Client'] = i), r;
                    })();
                }
            }
            function O(n) {
                return (0, d.m9)(n);
            }
            class Or {
                constructor(e) {
                    (this.auth = e),
                        (this.observer = null),
                        (this.addObserver = (0, d.ne)(
                            (t) => (this.observer = t)
                        ));
                }
                get next() {
                    return (
                        p(this.observer, this.auth, 'internal-error'),
                        this.observer.next.bind(this.observer)
                    );
                }
            }
            function Cr(n) {
                const e = n.indexOf(':');
                return e < 0 ? '' : n.substr(0, e + 1);
            }
            function Lr(n) {
                if (!n) return null;
                const e = Number(n);
                return isNaN(e) ? null : e;
            }
            class le {
                constructor(e, t) {
                    (this.providerId = e), (this.signInMethod = t);
                }
                toJSON() {
                    return c('not implemented');
                }
                _getIdTokenResponse(e) {
                    return c('not implemented');
                }
                _linkToIdToken(e, t) {
                    return c('not implemented');
                }
                _getReauthenticationResolver(e) {
                    return c('not implemented');
                }
            }
            function Dr(n, e) {
                return Tt.apply(this, arguments);
            }
            function Tt() {
                return (Tt = (0, o.Z)(function* (n, e) {
                    return N(n, 'POST', '/v1/accounts:resetPassword', S(n, e));
                })).apply(this, arguments);
            }
            function xr(n, e) {
                return Rt.apply(this, arguments);
            }
            function Rt() {
                return (Rt = (0, o.Z)(function* (n, e) {
                    return N(n, 'POST', '/v1/accounts:update', e);
                })).apply(this, arguments);
            }
            function os(n, e) {
                return At.apply(this, arguments);
            }
            function At() {
                return (At = (0, o.Z)(function* (n, e) {
                    return N(n, 'POST', '/v1/accounts:update', S(n, e));
                })).apply(this, arguments);
            }
            function kt() {
                return (kt = (0, o.Z)(function* (n, e) {
                    return G(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPassword',
                        S(n, e)
                    );
                })).apply(this, arguments);
            }
            function Ue(n, e) {
                return bt.apply(this, arguments);
            }
            function bt() {
                return (bt = (0, o.Z)(function* (n, e) {
                    return N(n, 'POST', '/v1/accounts:sendOobCode', S(n, e));
                })).apply(this, arguments);
            }
            function us(n, e) {
                return St.apply(this, arguments);
            }
            function St() {
                return (St = (0, o.Z)(function* (n, e) {
                    return Ue(n, e);
                })).apply(this, arguments);
            }
            function cs(n, e) {
                return wt.apply(this, arguments);
            }
            function wt() {
                return (wt = (0, o.Z)(function* (n, e) {
                    return Ue(n, e);
                })).apply(this, arguments);
            }
            function ls(n, e) {
                return Pt.apply(this, arguments);
            }
            function Pt() {
                return (Pt = (0, o.Z)(function* (n, e) {
                    return Ue(n, e);
                })).apply(this, arguments);
            }
            function ds(n, e) {
                return Nt.apply(this, arguments);
            }
            function Nt() {
                return (Nt = (0, o.Z)(function* (n, e) {
                    return Ue(n, e);
                })).apply(this, arguments);
            }
            function Ot() {
                return (Ot = (0, o.Z)(function* (n, e) {
                    return G(
                        n,
                        'POST',
                        '/v1/accounts:signInWithEmailLink',
                        S(n, e)
                    );
                })).apply(this, arguments);
            }
            function Ct() {
                return (Ct = (0, o.Z)(function* (n, e) {
                    return G(
                        n,
                        'POST',
                        '/v1/accounts:signInWithEmailLink',
                        S(n, e)
                    );
                })).apply(this, arguments);
            }
            class ke extends le {
                constructor(e, t, r, i = null) {
                    super('password', r),
                        (this._email = e),
                        (this._password = t),
                        (this._tenantId = i);
                }
                static _fromEmailAndPassword(e, t) {
                    return new ke(e, t, 'password');
                }
                static _fromEmailAndCode(e, t, r = null) {
                    return new ke(e, t, 'emailLink', r);
                }
                toJSON() {
                    return {
                        email: this._email,
                        password: this._password,
                        signInMethod: this.signInMethod,
                        tenantId: this._tenantId,
                    };
                }
                static fromJSON(e) {
                    const t = 'string' == typeof e ? JSON.parse(e) : e;
                    if (
                        (null == t ? void 0 : t.email) &&
                        (null == t ? void 0 : t.password)
                    ) {
                        if ('password' === t.signInMethod)
                            return this._fromEmailAndPassword(
                                t.email,
                                t.password
                            );
                        if ('emailLink' === t.signInMethod)
                            return this._fromEmailAndCode(
                                t.email,
                                t.password,
                                t.tenantId
                            );
                    }
                    return null;
                }
                _getIdTokenResponse(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        switch (t.signInMethod) {
                            case 'password':
                                return (function as(n, e) {
                                    return kt.apply(this, arguments);
                                })(e, {
                                    returnSecureToken: !0,
                                    email: t._email,
                                    password: t._password,
                                });
                            case 'emailLink':
                                return (function hs(n, e) {
                                    return Ot.apply(this, arguments);
                                })(e, {
                                    email: t._email,
                                    oobCode: t._password,
                                });
                            default:
                                k(e, 'internal-error');
                        }
                    })();
                }
                _linkToIdToken(e, t) {
                    var r = this;
                    return (0, o.Z)(function* () {
                        switch (r.signInMethod) {
                            case 'password':
                                return xr(e, {
                                    idToken: t,
                                    returnSecureToken: !0,
                                    email: r._email,
                                    password: r._password,
                                });
                            case 'emailLink':
                                return (function fs(n, e) {
                                    return Ct.apply(this, arguments);
                                })(e, {
                                    idToken: t,
                                    email: r._email,
                                    oobCode: r._password,
                                });
                            default:
                                k(e, 'internal-error');
                        }
                    })();
                }
                _getReauthenticationResolver(e) {
                    return this._getIdTokenResponse(e);
                }
            }
            function j(n, e) {
                return Lt.apply(this, arguments);
            }
            function Lt() {
                return (Lt = (0, o.Z)(function* (n, e) {
                    return G(n, 'POST', '/v1/accounts:signInWithIdp', S(n, e));
                })).apply(this, arguments);
            }
            class W extends le {
                constructor() {
                    super(...arguments), (this.pendingToken = null);
                }
                static _fromParams(e) {
                    const t = new W(e.providerId, e.signInMethod);
                    return (
                        e.idToken || e.accessToken
                            ? (e.idToken && (t.idToken = e.idToken),
                              e.accessToken && (t.accessToken = e.accessToken),
                              e.nonce && !e.pendingToken && (t.nonce = e.nonce),
                              e.pendingToken &&
                                  (t.pendingToken = e.pendingToken))
                            : e.oauthToken && e.oauthTokenSecret
                            ? ((t.accessToken = e.oauthToken),
                              (t.secret = e.oauthTokenSecret))
                            : k('argument-error'),
                        t
                    );
                }
                toJSON() {
                    return {
                        idToken: this.idToken,
                        accessToken: this.accessToken,
                        secret: this.secret,
                        nonce: this.nonce,
                        pendingToken: this.pendingToken,
                        providerId: this.providerId,
                        signInMethod: this.signInMethod,
                    };
                }
                static fromJSON(e) {
                    const t = 'string' == typeof e ? JSON.parse(e) : e,
                        { providerId: r, signInMethod: i } = t,
                        s = (0, De._T)(t, ['providerId', 'signInMethod']);
                    if (!r || !i) return null;
                    const a = new W(r, i);
                    return (
                        (a.idToken = s.idToken || void 0),
                        (a.accessToken = s.accessToken || void 0),
                        (a.secret = s.secret),
                        (a.nonce = s.nonce),
                        (a.pendingToken = s.pendingToken || null),
                        a
                    );
                }
                _getIdTokenResponse(e) {
                    return j(e, this.buildRequest());
                }
                _linkToIdToken(e, t) {
                    const r = this.buildRequest();
                    return (r.idToken = t), j(e, r);
                }
                _getReauthenticationResolver(e) {
                    const t = this.buildRequest();
                    return (t.autoCreate = !1), j(e, t);
                }
                buildRequest() {
                    const e = {
                        requestUri: 'http://localhost',
                        returnSecureToken: !0,
                    };
                    if (this.pendingToken) e.pendingToken = this.pendingToken;
                    else {
                        const t = {};
                        this.idToken && (t.id_token = this.idToken),
                            this.accessToken &&
                                (t.access_token = this.accessToken),
                            this.secret && (t.oauth_token_secret = this.secret),
                            (t.providerId = this.providerId),
                            this.nonce &&
                                !this.pendingToken &&
                                (t.nonce = this.nonce),
                            (e.postBody = (0, d.xO)(t));
                    }
                    return e;
                }
            }
            function ms(n, e) {
                return Dt.apply(this, arguments);
            }
            function Dt() {
                return (Dt = (0, o.Z)(function* (n, e) {
                    return N(
                        n,
                        'POST',
                        '/v1/accounts:sendVerificationCode',
                        S(n, e)
                    );
                })).apply(this, arguments);
            }
            function xt() {
                return (xt = (0, o.Z)(function* (n, e) {
                    return G(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPhoneNumber',
                        S(n, e)
                    );
                })).apply(this, arguments);
            }
            function Mt() {
                return (Mt = (0, o.Z)(function* (n, e) {
                    const t = yield G(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPhoneNumber',
                        S(n, e)
                    );
                    if (t.temporaryProof)
                        throw ye(
                            n,
                            'account-exists-with-different-credential',
                            t
                        );
                    return t;
                })).apply(this, arguments);
            }
            const vs = { USER_NOT_FOUND: 'user-not-found' };
            function Ut() {
                return (Ut = (0, o.Z)(function* (n, e) {
                    return G(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPhoneNumber',
                        S(
                            n,
                            Object.assign(Object.assign({}, e), {
                                operation: 'REAUTH',
                            })
                        ),
                        vs
                    );
                })).apply(this, arguments);
            }
            class ne extends le {
                constructor(e) {
                    super('phone', 'phone'), (this.params = e);
                }
                static _fromVerification(e, t) {
                    return new ne({ verificationId: e, verificationCode: t });
                }
                static _fromTokenResponse(e, t) {
                    return new ne({ phoneNumber: e, temporaryProof: t });
                }
                _getIdTokenResponse(e) {
                    return (function _s(n, e) {
                        return xt.apply(this, arguments);
                    })(e, this._makeVerificationRequest());
                }
                _linkToIdToken(e, t) {
                    return (function gs(n, e) {
                        return Mt.apply(this, arguments);
                    })(
                        e,
                        Object.assign(
                            { idToken: t },
                            this._makeVerificationRequest()
                        )
                    );
                }
                _getReauthenticationResolver(e) {
                    return (function Is(n, e) {
                        return Ut.apply(this, arguments);
                    })(e, this._makeVerificationRequest());
                }
                _makeVerificationRequest() {
                    const {
                        temporaryProof: e,
                        phoneNumber: t,
                        verificationId: r,
                        verificationCode: i,
                    } = this.params;
                    return e && t
                        ? { temporaryProof: e, phoneNumber: t }
                        : { sessionInfo: r, code: i };
                }
                toJSON() {
                    const e = { providerId: this.providerId };
                    return (
                        this.params.phoneNumber &&
                            (e.phoneNumber = this.params.phoneNumber),
                        this.params.temporaryProof &&
                            (e.temporaryProof = this.params.temporaryProof),
                        this.params.verificationCode &&
                            (e.verificationCode = this.params.verificationCode),
                        this.params.verificationId &&
                            (e.verificationId = this.params.verificationId),
                        e
                    );
                }
                static fromJSON(e) {
                    'string' == typeof e && (e = JSON.parse(e));
                    const {
                        verificationId: t,
                        verificationCode: r,
                        phoneNumber: i,
                        temporaryProof: s,
                    } = e;
                    return r || t || i || s
                        ? new ne({
                              verificationId: t,
                              verificationCode: r,
                              phoneNumber: i,
                              temporaryProof: s,
                          })
                        : null;
                }
            }
            class be {
                constructor(e) {
                    var t, r, i, s, a, u;
                    const m = (0, d.zd)((0, d.pd)(e)),
                        g = null !== (t = m.apiKey) && void 0 !== t ? t : null,
                        y = null !== (r = m.oobCode) && void 0 !== r ? r : null,
                        I = (function ys(n) {
                            switch (n) {
                                case 'recoverEmail':
                                    return 'RECOVER_EMAIL';
                                case 'resetPassword':
                                    return 'PASSWORD_RESET';
                                case 'signIn':
                                    return 'EMAIL_SIGNIN';
                                case 'verifyEmail':
                                    return 'VERIFY_EMAIL';
                                case 'verifyAndChangeEmail':
                                    return 'VERIFY_AND_CHANGE_EMAIL';
                                case 'revertSecondFactorAddition':
                                    return 'REVERT_SECOND_FACTOR_ADDITION';
                                default:
                                    return null;
                            }
                        })(null !== (i = m.mode) && void 0 !== i ? i : null);
                    p(g && y && I, 'argument-error'),
                        (this.apiKey = g),
                        (this.operation = I),
                        (this.code = y),
                        (this.continueUrl =
                            null !== (s = m.continueUrl) && void 0 !== s
                                ? s
                                : null),
                        (this.languageCode =
                            null !== (a = m.languageCode) && void 0 !== a
                                ? a
                                : null),
                        (this.tenantId =
                            null !== (u = m.tenantId) && void 0 !== u
                                ? u
                                : null);
                }
                static parseLink(e) {
                    const t = (function Es(n) {
                        const e = (0, d.zd)((0, d.pd)(n)).link,
                            t = e ? (0, d.zd)((0, d.pd)(e)).deep_link_id : null,
                            r = (0, d.zd)((0, d.pd)(n)).deep_link_id;
                        return (
                            (r ? (0, d.zd)((0, d.pd)(r)).link : null) ||
                            r ||
                            t ||
                            e ||
                            n
                        );
                    })(e);
                    try {
                        return new be(t);
                    } catch (r) {
                        return null;
                    }
                }
            }
            let Ft = (() => {
                class n {
                    constructor() {
                        this.providerId = n.PROVIDER_ID;
                    }
                    static credential(t, r) {
                        return ke._fromEmailAndPassword(t, r);
                    }
                    static credentialWithLink(t, r) {
                        const i = be.parseLink(r);
                        return (
                            p(i, 'argument-error'),
                            ke._fromEmailAndCode(t, i.code, i.tenantId)
                        );
                    }
                }
                return (
                    (n.PROVIDER_ID = 'password'),
                    (n.EMAIL_PASSWORD_SIGN_IN_METHOD = 'password'),
                    (n.EMAIL_LINK_SIGN_IN_METHOD = 'emailLink'),
                    n
                );
            })();
            class B {
                constructor(e) {
                    (this.providerId = e),
                        (this.defaultLanguageCode = null),
                        (this.customParameters = {});
                }
                setDefaultLanguage(e) {
                    this.defaultLanguageCode = e;
                }
                setCustomParameters(e) {
                    return (this.customParameters = e), this;
                }
                getCustomParameters() {
                    return this.customParameters;
                }
            }
            class de extends B {
                constructor() {
                    super(...arguments), (this.scopes = []);
                }
                addScope(e) {
                    return this.scopes.includes(e) || this.scopes.push(e), this;
                }
                getScopes() {
                    return [...this.scopes];
                }
            }
            class he extends de {
                static credentialFromJSON(e) {
                    const t = 'string' == typeof e ? JSON.parse(e) : e;
                    return (
                        p(
                            'providerId' in t && 'signInMethod' in t,
                            'argument-error'
                        ),
                        W._fromParams(t)
                    );
                }
                credential(e) {
                    return this._credential(
                        Object.assign(Object.assign({}, e), {
                            nonce: e.rawNonce,
                        })
                    );
                }
                _credential(e) {
                    return (
                        p(e.idToken || e.accessToken, 'argument-error'),
                        W._fromParams(
                            Object.assign(Object.assign({}, e), {
                                providerId: this.providerId,
                                signInMethod: this.providerId,
                            })
                        )
                    );
                }
                static credentialFromResult(e) {
                    return he.oauthCredentialFromTaggedObject(e);
                }
                static credentialFromError(e) {
                    return he.oauthCredentialFromTaggedObject(
                        e.customData || {}
                    );
                }
                static oauthCredentialFromTaggedObject({ _tokenResponse: e }) {
                    if (!e) return null;
                    const {
                        oauthIdToken: t,
                        oauthAccessToken: r,
                        oauthTokenSecret: i,
                        pendingToken: s,
                        nonce: a,
                        providerId: u,
                    } = e;
                    if ((!r && !i && !t && !s) || !u) return null;
                    try {
                        return new he(u)._credential({
                            idToken: t,
                            accessToken: r,
                            nonce: a,
                            pendingToken: s,
                        });
                    } catch (m) {
                        return null;
                    }
                }
            }
            let Mr = (() => {
                    class n extends de {
                        constructor() {
                            super('facebook.com');
                        }
                        static credential(t) {
                            return W._fromParams({
                                providerId: n.PROVIDER_ID,
                                signInMethod: n.FACEBOOK_SIGN_IN_METHOD,
                                accessToken: t,
                            });
                        }
                        static credentialFromResult(t) {
                            return n.credentialFromTaggedObject(t);
                        }
                        static credentialFromError(t) {
                            return n.credentialFromTaggedObject(
                                t.customData || {}
                            );
                        }
                        static credentialFromTaggedObject({
                            _tokenResponse: t,
                        }) {
                            if (
                                !t ||
                                !('oauthAccessToken' in t) ||
                                !t.oauthAccessToken
                            )
                                return null;
                            try {
                                return n.credential(t.oauthAccessToken);
                            } catch (r) {
                                return null;
                            }
                        }
                    }
                    return (
                        (n.FACEBOOK_SIGN_IN_METHOD = 'facebook.com'),
                        (n.PROVIDER_ID = 'facebook.com'),
                        n
                    );
                })(),
                Ur = (() => {
                    class n extends de {
                        constructor() {
                            super('google.com'), this.addScope('profile');
                        }
                        static credential(t, r) {
                            return W._fromParams({
                                providerId: n.PROVIDER_ID,
                                signInMethod: n.GOOGLE_SIGN_IN_METHOD,
                                idToken: t,
                                accessToken: r,
                            });
                        }
                        static credentialFromResult(t) {
                            return n.credentialFromTaggedObject(t);
                        }
                        static credentialFromError(t) {
                            return n.credentialFromTaggedObject(
                                t.customData || {}
                            );
                        }
                        static credentialFromTaggedObject({
                            _tokenResponse: t,
                        }) {
                            if (!t) return null;
                            const { oauthIdToken: r, oauthAccessToken: i } = t;
                            if (!r && !i) return null;
                            try {
                                return n.credential(r, i);
                            } catch (s) {
                                return null;
                            }
                        }
                    }
                    return (
                        (n.GOOGLE_SIGN_IN_METHOD = 'google.com'),
                        (n.PROVIDER_ID = 'google.com'),
                        n
                    );
                })(),
                Fr = (() => {
                    class n extends de {
                        constructor() {
                            super('github.com');
                        }
                        static credential(t) {
                            return W._fromParams({
                                providerId: n.PROVIDER_ID,
                                signInMethod: n.GITHUB_SIGN_IN_METHOD,
                                accessToken: t,
                            });
                        }
                        static credentialFromResult(t) {
                            return n.credentialFromTaggedObject(t);
                        }
                        static credentialFromError(t) {
                            return n.credentialFromTaggedObject(
                                t.customData || {}
                            );
                        }
                        static credentialFromTaggedObject({
                            _tokenResponse: t,
                        }) {
                            if (
                                !t ||
                                !('oauthAccessToken' in t) ||
                                !t.oauthAccessToken
                            )
                                return null;
                            try {
                                return n.credential(t.oauthAccessToken);
                            } catch (r) {
                                return null;
                            }
                        }
                    }
                    return (
                        (n.GITHUB_SIGN_IN_METHOD = 'github.com'),
                        (n.PROVIDER_ID = 'github.com'),
                        n
                    );
                })();
            class fe extends le {
                constructor(e, t) {
                    super(e, e), (this.pendingToken = t);
                }
                _getIdTokenResponse(e) {
                    return j(e, this.buildRequest());
                }
                _linkToIdToken(e, t) {
                    const r = this.buildRequest();
                    return (r.idToken = t), j(e, r);
                }
                _getReauthenticationResolver(e) {
                    const t = this.buildRequest();
                    return (t.autoCreate = !1), j(e, t);
                }
                toJSON() {
                    return {
                        signInMethod: this.signInMethod,
                        providerId: this.providerId,
                        pendingToken: this.pendingToken,
                    };
                }
                static fromJSON(e) {
                    const t = 'string' == typeof e ? JSON.parse(e) : e,
                        { providerId: r, signInMethod: i, pendingToken: s } = t;
                    return r && i && s && r === i ? new fe(r, s) : null;
                }
                static _create(e, t) {
                    return new fe(e, t);
                }
                buildRequest() {
                    return {
                        requestUri: 'http://localhost',
                        returnSecureToken: !0,
                        pendingToken: this.pendingToken,
                    };
                }
            }
            class Fe extends B {
                constructor(e) {
                    p(e.startsWith('saml.'), 'argument-error'), super(e);
                }
                static credentialFromResult(e) {
                    return Fe.samlCredentialFromTaggedObject(e);
                }
                static credentialFromError(e) {
                    return Fe.samlCredentialFromTaggedObject(
                        e.customData || {}
                    );
                }
                static credentialFromJSON(e) {
                    const t = fe.fromJSON(e);
                    return p(t, 'argument-error'), t;
                }
                static samlCredentialFromTaggedObject({ _tokenResponse: e }) {
                    if (!e) return null;
                    const { pendingToken: t, providerId: r } = e;
                    if (!t || !r) return null;
                    try {
                        return fe._create(r, t);
                    } catch (i) {
                        return null;
                    }
                }
            }
            let Zr = (() => {
                class n extends de {
                    constructor() {
                        super('twitter.com');
                    }
                    static credential(t, r) {
                        return W._fromParams({
                            providerId: n.PROVIDER_ID,
                            signInMethod: n.TWITTER_SIGN_IN_METHOD,
                            oauthToken: t,
                            oauthTokenSecret: r,
                        });
                    }
                    static credentialFromResult(t) {
                        return n.credentialFromTaggedObject(t);
                    }
                    static credentialFromError(t) {
                        return n.credentialFromTaggedObject(t.customData || {});
                    }
                    static credentialFromTaggedObject({ _tokenResponse: t }) {
                        if (!t) return null;
                        const { oauthAccessToken: r, oauthTokenSecret: i } = t;
                        if (!r || !i) return null;
                        try {
                            return n.credential(r, i);
                        } catch (s) {
                            return null;
                        }
                    }
                }
                return (
                    (n.TWITTER_SIGN_IN_METHOD = 'twitter.com'),
                    (n.PROVIDER_ID = 'twitter.com'),
                    n
                );
            })();
            function Vr(n, e) {
                return Zt.apply(this, arguments);
            }
            function Zt() {
                return (Zt = (0, o.Z)(function* (n, e) {
                    return G(n, 'POST', '/v1/accounts:signUp', S(n, e));
                })).apply(this, arguments);
            }
            class U {
                constructor(e) {
                    (this.user = e.user),
                        (this.providerId = e.providerId),
                        (this._tokenResponse = e._tokenResponse),
                        (this.operationType = e.operationType);
                }
                static _fromIdTokenResponse(e, t, r, i = !1) {
                    return (0, o.Z)(function* () {
                        const s = yield ee._fromIdTokenResponse(e, r, i),
                            a = Wr(r);
                        return new U({
                            user: s,
                            providerId: a,
                            _tokenResponse: r,
                            operationType: t,
                        });
                    })();
                }
                static _forOperation(e, t, r) {
                    return (0, o.Z)(function* () {
                        yield e._updateTokensIfNecessary(r, !0);
                        const i = Wr(r);
                        return new U({
                            user: e,
                            providerId: i,
                            _tokenResponse: r,
                            operationType: t,
                        });
                    })();
                }
            }
            function Wr(n) {
                return n.providerId
                    ? n.providerId
                    : 'phoneNumber' in n
                    ? 'phone'
                    : null;
            }
            function Vt() {
                return (Vt = (0, o.Z)(function* (n) {
                    var e;
                    const t = O(n);
                    if (
                        (yield t._initializationPromise,
                        null === (e = t.currentUser) || void 0 === e
                            ? void 0
                            : e.isAnonymous)
                    )
                        return new U({
                            user: t.currentUser,
                            providerId: null,
                            operationType: 'signIn',
                        });
                    const r = yield Vr(t, { returnSecureToken: !0 }),
                        i = yield U._fromIdTokenResponse(t, 'signIn', r, !0);
                    return yield t._updateCurrentUser(i.user), i;
                })).apply(this, arguments);
            }
            class Ze extends d.ZR {
                constructor(e, t, r, i) {
                    var s;
                    super(t.code, t.message),
                        (this.operationType = r),
                        (this.user = i),
                        Object.setPrototypeOf(this, Ze.prototype),
                        (this.customData = {
                            appName: e.name,
                            tenantId:
                                null !== (s = e.tenantId) && void 0 !== s
                                    ? s
                                    : void 0,
                            _serverResponse: t.customData._serverResponse,
                            operationType: r,
                        });
                }
                static _fromErrorAndOperation(e, t, r, i) {
                    return new Ze(e, t, r, i);
                }
            }
            function Hr(n, e, t, r) {
                return (
                    'reauthenticate' === e
                        ? t._getReauthenticationResolver(n)
                        : t._getIdTokenResponse(n)
                ).catch((s) => {
                    throw 'auth/multi-factor-auth-required' === s.code
                        ? Ze._fromErrorAndOperation(n, s, e, r)
                        : s;
                });
            }
            function zr(n) {
                return new Set(
                    n.map(({ providerId: e }) => e).filter((e) => !!e)
                );
            }
            function Wt() {
                return (Wt = (0, o.Z)(function* (n, e) {
                    const t = (0, d.m9)(n);
                    yield Ve(!0, t, e);
                    const { providerUserInfo: r } = yield Wi(t.auth, {
                            idToken: yield t.getIdToken(),
                            deleteProvider: [e],
                        }),
                        i = zr(r || []);
                    return (
                        (t.providerData = t.providerData.filter((s) =>
                            i.has(s.providerId)
                        )),
                        i.has('phone') || (t.phoneNumber = null),
                        yield t.auth._persistUserIfCurrent(t),
                        t
                    );
                })).apply(this, arguments);
            }
            function Ht(n, e) {
                return zt.apply(this, arguments);
            }
            function zt() {
                return (zt = (0, o.Z)(function* (n, e, t = !1) {
                    const r = yield q(
                        n,
                        e._linkToIdToken(n.auth, yield n.getIdToken()),
                        t
                    );
                    return U._forOperation(n, 'link', r);
                })).apply(this, arguments);
            }
            function Ve(n, e, t) {
                return Gt.apply(this, arguments);
            }
            function Gt() {
                return (Gt = (0, o.Z)(function* (n, e, t) {
                    yield Te(e);
                    const i =
                        !1 === n
                            ? 'provider-already-linked'
                            : 'no-such-provider';
                    p(zr(e.providerData).has(t) === n, e.auth, i);
                })).apply(this, arguments);
            }
            function Gr(n, e) {
                return qt.apply(this, arguments);
            }
            function qt() {
                return (qt = (0, o.Z)(function* (n, e, t = !1) {
                    const { auth: r } = n,
                        i = 'reauthenticate';
                    try {
                        const s = yield q(n, Hr(r, i, e, n), t);
                        p(s.idToken, r, 'internal-error');
                        const a = Me(s.idToken);
                        p(a, r, 'internal-error');
                        const { sub: u } = a;
                        return (
                            p(n.uid === u, r, 'user-mismatch'),
                            U._forOperation(n, i, s)
                        );
                    } catch (s) {
                        throw (
                            ('auth/user-not-found' ===
                                (null == s ? void 0 : s.code) &&
                                k(r, 'user-mismatch'),
                            s)
                        );
                    }
                })).apply(this, arguments);
            }
            function qr(n, e) {
                return jt.apply(this, arguments);
            }
            function jt() {
                return (jt = (0, o.Z)(function* (n, e, t = !1) {
                    const r = 'signIn',
                        i = yield Hr(n, r, e),
                        s = yield U._fromIdTokenResponse(n, r, i);
                    return t || (yield n._updateCurrentUser(s.user)), s;
                })).apply(this, arguments);
            }
            function We(n, e) {
                return Bt.apply(this, arguments);
            }
            function Bt() {
                return (Bt = (0, o.Z)(function* (n, e) {
                    return qr(O(n), e);
                })).apply(this, arguments);
            }
            function jr(n, e) {
                return $t.apply(this, arguments);
            }
            function $t() {
                return ($t = (0, o.Z)(function* (n, e) {
                    const t = (0, d.m9)(n);
                    return yield Ve(!1, t, e.providerId), Ht(t, e);
                })).apply(this, arguments);
            }
            function Br(n, e) {
                return Kt.apply(this, arguments);
            }
            function Kt() {
                return (Kt = (0, o.Z)(function* (n, e) {
                    return Gr((0, d.m9)(n), e);
                })).apply(this, arguments);
            }
            function bs(n, e) {
                return Jt.apply(this, arguments);
            }
            function Jt() {
                return (Jt = (0, o.Z)(function* (n, e) {
                    return G(
                        n,
                        'POST',
                        '/v1/accounts:signInWithCustomToken',
                        S(n, e)
                    );
                })).apply(this, arguments);
            }
            function Yt() {
                return (Yt = (0, o.Z)(function* (n, e) {
                    const t = O(n),
                        r = yield bs(t, { token: e, returnSecureToken: !0 }),
                        i = yield U._fromIdTokenResponse(t, 'signIn', r);
                    return yield t._updateCurrentUser(i.user), i;
                })).apply(this, arguments);
            }
            class He {
                constructor(e, t) {
                    (this.factorId = e),
                        (this.uid = t.mfaEnrollmentId),
                        (this.enrollmentTime = new Date(
                            t.enrolledAt
                        ).toUTCString()),
                        (this.displayName = t.displayName);
                }
                static _fromServerResponse(e, t) {
                    return 'phoneInfo' in t
                        ? Xt._fromServerResponse(e, t)
                        : k(e, 'internal-error');
                }
            }
            class Xt extends He {
                constructor(e) {
                    super('phone', e), (this.phoneNumber = e.phoneInfo);
                }
                static _fromServerResponse(e, t) {
                    return new Xt(t);
                }
            }
            function ze(n, e, t) {
                var r;
                p(
                    (null === (r = t.url) || void 0 === r ? void 0 : r.length) >
                        0,
                    n,
                    'invalid-continue-uri'
                ),
                    p(
                        void 0 === t.dynamicLinkDomain ||
                            t.dynamicLinkDomain.length > 0,
                        n,
                        'invalid-dynamic-link-domain'
                    ),
                    (e.continueUrl = t.url),
                    (e.dynamicLinkDomain = t.dynamicLinkDomain),
                    (e.canHandleCodeInApp = t.handleCodeInApp),
                    t.iOS &&
                        (p(
                            t.iOS.bundleId.length > 0,
                            n,
                            'missing-ios-bundle-id'
                        ),
                        (e.iOSBundleId = t.iOS.bundleId)),
                    t.android &&
                        (p(
                            t.android.packageName.length > 0,
                            n,
                            'missing-android-pkg-name'
                        ),
                        (e.androidInstallApp = t.android.installApp),
                        (e.androidMinimumVersionCode =
                            t.android.minimumVersion),
                        (e.androidPackageName = t.android.packageName));
            }
            function Qt() {
                return (Qt = (0, o.Z)(function* (n, e, t) {
                    const r = (0, d.m9)(n),
                        i = { requestType: 'PASSWORD_RESET', email: e };
                    t && ze(r, i, t), yield cs(r, i);
                })).apply(this, arguments);
            }
            function en() {
                return (en = (0, o.Z)(function* (n, e, t) {
                    yield Dr((0, d.m9)(n), { oobCode: e, newPassword: t });
                })).apply(this, arguments);
            }
            function tn() {
                return (tn = (0, o.Z)(function* (n, e) {
                    yield os((0, d.m9)(n), { oobCode: e });
                })).apply(this, arguments);
            }
            function $r(n, e) {
                return nn.apply(this, arguments);
            }
            function nn() {
                return (nn = (0, o.Z)(function* (n, e) {
                    const t = (0, d.m9)(n),
                        r = yield Dr(t, { oobCode: e }),
                        i = r.requestType;
                    switch ((p(i, t, 'internal-error'), i)) {
                        case 'EMAIL_SIGNIN':
                            break;
                        case 'VERIFY_AND_CHANGE_EMAIL':
                            p(r.newEmail, t, 'internal-error');
                            break;
                        case 'REVERT_SECOND_FACTOR_ADDITION':
                            p(r.mfaInfo, t, 'internal-error');
                        default:
                            p(r.email, t, 'internal-error');
                    }
                    let s = null;
                    return (
                        r.mfaInfo &&
                            (s = He._fromServerResponse(O(t), r.mfaInfo)),
                        {
                            data: {
                                email:
                                    ('VERIFY_AND_CHANGE_EMAIL' === r.requestType
                                        ? r.newEmail
                                        : r.email) || null,
                                previousEmail:
                                    ('VERIFY_AND_CHANGE_EMAIL' === r.requestType
                                        ? r.email
                                        : r.newEmail) || null,
                                multiFactorInfo: s,
                            },
                            operation: i,
                        }
                    );
                })).apply(this, arguments);
            }
            function rn() {
                return (rn = (0, o.Z)(function* (n, e) {
                    const { data: t } = yield $r((0, d.m9)(n), e);
                    return t.email;
                })).apply(this, arguments);
            }
            function sn() {
                return (sn = (0, o.Z)(function* (n, e, t) {
                    const r = O(n),
                        i = yield Vr(r, {
                            returnSecureToken: !0,
                            email: e,
                            password: t,
                        }),
                        s = yield U._fromIdTokenResponse(r, 'signIn', i);
                    return yield r._updateCurrentUser(s.user), s;
                })).apply(this, arguments);
            }
            function on() {
                return (on = (0, o.Z)(function* (n, e, t) {
                    const r = (0, d.m9)(n),
                        i = { requestType: 'EMAIL_SIGNIN', email: e };
                    p(t.handleCodeInApp, r, 'argument-error'),
                        t && ze(r, i, t),
                        yield ls(r, i);
                })).apply(this, arguments);
            }
            function an() {
                return (an = (0, o.Z)(function* (n, e, t) {
                    const r = (0, d.m9)(n),
                        i = Ft.credentialWithLink(e, t || E());
                    return (
                        p(
                            i._tenantId === (r.tenantId || null),
                            r,
                            'tenant-id-mismatch'
                        ),
                        We(r, i)
                    );
                })).apply(this, arguments);
            }
            function Us(n, e) {
                return un.apply(this, arguments);
            }
            function un() {
                return (un = (0, o.Z)(function* (n, e) {
                    return N(n, 'POST', '/v1/accounts:createAuthUri', S(n, e));
                })).apply(this, arguments);
            }
            function cn() {
                return (cn = (0, o.Z)(function* (n, e) {
                    const r = {
                            identifier: e,
                            continueUri: R() ? E() : 'http://localhost',
                        },
                        { signinMethods: i } = yield Us((0, d.m9)(n), r);
                    return i || [];
                })).apply(this, arguments);
            }
            function ln() {
                return (ln = (0, o.Z)(function* (n, e) {
                    const t = (0, d.m9)(n),
                        i = {
                            requestType: 'VERIFY_EMAIL',
                            idToken: yield n.getIdToken(),
                        };
                    e && ze(t.auth, i, e);
                    const { email: s } = yield us(t.auth, i);
                    s !== n.email && (yield n.reload());
                })).apply(this, arguments);
            }
            function dn() {
                return (dn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, d.m9)(n),
                        s = {
                            requestType: 'VERIFY_AND_CHANGE_EMAIL',
                            idToken: yield n.getIdToken(),
                            newEmail: e,
                        };
                    t && ze(r.auth, s, t);
                    const { email: a } = yield ds(r.auth, s);
                    a !== n.email && (yield n.reload());
                })).apply(this, arguments);
            }
            function Ws(n, e) {
                return hn.apply(this, arguments);
            }
            function hn() {
                return (hn = (0, o.Z)(function* (n, e) {
                    return N(n, 'POST', '/v1/accounts:update', e);
                })).apply(this, arguments);
            }
            function fn() {
                return (fn = (0, o.Z)(function* (
                    n,
                    { displayName: e, photoURL: t }
                ) {
                    if (void 0 === e && void 0 === t) return;
                    const r = (0, d.m9)(n),
                        s = {
                            idToken: yield r.getIdToken(),
                            displayName: e,
                            photoUrl: t,
                            returnSecureToken: !0,
                        },
                        a = yield q(r, Ws(r.auth, s));
                    (r.displayName = a.displayName || null),
                        (r.photoURL = a.photoUrl || null);
                    const u = r.providerData.find(
                        ({ providerId: m }) => 'password' === m
                    );
                    u &&
                        ((u.displayName = r.displayName),
                        (u.photoURL = r.photoURL)),
                        yield r._updateTokensIfNecessary(a);
                })).apply(this, arguments);
            }
            function Kr(n, e, t) {
                return pn.apply(this, arguments);
            }
            function pn() {
                return (pn = (0, o.Z)(function* (n, e, t) {
                    const { auth: r } = n,
                        s = {
                            idToken: yield n.getIdToken(),
                            returnSecureToken: !0,
                        };
                    e && (s.email = e), t && (s.password = t);
                    const a = yield q(n, xr(r, s));
                    yield n._updateTokensIfNecessary(a, !0);
                })).apply(this, arguments);
            }
            class pe {
                constructor(e, t, r = {}) {
                    (this.isNewUser = e),
                        (this.providerId = t),
                        (this.profile = r);
                }
            }
            class Jr extends pe {
                constructor(e, t, r, i) {
                    super(e, t, r), (this.username = i);
                }
            }
            class js extends pe {
                constructor(e, t) {
                    super(e, 'facebook.com', t);
                }
            }
            class Bs extends Jr {
                constructor(e, t) {
                    super(
                        e,
                        'github.com',
                        t,
                        'string' == typeof (null == t ? void 0 : t.login)
                            ? null == t
                                ? void 0
                                : t.login
                            : null
                    );
                }
            }
            class $s extends pe {
                constructor(e, t) {
                    super(e, 'google.com', t);
                }
            }
            class Ks extends Jr {
                constructor(e, t, r) {
                    super(e, 'twitter.com', t, r);
                }
            }
            function Js(n) {
                const { user: e, _tokenResponse: t } = n;
                return e.isAnonymous && !t
                    ? { providerId: null, isNewUser: !1, profile: null }
                    : (function qs(n) {
                          var e, t;
                          if (!n) return null;
                          const { providerId: r } = n,
                              i = n.rawUserInfo
                                  ? JSON.parse(n.rawUserInfo)
                                  : {},
                              s =
                                  n.isNewUser ||
                                  'identitytoolkit#SignupNewUserResponse' ===
                                      n.kind;
                          if (!r && (null == n ? void 0 : n.idToken)) {
                              const a =
                                  null ===
                                      (t =
                                          null === (e = Me(n.idToken)) ||
                                          void 0 === e
                                              ? void 0
                                              : e.firebase) || void 0 === t
                                      ? void 0
                                      : t.sign_in_provider;
                              if (a)
                                  return new pe(
                                      s,
                                      'anonymous' !== a && 'custom' !== a
                                          ? a
                                          : null
                                  );
                          }
                          if (!r) return null;
                          switch (r) {
                              case 'facebook.com':
                                  return new js(s, i);
                              case 'github.com':
                                  return new Bs(s, i);
                              case 'google.com':
                                  return new $s(s, i);
                              case 'twitter.com':
                                  return new Ks(s, i, n.screenName || null);
                              case 'custom':
                              case 'anonymous':
                                  return new pe(s, null);
                              default:
                                  return new pe(s, r, i);
                          }
                      })(t);
            }
            class re {
                constructor(e, t) {
                    (this.type = e), (this.credential = t);
                }
                static _fromIdtoken(e) {
                    return new re('enroll', e);
                }
                static _fromMfaPendingCredential(e) {
                    return new re('signin', e);
                }
                toJSON() {
                    return {
                        multiFactorSession: {
                            ['enroll' === this.type
                                ? 'idToken'
                                : 'pendingCredential']: this.credential,
                        },
                    };
                }
                static fromJSON(e) {
                    var t, r;
                    if (null == e ? void 0 : e.multiFactorSession) {
                        if (
                            null === (t = e.multiFactorSession) || void 0 === t
                                ? void 0
                                : t.pendingCredential
                        )
                            return re._fromMfaPendingCredential(
                                e.multiFactorSession.pendingCredential
                            );
                        if (
                            null === (r = e.multiFactorSession) || void 0 === r
                                ? void 0
                                : r.idToken
                        )
                            return re._fromIdtoken(
                                e.multiFactorSession.idToken
                            );
                    }
                    return null;
                }
            }
            class _n {
                constructor(e, t, r) {
                    (this.session = e),
                        (this.hints = t),
                        (this.signInResolver = r);
                }
                static _fromError(e, t) {
                    const r = O(e),
                        i = t.customData._serverResponse,
                        s = (i.mfaInfo || []).map((u) =>
                            He._fromServerResponse(r, u)
                        );
                    p(i.mfaPendingCredential, r, 'internal-error');
                    const a = re._fromMfaPendingCredential(
                        i.mfaPendingCredential
                    );
                    return new _n(
                        a,
                        s,
                        (function () {
                            var u = (0, o.Z)(function* (m) {
                                const g = yield m._process(r, a);
                                delete i.mfaInfo, delete i.mfaPendingCredential;
                                const y = Object.assign(Object.assign({}, i), {
                                    idToken: g.idToken,
                                    refreshToken: g.refreshToken,
                                });
                                switch (t.operationType) {
                                    case 'signIn':
                                        const I = yield U._fromIdTokenResponse(
                                            r,
                                            t.operationType,
                                            y
                                        );
                                        return (
                                            yield r._updateCurrentUser(I.user),
                                            I
                                        );
                                    case 'reauthenticate':
                                        return (
                                            p(t.user, r, 'internal-error'),
                                            U._forOperation(
                                                t.user,
                                                t.operationType,
                                                y
                                            )
                                        );
                                    default:
                                        k(r, 'internal-error');
                                }
                            });
                            return function (m) {
                                return u.apply(this, arguments);
                            };
                        })()
                    );
                }
                resolveSignIn(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return t.signInResolver(e);
                    })();
                }
            }
            function Xs(n, e) {
                return N(
                    n,
                    'POST',
                    '/v2/accounts/mfaEnrollment:start',
                    S(n, e)
                );
            }
            class gn {
                constructor(e) {
                    (this.user = e),
                        (this.enrolledFactors = []),
                        e._onReload((t) => {
                            t.mfaInfo &&
                                (this.enrolledFactors = t.mfaInfo.map((r) =>
                                    He._fromServerResponse(e.auth, r)
                                ));
                        });
                }
                static _fromUser(e) {
                    return new gn(e);
                }
                getSession() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        return re._fromIdtoken(yield e.user.getIdToken());
                    })();
                }
                enroll(e, t) {
                    var r = this;
                    return (0, o.Z)(function* () {
                        const i = e,
                            s = yield r.getSession(),
                            a = yield q(r.user, i._process(r.user.auth, s, t));
                        return (
                            yield r.user._updateTokensIfNecessary(a),
                            r.user.reload()
                        );
                    })();
                }
                unenroll(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        const r = 'string' == typeof e ? e : e.uid,
                            i = yield t.user.getIdToken(),
                            s = yield q(
                                t.user,
                                (function eo(n, e) {
                                    return N(
                                        n,
                                        'POST',
                                        '/v2/accounts/mfaEnrollment:withdraw',
                                        S(n, e)
                                    );
                                })(t.user.auth, {
                                    idToken: i,
                                    mfaEnrollmentId: r,
                                })
                            );
                        (t.enrolledFactors = t.enrolledFactors.filter(
                            ({ uid: a }) => a !== r
                        )),
                            yield t.user._updateTokensIfNecessary(s);
                        try {
                            yield t.user.reload();
                        } catch (a) {
                            if ('auth/user-token-expired' !== a.code) throw a;
                        }
                    })();
                }
            }
            const vn = new WeakMap(),
                Ge = '__sak';
            class Yr {
                constructor(e, t) {
                    (this.storageRetriever = e), (this.type = t);
                }
                _isAvailable() {
                    try {
                        return this.storage
                            ? (this.storage.setItem(Ge, '1'),
                              this.storage.removeItem(Ge),
                              Promise.resolve(!0))
                            : Promise.resolve(!1);
                    } catch (e) {
                        return Promise.resolve(!1);
                    }
                }
                _set(e, t) {
                    return (
                        this.storage.setItem(e, JSON.stringify(t)),
                        Promise.resolve()
                    );
                }
                _get(e) {
                    const t = this.storage.getItem(e);
                    return Promise.resolve(t ? JSON.parse(t) : null);
                }
                _remove(e) {
                    return this.storage.removeItem(e), Promise.resolve();
                }
                get storage() {
                    return this.storageRetriever();
                }
            }
            const qe = (() => {
                    class n extends Yr {
                        constructor() {
                            super(() => window.localStorage, 'LOCAL'),
                                (this.boundEventHandler = (t, r) =>
                                    this.onStorageEvent(t, r)),
                                (this.listeners = {}),
                                (this.localCache = {}),
                                (this.pollTimer = null),
                                (this.safariLocalStorageNotSynced =
                                    (function no() {
                                        const n = (0, d.z$)();
                                        return Et(n) || ce(n);
                                    })() &&
                                    (function es() {
                                        try {
                                            return !(
                                                !window || window === window.top
                                            );
                                        } catch (n) {
                                            return !1;
                                        }
                                    })()),
                                (this.fallbackToPolling = Pr()),
                                (this._shouldAllowMigration = !0);
                        }
                        forAllChangedKeys(t) {
                            for (const r of Object.keys(this.listeners)) {
                                const i = this.storage.getItem(r),
                                    s = this.localCache[r];
                                i !== s && t(r, s, i);
                            }
                        }
                        onStorageEvent(t, r = !1) {
                            if (!t.key)
                                return void this.forAllChangedKeys(
                                    (u, m, g) => {
                                        this.notifyListeners(u, g);
                                    }
                                );
                            const i = t.key;
                            if (
                                (r ? this.detachListener() : this.stopPolling(),
                                this.safariLocalStorageNotSynced)
                            ) {
                                const u = this.storage.getItem(i);
                                if (t.newValue !== u)
                                    null !== t.newValue
                                        ? this.storage.setItem(i, t.newValue)
                                        : this.storage.removeItem(i);
                                else if (
                                    this.localCache[i] === t.newValue &&
                                    !r
                                )
                                    return;
                            }
                            const s = () => {
                                    const u = this.storage.getItem(i);
                                    (!r && this.localCache[i] === u) ||
                                        this.notifyListeners(i, u);
                                },
                                a = this.storage.getItem(i);
                            !(function Qi() {
                                return (
                                    (0, d.w1)() && 10 === document.documentMode
                                );
                            })() ||
                            a === t.newValue ||
                            t.newValue === t.oldValue
                                ? s()
                                : setTimeout(s, 10);
                        }
                        notifyListeners(t, r) {
                            this.localCache[t] = r;
                            const i = this.listeners[t];
                            if (i)
                                for (const s of Array.from(i))
                                    s(r && JSON.parse(r));
                        }
                        startPolling() {
                            this.stopPolling(),
                                (this.pollTimer = setInterval(() => {
                                    this.forAllChangedKeys((t, r, i) => {
                                        this.onStorageEvent(
                                            new StorageEvent('storage', {
                                                key: t,
                                                oldValue: r,
                                                newValue: i,
                                            }),
                                            !0
                                        );
                                    });
                                }, 1e3));
                        }
                        stopPolling() {
                            this.pollTimer &&
                                (clearInterval(this.pollTimer),
                                (this.pollTimer = null));
                        }
                        attachListener() {
                            window.addEventListener(
                                'storage',
                                this.boundEventHandler
                            );
                        }
                        detachListener() {
                            window.removeEventListener(
                                'storage',
                                this.boundEventHandler
                            );
                        }
                        _addListener(t, r) {
                            0 === Object.keys(this.listeners).length &&
                                (this.fallbackToPolling
                                    ? this.startPolling()
                                    : this.attachListener()),
                                this.listeners[t] ||
                                    ((this.listeners[t] = new Set()),
                                    (this.localCache[t] =
                                        this.storage.getItem(t))),
                                this.listeners[t].add(r);
                        }
                        _removeListener(t, r) {
                            this.listeners[t] &&
                                (this.listeners[t].delete(r),
                                0 === this.listeners[t].size &&
                                    delete this.listeners[t]),
                                0 === Object.keys(this.listeners).length &&
                                    (this.detachListener(), this.stopPolling());
                        }
                        _set(t, r) {
                            var i = () => super._set,
                                s = this;
                            return (0, o.Z)(function* () {
                                yield i().call(s, t, r),
                                    (s.localCache[t] = JSON.stringify(r));
                            })();
                        }
                        _get(t) {
                            var r = () => super._get,
                                i = this;
                            return (0, o.Z)(function* () {
                                const s = yield r().call(i, t);
                                return (i.localCache[t] = JSON.stringify(s)), s;
                            })();
                        }
                        _remove(t) {
                            var r = () => super._remove,
                                i = this;
                            return (0, o.Z)(function* () {
                                yield r().call(i, t), delete i.localCache[t];
                            })();
                        }
                    }
                    return (n.type = 'LOCAL'), n;
                })(),
                J = (() => {
                    class n extends Yr {
                        constructor() {
                            super(() => window.sessionStorage, 'SESSION');
                        }
                        _addListener(t, r) {}
                        _removeListener(t, r) {}
                    }
                    return (n.type = 'SESSION'), n;
                })();
            let oo = (() => {
                class n {
                    constructor(t) {
                        (this.eventTarget = t),
                            (this.handlersMap = {}),
                            (this.boundEventHandler =
                                this.handleEvent.bind(this));
                    }
                    static _getInstance(t) {
                        const r = this.receivers.find((s) =>
                            s.isListeningto(t)
                        );
                        if (r) return r;
                        const i = new n(t);
                        return this.receivers.push(i), i;
                    }
                    isListeningto(t) {
                        return this.eventTarget === t;
                    }
                    handleEvent(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            const i = t,
                                { eventId: s, eventType: a, data: u } = i.data,
                                m = r.handlersMap[a];
                            if (!(null == m ? void 0 : m.size)) return;
                            i.ports[0].postMessage({
                                status: 'ack',
                                eventId: s,
                                eventType: a,
                            });
                            const g = Array.from(m).map(
                                    (function () {
                                        var I = (0, o.Z)(function* (P) {
                                            return P(i.origin, u);
                                        });
                                        return function (P) {
                                            return I.apply(this, arguments);
                                        };
                                    })()
                                ),
                                y = yield (function so(n) {
                                    return Promise.all(
                                        n.map(
                                            (function () {
                                                var e = (0, o.Z)(function* (t) {
                                                    try {
                                                        return {
                                                            fulfilled: !0,
                                                            value: yield t,
                                                        };
                                                    } catch (r) {
                                                        return {
                                                            fulfilled: !1,
                                                            reason: r,
                                                        };
                                                    }
                                                });
                                                return function (t) {
                                                    return e.apply(
                                                        this,
                                                        arguments
                                                    );
                                                };
                                            })()
                                        )
                                    );
                                })(g);
                            i.ports[0].postMessage({
                                status: 'done',
                                eventId: s,
                                eventType: a,
                                response: y,
                            });
                        })();
                    }
                    _subscribe(t, r) {
                        0 === Object.keys(this.handlersMap).length &&
                            this.eventTarget.addEventListener(
                                'message',
                                this.boundEventHandler
                            ),
                            this.handlersMap[t] ||
                                (this.handlersMap[t] = new Set()),
                            this.handlersMap[t].add(r);
                    }
                    _unsubscribe(t, r) {
                        this.handlersMap[t] &&
                            r &&
                            this.handlersMap[t].delete(r),
                            (!r || 0 === this.handlersMap[t].size) &&
                                delete this.handlersMap[t],
                            0 === Object.keys(this.handlersMap).length &&
                                this.eventTarget.removeEventListener(
                                    'message',
                                    this.boundEventHandler
                                );
                    }
                }
                return (n.receivers = []), n;
            })();
            function Se(n = '', e = 10) {
                let t = '';
                for (let r = 0; r < e; r++) t += Math.floor(10 * Math.random());
                return n + t;
            }
            class ao {
                constructor(e) {
                    (this.target = e), (this.handlers = new Set());
                }
                removeMessageHandler(e) {
                    e.messageChannel &&
                        (e.messageChannel.port1.removeEventListener(
                            'message',
                            e.onMessage
                        ),
                        e.messageChannel.port1.close()),
                        this.handlers.delete(e);
                }
                _send(e, t, r = 50) {
                    var i = this;
                    return (0, o.Z)(function* () {
                        const s =
                            'undefined' != typeof MessageChannel
                                ? new MessageChannel()
                                : null;
                        if (!s) throw new Error('connection_unavailable');
                        let a, u;
                        return new Promise((m, g) => {
                            const y = Se('', 20);
                            s.port1.start();
                            const I = setTimeout(() => {
                                g(new Error('unsupported_event'));
                            }, r);
                            (u = {
                                messageChannel: s,
                                onMessage(P) {
                                    const F = P;
                                    if (F.data.eventId === y)
                                        switch (F.data.status) {
                                            case 'ack':
                                                clearTimeout(I),
                                                    (a = setTimeout(() => {
                                                        g(new Error('timeout'));
                                                    }, 3e3));
                                                break;
                                            case 'done':
                                                clearTimeout(a),
                                                    m(F.data.response);
                                                break;
                                            default:
                                                clearTimeout(I),
                                                    clearTimeout(a),
                                                    g(
                                                        new Error(
                                                            'invalid_response'
                                                        )
                                                    );
                                        }
                                },
                            }),
                                i.handlers.add(u),
                                s.port1.addEventListener(
                                    'message',
                                    u.onMessage
                                ),
                                i.target.postMessage(
                                    { eventType: e, eventId: y, data: t },
                                    [s.port2]
                                );
                        }).finally(() => {
                            u && i.removeMessageHandler(u);
                        });
                    })();
                }
            }
            function w() {
                return window;
            }
            function In() {
                return (
                    void 0 !== w().WorkerGlobalScope &&
                    'function' == typeof w().importScripts
                );
            }
            function yn() {
                return (yn = (0, o.Z)(function* () {
                    if (!(null == navigator ? void 0 : navigator.serviceWorker))
                        return null;
                    try {
                        return (yield navigator.serviceWorker.ready).active;
                    } catch (n) {
                        return null;
                    }
                })).apply(this, arguments);
            }
            const Xr = 'firebaseLocalStorageDb',
                je = 'firebaseLocalStorage',
                Qr = 'fbase_key';
            class we {
                constructor(e) {
                    this.request = e;
                }
                toPromise() {
                    return new Promise((e, t) => {
                        this.request.addEventListener('success', () => {
                            e(this.request.result);
                        }),
                            this.request.addEventListener('error', () => {
                                t(this.request.error);
                            });
                    });
                }
            }
            function Be(n, e) {
                return n
                    .transaction([je], e ? 'readwrite' : 'readonly')
                    .objectStore(je);
            }
            function En() {
                const n = indexedDB.open(Xr, 1);
                return new Promise((e, t) => {
                    n.addEventListener('error', () => {
                        t(n.error);
                    }),
                        n.addEventListener('upgradeneeded', () => {
                            const r = n.result;
                            try {
                                r.createObjectStore(je, { keyPath: Qr });
                            } catch (i) {
                                t(i);
                            }
                        }),
                        n.addEventListener(
                            'success',
                            (0, o.Z)(function* () {
                                const r = n.result;
                                r.objectStoreNames.contains(je)
                                    ? e(r)
                                    : (r.close(),
                                      yield (function po() {
                                          const n =
                                              indexedDB.deleteDatabase(Xr);
                                          return new we(n).toPromise();
                                      })(),
                                      e(yield En()));
                            })
                        );
                });
            }
            function ei(n, e, t) {
                return Tn.apply(this, arguments);
            }
            function Tn() {
                return (Tn = (0, o.Z)(function* (n, e, t) {
                    const r = Be(n, !0).put({ [Qr]: e, value: t });
                    return new we(r).toPromise();
                })).apply(this, arguments);
            }
            function Rn() {
                return (Rn = (0, o.Z)(function* (n, e) {
                    const t = Be(n, !1).get(e),
                        r = yield new we(t).toPromise();
                    return void 0 === r ? null : r.value;
                })).apply(this, arguments);
            }
            function ti(n, e) {
                const t = Be(n, !0).delete(e);
                return new we(t).toPromise();
            }
            const me = (() => {
                class n {
                    constructor() {
                        (this.type = 'LOCAL'),
                            (this._shouldAllowMigration = !0),
                            (this.listeners = {}),
                            (this.localCache = {}),
                            (this.pollTimer = null),
                            (this.pendingWrites = 0),
                            (this.receiver = null),
                            (this.sender = null),
                            (this.serviceWorkerReceiverAvailable = !1),
                            (this.activeServiceWorker = null),
                            (this._workerInitializationPromise =
                                this.initializeServiceWorkerMessaging().then(
                                    () => {},
                                    () => {}
                                ));
                    }
                    _openDb() {
                        var t = this;
                        return (0, o.Z)(function* () {
                            return t.db || (t.db = yield En()), t.db;
                        })();
                    }
                    _withRetries(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            let i = 0;
                            for (;;)
                                try {
                                    const s = yield r._openDb();
                                    return yield t(s);
                                } catch (s) {
                                    if (i++ > 3) throw s;
                                    r.db && (r.db.close(), (r.db = void 0));
                                }
                        })();
                    }
                    initializeServiceWorkerMessaging() {
                        var t = this;
                        return (0, o.Z)(function* () {
                            return In()
                                ? t.initializeReceiver()
                                : t.initializeSender();
                        })();
                    }
                    initializeReceiver() {
                        var t = this;
                        return (0, o.Z)(function* () {
                            (t.receiver = oo._getInstance(
                                (function ho() {
                                    return In() ? self : null;
                                })()
                            )),
                                t.receiver._subscribe(
                                    'keyChanged',
                                    (function () {
                                        var r = (0, o.Z)(function* (i, s) {
                                            return {
                                                keyProcessed:
                                                    (yield t._poll()).includes(
                                                        s.key
                                                    ),
                                            };
                                        });
                                        return function (i, s) {
                                            return r.apply(this, arguments);
                                        };
                                    })()
                                ),
                                t.receiver._subscribe(
                                    'ping',
                                    (function () {
                                        var r = (0, o.Z)(function* (i, s) {
                                            return ['keyChanged'];
                                        });
                                        return function (i, s) {
                                            return r.apply(this, arguments);
                                        };
                                    })()
                                );
                        })();
                    }
                    initializeSender() {
                        var t = this;
                        return (0, o.Z)(function* () {
                            var r, i;
                            if (
                                ((t.activeServiceWorker = yield (function co() {
                                    return yn.apply(this, arguments);
                                })()),
                                !t.activeServiceWorker)
                            )
                                return;
                            t.sender = new ao(t.activeServiceWorker);
                            const s = yield t.sender._send('ping', {}, 800);
                            !s ||
                                ((null === (r = s[0]) || void 0 === r
                                    ? void 0
                                    : r.fulfilled) &&
                                    (null === (i = s[0]) || void 0 === i
                                        ? void 0
                                        : i.value.includes('keyChanged')) &&
                                    (t.serviceWorkerReceiverAvailable = !0));
                        })();
                    }
                    notifyServiceWorker(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            if (
                                r.sender &&
                                r.activeServiceWorker &&
                                (function lo() {
                                    var n;
                                    return (
                                        (null ===
                                            (n =
                                                null == navigator
                                                    ? void 0
                                                    : navigator.serviceWorker) ||
                                        void 0 === n
                                            ? void 0
                                            : n.controller) || null
                                    );
                                })() === r.activeServiceWorker
                            )
                                try {
                                    yield r.sender._send(
                                        'keyChanged',
                                        { key: t },
                                        r.serviceWorkerReceiverAvailable
                                            ? 800
                                            : 50
                                    );
                                } catch (i) {}
                        })();
                    }
                    _isAvailable() {
                        return (0, o.Z)(function* () {
                            try {
                                if (!indexedDB) return !1;
                                const t = yield En();
                                return (
                                    yield ei(t, Ge, '1'), yield ti(t, Ge), !0
                                );
                            } catch (t) {}
                            return !1;
                        })();
                    }
                    _withPendingWrite(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            r.pendingWrites++;
                            try {
                                yield t();
                            } finally {
                                r.pendingWrites--;
                            }
                        })();
                    }
                    _set(t, r) {
                        var i = this;
                        return (0, o.Z)(function* () {
                            return i._withPendingWrite(
                                (0, o.Z)(function* () {
                                    return (
                                        yield i._withRetries((s) =>
                                            ei(s, t, r)
                                        ),
                                        (i.localCache[t] = r),
                                        i.notifyServiceWorker(t)
                                    );
                                })
                            );
                        })();
                    }
                    _get(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            const i = yield r._withRetries((s) =>
                                (function mo(n, e) {
                                    return Rn.apply(this, arguments);
                                })(s, t)
                            );
                            return (r.localCache[t] = i), i;
                        })();
                    }
                    _remove(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            return r._withPendingWrite(
                                (0, o.Z)(function* () {
                                    return (
                                        yield r._withRetries((i) => ti(i, t)),
                                        delete r.localCache[t],
                                        r.notifyServiceWorker(t)
                                    );
                                })
                            );
                        })();
                    }
                    _poll() {
                        var t = this;
                        return (0, o.Z)(function* () {
                            const r = yield t._withRetries((a) => {
                                const u = Be(a, !1).getAll();
                                return new we(u).toPromise();
                            });
                            if (!r) return [];
                            if (0 !== t.pendingWrites) return [];
                            const i = [],
                                s = new Set();
                            for (const { fbase_key: a, value: u } of r)
                                s.add(a),
                                    JSON.stringify(t.localCache[a]) !==
                                        JSON.stringify(u) &&
                                        (t.notifyListeners(a, u), i.push(a));
                            for (const a of Object.keys(t.localCache))
                                t.localCache[a] &&
                                    !s.has(a) &&
                                    (t.notifyListeners(a, null), i.push(a));
                            return i;
                        })();
                    }
                    notifyListeners(t, r) {
                        this.localCache[t] = r;
                        const i = this.listeners[t];
                        if (i) for (const s of Array.from(i)) s(r);
                    }
                    startPolling() {
                        var t = this;
                        this.stopPolling(),
                            (this.pollTimer = setInterval(
                                (0, o.Z)(function* () {
                                    return t._poll();
                                }),
                                800
                            ));
                    }
                    stopPolling() {
                        this.pollTimer &&
                            (clearInterval(this.pollTimer),
                            (this.pollTimer = null));
                    }
                    _addListener(t, r) {
                        0 === Object.keys(this.listeners).length &&
                            this.startPolling(),
                            this.listeners[t] ||
                                ((this.listeners[t] = new Set()), this._get(t)),
                            this.listeners[t].add(r);
                    }
                    _removeListener(t, r) {
                        this.listeners[t] &&
                            (this.listeners[t].delete(r),
                            0 === this.listeners[t].size &&
                                delete this.listeners[t]),
                            0 === Object.keys(this.listeners).length &&
                                this.stopPolling();
                    }
                }
                return (n.type = 'LOCAL'), n;
            })();
            function vo(n, e) {
                return N(n, 'POST', '/v2/accounts/mfaSignIn:start', S(n, e));
            }
            function An() {
                return (An = (0, o.Z)(function* (n) {
                    return (
                        (yield N(n, 'GET', '/v1/recaptchaParams'))
                            .recaptchaSiteKey || ''
                    );
                })).apply(this, arguments);
            }
            function ni(n) {
                return new Promise((e, t) => {
                    const r = document.createElement('script');
                    r.setAttribute('src', n),
                        (r.onload = e),
                        (r.onerror = (i) => {
                            const s = b('internal-error');
                            (s.customData = i), t(s);
                        }),
                        (r.type = 'text/javascript'),
                        (r.charset = 'UTF-8'),
                        (function Eo() {
                            var n, e;
                            return null !==
                                (e =
                                    null ===
                                        (n =
                                            document.getElementsByTagName(
                                                'head'
                                            )) || void 0 === n
                                        ? void 0
                                        : n[0]) && void 0 !== e
                                ? e
                                : document;
                        })().appendChild(r);
                });
            }
            function ri(n) {
                return `__${n}${Math.floor(1e6 * Math.random())}`;
            }
            const $e = 1e12;
            class Ao {
                constructor(e) {
                    (this.auth = e),
                        (this.counter = $e),
                        (this._widgets = new Map());
                }
                render(e, t) {
                    const r = this.counter;
                    return (
                        this._widgets.set(
                            r,
                            new ko(e, this.auth.name, t || {})
                        ),
                        this.counter++,
                        r
                    );
                }
                reset(e) {
                    var t;
                    const r = e || $e;
                    null === (t = this._widgets.get(r)) ||
                        void 0 === t ||
                        t.delete(),
                        this._widgets.delete(r);
                }
                getResponse(e) {
                    var t;
                    return (
                        (null === (t = this._widgets.get(e || $e)) ||
                        void 0 === t
                            ? void 0
                            : t.getResponse()) || ''
                    );
                }
                execute(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        var r;
                        return (
                            null === (r = t._widgets.get(e || $e)) ||
                                void 0 === r ||
                                r.execute(),
                            ''
                        );
                    })();
                }
            }
            class ko {
                constructor(e, t, r) {
                    (this.params = r),
                        (this.timerId = null),
                        (this.deleted = !1),
                        (this.responseToken = null),
                        (this.clickHandler = () => {
                            this.execute();
                        });
                    const i =
                        'string' == typeof e ? document.getElementById(e) : e;
                    p(i, 'argument-error', { appName: t }),
                        (this.container = i),
                        (this.isVisible = 'invisible' !== this.params.size),
                        this.isVisible
                            ? this.execute()
                            : this.container.addEventListener(
                                  'click',
                                  this.clickHandler
                              );
                }
                getResponse() {
                    return this.checkIfDeleted(), this.responseToken;
                }
                delete() {
                    this.checkIfDeleted(),
                        (this.deleted = !0),
                        this.timerId &&
                            (clearTimeout(this.timerId), (this.timerId = null)),
                        this.container.removeEventListener(
                            'click',
                            this.clickHandler
                        );
                }
                execute() {
                    this.checkIfDeleted(),
                        !this.timerId &&
                            (this.timerId = window.setTimeout(() => {
                                this.responseToken = (function bo(n) {
                                    const e = [],
                                        t =
                                            '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                                    for (let r = 0; r < n; r++)
                                        e.push(
                                            t.charAt(
                                                Math.floor(
                                                    Math.random() * t.length
                                                )
                                            )
                                        );
                                    return e.join('');
                                })(50);
                                const { callback: e, 'expired-callback': t } =
                                    this.params;
                                if (e)
                                    try {
                                        e(this.responseToken);
                                    } catch (r) {}
                                this.timerId = window.setTimeout(() => {
                                    if (
                                        ((this.timerId = null),
                                        (this.responseToken = null),
                                        t)
                                    )
                                        try {
                                            t();
                                        } catch (r) {}
                                    this.isVisible && this.execute();
                                }, 6e4);
                            }, 500));
                }
                checkIfDeleted() {
                    if (this.deleted)
                        throw new Error('reCAPTCHA mock was already deleted!');
                }
            }
            const kn = ri('rcb'),
                So = new M(3e4, 6e4);
            class Po {
                constructor() {
                    (this.hostLanguage = ''),
                        (this.counter = 0),
                        (this.librarySeparatelyLoaded = !!w().grecaptcha);
                }
                load(e, t = '') {
                    return (
                        p(
                            (function No(n) {
                                return (
                                    n.length <= 6 &&
                                    /^\s*[a-zA-Z0-9\-]*\s*$/.test(n)
                                );
                            })(t),
                            e,
                            'argument-error'
                        ),
                        this.shouldResolveImmediately(t)
                            ? Promise.resolve(w().grecaptcha)
                            : new Promise((r, i) => {
                                  const s = w().setTimeout(() => {
                                      i(b(e, 'network-request-failed'));
                                  }, So.get());
                                  (w()[kn] = () => {
                                      w().clearTimeout(s), delete w()[kn];
                                      const u = w().grecaptcha;
                                      if (!u)
                                          return void i(b(e, 'internal-error'));
                                      const m = u.render;
                                      (u.render = (g, y) => {
                                          const I = m(g, y);
                                          return this.counter++, I;
                                      }),
                                          (this.hostLanguage = t),
                                          r(u);
                                  }),
                                      ni(
                                          `https://www.google.com/recaptcha/api.js??${(0,
                                          d.xO)({
                                              onload: kn,
                                              render: 'explicit',
                                              hl: t,
                                          })}`
                                      ).catch(() => {
                                          clearTimeout(s),
                                              i(b(e, 'internal-error'));
                                      });
                              })
                    );
                }
                clearedOneInstance() {
                    this.counter--;
                }
                shouldResolveImmediately(e) {
                    return (
                        !!w().grecaptcha &&
                        (e === this.hostLanguage ||
                            this.counter > 0 ||
                            this.librarySeparatelyLoaded)
                    );
                }
            }
            class Oo {
                load(e) {
                    return (0, o.Z)(function* () {
                        return new Ao(e);
                    })();
                }
                clearedOneInstance() {}
            }
            const ii = 'recaptcha',
                Co = { theme: 'light', type: 'image' };
            class Lo {
                constructor(e, t = Object.assign({}, Co), r) {
                    (this.parameters = t),
                        (this.type = ii),
                        (this.destroyed = !1),
                        (this.widgetId = null),
                        (this.tokenChangeListeners = new Set()),
                        (this.renderPromise = null),
                        (this.recaptcha = null),
                        (this.auth = O(r)),
                        (this.isInvisible =
                            'invisible' === this.parameters.size),
                        p(
                            'undefined' != typeof document,
                            this.auth,
                            'operation-not-supported-in-this-environment'
                        );
                    const i =
                        'string' == typeof e ? document.getElementById(e) : e;
                    p(i, this.auth, 'argument-error'),
                        (this.container = i),
                        (this.parameters.callback = this.makeTokenCallback(
                            this.parameters.callback
                        )),
                        (this._recaptchaLoader = this.auth.settings
                            .appVerificationDisabledForTesting
                            ? new Oo()
                            : new Po()),
                        this.validateStartingState();
                }
                verify() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        e.assertNotDestroyed();
                        const t = yield e.render(),
                            r = e.getAssertedRecaptcha();
                        return (
                            r.getResponse(t) ||
                            new Promise((s) => {
                                const a = (u) => {
                                    !u ||
                                        (e.tokenChangeListeners.delete(a),
                                        s(u));
                                };
                                e.tokenChangeListeners.add(a),
                                    e.isInvisible && r.execute(t);
                            })
                        );
                    })();
                }
                render() {
                    try {
                        this.assertNotDestroyed();
                    } catch (e) {
                        return Promise.reject(e);
                    }
                    return (
                        this.renderPromise ||
                            (this.renderPromise =
                                this.makeRenderPromise().catch((e) => {
                                    throw ((this.renderPromise = null), e);
                                })),
                        this.renderPromise
                    );
                }
                _reset() {
                    this.assertNotDestroyed(),
                        null !== this.widgetId &&
                            this.getAssertedRecaptcha().reset(this.widgetId);
                }
                clear() {
                    this.assertNotDestroyed(),
                        (this.destroyed = !0),
                        this._recaptchaLoader.clearedOneInstance(),
                        this.isInvisible ||
                            this.container.childNodes.forEach((e) => {
                                this.container.removeChild(e);
                            });
                }
                validateStartingState() {
                    p(!this.parameters.sitekey, this.auth, 'argument-error'),
                        p(
                            this.isInvisible || !this.container.hasChildNodes(),
                            this.auth,
                            'argument-error'
                        ),
                        p(
                            'undefined' != typeof document,
                            this.auth,
                            'operation-not-supported-in-this-environment'
                        );
                }
                makeTokenCallback(e) {
                    return (t) => {
                        if (
                            (this.tokenChangeListeners.forEach((r) => r(t)),
                            'function' == typeof e)
                        )
                            e(t);
                        else if ('string' == typeof e) {
                            const r = w()[e];
                            'function' == typeof r && r(t);
                        }
                    };
                }
                assertNotDestroyed() {
                    p(!this.destroyed, this.auth, 'internal-error');
                }
                makeRenderPromise() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        if ((yield e.init(), !e.widgetId)) {
                            let t = e.container;
                            if (!e.isInvisible) {
                                const r = document.createElement('div');
                                t.appendChild(r), (t = r);
                            }
                            e.widgetId = e
                                .getAssertedRecaptcha()
                                .render(t, e.parameters);
                        }
                        return e.widgetId;
                    })();
                }
                init() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        p(R() && !In(), e.auth, 'internal-error'),
                            yield (function Do() {
                                let n = null;
                                return new Promise((e) => {
                                    'complete' !== document.readyState
                                        ? ((n = () => e()),
                                          window.addEventListener('load', n))
                                        : e();
                                }).catch((e) => {
                                    throw (
                                        (n &&
                                            window.removeEventListener(
                                                'load',
                                                n
                                            ),
                                        e)
                                    );
                                });
                            })(),
                            (e.recaptcha = yield e._recaptchaLoader.load(
                                e.auth,
                                e.auth.languageCode || void 0
                            ));
                        const t = yield (function yo(n) {
                            return An.apply(this, arguments);
                        })(e.auth);
                        p(t, e.auth, 'internal-error'),
                            (e.parameters.sitekey = t);
                    })();
                }
                getAssertedRecaptcha() {
                    return (
                        p(this.recaptcha, this.auth, 'internal-error'),
                        this.recaptcha
                    );
                }
            }
            class bn {
                constructor(e, t) {
                    (this.verificationId = e), (this.onConfirmation = t);
                }
                confirm(e) {
                    const t = ne._fromVerification(this.verificationId, e);
                    return this.onConfirmation(t);
                }
            }
            function Sn() {
                return (Sn = (0, o.Z)(function* (n, e, t) {
                    const r = O(n),
                        i = yield Ke(r, e, (0, d.m9)(t));
                    return new bn(i, (s) => We(r, s));
                })).apply(this, arguments);
            }
            function wn() {
                return (wn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, d.m9)(n);
                    yield Ve(!1, r, 'phone');
                    const i = yield Ke(r.auth, e, (0, d.m9)(t));
                    return new bn(i, (s) => jr(r, s));
                })).apply(this, arguments);
            }
            function Pn() {
                return (Pn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, d.m9)(n),
                        i = yield Ke(r.auth, e, (0, d.m9)(t));
                    return new bn(i, (s) => Br(r, s));
                })).apply(this, arguments);
            }
            function Ke(n, e, t) {
                return Nn.apply(this, arguments);
            }
            function Nn() {
                return (Nn = (0, o.Z)(function* (n, e, t) {
                    var r;
                    const i = yield t.verify();
                    try {
                        let s;
                        if (
                            (p('string' == typeof i, n, 'argument-error'),
                            p(t.type === ii, n, 'argument-error'),
                            (s = 'string' == typeof e ? { phoneNumber: e } : e),
                            'session' in s)
                        ) {
                            const a = s.session;
                            if ('phoneNumber' in s)
                                return (
                                    p('enroll' === a.type, n, 'internal-error'),
                                    (yield Xs(n, {
                                        idToken: a.credential,
                                        phoneEnrollmentInfo: {
                                            phoneNumber: s.phoneNumber,
                                            recaptchaToken: i,
                                        },
                                    })).phoneSessionInfo.sessionInfo
                                );
                            {
                                p('signin' === a.type, n, 'internal-error');
                                const u =
                                    (null === (r = s.multiFactorHint) ||
                                    void 0 === r
                                        ? void 0
                                        : r.uid) || s.multiFactorUid;
                                return (
                                    p(u, n, 'missing-multi-factor-info'),
                                    (yield vo(n, {
                                        mfaPendingCredential: a.credential,
                                        mfaEnrollmentId: u,
                                        phoneSignInInfo: { recaptchaToken: i },
                                    })).phoneResponseInfo.sessionInfo
                                );
                            }
                        }
                        {
                            const { sessionInfo: a } = yield ms(n, {
                                phoneNumber: s.phoneNumber,
                                recaptchaToken: i,
                            });
                            return a;
                        }
                    } finally {
                        t._reset();
                    }
                })).apply(this, arguments);
            }
            function On() {
                return (On = (0, o.Z)(function* (n, e) {
                    yield Ht((0, d.m9)(n), e);
                })).apply(this, arguments);
            }
            let Pe = (() => {
                class n {
                    constructor(t) {
                        (this.providerId = n.PROVIDER_ID), (this.auth = O(t));
                    }
                    verifyPhoneNumber(t, r) {
                        return Ke(this.auth, t, (0, d.m9)(r));
                    }
                    static credential(t, r) {
                        return ne._fromVerification(t, r);
                    }
                    static credentialFromResult(t) {
                        return n.credentialFromTaggedObject(t);
                    }
                    static credentialFromError(t) {
                        return n.credentialFromTaggedObject(t.customData || {});
                    }
                    static credentialFromTaggedObject({ _tokenResponse: t }) {
                        if (!t) return null;
                        const { phoneNumber: r, temporaryProof: i } = t;
                        return r && i ? ne._fromTokenResponse(r, i) : null;
                    }
                }
                return (
                    (n.PROVIDER_ID = 'phone'),
                    (n.PHONE_SIGN_IN_METHOD = 'phone'),
                    n
                );
            })();
            function ie(n, e) {
                return e
                    ? h(e)
                    : (p(n._popupRedirectResolver, n, 'argument-error'),
                      n._popupRedirectResolver);
            }
            class Cn extends le {
                constructor(e) {
                    super('custom', 'custom'), (this.params = e);
                }
                _getIdTokenResponse(e) {
                    return j(e, this._buildIdpRequest());
                }
                _linkToIdToken(e, t) {
                    return j(e, this._buildIdpRequest(t));
                }
                _getReauthenticationResolver(e) {
                    return j(e, this._buildIdpRequest());
                }
                _buildIdpRequest(e) {
                    const t = {
                        requestUri: this.params.requestUri,
                        sessionId: this.params.sessionId,
                        postBody: this.params.postBody,
                        tenantId: this.params.tenantId,
                        pendingToken: this.params.pendingToken,
                        returnSecureToken: !0,
                        returnIdpCredential: !0,
                    };
                    return e && (t.idToken = e), t;
                }
            }
            function Zo(n) {
                return qr(n.auth, new Cn(n), n.bypassAuthState);
            }
            function Vo(n) {
                const { auth: e, user: t } = n;
                return (
                    p(t, e, 'internal-error'),
                    Gr(t, new Cn(n), n.bypassAuthState)
                );
            }
            function Wo(n) {
                return Ln.apply(this, arguments);
            }
            function Ln() {
                return (Ln = (0, o.Z)(function* (n) {
                    const { auth: e, user: t } = n;
                    return (
                        p(t, e, 'internal-error'),
                        Ht(t, new Cn(n), n.bypassAuthState)
                    );
                })).apply(this, arguments);
            }
            class si {
                constructor(e, t, r, i, s = !1) {
                    (this.auth = e),
                        (this.resolver = r),
                        (this.user = i),
                        (this.bypassAuthState = s),
                        (this.pendingPromise = null),
                        (this.eventManager = null),
                        (this.filter = Array.isArray(t) ? t : [t]);
                }
                execute() {
                    var e = this;
                    return new Promise(
                        (function () {
                            var t = (0, o.Z)(function* (r, i) {
                                e.pendingPromise = { resolve: r, reject: i };
                                try {
                                    (e.eventManager =
                                        yield e.resolver._initialize(e.auth)),
                                        yield e.onExecution(),
                                        e.eventManager.registerConsumer(e);
                                } catch (s) {
                                    e.reject(s);
                                }
                            });
                            return function (r, i) {
                                return t.apply(this, arguments);
                            };
                        })()
                    );
                }
                onAuthEvent(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        const {
                            urlResponse: r,
                            sessionId: i,
                            postBody: s,
                            tenantId: a,
                            error: u,
                            type: m,
                        } = e;
                        if (u) return void t.reject(u);
                        const g = {
                            auth: t.auth,
                            requestUri: r,
                            sessionId: i,
                            tenantId: a || void 0,
                            postBody: s || void 0,
                            user: t.user,
                            bypassAuthState: t.bypassAuthState,
                        };
                        try {
                            t.resolve(yield t.getIdpTask(m)(g));
                        } catch (y) {
                            t.reject(y);
                        }
                    })();
                }
                onError(e) {
                    this.reject(e);
                }
                getIdpTask(e) {
                    switch (e) {
                        case 'signInViaPopup':
                        case 'signInViaRedirect':
                            return Zo;
                        case 'linkViaPopup':
                        case 'linkViaRedirect':
                            return Wo;
                        case 'reauthViaPopup':
                        case 'reauthViaRedirect':
                            return Vo;
                        default:
                            k(this.auth, 'internal-error');
                    }
                }
                resolve(e) {
                    l(this.pendingPromise, 'Pending promise was never set'),
                        this.pendingPromise.resolve(e),
                        this.unregisterAndCleanUp();
                }
                reject(e) {
                    l(this.pendingPromise, 'Pending promise was never set'),
                        this.pendingPromise.reject(e),
                        this.unregisterAndCleanUp();
                }
                unregisterAndCleanUp() {
                    this.eventManager &&
                        this.eventManager.unregisterConsumer(this),
                        (this.pendingPromise = null),
                        this.cleanUp();
                }
            }
            const Ho = new M(2e3, 1e4);
            function Dn() {
                return (Dn = (0, o.Z)(function* (n, e, t) {
                    const r = O(n);
                    Q(n, e, B);
                    const i = ie(r, t);
                    return new Un(r, 'signInViaPopup', e, i).executeNotNull();
                })).apply(this, arguments);
            }
            function xn() {
                return (xn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, d.m9)(n);
                    Q(r.auth, e, B);
                    const i = ie(r.auth, t);
                    return new Un(
                        r.auth,
                        'reauthViaPopup',
                        e,
                        i,
                        r
                    ).executeNotNull();
                })).apply(this, arguments);
            }
            function Mn() {
                return (Mn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, d.m9)(n);
                    Q(r.auth, e, B);
                    const i = ie(r.auth, t);
                    return new Un(
                        r.auth,
                        'linkViaPopup',
                        e,
                        i,
                        r
                    ).executeNotNull();
                })).apply(this, arguments);
            }
            let Un = (() => {
                class n extends si {
                    constructor(t, r, i, s, a) {
                        super(t, r, s, a),
                            (this.provider = i),
                            (this.authWindow = null),
                            (this.pollId = null),
                            n.currentPopupAction &&
                                n.currentPopupAction.cancel(),
                            (n.currentPopupAction = this);
                    }
                    executeNotNull() {
                        var t = this;
                        return (0, o.Z)(function* () {
                            const r = yield t.execute();
                            return p(r, t.auth, 'internal-error'), r;
                        })();
                    }
                    onExecution() {
                        var t = this;
                        return (0, o.Z)(function* () {
                            l(
                                1 === t.filter.length,
                                'Popup operations only handle one event'
                            );
                            const r = Se();
                            (t.authWindow = yield t.resolver._openPopup(
                                t.auth,
                                t.provider,
                                t.filter[0],
                                r
                            )),
                                (t.authWindow.associatedEvent = r),
                                t.resolver
                                    ._originValidation(t.auth)
                                    .catch((i) => {
                                        t.reject(i);
                                    }),
                                t.resolver._isIframeWebStorageSupported(
                                    t.auth,
                                    (i) => {
                                        i ||
                                            t.reject(
                                                b(
                                                    t.auth,
                                                    'web-storage-unsupported'
                                                )
                                            );
                                    }
                                ),
                                t.pollUserCancellation();
                        })();
                    }
                    get eventId() {
                        var t;
                        return (
                            (null === (t = this.authWindow) || void 0 === t
                                ? void 0
                                : t.associatedEvent) || null
                        );
                    }
                    cancel() {
                        this.reject(b(this.auth, 'cancelled-popup-request'));
                    }
                    cleanUp() {
                        this.authWindow && this.authWindow.close(),
                            this.pollId && window.clearTimeout(this.pollId),
                            (this.authWindow = null),
                            (this.pollId = null),
                            (n.currentPopupAction = null);
                    }
                    pollUserCancellation() {
                        const t = () => {
                            var r, i;
                            this.pollId = (
                                null ===
                                    (i =
                                        null === (r = this.authWindow) ||
                                        void 0 === r
                                            ? void 0
                                            : r.window) || void 0 === i
                                    ? void 0
                                    : i.closed
                            )
                                ? window.setTimeout(() => {
                                      (this.pollId = null),
                                          this.reject(
                                              b(
                                                  this.auth,
                                                  'popup-closed-by-user'
                                              )
                                          );
                                  }, 2e3)
                                : window.setTimeout(t, Ho.get());
                        };
                        t();
                    }
                }
                return (n.currentPopupAction = null), n;
            })();
            const Ne = new Map();
            class Bo extends si {
                constructor(e, t, r = !1) {
                    super(
                        e,
                        [
                            'signInViaRedirect',
                            'linkViaRedirect',
                            'reauthViaRedirect',
                            'unknown',
                        ],
                        t,
                        void 0,
                        r
                    ),
                        (this.eventId = null);
                }
                execute() {
                    var e = () => super.execute,
                        t = this;
                    return (0, o.Z)(function* () {
                        let r = Ne.get(t.auth._key());
                        if (!r) {
                            try {
                                const s = (yield (function $o(n, e) {
                                    return Fn.apply(this, arguments);
                                })(t.resolver, t.auth))
                                    ? yield e().call(t)
                                    : null;
                                r = () => Promise.resolve(s);
                            } catch (i) {
                                r = () => Promise.reject(i);
                            }
                            Ne.set(t.auth._key(), r);
                        }
                        return (
                            t.bypassAuthState ||
                                Ne.set(t.auth._key(), () =>
                                    Promise.resolve(null)
                                ),
                            r()
                        );
                    })();
                }
                onAuthEvent(e) {
                    var t = () => super.onAuthEvent,
                        r = this;
                    return (0, o.Z)(function* () {
                        if ('signInViaRedirect' === e.type)
                            return t().call(r, e);
                        if ('unknown' !== e.type) {
                            if (e.eventId) {
                                const i = yield r.auth._redirectUserForId(
                                    e.eventId
                                );
                                if (i) return (r.user = i), t().call(r, e);
                                r.resolve(null);
                            }
                        } else r.resolve(null);
                    })();
                }
                onExecution() {
                    return (0, o.Z)(function* () {})();
                }
                cleanUp() {}
            }
            function Fn() {
                return (Fn = (0, o.Z)(function* (n, e) {
                    const t = ai(e),
                        r = oi(n);
                    if (!(yield r._isAvailable())) return !1;
                    const i = 'true' === (yield r._get(t));
                    return yield r._remove(t), i;
                })).apply(this, arguments);
            }
            function Zn(n, e) {
                return Vn.apply(this, arguments);
            }
            function Vn() {
                return (Vn = (0, o.Z)(function* (n, e) {
                    return oi(n)._set(ai(e), 'true');
                })).apply(this, arguments);
            }
            function Wn(n, e) {
                Ne.set(n._key(), e);
            }
            function oi(n) {
                return h(n._redirectPersistence);
            }
            function ai(n) {
                return te('pendingRedirect', n.config.apiKey, n.name);
            }
            function Hn() {
                return (Hn = (0, o.Z)(function* (n, e, t) {
                    const r = O(n);
                    Q(n, e, B);
                    const i = ie(r, t);
                    return (
                        yield Zn(i, r),
                        i._openRedirect(r, e, 'signInViaRedirect')
                    );
                })).apply(this, arguments);
            }
            function zn() {
                return (zn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, d.m9)(n);
                    Q(r.auth, e, B);
                    const i = ie(r.auth, t);
                    yield Zn(i, r.auth);
                    const s = yield ui(r);
                    return i._openRedirect(r.auth, e, 'reauthViaRedirect', s);
                })).apply(this, arguments);
            }
            function Gn() {
                return (Gn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, d.m9)(n);
                    Q(r.auth, e, B);
                    const i = ie(r.auth, t);
                    yield Ve(!1, r, e.providerId), yield Zn(i, r.auth);
                    const s = yield ui(r);
                    return i._openRedirect(r.auth, e, 'linkViaRedirect', s);
                })).apply(this, arguments);
            }
            function qn() {
                return (qn = (0, o.Z)(function* (n, e) {
                    return yield O(n)._initializationPromise, Je(n, e, !1);
                })).apply(this, arguments);
            }
            function Je(n, e) {
                return jn.apply(this, arguments);
            }
            function jn() {
                return (jn = (0, o.Z)(function* (n, e, t = !1) {
                    const r = O(n),
                        i = ie(r, e),
                        a = yield new Bo(r, i, t).execute();
                    return (
                        a &&
                            !t &&
                            (delete a.user._redirectEventId,
                            yield r._persistUserIfCurrent(a.user),
                            yield r._setRedirectUser(null, e)),
                        a
                    );
                })).apply(this, arguments);
            }
            function ui(n) {
                return Bn.apply(this, arguments);
            }
            function Bn() {
                return (Bn = (0, o.Z)(function* (n) {
                    const e = Se(`${n.uid}:::`);
                    return (
                        (n._redirectEventId = e),
                        yield n.auth._setRedirectUser(n),
                        yield n.auth._persistUserIfCurrent(n),
                        e
                    );
                })).apply(this, arguments);
            }
            class ci {
                constructor(e) {
                    (this.auth = e),
                        (this.cachedEventUids = new Set()),
                        (this.consumers = new Set()),
                        (this.queuedRedirectEvent = null),
                        (this.hasHandledPotentialRedirect = !1),
                        (this.lastProcessedEventTime = Date.now());
                }
                registerConsumer(e) {
                    this.consumers.add(e),
                        this.queuedRedirectEvent &&
                            this.isEventForConsumer(
                                this.queuedRedirectEvent,
                                e
                            ) &&
                            (this.sendToConsumer(this.queuedRedirectEvent, e),
                            this.saveEventToCache(this.queuedRedirectEvent),
                            (this.queuedRedirectEvent = null));
                }
                unregisterConsumer(e) {
                    this.consumers.delete(e);
                }
                onEvent(e) {
                    if (this.hasEventBeenHandled(e)) return !1;
                    let t = !1;
                    return (
                        this.consumers.forEach((r) => {
                            this.isEventForConsumer(e, r) &&
                                ((t = !0),
                                this.sendToConsumer(e, r),
                                this.saveEventToCache(e));
                        }),
                        this.hasHandledPotentialRedirect ||
                            !(function ia(n) {
                                switch (n.type) {
                                    case 'signInViaRedirect':
                                    case 'linkViaRedirect':
                                    case 'reauthViaRedirect':
                                        return !0;
                                    case 'unknown':
                                        return di(n);
                                    default:
                                        return !1;
                                }
                            })(e) ||
                            ((this.hasHandledPotentialRedirect = !0),
                            t || ((this.queuedRedirectEvent = e), (t = !0))),
                        t
                    );
                }
                sendToConsumer(e, t) {
                    var r;
                    if (e.error && !di(e)) {
                        const i =
                            (null === (r = e.error.code) || void 0 === r
                                ? void 0
                                : r.split('auth/')[1]) || 'internal-error';
                        t.onError(b(this.auth, i));
                    } else t.onAuthEvent(e);
                }
                isEventForConsumer(e, t) {
                    const r =
                        null === t.eventId ||
                        (!!e.eventId && e.eventId === t.eventId);
                    return t.filter.includes(e.type) && r;
                }
                hasEventBeenHandled(e) {
                    return (
                        Date.now() - this.lastProcessedEventTime >= 6e5 &&
                            this.cachedEventUids.clear(),
                        this.cachedEventUids.has(li(e))
                    );
                }
                saveEventToCache(e) {
                    this.cachedEventUids.add(li(e)),
                        (this.lastProcessedEventTime = Date.now());
                }
            }
            function li(n) {
                return [n.type, n.eventId, n.sessionId, n.tenantId]
                    .filter((e) => e)
                    .join('-');
            }
            function di({ type: n, error: e }) {
                return (
                    'unknown' === n &&
                    'auth/no-auth-event' === (null == e ? void 0 : e.code)
                );
            }
            function hi(n) {
                return $n.apply(this, arguments);
            }
            function $n() {
                return ($n = (0, o.Z)(function* (n, e = {}) {
                    return N(n, 'GET', '/v1/projects', e);
                })).apply(this, arguments);
            }
            const sa = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
                oa = /^https?/;
            function Kn() {
                return (Kn = (0, o.Z)(function* (n) {
                    if (n.config.emulator) return;
                    const { authorizedDomains: e } = yield hi(n);
                    for (const t of e)
                        try {
                            if (ua(t)) return;
                        } catch (r) {}
                    k(n, 'unauthorized-domain');
                })).apply(this, arguments);
            }
            function ua(n) {
                const e = E(),
                    { protocol: t, hostname: r } = new URL(e);
                if (n.startsWith('chrome-extension://')) {
                    const a = new URL(n);
                    return '' === a.hostname && '' === r
                        ? 'chrome-extension:' === t &&
                              n.replace('chrome-extension://', '') ===
                                  e.replace('chrome-extension://', '')
                        : 'chrome-extension:' === t && a.hostname === r;
                }
                if (!oa.test(t)) return !1;
                if (sa.test(n)) return r === n;
                const i = n.replace(/\./g, '\\.');
                return new RegExp('^(.+\\.' + i + '|' + i + ')$', 'i').test(r);
            }
            const ca = new M(3e4, 6e4);
            function fi() {
                const n = w().___jsl;
                if (null == n ? void 0 : n.H)
                    for (const e of Object.keys(n.H))
                        if (
                            ((n.H[e].r = n.H[e].r || []),
                            (n.H[e].L = n.H[e].L || []),
                            (n.H[e].r = [...n.H[e].L]),
                            n.CP)
                        )
                            for (let t = 0; t < n.CP.length; t++)
                                n.CP[t] = null;
            }
            let Ye = null;
            function da(n) {
                return (
                    (Ye =
                        Ye ||
                        (function la(n) {
                            return new Promise((e, t) => {
                                var r, i, s;
                                function a() {
                                    fi(),
                                        gapi.load('gapi.iframes', {
                                            callback: () => {
                                                e(gapi.iframes.getContext());
                                            },
                                            ontimeout: () => {
                                                fi(),
                                                    t(
                                                        b(
                                                            n,
                                                            'network-request-failed'
                                                        )
                                                    );
                                            },
                                            timeout: ca.get(),
                                        });
                                }
                                if (
                                    null ===
                                        (i =
                                            null === (r = w().gapi) ||
                                            void 0 === r
                                                ? void 0
                                                : r.iframes) || void 0 === i
                                        ? void 0
                                        : i.Iframe
                                )
                                    e(gapi.iframes.getContext());
                                else {
                                    if (
                                        !(null === (s = w().gapi) ||
                                        void 0 === s
                                            ? void 0
                                            : s.load)
                                    ) {
                                        const u = ri('iframefcb');
                                        return (
                                            (w()[u] = () => {
                                                gapi.load
                                                    ? a()
                                                    : t(
                                                          b(
                                                              n,
                                                              'network-request-failed'
                                                          )
                                                      );
                                            }),
                                            ni(
                                                `https://apis.google.com/js/api.js?onload=${u}`
                                            ).catch((m) => t(m))
                                        );
                                    }
                                    a();
                                }
                            }).catch((e) => {
                                throw ((Ye = null), e);
                            });
                        })(n)),
                    Ye
                );
            }
            const ha = new M(5e3, 15e3),
                ma = {
                    style: {
                        position: 'absolute',
                        top: '-100px',
                        width: '1px',
                        height: '1px',
                    },
                    'aria-hidden': 'true',
                    tabindex: '-1',
                },
                _a = new Map([
                    ['identitytoolkit.googleapis.com', 'p'],
                    ['staging-identitytoolkit.sandbox.googleapis.com', 's'],
                    ['test-identitytoolkit.sandbox.googleapis.com', 't'],
                ]);
            function ga(n) {
                const e = n.config;
                p(e.authDomain, n, 'auth-domain-config-required');
                const t = e.emulator
                        ? A(e, 'emulator/auth/iframe')
                        : `https://${n.config.authDomain}/__/auth/iframe`,
                    r = { apiKey: e.apiKey, appName: n.name, v: V.SDK_VERSION },
                    i = _a.get(n.config.apiHost);
                i && (r.eid = i);
                const s = n._getFrameworks();
                return (
                    s.length && (r.fw = s.join(',')),
                    `${t}?${(0, d.xO)(r).slice(1)}`
                );
            }
            function Jn() {
                return (
                    (Jn = (0, o.Z)(function* (n) {
                        const e = yield da(n),
                            t = w().gapi;
                        return (
                            p(t, n, 'internal-error'),
                            e.open(
                                {
                                    where: document.body,
                                    url: ga(n),
                                    messageHandlersFilter:
                                        t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
                                    attributes: ma,
                                    dontclear: !0,
                                },
                                (r) =>
                                    new Promise(
                                        (function () {
                                            var i = (0, o.Z)(function* (s, a) {
                                                yield r.restyle({
                                                    setHideOnLeave: !1,
                                                });
                                                const u = b(
                                                        n,
                                                        'network-request-failed'
                                                    ),
                                                    m = w().setTimeout(() => {
                                                        a(u);
                                                    }, ha.get());
                                                function g() {
                                                    w().clearTimeout(m), s(r);
                                                }
                                                r.ping(g).then(g, () => {
                                                    a(u);
                                                });
                                            });
                                            return function (s, a) {
                                                return i.apply(this, arguments);
                                            };
                                        })()
                                    )
                            )
                        );
                    })),
                    Jn.apply(this, arguments)
                );
            }
            const Ia = {
                location: 'yes',
                resizable: 'yes',
                statusbar: 'yes',
                toolbar: 'no',
            };
            class pi {
                constructor(e) {
                    (this.window = e), (this.associatedEvent = null);
                }
                close() {
                    if (this.window)
                        try {
                            this.window.close();
                        } catch (e) {}
                }
            }
            function Yn(n, e, t, r, i, s) {
                p(n.config.authDomain, n, 'auth-domain-config-required'),
                    p(n.config.apiKey, n, 'invalid-api-key');
                const a = {
                    apiKey: n.config.apiKey,
                    appName: n.name,
                    authType: t,
                    redirectUrl: r,
                    v: V.SDK_VERSION,
                    eventId: i,
                };
                if (e instanceof B) {
                    e.setDefaultLanguage(n.languageCode),
                        (a.providerId = e.providerId || ''),
                        (0, d.xb)(e.getCustomParameters()) ||
                            (a.customParameters = JSON.stringify(
                                e.getCustomParameters()
                            ));
                    for (const [m, g] of Object.entries(s || {})) a[m] = g;
                }
                if (e instanceof de) {
                    const m = e.getScopes().filter((g) => '' !== g);
                    m.length > 0 && (a.scopes = m.join(','));
                }
                n.tenantId && (a.tid = n.tenantId);
                const u = a;
                for (const m of Object.keys(u)) void 0 === u[m] && delete u[m];
                return `${(function wa({ config: n }) {
                    return n.emulator
                        ? A(n, 'emulator/auth/handler')
                        : `https://${n.authDomain}/__/auth/handler`;
                })(n)}?${(0, d.xO)(u).slice(1)}`;
            }
            const Xn = 'webStorageSupport';
            class Qn extends class Na {
                constructor(e) {
                    this.factorId = e;
                }
                _process(e, t, r) {
                    switch (t.type) {
                        case 'enroll':
                            return this._finalizeEnroll(e, t.credential, r);
                        case 'signin':
                            return this._finalizeSignIn(e, t.credential);
                        default:
                            return c('unexpected MultiFactorSessionType');
                    }
                }
            } {
                constructor(e) {
                    super('phone'), (this.credential = e);
                }
                static _fromCredential(e) {
                    return new Qn(e);
                }
                _finalizeEnroll(e, t, r) {
                    return (function Qs(n, e) {
                        return N(
                            n,
                            'POST',
                            '/v2/accounts/mfaEnrollment:finalize',
                            S(n, e)
                        );
                    })(e, {
                        idToken: t,
                        displayName: r,
                        phoneVerificationInfo:
                            this.credential._makeVerificationRequest(),
                    });
                }
                _finalizeSignIn(e, t) {
                    return (function Io(n, e) {
                        return N(
                            n,
                            'POST',
                            '/v2/accounts/mfaSignIn:finalize',
                            S(n, e)
                        );
                    })(e, {
                        mfaPendingCredential: t,
                        phoneVerificationInfo:
                            this.credential._makeVerificationRequest(),
                    });
                }
            }
            let Oa = (() => {
                class n {
                    constructor() {}
                    static assertion(t) {
                        return Qn._fromCredential(t);
                    }
                }
                return (n.FACTOR_ID = 'phone'), n;
            })();
            var _i = '@firebase/auth';
            class Ca {
                constructor(e) {
                    (this.auth = e), (this.internalListeners = new Map());
                }
                getUid() {
                    var e;
                    return (
                        this.assertAuthConfigured(),
                        (null === (e = this.auth.currentUser) || void 0 === e
                            ? void 0
                            : e.uid) || null
                    );
                }
                getToken(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return (
                            t.assertAuthConfigured(),
                            yield t.auth._initializationPromise,
                            t.auth.currentUser
                                ? {
                                      accessToken:
                                          yield t.auth.currentUser.getIdToken(
                                              e
                                          ),
                                  }
                                : null
                        );
                    })();
                }
                addAuthTokenListener(e) {
                    if (
                        (this.assertAuthConfigured(),
                        this.internalListeners.has(e))
                    )
                        return;
                    const t = this.auth.onIdTokenChanged((r) => {
                        var i;
                        e(
                            (null === (i = r) || void 0 === i
                                ? void 0
                                : i.stsTokenManager.accessToken) || null
                        );
                    });
                    this.internalListeners.set(e, t),
                        this.updateProactiveRefresh();
                }
                removeAuthTokenListener(e) {
                    this.assertAuthConfigured();
                    const t = this.internalListeners.get(e);
                    !t ||
                        (this.internalListeners.delete(e),
                        t(),
                        this.updateProactiveRefresh());
                }
                assertAuthConfigured() {
                    p(
                        this.auth._initializationPromise,
                        'dependent-sdk-initialized-before-auth'
                    );
                }
                updateProactiveRefresh() {
                    this.internalListeners.size > 0
                        ? this.auth._startProactiveRefresh()
                        : this.auth._stopProactiveRefresh();
                }
            }
            function se() {
                return window;
            }
            function er() {
                return (er = (0, o.Z)(function* (n, e, t) {
                    var r;
                    const { BuildInfo: i } = se();
                    l(e.sessionId, 'AuthEvent did not contain a session ID');
                    const s = yield Wa(e.sessionId),
                        a = {};
                    return (
                        ce()
                            ? (a.ibi = i.packageName)
                            : Ae()
                            ? (a.apn = i.packageName)
                            : k(
                                  n,
                                  'operation-not-supported-in-this-environment'
                              ),
                        i.displayName && (a.appDisplayName = i.displayName),
                        (a.sessionId = s),
                        Yn(
                            n,
                            t,
                            e.type,
                            void 0,
                            null !== (r = e.eventId) && void 0 !== r
                                ? r
                                : void 0,
                            a
                        )
                    );
                })).apply(this, arguments);
            }
            function tr() {
                return (tr = (0, o.Z)(function* (n) {
                    const { BuildInfo: e } = se(),
                        t = {};
                    ce()
                        ? (t.iosBundleId = e.packageName)
                        : Ae()
                        ? (t.androidPackageName = e.packageName)
                        : k(n, 'operation-not-supported-in-this-environment'),
                        yield hi(n, t);
                })).apply(this, arguments);
            }
            function nr() {
                return (nr = (0, o.Z)(function* (n, e, t) {
                    const { cordova: r } = se();
                    let i = () => {};
                    try {
                        yield new Promise((s, a) => {
                            let u = null;
                            function m() {
                                var I;
                                s();
                                const P =
                                    null === (I = r.plugins.browsertab) ||
                                    void 0 === I
                                        ? void 0
                                        : I.close;
                                'function' == typeof P && P(),
                                    'function' ==
                                        typeof (null == t ? void 0 : t.close) &&
                                        t.close();
                            }
                            function g() {
                                u ||
                                    (u = window.setTimeout(() => {
                                        a(b(n, 'redirect-cancelled-by-user'));
                                    }, 2e3));
                            }
                            function y() {
                                'visible' ===
                                    (null == document
                                        ? void 0
                                        : document.visibilityState) && g();
                            }
                            e.addPassiveListener(m),
                                document.addEventListener('resume', g, !1),
                                Ae() &&
                                    document.addEventListener(
                                        'visibilitychange',
                                        y,
                                        !1
                                    ),
                                (i = () => {
                                    e.removePassiveListener(m),
                                        document.removeEventListener(
                                            'resume',
                                            g,
                                            !1
                                        ),
                                        document.removeEventListener(
                                            'visibilitychange',
                                            y,
                                            !1
                                        ),
                                        u && window.clearTimeout(u);
                                });
                        });
                    } finally {
                        i();
                    }
                })).apply(this, arguments);
            }
            function Wa(n) {
                return rr.apply(this, arguments);
            }
            function rr() {
                return (rr = (0, o.Z)(function* (n) {
                    const e = Ha(n),
                        t = yield crypto.subtle.digest('SHA-256', e);
                    return Array.from(new Uint8Array(t))
                        .map((i) => i.toString(16).padStart(2, '0'))
                        .join('');
                })).apply(this, arguments);
            }
            function Ha(n) {
                if (
                    (l(
                        /[0-9a-zA-Z]+/.test(n),
                        'Can only convert alpha-numeric strings'
                    ),
                    'undefined' != typeof TextEncoder)
                )
                    return new TextEncoder().encode(n);
                const e = new ArrayBuffer(n.length),
                    t = new Uint8Array(e);
                for (let r = 0; r < n.length; r++) t[r] = n.charCodeAt(r);
                return t;
            }
            !(function Da(n) {
                (0, V._registerComponent)(
                    new xe.wA(
                        'auth',
                        (e, { options: t }) => {
                            const r = e.getProvider('app').getImmediate(),
                                i = e.getProvider('heartbeat'),
                                { apiKey: s, authDomain: a } = r.options;
                            return ((u, m) => {
                                p(s && !s.includes(':'), 'invalid-api-key', {
                                    appName: u.name,
                                }),
                                    p(
                                        !(null == a ? void 0 : a.includes(':')),
                                        'argument-error',
                                        { appName: u.name }
                                    );
                                const g = {
                                        apiKey: s,
                                        authDomain: a,
                                        clientPlatform: n,
                                        apiHost:
                                            'identitytoolkit.googleapis.com',
                                        tokenApiHost:
                                            'securetoken.googleapis.com',
                                        apiScheme: 'https',
                                        sdkClientVersion: Nr(n),
                                    },
                                    y = new ns(u, m, g);
                                return (
                                    (function _(n, e) {
                                        const t =
                                                (null == e
                                                    ? void 0
                                                    : e.persistence) || [],
                                            r = (
                                                Array.isArray(t) ? t : [t]
                                            ).map(h);
                                        (null == e ? void 0 : e.errorMap) &&
                                            n._updateErrorMap(e.errorMap),
                                            n._initializeWithPersistence(
                                                r,
                                                null == e
                                                    ? void 0
                                                    : e.popupRedirectResolver
                                            );
                                    })(y, t),
                                    y
                                );
                            })(r, i);
                        },
                        'PUBLIC'
                    )
                        .setInstantiationMode('EXPLICIT')
                        .setInstanceCreatedCallback((e, t, r) => {
                            e.getProvider('auth-internal').initialize();
                        })
                ),
                    (0, V._registerComponent)(
                        new xe.wA(
                            'auth-internal',
                            (e) => {
                                const t = O(
                                    e.getProvider('auth').getImmediate()
                                );
                                return new Ca(t);
                            },
                            'PRIVATE'
                        ).setInstantiationMode('EXPLICIT')
                    ),
                    (0, V.registerVersion)(
                        _i,
                        '0.20.2',
                        (function La(n) {
                            switch (n) {
                                case 'Node':
                                    return 'node';
                                case 'ReactNative':
                                    return 'rn';
                                case 'Worker':
                                    return 'webworker';
                                case 'Cordova':
                                    return 'cordova';
                                default:
                                    return;
                            }
                        })(n)
                    ),
                    (0, V.registerVersion)(_i, '0.20.2', 'esm2017');
            })('Browser');
            class Ga extends ci {
                constructor() {
                    super(...arguments),
                        (this.passiveListeners = new Set()),
                        (this.initPromise = new Promise((e) => {
                            this.resolveInialized = e;
                        }));
                }
                addPassiveListener(e) {
                    this.passiveListeners.add(e);
                }
                removePassiveListener(e) {
                    this.passiveListeners.delete(e);
                }
                resetRedirect() {
                    (this.queuedRedirectEvent = null),
                        (this.hasHandledPotentialRedirect = !1);
                }
                onEvent(e) {
                    return (
                        this.resolveInialized(),
                        this.passiveListeners.forEach((t) => t(e)),
                        super.onEvent(e)
                    );
                }
                initialized() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        yield e.initPromise;
                    })();
                }
            }
            function vi(n) {
                return ir.apply(this, arguments);
            }
            function ir() {
                return (ir = (0, o.Z)(function* (n) {
                    const e = yield sr()._get(or(n));
                    return e && (yield sr()._remove(or(n))), e;
                })).apply(this, arguments);
            }
            function $a() {
                const n = [],
                    e =
                        '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                for (let t = 0; t < 20; t++) {
                    const r = Math.floor(Math.random() * e.length);
                    n.push(e.charAt(r));
                }
                return n.join('');
            }
            function sr() {
                return h(qe);
            }
            function or(n) {
                return te('authEvent', n.config.apiKey, n.name);
            }
            function Xe(n) {
                if (!(null == n ? void 0 : n.includes('?'))) return {};
                const [e, ...t] = n.split('?');
                return (0, d.zd)(t.join('?'));
            }
            function Ii() {
                return {
                    type: 'unknown',
                    eventId: null,
                    sessionId: null,
                    urlResponse: null,
                    postBody: null,
                    tenantId: null,
                    error: b('no-auth-event'),
                };
            }
            function Oe() {
                var n;
                return (
                    (null === (n = null == self ? void 0 : self.location) ||
                    void 0 === n
                        ? void 0
                        : n.protocol) || null
                );
            }
            function yi(n = (0, d.z$)()) {
                return !(
                    ('file:' !== Oe() &&
                        'ionic:' !== Oe() &&
                        'capacitor:' !== Oe()) ||
                    !n.toLowerCase().match(/iphone|ipad|ipod|android/)
                );
            }
            function Ei() {
                try {
                    const n = self.localStorage,
                        e = Se();
                    if (n)
                        return (
                            n.setItem(e, '1'),
                            n.removeItem(e),
                            !(function uu(n = (0, d.z$)()) {
                                return (
                                    (function ou() {
                                        return (
                                            (0, d.w1)() &&
                                            11 ===
                                                (null == document
                                                    ? void 0
                                                    : document.documentMode)
                                        );
                                    })() ||
                                    (function au(n = (0, d.z$)()) {
                                        return /Edge\/\d+/.test(n);
                                    })(n)
                                );
                            })() || (0, d.hl)()
                        );
                } catch (n) {
                    return ar() && (0, d.hl)();
                }
                return !1;
            }
            function ar() {
                return (
                    'undefined' != typeof global &&
                    'WorkerGlobalScope' in global &&
                    'importScripts' in global
                );
            }
            function ur() {
                return (
                    ((function iu() {
                        return 'http:' === Oe() || 'https:' === Oe();
                    })() ||
                        (0, d.ru)() ||
                        yi()) &&
                    !(function su() {
                        return (0, d.b$)() || (0, d.UG)();
                    })() &&
                    Ei() &&
                    !ar()
                );
            }
            function Ti() {
                return yi() && 'undefined' != typeof document;
            }
            function cr() {
                return (cr = (0, o.Z)(function* () {
                    return (
                        !!Ti() &&
                        new Promise((n) => {
                            const e = setTimeout(() => {
                                n(!1);
                            }, 1e3);
                            document.addEventListener('deviceready', () => {
                                clearTimeout(e), n(!0);
                            });
                        })
                    );
                })).apply(this, arguments);
            }
            const D = { LOCAL: 'local', NONE: 'none', SESSION: 'session' },
                Ce = p,
                Ri = 'persistence';
            function lr(n) {
                return dr.apply(this, arguments);
            }
            function dr() {
                return (dr = (0, o.Z)(function* (n) {
                    yield n._initializationPromise;
                    const e = Ai(),
                        t = te(Ri, n.config.apiKey, n.name);
                    e && e.setItem(t, n._getPersistence());
                })).apply(this, arguments);
            }
            function Ai() {
                var n;
                try {
                    return (
                        (null ===
                            (n = (function lu() {
                                return 'undefined' != typeof window
                                    ? window
                                    : null;
                            })()) || void 0 === n
                            ? void 0
                            : n.sessionStorage) || null
                    );
                } catch (e) {
                    return null;
                }
            }
            const fu = p;
            class Y {
                constructor() {
                    (this.browserResolver = h(
                        class Pa {
                            constructor() {
                                (this.eventManagers = {}),
                                    (this.iframes = {}),
                                    (this.originValidationPromises = {}),
                                    (this._redirectPersistence = J),
                                    (this._completeRedirectFn = Je),
                                    (this._overrideRedirectResult = Wn);
                            }
                            _openPopup(e, t, r, i) {
                                var s = this;
                                return (0, o.Z)(function* () {
                                    var a;
                                    l(
                                        null ===
                                            (a = s.eventManagers[e._key()]) ||
                                            void 0 === a
                                            ? void 0
                                            : a.manager,
                                        '_initialize() not called before _openPopup()'
                                    );
                                    const u = Yn(e, t, r, E(), i);
                                    return (function Aa(
                                        n,
                                        e,
                                        t,
                                        r = 500,
                                        i = 600
                                    ) {
                                        const s = Math.max(
                                                (window.screen.availHeight -
                                                    i) /
                                                    2,
                                                0
                                            ).toString(),
                                            a = Math.max(
                                                (window.screen.availWidth - r) /
                                                    2,
                                                0
                                            ).toString();
                                        let u = '';
                                        const m = Object.assign(
                                                Object.assign({}, Ia),
                                                {
                                                    width: r.toString(),
                                                    height: i.toString(),
                                                    top: s,
                                                    left: a,
                                                }
                                            ),
                                            g = (0, d.z$)().toLowerCase();
                                        t && (u = kr(g) ? '_blank' : t),
                                            Ar(g) &&
                                                ((e = e || 'http://localhost'),
                                                (m.scrollbars = 'yes'));
                                        const y = Object.entries(m).reduce(
                                            (P, [F, Qe]) => `${P}${F}=${Qe},`,
                                            ''
                                        );
                                        if (
                                            (function Xi(n = (0, d.z$)()) {
                                                var e;
                                                return (
                                                    ce(n) &&
                                                    !!(null ===
                                                        (e =
                                                            window.navigator) ||
                                                    void 0 === e
                                                        ? void 0
                                                        : e.standalone)
                                                );
                                            })(g) &&
                                            '_self' !== u
                                        )
                                            return (
                                                (function ka(n, e) {
                                                    const t =
                                                        document.createElement(
                                                            'a'
                                                        );
                                                    (t.href = n),
                                                        (t.target = e);
                                                    const r =
                                                        document.createEvent(
                                                            'MouseEvent'
                                                        );
                                                    r.initMouseEvent(
                                                        'click',
                                                        !0,
                                                        !0,
                                                        window,
                                                        1,
                                                        0,
                                                        0,
                                                        0,
                                                        0,
                                                        !1,
                                                        !1,
                                                        !1,
                                                        !1,
                                                        1,
                                                        null
                                                    ),
                                                        t.dispatchEvent(r);
                                                })(e || '', u),
                                                new pi(null)
                                            );
                                        const I = window.open(e || '', u, y);
                                        p(I, n, 'popup-blocked');
                                        try {
                                            I.focus();
                                        } catch (P) {}
                                        return new pi(I);
                                    })(e, u, Se());
                                })();
                            }
                            _openRedirect(e, t, r, i) {
                                var s = this;
                                return (0, o.Z)(function* () {
                                    return (
                                        yield s._originValidation(e),
                                        (function uo(n) {
                                            w().location.href = n;
                                        })(Yn(e, t, r, E(), i)),
                                        new Promise(() => {})
                                    );
                                })();
                            }
                            _initialize(e) {
                                const t = e._key();
                                if (this.eventManagers[t]) {
                                    const { manager: i, promise: s } =
                                        this.eventManagers[t];
                                    return i
                                        ? Promise.resolve(i)
                                        : (l(
                                              s,
                                              'If manager is not set, promise should be'
                                          ),
                                          s);
                                }
                                const r = this.initAndGetManager(e);
                                return (
                                    (this.eventManagers[t] = { promise: r }),
                                    r.catch(() => {
                                        delete this.eventManagers[t];
                                    }),
                                    r
                                );
                            }
                            initAndGetManager(e) {
                                var t = this;
                                return (0, o.Z)(function* () {
                                    const r = yield (function va(n) {
                                            return Jn.apply(this, arguments);
                                        })(e),
                                        i = new ci(e);
                                    return (
                                        r.register(
                                            'authEvent',
                                            (s) => (
                                                p(
                                                    null == s
                                                        ? void 0
                                                        : s.authEvent,
                                                    e,
                                                    'invalid-auth-event'
                                                ),
                                                {
                                                    status: i.onEvent(
                                                        s.authEvent
                                                    )
                                                        ? 'ACK'
                                                        : 'ERROR',
                                                }
                                            ),
                                            gapi.iframes
                                                .CROSS_ORIGIN_IFRAMES_FILTER
                                        ),
                                        (t.eventManagers[e._key()] = {
                                            manager: i,
                                        }),
                                        (t.iframes[e._key()] = r),
                                        i
                                    );
                                })();
                            }
                            _isIframeWebStorageSupported(e, t) {
                                this.iframes[e._key()].send(
                                    Xn,
                                    { type: Xn },
                                    (i) => {
                                        var s;
                                        const a =
                                            null ===
                                                (s =
                                                    null == i
                                                        ? void 0
                                                        : i[0]) || void 0 === s
                                                ? void 0
                                                : s[Xn];
                                        void 0 !== a && t(!!a),
                                            k(e, 'internal-error');
                                    },
                                    gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
                                );
                            }
                            _originValidation(e) {
                                const t = e._key();
                                return (
                                    this.originValidationPromises[t] ||
                                        (this.originValidationPromises[t] =
                                            (function aa(n) {
                                                return Kn.apply(
                                                    this,
                                                    arguments
                                                );
                                            })(e)),
                                    this.originValidationPromises[t]
                                );
                            }
                            get _shouldInitProactively() {
                                return Pr() || Et() || ce();
                            }
                        }
                    )),
                        (this.cordovaResolver = h(
                            class Xa {
                                constructor() {
                                    (this._redirectPersistence = J),
                                        (this._shouldInitProactively = !0),
                                        (this.eventManagers = new Map()),
                                        (this.originValidationPromises = {}),
                                        (this._completeRedirectFn = Je),
                                        (this._overrideRedirectResult = Wn);
                                }
                                _initialize(e) {
                                    var t = this;
                                    return (0, o.Z)(function* () {
                                        const r = e._key();
                                        let i = t.eventManagers.get(r);
                                        return (
                                            i ||
                                                ((i = new Ga(e)),
                                                t.eventManagers.set(r, i),
                                                t.attachCallbackListeners(
                                                    e,
                                                    i
                                                )),
                                            i
                                        );
                                    })();
                                }
                                _openPopup(e) {
                                    k(
                                        e,
                                        'operation-not-supported-in-this-environment'
                                    );
                                }
                                _openRedirect(e, t, r, i) {
                                    var s = this;
                                    return (0, o.Z)(function* () {
                                        !(function Va(n) {
                                            var e, t, r, i, s, a, u, m, g, y;
                                            const I = se();
                                            p(
                                                'function' ==
                                                    typeof (null ===
                                                        (e =
                                                            null == I
                                                                ? void 0
                                                                : I.universalLinks) ||
                                                    void 0 === e
                                                        ? void 0
                                                        : e.subscribe),
                                                n,
                                                'invalid-cordova-configuration',
                                                {
                                                    missingPlugin:
                                                        'cordova-universal-links-plugin-fix',
                                                }
                                            ),
                                                p(
                                                    void 0 !==
                                                        (null ===
                                                            (t =
                                                                null == I
                                                                    ? void 0
                                                                    : I.BuildInfo) ||
                                                        void 0 === t
                                                            ? void 0
                                                            : t.packageName),
                                                    n,
                                                    'invalid-cordova-configuration',
                                                    {
                                                        missingPlugin:
                                                            'cordova-plugin-buildInfo',
                                                    }
                                                ),
                                                p(
                                                    'function' ==
                                                        typeof (null ===
                                                            (s =
                                                                null ===
                                                                    (i =
                                                                        null ===
                                                                            (r =
                                                                                null ==
                                                                                I
                                                                                    ? void 0
                                                                                    : I.cordova) ||
                                                                        void 0 ===
                                                                            r
                                                                            ? void 0
                                                                            : r.plugins) ||
                                                                void 0 === i
                                                                    ? void 0
                                                                    : i.browsertab) ||
                                                        void 0 === s
                                                            ? void 0
                                                            : s.openUrl),
                                                    n,
                                                    'invalid-cordova-configuration',
                                                    {
                                                        missingPlugin:
                                                            'cordova-plugin-browsertab',
                                                    }
                                                ),
                                                p(
                                                    'function' ==
                                                        typeof (null ===
                                                            (m =
                                                                null ===
                                                                    (u =
                                                                        null ===
                                                                            (a =
                                                                                null ==
                                                                                I
                                                                                    ? void 0
                                                                                    : I.cordova) ||
                                                                        void 0 ===
                                                                            a
                                                                            ? void 0
                                                                            : a.plugins) ||
                                                                void 0 === u
                                                                    ? void 0
                                                                    : u.browsertab) ||
                                                        void 0 === m
                                                            ? void 0
                                                            : m.isAvailable),
                                                    n,
                                                    'invalid-cordova-configuration',
                                                    {
                                                        missingPlugin:
                                                            'cordova-plugin-browsertab',
                                                    }
                                                ),
                                                p(
                                                    'function' ==
                                                        typeof (null ===
                                                            (y =
                                                                null ===
                                                                    (g =
                                                                        null ==
                                                                        I
                                                                            ? void 0
                                                                            : I.cordova) ||
                                                                void 0 === g
                                                                    ? void 0
                                                                    : g.InAppBrowser) ||
                                                        void 0 === y
                                                            ? void 0
                                                            : y.open),
                                                    n,
                                                    'invalid-cordova-configuration',
                                                    {
                                                        missingPlugin:
                                                            'cordova-plugin-inappbrowser',
                                                    }
                                                );
                                        })(e);
                                        const a = yield s._initialize(e);
                                        yield a.initialized(),
                                            a.resetRedirect(),
                                            (function Ko() {
                                                Ne.clear();
                                            })(),
                                            yield s._originValidation(e);
                                        const u = (function qa(n, e, t = null) {
                                            return {
                                                type: e,
                                                eventId: t,
                                                urlResponse: null,
                                                sessionId: $a(),
                                                postBody: null,
                                                tenantId: n.tenantId,
                                                error: b(n, 'no-auth-event'),
                                            };
                                        })(e, r, i);
                                        yield (function ja(n, e) {
                                            return sr()._set(or(n), e);
                                        })(e, u);
                                        const m = yield (function Ma(n, e, t) {
                                                return er.apply(
                                                    this,
                                                    arguments
                                                );
                                            })(e, u, t),
                                            g = yield (function Fa(n) {
                                                const { cordova: e } = se();
                                                return new Promise((t) => {
                                                    e.plugins.browsertab.isAvailable(
                                                        (r) => {
                                                            let i = null;
                                                            r
                                                                ? e.plugins.browsertab.openUrl(
                                                                      n
                                                                  )
                                                                : (i =
                                                                      e.InAppBrowser.open(
                                                                          n,
                                                                          (function Yi(
                                                                              n = (0,
                                                                              d.z$)()
                                                                          ) {
                                                                              return (
                                                                                  /(iPad|iPhone|iPod).*OS 7_\d/i.test(
                                                                                      n
                                                                                  ) ||
                                                                                  /(iPad|iPhone|iPod).*OS 8_\d/i.test(
                                                                                      n
                                                                                  )
                                                                              );
                                                                          })()
                                                                              ? '_blank'
                                                                              : '_system',
                                                                          'location=yes'
                                                                      )),
                                                                t(i);
                                                        }
                                                    );
                                                });
                                            })(m);
                                        return (function Za(n, e, t) {
                                            return nr.apply(this, arguments);
                                        })(e, a, g);
                                    })();
                                }
                                _isIframeWebStorageSupported(e, t) {
                                    throw new Error('Method not implemented.');
                                }
                                _originValidation(e) {
                                    const t = e._key();
                                    return (
                                        this.originValidationPromises[t] ||
                                            (this.originValidationPromises[t] =
                                                (function Ua(n) {
                                                    return tr.apply(
                                                        this,
                                                        arguments
                                                    );
                                                })(e)),
                                        this.originValidationPromises[t]
                                    );
                                }
                                attachCallbackListeners(e, t) {
                                    const {
                                            universalLinks: r,
                                            handleOpenURL: i,
                                            BuildInfo: s,
                                        } = se(),
                                        a = setTimeout(
                                            (0, o.Z)(function* () {
                                                yield vi(e), t.onEvent(Ii());
                                            }),
                                            500
                                        ),
                                        u = (function () {
                                            var y = (0, o.Z)(function* (I) {
                                                clearTimeout(a);
                                                const P = yield vi(e);
                                                let F = null;
                                                P &&
                                                    (null == I
                                                        ? void 0
                                                        : I.url) &&
                                                    (F = (function Ba(n, e) {
                                                        var t, r;
                                                        const i = (function Ja(
                                                            n
                                                        ) {
                                                            const e = Xe(n),
                                                                t = e.link
                                                                    ? decodeURIComponent(
                                                                          e.link
                                                                      )
                                                                    : void 0,
                                                                r = Xe(t).link,
                                                                i =
                                                                    e.deep_link_id
                                                                        ? decodeURIComponent(
                                                                              e.deep_link_id
                                                                          )
                                                                        : void 0;
                                                            return (
                                                                Xe(i).link ||
                                                                i ||
                                                                r ||
                                                                t ||
                                                                n
                                                            );
                                                        })(e);
                                                        if (
                                                            i.includes(
                                                                '/__/auth/callback'
                                                            )
                                                        ) {
                                                            const s = Xe(i),
                                                                a =
                                                                    s.firebaseError
                                                                        ? (function Ka(
                                                                              n
                                                                          ) {
                                                                              try {
                                                                                  return JSON.parse(
                                                                                      n
                                                                                  );
                                                                              } catch (e) {
                                                                                  return null;
                                                                              }
                                                                          })(
                                                                              decodeURIComponent(
                                                                                  s.firebaseError
                                                                              )
                                                                          )
                                                                        : null,
                                                                u =
                                                                    null ===
                                                                        (r =
                                                                            null ===
                                                                                (t =
                                                                                    null ==
                                                                                    a
                                                                                        ? void 0
                                                                                        : a.code) ||
                                                                            void 0 ===
                                                                                t
                                                                                ? void 0
                                                                                : t.split(
                                                                                      'auth/'
                                                                                  )) ||
                                                                    void 0 === r
                                                                        ? void 0
                                                                        : r[1],
                                                                m = u
                                                                    ? b(u)
                                                                    : null;
                                                            return m
                                                                ? {
                                                                      type: n.type,
                                                                      eventId:
                                                                          n.eventId,
                                                                      tenantId:
                                                                          n.tenantId,
                                                                      error: m,
                                                                      urlResponse:
                                                                          null,
                                                                      sessionId:
                                                                          null,
                                                                      postBody:
                                                                          null,
                                                                  }
                                                                : {
                                                                      type: n.type,
                                                                      eventId:
                                                                          n.eventId,
                                                                      tenantId:
                                                                          n.tenantId,
                                                                      sessionId:
                                                                          n.sessionId,
                                                                      urlResponse:
                                                                          i,
                                                                      postBody:
                                                                          null,
                                                                  };
                                                        }
                                                        return null;
                                                    })(P, I.url)),
                                                    t.onEvent(F || Ii());
                                            });
                                            return function (P) {
                                                return y.apply(this, arguments);
                                            };
                                        })();
                                    void 0 !== r &&
                                        'function' == typeof r.subscribe &&
                                        r.subscribe(null, u);
                                    const m = i,
                                        g = `${s.packageName.toLowerCase()}://`;
                                    se().handleOpenURL = (function () {
                                        var y = (0, o.Z)(function* (I) {
                                            if (
                                                (I.toLowerCase().startsWith(
                                                    g
                                                ) && u({ url: I }),
                                                'function' == typeof m)
                                            )
                                                try {
                                                    m(I);
                                                } catch (P) {
                                                    console.error(P);
                                                }
                                        });
                                        return function (I) {
                                            return y.apply(this, arguments);
                                        };
                                    })();
                                }
                            }
                        )),
                        (this.underlyingResolver = null),
                        (this._redirectPersistence = J),
                        (this._completeRedirectFn = Je),
                        (this._overrideRedirectResult = Wn);
                }
                _initialize(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return (
                            yield t.selectUnderlyingResolver(),
                            t.assertedUnderlyingResolver._initialize(e)
                        );
                    })();
                }
                _openPopup(e, t, r, i) {
                    var s = this;
                    return (0, o.Z)(function* () {
                        return (
                            yield s.selectUnderlyingResolver(),
                            s.assertedUnderlyingResolver._openPopup(e, t, r, i)
                        );
                    })();
                }
                _openRedirect(e, t, r, i) {
                    var s = this;
                    return (0, o.Z)(function* () {
                        return (
                            yield s.selectUnderlyingResolver(),
                            s.assertedUnderlyingResolver._openRedirect(
                                e,
                                t,
                                r,
                                i
                            )
                        );
                    })();
                }
                _isIframeWebStorageSupported(e, t) {
                    this.assertedUnderlyingResolver._isIframeWebStorageSupported(
                        e,
                        t
                    );
                }
                _originValidation(e) {
                    return this.assertedUnderlyingResolver._originValidation(e);
                }
                get _shouldInitProactively() {
                    return Ti() || this.browserResolver._shouldInitProactively;
                }
                get assertedUnderlyingResolver() {
                    return (
                        fu(this.underlyingResolver, 'internal-error'),
                        this.underlyingResolver
                    );
                }
                selectUnderlyingResolver() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        if (e.underlyingResolver) return;
                        const t = yield (function cu() {
                            return cr.apply(this, arguments);
                        })();
                        e.underlyingResolver = t
                            ? e.cordovaResolver
                            : e.browserResolver;
                    })();
                }
            }
            function ki(n) {
                return n.unwrap();
            }
            function mu(n) {
                return bi(n);
            }
            function bi(n) {
                const { _tokenResponse: e } =
                    n instanceof d.ZR ? n.customData : n;
                if (!e) return null;
                if (
                    !(n instanceof d.ZR) &&
                    'temporaryProof' in e &&
                    'phoneNumber' in e
                )
                    return Pe.credentialFromResult(n);
                const t = e.providerId;
                if (!t || 'password' === t) return null;
                let r;
                switch (t) {
                    case 'google.com':
                        r = Ur;
                        break;
                    case 'facebook.com':
                        r = Mr;
                        break;
                    case 'github.com':
                        r = Fr;
                        break;
                    case 'twitter.com':
                        r = Zr;
                        break;
                    default:
                        const {
                            oauthIdToken: i,
                            oauthAccessToken: s,
                            oauthTokenSecret: a,
                            pendingToken: u,
                            nonce: m,
                        } = e;
                        return s || a || i || u
                            ? u
                                ? t.startsWith('saml.')
                                    ? fe._create(t, u)
                                    : W._fromParams({
                                          providerId: t,
                                          signInMethod: t,
                                          pendingToken: u,
                                          idToken: i,
                                          accessToken: s,
                                      })
                                : new he(t).credential({
                                      idToken: i,
                                      accessToken: s,
                                      rawNonce: m,
                                  })
                            : null;
                }
                return n instanceof d.ZR
                    ? r.credentialFromError(n)
                    : r.credentialFromResult(n);
            }
            function L(n, e) {
                return e
                    .catch((t) => {
                        throw (
                            (t instanceof d.ZR &&
                                (function _u(n, e) {
                                    var t;
                                    const r =
                                        null === (t = e.customData) ||
                                        void 0 === t
                                            ? void 0
                                            : t._tokenResponse;
                                    if (
                                        'auth/multi-factor-auth-required' ===
                                        e.code
                                    )
                                        e.resolver = new gu(
                                            n,
                                            (function Ys(n, e) {
                                                var t;
                                                const r = (0, d.m9)(n),
                                                    i = e;
                                                return (
                                                    p(
                                                        e.customData
                                                            .operationType,
                                                        r,
                                                        'argument-error'
                                                    ),
                                                    p(
                                                        null ===
                                                            (t =
                                                                i.customData
                                                                    ._serverResponse) ||
                                                            void 0 === t
                                                            ? void 0
                                                            : t.mfaPendingCredential,
                                                        r,
                                                        'argument-error'
                                                    ),
                                                    _n._fromError(r, i)
                                                );
                                            })(n, e)
                                        );
                                    else if (r) {
                                        const i = bi(e),
                                            s = e;
                                        i &&
                                            ((s.credential = i),
                                            (s.tenantId = r.tenantId || void 0),
                                            (s.email = r.email || void 0),
                                            (s.phoneNumber =
                                                r.phoneNumber || void 0));
                                    }
                                })(n, t),
                            t)
                        );
                    })
                    .then((t) => {
                        const i = t.user;
                        return {
                            operationType: t.operationType,
                            credential: mu(t),
                            additionalUserInfo: Js(t),
                            user: $.getOrCreate(i),
                        };
                    });
            }
            function hr(n, e) {
                return fr.apply(this, arguments);
            }
            function fr() {
                return (fr = (0, o.Z)(function* (n, e) {
                    const t = yield e;
                    return {
                        verificationId: t.verificationId,
                        confirm: (r) => L(n, t.confirm(r)),
                    };
                })).apply(this, arguments);
            }
            class gu {
                constructor(e, t) {
                    (this.resolver = t),
                        (this.auth = (function pu(n) {
                            return n.wrapped();
                        })(e));
                }
                get session() {
                    return this.resolver.session;
                }
                get hints() {
                    return this.resolver.hints;
                }
                resolveSignIn(e) {
                    return L(ki(this.auth), this.resolver.resolveSignIn(e));
                }
            }
            class $ {
                constructor(e) {
                    (this._delegate = e),
                        (this.multiFactor = (function to(n) {
                            const e = (0, d.m9)(n);
                            return (
                                vn.has(e) || vn.set(e, gn._fromUser(e)),
                                vn.get(e)
                            );
                        })(e));
                }
                static getOrCreate(e) {
                    return (
                        $.USER_MAP.has(e) || $.USER_MAP.set(e, new $(e)),
                        $.USER_MAP.get(e)
                    );
                }
                delete() {
                    return this._delegate.delete();
                }
                reload() {
                    return this._delegate.reload();
                }
                toJSON() {
                    return this._delegate.toJSON();
                }
                getIdTokenResult(e) {
                    return this._delegate.getIdTokenResult(e);
                }
                getIdToken(e) {
                    return this._delegate.getIdToken(e);
                }
                linkAndRetrieveDataWithCredential(e) {
                    return this.linkWithCredential(e);
                }
                linkWithCredential(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return L(t.auth, jr(t._delegate, e));
                    })();
                }
                linkWithPhoneNumber(e, t) {
                    var r = this;
                    return (0, o.Z)(function* () {
                        return hr(
                            r.auth,
                            (function Mo(n, e, t) {
                                return wn.apply(this, arguments);
                            })(r._delegate, e, t)
                        );
                    })();
                }
                linkWithPopup(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return L(
                            t.auth,
                            (function qo(n, e, t) {
                                return Mn.apply(this, arguments);
                            })(t._delegate, e, Y)
                        );
                    })();
                }
                linkWithRedirect(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return (
                            yield lr(O(t.auth)),
                            (function ea(n, e, t) {
                                return (function ta(n, e, t) {
                                    return Gn.apply(this, arguments);
                                })(n, e, t);
                            })(t._delegate, e, Y)
                        );
                    })();
                }
                reauthenticateAndRetrieveDataWithCredential(e) {
                    return this.reauthenticateWithCredential(e);
                }
                reauthenticateWithCredential(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return L(t.auth, Br(t._delegate, e));
                    })();
                }
                reauthenticateWithPhoneNumber(e, t) {
                    return hr(
                        this.auth,
                        (function Uo(n, e, t) {
                            return Pn.apply(this, arguments);
                        })(this._delegate, e, t)
                    );
                }
                reauthenticateWithPopup(e) {
                    return L(
                        this.auth,
                        (function Go(n, e, t) {
                            return xn.apply(this, arguments);
                        })(this._delegate, e, Y)
                    );
                }
                reauthenticateWithRedirect(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return (
                            yield lr(O(t.auth)),
                            (function Xo(n, e, t) {
                                return (function Qo(n, e, t) {
                                    return zn.apply(this, arguments);
                                })(n, e, t);
                            })(t._delegate, e, Y)
                        );
                    })();
                }
                sendEmailVerification(e) {
                    return (function Zs(n, e) {
                        return ln.apply(this, arguments);
                    })(this._delegate, e);
                }
                unlink(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return (
                            yield (function ks(n, e) {
                                return Wt.apply(this, arguments);
                            })(t._delegate, e),
                            t
                        );
                    })();
                }
                updateEmail(e) {
                    return (function zs(n, e) {
                        return Kr((0, d.m9)(n), e, null);
                    })(this._delegate, e);
                }
                updatePassword(e) {
                    return (function Gs(n, e) {
                        return Kr((0, d.m9)(n), null, e);
                    })(this._delegate, e);
                }
                updatePhoneNumber(e) {
                    return (function Fo(n, e) {
                        return On.apply(this, arguments);
                    })(this._delegate, e);
                }
                updateProfile(e) {
                    return (function Hs(n, e) {
                        return fn.apply(this, arguments);
                    })(this._delegate, e);
                }
                verifyBeforeUpdateEmail(e, t) {
                    return (function Vs(n, e, t) {
                        return dn.apply(this, arguments);
                    })(this._delegate, e, t);
                }
                get emailVerified() {
                    return this._delegate.emailVerified;
                }
                get isAnonymous() {
                    return this._delegate.isAnonymous;
                }
                get metadata() {
                    return this._delegate.metadata;
                }
                get phoneNumber() {
                    return this._delegate.phoneNumber;
                }
                get providerData() {
                    return this._delegate.providerData;
                }
                get refreshToken() {
                    return this._delegate.refreshToken;
                }
                get tenantId() {
                    return this._delegate.tenantId;
                }
                get displayName() {
                    return this._delegate.displayName;
                }
                get email() {
                    return this._delegate.email;
                }
                get photoURL() {
                    return this._delegate.photoURL;
                }
                get providerId() {
                    return this._delegate.providerId;
                }
                get uid() {
                    return this._delegate.uid;
                }
                get auth() {
                    return this._delegate.auth;
                }
            }
            $.USER_MAP = new WeakMap();
            const Le = p;
            let Si = (() => {
                class n {
                    constructor(t, r) {
                        if (((this.app = t), r.isInitialized()))
                            return (
                                (this._delegate = r.getImmediate()),
                                void this.linkUnderlyingAuth()
                            );
                        const { apiKey: i } = t.options;
                        Le(i, 'invalid-api-key', { appName: t.name }),
                            Le(i, 'invalid-api-key', { appName: t.name });
                        const s = 'undefined' != typeof window ? Y : void 0;
                        (this._delegate = r.initialize({
                            options: {
                                persistence: vu(i, t.name),
                                popupRedirectResolver: s,
                            },
                        })),
                            this._delegate._updateErrorMap(Ir),
                            this.linkUnderlyingAuth();
                    }
                    get emulatorConfig() {
                        return this._delegate.emulatorConfig;
                    }
                    get currentUser() {
                        return this._delegate.currentUser
                            ? $.getOrCreate(this._delegate.currentUser)
                            : null;
                    }
                    get languageCode() {
                        return this._delegate.languageCode;
                    }
                    set languageCode(t) {
                        this._delegate.languageCode = t;
                    }
                    get settings() {
                        return this._delegate.settings;
                    }
                    get tenantId() {
                        return this._delegate.tenantId;
                    }
                    set tenantId(t) {
                        this._delegate.tenantId = t;
                    }
                    useDeviceLanguage() {
                        this._delegate.useDeviceLanguage();
                    }
                    signOut() {
                        return this._delegate.signOut();
                    }
                    useEmulator(t, r) {
                        !(function rs(n, e, t) {
                            const r = O(n);
                            p(r._canInitEmulator, r, 'emulator-config-failed'),
                                p(
                                    /^https?:\/\//.test(e),
                                    r,
                                    'invalid-emulator-scheme'
                                );
                            const i = !!(null == t
                                    ? void 0
                                    : t.disableWarnings),
                                s = Cr(e),
                                { host: a, port: u } = (function is(n) {
                                    const e = Cr(n),
                                        t = /(\/\/)?([^?#/]+)/.exec(
                                            n.substr(e.length)
                                        );
                                    if (!t) return { host: '', port: null };
                                    const r = t[2].split('@').pop() || '',
                                        i = /^(\[[^\]]+\])(:|$)/.exec(r);
                                    if (i) {
                                        const s = i[1];
                                        return {
                                            host: s,
                                            port: Lr(r.substr(s.length + 1)),
                                        };
                                    }
                                    {
                                        const [s, a] = r.split(':');
                                        return { host: s, port: Lr(a) };
                                    }
                                })(e);
                            (r.config.emulator = {
                                url: `${s}//${a}${null === u ? '' : `:${u}`}/`,
                            }),
                                (r.settings.appVerificationDisabledForTesting =
                                    !0),
                                (r.emulatorConfig = Object.freeze({
                                    host: a,
                                    port: u,
                                    protocol: s.replace(':', ''),
                                    options: Object.freeze({
                                        disableWarnings: i,
                                    }),
                                })),
                                i ||
                                    (function ss() {
                                        function n() {
                                            const e =
                                                    document.createElement('p'),
                                                t = e.style;
                                            (e.innerText =
                                                'Running in emulator mode. Do not use with production credentials.'),
                                                (t.position = 'fixed'),
                                                (t.width = '100%'),
                                                (t.backgroundColor = '#ffffff'),
                                                (t.border =
                                                    '.1em solid #000000'),
                                                (t.color = '#b50000'),
                                                (t.bottom = '0px'),
                                                (t.left = '0px'),
                                                (t.margin = '0px'),
                                                (t.zIndex = '10000'),
                                                (t.textAlign = 'center'),
                                                e.classList.add(
                                                    'firebase-emulator-warning'
                                                ),
                                                document.body.appendChild(e);
                                        }
                                        'undefined' != typeof console &&
                                            'function' == typeof console.info &&
                                            console.info(
                                                'WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.'
                                            ),
                                            'undefined' != typeof window &&
                                                'undefined' !=
                                                    typeof document &&
                                                ('loading' ===
                                                document.readyState
                                                    ? window.addEventListener(
                                                          'DOMContentLoaded',
                                                          n
                                                      )
                                                    : n());
                                    })();
                        })(this._delegate, t, r);
                    }
                    applyActionCode(t) {
                        return (function Ns(n, e) {
                            return tn.apply(this, arguments);
                        })(this._delegate, t);
                    }
                    checkActionCode(t) {
                        return $r(this._delegate, t);
                    }
                    confirmPasswordReset(t, r) {
                        return (function Ps(n, e, t) {
                            return en.apply(this, arguments);
                        })(this._delegate, t, r);
                    }
                    createUserWithEmailAndPassword(t, r) {
                        var i = this;
                        return (0, o.Z)(function* () {
                            return L(
                                i._delegate,
                                (function Cs(n, e, t) {
                                    return sn.apply(this, arguments);
                                })(i._delegate, t, r)
                            );
                        })();
                    }
                    fetchProvidersForEmail(t) {
                        return this.fetchSignInMethodsForEmail(t);
                    }
                    fetchSignInMethodsForEmail(t) {
                        return (function Fs(n, e) {
                            return cn.apply(this, arguments);
                        })(this._delegate, t);
                    }
                    isSignInWithEmailLink(t) {
                        return (function xs(n, e) {
                            const t = be.parseLink(e);
                            return (
                                'EMAIL_SIGNIN' ===
                                (null == t ? void 0 : t.operation)
                            );
                        })(0, t);
                    }
                    getRedirectResult() {
                        var t = this;
                        return (0, o.Z)(function* () {
                            Le(
                                ur(),
                                t._delegate,
                                'operation-not-supported-in-this-environment'
                            );
                            const r = yield (function na(n, e) {
                                return qn.apply(this, arguments);
                            })(t._delegate, Y);
                            return r
                                ? L(t._delegate, Promise.resolve(r))
                                : { credential: null, user: null };
                        })();
                    }
                    addFrameworkForLogging(t) {
                        !(function eu(n, e) {
                            O(n)._logFramework(e);
                        })(this._delegate, t);
                    }
                    onAuthStateChanged(t, r, i) {
                        const { next: s, error: a, complete: u } = wi(t, r, i);
                        return this._delegate.onAuthStateChanged(s, a, u);
                    }
                    onIdTokenChanged(t, r, i) {
                        const { next: s, error: a, complete: u } = wi(t, r, i);
                        return this._delegate.onIdTokenChanged(s, a, u);
                    }
                    sendSignInLinkToEmail(t, r) {
                        return (function Ds(n, e, t) {
                            return on.apply(this, arguments);
                        })(this._delegate, t, r);
                    }
                    sendPasswordResetEmail(t, r) {
                        return (function ws(n, e, t) {
                            return Qt.apply(this, arguments);
                        })(this._delegate, t, r || void 0);
                    }
                    setPersistence(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            let i;
                            switch (
                                ((function du(n, e) {
                                    Ce(
                                        Object.values(D).includes(e),
                                        n,
                                        'invalid-persistence-type'
                                    ),
                                        (0, d.b$)()
                                            ? Ce(
                                                  e !== D.SESSION,
                                                  n,
                                                  'unsupported-persistence-type'
                                              )
                                            : (0, d.UG)()
                                            ? Ce(
                                                  e === D.NONE,
                                                  n,
                                                  'unsupported-persistence-type'
                                              )
                                            : ar()
                                            ? Ce(
                                                  e === D.NONE ||
                                                      (e === D.LOCAL &&
                                                          (0, d.hl)()),
                                                  n,
                                                  'unsupported-persistence-type'
                                              )
                                            : Ce(
                                                  e === D.NONE || Ei(),
                                                  n,
                                                  'unsupported-persistence-type'
                                              );
                                })(r._delegate, t),
                                t)
                            ) {
                                case D.SESSION:
                                    i = J;
                                    break;
                                case D.LOCAL:
                                    i = (yield h(me)._isAvailable()) ? me : qe;
                                    break;
                                case D.NONE:
                                    i = ae;
                                    break;
                                default:
                                    return k('argument-error', {
                                        appName: r._delegate.name,
                                    });
                            }
                            return r._delegate.setPersistence(i);
                        })();
                    }
                    signInAndRetrieveDataWithCredential(t) {
                        return this.signInWithCredential(t);
                    }
                    signInAnonymously() {
                        return L(
                            this._delegate,
                            (function As(n) {
                                return Vt.apply(this, arguments);
                            })(this._delegate)
                        );
                    }
                    signInWithCredential(t) {
                        return L(this._delegate, We(this._delegate, t));
                    }
                    signInWithCustomToken(t) {
                        return L(
                            this._delegate,
                            (function Ss(n, e) {
                                return Yt.apply(this, arguments);
                            })(this._delegate, t)
                        );
                    }
                    signInWithEmailAndPassword(t, r) {
                        return L(
                            this._delegate,
                            (function Ls(n, e, t) {
                                return We((0, d.m9)(n), Ft.credential(e, t));
                            })(this._delegate, t, r)
                        );
                    }
                    signInWithEmailLink(t, r) {
                        return L(
                            this._delegate,
                            (function Ms(n, e, t) {
                                return an.apply(this, arguments);
                            })(this._delegate, t, r)
                        );
                    }
                    signInWithPhoneNumber(t, r) {
                        return hr(
                            this._delegate,
                            (function xo(n, e, t) {
                                return Sn.apply(this, arguments);
                            })(this._delegate, t, r)
                        );
                    }
                    signInWithPopup(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            return (
                                Le(
                                    ur(),
                                    r._delegate,
                                    'operation-not-supported-in-this-environment'
                                ),
                                L(
                                    r._delegate,
                                    (function zo(n, e, t) {
                                        return Dn.apply(this, arguments);
                                    })(r._delegate, t, Y)
                                )
                            );
                        })();
                    }
                    signInWithRedirect(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            return (
                                Le(
                                    ur(),
                                    r._delegate,
                                    'operation-not-supported-in-this-environment'
                                ),
                                yield lr(r._delegate),
                                (function Jo(n, e, t) {
                                    return (function Yo(n, e, t) {
                                        return Hn.apply(this, arguments);
                                    })(n, e, t);
                                })(r._delegate, t, Y)
                            );
                        })();
                    }
                    updateCurrentUser(t) {
                        return this._delegate.updateCurrentUser(t);
                    }
                    verifyPasswordResetCode(t) {
                        return (function Os(n, e) {
                            return rn.apply(this, arguments);
                        })(this._delegate, t);
                    }
                    unwrap() {
                        return this._delegate;
                    }
                    _delete() {
                        return this._delegate._delete();
                    }
                    linkUnderlyingAuth() {
                        this._delegate.wrapped = () => this;
                    }
                }
                return (n.Persistence = D), n;
            })();
            function wi(n, e, t) {
                let r = n;
                'function' != typeof n &&
                    ({ next: r, error: e, complete: t } = n);
                const i = r;
                return {
                    next: (a) => i(a && $.getOrCreate(a)),
                    error: e,
                    complete: t,
                };
            }
            function vu(n, e) {
                const t = (function hu(n, e) {
                    const t = Ai();
                    if (!t) return [];
                    const r = te(Ri, n, e);
                    switch (t.getItem(r)) {
                        case D.NONE:
                            return [ae];
                        case D.LOCAL:
                            return [me, J];
                        case D.SESSION:
                            return [J];
                        default:
                            return [];
                    }
                })(n, e);
                if (
                    ('undefined' != typeof self &&
                        !t.includes(me) &&
                        t.push(me),
                    'undefined' != typeof window)
                )
                    for (const r of [qe, J]) t.includes(r) || t.push(r);
                return t.includes(ae) || t.push(ae), t;
            }
            class pr {
                constructor() {
                    (this.providerId = 'phone'),
                        (this._delegate = new Pe(ki(_e.Z.auth())));
                }
                static credential(e, t) {
                    return Pe.credential(e, t);
                }
                verifyPhoneNumber(e, t) {
                    return this._delegate.verifyPhoneNumber(e, t);
                }
                unwrap() {
                    return this._delegate;
                }
            }
            (pr.PHONE_SIGN_IN_METHOD = Pe.PHONE_SIGN_IN_METHOD),
                (pr.PROVIDER_ID = Pe.PROVIDER_ID);
            const Iu = p;
            class yu {
                constructor(e, t, r = _e.Z.app()) {
                    var i;
                    Iu(
                        null === (i = r.options) || void 0 === i
                            ? void 0
                            : i.apiKey,
                        'invalid-api-key',
                        { appName: r.name }
                    ),
                        (this._delegate = new Lo(e, t, r.auth())),
                        (this.type = this._delegate.type);
                }
                clear() {
                    this._delegate.clear();
                }
                render() {
                    return this._delegate.render();
                }
                verify() {
                    return this._delegate.verify();
                }
            }
            !(function Tu(n) {
                n.INTERNAL.registerComponent(
                    new xe.wA(
                        'auth-compat',
                        (e) => {
                            const t = e
                                    .getProvider('app-compat')
                                    .getImmediate(),
                                r = e.getProvider('auth');
                            return new Si(t, r);
                        },
                        'PUBLIC'
                    )
                        .setServiceProps({
                            ActionCodeInfo: {
                                Operation: {
                                    EMAIL_SIGNIN: 'EMAIL_SIGNIN',
                                    PASSWORD_RESET: 'PASSWORD_RESET',
                                    RECOVER_EMAIL: 'RECOVER_EMAIL',
                                    REVERT_SECOND_FACTOR_ADDITION:
                                        'REVERT_SECOND_FACTOR_ADDITION',
                                    VERIFY_AND_CHANGE_EMAIL:
                                        'VERIFY_AND_CHANGE_EMAIL',
                                    VERIFY_EMAIL: 'VERIFY_EMAIL',
                                },
                            },
                            EmailAuthProvider: Ft,
                            FacebookAuthProvider: Mr,
                            GithubAuthProvider: Fr,
                            GoogleAuthProvider: Ur,
                            OAuthProvider: he,
                            SAMLAuthProvider: Fe,
                            PhoneAuthProvider: pr,
                            PhoneMultiFactorGenerator: Oa,
                            RecaptchaVerifier: yu,
                            TwitterAuthProvider: Zr,
                            Auth: Si,
                            AuthCredential: le,
                            Error: d.ZR,
                        })
                        .setInstantiationMode('LAZY')
                        .setMultipleInstances(!1)
                ),
                    n.registerVersion('@firebase/auth-compat', '0.2.15');
            })(_e.Z);
        },
        655: (xi, et, Z) => {
            Z.d(et, {
                Q_: () => ve,
                ZT: () => _e,
                _T: () => V,
                ev: () => st,
                pi: () => d,
            });
            var o = function (c, l) {
                return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                        function (f, h) {
                            f.__proto__ = h;
                        }) ||
                    function (f, h) {
                        for (var v in h)
                            Object.prototype.hasOwnProperty.call(h, v) &&
                                (f[v] = h[v]);
                    })(c, l);
            };
            function _e(c, l) {
                if ('function' != typeof l && null !== l)
                    throw new TypeError(
                        'Class extends value ' +
                            String(l) +
                            ' is not a constructor or null'
                    );
                function f() {
                    this.constructor = c;
                }
                o(c, l),
                    (c.prototype =
                        null === l
                            ? Object.create(l)
                            : ((f.prototype = l.prototype), new f()));
            }
            var d = function () {
                return (
                    (d =
                        Object.assign ||
                        function (l) {
                            for (var f, h = 1, v = arguments.length; h < v; h++)
                                for (var _ in (f = arguments[h]))
                                    Object.prototype.hasOwnProperty.call(
                                        f,
                                        _
                                    ) && (l[_] = f[_]);
                            return l;
                        }),
                    d.apply(this, arguments)
                );
            };
            function V(c, l) {
                var f = {};
                for (var h in c)
                    Object.prototype.hasOwnProperty.call(c, h) &&
                        l.indexOf(h) < 0 &&
                        (f[h] = c[h]);
                if (
                    null != c &&
                    'function' == typeof Object.getOwnPropertySymbols
                ) {
                    var v = 0;
                    for (h = Object.getOwnPropertySymbols(c); v < h.length; v++)
                        l.indexOf(h[v]) < 0 &&
                            Object.prototype.propertyIsEnumerable.call(
                                c,
                                h[v]
                            ) &&
                            (f[h[v]] = c[h[v]]);
                }
                return f;
            }
            function st(c, l, f) {
                if (f || 2 === arguments.length)
                    for (var _, h = 0, v = l.length; h < v; h++)
                        (_ || !(h in l)) &&
                            (_ || (_ = Array.prototype.slice.call(l, 0, h)),
                            (_[h] = l[h]));
                return c.concat(_ || Array.prototype.slice.call(l));
            }
            function ve(c, l, f, h) {
                if ('a' === f && !h)
                    throw new TypeError(
                        'Private accessor was defined without a getter'
                    );
                if ('function' == typeof l ? c !== l || !h : !l.has(c))
                    throw new TypeError(
                        'Cannot read private member from an object whose class did not declare it'
                    );
                return 'm' === f
                    ? h
                    : 'a' === f
                    ? h.call(c)
                    : h
                    ? h.value
                    : l.get(c);
            }
        },
    },
]);
