'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [999],
    {
        8999: (vu, Ri, x) => {
            x.r(Ri);
            var o = x(5861),
                Ze = x(3942),
                l = x(2090),
                M = x(9681),
                Ve = x(655),
                er = x(1877),
                We = x(4859);
            const Ai = function ki() {
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
                Si = function tr() {
                    return {
                        'dependent-sdk-initialized-before-auth':
                            'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
                    };
                },
                nr = new l.LL('auth', 'Firebase', {
                    'dependent-sdk-initialized-before-auth':
                        'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
                }),
                rr = new er.Yd('@firebase/auth');
            function ge(n, ...e) {
                rr.logLevel <= er.in.ERROR &&
                    rr.error(`Auth (${M.SDK_VERSION}): ${n}`, ...e);
            }
            function v(n, ...e) {
                throw He(n, ...e);
            }
            function E(n, ...e) {
                return He(n, ...e);
            }
            function ir(n, e, t) {
                const r = Object.assign(Object.assign({}, Si()), { [e]: t });
                return new l.LL('auth', 'Firebase', r).create(e, {
                    appName: n.name,
                });
            }
            function $(n, e, t) {
                if (!(e instanceof t))
                    throw (
                        (t.name !== e.constructor.name &&
                            v(n, 'argument-error'),
                        ir(
                            n,
                            'argument-error',
                            `Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`
                        ))
                    );
            }
            function He(n, ...e) {
                if ('string' != typeof n) {
                    const t = e[0],
                        r = [...e.slice(1)];
                    return (
                        r[0] && (r[0].appName = n.name),
                        n._errorFactory.create(t, ...r)
                    );
                }
                return nr.create(n, ...e);
            }
            function c(n, e, ...t) {
                if (!n) throw He(e, ...t);
            }
            function P(n) {
                const e = 'INTERNAL ASSERTION FAILED: ' + n;
                throw (ge(e), new Error(e));
            }
            function S(n, e) {
                n || P(e);
            }
            const sr = new Map();
            function R(n) {
                S(n instanceof Function, 'Expected a class definition');
                let e = sr.get(n);
                return e
                    ? (S(
                          e instanceof n,
                          'Instance stored in cache mismatched with class'
                      ),
                      e)
                    : ((e = new n()), sr.set(n, e), e);
            }
            function ie() {
                var n;
                return (
                    ('undefined' != typeof self &&
                        (null === (n = self.location) || void 0 === n
                            ? void 0
                            : n.href)) ||
                    ''
                );
            }
            function ze() {
                return 'http:' === or() || 'https:' === or();
            }
            function or() {
                var n;
                return (
                    ('undefined' != typeof self &&
                        (null === (n = self.location) || void 0 === n
                            ? void 0
                            : n.protocol)) ||
                    null
                );
            }
            class se {
                constructor(e, t) {
                    (this.shortDelay = e),
                        (this.longDelay = t),
                        S(t > e, 'Short delay should be less than long delay!'),
                        (this.isMobile = (0, l.uI)() || (0, l.b$)());
                }
                get() {
                    return (function bi() {
                        return (
                            !(
                                'undefined' != typeof navigator &&
                                navigator &&
                                'onLine' in navigator &&
                                'boolean' == typeof navigator.onLine &&
                                (ze() ||
                                    (0, l.ru)() ||
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
            function Ge(n, e) {
                S(n.emulator, 'Emulator should always be set here');
                const { url: t } = n.emulator;
                return e ? `${t}${e.startsWith('/') ? e.slice(1) : e}` : t;
            }
            class ar {
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
                        : void P(
                              'Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
                          );
                }
                static headers() {
                    return this.headersImpl
                        ? this.headersImpl
                        : 'undefined' != typeof self && 'Headers' in self
                        ? self.Headers
                        : void P(
                              'Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
                          );
                }
                static response() {
                    return this.responseImpl
                        ? this.responseImpl
                        : 'undefined' != typeof self && 'Response' in self
                        ? self.Response
                        : void P(
                              'Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
                          );
                }
            }
            const Oi = {
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
                Ci = new se(3e4, 6e4);
            function m(n, e) {
                return n.tenantId && !e.tenantId
                    ? Object.assign(Object.assign({}, e), {
                          tenantId: n.tenantId,
                      })
                    : e;
            }
            function I(n, e, t, r) {
                return qe.apply(this, arguments);
            }
            function qe() {
                return (qe = (0, o.Z)(function* (n, e, t, r, i = {}) {
                    return ur(
                        n,
                        i,
                        (0, o.Z)(function* () {
                            let s = {},
                                a = {};
                            r &&
                                ('GET' === e
                                    ? (a = r)
                                    : (s = { body: JSON.stringify(r) }));
                            const u = (0, l.xO)(
                                    Object.assign({ key: n.config.apiKey }, a)
                                ).slice(1),
                                d = yield n._getAdditionalHeaders();
                            return (
                                (d['Content-Type'] = 'application/json'),
                                n.languageCode &&
                                    (d['X-Firebase-Locale'] = n.languageCode),
                                ar.fetch()(
                                    lr(n, n.config.apiHost, t, u),
                                    Object.assign(
                                        {
                                            method: e,
                                            headers: d,
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
            function ur(n, e, t) {
                return Be.apply(this, arguments);
            }
            function Be() {
                return (Be = (0, o.Z)(function* (n, e, t) {
                    n._canInitEmulator = !1;
                    const r = Object.assign(Object.assign({}, Oi), e);
                    try {
                        const i = new Li(n),
                            s = yield Promise.race([t(), i.promise]);
                        i.clearNetworkTimeout();
                        const a = yield s.json();
                        if ('needConfirmation' in a)
                            throw ve(
                                n,
                                'account-exists-with-different-credential',
                                a
                            );
                        if (s.ok && !('errorMessage' in a)) return a;
                        {
                            const u = s.ok ? a.errorMessage : a.error.message,
                                [d, h] = u.split(' : ');
                            if ('FEDERATED_USER_ID_ALREADY_LINKED' === d)
                                throw ve(n, 'credential-already-in-use', a);
                            if ('EMAIL_EXISTS' === d)
                                throw ve(n, 'email-already-in-use', a);
                            const p =
                                r[d] || d.toLowerCase().replace(/[_\s]+/g, '-');
                            if (h) throw ir(n, p, h);
                            v(n, p);
                        }
                    } catch (i) {
                        if (i instanceof l.ZR) throw i;
                        v(n, 'network-request-failed');
                    }
                })).apply(this, arguments);
            }
            function w(n, e, t, r) {
                return $e.apply(this, arguments);
            }
            function $e() {
                return ($e = (0, o.Z)(function* (n, e, t, r, i = {}) {
                    const s = yield I(n, e, t, r, i);
                    return (
                        'mfaPendingCredential' in s &&
                            v(n, 'multi-factor-auth-required', {
                                _serverResponse: s,
                            }),
                        s
                    );
                })).apply(this, arguments);
            }
            function lr(n, e, t, r) {
                const i = `${e}${t}?${r}`;
                return n.config.emulator
                    ? Ge(n.config, i)
                    : `${n.config.apiScheme}://${i}`;
            }
            class Li {
                constructor(e) {
                    (this.auth = e),
                        (this.timer = null),
                        (this.promise = new Promise((t, r) => {
                            this.timer = setTimeout(
                                () => r(E(this.auth, 'network-request-failed')),
                                Ci.get()
                            );
                        }));
                }
                clearNetworkTimeout() {
                    clearTimeout(this.timer);
                }
            }
            function ve(n, e, t) {
                const r = { appName: n.name };
                t.email && (r.email = t.email),
                    t.phoneNumber && (r.phoneNumber = t.phoneNumber);
                const i = E(n, e, r);
                return (i.customData._tokenResponse = t), i;
            }
            function Ke() {
                return (Ke = (0, o.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:delete', e);
                })).apply(this, arguments);
            }
            function xi(n, e) {
                return je.apply(this, arguments);
            }
            function je() {
                return (je = (0, o.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:update', e);
                })).apply(this, arguments);
            }
            function Mi(n, e) {
                return Je.apply(this, arguments);
            }
            function Je() {
                return (Je = (0, o.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:lookup', e);
                })).apply(this, arguments);
            }
            function oe(n) {
                if (n)
                    try {
                        const e = new Date(Number(n));
                        if (!isNaN(e.getTime())) return e.toUTCString();
                    } catch (e) {}
            }
            function Ye() {
                return (Ye = (0, o.Z)(function* (n, e = !1) {
                    const t = (0, l.m9)(n),
                        r = yield t.getIdToken(e),
                        i = Ie(r);
                    c(
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
                        authTime: oe(Xe(i.auth_time)),
                        issuedAtTime: oe(Xe(i.iat)),
                        expirationTime: oe(Xe(i.exp)),
                        signInProvider: a || null,
                        signInSecondFactor:
                            (null == s ? void 0 : s.sign_in_second_factor) ||
                            null,
                    };
                })).apply(this, arguments);
            }
            function Xe(n) {
                return 1e3 * Number(n);
            }
            function Ie(n) {
                const [e, t, r] = n.split('.');
                if (void 0 === e || void 0 === t || void 0 === r)
                    return (
                        ge('JWT malformed, contained fewer than 3 sections'),
                        null
                    );
                try {
                    const i = (0, l.tV)(t);
                    return i
                        ? JSON.parse(i)
                        : (ge('Failed to decode base64 JWT payload'), null);
                } catch (i) {
                    return (
                        ge('Caught error parsing JWT payload as JSON', i), null
                    );
                }
            }
            function O(n, e) {
                return Qe.apply(this, arguments);
            }
            function Qe() {
                return (Qe = (0, o.Z)(function* (n, e, t = !1) {
                    if (t) return e;
                    try {
                        return yield e;
                    } catch (r) {
                        throw (
                            (r instanceof l.ZR &&
                                Zi(r) &&
                                n.auth.currentUser === n &&
                                (yield n.auth.signOut()),
                            r)
                        );
                    }
                })).apply(this, arguments);
            }
            function Zi({ code: n }) {
                return (
                    'auth/user-disabled' === n ||
                    'auth/user-token-expired' === n
                );
            }
            class Vi {
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
            class cr {
                constructor(e, t) {
                    (this.createdAt = e),
                        (this.lastLoginAt = t),
                        this._initializeTime();
                }
                _initializeTime() {
                    (this.lastSignInTime = oe(this.lastLoginAt)),
                        (this.creationTime = oe(this.createdAt));
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
            function ae(n) {
                return et.apply(this, arguments);
            }
            function et() {
                return (et = (0, o.Z)(function* (n) {
                    var e;
                    const t = n.auth,
                        r = yield n.getIdToken(),
                        i = yield O(n, Mi(t, { idToken: r }));
                    c(null == i ? void 0 : i.users.length, t, 'internal-error');
                    const s = i.users[0];
                    n._notifyReloadListener(s);
                    const a = (
                            null === (e = s.providerUserInfo) || void 0 === e
                                ? void 0
                                : e.length
                        )
                            ? zi(s.providerUserInfo)
                            : [],
                        u = Hi(n.providerData, a),
                        p =
                            !!n.isAnonymous &&
                            !(
                                (n.email && s.passwordHash) ||
                                (null == u ? void 0 : u.length)
                            ),
                        f = {
                            uid: s.localId,
                            displayName: s.displayName || null,
                            photoURL: s.photoUrl || null,
                            email: s.email || null,
                            emailVerified: s.emailVerified || !1,
                            phoneNumber: s.phoneNumber || null,
                            tenantId: s.tenantId || null,
                            providerData: u,
                            metadata: new cr(s.createdAt, s.lastLoginAt),
                            isAnonymous: p,
                        };
                    Object.assign(n, f);
                })).apply(this, arguments);
            }
            function tt() {
                return (tt = (0, o.Z)(function* (n) {
                    const e = (0, l.m9)(n);
                    yield ae(e),
                        yield e.auth._persistUserIfCurrent(e),
                        e.auth._notifyListenersIfCurrent(e);
                })).apply(this, arguments);
            }
            function Hi(n, e) {
                return [
                    ...n.filter(
                        (r) => !e.some((i) => i.providerId === r.providerId)
                    ),
                    ...e,
                ];
            }
            function zi(n) {
                return n.map((e) => {
                    var { providerId: t } = e,
                        r = (0, Ve._T)(e, ['providerId']);
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
            function nt() {
                return (nt = (0, o.Z)(function* (n, e) {
                    const t = yield ur(
                        n,
                        {},
                        (0, o.Z)(function* () {
                            const r = (0, l.xO)({
                                    grant_type: 'refresh_token',
                                    refresh_token: e,
                                }).slice(1),
                                { tokenApiHost: i, apiKey: s } = n.config,
                                a = lr(n, i, '/v1/token', `key=${s}`),
                                u = yield n._getAdditionalHeaders();
                            return (
                                (u['Content-Type'] =
                                    'application/x-www-form-urlencoded'),
                                ar.fetch()(a, {
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
            class ue {
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
                    c(e.idToken, 'internal-error'),
                        c(void 0 !== e.idToken, 'internal-error'),
                        c(void 0 !== e.refreshToken, 'internal-error');
                    const t =
                        'expiresIn' in e && void 0 !== e.expiresIn
                            ? Number(e.expiresIn)
                            : (function Fi(n) {
                                  const e = Ie(n);
                                  return (
                                      c(e, 'internal-error'),
                                      c(void 0 !== e.exp, 'internal-error'),
                                      c(void 0 !== e.iat, 'internal-error'),
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
                            c(
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
                        } = yield (function Gi(n, e) {
                            return nt.apply(this, arguments);
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
                        a = new ue();
                    return (
                        r &&
                            (c('string' == typeof r, 'internal-error', {
                                appName: e,
                            }),
                            (a.refreshToken = r)),
                        i &&
                            (c('string' == typeof i, 'internal-error', {
                                appName: e,
                            }),
                            (a.accessToken = i)),
                        s &&
                            (c('number' == typeof s, 'internal-error', {
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
                    return Object.assign(new ue(), this.toJSON());
                }
                _performRefresh() {
                    return P('not implemented');
                }
            }
            function U(n, e) {
                c('string' == typeof n || void 0 === n, 'internal-error', {
                    appName: e,
                });
            }
            class V {
                constructor(e) {
                    var { uid: t, auth: r, stsTokenManager: i } = e,
                        s = (0, Ve._T)(e, ['uid', 'auth', 'stsTokenManager']);
                    (this.providerId = 'firebase'),
                        (this.emailVerified = !1),
                        (this.isAnonymous = !1),
                        (this.tenantId = null),
                        (this.providerData = []),
                        (this.proactiveRefresh = new Vi(this)),
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
                        (this.metadata = new cr(
                            s.createdAt || void 0,
                            s.lastLoginAt || void 0
                        ));
                }
                getIdToken(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        const r = yield O(
                            t,
                            t.stsTokenManager.getToken(t.auth, e)
                        );
                        return (
                            c(r, t.auth, 'internal-error'),
                            t.accessToken !== r &&
                                ((t.accessToken = r),
                                yield t.auth._persistUserIfCurrent(t),
                                t.auth._notifyListenersIfCurrent(t)),
                            r
                        );
                    })();
                }
                getIdTokenResult(e) {
                    return (function Ui(n) {
                        return Ye.apply(this, arguments);
                    })(this, e);
                }
                reload() {
                    return (function Wi(n) {
                        return tt.apply(this, arguments);
                    })(this);
                }
                _assign(e) {
                    this !== e &&
                        (c(this.uid === e.uid, this.auth, 'internal-error'),
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
                    return new V(
                        Object.assign(Object.assign({}, this), {
                            auth: e,
                            stsTokenManager: this.stsTokenManager._clone(),
                        })
                    );
                }
                _onReload(e) {
                    c(!this.reloadListener, this.auth, 'internal-error'),
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
                            t && (yield ae(r)),
                            yield r.auth._persistUserIfCurrent(r),
                            i && r.auth._notifyListenersIfCurrent(r);
                    })();
                }
                delete() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        const t = yield e.getIdToken();
                        return (
                            yield O(
                                e,
                                (function Di(n, e) {
                                    return Ke.apply(this, arguments);
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
                    var r, i, s, a, u, d, h, p;
                    const f =
                            null !== (r = t.displayName) && void 0 !== r
                                ? r
                                : void 0,
                        g = null !== (i = t.email) && void 0 !== i ? i : void 0,
                        N =
                            null !== (s = t.phoneNumber) && void 0 !== s
                                ? s
                                : void 0,
                        Fe =
                            null !== (a = t.photoURL) && void 0 !== a
                                ? a
                                : void 0,
                        gi =
                            null !== (u = t.tenantId) && void 0 !== u
                                ? u
                                : void 0,
                        Jn =
                            null !== (d = t._redirectEventId) && void 0 !== d
                                ? d
                                : void 0,
                        vi =
                            null !== (h = t.createdAt) && void 0 !== h
                                ? h
                                : void 0,
                        Ii =
                            null !== (p = t.lastLoginAt) && void 0 !== p
                                ? p
                                : void 0,
                        {
                            uid: Yn,
                            emailVerified: yi,
                            isAnonymous: Ei,
                            providerData: Xn,
                            stsTokenManager: Ti,
                        } = t;
                    c(Yn && Ti, e, 'internal-error');
                    const _u = ue.fromJSON(this.name, Ti);
                    c('string' == typeof Yn, e, 'internal-error'),
                        U(f, e.name),
                        U(g, e.name),
                        c('boolean' == typeof yi, e, 'internal-error'),
                        c('boolean' == typeof Ei, e, 'internal-error'),
                        U(N, e.name),
                        U(Fe, e.name),
                        U(gi, e.name),
                        U(Jn, e.name),
                        U(vi, e.name),
                        U(Ii, e.name);
                    const Qn = new V({
                        uid: Yn,
                        auth: e,
                        email: g,
                        emailVerified: yi,
                        displayName: f,
                        isAnonymous: Ei,
                        photoURL: Fe,
                        phoneNumber: N,
                        tenantId: gi,
                        stsTokenManager: _u,
                        createdAt: vi,
                        lastLoginAt: Ii,
                    });
                    return (
                        Xn &&
                            Array.isArray(Xn) &&
                            (Qn.providerData = Xn.map((gu) =>
                                Object.assign({}, gu)
                            )),
                        Jn && (Qn._redirectEventId = Jn),
                        Qn
                    );
                }
                static _fromIdTokenResponse(e, t, r = !1) {
                    return (0, o.Z)(function* () {
                        const i = new ue();
                        i.updateFromServerResponse(t);
                        const s = new V({
                            uid: t.localId,
                            auth: e,
                            stsTokenManager: i,
                            isAnonymous: r,
                        });
                        return yield ae(s), s;
                    })();
                }
            }
            const K = (() => {
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
            function W(n, e, t) {
                return `firebase:${n}:${e}:${t}`;
            }
            class j {
                constructor(e, t, r) {
                    (this.persistence = e), (this.auth = t), (this.userKey = r);
                    const { config: i, name: s } = this.auth;
                    (this.fullUserKey = W(this.userKey, i.apiKey, s)),
                        (this.fullPersistenceKey = W(
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
                        return t ? V._fromJSON(e.auth, t) : null;
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
                        if (!t.length) return new j(R(K), e, r);
                        const i = (yield Promise.all(
                            t.map(
                                (function () {
                                    var h = (0, o.Z)(function* (p) {
                                        if (yield p._isAvailable()) return p;
                                    });
                                    return function (p) {
                                        return h.apply(this, arguments);
                                    };
                                })()
                            )
                        )).filter((h) => h);
                        let s = i[0] || R(K);
                        const a = W(r, e.config.apiKey, e.name);
                        let u = null;
                        for (const h of t)
                            try {
                                const p = yield h._get(a);
                                if (p) {
                                    const f = V._fromJSON(e, p);
                                    h !== s && (u = f), (s = h);
                                    break;
                                }
                            } catch (p) {}
                        const d = i.filter((h) => h._shouldAllowMigration);
                        return s._shouldAllowMigration && d.length
                            ? ((s = d[0]),
                              u && (yield s._set(a, u.toJSON())),
                              yield Promise.all(
                                  t.map(
                                      (function () {
                                          var h = (0, o.Z)(function* (p) {
                                              if (p !== s)
                                                  try {
                                                      yield p._remove(a);
                                                  } catch (f) {}
                                          });
                                          return function (p) {
                                              return h.apply(this, arguments);
                                          };
                                      })()
                                  )
                              ),
                              new j(s, e, r))
                            : new j(s, e, r);
                    })();
                }
            }
            function dr(n) {
                const e = n.toLowerCase();
                if (
                    e.includes('opera/') ||
                    e.includes('opr/') ||
                    e.includes('opios/')
                )
                    return 'Opera';
                if (pr(e)) return 'IEMobile';
                if (e.includes('msie') || e.includes('trident/')) return 'IE';
                if (e.includes('edge/')) return 'Edge';
                if (hr(e)) return 'Firefox';
                if (e.includes('silk/')) return 'Silk';
                if (mr(e)) return 'Blackberry';
                if (_r(e)) return 'Webos';
                if (rt(e)) return 'Safari';
                if ((e.includes('chrome/') || fr(e)) && !e.includes('edge/'))
                    return 'Chrome';
                if (le(e)) return 'Android';
                {
                    const r = n.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
                    if (2 === (null == r ? void 0 : r.length)) return r[1];
                }
                return 'Other';
            }
            function hr(n = (0, l.z$)()) {
                return /firefox\//i.test(n);
            }
            function rt(n = (0, l.z$)()) {
                const e = n.toLowerCase();
                return (
                    e.includes('safari/') &&
                    !e.includes('chrome/') &&
                    !e.includes('crios/') &&
                    !e.includes('android')
                );
            }
            function fr(n = (0, l.z$)()) {
                return /crios\//i.test(n);
            }
            function pr(n = (0, l.z$)()) {
                return /iemobile/i.test(n);
            }
            function le(n = (0, l.z$)()) {
                return /android/i.test(n);
            }
            function mr(n = (0, l.z$)()) {
                return /blackberry/i.test(n);
            }
            function _r(n = (0, l.z$)()) {
                return /webos/i.test(n);
            }
            function J(n = (0, l.z$)()) {
                return /iphone|ipad|ipod/i.test(n);
            }
            function gr(n = (0, l.z$)()) {
                return (
                    J(n) ||
                    le(n) ||
                    _r(n) ||
                    mr(n) ||
                    /windows phone/i.test(n) ||
                    pr(n)
                );
            }
            function vr(n, e = []) {
                let t;
                switch (n) {
                    case 'Browser':
                        t = dr((0, l.z$)());
                        break;
                    case 'Worker':
                        t = `${dr((0, l.z$)())}-${n}`;
                        break;
                    default:
                        t = n;
                }
                const r = e.length ? e.join(',') : 'FirebaseCore-web';
                return `${t}/JsCore/${M.SDK_VERSION}/${r}`;
            }
            class ji {
                constructor(e, t) {
                    (this.app = e),
                        (this.config = t),
                        (this.currentUser = null),
                        (this.emulatorConfig = null),
                        (this.operations = Promise.resolve()),
                        (this.authStateSubscription = new Ir(this)),
                        (this.idTokenSubscription = new Ir(this)),
                        (this.redirectUser = null),
                        (this.isProactiveRefreshEnabled = !1),
                        (this._canInitEmulator = !0),
                        (this._isInitialized = !1),
                        (this._deleted = !1),
                        (this._initializationPromise = null),
                        (this._popupRedirectResolver = null),
                        (this._errorFactory = nr),
                        (this.lastNotifiedUid = void 0),
                        (this.languageCode = null),
                        (this.tenantId = null),
                        (this.settings = {
                            appVerificationDisabledForTesting: !1,
                        }),
                        (this.frameworks = []),
                        (this.name = e.name),
                        (this.clientVersion = t.sdkClientVersion);
                }
                _initializeWithPersistence(e, t) {
                    var r = this;
                    return (
                        t && (this._popupRedirectResolver = R(t)),
                        (this._initializationPromise = this.queue(
                            (0, o.Z)(function* () {
                                var i, s;
                                if (
                                    !r._deleted &&
                                    ((r.persistenceManager = yield j.create(
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
                            yield e._updateCurrentUser(t);
                        }
                    })();
                }
                initializeCurrentUser(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        var r;
                        let i = yield t.assertedPersistence.getCurrentUser();
                        if (e && t.config.authDomain) {
                            yield t.getOrInitRedirectPersistenceManager();
                            const s =
                                    null === (r = t.redirectUser) ||
                                    void 0 === r
                                        ? void 0
                                        : r._redirectEventId,
                                a = null == i ? void 0 : i._redirectEventId,
                                u = yield t.tryRedirectSignIn(e);
                            (!s || s === a) &&
                                (null == u ? void 0 : u.user) &&
                                (i = u.user);
                        }
                        return i
                            ? i._redirectEventId
                                ? (c(
                                      t._popupRedirectResolver,
                                      t,
                                      'argument-error'
                                  ),
                                  yield t.getOrInitRedirectPersistenceManager(),
                                  t.redirectUser &&
                                  t.redirectUser._redirectEventId ===
                                      i._redirectEventId
                                      ? t.directlySetCurrentUser(i)
                                      : t.reloadAndSetCurrentUserOrClear(i))
                                : t.reloadAndSetCurrentUserOrClear(i)
                            : t.directlySetCurrentUser(null);
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
                            yield ae(e);
                        } catch (r) {
                            if ('auth/network-request-failed' !== r.code)
                                return t.directlySetCurrentUser(null);
                        }
                        return t.directlySetCurrentUser(e);
                    })();
                }
                useDeviceLanguage() {
                    this.languageCode = (function wi() {
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
                        const r = e ? (0, l.m9)(e) : null;
                        return (
                            r &&
                                c(
                                    r.auth.config.apiKey === t.config.apiKey,
                                    t,
                                    'invalid-user-token'
                                ),
                            t._updateCurrentUser(r && r._clone(t))
                        );
                    })();
                }
                _updateCurrentUser(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        if (!t._deleted)
                            return (
                                e &&
                                    c(
                                        t.tenantId === e.tenantId,
                                        t,
                                        'tenant-id-mismatch'
                                    ),
                                t.queue(
                                    (0, o.Z)(function* () {
                                        yield t.directlySetCurrentUser(e),
                                            t.notifyAuthListeners();
                                    })
                                )
                            );
                    })();
                }
                signOut() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        return (
                            (e.redirectPersistenceManager ||
                                e._popupRedirectResolver) &&
                                (yield e._setRedirectUser(null)),
                            e._updateCurrentUser(null)
                        );
                    })();
                }
                setPersistence(e) {
                    var t = this;
                    return this.queue(
                        (0, o.Z)(function* () {
                            yield t.assertedPersistence.setPersistence(R(e));
                        })
                    );
                }
                _getPersistence() {
                    return this.assertedPersistence.persistence.type;
                }
                _updateErrorMap(e) {
                    this._errorFactory = new l.LL('auth', 'Firebase', e());
                }
                onAuthStateChanged(e, t, r) {
                    return this.registerStateListener(
                        this.authStateSubscription,
                        e,
                        t,
                        r
                    );
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
                            const r = (e && R(e)) || t._popupRedirectResolver;
                            c(r, t, 'argument-error'),
                                (t.redirectPersistenceManager = yield j.create(
                                    t,
                                    [R(r._redirectPersistence)],
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
                        c(a, this, 'internal-error'),
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
                        c(this.persistenceManager, this, 'internal-error'),
                        this.persistenceManager
                    );
                }
                _logFramework(e) {
                    !e ||
                        this.frameworks.includes(e) ||
                        (this.frameworks.push(e),
                        this.frameworks.sort(),
                        (this.clientVersion = vr(
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
                        const t = { 'X-Client-Version': e.clientVersion };
                        return (
                            e.app.options.appId &&
                                (t['X-Firebase-gmpid'] = e.app.options.appId),
                            t
                        );
                    })();
                }
            }
            function y(n) {
                return (0, l.m9)(n);
            }
            class Ir {
                constructor(e) {
                    (this.auth = e),
                        (this.observer = null),
                        (this.addObserver = (0, l.ne)(
                            (t) => (this.observer = t)
                        ));
                }
                get next() {
                    return (
                        c(this.observer, this.auth, 'internal-error'),
                        this.observer.next.bind(this.observer)
                    );
                }
            }
            function yr(n) {
                const e = n.indexOf(':');
                return e < 0 ? '' : n.substr(0, e + 1);
            }
            function Er(n) {
                if (!n) return null;
                const e = Number(n);
                return isNaN(e) ? null : e;
            }
            class Y {
                constructor(e, t) {
                    (this.providerId = e), (this.signInMethod = t);
                }
                toJSON() {
                    return P('not implemented');
                }
                _getIdTokenResponse(e) {
                    return P('not implemented');
                }
                _linkToIdToken(e, t) {
                    return P('not implemented');
                }
                _getReauthenticationResolver(e) {
                    return P('not implemented');
                }
            }
            function Tr(n, e) {
                return it.apply(this, arguments);
            }
            function it() {
                return (it = (0, o.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:resetPassword', m(n, e));
                })).apply(this, arguments);
            }
            function Rr(n, e) {
                return st.apply(this, arguments);
            }
            function st() {
                return (st = (0, o.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:update', e);
                })).apply(this, arguments);
            }
            function Qi(n, e) {
                return ot.apply(this, arguments);
            }
            function ot() {
                return (ot = (0, o.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:update', m(n, e));
                })).apply(this, arguments);
            }
            function at() {
                return (at = (0, o.Z)(function* (n, e) {
                    return w(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPassword',
                        m(n, e)
                    );
                })).apply(this, arguments);
            }
            function ye(n, e) {
                return ut.apply(this, arguments);
            }
            function ut() {
                return (ut = (0, o.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:sendOobCode', m(n, e));
                })).apply(this, arguments);
            }
            function ts(n, e) {
                return lt.apply(this, arguments);
            }
            function lt() {
                return (lt = (0, o.Z)(function* (n, e) {
                    return ye(n, e);
                })).apply(this, arguments);
            }
            function ns(n, e) {
                return ct.apply(this, arguments);
            }
            function ct() {
                return (ct = (0, o.Z)(function* (n, e) {
                    return ye(n, e);
                })).apply(this, arguments);
            }
            function rs(n, e) {
                return dt.apply(this, arguments);
            }
            function dt() {
                return (dt = (0, o.Z)(function* (n, e) {
                    return ye(n, e);
                })).apply(this, arguments);
            }
            function is(n, e) {
                return ht.apply(this, arguments);
            }
            function ht() {
                return (ht = (0, o.Z)(function* (n, e) {
                    return ye(n, e);
                })).apply(this, arguments);
            }
            function ft() {
                return (ft = (0, o.Z)(function* (n, e) {
                    return w(
                        n,
                        'POST',
                        '/v1/accounts:signInWithEmailLink',
                        m(n, e)
                    );
                })).apply(this, arguments);
            }
            function pt() {
                return (pt = (0, o.Z)(function* (n, e) {
                    return w(
                        n,
                        'POST',
                        '/v1/accounts:signInWithEmailLink',
                        m(n, e)
                    );
                })).apply(this, arguments);
            }
            class ce extends Y {
                constructor(e, t, r, i = null) {
                    super('password', r),
                        (this._email = e),
                        (this._password = t),
                        (this._tenantId = i);
                }
                static _fromEmailAndPassword(e, t) {
                    return new ce(e, t, 'password');
                }
                static _fromEmailAndCode(e, t, r = null) {
                    return new ce(e, t, 'emailLink', r);
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
                                return (function es(n, e) {
                                    return at.apply(this, arguments);
                                })(e, {
                                    returnSecureToken: !0,
                                    email: t._email,
                                    password: t._password,
                                });
                            case 'emailLink':
                                return (function ss(n, e) {
                                    return ft.apply(this, arguments);
                                })(e, {
                                    email: t._email,
                                    oobCode: t._password,
                                });
                            default:
                                v(e, 'internal-error');
                        }
                    })();
                }
                _linkToIdToken(e, t) {
                    var r = this;
                    return (0, o.Z)(function* () {
                        switch (r.signInMethod) {
                            case 'password':
                                return Rr(e, {
                                    idToken: t,
                                    returnSecureToken: !0,
                                    email: r._email,
                                    password: r._password,
                                });
                            case 'emailLink':
                                return (function os(n, e) {
                                    return pt.apply(this, arguments);
                                })(e, {
                                    idToken: t,
                                    email: r._email,
                                    oobCode: r._password,
                                });
                            default:
                                v(e, 'internal-error');
                        }
                    })();
                }
                _getReauthenticationResolver(e) {
                    return this._getIdTokenResponse(e);
                }
            }
            function C(n, e) {
                return mt.apply(this, arguments);
            }
            function mt() {
                return (mt = (0, o.Z)(function* (n, e) {
                    return w(n, 'POST', '/v1/accounts:signInWithIdp', m(n, e));
                })).apply(this, arguments);
            }
            class b extends Y {
                constructor() {
                    super(...arguments), (this.pendingToken = null);
                }
                static _fromParams(e) {
                    const t = new b(e.providerId, e.signInMethod);
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
                            : v('argument-error'),
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
                        s = (0, Ve._T)(t, ['providerId', 'signInMethod']);
                    if (!r || !i) return null;
                    const a = new b(r, i);
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
                    return C(e, this.buildRequest());
                }
                _linkToIdToken(e, t) {
                    const r = this.buildRequest();
                    return (r.idToken = t), C(e, r);
                }
                _getReauthenticationResolver(e) {
                    const t = this.buildRequest();
                    return (t.autoCreate = !1), C(e, t);
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
                            (e.postBody = (0, l.xO)(t));
                    }
                    return e;
                }
            }
            function us(n, e) {
                return _t.apply(this, arguments);
            }
            function _t() {
                return (_t = (0, o.Z)(function* (n, e) {
                    return I(
                        n,
                        'POST',
                        '/v1/accounts:sendVerificationCode',
                        m(n, e)
                    );
                })).apply(this, arguments);
            }
            function gt() {
                return (gt = (0, o.Z)(function* (n, e) {
                    return w(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPhoneNumber',
                        m(n, e)
                    );
                })).apply(this, arguments);
            }
            function vt() {
                return (vt = (0, o.Z)(function* (n, e) {
                    const t = yield w(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPhoneNumber',
                        m(n, e)
                    );
                    if (t.temporaryProof)
                        throw ve(
                            n,
                            'account-exists-with-different-credential',
                            t
                        );
                    return t;
                })).apply(this, arguments);
            }
            const ds = { USER_NOT_FOUND: 'user-not-found' };
            function It() {
                return (It = (0, o.Z)(function* (n, e) {
                    return w(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPhoneNumber',
                        m(
                            n,
                            Object.assign(Object.assign({}, e), {
                                operation: 'REAUTH',
                            })
                        ),
                        ds
                    );
                })).apply(this, arguments);
            }
            class H extends Y {
                constructor(e) {
                    super('phone', 'phone'), (this.params = e);
                }
                static _fromVerification(e, t) {
                    return new H({ verificationId: e, verificationCode: t });
                }
                static _fromTokenResponse(e, t) {
                    return new H({ phoneNumber: e, temporaryProof: t });
                }
                _getIdTokenResponse(e) {
                    return (function ls(n, e) {
                        return gt.apply(this, arguments);
                    })(e, this._makeVerificationRequest());
                }
                _linkToIdToken(e, t) {
                    return (function cs(n, e) {
                        return vt.apply(this, arguments);
                    })(
                        e,
                        Object.assign(
                            { idToken: t },
                            this._makeVerificationRequest()
                        )
                    );
                }
                _getReauthenticationResolver(e) {
                    return (function hs(n, e) {
                        return It.apply(this, arguments);
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
                        ? new H({
                              verificationId: t,
                              verificationCode: r,
                              phoneNumber: i,
                              temporaryProof: s,
                          })
                        : null;
                }
            }
            class de {
                constructor(e) {
                    var t, r, i, s, a, u;
                    const d = (0, l.zd)((0, l.pd)(e)),
                        h = null !== (t = d.apiKey) && void 0 !== t ? t : null,
                        p = null !== (r = d.oobCode) && void 0 !== r ? r : null,
                        f = (function fs(n) {
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
                        })(null !== (i = d.mode) && void 0 !== i ? i : null);
                    c(h && p && f, 'argument-error'),
                        (this.apiKey = h),
                        (this.operation = f),
                        (this.code = p),
                        (this.continueUrl =
                            null !== (s = d.continueUrl) && void 0 !== s
                                ? s
                                : null),
                        (this.languageCode =
                            null !== (a = d.languageCode) && void 0 !== a
                                ? a
                                : null),
                        (this.tenantId =
                            null !== (u = d.tenantId) && void 0 !== u
                                ? u
                                : null);
                }
                static parseLink(e) {
                    const t = (function ps(n) {
                        const e = (0, l.zd)((0, l.pd)(n)).link,
                            t = e ? (0, l.zd)((0, l.pd)(e)).deep_link_id : null,
                            r = (0, l.zd)((0, l.pd)(n)).deep_link_id;
                        return (
                            (r ? (0, l.zd)((0, l.pd)(r)).link : null) ||
                            r ||
                            t ||
                            e ||
                            n
                        );
                    })(e);
                    try {
                        return new de(t);
                    } catch (r) {
                        return null;
                    }
                }
            }
            let yt = (() => {
                class n {
                    constructor() {
                        this.providerId = n.PROVIDER_ID;
                    }
                    static credential(t, r) {
                        return ce._fromEmailAndPassword(t, r);
                    }
                    static credentialWithLink(t, r) {
                        const i = de.parseLink(r);
                        return (
                            c(i, 'argument-error'),
                            ce._fromEmailAndCode(t, i.code, i.tenantId)
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
            class L {
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
            class X extends L {
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
            class Q extends X {
                static credentialFromJSON(e) {
                    const t = 'string' == typeof e ? JSON.parse(e) : e;
                    return (
                        c(
                            'providerId' in t && 'signInMethod' in t,
                            'argument-error'
                        ),
                        b._fromParams(t)
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
                        c(e.idToken || e.accessToken, 'argument-error'),
                        b._fromParams(
                            Object.assign(Object.assign({}, e), {
                                providerId: this.providerId,
                                signInMethod: this.providerId,
                            })
                        )
                    );
                }
                static credentialFromResult(e) {
                    return Q.oauthCredentialFromTaggedObject(e);
                }
                static credentialFromError(e) {
                    return Q.oauthCredentialFromTaggedObject(
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
                        return new Q(u)._credential({
                            idToken: t,
                            accessToken: r,
                            nonce: a,
                            pendingToken: s,
                        });
                    } catch (d) {
                        return null;
                    }
                }
            }
            let kr = (() => {
                    class n extends X {
                        constructor() {
                            super('facebook.com');
                        }
                        static credential(t) {
                            return b._fromParams({
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
                Ar = (() => {
                    class n extends X {
                        constructor() {
                            super('google.com'), this.addScope('profile');
                        }
                        static credential(t, r) {
                            return b._fromParams({
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
                Sr = (() => {
                    class n extends X {
                        constructor() {
                            super('github.com');
                        }
                        static credential(t) {
                            return b._fromParams({
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
            class ee extends Y {
                constructor(e, t) {
                    super(e, e), (this.pendingToken = t);
                }
                _getIdTokenResponse(e) {
                    return C(e, this.buildRequest());
                }
                _linkToIdToken(e, t) {
                    const r = this.buildRequest();
                    return (r.idToken = t), C(e, r);
                }
                _getReauthenticationResolver(e) {
                    const t = this.buildRequest();
                    return (t.autoCreate = !1), C(e, t);
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
                    return r && i && s && r === i ? new ee(r, s) : null;
                }
                static _create(e, t) {
                    return new ee(e, t);
                }
                buildRequest() {
                    return {
                        requestUri: 'http://localhost',
                        returnSecureToken: !0,
                        pendingToken: this.pendingToken,
                    };
                }
            }
            class Ee extends L {
                constructor(e) {
                    c(e.startsWith('saml.'), 'argument-error'), super(e);
                }
                static credentialFromResult(e) {
                    return Ee.samlCredentialFromTaggedObject(e);
                }
                static credentialFromError(e) {
                    return Ee.samlCredentialFromTaggedObject(
                        e.customData || {}
                    );
                }
                static credentialFromJSON(e) {
                    const t = ee.fromJSON(e);
                    return c(t, 'argument-error'), t;
                }
                static samlCredentialFromTaggedObject({ _tokenResponse: e }) {
                    if (!e) return null;
                    const { pendingToken: t, providerId: r } = e;
                    if (!t || !r) return null;
                    try {
                        return ee._create(r, t);
                    } catch (i) {
                        return null;
                    }
                }
            }
            let Nr = (() => {
                class n extends X {
                    constructor() {
                        super('twitter.com');
                    }
                    static credential(t, r) {
                        return b._fromParams({
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
            function Pr(n, e) {
                return Et.apply(this, arguments);
            }
            function Et() {
                return (Et = (0, o.Z)(function* (n, e) {
                    return w(n, 'POST', '/v1/accounts:signUp', m(n, e));
                })).apply(this, arguments);
            }
            class A {
                constructor(e) {
                    (this.user = e.user),
                        (this.providerId = e.providerId),
                        (this._tokenResponse = e._tokenResponse),
                        (this.operationType = e.operationType);
                }
                static _fromIdTokenResponse(e, t, r, i = !1) {
                    return (0, o.Z)(function* () {
                        const s = yield V._fromIdTokenResponse(e, r, i),
                            a = br(r);
                        return new A({
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
                        const i = br(r);
                        return new A({
                            user: e,
                            providerId: i,
                            _tokenResponse: r,
                            operationType: t,
                        });
                    })();
                }
            }
            function br(n) {
                return n.providerId
                    ? n.providerId
                    : 'phoneNumber' in n
                    ? 'phone'
                    : null;
            }
            function Tt() {
                return (Tt = (0, o.Z)(function* (n) {
                    var e;
                    const t = y(n);
                    if (
                        (yield t._initializationPromise,
                        null === (e = t.currentUser) || void 0 === e
                            ? void 0
                            : e.isAnonymous)
                    )
                        return new A({
                            user: t.currentUser,
                            providerId: null,
                            operationType: 'signIn',
                        });
                    const r = yield Pr(t, { returnSecureToken: !0 }),
                        i = yield A._fromIdTokenResponse(t, 'signIn', r, !0);
                    return yield t._updateCurrentUser(i.user), i;
                })).apply(this, arguments);
            }
            class Te extends l.ZR {
                constructor(e, t, r, i) {
                    var s;
                    super(t.code, t.message),
                        (this.operationType = r),
                        (this.user = i),
                        Object.setPrototypeOf(this, Te.prototype),
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
                    return new Te(e, t, r, i);
                }
            }
            function wr(n, e, t, r) {
                return (
                    'reauthenticate' === e
                        ? t._getReauthenticationResolver(n)
                        : t._getIdTokenResponse(n)
                ).catch((s) => {
                    throw 'auth/multi-factor-auth-required' === s.code
                        ? Te._fromErrorAndOperation(n, s, e, r)
                        : s;
                });
            }
            function Or(n) {
                return new Set(
                    n.map(({ providerId: e }) => e).filter((e) => !!e)
                );
            }
            function Rt() {
                return (Rt = (0, o.Z)(function* (n, e) {
                    const t = (0, l.m9)(n);
                    yield Re(!0, t, e);
                    const { providerUserInfo: r } = yield xi(t.auth, {
                            idToken: yield t.getIdToken(),
                            deleteProvider: [e],
                        }),
                        i = Or(r || []);
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
            function kt(n, e) {
                return At.apply(this, arguments);
            }
            function At() {
                return (At = (0, o.Z)(function* (n, e, t = !1) {
                    const r = yield O(
                        n,
                        e._linkToIdToken(n.auth, yield n.getIdToken()),
                        t
                    );
                    return A._forOperation(n, 'link', r);
                })).apply(this, arguments);
            }
            function Re(n, e, t) {
                return St.apply(this, arguments);
            }
            function St() {
                return (St = (0, o.Z)(function* (n, e, t) {
                    yield ae(e);
                    const i =
                        !1 === n
                            ? 'provider-already-linked'
                            : 'no-such-provider';
                    c(Or(e.providerData).has(t) === n, e.auth, i);
                })).apply(this, arguments);
            }
            function Cr(n, e) {
                return Nt.apply(this, arguments);
            }
            function Nt() {
                return (Nt = (0, o.Z)(function* (n, e, t = !1) {
                    const { auth: r } = n,
                        i = 'reauthenticate';
                    try {
                        const s = yield O(n, wr(r, i, e, n), t);
                        c(s.idToken, r, 'internal-error');
                        const a = Ie(s.idToken);
                        c(a, r, 'internal-error');
                        const { sub: u } = a;
                        return (
                            c(n.uid === u, r, 'user-mismatch'),
                            A._forOperation(n, i, s)
                        );
                    } catch (s) {
                        throw (
                            ('auth/user-not-found' ===
                                (null == s ? void 0 : s.code) &&
                                v(r, 'user-mismatch'),
                            s)
                        );
                    }
                })).apply(this, arguments);
            }
            function Lr(n, e) {
                return Pt.apply(this, arguments);
            }
            function Pt() {
                return (Pt = (0, o.Z)(function* (n, e, t = !1) {
                    const r = 'signIn',
                        i = yield wr(n, r, e),
                        s = yield A._fromIdTokenResponse(n, r, i);
                    return t || (yield n._updateCurrentUser(s.user)), s;
                })).apply(this, arguments);
            }
            function ke(n, e) {
                return bt.apply(this, arguments);
            }
            function bt() {
                return (bt = (0, o.Z)(function* (n, e) {
                    return Lr(y(n), e);
                })).apply(this, arguments);
            }
            function Dr(n, e) {
                return wt.apply(this, arguments);
            }
            function wt() {
                return (wt = (0, o.Z)(function* (n, e) {
                    const t = (0, l.m9)(n);
                    return yield Re(!1, t, e.providerId), kt(t, e);
                })).apply(this, arguments);
            }
            function xr(n, e) {
                return Ot.apply(this, arguments);
            }
            function Ot() {
                return (Ot = (0, o.Z)(function* (n, e) {
                    return Cr((0, l.m9)(n), e);
                })).apply(this, arguments);
            }
            function Is(n, e) {
                return Ct.apply(this, arguments);
            }
            function Ct() {
                return (Ct = (0, o.Z)(function* (n, e) {
                    return w(
                        n,
                        'POST',
                        '/v1/accounts:signInWithCustomToken',
                        m(n, e)
                    );
                })).apply(this, arguments);
            }
            function Lt() {
                return (Lt = (0, o.Z)(function* (n, e) {
                    const t = y(n),
                        r = yield Is(t, { token: e, returnSecureToken: !0 }),
                        i = yield A._fromIdTokenResponse(t, 'signIn', r);
                    return yield t._updateCurrentUser(i.user), i;
                })).apply(this, arguments);
            }
            class Ae {
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
                        ? Dt._fromServerResponse(e, t)
                        : v(e, 'internal-error');
                }
            }
            class Dt extends Ae {
                constructor(e) {
                    super('phone', e), (this.phoneNumber = e.phoneInfo);
                }
                static _fromServerResponse(e, t) {
                    return new Dt(t);
                }
            }
            function Se(n, e, t) {
                var r;
                c(
                    (null === (r = t.url) || void 0 === r ? void 0 : r.length) >
                        0,
                    n,
                    'invalid-continue-uri'
                ),
                    c(
                        void 0 === t.dynamicLinkDomain ||
                            t.dynamicLinkDomain.length > 0,
                        n,
                        'invalid-dynamic-link-domain'
                    ),
                    (e.continueUrl = t.url),
                    (e.dynamicLinkDomain = t.dynamicLinkDomain),
                    (e.canHandleCodeInApp = t.handleCodeInApp),
                    t.iOS &&
                        (c(
                            t.iOS.bundleId.length > 0,
                            n,
                            'missing-ios-bundle-id'
                        ),
                        (e.iOSBundleId = t.iOS.bundleId)),
                    t.android &&
                        (c(
                            t.android.packageName.length > 0,
                            n,
                            'missing-android-pkg-name'
                        ),
                        (e.androidInstallApp = t.android.installApp),
                        (e.androidMinimumVersionCode =
                            t.android.minimumVersion),
                        (e.androidPackageName = t.android.packageName));
            }
            function xt() {
                return (xt = (0, o.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n),
                        i = { requestType: 'PASSWORD_RESET', email: e };
                    t && Se(r, i, t), yield ns(r, i);
                })).apply(this, arguments);
            }
            function Mt() {
                return (Mt = (0, o.Z)(function* (n, e, t) {
                    yield Tr((0, l.m9)(n), { oobCode: e, newPassword: t });
                })).apply(this, arguments);
            }
            function Ut() {
                return (Ut = (0, o.Z)(function* (n, e) {
                    yield Qi((0, l.m9)(n), { oobCode: e });
                })).apply(this, arguments);
            }
            function Mr(n, e) {
                return Ft.apply(this, arguments);
            }
            function Ft() {
                return (Ft = (0, o.Z)(function* (n, e) {
                    const t = (0, l.m9)(n),
                        r = yield Tr(t, { oobCode: e }),
                        i = r.requestType;
                    switch ((c(i, t, 'internal-error'), i)) {
                        case 'EMAIL_SIGNIN':
                            break;
                        case 'VERIFY_AND_CHANGE_EMAIL':
                            c(r.newEmail, t, 'internal-error');
                            break;
                        case 'REVERT_SECOND_FACTOR_ADDITION':
                            c(r.mfaInfo, t, 'internal-error');
                        default:
                            c(r.email, t, 'internal-error');
                    }
                    let s = null;
                    return (
                        r.mfaInfo &&
                            (s = Ae._fromServerResponse(y(t), r.mfaInfo)),
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
            function Zt() {
                return (Zt = (0, o.Z)(function* (n, e) {
                    const { data: t } = yield Mr((0, l.m9)(n), e);
                    return t.email;
                })).apply(this, arguments);
            }
            function Vt() {
                return (Vt = (0, o.Z)(function* (n, e, t) {
                    const r = y(n),
                        i = yield Pr(r, {
                            returnSecureToken: !0,
                            email: e,
                            password: t,
                        }),
                        s = yield A._fromIdTokenResponse(r, 'signIn', i);
                    return yield r._updateCurrentUser(s.user), s;
                })).apply(this, arguments);
            }
            function Wt() {
                return (Wt = (0, o.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n),
                        i = { requestType: 'EMAIL_SIGNIN', email: e };
                    c(t.handleCodeInApp, r, 'argument-error'),
                        t && Se(r, i, t),
                        yield rs(r, i);
                })).apply(this, arguments);
            }
            function Ht() {
                return (Ht = (0, o.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n),
                        i = yt.credentialWithLink(e, t || ie());
                    return (
                        c(
                            i._tenantId === (r.tenantId || null),
                            r,
                            'tenant-id-mismatch'
                        ),
                        ke(r, i)
                    );
                })).apply(this, arguments);
            }
            function ws(n, e) {
                return zt.apply(this, arguments);
            }
            function zt() {
                return (zt = (0, o.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:createAuthUri', m(n, e));
                })).apply(this, arguments);
            }
            function Gt() {
                return (Gt = (0, o.Z)(function* (n, e) {
                    const r = {
                            identifier: e,
                            continueUri: ze() ? ie() : 'http://localhost',
                        },
                        { signinMethods: i } = yield ws((0, l.m9)(n), r);
                    return i || [];
                })).apply(this, arguments);
            }
            function qt() {
                return (qt = (0, o.Z)(function* (n, e) {
                    const t = (0, l.m9)(n),
                        i = {
                            requestType: 'VERIFY_EMAIL',
                            idToken: yield n.getIdToken(),
                        };
                    e && Se(t.auth, i, e);
                    const { email: s } = yield ts(t.auth, i);
                    s !== n.email && (yield n.reload());
                })).apply(this, arguments);
            }
            function Bt() {
                return (Bt = (0, o.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n),
                        s = {
                            requestType: 'VERIFY_AND_CHANGE_EMAIL',
                            idToken: yield n.getIdToken(),
                            newEmail: e,
                        };
                    t && Se(r.auth, s, t);
                    const { email: a } = yield is(r.auth, s);
                    a !== n.email && (yield n.reload());
                })).apply(this, arguments);
            }
            function Ds(n, e) {
                return $t.apply(this, arguments);
            }
            function $t() {
                return ($t = (0, o.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:update', e);
                })).apply(this, arguments);
            }
            function Kt() {
                return (Kt = (0, o.Z)(function* (
                    n,
                    { displayName: e, photoURL: t }
                ) {
                    if (void 0 === e && void 0 === t) return;
                    const r = (0, l.m9)(n),
                        s = {
                            idToken: yield r.getIdToken(),
                            displayName: e,
                            photoUrl: t,
                            returnSecureToken: !0,
                        },
                        a = yield O(r, Ds(r.auth, s));
                    (r.displayName = a.displayName || null),
                        (r.photoURL = a.photoUrl || null);
                    const u = r.providerData.find(
                        ({ providerId: d }) => 'password' === d
                    );
                    u &&
                        ((u.displayName = r.displayName),
                        (u.photoURL = r.photoURL)),
                        yield r._updateTokensIfNecessary(a);
                })).apply(this, arguments);
            }
            function Ur(n, e, t) {
                return jt.apply(this, arguments);
            }
            function jt() {
                return (jt = (0, o.Z)(function* (n, e, t) {
                    const { auth: r } = n,
                        s = {
                            idToken: yield n.getIdToken(),
                            returnSecureToken: !0,
                        };
                    e && (s.email = e), t && (s.password = t);
                    const a = yield O(n, Rr(r, s));
                    yield n._updateTokensIfNecessary(a, !0);
                })).apply(this, arguments);
            }
            class te {
                constructor(e, t, r = {}) {
                    (this.isNewUser = e),
                        (this.providerId = t),
                        (this.profile = r);
                }
            }
            class Fr extends te {
                constructor(e, t, r, i) {
                    super(e, t, r), (this.username = i);
                }
            }
            class Zs extends te {
                constructor(e, t) {
                    super(e, 'facebook.com', t);
                }
            }
            class Vs extends Fr {
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
            class Ws extends te {
                constructor(e, t) {
                    super(e, 'google.com', t);
                }
            }
            class Hs extends Fr {
                constructor(e, t, r) {
                    super(e, 'twitter.com', t, r);
                }
            }
            function zs(n) {
                const { user: e, _tokenResponse: t } = n;
                return e.isAnonymous && !t
                    ? { providerId: null, isNewUser: !1, profile: null }
                    : (function Fs(n) {
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
                                          null === (e = Ie(n.idToken)) ||
                                          void 0 === e
                                              ? void 0
                                              : e.firebase) || void 0 === t
                                      ? void 0
                                      : t.sign_in_provider;
                              if (a)
                                  return new te(
                                      s,
                                      'anonymous' !== a && 'custom' !== a
                                          ? a
                                          : null
                                  );
                          }
                          if (!r) return null;
                          switch (r) {
                              case 'facebook.com':
                                  return new Zs(s, i);
                              case 'github.com':
                                  return new Vs(s, i);
                              case 'google.com':
                                  return new Ws(s, i);
                              case 'twitter.com':
                                  return new Hs(s, i, n.screenName || null);
                              case 'custom':
                              case 'anonymous':
                                  return new te(s, null);
                              default:
                                  return new te(s, r, i);
                          }
                      })(t);
            }
            class z {
                constructor(e, t) {
                    (this.type = e), (this.credential = t);
                }
                static _fromIdtoken(e) {
                    return new z('enroll', e);
                }
                static _fromMfaPendingCredential(e) {
                    return new z('signin', e);
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
                            return z._fromMfaPendingCredential(
                                e.multiFactorSession.pendingCredential
                            );
                        if (
                            null === (r = e.multiFactorSession) || void 0 === r
                                ? void 0
                                : r.idToken
                        )
                            return z._fromIdtoken(e.multiFactorSession.idToken);
                    }
                    return null;
                }
            }
            class Yt {
                constructor(e, t, r) {
                    (this.session = e),
                        (this.hints = t),
                        (this.signInResolver = r);
                }
                static _fromError(e, t) {
                    const r = y(e),
                        i = t.customData._serverResponse,
                        s = (i.mfaInfo || []).map((u) =>
                            Ae._fromServerResponse(r, u)
                        );
                    c(i.mfaPendingCredential, r, 'internal-error');
                    const a = z._fromMfaPendingCredential(
                        i.mfaPendingCredential
                    );
                    return new Yt(
                        a,
                        s,
                        (function () {
                            var u = (0, o.Z)(function* (d) {
                                const h = yield d._process(r, a);
                                delete i.mfaInfo, delete i.mfaPendingCredential;
                                const p = Object.assign(Object.assign({}, i), {
                                    idToken: h.idToken,
                                    refreshToken: h.refreshToken,
                                });
                                switch (t.operationType) {
                                    case 'signIn':
                                        const f = yield A._fromIdTokenResponse(
                                            r,
                                            t.operationType,
                                            p
                                        );
                                        return (
                                            yield r._updateCurrentUser(f.user),
                                            f
                                        );
                                    case 'reauthenticate':
                                        return (
                                            c(t.user, r, 'internal-error'),
                                            A._forOperation(
                                                t.user,
                                                t.operationType,
                                                p
                                            )
                                        );
                                    default:
                                        v(r, 'internal-error');
                                }
                            });
                            return function (d) {
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
            function qs(n, e) {
                return I(
                    n,
                    'POST',
                    '/v2/accounts/mfaEnrollment:start',
                    m(n, e)
                );
            }
            class Xt {
                constructor(e) {
                    (this.user = e),
                        (this.enrolledFactors = []),
                        e._onReload((t) => {
                            t.mfaInfo &&
                                (this.enrolledFactors = t.mfaInfo.map((r) =>
                                    Ae._fromServerResponse(e.auth, r)
                                ));
                        });
                }
                static _fromUser(e) {
                    return new Xt(e);
                }
                getSession() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        return z._fromIdtoken(yield e.user.getIdToken());
                    })();
                }
                enroll(e, t) {
                    var r = this;
                    return (0, o.Z)(function* () {
                        const i = e,
                            s = yield r.getSession(),
                            a = yield O(r.user, i._process(r.user.auth, s, t));
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
                            s = yield O(
                                t.user,
                                (function $s(n, e) {
                                    return I(
                                        n,
                                        'POST',
                                        '/v2/accounts/mfaEnrollment:withdraw',
                                        m(n, e)
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
            const Qt = new WeakMap(),
                Ne = '__sak';
            class Zr {
                constructor(e, t) {
                    (this.storageRetriever = e), (this.type = t);
                }
                _isAvailable() {
                    try {
                        return this.storage
                            ? (this.storage.setItem(Ne, '1'),
                              this.storage.removeItem(Ne),
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
            const Pe = (() => {
                    class n extends Zr {
                        constructor() {
                            super(() => window.localStorage, 'LOCAL'),
                                (this.boundEventHandler = (t, r) =>
                                    this.onStorageEvent(t, r)),
                                (this.listeners = {}),
                                (this.localCache = {}),
                                (this.pollTimer = null),
                                (this.safariLocalStorageNotSynced =
                                    (function js() {
                                        const n = (0, l.z$)();
                                        return rt(n) || J(n);
                                    })() &&
                                    (function Ki() {
                                        try {
                                            return !(
                                                !window || window === window.top
                                            );
                                        } catch (n) {
                                            return !1;
                                        }
                                    })()),
                                (this.fallbackToPolling = gr()),
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
                                    (u, d, h) => {
                                        this.notifyListeners(u, h);
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
                            !(function $i() {
                                return (
                                    (0, l.w1)() && 10 === document.documentMode
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
                F = (() => {
                    class n extends Zr {
                        constructor() {
                            super(() => window.sessionStorage, 'SESSION');
                        }
                        _addListener(t, r) {}
                        _removeListener(t, r) {}
                    }
                    return (n.type = 'SESSION'), n;
                })();
            let Qs = (() => {
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
                                d = r.handlersMap[a];
                            if (!(null == d ? void 0 : d.size)) return;
                            i.ports[0].postMessage({
                                status: 'ack',
                                eventId: s,
                                eventType: a,
                            });
                            const h = Array.from(d).map(
                                    (function () {
                                        var f = (0, o.Z)(function* (g) {
                                            return g(i.origin, u);
                                        });
                                        return function (g) {
                                            return f.apply(this, arguments);
                                        };
                                    })()
                                ),
                                p = yield (function Xs(n) {
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
                                })(h);
                            i.ports[0].postMessage({
                                status: 'done',
                                eventId: s,
                                eventType: a,
                                response: p,
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
            function he(n = '', e = 10) {
                let t = '';
                for (let r = 0; r < e; r++) t += Math.floor(10 * Math.random());
                return n + t;
            }
            class eo {
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
                        return new Promise((d, h) => {
                            const p = he('', 20);
                            s.port1.start();
                            const f = setTimeout(() => {
                                h(new Error('unsupported_event'));
                            }, r);
                            (u = {
                                messageChannel: s,
                                onMessage(g) {
                                    const N = g;
                                    if (N.data.eventId === p)
                                        switch (N.data.status) {
                                            case 'ack':
                                                clearTimeout(f),
                                                    (a = setTimeout(() => {
                                                        h(new Error('timeout'));
                                                    }, 3e3));
                                                break;
                                            case 'done':
                                                clearTimeout(a),
                                                    d(N.data.response);
                                                break;
                                            default:
                                                clearTimeout(f),
                                                    clearTimeout(a),
                                                    h(
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
                                    { eventType: e, eventId: p, data: t },
                                    [s.port2]
                                );
                        }).finally(() => {
                            u && i.removeMessageHandler(u);
                        });
                    })();
                }
            }
            function _() {
                return window;
            }
            function en() {
                return (
                    void 0 !== _().WorkerGlobalScope &&
                    'function' == typeof _().importScripts
                );
            }
            function tn() {
                return (tn = (0, o.Z)(function* () {
                    if (!(null == navigator ? void 0 : navigator.serviceWorker))
                        return null;
                    try {
                        return (yield navigator.serviceWorker.ready).active;
                    } catch (n) {
                        return null;
                    }
                })).apply(this, arguments);
            }
            const Vr = 'firebaseLocalStorageDb',
                be = 'firebaseLocalStorage',
                Wr = 'fbase_key';
            class fe {
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
            function we(n, e) {
                return n
                    .transaction([be], e ? 'readwrite' : 'readonly')
                    .objectStore(be);
            }
            function nn() {
                const n = indexedDB.open(Vr, 1);
                return new Promise((e, t) => {
                    n.addEventListener('error', () => {
                        t(n.error);
                    }),
                        n.addEventListener('upgradeneeded', () => {
                            const r = n.result;
                            try {
                                r.createObjectStore(be, { keyPath: Wr });
                            } catch (i) {
                                t(i);
                            }
                        }),
                        n.addEventListener(
                            'success',
                            (0, o.Z)(function* () {
                                const r = n.result;
                                r.objectStoreNames.contains(be)
                                    ? e(r)
                                    : (r.close(),
                                      yield (function oo() {
                                          const n =
                                              indexedDB.deleteDatabase(Vr);
                                          return new fe(n).toPromise();
                                      })(),
                                      e(yield nn()));
                            })
                        );
                });
            }
            function Hr(n, e, t) {
                return rn.apply(this, arguments);
            }
            function rn() {
                return (rn = (0, o.Z)(function* (n, e, t) {
                    const r = we(n, !0).put({ [Wr]: e, value: t });
                    return new fe(r).toPromise();
                })).apply(this, arguments);
            }
            function sn() {
                return (sn = (0, o.Z)(function* (n, e) {
                    const t = we(n, !1).get(e),
                        r = yield new fe(t).toPromise();
                    return void 0 === r ? null : r.value;
                })).apply(this, arguments);
            }
            function zr(n, e) {
                const t = we(n, !0).delete(e);
                return new fe(t).toPromise();
            }
            const ne = (() => {
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
                            return t.db || (t.db = yield nn()), t.db;
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
                            return en()
                                ? t.initializeReceiver()
                                : t.initializeSender();
                        })();
                    }
                    initializeReceiver() {
                        var t = this;
                        return (0, o.Z)(function* () {
                            (t.receiver = Qs._getInstance(
                                (function io() {
                                    return en() ? self : null;
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
                                ((t.activeServiceWorker = yield (function no() {
                                    return tn.apply(this, arguments);
                                })()),
                                !t.activeServiceWorker)
                            )
                                return;
                            t.sender = new eo(t.activeServiceWorker);
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
                                (function ro() {
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
                                const t = yield nn();
                                return (
                                    yield Hr(t, Ne, '1'), yield zr(t, Ne), !0
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
                                            Hr(s, t, r)
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
                                (function ao(n, e) {
                                    return sn.apply(this, arguments);
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
                                        yield r._withRetries((i) => zr(i, t)),
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
                                const u = we(a, !1).getAll();
                                return new fe(u).toPromise();
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
            function co(n, e) {
                return I(n, 'POST', '/v2/accounts/mfaSignIn:start', m(n, e));
            }
            function on() {
                return (on = (0, o.Z)(function* (n) {
                    return (
                        (yield I(n, 'GET', '/v1/recaptchaParams'))
                            .recaptchaSiteKey || ''
                    );
                })).apply(this, arguments);
            }
            function Gr(n) {
                return new Promise((e, t) => {
                    const r = document.createElement('script');
                    r.setAttribute('src', n),
                        (r.onload = e),
                        (r.onerror = (i) => {
                            const s = E('internal-error');
                            (s.customData = i), t(s);
                        }),
                        (r.type = 'text/javascript'),
                        (r.charset = 'UTF-8'),
                        (function po() {
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
            function qr(n) {
                return `__${n}${Math.floor(1e6 * Math.random())}`;
            }
            const Oe = 1e12;
            class go {
                constructor(e) {
                    (this.auth = e),
                        (this.counter = Oe),
                        (this._widgets = new Map());
                }
                render(e, t) {
                    const r = this.counter;
                    return (
                        this._widgets.set(
                            r,
                            new vo(e, this.auth.name, t || {})
                        ),
                        this.counter++,
                        r
                    );
                }
                reset(e) {
                    var t;
                    const r = e || Oe;
                    null === (t = this._widgets.get(r)) ||
                        void 0 === t ||
                        t.delete(),
                        this._widgets.delete(r);
                }
                getResponse(e) {
                    var t;
                    return (
                        (null === (t = this._widgets.get(e || Oe)) ||
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
                            null === (r = t._widgets.get(e || Oe)) ||
                                void 0 === r ||
                                r.execute(),
                            ''
                        );
                    })();
                }
            }
            class vo {
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
                    c(i, 'argument-error', { appName: t }),
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
                                this.responseToken = (function Io(n) {
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
            const an = qr('rcb'),
                yo = new se(3e4, 6e4);
            class To {
                constructor() {
                    (this.hostLanguage = ''),
                        (this.counter = 0),
                        (this.librarySeparatelyLoaded = !!_().grecaptcha);
                }
                load(e, t = '') {
                    return (
                        c(
                            (function Ro(n) {
                                return (
                                    n.length <= 6 &&
                                    /^\s*[a-zA-Z0-9\-]*\s*$/.test(n)
                                );
                            })(t),
                            e,
                            'argument-error'
                        ),
                        this.shouldResolveImmediately(t)
                            ? Promise.resolve(_().grecaptcha)
                            : new Promise((r, i) => {
                                  const s = _().setTimeout(() => {
                                      i(E(e, 'network-request-failed'));
                                  }, yo.get());
                                  (_()[an] = () => {
                                      _().clearTimeout(s), delete _()[an];
                                      const u = _().grecaptcha;
                                      if (!u)
                                          return void i(E(e, 'internal-error'));
                                      const d = u.render;
                                      (u.render = (h, p) => {
                                          const f = d(h, p);
                                          return this.counter++, f;
                                      }),
                                          (this.hostLanguage = t),
                                          r(u);
                                  }),
                                      Gr(
                                          `https://www.google.com/recaptcha/api.js??${(0,
                                          l.xO)({
                                              onload: an,
                                              render: 'explicit',
                                              hl: t,
                                          })}`
                                      ).catch(() => {
                                          clearTimeout(s),
                                              i(E(e, 'internal-error'));
                                      });
                              })
                    );
                }
                clearedOneInstance() {
                    this.counter--;
                }
                shouldResolveImmediately(e) {
                    return (
                        !!_().grecaptcha &&
                        (e === this.hostLanguage ||
                            this.counter > 0 ||
                            this.librarySeparatelyLoaded)
                    );
                }
            }
            class ko {
                load(e) {
                    return (0, o.Z)(function* () {
                        return new go(e);
                    })();
                }
                clearedOneInstance() {}
            }
            const Br = 'recaptcha',
                Ao = { theme: 'light', type: 'image' };
            class So {
                constructor(e, t = Object.assign({}, Ao), r) {
                    (this.parameters = t),
                        (this.type = Br),
                        (this.destroyed = !1),
                        (this.widgetId = null),
                        (this.tokenChangeListeners = new Set()),
                        (this.renderPromise = null),
                        (this.recaptcha = null),
                        (this.auth = y(r)),
                        (this.isInvisible =
                            'invisible' === this.parameters.size),
                        c(
                            'undefined' != typeof document,
                            this.auth,
                            'operation-not-supported-in-this-environment'
                        );
                    const i =
                        'string' == typeof e ? document.getElementById(e) : e;
                    c(i, this.auth, 'argument-error'),
                        (this.container = i),
                        (this.parameters.callback = this.makeTokenCallback(
                            this.parameters.callback
                        )),
                        (this._recaptchaLoader = this.auth.settings
                            .appVerificationDisabledForTesting
                            ? new ko()
                            : new To()),
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
                    c(!this.parameters.sitekey, this.auth, 'argument-error'),
                        c(
                            this.isInvisible || !this.container.hasChildNodes(),
                            this.auth,
                            'argument-error'
                        ),
                        c(
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
                            const r = _()[e];
                            'function' == typeof r && r(t);
                        }
                    };
                }
                assertNotDestroyed() {
                    c(!this.destroyed, this.auth, 'internal-error');
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
                        c(ze() && !en(), e.auth, 'internal-error'),
                            yield (function No() {
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
                        const t = yield (function fo(n) {
                            return on.apply(this, arguments);
                        })(e.auth);
                        c(t, e.auth, 'internal-error'),
                            (e.parameters.sitekey = t);
                    })();
                }
                getAssertedRecaptcha() {
                    return (
                        c(this.recaptcha, this.auth, 'internal-error'),
                        this.recaptcha
                    );
                }
            }
            class un {
                constructor(e, t) {
                    (this.verificationId = e), (this.onConfirmation = t);
                }
                confirm(e) {
                    const t = H._fromVerification(this.verificationId, e);
                    return this.onConfirmation(t);
                }
            }
            function ln() {
                return (ln = (0, o.Z)(function* (n, e, t) {
                    const r = y(n),
                        i = yield Ce(r, e, (0, l.m9)(t));
                    return new un(i, (s) => ke(r, s));
                })).apply(this, arguments);
            }
            function cn() {
                return (cn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n);
                    yield Re(!1, r, 'phone');
                    const i = yield Ce(r.auth, e, (0, l.m9)(t));
                    return new un(i, (s) => Dr(r, s));
                })).apply(this, arguments);
            }
            function dn() {
                return (dn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n),
                        i = yield Ce(r.auth, e, (0, l.m9)(t));
                    return new un(i, (s) => xr(r, s));
                })).apply(this, arguments);
            }
            function Ce(n, e, t) {
                return hn.apply(this, arguments);
            }
            function hn() {
                return (hn = (0, o.Z)(function* (n, e, t) {
                    var r;
                    const i = yield t.verify();
                    try {
                        let s;
                        if (
                            (c('string' == typeof i, n, 'argument-error'),
                            c(t.type === Br, n, 'argument-error'),
                            (s = 'string' == typeof e ? { phoneNumber: e } : e),
                            'session' in s)
                        ) {
                            const a = s.session;
                            if ('phoneNumber' in s)
                                return (
                                    c('enroll' === a.type, n, 'internal-error'),
                                    (yield qs(n, {
                                        idToken: a.credential,
                                        phoneEnrollmentInfo: {
                                            phoneNumber: s.phoneNumber,
                                            recaptchaToken: i,
                                        },
                                    })).phoneSessionInfo.sessionInfo
                                );
                            {
                                c('signin' === a.type, n, 'internal-error');
                                const u =
                                    (null === (r = s.multiFactorHint) ||
                                    void 0 === r
                                        ? void 0
                                        : r.uid) || s.multiFactorUid;
                                return (
                                    c(u, n, 'missing-multi-factor-info'),
                                    (yield co(n, {
                                        mfaPendingCredential: a.credential,
                                        mfaEnrollmentId: u,
                                        phoneSignInInfo: { recaptchaToken: i },
                                    })).phoneResponseInfo.sessionInfo
                                );
                            }
                        }
                        {
                            const { sessionInfo: a } = yield us(n, {
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
            function fn() {
                return (fn = (0, o.Z)(function* (n, e) {
                    yield kt((0, l.m9)(n), e);
                })).apply(this, arguments);
            }
            let pe = (() => {
                class n {
                    constructor(t) {
                        (this.providerId = n.PROVIDER_ID), (this.auth = y(t));
                    }
                    verifyPhoneNumber(t, r) {
                        return Ce(this.auth, t, (0, l.m9)(r));
                    }
                    static credential(t, r) {
                        return H._fromVerification(t, r);
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
                        return r && i ? H._fromTokenResponse(r, i) : null;
                    }
                }
                return (
                    (n.PROVIDER_ID = 'phone'),
                    (n.PHONE_SIGN_IN_METHOD = 'phone'),
                    n
                );
            })();
            function G(n, e) {
                return e
                    ? R(e)
                    : (c(n._popupRedirectResolver, n, 'argument-error'),
                      n._popupRedirectResolver);
            }
            class pn extends Y {
                constructor(e) {
                    super('custom', 'custom'), (this.params = e);
                }
                _getIdTokenResponse(e) {
                    return C(e, this._buildIdpRequest());
                }
                _linkToIdToken(e, t) {
                    return C(e, this._buildIdpRequest(t));
                }
                _getReauthenticationResolver(e) {
                    return C(e, this._buildIdpRequest());
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
            function Co(n) {
                return Lr(n.auth, new pn(n), n.bypassAuthState);
            }
            function Lo(n) {
                const { auth: e, user: t } = n;
                return (
                    c(t, e, 'internal-error'),
                    Cr(t, new pn(n), n.bypassAuthState)
                );
            }
            function Do(n) {
                return mn.apply(this, arguments);
            }
            function mn() {
                return (mn = (0, o.Z)(function* (n) {
                    const { auth: e, user: t } = n;
                    return (
                        c(t, e, 'internal-error'),
                        kt(t, new pn(n), n.bypassAuthState)
                    );
                })).apply(this, arguments);
            }
            class $r {
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
                            type: d,
                        } = e;
                        if (u) return void t.reject(u);
                        const h = {
                            auth: t.auth,
                            requestUri: r,
                            sessionId: i,
                            tenantId: a || void 0,
                            postBody: s || void 0,
                            user: t.user,
                            bypassAuthState: t.bypassAuthState,
                        };
                        try {
                            t.resolve(yield t.getIdpTask(d)(h));
                        } catch (p) {
                            t.reject(p);
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
                            return Co;
                        case 'linkViaPopup':
                        case 'linkViaRedirect':
                            return Do;
                        case 'reauthViaPopup':
                        case 'reauthViaRedirect':
                            return Lo;
                        default:
                            v(this.auth, 'internal-error');
                    }
                }
                resolve(e) {
                    S(this.pendingPromise, 'Pending promise was never set'),
                        this.pendingPromise.resolve(e),
                        this.unregisterAndCleanUp();
                }
                reject(e) {
                    S(this.pendingPromise, 'Pending promise was never set'),
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
            const xo = new se(2e3, 1e4);
            function _n() {
                return (_n = (0, o.Z)(function* (n, e, t) {
                    const r = y(n);
                    $(n, e, L);
                    const i = G(r, t);
                    return new In(r, 'signInViaPopup', e, i).executeNotNull();
                })).apply(this, arguments);
            }
            function gn() {
                return (gn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n);
                    $(r.auth, e, L);
                    const i = G(r.auth, t);
                    return new In(
                        r.auth,
                        'reauthViaPopup',
                        e,
                        i,
                        r
                    ).executeNotNull();
                })).apply(this, arguments);
            }
            function vn() {
                return (vn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n);
                    $(r.auth, e, L);
                    const i = G(r.auth, t);
                    return new In(
                        r.auth,
                        'linkViaPopup',
                        e,
                        i,
                        r
                    ).executeNotNull();
                })).apply(this, arguments);
            }
            let In = (() => {
                class n extends $r {
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
                            return c(r, t.auth, 'internal-error'), r;
                        })();
                    }
                    onExecution() {
                        var t = this;
                        return (0, o.Z)(function* () {
                            S(
                                1 === t.filter.length,
                                'Popup operations only handle one event'
                            );
                            const r = he();
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
                                                E(
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
                        this.reject(E(this.auth, 'cancelled-popup-request'));
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
                                              E(
                                                  this.auth,
                                                  'popup-closed-by-user'
                                              )
                                          );
                                  }, 2e3)
                                : window.setTimeout(t, xo.get());
                        };
                        t();
                    }
                }
                return (n.currentPopupAction = null), n;
            })();
            const Le = new Map();
            class Vo extends $r {
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
                        let r = Le.get(t.auth._key());
                        if (!r) {
                            try {
                                const s = (yield (function Wo(n, e) {
                                    return yn.apply(this, arguments);
                                })(t.resolver, t.auth))
                                    ? yield e().call(t)
                                    : null;
                                r = () => Promise.resolve(s);
                            } catch (i) {
                                r = () => Promise.reject(i);
                            }
                            Le.set(t.auth._key(), r);
                        }
                        return (
                            t.bypassAuthState ||
                                Le.set(t.auth._key(), () =>
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
            function yn() {
                return (yn = (0, o.Z)(function* (n, e) {
                    const t = jr(e),
                        r = Kr(n);
                    if (!(yield r._isAvailable())) return !1;
                    const i = 'true' === (yield r._get(t));
                    return yield r._remove(t), i;
                })).apply(this, arguments);
            }
            function En(n, e) {
                return Tn.apply(this, arguments);
            }
            function Tn() {
                return (Tn = (0, o.Z)(function* (n, e) {
                    return Kr(n)._set(jr(e), 'true');
                })).apply(this, arguments);
            }
            function Kr(n) {
                return R(n._redirectPersistence);
            }
            function jr(n) {
                return W('pendingRedirect', n.config.apiKey, n.name);
            }
            function Rn() {
                return (Rn = (0, o.Z)(function* (n, e, t) {
                    const r = y(n);
                    $(n, e, L);
                    const i = G(r, t);
                    return (
                        yield En(i, r),
                        i._openRedirect(r, e, 'signInViaRedirect')
                    );
                })).apply(this, arguments);
            }
            function kn() {
                return (kn = (0, o.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n);
                    $(r.auth, e, L);
                    const i = G(r.auth, t);
                    yield En(i, r.auth);
                    const s = yield Jr(r);
                    return i._openRedirect(r.auth, e, 'reauthViaRedirect', s);
                })).apply(this, arguments);
            }
            function An() {
                return (An = (0, o.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n);
                    $(r.auth, e, L);
                    const i = G(r.auth, t);
                    yield Re(!1, r, e.providerId), yield En(i, r.auth);
                    const s = yield Jr(r);
                    return i._openRedirect(r.auth, e, 'linkViaRedirect', s);
                })).apply(this, arguments);
            }
            function Sn() {
                return (Sn = (0, o.Z)(function* (n, e) {
                    return yield y(n)._initializationPromise, De(n, e, !1);
                })).apply(this, arguments);
            }
            function De(n, e) {
                return Nn.apply(this, arguments);
            }
            function Nn() {
                return (Nn = (0, o.Z)(function* (n, e, t = !1) {
                    const r = y(n),
                        i = G(r, e),
                        a = yield new Vo(r, i, t).execute();
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
            function Jr(n) {
                return Pn.apply(this, arguments);
            }
            function Pn() {
                return (Pn = (0, o.Z)(function* (n) {
                    const e = he(`${n.uid}:::`);
                    return (
                        (n._redirectEventId = e),
                        yield n.auth._setRedirectUser(n),
                        yield n.auth._persistUserIfCurrent(n),
                        e
                    );
                })).apply(this, arguments);
            }
            class Yr {
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
                            !(function Yo(n) {
                                switch (n.type) {
                                    case 'signInViaRedirect':
                                    case 'linkViaRedirect':
                                    case 'reauthViaRedirect':
                                        return !0;
                                    case 'unknown':
                                        return Qr(n);
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
                    if (e.error && !Qr(e)) {
                        const i =
                            (null === (r = e.error.code) || void 0 === r
                                ? void 0
                                : r.split('auth/')[1]) || 'internal-error';
                        t.onError(E(this.auth, i));
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
                        this.cachedEventUids.has(Xr(e))
                    );
                }
                saveEventToCache(e) {
                    this.cachedEventUids.add(Xr(e)),
                        (this.lastProcessedEventTime = Date.now());
                }
            }
            function Xr(n) {
                return [n.type, n.eventId, n.sessionId, n.tenantId]
                    .filter((e) => e)
                    .join('-');
            }
            function Qr({ type: n, error: e }) {
                return (
                    'unknown' === n &&
                    'auth/no-auth-event' === (null == e ? void 0 : e.code)
                );
            }
            function ei(n) {
                return bn.apply(this, arguments);
            }
            function bn() {
                return (bn = (0, o.Z)(function* (n, e = {}) {
                    return I(n, 'GET', '/v1/projects', e);
                })).apply(this, arguments);
            }
            const Xo = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
                Qo = /^https?/;
            function wn() {
                return (wn = (0, o.Z)(function* (n) {
                    if (n.config.emulator) return;
                    const { authorizedDomains: e } = yield ei(n);
                    for (const t of e)
                        try {
                            if (ta(t)) return;
                        } catch (r) {}
                    v(n, 'unauthorized-domain');
                })).apply(this, arguments);
            }
            function ta(n) {
                const e = ie(),
                    { protocol: t, hostname: r } = new URL(e);
                if (n.startsWith('chrome-extension://')) {
                    const a = new URL(n);
                    return '' === a.hostname && '' === r
                        ? 'chrome-extension:' === t &&
                              n.replace('chrome-extension://', '') ===
                                  e.replace('chrome-extension://', '')
                        : 'chrome-extension:' === t && a.hostname === r;
                }
                if (!Qo.test(t)) return !1;
                if (Xo.test(n)) return r === n;
                const i = n.replace(/\./g, '\\.');
                return new RegExp('^(.+\\.' + i + '|' + i + ')$', 'i').test(r);
            }
            const na = new se(3e4, 6e4);
            function ti() {
                const n = _().___jsl;
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
            let xe = null;
            function ia(n) {
                return (
                    (xe =
                        xe ||
                        (function ra(n) {
                            return new Promise((e, t) => {
                                var r, i, s;
                                function a() {
                                    ti(),
                                        gapi.load('gapi.iframes', {
                                            callback: () => {
                                                e(gapi.iframes.getContext());
                                            },
                                            ontimeout: () => {
                                                ti(),
                                                    t(
                                                        E(
                                                            n,
                                                            'network-request-failed'
                                                        )
                                                    );
                                            },
                                            timeout: na.get(),
                                        });
                                }
                                if (
                                    null ===
                                        (i =
                                            null === (r = _().gapi) ||
                                            void 0 === r
                                                ? void 0
                                                : r.iframes) || void 0 === i
                                        ? void 0
                                        : i.Iframe
                                )
                                    e(gapi.iframes.getContext());
                                else {
                                    if (
                                        !(null === (s = _().gapi) ||
                                        void 0 === s
                                            ? void 0
                                            : s.load)
                                    ) {
                                        const u = qr('iframefcb');
                                        return (
                                            (_()[u] = () => {
                                                gapi.load
                                                    ? a()
                                                    : t(
                                                          E(
                                                              n,
                                                              'network-request-failed'
                                                          )
                                                      );
                                            }),
                                            Gr(
                                                `https://apis.google.com/js/api.js?onload=${u}`
                                            ).catch((d) => t(d))
                                        );
                                    }
                                    a();
                                }
                            }).catch((e) => {
                                throw ((xe = null), e);
                            });
                        })(n)),
                    xe
                );
            }
            const sa = new se(5e3, 15e3),
                ua = {
                    style: {
                        position: 'absolute',
                        top: '-100px',
                        width: '1px',
                        height: '1px',
                    },
                    'aria-hidden': 'true',
                    tabindex: '-1',
                },
                la = new Map([
                    ['identitytoolkit.googleapis.com', 'p'],
                    ['staging-identitytoolkit.sandbox.googleapis.com', 's'],
                    ['test-identitytoolkit.sandbox.googleapis.com', 't'],
                ]);
            function ca(n) {
                const e = n.config;
                c(e.authDomain, n, 'auth-domain-config-required');
                const t = e.emulator
                        ? Ge(e, 'emulator/auth/iframe')
                        : `https://${n.config.authDomain}/__/auth/iframe`,
                    r = { apiKey: e.apiKey, appName: n.name, v: M.SDK_VERSION },
                    i = la.get(n.config.apiHost);
                i && (r.eid = i);
                const s = n._getFrameworks();
                return (
                    s.length && (r.fw = s.join(',')),
                    `${t}?${(0, l.xO)(r).slice(1)}`
                );
            }
            function On() {
                return (
                    (On = (0, o.Z)(function* (n) {
                        const e = yield ia(n),
                            t = _().gapi;
                        return (
                            c(t, n, 'internal-error'),
                            e.open(
                                {
                                    where: document.body,
                                    url: ca(n),
                                    messageHandlersFilter:
                                        t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
                                    attributes: ua,
                                    dontclear: !0,
                                },
                                (r) =>
                                    new Promise(
                                        (function () {
                                            var i = (0, o.Z)(function* (s, a) {
                                                yield r.restyle({
                                                    setHideOnLeave: !1,
                                                });
                                                const u = E(
                                                        n,
                                                        'network-request-failed'
                                                    ),
                                                    d = _().setTimeout(() => {
                                                        a(u);
                                                    }, sa.get());
                                                function h() {
                                                    _().clearTimeout(d), s(r);
                                                }
                                                r.ping(h).then(h, () => {
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
                    On.apply(this, arguments)
                );
            }
            const ha = {
                location: 'yes',
                resizable: 'yes',
                statusbar: 'yes',
                toolbar: 'no',
            };
            class ni {
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
            function Cn(n, e, t, r, i, s) {
                c(n.config.authDomain, n, 'auth-domain-config-required'),
                    c(n.config.apiKey, n, 'invalid-api-key');
                const a = {
                    apiKey: n.config.apiKey,
                    appName: n.name,
                    authType: t,
                    redirectUrl: r,
                    v: M.SDK_VERSION,
                    eventId: i,
                };
                if (e instanceof L) {
                    e.setDefaultLanguage(n.languageCode),
                        (a.providerId = e.providerId || ''),
                        (0, l.xb)(e.getCustomParameters()) ||
                            (a.customParameters = JSON.stringify(
                                e.getCustomParameters()
                            ));
                    for (const [d, h] of Object.entries(s || {})) a[d] = h;
                }
                if (e instanceof X) {
                    const d = e.getScopes().filter((h) => '' !== h);
                    d.length > 0 && (a.scopes = d.join(','));
                }
                n.tenantId && (a.tid = n.tenantId);
                const u = a;
                for (const d of Object.keys(u)) void 0 === u[d] && delete u[d];
                return `${(function Ea({ config: n }) {
                    return n.emulator
                        ? Ge(n, 'emulator/auth/handler')
                        : `https://${n.authDomain}/__/auth/handler`;
                })(n)}?${(0, l.xO)(u).slice(1)}`;
            }
            const Ln = 'webStorageSupport';
            class Dn extends class Ra {
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
                            return P('unexpected MultiFactorSessionType');
                    }
                }
            } {
                constructor(e) {
                    super('phone'), (this.credential = e);
                }
                static _fromCredential(e) {
                    return new Dn(e);
                }
                _finalizeEnroll(e, t, r) {
                    return (function Bs(n, e) {
                        return I(
                            n,
                            'POST',
                            '/v2/accounts/mfaEnrollment:finalize',
                            m(n, e)
                        );
                    })(e, {
                        idToken: t,
                        displayName: r,
                        phoneVerificationInfo:
                            this.credential._makeVerificationRequest(),
                    });
                }
                _finalizeSignIn(e, t) {
                    return (function ho(n, e) {
                        return I(
                            n,
                            'POST',
                            '/v2/accounts/mfaSignIn:finalize',
                            m(n, e)
                        );
                    })(e, {
                        mfaPendingCredential: t,
                        phoneVerificationInfo:
                            this.credential._makeVerificationRequest(),
                    });
                }
            }
            let ka = (() => {
                class n {
                    constructor() {}
                    static assertion(t) {
                        return Dn._fromCredential(t);
                    }
                }
                return (n.FACTOR_ID = 'phone'), n;
            })();
            var ii = '@firebase/auth';
            class Aa {
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
                    c(
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
            function q() {
                return window;
            }
            function xn() {
                return (xn = (0, o.Z)(function* (n, e, t) {
                    var r;
                    const { BuildInfo: i } = q();
                    S(e.sessionId, 'AuthEvent did not contain a session ID');
                    const s = yield Da(e.sessionId),
                        a = {};
                    return (
                        J()
                            ? (a.ibi = i.packageName)
                            : le()
                            ? (a.apn = i.packageName)
                            : v(
                                  n,
                                  'operation-not-supported-in-this-environment'
                              ),
                        i.displayName && (a.appDisplayName = i.displayName),
                        (a.sessionId = s),
                        Cn(
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
            function Mn() {
                return (Mn = (0, o.Z)(function* (n) {
                    const { BuildInfo: e } = q(),
                        t = {};
                    J()
                        ? (t.iosBundleId = e.packageName)
                        : le()
                        ? (t.androidPackageName = e.packageName)
                        : v(n, 'operation-not-supported-in-this-environment'),
                        yield ei(n, t);
                })).apply(this, arguments);
            }
            function Un() {
                return (Un = (0, o.Z)(function* (n, e, t) {
                    const { cordova: r } = q();
                    let i = () => {};
                    try {
                        yield new Promise((s, a) => {
                            let u = null;
                            function d() {
                                var f;
                                s();
                                const g =
                                    null === (f = r.plugins.browsertab) ||
                                    void 0 === f
                                        ? void 0
                                        : f.close;
                                'function' == typeof g && g(),
                                    'function' ==
                                        typeof (null == t ? void 0 : t.close) &&
                                        t.close();
                            }
                            function h() {
                                u ||
                                    (u = window.setTimeout(() => {
                                        a(E(n, 'redirect-cancelled-by-user'));
                                    }, 2e3));
                            }
                            function p() {
                                'visible' ===
                                    (null == document
                                        ? void 0
                                        : document.visibilityState) && h();
                            }
                            e.addPassiveListener(d),
                                document.addEventListener('resume', h, !1),
                                le() &&
                                    document.addEventListener(
                                        'visibilitychange',
                                        p,
                                        !1
                                    ),
                                (i = () => {
                                    e.removePassiveListener(d),
                                        document.removeEventListener(
                                            'resume',
                                            h,
                                            !1
                                        ),
                                        document.removeEventListener(
                                            'visibilitychange',
                                            p,
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
            function Da(n) {
                return Fn.apply(this, arguments);
            }
            function Fn() {
                return (Fn = (0, o.Z)(function* (n) {
                    const e = xa(n),
                        t = yield crypto.subtle.digest('SHA-256', e);
                    return Array.from(new Uint8Array(t))
                        .map((i) => i.toString(16).padStart(2, '0'))
                        .join('');
                })).apply(this, arguments);
            }
            function xa(n) {
                if (
                    (S(
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
            !(function Na(n) {
                (0, M._registerComponent)(
                    new We.wA(
                        'auth',
                        (e, { options: t }) => {
                            const r = e.getProvider('app').getImmediate(),
                                { apiKey: i, authDomain: s } = r.options;
                            return ((a) => {
                                c(i && !i.includes(':'), 'invalid-api-key', {
                                    appName: a.name,
                                }),
                                    c(
                                        !(null == s ? void 0 : s.includes(':')),
                                        'argument-error',
                                        { appName: a.name }
                                    );
                                const u = {
                                        apiKey: i,
                                        authDomain: s,
                                        clientPlatform: n,
                                        apiHost:
                                            'identitytoolkit.googleapis.com',
                                        tokenApiHost:
                                            'securetoken.googleapis.com',
                                        apiScheme: 'https',
                                        sdkClientVersion: vr(n),
                                    },
                                    d = new ji(a, u);
                                return (
                                    (function Pi(n, e) {
                                        const t =
                                                (null == e
                                                    ? void 0
                                                    : e.persistence) || [],
                                            r = (
                                                Array.isArray(t) ? t : [t]
                                            ).map(R);
                                        (null == e ? void 0 : e.errorMap) &&
                                            n._updateErrorMap(e.errorMap),
                                            n._initializeWithPersistence(
                                                r,
                                                null == e
                                                    ? void 0
                                                    : e.popupRedirectResolver
                                            );
                                    })(d, t),
                                    d
                                );
                            })(r);
                        },
                        'PUBLIC'
                    )
                        .setInstantiationMode('EXPLICIT')
                        .setInstanceCreatedCallback((e, t, r) => {
                            e.getProvider('auth-internal').initialize();
                        })
                ),
                    (0, M._registerComponent)(
                        new We.wA(
                            'auth-internal',
                            (e) => {
                                const t = y(
                                    e.getProvider('auth').getImmediate()
                                );
                                return new Aa(t);
                            },
                            'PRIVATE'
                        ).setInstantiationMode('EXPLICIT')
                    ),
                    (0, M.registerVersion)(
                        ii,
                        '0.19.7',
                        (function Sa(n) {
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
                    (0, M.registerVersion)(ii, '0.19.7', 'esm2017');
            })('Browser');
            class Ua extends Yr {
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
            function oi(n) {
                return Zn.apply(this, arguments);
            }
            function Zn() {
                return (Zn = (0, o.Z)(function* (n) {
                    const e = yield Vn()._get(Wn(n));
                    return e && (yield Vn()._remove(Wn(n))), e;
                })).apply(this, arguments);
            }
            function Wa() {
                const n = [],
                    e =
                        '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                for (let t = 0; t < 20; t++) {
                    const r = Math.floor(Math.random() * e.length);
                    n.push(e.charAt(r));
                }
                return n.join('');
            }
            function Vn() {
                return R(Pe);
            }
            function Wn(n) {
                return W('authEvent', n.config.apiKey, n.name);
            }
            function Me(n) {
                if (!(null == n ? void 0 : n.includes('?'))) return {};
                const [e, ...t] = n.split('?');
                return (0, l.zd)(t.join('?'));
            }
            function ai() {
                return {
                    type: 'unknown',
                    eventId: null,
                    sessionId: null,
                    urlResponse: null,
                    postBody: null,
                    tenantId: null,
                    error: E('no-auth-event'),
                };
            }
            function Ue() {
                var n;
                return (
                    (null === (n = null == self ? void 0 : self.location) ||
                    void 0 === n
                        ? void 0
                        : n.protocol) || null
                );
            }
            function ui(n = (0, l.z$)()) {
                return !(
                    ('file:' !== Ue() && 'ionic:' !== Ue()) ||
                    !n.toLowerCase().match(/iphone|ipad|ipod|android/)
                );
            }
            function li() {
                try {
                    const n = self.localStorage,
                        e = he();
                    if (n)
                        return (
                            n.setItem(e, '1'),
                            n.removeItem(e),
                            !(function tu(n = (0, l.z$)()) {
                                return (
                                    (function Qa() {
                                        return (
                                            (0, l.w1)() &&
                                            11 ===
                                                (null == document
                                                    ? void 0
                                                    : document.documentMode)
                                        );
                                    })() ||
                                    (function eu(n = (0, l.z$)()) {
                                        return /Edge\/\d+/.test(n);
                                    })(n)
                                );
                            })() || (0, l.hl)()
                        );
                } catch (n) {
                    return Hn() && (0, l.hl)();
                }
                return !1;
            }
            function Hn() {
                return (
                    'undefined' != typeof global &&
                    'WorkerGlobalScope' in global &&
                    'importScripts' in global
                );
            }
            function zn() {
                return (
                    ((function Ya() {
                        return 'http:' === Ue() || 'https:' === Ue();
                    })() ||
                        (0, l.ru)() ||
                        ui()) &&
                    !(function Xa() {
                        return (0, l.b$)() || (0, l.UG)();
                    })() &&
                    li() &&
                    !Hn()
                );
            }
            function ci() {
                return ui() && 'undefined' != typeof document;
            }
            function Gn() {
                return (Gn = (0, o.Z)(function* () {
                    return (
                        !!ci() &&
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
            const k = { LOCAL: 'local', NONE: 'none', SESSION: 'session' },
                me = c,
                di = 'persistence';
            function qn(n) {
                return Bn.apply(this, arguments);
            }
            function Bn() {
                return (Bn = (0, o.Z)(function* (n) {
                    yield n._initializationPromise;
                    const e = hi(),
                        t = W(di, n.config.apiKey, n.name);
                    e && e.setItem(t, n._getPersistence());
                })).apply(this, arguments);
            }
            function hi() {
                var n;
                try {
                    return (
                        (null ===
                            (n = (function ru() {
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
            const ou = c;
            class Z {
                constructor() {
                    (this.browserResolver = R(
                        class Ta {
                            constructor() {
                                (this.eventManagers = {}),
                                    (this.iframes = {}),
                                    (this.originValidationPromises = {}),
                                    (this._redirectPersistence = F),
                                    (this._completeRedirectFn = De);
                            }
                            _openPopup(e, t, r, i) {
                                var s = this;
                                return (0, o.Z)(function* () {
                                    var a;
                                    S(
                                        null ===
                                            (a = s.eventManagers[e._key()]) ||
                                            void 0 === a
                                            ? void 0
                                            : a.manager,
                                        '_initialize() not called before _openPopup()'
                                    );
                                    const u = Cn(e, t, r, ie(), i);
                                    return (function ga(
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
                                        const d = Object.assign(
                                                Object.assign({}, ha),
                                                {
                                                    width: r.toString(),
                                                    height: i.toString(),
                                                    top: s,
                                                    left: a,
                                                }
                                            ),
                                            h = (0, l.z$)().toLowerCase();
                                        t && (u = fr(h) ? '_blank' : t),
                                            hr(h) &&
                                                ((e = e || 'http://localhost'),
                                                (d.scrollbars = 'yes'));
                                        const p = Object.entries(d).reduce(
                                            (g, [N, Fe]) => `${g}${N}=${Fe},`,
                                            ''
                                        );
                                        if (
                                            (function Bi(n = (0, l.z$)()) {
                                                var e;
                                                return (
                                                    J(n) &&
                                                    !!(null ===
                                                        (e =
                                                            window.navigator) ||
                                                    void 0 === e
                                                        ? void 0
                                                        : e.standalone)
                                                );
                                            })(h) &&
                                            '_self' !== u
                                        )
                                            return (
                                                (function va(n, e) {
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
                                                new ni(null)
                                            );
                                        const f = window.open(e || '', u, p);
                                        c(f, n, 'popup-blocked');
                                        try {
                                            f.focus();
                                        } catch (g) {}
                                        return new ni(f);
                                    })(e, u, he());
                                })();
                            }
                            _openRedirect(e, t, r, i) {
                                var s = this;
                                return (0, o.Z)(function* () {
                                    return (
                                        yield s._originValidation(e),
                                        (function to(n) {
                                            _().location.href = n;
                                        })(Cn(e, t, r, ie(), i)),
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
                                        : (S(
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
                                    const r = yield (function da(n) {
                                            return On.apply(this, arguments);
                                        })(e),
                                        i = new Yr(e);
                                    return (
                                        r.register(
                                            'authEvent',
                                            (s) => (
                                                c(
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
                                    Ln,
                                    { type: Ln },
                                    (i) => {
                                        var s;
                                        const a =
                                            null ===
                                                (s =
                                                    null == i
                                                        ? void 0
                                                        : i[0]) || void 0 === s
                                                ? void 0
                                                : s[Ln];
                                        void 0 !== a && t(!!a),
                                            v(e, 'internal-error');
                                    },
                                    gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
                                );
                            }
                            _originValidation(e) {
                                const t = e._key();
                                return (
                                    this.originValidationPromises[t] ||
                                        (this.originValidationPromises[t] =
                                            (function ea(n) {
                                                return wn.apply(
                                                    this,
                                                    arguments
                                                );
                                            })(e)),
                                    this.originValidationPromises[t]
                                );
                            }
                            get _shouldInitProactively() {
                                return gr() || rt() || J();
                            }
                        }
                    )),
                        (this.cordovaResolver = R(
                            class qa {
                                constructor() {
                                    (this._redirectPersistence = F),
                                        (this._shouldInitProactively = !0),
                                        (this.eventManagers = new Map()),
                                        (this.originValidationPromises = {}),
                                        (this._completeRedirectFn = De);
                                }
                                _initialize(e) {
                                    var t = this;
                                    return (0, o.Z)(function* () {
                                        const r = e._key();
                                        let i = t.eventManagers.get(r);
                                        return (
                                            i ||
                                                ((i = new Ua(e)),
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
                                    v(
                                        e,
                                        'operation-not-supported-in-this-environment'
                                    );
                                }
                                _openRedirect(e, t, r, i) {
                                    var s = this;
                                    return (0, o.Z)(function* () {
                                        !(function La(n) {
                                            var e, t, r, i, s, a, u, d, h, p;
                                            const f = q();
                                            c(
                                                'function' ==
                                                    typeof (null ===
                                                        (e =
                                                            null == f
                                                                ? void 0
                                                                : f.universalLinks) ||
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
                                                c(
                                                    void 0 !==
                                                        (null ===
                                                            (t =
                                                                null == f
                                                                    ? void 0
                                                                    : f.BuildInfo) ||
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
                                                c(
                                                    'function' ==
                                                        typeof (null ===
                                                            (s =
                                                                null ===
                                                                    (i =
                                                                        null ===
                                                                            (r =
                                                                                null ==
                                                                                f
                                                                                    ? void 0
                                                                                    : f.cordova) ||
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
                                                c(
                                                    'function' ==
                                                        typeof (null ===
                                                            (d =
                                                                null ===
                                                                    (u =
                                                                        null ===
                                                                            (a =
                                                                                null ==
                                                                                f
                                                                                    ? void 0
                                                                                    : f.cordova) ||
                                                                        void 0 ===
                                                                            a
                                                                            ? void 0
                                                                            : a.plugins) ||
                                                                void 0 === u
                                                                    ? void 0
                                                                    : u.browsertab) ||
                                                        void 0 === d
                                                            ? void 0
                                                            : d.isAvailable),
                                                    n,
                                                    'invalid-cordova-configuration',
                                                    {
                                                        missingPlugin:
                                                            'cordova-plugin-browsertab',
                                                    }
                                                ),
                                                c(
                                                    'function' ==
                                                        typeof (null ===
                                                            (p =
                                                                null ===
                                                                    (h =
                                                                        null ==
                                                                        f
                                                                            ? void 0
                                                                            : f.cordova) ||
                                                                void 0 === h
                                                                    ? void 0
                                                                    : h.InAppBrowser) ||
                                                        void 0 === p
                                                            ? void 0
                                                            : p.open),
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
                                            (function Ho() {
                                                Le.clear();
                                            })(),
                                            yield s._originValidation(e);
                                        const u = (function Fa(n, e, t = null) {
                                            return {
                                                type: e,
                                                eventId: t,
                                                urlResponse: null,
                                                sessionId: Wa(),
                                                postBody: null,
                                                tenantId: n.tenantId,
                                                error: E(n, 'no-auth-event'),
                                            };
                                        })(e, r, i);
                                        yield (function Za(n, e) {
                                            return Vn()._set(Wn(n), e);
                                        })(e, u);
                                        const d = yield (function ba(n, e, t) {
                                                return xn.apply(
                                                    this,
                                                    arguments
                                                );
                                            })(e, u, t),
                                            h = yield (function Oa(n) {
                                                const { cordova: e } = q();
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
                                                                          (function qi(
                                                                              n = (0,
                                                                              l.z$)()
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
                                            })(d);
                                        return (function Ca(n, e, t) {
                                            return Un.apply(this, arguments);
                                        })(e, a, h);
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
                                                (function wa(n) {
                                                    return Mn.apply(
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
                                        } = q(),
                                        a = setTimeout(
                                            (0, o.Z)(function* () {
                                                yield oi(e), t.onEvent(ai());
                                            }),
                                            500
                                        ),
                                        u = (function () {
                                            var p = (0, o.Z)(function* (f) {
                                                clearTimeout(a);
                                                const g = yield oi(e);
                                                let N = null;
                                                g &&
                                                    (null == f
                                                        ? void 0
                                                        : f.url) &&
                                                    (N = (function Va(n, e) {
                                                        var t, r;
                                                        const i = (function za(
                                                            n
                                                        ) {
                                                            const e = Me(n),
                                                                t = e.link
                                                                    ? decodeURIComponent(
                                                                          e.link
                                                                      )
                                                                    : void 0,
                                                                r = Me(t).link,
                                                                i =
                                                                    e.deep_link_id
                                                                        ? decodeURIComponent(
                                                                              e.deep_link_id
                                                                          )
                                                                        : void 0;
                                                            return (
                                                                Me(i).link ||
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
                                                            const s = Me(i),
                                                                a =
                                                                    s.firebaseError
                                                                        ? (function Ha(
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
                                                                d = u
                                                                    ? E(u)
                                                                    : null;
                                                            return d
                                                                ? {
                                                                      type: n.type,
                                                                      eventId:
                                                                          n.eventId,
                                                                      tenantId:
                                                                          n.tenantId,
                                                                      error: d,
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
                                                    })(g, f.url)),
                                                    t.onEvent(N || ai());
                                            });
                                            return function (g) {
                                                return p.apply(this, arguments);
                                            };
                                        })();
                                    void 0 !== r &&
                                        'function' == typeof r.subscribe &&
                                        r.subscribe(null, u);
                                    const d = i,
                                        h = `${s.packageName.toLowerCase()}://`;
                                    q().handleOpenURL = (function () {
                                        var p = (0, o.Z)(function* (f) {
                                            if (
                                                (f
                                                    .toLowerCase()
                                                    .startsWith(h) &&
                                                    u({ url: f }),
                                                'function' == typeof d)
                                            )
                                                try {
                                                    d(f);
                                                } catch (g) {
                                                    console.error(g);
                                                }
                                        });
                                        return function (f) {
                                            return p.apply(this, arguments);
                                        };
                                    })();
                                }
                            }
                        )),
                        (this.underlyingResolver = null),
                        (this._redirectPersistence = F),
                        (this._completeRedirectFn = De);
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
                    return ci() || this.browserResolver._shouldInitProactively;
                }
                get assertedUnderlyingResolver() {
                    return (
                        ou(this.underlyingResolver, 'internal-error'),
                        this.underlyingResolver
                    );
                }
                selectUnderlyingResolver() {
                    var e = this;
                    return (0, o.Z)(function* () {
                        if (e.underlyingResolver) return;
                        const t = yield (function nu() {
                            return Gn.apply(this, arguments);
                        })();
                        e.underlyingResolver = t
                            ? e.cordovaResolver
                            : e.browserResolver;
                    })();
                }
            }
            function fi(n) {
                return n.unwrap();
            }
            function uu(n) {
                return pi(n);
            }
            function pi(n) {
                const { _tokenResponse: e } =
                    n instanceof l.ZR ? n.customData : n;
                if (!e) return null;
                if (
                    !(n instanceof l.ZR) &&
                    'temporaryProof' in e &&
                    'phoneNumber' in e
                )
                    return pe.credentialFromResult(n);
                const t = e.providerId;
                if (!t || 'password' === t) return null;
                let r;
                switch (t) {
                    case 'google.com':
                        r = Ar;
                        break;
                    case 'facebook.com':
                        r = kr;
                        break;
                    case 'github.com':
                        r = Sr;
                        break;
                    case 'twitter.com':
                        r = Nr;
                        break;
                    default:
                        const {
                            oauthIdToken: i,
                            oauthAccessToken: s,
                            oauthTokenSecret: a,
                            pendingToken: u,
                            nonce: d,
                        } = e;
                        return s || a || i || u
                            ? u
                                ? t.startsWith('saml.')
                                    ? ee._create(t, u)
                                    : b._fromParams({
                                          providerId: t,
                                          signInMethod: t,
                                          pendingToken: u,
                                          idToken: i,
                                          accessToken: s,
                                      })
                                : new Q(t).credential({
                                      idToken: i,
                                      accessToken: s,
                                      rawNonce: d,
                                  })
                            : null;
                }
                return n instanceof l.ZR
                    ? r.credentialFromError(n)
                    : r.credentialFromResult(n);
            }
            function T(n, e) {
                return e
                    .catch((t) => {
                        throw (
                            (t instanceof l.ZR &&
                                (function lu(n, e) {
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
                                        e.resolver = new cu(
                                            n,
                                            (function Gs(n, e) {
                                                var t;
                                                const r = (0, l.m9)(n),
                                                    i = e;
                                                return (
                                                    c(
                                                        e.customData
                                                            .operationType,
                                                        r,
                                                        'argument-error'
                                                    ),
                                                    c(
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
                                                    Yt._fromError(r, i)
                                                );
                                            })(n, e)
                                        );
                                    else if (r) {
                                        const i = pi(e),
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
                            credential: uu(t),
                            additionalUserInfo: zs(t),
                            user: D.getOrCreate(i),
                        };
                    });
            }
            function $n(n, e) {
                return Kn.apply(this, arguments);
            }
            function Kn() {
                return (Kn = (0, o.Z)(function* (n, e) {
                    const t = yield e;
                    return {
                        verificationId: t.verificationId,
                        confirm: (r) => T(n, t.confirm(r)),
                    };
                })).apply(this, arguments);
            }
            class cu {
                constructor(e, t) {
                    (this.resolver = t),
                        (this.auth = (function au(n) {
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
                    return T(fi(this.auth), this.resolver.resolveSignIn(e));
                }
            }
            class D {
                constructor(e) {
                    (this._delegate = e),
                        (this.multiFactor = (function Ks(n) {
                            const e = (0, l.m9)(n);
                            return (
                                Qt.has(e) || Qt.set(e, Xt._fromUser(e)),
                                Qt.get(e)
                            );
                        })(e));
                }
                static getOrCreate(e) {
                    return (
                        D.USER_MAP.has(e) || D.USER_MAP.set(e, new D(e)),
                        D.USER_MAP.get(e)
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
                        return T(t.auth, Dr(t._delegate, e));
                    })();
                }
                linkWithPhoneNumber(e, t) {
                    var r = this;
                    return (0, o.Z)(function* () {
                        return $n(
                            r.auth,
                            (function bo(n, e, t) {
                                return cn.apply(this, arguments);
                            })(r._delegate, e, t)
                        );
                    })();
                }
                linkWithPopup(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return T(
                            t.auth,
                            (function Fo(n, e, t) {
                                return vn.apply(this, arguments);
                            })(t._delegate, e, Z)
                        );
                    })();
                }
                linkWithRedirect(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return (
                            yield qn(y(t.auth)),
                            (function $o(n, e, t) {
                                return (function Ko(n, e, t) {
                                    return An.apply(this, arguments);
                                })(n, e, t);
                            })(t._delegate, e, Z)
                        );
                    })();
                }
                reauthenticateAndRetrieveDataWithCredential(e) {
                    return this.reauthenticateWithCredential(e);
                }
                reauthenticateWithCredential(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return T(t.auth, xr(t._delegate, e));
                    })();
                }
                reauthenticateWithPhoneNumber(e, t) {
                    return $n(
                        this.auth,
                        (function wo(n, e, t) {
                            return dn.apply(this, arguments);
                        })(this._delegate, e, t)
                    );
                }
                reauthenticateWithPopup(e) {
                    return T(
                        this.auth,
                        (function Uo(n, e, t) {
                            return gn.apply(this, arguments);
                        })(this._delegate, e, Z)
                    );
                }
                reauthenticateWithRedirect(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return (
                            yield qn(y(t.auth)),
                            (function qo(n, e, t) {
                                return (function Bo(n, e, t) {
                                    return kn.apply(this, arguments);
                                })(n, e, t);
                            })(t._delegate, e, Z)
                        );
                    })();
                }
                sendEmailVerification(e) {
                    return (function Cs(n, e) {
                        return qt.apply(this, arguments);
                    })(this._delegate, e);
                }
                unlink(e) {
                    var t = this;
                    return (0, o.Z)(function* () {
                        return (
                            yield (function vs(n, e) {
                                return Rt.apply(this, arguments);
                            })(t._delegate, e),
                            t
                        );
                    })();
                }
                updateEmail(e) {
                    return (function Ms(n, e) {
                        return Ur((0, l.m9)(n), e, null);
                    })(this._delegate, e);
                }
                updatePassword(e) {
                    return (function Us(n, e) {
                        return Ur((0, l.m9)(n), null, e);
                    })(this._delegate, e);
                }
                updatePhoneNumber(e) {
                    return (function Oo(n, e) {
                        return fn.apply(this, arguments);
                    })(this._delegate, e);
                }
                updateProfile(e) {
                    return (function xs(n, e) {
                        return Kt.apply(this, arguments);
                    })(this._delegate, e);
                }
                verifyBeforeUpdateEmail(e, t) {
                    return (function Ls(n, e, t) {
                        return Bt.apply(this, arguments);
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
            D.USER_MAP = new WeakMap();
            const _e = c;
            let mi = (() => {
                class n {
                    constructor(t, r) {
                        if (((this.app = t), r.isInitialized()))
                            return (
                                (this._delegate = r.getImmediate()),
                                void this.linkUnderlyingAuth()
                            );
                        const { apiKey: i } = t.options;
                        _e(i, 'invalid-api-key', { appName: t.name }),
                            _e(i, 'invalid-api-key', { appName: t.name });
                        const s = 'undefined' != typeof window ? Z : void 0;
                        (this._delegate = r.initialize({
                            options: {
                                persistence: du(i, t.name),
                                popupRedirectResolver: s,
                            },
                        })),
                            this._delegate._updateErrorMap(Ai),
                            this.linkUnderlyingAuth();
                    }
                    get emulatorConfig() {
                        return this._delegate.emulatorConfig;
                    }
                    get currentUser() {
                        return this._delegate.currentUser
                            ? D.getOrCreate(this._delegate.currentUser)
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
                        !(function Ji(n, e, t) {
                            const r = y(n);
                            c(r._canInitEmulator, r, 'emulator-config-failed'),
                                c(
                                    /^https?:\/\//.test(e),
                                    r,
                                    'invalid-emulator-scheme'
                                );
                            const i = !!(null == t
                                    ? void 0
                                    : t.disableWarnings),
                                s = yr(e),
                                { host: a, port: u } = (function Yi(n) {
                                    const e = yr(n),
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
                                            port: Er(r.substr(s.length + 1)),
                                        };
                                    }
                                    {
                                        const [s, a] = r.split(':');
                                        return { host: s, port: Er(a) };
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
                                    (function Xi() {
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
                        return (function Rs(n, e) {
                            return Ut.apply(this, arguments);
                        })(this._delegate, t);
                    }
                    checkActionCode(t) {
                        return Mr(this._delegate, t);
                    }
                    confirmPasswordReset(t, r) {
                        return (function Ts(n, e, t) {
                            return Mt.apply(this, arguments);
                        })(this._delegate, t, r);
                    }
                    createUserWithEmailAndPassword(t, r) {
                        var i = this;
                        return (0, o.Z)(function* () {
                            return T(
                                i._delegate,
                                (function As(n, e, t) {
                                    return Vt.apply(this, arguments);
                                })(i._delegate, t, r)
                            );
                        })();
                    }
                    fetchProvidersForEmail(t) {
                        return this.fetchSignInMethodsForEmail(t);
                    }
                    fetchSignInMethodsForEmail(t) {
                        return (function Os(n, e) {
                            return Gt.apply(this, arguments);
                        })(this._delegate, t);
                    }
                    isSignInWithEmailLink(t) {
                        return (function Ps(n, e) {
                            const t = de.parseLink(e);
                            return (
                                'EMAIL_SIGNIN' ===
                                (null == t ? void 0 : t.operation)
                            );
                        })(0, t);
                    }
                    getRedirectResult() {
                        var t = this;
                        return (0, o.Z)(function* () {
                            _e(
                                zn(),
                                t._delegate,
                                'operation-not-supported-in-this-environment'
                            );
                            const r = yield (function jo(n, e) {
                                return Sn.apply(this, arguments);
                            })(t._delegate, Z);
                            return r
                                ? T(t._delegate, Promise.resolve(r))
                                : { credential: null, user: null };
                        })();
                    }
                    addFrameworkForLogging(t) {
                        !(function $a(n, e) {
                            y(n)._logFramework(e);
                        })(this._delegate, t);
                    }
                    onAuthStateChanged(t, r, i) {
                        const { next: s, error: a, complete: u } = _i(t, r, i);
                        return this._delegate.onAuthStateChanged(s, a, u);
                    }
                    onIdTokenChanged(t, r, i) {
                        const { next: s, error: a, complete: u } = _i(t, r, i);
                        return this._delegate.onIdTokenChanged(s, a, u);
                    }
                    sendSignInLinkToEmail(t, r) {
                        return (function Ns(n, e, t) {
                            return Wt.apply(this, arguments);
                        })(this._delegate, t, r);
                    }
                    sendPasswordResetEmail(t, r) {
                        return (function Es(n, e, t) {
                            return xt.apply(this, arguments);
                        })(this._delegate, t, r || void 0);
                    }
                    setPersistence(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            let i;
                            switch (
                                ((function iu(n, e) {
                                    me(
                                        Object.values(k).includes(e),
                                        n,
                                        'invalid-persistence-type'
                                    ),
                                        (0, l.b$)()
                                            ? me(
                                                  e !== k.SESSION,
                                                  n,
                                                  'unsupported-persistence-type'
                                              )
                                            : (0, l.UG)()
                                            ? me(
                                                  e === k.NONE,
                                                  n,
                                                  'unsupported-persistence-type'
                                              )
                                            : Hn()
                                            ? me(
                                                  e === k.NONE ||
                                                      (e === k.LOCAL &&
                                                          (0, l.hl)()),
                                                  n,
                                                  'unsupported-persistence-type'
                                              )
                                            : me(
                                                  e === k.NONE || li(),
                                                  n,
                                                  'unsupported-persistence-type'
                                              );
                                })(r._delegate, t),
                                t)
                            ) {
                                case k.SESSION:
                                    i = F;
                                    break;
                                case k.LOCAL:
                                    i = (yield R(ne)._isAvailable()) ? ne : Pe;
                                    break;
                                case k.NONE:
                                    i = K;
                                    break;
                                default:
                                    return v('argument-error', {
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
                        return T(
                            this._delegate,
                            (function gs(n) {
                                return Tt.apply(this, arguments);
                            })(this._delegate)
                        );
                    }
                    signInWithCredential(t) {
                        return T(this._delegate, ke(this._delegate, t));
                    }
                    signInWithCustomToken(t) {
                        return T(
                            this._delegate,
                            (function ys(n, e) {
                                return Lt.apply(this, arguments);
                            })(this._delegate, t)
                        );
                    }
                    signInWithEmailAndPassword(t, r) {
                        return T(
                            this._delegate,
                            (function Ss(n, e, t) {
                                return ke((0, l.m9)(n), yt.credential(e, t));
                            })(this._delegate, t, r)
                        );
                    }
                    signInWithEmailLink(t, r) {
                        return T(
                            this._delegate,
                            (function bs(n, e, t) {
                                return Ht.apply(this, arguments);
                            })(this._delegate, t, r)
                        );
                    }
                    signInWithPhoneNumber(t, r) {
                        return $n(
                            this._delegate,
                            (function Po(n, e, t) {
                                return ln.apply(this, arguments);
                            })(this._delegate, t, r)
                        );
                    }
                    signInWithPopup(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            return (
                                _e(
                                    zn(),
                                    r._delegate,
                                    'operation-not-supported-in-this-environment'
                                ),
                                T(
                                    r._delegate,
                                    (function Mo(n, e, t) {
                                        return _n.apply(this, arguments);
                                    })(r._delegate, t, Z)
                                )
                            );
                        })();
                    }
                    signInWithRedirect(t) {
                        var r = this;
                        return (0, o.Z)(function* () {
                            return (
                                _e(
                                    zn(),
                                    r._delegate,
                                    'operation-not-supported-in-this-environment'
                                ),
                                yield qn(r._delegate),
                                (function zo(n, e, t) {
                                    return (function Go(n, e, t) {
                                        return Rn.apply(this, arguments);
                                    })(n, e, t);
                                })(r._delegate, t, Z)
                            );
                        })();
                    }
                    updateCurrentUser(t) {
                        return this._delegate.updateCurrentUser(t);
                    }
                    verifyPasswordResetCode(t) {
                        return (function ks(n, e) {
                            return Zt.apply(this, arguments);
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
                return (n.Persistence = k), n;
            })();
            function _i(n, e, t) {
                let r = n;
                'function' != typeof n &&
                    ({ next: r, error: e, complete: t } = n);
                const i = r;
                return {
                    next: (a) => i(a && D.getOrCreate(a)),
                    error: e,
                    complete: t,
                };
            }
            function du(n, e) {
                const t = (function su(n, e) {
                    const t = hi();
                    if (!t) return [];
                    const r = W(di, n, e);
                    switch (t.getItem(r)) {
                        case k.NONE:
                            return [K];
                        case k.LOCAL:
                            return [ne, F];
                        case k.SESSION:
                            return [F];
                        default:
                            return [];
                    }
                })(n, e);
                if (
                    ('undefined' != typeof self &&
                        !t.includes(ne) &&
                        t.push(ne),
                    'undefined' != typeof window)
                )
                    for (const r of [Pe, F]) t.includes(r) || t.push(r);
                return t.includes(K) || t.push(K), t;
            }
            class jn {
                constructor() {
                    (this.providerId = 'phone'),
                        (this._delegate = new pe(fi(Ze.Z.auth())));
                }
                static credential(e, t) {
                    return pe.credential(e, t);
                }
                verifyPhoneNumber(e, t) {
                    return this._delegate.verifyPhoneNumber(e, t);
                }
                unwrap() {
                    return this._delegate;
                }
            }
            (jn.PHONE_SIGN_IN_METHOD = pe.PHONE_SIGN_IN_METHOD),
                (jn.PROVIDER_ID = pe.PROVIDER_ID);
            const hu = c;
            class fu {
                constructor(e, t, r = Ze.Z.app()) {
                    var i;
                    hu(
                        null === (i = r.options) || void 0 === i
                            ? void 0
                            : i.apiKey,
                        'invalid-api-key',
                        { appName: r.name }
                    ),
                        (this._delegate = new So(e, t, r.auth())),
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
            !(function mu(n) {
                n.INTERNAL.registerComponent(
                    new We.wA(
                        'auth-compat',
                        (e) => {
                            const t = e
                                    .getProvider('app-compat')
                                    .getImmediate(),
                                r = e.getProvider('auth');
                            return new mi(t, r);
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
                            EmailAuthProvider: yt,
                            FacebookAuthProvider: kr,
                            GithubAuthProvider: Sr,
                            GoogleAuthProvider: Ar,
                            OAuthProvider: Q,
                            SAMLAuthProvider: Ee,
                            PhoneAuthProvider: jn,
                            PhoneMultiFactorGenerator: ka,
                            RecaptchaVerifier: fu,
                            TwitterAuthProvider: Nr,
                            Auth: mi,
                            AuthCredential: Y,
                            Error: l.ZR,
                        })
                        .setInstantiationMode('LAZY')
                        .setMultipleInstances(!1)
                ),
                    n.registerVersion('@firebase/auth-compat', '0.2.7');
            })(Ze.Z);
        },
    },
]);
