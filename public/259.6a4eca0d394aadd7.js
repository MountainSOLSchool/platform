'use strict';
(self.webpackChunkportal = self.webpackChunkportal || []).push([
    [259],
    {
        9259: (Ru, bi, V) => {
            V.r(bi);
            var a = V(5861),
                We = V(3942),
                l = V(2090),
                x = V(9681);
            function ze(n, e) {
                var t = {};
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) &&
                        e.indexOf(r) < 0 &&
                        (t[r] = n[r]);
                if (
                    null != n &&
                    'function' == typeof Object.getOwnPropertySymbols
                ) {
                    var i = 0;
                    for (r = Object.getOwnPropertySymbols(n); i < r.length; i++)
                        e.indexOf(r[i]) < 0 &&
                            Object.prototype.propertyIsEnumerable.call(
                                n,
                                r[i]
                            ) &&
                            (t[r[i]] = n[r[i]]);
                }
                return t;
            }
            var or = V(1877),
                Ge = V(4859);
            const Ci = function Oi() {
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
                Li = function ar() {
                    return {
                        'dependent-sdk-initialized-before-auth':
                            'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
                    };
                },
                ur = new l.LL('auth', 'Firebase', {
                    'dependent-sdk-initialized-before-auth':
                        'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.',
                }),
                cr = new or.Yd('@firebase/auth');
            function Ie(n, ...e) {
                cr.logLevel <= or.in.ERROR &&
                    cr.error(`Auth (${x.SDK_VERSION}): ${n}`, ...e);
            }
            function v(n, ...e) {
                throw qe(n, ...e);
            }
            function T(n, ...e) {
                return qe(n, ...e);
            }
            function lr(n, e, t) {
                const r = Object.assign(Object.assign({}, Li()), { [e]: t });
                return new l.LL('auth', 'Firebase', r).create(e, {
                    appName: n.name,
                });
            }
            function $(n, e, t) {
                if (!(e instanceof t))
                    throw (
                        (t.name !== e.constructor.name &&
                            v(n, 'argument-error'),
                        lr(
                            n,
                            'argument-error',
                            `Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`
                        ))
                    );
            }
            function qe(n, ...e) {
                if ('string' != typeof n) {
                    const t = e[0],
                        r = [...e.slice(1)];
                    return (
                        r[0] && (r[0].appName = n.name),
                        n._errorFactory.create(t, ...r)
                    );
                }
                return ur.create(n, ...e);
            }
            function d(n, e, ...t) {
                if (!n) throw qe(e, ...t);
            }
            function b(n) {
                const e = 'INTERNAL ASSERTION FAILED: ' + n;
                throw (Ie(e), new Error(e));
            }
            function S(n, e) {
                n || b(e);
            }
            const dr = new Map();
            function A(n) {
                S(n instanceof Function, 'Expected a class definition');
                let e = dr.get(n);
                return e
                    ? (S(
                          e instanceof n,
                          'Instance stored in cache mismatched with class'
                      ),
                      e)
                    : ((e = new n()), dr.set(n, e), e);
            }
            function re() {
                var n;
                return (
                    ('undefined' != typeof self &&
                        (null === (n = self.location) || void 0 === n
                            ? void 0
                            : n.href)) ||
                    ''
                );
            }
            function je() {
                return 'http:' === hr() || 'https:' === hr();
            }
            function hr() {
                var n;
                return (
                    ('undefined' != typeof self &&
                        (null === (n = self.location) || void 0 === n
                            ? void 0
                            : n.protocol)) ||
                    null
                );
            }
            class ie {
                constructor(e, t) {
                    (this.shortDelay = e),
                        (this.longDelay = t),
                        S(t > e, 'Short delay should be less than long delay!'),
                        (this.isMobile = (0, l.uI)() || (0, l.b$)());
                }
                get() {
                    return (function Mi() {
                        return (
                            !(
                                'undefined' != typeof navigator &&
                                navigator &&
                                'onLine' in navigator &&
                                'boolean' == typeof navigator.onLine &&
                                (je() ||
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
            function Be(n, e) {
                S(n.emulator, 'Emulator should always be set here');
                const { url: t } = n.emulator;
                return e ? `${t}${e.startsWith('/') ? e.slice(1) : e}` : t;
            }
            class fr {
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
                        : void b(
                              'Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
                          );
                }
                static headers() {
                    return this.headersImpl
                        ? this.headersImpl
                        : 'undefined' != typeof self && 'Headers' in self
                        ? self.Headers
                        : void b(
                              'Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
                          );
                }
                static response() {
                    return this.responseImpl
                        ? this.responseImpl
                        : 'undefined' != typeof self && 'Response' in self
                        ? self.Response
                        : void b(
                              'Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill'
                          );
                }
            }
            const Fi = {
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
                Zi = new ie(3e4, 6e4);
            function _(n, e) {
                return n.tenantId && !e.tenantId
                    ? Object.assign(Object.assign({}, e), {
                          tenantId: n.tenantId,
                      })
                    : e;
            }
            function I(n, e, t, r) {
                return $e.apply(this, arguments);
            }
            function $e() {
                return ($e = (0, a.Z)(function* (n, e, t, r, i = {}) {
                    return pr(
                        n,
                        i,
                        (0, a.Z)(function* () {
                            let s = {},
                                o = {};
                            r &&
                                ('GET' === e
                                    ? (o = r)
                                    : (s = { body: JSON.stringify(r) }));
                            const u = (0, l.xO)(
                                    Object.assign({ key: n.config.apiKey }, o)
                                ).slice(1),
                                h = yield n._getAdditionalHeaders();
                            return (
                                (h['Content-Type'] = 'application/json'),
                                n.languageCode &&
                                    (h['X-Firebase-Locale'] = n.languageCode),
                                fr.fetch()(
                                    mr(n, n.config.apiHost, t, u),
                                    Object.assign(
                                        {
                                            method: e,
                                            headers: h,
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
            function pr(n, e, t) {
                return Ke.apply(this, arguments);
            }
            function Ke() {
                return (Ke = (0, a.Z)(function* (n, e, t) {
                    n._canInitEmulator = !1;
                    const r = Object.assign(Object.assign({}, Fi), e);
                    try {
                        const i = new Vi(n),
                            s = yield Promise.race([t(), i.promise]);
                        i.clearNetworkTimeout();
                        const o = yield s.json();
                        if ('needConfirmation' in o)
                            throw ye(
                                n,
                                'account-exists-with-different-credential',
                                o
                            );
                        if (s.ok && !('errorMessage' in o)) return o;
                        {
                            const u = s.ok ? o.errorMessage : o.error.message,
                                [h, c] = u.split(' : ');
                            if ('FEDERATED_USER_ID_ALREADY_LINKED' === h)
                                throw ye(n, 'credential-already-in-use', o);
                            if ('EMAIL_EXISTS' === h)
                                throw ye(n, 'email-already-in-use', o);
                            const f =
                                r[h] || h.toLowerCase().replace(/[_\s]+/g, '-');
                            if (c) throw lr(n, f, c);
                            v(n, f);
                        }
                    } catch (i) {
                        if (i instanceof l.ZR) throw i;
                        v(n, 'network-request-failed');
                    }
                })).apply(this, arguments);
            }
            function N(n, e, t, r) {
                return Je.apply(this, arguments);
            }
            function Je() {
                return (Je = (0, a.Z)(function* (n, e, t, r, i = {}) {
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
            function mr(n, e, t, r) {
                const i = `${e}${t}?${r}`;
                return n.config.emulator
                    ? Be(n.config, i)
                    : `${n.config.apiScheme}://${i}`;
            }
            class Vi {
                constructor(e) {
                    (this.auth = e),
                        (this.timer = null),
                        (this.promise = new Promise((t, r) => {
                            this.timer = setTimeout(
                                () => r(T(this.auth, 'timeout')),
                                Zi.get()
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
                const i = T(n, e, r);
                return (i.customData._tokenResponse = t), i;
            }
            function Ye() {
                return (Ye = (0, a.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:delete', e);
                })).apply(this, arguments);
            }
            function Hi(n, e) {
                return Xe.apply(this, arguments);
            }
            function Xe() {
                return (Xe = (0, a.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:update', e);
                })).apply(this, arguments);
            }
            function zi(n, e) {
                return Qe.apply(this, arguments);
            }
            function Qe() {
                return (Qe = (0, a.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:lookup', e);
                })).apply(this, arguments);
            }
            function se(n) {
                if (n)
                    try {
                        const e = new Date(Number(n));
                        if (!isNaN(e.getTime())) return e.toUTCString();
                    } catch (e) {}
            }
            function et() {
                return (et = (0, a.Z)(function* (n, e = !1) {
                    const t = (0, l.m9)(n),
                        r = yield t.getIdToken(e),
                        i = Ee(r);
                    d(
                        i && i.exp && i.auth_time && i.iat,
                        t.auth,
                        'internal-error'
                    );
                    const s =
                            'object' == typeof i.firebase ? i.firebase : void 0,
                        o = null == s ? void 0 : s.sign_in_provider;
                    return {
                        claims: i,
                        token: r,
                        authTime: se(tt(i.auth_time)),
                        issuedAtTime: se(tt(i.iat)),
                        expirationTime: se(tt(i.exp)),
                        signInProvider: o || null,
                        signInSecondFactor:
                            (null == s ? void 0 : s.sign_in_second_factor) ||
                            null,
                    };
                })).apply(this, arguments);
            }
            function tt(n) {
                return 1e3 * Number(n);
            }
            function Ee(n) {
                const [e, t, r] = n.split('.');
                if (void 0 === e || void 0 === t || void 0 === r)
                    return (
                        Ie('JWT malformed, contained fewer than 3 sections'),
                        null
                    );
                try {
                    const i = (0, l.tV)(t);
                    return i
                        ? JSON.parse(i)
                        : (Ie('Failed to decode base64 JWT payload'), null);
                } catch (i) {
                    return (
                        Ie('Caught error parsing JWT payload as JSON', i), null
                    );
                }
            }
            function O(n, e) {
                return nt.apply(this, arguments);
            }
            function nt() {
                return (nt = (0, a.Z)(function* (n, e, t = !1) {
                    if (t) return e;
                    try {
                        return yield e;
                    } catch (r) {
                        throw (
                            (r instanceof l.ZR &&
                                ji(r) &&
                                n.auth.currentUser === n &&
                                (yield n.auth.signOut()),
                            r)
                        );
                    }
                })).apply(this, arguments);
            }
            function ji({ code: n }) {
                return (
                    'auth/user-disabled' === n ||
                    'auth/user-token-expired' === n
                );
            }
            class Bi {
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
                        (0, a.Z)(function* () {
                            yield t.iteration();
                        }),
                        r
                    );
                }
                iteration() {
                    var e = this;
                    return (0, a.Z)(function* () {
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
            class _r {
                constructor(e, t) {
                    (this.createdAt = e),
                        (this.lastLoginAt = t),
                        this._initializeTime();
                }
                _initializeTime() {
                    (this.lastSignInTime = se(this.lastLoginAt)),
                        (this.creationTime = se(this.createdAt));
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
            function oe(n) {
                return rt.apply(this, arguments);
            }
            function rt() {
                return (rt = (0, a.Z)(function* (n) {
                    var e;
                    const t = n.auth,
                        r = yield n.getIdToken(),
                        i = yield O(n, zi(t, { idToken: r }));
                    d(null == i ? void 0 : i.users.length, t, 'internal-error');
                    const s = i.users[0];
                    n._notifyReloadListener(s);
                    const o = (
                            null === (e = s.providerUserInfo) || void 0 === e
                                ? void 0
                                : e.length
                        )
                            ? Ji(s.providerUserInfo)
                            : [],
                        u = Ki(n.providerData, o),
                        f =
                            !!n.isAnonymous &&
                            !(
                                (n.email && s.passwordHash) ||
                                (null == u ? void 0 : u.length)
                            ),
                        p = {
                            uid: s.localId,
                            displayName: s.displayName || null,
                            photoURL: s.photoUrl || null,
                            email: s.email || null,
                            emailVerified: s.emailVerified || !1,
                            phoneNumber: s.phoneNumber || null,
                            tenantId: s.tenantId || null,
                            providerData: u,
                            metadata: new _r(s.createdAt, s.lastLoginAt),
                            isAnonymous: f,
                        };
                    Object.assign(n, p);
                })).apply(this, arguments);
            }
            function it() {
                return (it = (0, a.Z)(function* (n) {
                    const e = (0, l.m9)(n);
                    yield oe(e),
                        yield e.auth._persistUserIfCurrent(e),
                        e.auth._notifyListenersIfCurrent(e);
                })).apply(this, arguments);
            }
            function Ki(n, e) {
                return [
                    ...n.filter(
                        (r) => !e.some((i) => i.providerId === r.providerId)
                    ),
                    ...e,
                ];
            }
            function Ji(n) {
                return n.map((e) => {
                    var { providerId: t } = e,
                        r = ze(e, ['providerId']);
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
            function st() {
                return (st = (0, a.Z)(function* (n, e) {
                    const t = yield pr(
                        n,
                        {},
                        (0, a.Z)(function* () {
                            const r = (0, l.xO)({
                                    grant_type: 'refresh_token',
                                    refresh_token: e,
                                }).slice(1),
                                { tokenApiHost: i, apiKey: s } = n.config,
                                o = mr(n, i, '/v1/token', `key=${s}`),
                                u = yield n._getAdditionalHeaders();
                            return (
                                (u['Content-Type'] =
                                    'application/x-www-form-urlencoded'),
                                fr.fetch()(o, {
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
            class ae {
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
                    d(e.idToken, 'internal-error'),
                        d(void 0 !== e.idToken, 'internal-error'),
                        d(void 0 !== e.refreshToken, 'internal-error');
                    const t =
                        'expiresIn' in e && void 0 !== e.expiresIn
                            ? Number(e.expiresIn)
                            : (function qi(n) {
                                  const e = Ee(n);
                                  return (
                                      d(e, 'internal-error'),
                                      d(void 0 !== e.exp, 'internal-error'),
                                      d(void 0 !== e.iat, 'internal-error'),
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
                    return (0, a.Z)(function* () {
                        return (
                            d(
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
                    return (0, a.Z)(function* () {
                        const {
                            accessToken: i,
                            refreshToken: s,
                            expiresIn: o,
                        } = yield (function Yi(n, e) {
                            return st.apply(this, arguments);
                        })(e, t);
                        r.updateTokensAndExpiration(i, s, Number(o));
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
                        o = new ae();
                    return (
                        r &&
                            (d('string' == typeof r, 'internal-error', {
                                appName: e,
                            }),
                            (o.refreshToken = r)),
                        i &&
                            (d('string' == typeof i, 'internal-error', {
                                appName: e,
                            }),
                            (o.accessToken = i)),
                        s &&
                            (d('number' == typeof s, 'internal-error', {
                                appName: e,
                            }),
                            (o.expirationTime = s)),
                        o
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
                    return Object.assign(new ae(), this.toJSON());
                }
                _performRefresh() {
                    return b('not implemented');
                }
            }
            function M(n, e) {
                d('string' == typeof n || void 0 === n, 'internal-error', {
                    appName: e,
                });
            }
            class W {
                constructor(e) {
                    var { uid: t, auth: r, stsTokenManager: i } = e,
                        s = ze(e, ['uid', 'auth', 'stsTokenManager']);
                    (this.providerId = 'firebase'),
                        (this.emailVerified = !1),
                        (this.isAnonymous = !1),
                        (this.tenantId = null),
                        (this.providerData = []),
                        (this.proactiveRefresh = new Bi(this)),
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
                        (this.metadata = new _r(
                            s.createdAt || void 0,
                            s.lastLoginAt || void 0
                        ));
                }
                getIdToken(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
                        const r = yield O(
                            t,
                            t.stsTokenManager.getToken(t.auth, e)
                        );
                        return (
                            d(r, t.auth, 'internal-error'),
                            t.accessToken !== r &&
                                ((t.accessToken = r),
                                yield t.auth._persistUserIfCurrent(t),
                                t.auth._notifyListenersIfCurrent(t)),
                            r
                        );
                    })();
                }
                getIdTokenResult(e) {
                    return (function Gi(n) {
                        return et.apply(this, arguments);
                    })(this, e);
                }
                reload() {
                    return (function $i(n) {
                        return it.apply(this, arguments);
                    })(this);
                }
                _assign(e) {
                    this !== e &&
                        (d(this.uid === e.uid, this.auth, 'internal-error'),
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
                    return new W(
                        Object.assign(Object.assign({}, this), {
                            auth: e,
                            stsTokenManager: this.stsTokenManager._clone(),
                        })
                    );
                }
                _onReload(e) {
                    d(!this.reloadListener, this.auth, 'internal-error'),
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
                    return (0, a.Z)(function* () {
                        let i = !1;
                        e.idToken &&
                            e.idToken !== r.stsTokenManager.accessToken &&
                            (r.stsTokenManager.updateFromServerResponse(e),
                            (i = !0)),
                            t && (yield oe(r)),
                            yield r.auth._persistUserIfCurrent(r),
                            i && r.auth._notifyListenersIfCurrent(r);
                    })();
                }
                delete() {
                    var e = this;
                    return (0, a.Z)(function* () {
                        const t = yield e.getIdToken();
                        return (
                            yield O(
                                e,
                                (function Wi(n, e) {
                                    return Ye.apply(this, arguments);
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
                    var r, i, s, o, u, h, c, f;
                    const p =
                            null !== (r = t.displayName) && void 0 !== r
                                ? r
                                : void 0,
                        m = null !== (i = t.email) && void 0 !== i ? i : void 0,
                        E =
                            null !== (s = t.phoneNumber) && void 0 !== s
                                ? s
                                : void 0,
                        Z =
                            null !== (o = t.photoURL) && void 0 !== o
                                ? o
                                : void 0,
                        Ve =
                            null !== (u = t.tenantId) && void 0 !== u
                                ? u
                                : void 0,
                        Qn =
                            null !== (h = t._redirectEventId) && void 0 !== h
                                ? h
                                : void 0,
                        Ri =
                            null !== (c = t.createdAt) && void 0 !== c
                                ? c
                                : void 0,
                        Ai =
                            null !== (f = t.lastLoginAt) && void 0 !== f
                                ? f
                                : void 0,
                        {
                            uid: er,
                            emailVerified: ki,
                            isAnonymous: wi,
                            providerData: tr,
                            stsTokenManager: Si,
                        } = t;
                    d(er && Si, e, 'internal-error');
                    const Eu = ae.fromJSON(this.name, Si);
                    d('string' == typeof er, e, 'internal-error'),
                        M(p, e.name),
                        M(m, e.name),
                        d('boolean' == typeof ki, e, 'internal-error'),
                        d('boolean' == typeof wi, e, 'internal-error'),
                        M(E, e.name),
                        M(Z, e.name),
                        M(Ve, e.name),
                        M(Qn, e.name),
                        M(Ri, e.name),
                        M(Ai, e.name);
                    const nr = new W({
                        uid: er,
                        auth: e,
                        email: m,
                        emailVerified: ki,
                        displayName: p,
                        isAnonymous: wi,
                        photoURL: Z,
                        phoneNumber: E,
                        tenantId: Ve,
                        stsTokenManager: Eu,
                        createdAt: Ri,
                        lastLoginAt: Ai,
                    });
                    return (
                        tr &&
                            Array.isArray(tr) &&
                            (nr.providerData = tr.map((Tu) =>
                                Object.assign({}, Tu)
                            )),
                        Qn && (nr._redirectEventId = Qn),
                        nr
                    );
                }
                static _fromIdTokenResponse(e, t, r = !1) {
                    return (0, a.Z)(function* () {
                        const i = new ae();
                        i.updateFromServerResponse(t);
                        const s = new W({
                            uid: t.localId,
                            auth: e,
                            stsTokenManager: i,
                            isAnonymous: r,
                        });
                        return yield oe(s), s;
                    })();
                }
            }
            const ue = (() => {
                class n {
                    constructor() {
                        (this.type = 'NONE'), (this.storage = {});
                    }
                    _isAvailable() {
                        return (0, a.Z)(function* () {
                            return !0;
                        })();
                    }
                    _set(t, r) {
                        var i = this;
                        return (0, a.Z)(function* () {
                            i.storage[t] = r;
                        })();
                    }
                    _get(t) {
                        var r = this;
                        return (0, a.Z)(function* () {
                            const i = r.storage[t];
                            return void 0 === i ? null : i;
                        })();
                    }
                    _remove(t) {
                        var r = this;
                        return (0, a.Z)(function* () {
                            delete r.storage[t];
                        })();
                    }
                    _addListener(t, r) {}
                    _removeListener(t, r) {}
                }
                return (n.type = 'NONE'), n;
            })();
            function H(n, e, t) {
                return `firebase:${n}:${e}:${t}`;
            }
            class K {
                constructor(e, t, r) {
                    (this.persistence = e), (this.auth = t), (this.userKey = r);
                    const { config: i, name: s } = this.auth;
                    (this.fullUserKey = H(this.userKey, i.apiKey, s)),
                        (this.fullPersistenceKey = H(
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
                    return (0, a.Z)(function* () {
                        const t = yield e.persistence._get(e.fullUserKey);
                        return t ? W._fromJSON(e.auth, t) : null;
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
                    return (0, a.Z)(function* () {
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
                    return (0, a.Z)(function* () {
                        if (!t.length) return new K(A(ue), e, r);
                        const i = (yield Promise.all(
                            t.map(
                                (function () {
                                    var c = (0, a.Z)(function* (f) {
                                        if (yield f._isAvailable()) return f;
                                    });
                                    return function (f) {
                                        return c.apply(this, arguments);
                                    };
                                })()
                            )
                        )).filter((c) => c);
                        let s = i[0] || A(ue);
                        const o = H(r, e.config.apiKey, e.name);
                        let u = null;
                        for (const c of t)
                            try {
                                const f = yield c._get(o);
                                if (f) {
                                    const p = W._fromJSON(e, f);
                                    c !== s && (u = p), (s = c);
                                    break;
                                }
                            } catch (f) {}
                        const h = i.filter((c) => c._shouldAllowMigration);
                        return s._shouldAllowMigration && h.length
                            ? ((s = h[0]),
                              u && (yield s._set(o, u.toJSON())),
                              yield Promise.all(
                                  t.map(
                                      (function () {
                                          var c = (0, a.Z)(function* (f) {
                                              if (f !== s)
                                                  try {
                                                      yield f._remove(o);
                                                  } catch (p) {}
                                          });
                                          return function (f) {
                                              return c.apply(this, arguments);
                                          };
                                      })()
                                  )
                              ),
                              new K(s, e, r))
                            : new K(s, e, r);
                    })();
                }
            }
            function gr(n) {
                const e = n.toLowerCase();
                if (
                    e.includes('opera/') ||
                    e.includes('opr/') ||
                    e.includes('opios/')
                )
                    return 'Opera';
                if (yr(e)) return 'IEMobile';
                if (e.includes('msie') || e.includes('trident/')) return 'IE';
                if (e.includes('edge/')) return 'Edge';
                if (vr(e)) return 'Firefox';
                if (e.includes('silk/')) return 'Silk';
                if (Er(e)) return 'Blackberry';
                if (Tr(e)) return 'Webos';
                if (ot(e)) return 'Safari';
                if ((e.includes('chrome/') || Ir(e)) && !e.includes('edge/'))
                    return 'Chrome';
                if (ce(e)) return 'Android';
                {
                    const r = n.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
                    if (2 === (null == r ? void 0 : r.length)) return r[1];
                }
                return 'Other';
            }
            function vr(n = (0, l.z$)()) {
                return /firefox\//i.test(n);
            }
            function ot(n = (0, l.z$)()) {
                const e = n.toLowerCase();
                return (
                    e.includes('safari/') &&
                    !e.includes('chrome/') &&
                    !e.includes('crios/') &&
                    !e.includes('android')
                );
            }
            function Ir(n = (0, l.z$)()) {
                return /crios\//i.test(n);
            }
            function yr(n = (0, l.z$)()) {
                return /iemobile/i.test(n);
            }
            function ce(n = (0, l.z$)()) {
                return /android/i.test(n);
            }
            function Er(n = (0, l.z$)()) {
                return /blackberry/i.test(n);
            }
            function Tr(n = (0, l.z$)()) {
                return /webos/i.test(n);
            }
            function J(n = (0, l.z$)()) {
                return /iphone|ipad|ipod/i.test(n);
            }
            function Rr(n = (0, l.z$)()) {
                return (
                    J(n) ||
                    ce(n) ||
                    Tr(n) ||
                    Er(n) ||
                    /windows phone/i.test(n) ||
                    yr(n)
                );
            }
            function Ar(n, e = []) {
                let t;
                switch (n) {
                    case 'Browser':
                        t = gr((0, l.z$)());
                        break;
                    case 'Worker':
                        t = `${gr((0, l.z$)())}-${n}`;
                        break;
                    default:
                        t = n;
                }
                const r = e.length ? e.join(',') : 'FirebaseCore-web';
                return `${t}/JsCore/${x.SDK_VERSION}/${r}`;
            }
            class ns {
                constructor(e, t) {
                    (this.app = e),
                        (this.config = t),
                        (this.currentUser = null),
                        (this.emulatorConfig = null),
                        (this.operations = Promise.resolve()),
                        (this.authStateSubscription = new kr(this)),
                        (this.idTokenSubscription = new kr(this)),
                        (this.redirectUser = null),
                        (this.isProactiveRefreshEnabled = !1),
                        (this._canInitEmulator = !0),
                        (this._isInitialized = !1),
                        (this._deleted = !1),
                        (this._initializationPromise = null),
                        (this._popupRedirectResolver = null),
                        (this._errorFactory = ur),
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
                        t && (this._popupRedirectResolver = A(t)),
                        (this._initializationPromise = this.queue(
                            (0, a.Z)(function* () {
                                var i, s;
                                if (
                                    !r._deleted &&
                                    ((r.persistenceManager = yield K.create(
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
                                        } catch (o) {}
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
                    return (0, a.Z)(function* () {
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
                    return (0, a.Z)(function* () {
                        var r;
                        let i = yield t.assertedPersistence.getCurrentUser();
                        if (e && t.config.authDomain) {
                            yield t.getOrInitRedirectPersistenceManager();
                            const s =
                                    null === (r = t.redirectUser) ||
                                    void 0 === r
                                        ? void 0
                                        : r._redirectEventId,
                                o = null == i ? void 0 : i._redirectEventId,
                                u = yield t.tryRedirectSignIn(e);
                            (!s || s === o) &&
                                (null == u ? void 0 : u.user) &&
                                (i = u.user);
                        }
                        return i
                            ? i._redirectEventId
                                ? (d(
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
                    return (0, a.Z)(function* () {
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
                    return (0, a.Z)(function* () {
                        try {
                            yield oe(e);
                        } catch (r) {
                            if ('auth/network-request-failed' !== r.code)
                                return t.directlySetCurrentUser(null);
                        }
                        return t.directlySetCurrentUser(e);
                    })();
                }
                useDeviceLanguage() {
                    this.languageCode = (function Ui() {
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
                    return (0, a.Z)(function* () {
                        e._deleted = !0;
                    })();
                }
                updateCurrentUser(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
                        const r = e ? (0, l.m9)(e) : null;
                        return (
                            r &&
                                d(
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
                    return (0, a.Z)(function* () {
                        if (!t._deleted)
                            return (
                                e &&
                                    d(
                                        t.tenantId === e.tenantId,
                                        t,
                                        'tenant-id-mismatch'
                                    ),
                                t.queue(
                                    (0, a.Z)(function* () {
                                        yield t.directlySetCurrentUser(e),
                                            t.notifyAuthListeners();
                                    })
                                )
                            );
                    })();
                }
                signOut() {
                    var e = this;
                    return (0, a.Z)(function* () {
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
                        (0, a.Z)(function* () {
                            yield t.assertedPersistence.setPersistence(A(e));
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
                    return (0, a.Z)(function* () {
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
                    return (0, a.Z)(function* () {
                        if (!t.redirectPersistenceManager) {
                            const r = (e && A(e)) || t._popupRedirectResolver;
                            d(r, t, 'argument-error'),
                                (t.redirectPersistenceManager = yield K.create(
                                    t,
                                    [A(r._redirectPersistence)],
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
                    return (0, a.Z)(function* () {
                        var r, i;
                        return (
                            t._isInitialized &&
                                (yield t.queue((0, a.Z)(function* () {}))),
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
                    return (0, a.Z)(function* () {
                        if (e === t.currentUser)
                            return t.queue(
                                (0, a.Z)(function* () {
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
                        o = this._isInitialized
                            ? Promise.resolve()
                            : this._initializationPromise;
                    return (
                        d(o, this, 'internal-error'),
                        o.then(() => s(this.currentUser)),
                        'function' == typeof t
                            ? e.addObserver(t, r, i)
                            : e.addObserver(t)
                    );
                }
                directlySetCurrentUser(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
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
                        d(this.persistenceManager, this, 'internal-error'),
                        this.persistenceManager
                    );
                }
                _logFramework(e) {
                    !e ||
                        this.frameworks.includes(e) ||
                        (this.frameworks.push(e),
                        this.frameworks.sort(),
                        (this.clientVersion = Ar(
                            this.config.clientPlatform,
                            this._getFrameworks()
                        )));
                }
                _getFrameworks() {
                    return this.frameworks;
                }
                _getAdditionalHeaders() {
                    var e = this;
                    return (0, a.Z)(function* () {
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
            class kr {
                constructor(e) {
                    (this.auth = e),
                        (this.observer = null),
                        (this.addObserver = (0, l.ne)(
                            (t) => (this.observer = t)
                        ));
                }
                get next() {
                    return (
                        d(this.observer, this.auth, 'internal-error'),
                        this.observer.next.bind(this.observer)
                    );
                }
            }
            function wr(n) {
                const e = n.indexOf(':');
                return e < 0 ? '' : n.substr(0, e + 1);
            }
            function Sr(n) {
                if (!n) return null;
                const e = Number(n);
                return isNaN(e) ? null : e;
            }
            class Y {
                constructor(e, t) {
                    (this.providerId = e), (this.signInMethod = t);
                }
                toJSON() {
                    return b('not implemented');
                }
                _getIdTokenResponse(e) {
                    return b('not implemented');
                }
                _linkToIdToken(e, t) {
                    return b('not implemented');
                }
                _getReauthenticationResolver(e) {
                    return b('not implemented');
                }
            }
            function br(n, e) {
                return at.apply(this, arguments);
            }
            function at() {
                return (at = (0, a.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:resetPassword', _(n, e));
                })).apply(this, arguments);
            }
            function Pr(n, e) {
                return ut.apply(this, arguments);
            }
            function ut() {
                return (ut = (0, a.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:update', e);
                })).apply(this, arguments);
            }
            function os(n, e) {
                return ct.apply(this, arguments);
            }
            function ct() {
                return (ct = (0, a.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:update', _(n, e));
                })).apply(this, arguments);
            }
            function lt() {
                return (lt = (0, a.Z)(function* (n, e) {
                    return N(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPassword',
                        _(n, e)
                    );
                })).apply(this, arguments);
            }
            function Te(n, e) {
                return dt.apply(this, arguments);
            }
            function dt() {
                return (dt = (0, a.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:sendOobCode', _(n, e));
                })).apply(this, arguments);
            }
            function us(n, e) {
                return ht.apply(this, arguments);
            }
            function ht() {
                return (ht = (0, a.Z)(function* (n, e) {
                    return Te(n, e);
                })).apply(this, arguments);
            }
            function cs(n, e) {
                return ft.apply(this, arguments);
            }
            function ft() {
                return (ft = (0, a.Z)(function* (n, e) {
                    return Te(n, e);
                })).apply(this, arguments);
            }
            function ls(n, e) {
                return pt.apply(this, arguments);
            }
            function pt() {
                return (pt = (0, a.Z)(function* (n, e) {
                    return Te(n, e);
                })).apply(this, arguments);
            }
            function ds(n, e) {
                return mt.apply(this, arguments);
            }
            function mt() {
                return (mt = (0, a.Z)(function* (n, e) {
                    return Te(n, e);
                })).apply(this, arguments);
            }
            function _t() {
                return (_t = (0, a.Z)(function* (n, e) {
                    return N(
                        n,
                        'POST',
                        '/v1/accounts:signInWithEmailLink',
                        _(n, e)
                    );
                })).apply(this, arguments);
            }
            function gt() {
                return (gt = (0, a.Z)(function* (n, e) {
                    return N(
                        n,
                        'POST',
                        '/v1/accounts:signInWithEmailLink',
                        _(n, e)
                    );
                })).apply(this, arguments);
            }
            class le extends Y {
                constructor(e, t, r, i = null) {
                    super('password', r),
                        (this._email = e),
                        (this._password = t),
                        (this._tenantId = i);
                }
                static _fromEmailAndPassword(e, t) {
                    return new le(e, t, 'password');
                }
                static _fromEmailAndCode(e, t, r = null) {
                    return new le(e, t, 'emailLink', r);
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
                    return (0, a.Z)(function* () {
                        switch (t.signInMethod) {
                            case 'password':
                                return (function as(n, e) {
                                    return lt.apply(this, arguments);
                                })(e, {
                                    returnSecureToken: !0,
                                    email: t._email,
                                    password: t._password,
                                });
                            case 'emailLink':
                                return (function hs(n, e) {
                                    return _t.apply(this, arguments);
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
                    return (0, a.Z)(function* () {
                        switch (r.signInMethod) {
                            case 'password':
                                return Pr(e, {
                                    idToken: t,
                                    returnSecureToken: !0,
                                    email: r._email,
                                    password: r._password,
                                });
                            case 'emailLink':
                                return (function fs(n, e) {
                                    return gt.apply(this, arguments);
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
                return vt.apply(this, arguments);
            }
            function vt() {
                return (vt = (0, a.Z)(function* (n, e) {
                    return N(n, 'POST', '/v1/accounts:signInWithIdp', _(n, e));
                })).apply(this, arguments);
            }
            class P extends Y {
                constructor() {
                    super(...arguments), (this.pendingToken = null);
                }
                static _fromParams(e) {
                    const t = new P(e.providerId, e.signInMethod);
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
                        s = ze(t, ['providerId', 'signInMethod']);
                    if (!r || !i) return null;
                    const o = new P(r, i);
                    return (
                        (o.idToken = s.idToken || void 0),
                        (o.accessToken = s.accessToken || void 0),
                        (o.secret = s.secret),
                        (o.nonce = s.nonce),
                        (o.pendingToken = s.pendingToken || null),
                        o
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
            function ms(n, e) {
                return It.apply(this, arguments);
            }
            function It() {
                return (It = (0, a.Z)(function* (n, e) {
                    return I(
                        n,
                        'POST',
                        '/v1/accounts:sendVerificationCode',
                        _(n, e)
                    );
                })).apply(this, arguments);
            }
            function yt() {
                return (yt = (0, a.Z)(function* (n, e) {
                    return N(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPhoneNumber',
                        _(n, e)
                    );
                })).apply(this, arguments);
            }
            function Et() {
                return (Et = (0, a.Z)(function* (n, e) {
                    const t = yield N(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPhoneNumber',
                        _(n, e)
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
            function Tt() {
                return (Tt = (0, a.Z)(function* (n, e) {
                    return N(
                        n,
                        'POST',
                        '/v1/accounts:signInWithPhoneNumber',
                        _(
                            n,
                            Object.assign(Object.assign({}, e), {
                                operation: 'REAUTH',
                            })
                        ),
                        vs
                    );
                })).apply(this, arguments);
            }
            class z extends Y {
                constructor(e) {
                    super('phone', 'phone'), (this.params = e);
                }
                static _fromVerification(e, t) {
                    return new z({ verificationId: e, verificationCode: t });
                }
                static _fromTokenResponse(e, t) {
                    return new z({ phoneNumber: e, temporaryProof: t });
                }
                _getIdTokenResponse(e) {
                    return (function _s(n, e) {
                        return yt.apply(this, arguments);
                    })(e, this._makeVerificationRequest());
                }
                _linkToIdToken(e, t) {
                    return (function gs(n, e) {
                        return Et.apply(this, arguments);
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
                        return Tt.apply(this, arguments);
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
                        ? new z({
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
                    var t, r, i, s, o, u;
                    const h = (0, l.zd)((0, l.pd)(e)),
                        c = null !== (t = h.apiKey) && void 0 !== t ? t : null,
                        f = null !== (r = h.oobCode) && void 0 !== r ? r : null,
                        p = (function ys(n) {
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
                        })(null !== (i = h.mode) && void 0 !== i ? i : null);
                    d(c && f && p, 'argument-error'),
                        (this.apiKey = c),
                        (this.operation = p),
                        (this.code = f),
                        (this.continueUrl =
                            null !== (s = h.continueUrl) && void 0 !== s
                                ? s
                                : null),
                        (this.languageCode =
                            null !== (o = h.languageCode) && void 0 !== o
                                ? o
                                : null),
                        (this.tenantId =
                            null !== (u = h.tenantId) && void 0 !== u
                                ? u
                                : null);
                }
                static parseLink(e) {
                    const t = (function Es(n) {
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
            let Rt = (() => {
                class n {
                    constructor() {
                        this.providerId = n.PROVIDER_ID;
                    }
                    static credential(t, r) {
                        return le._fromEmailAndPassword(t, r);
                    }
                    static credentialWithLink(t, r) {
                        const i = de.parseLink(r);
                        return (
                            d(i, 'argument-error'),
                            le._fromEmailAndCode(t, i.code, i.tenantId)
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
                        d(
                            'providerId' in t && 'signInMethod' in t,
                            'argument-error'
                        ),
                        P._fromParams(t)
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
                        d(e.idToken || e.accessToken, 'argument-error'),
                        P._fromParams(
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
                        nonce: o,
                        providerId: u,
                    } = e;
                    if ((!r && !i && !t && !s) || !u) return null;
                    try {
                        return new Q(u)._credential({
                            idToken: t,
                            accessToken: r,
                            nonce: o,
                            pendingToken: s,
                        });
                    } catch (h) {
                        return null;
                    }
                }
            }
            let Nr = (() => {
                    class n extends X {
                        constructor() {
                            super('facebook.com');
                        }
                        static credential(t) {
                            return P._fromParams({
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
                Or = (() => {
                    class n extends X {
                        constructor() {
                            super('google.com'), this.addScope('profile');
                        }
                        static credential(t, r) {
                            return P._fromParams({
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
                Cr = (() => {
                    class n extends X {
                        constructor() {
                            super('github.com');
                        }
                        static credential(t) {
                            return P._fromParams({
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
            class Re extends L {
                constructor(e) {
                    d(e.startsWith('saml.'), 'argument-error'), super(e);
                }
                static credentialFromResult(e) {
                    return Re.samlCredentialFromTaggedObject(e);
                }
                static credentialFromError(e) {
                    return Re.samlCredentialFromTaggedObject(
                        e.customData || {}
                    );
                }
                static credentialFromJSON(e) {
                    const t = ee.fromJSON(e);
                    return d(t, 'argument-error'), t;
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
            let Lr = (() => {
                class n extends X {
                    constructor() {
                        super('twitter.com');
                    }
                    static credential(t, r) {
                        return P._fromParams({
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
            function Dr(n, e) {
                return At.apply(this, arguments);
            }
            function At() {
                return (At = (0, a.Z)(function* (n, e) {
                    return N(n, 'POST', '/v1/accounts:signUp', _(n, e));
                })).apply(this, arguments);
            }
            class w {
                constructor(e) {
                    (this.user = e.user),
                        (this.providerId = e.providerId),
                        (this._tokenResponse = e._tokenResponse),
                        (this.operationType = e.operationType);
                }
                static _fromIdTokenResponse(e, t, r, i = !1) {
                    return (0, a.Z)(function* () {
                        const s = yield W._fromIdTokenResponse(e, r, i),
                            o = xr(r);
                        return new w({
                            user: s,
                            providerId: o,
                            _tokenResponse: r,
                            operationType: t,
                        });
                    })();
                }
                static _forOperation(e, t, r) {
                    return (0, a.Z)(function* () {
                        yield e._updateTokensIfNecessary(r, !0);
                        const i = xr(r);
                        return new w({
                            user: e,
                            providerId: i,
                            _tokenResponse: r,
                            operationType: t,
                        });
                    })();
                }
            }
            function xr(n) {
                return n.providerId
                    ? n.providerId
                    : 'phoneNumber' in n
                    ? 'phone'
                    : null;
            }
            function kt() {
                return (kt = (0, a.Z)(function* (n) {
                    var e;
                    const t = y(n);
                    if (
                        (yield t._initializationPromise,
                        null === (e = t.currentUser) || void 0 === e
                            ? void 0
                            : e.isAnonymous)
                    )
                        return new w({
                            user: t.currentUser,
                            providerId: null,
                            operationType: 'signIn',
                        });
                    const r = yield Dr(t, { returnSecureToken: !0 }),
                        i = yield w._fromIdTokenResponse(t, 'signIn', r, !0);
                    return yield t._updateCurrentUser(i.user), i;
                })).apply(this, arguments);
            }
            class Ae extends l.ZR {
                constructor(e, t, r, i) {
                    var s;
                    super(t.code, t.message),
                        (this.operationType = r),
                        (this.user = i),
                        Object.setPrototypeOf(this, Ae.prototype),
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
                    return new Ae(e, t, r, i);
                }
            }
            function Mr(n, e, t, r) {
                return (
                    'reauthenticate' === e
                        ? t._getReauthenticationResolver(n)
                        : t._getIdTokenResponse(n)
                ).catch((s) => {
                    throw 'auth/multi-factor-auth-required' === s.code
                        ? Ae._fromErrorAndOperation(n, s, e, r)
                        : s;
                });
            }
            function Ur(n) {
                return new Set(
                    n.map(({ providerId: e }) => e).filter((e) => !!e)
                );
            }
            function wt() {
                return (wt = (0, a.Z)(function* (n, e) {
                    const t = (0, l.m9)(n);
                    yield ke(!0, t, e);
                    const { providerUserInfo: r } = yield Hi(t.auth, {
                            idToken: yield t.getIdToken(),
                            deleteProvider: [e],
                        }),
                        i = Ur(r || []);
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
            function St(n, e) {
                return bt.apply(this, arguments);
            }
            function bt() {
                return (bt = (0, a.Z)(function* (n, e, t = !1) {
                    const r = yield O(
                        n,
                        e._linkToIdToken(n.auth, yield n.getIdToken()),
                        t
                    );
                    return w._forOperation(n, 'link', r);
                })).apply(this, arguments);
            }
            function ke(n, e, t) {
                return Pt.apply(this, arguments);
            }
            function Pt() {
                return (Pt = (0, a.Z)(function* (n, e, t) {
                    yield oe(e);
                    const i =
                        !1 === n
                            ? 'provider-already-linked'
                            : 'no-such-provider';
                    d(Ur(e.providerData).has(t) === n, e.auth, i);
                })).apply(this, arguments);
            }
            function Fr(n, e) {
                return Nt.apply(this, arguments);
            }
            function Nt() {
                return (Nt = (0, a.Z)(function* (n, e, t = !1) {
                    const { auth: r } = n,
                        i = 'reauthenticate';
                    try {
                        const s = yield O(n, Mr(r, i, e, n), t);
                        d(s.idToken, r, 'internal-error');
                        const o = Ee(s.idToken);
                        d(o, r, 'internal-error');
                        const { sub: u } = o;
                        return (
                            d(n.uid === u, r, 'user-mismatch'),
                            w._forOperation(n, i, s)
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
            function Zr(n, e) {
                return Ot.apply(this, arguments);
            }
            function Ot() {
                return (Ot = (0, a.Z)(function* (n, e, t = !1) {
                    const r = 'signIn',
                        i = yield Mr(n, r, e),
                        s = yield w._fromIdTokenResponse(n, r, i);
                    return t || (yield n._updateCurrentUser(s.user)), s;
                })).apply(this, arguments);
            }
            function we(n, e) {
                return Ct.apply(this, arguments);
            }
            function Ct() {
                return (Ct = (0, a.Z)(function* (n, e) {
                    return Zr(y(n), e);
                })).apply(this, arguments);
            }
            function Vr(n, e) {
                return Lt.apply(this, arguments);
            }
            function Lt() {
                return (Lt = (0, a.Z)(function* (n, e) {
                    const t = (0, l.m9)(n);
                    return yield ke(!1, t, e.providerId), St(t, e);
                })).apply(this, arguments);
            }
            function Wr(n, e) {
                return Dt.apply(this, arguments);
            }
            function Dt() {
                return (Dt = (0, a.Z)(function* (n, e) {
                    return Fr((0, l.m9)(n), e);
                })).apply(this, arguments);
            }
            function ws(n, e) {
                return xt.apply(this, arguments);
            }
            function xt() {
                return (xt = (0, a.Z)(function* (n, e) {
                    return N(
                        n,
                        'POST',
                        '/v1/accounts:signInWithCustomToken',
                        _(n, e)
                    );
                })).apply(this, arguments);
            }
            function Mt() {
                return (Mt = (0, a.Z)(function* (n, e) {
                    const t = y(n),
                        r = yield ws(t, { token: e, returnSecureToken: !0 }),
                        i = yield w._fromIdTokenResponse(t, 'signIn', r);
                    return yield t._updateCurrentUser(i.user), i;
                })).apply(this, arguments);
            }
            class Se {
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
                        ? Ut._fromServerResponse(e, t)
                        : v(e, 'internal-error');
                }
            }
            class Ut extends Se {
                constructor(e) {
                    super('phone', e), (this.phoneNumber = e.phoneInfo);
                }
                static _fromServerResponse(e, t) {
                    return new Ut(t);
                }
            }
            function be(n, e, t) {
                var r;
                d(
                    (null === (r = t.url) || void 0 === r ? void 0 : r.length) >
                        0,
                    n,
                    'invalid-continue-uri'
                ),
                    d(
                        void 0 === t.dynamicLinkDomain ||
                            t.dynamicLinkDomain.length > 0,
                        n,
                        'invalid-dynamic-link-domain'
                    ),
                    (e.continueUrl = t.url),
                    (e.dynamicLinkDomain = t.dynamicLinkDomain),
                    (e.canHandleCodeInApp = t.handleCodeInApp),
                    t.iOS &&
                        (d(
                            t.iOS.bundleId.length > 0,
                            n,
                            'missing-ios-bundle-id'
                        ),
                        (e.iOSBundleId = t.iOS.bundleId)),
                    t.android &&
                        (d(
                            t.android.packageName.length > 0,
                            n,
                            'missing-android-pkg-name'
                        ),
                        (e.androidInstallApp = t.android.installApp),
                        (e.androidMinimumVersionCode =
                            t.android.minimumVersion),
                        (e.androidPackageName = t.android.packageName));
            }
            function Ft() {
                return (Ft = (0, a.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n),
                        i = { requestType: 'PASSWORD_RESET', email: e };
                    t && be(r, i, t), yield cs(r, i);
                })).apply(this, arguments);
            }
            function Zt() {
                return (Zt = (0, a.Z)(function* (n, e, t) {
                    yield br((0, l.m9)(n), { oobCode: e, newPassword: t });
                })).apply(this, arguments);
            }
            function Vt() {
                return (Vt = (0, a.Z)(function* (n, e) {
                    yield os((0, l.m9)(n), { oobCode: e });
                })).apply(this, arguments);
            }
            function Hr(n, e) {
                return Wt.apply(this, arguments);
            }
            function Wt() {
                return (Wt = (0, a.Z)(function* (n, e) {
                    const t = (0, l.m9)(n),
                        r = yield br(t, { oobCode: e }),
                        i = r.requestType;
                    switch ((d(i, t, 'internal-error'), i)) {
                        case 'EMAIL_SIGNIN':
                            break;
                        case 'VERIFY_AND_CHANGE_EMAIL':
                            d(r.newEmail, t, 'internal-error');
                            break;
                        case 'REVERT_SECOND_FACTOR_ADDITION':
                            d(r.mfaInfo, t, 'internal-error');
                        default:
                            d(r.email, t, 'internal-error');
                    }
                    let s = null;
                    return (
                        r.mfaInfo &&
                            (s = Se._fromServerResponse(y(t), r.mfaInfo)),
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
            function Ht() {
                return (Ht = (0, a.Z)(function* (n, e) {
                    const { data: t } = yield Hr((0, l.m9)(n), e);
                    return t.email;
                })).apply(this, arguments);
            }
            function zt() {
                return (zt = (0, a.Z)(function* (n, e, t) {
                    const r = y(n),
                        i = yield Dr(r, {
                            returnSecureToken: !0,
                            email: e,
                            password: t,
                        }),
                        s = yield w._fromIdTokenResponse(r, 'signIn', i);
                    return yield r._updateCurrentUser(s.user), s;
                })).apply(this, arguments);
            }
            function Gt() {
                return (Gt = (0, a.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n),
                        i = { requestType: 'EMAIL_SIGNIN', email: e };
                    d(t.handleCodeInApp, r, 'argument-error'),
                        t && be(r, i, t),
                        yield ls(r, i);
                })).apply(this, arguments);
            }
            function qt() {
                return (qt = (0, a.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n),
                        i = Rt.credentialWithLink(e, t || re());
                    return (
                        d(
                            i._tenantId === (r.tenantId || null),
                            r,
                            'tenant-id-mismatch'
                        ),
                        we(r, i)
                    );
                })).apply(this, arguments);
            }
            function Us(n, e) {
                return jt.apply(this, arguments);
            }
            function jt() {
                return (jt = (0, a.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:createAuthUri', _(n, e));
                })).apply(this, arguments);
            }
            function Bt() {
                return (Bt = (0, a.Z)(function* (n, e) {
                    const r = {
                            identifier: e,
                            continueUri: je() ? re() : 'http://localhost',
                        },
                        { signinMethods: i } = yield Us((0, l.m9)(n), r);
                    return i || [];
                })).apply(this, arguments);
            }
            function $t() {
                return ($t = (0, a.Z)(function* (n, e) {
                    const t = (0, l.m9)(n),
                        i = {
                            requestType: 'VERIFY_EMAIL',
                            idToken: yield n.getIdToken(),
                        };
                    e && be(t.auth, i, e);
                    const { email: s } = yield us(t.auth, i);
                    s !== n.email && (yield n.reload());
                })).apply(this, arguments);
            }
            function Kt() {
                return (Kt = (0, a.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n),
                        s = {
                            requestType: 'VERIFY_AND_CHANGE_EMAIL',
                            idToken: yield n.getIdToken(),
                            newEmail: e,
                        };
                    t && be(r.auth, s, t);
                    const { email: o } = yield ds(r.auth, s);
                    o !== n.email && (yield n.reload());
                })).apply(this, arguments);
            }
            function Ws(n, e) {
                return Jt.apply(this, arguments);
            }
            function Jt() {
                return (Jt = (0, a.Z)(function* (n, e) {
                    return I(n, 'POST', '/v1/accounts:update', e);
                })).apply(this, arguments);
            }
            function Yt() {
                return (Yt = (0, a.Z)(function* (
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
                        o = yield O(r, Ws(r.auth, s));
                    (r.displayName = o.displayName || null),
                        (r.photoURL = o.photoUrl || null);
                    const u = r.providerData.find(
                        ({ providerId: h }) => 'password' === h
                    );
                    u &&
                        ((u.displayName = r.displayName),
                        (u.photoURL = r.photoURL)),
                        yield r._updateTokensIfNecessary(o);
                })).apply(this, arguments);
            }
            function zr(n, e, t) {
                return Xt.apply(this, arguments);
            }
            function Xt() {
                return (Xt = (0, a.Z)(function* (n, e, t) {
                    const { auth: r } = n,
                        s = {
                            idToken: yield n.getIdToken(),
                            returnSecureToken: !0,
                        };
                    e && (s.email = e), t && (s.password = t);
                    const o = yield O(n, Pr(r, s));
                    yield n._updateTokensIfNecessary(o, !0);
                })).apply(this, arguments);
            }
            class te {
                constructor(e, t, r = {}) {
                    (this.isNewUser = e),
                        (this.providerId = t),
                        (this.profile = r);
                }
            }
            class Gr extends te {
                constructor(e, t, r, i) {
                    super(e, t, r), (this.username = i);
                }
            }
            class js extends te {
                constructor(e, t) {
                    super(e, 'facebook.com', t);
                }
            }
            class Bs extends Gr {
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
            class $s extends te {
                constructor(e, t) {
                    super(e, 'google.com', t);
                }
            }
            class Ks extends Gr {
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
                              const o =
                                  null ===
                                      (t =
                                          null === (e = Ee(n.idToken)) ||
                                          void 0 === e
                                              ? void 0
                                              : e.firebase) || void 0 === t
                                      ? void 0
                                      : t.sign_in_provider;
                              if (o)
                                  return new te(
                                      s,
                                      'anonymous' !== o && 'custom' !== o
                                          ? o
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
                                  return new te(s, null);
                              default:
                                  return new te(s, r, i);
                          }
                      })(t);
            }
            class G {
                constructor(e, t) {
                    (this.type = e), (this.credential = t);
                }
                static _fromIdtoken(e) {
                    return new G('enroll', e);
                }
                static _fromMfaPendingCredential(e) {
                    return new G('signin', e);
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
                            return G._fromMfaPendingCredential(
                                e.multiFactorSession.pendingCredential
                            );
                        if (
                            null === (r = e.multiFactorSession) || void 0 === r
                                ? void 0
                                : r.idToken
                        )
                            return G._fromIdtoken(e.multiFactorSession.idToken);
                    }
                    return null;
                }
            }
            class en {
                constructor(e, t, r) {
                    (this.session = e),
                        (this.hints = t),
                        (this.signInResolver = r);
                }
                static _fromError(e, t) {
                    const r = y(e),
                        i = t.customData._serverResponse,
                        s = (i.mfaInfo || []).map((u) =>
                            Se._fromServerResponse(r, u)
                        );
                    d(i.mfaPendingCredential, r, 'internal-error');
                    const o = G._fromMfaPendingCredential(
                        i.mfaPendingCredential
                    );
                    return new en(
                        o,
                        s,
                        (function () {
                            var u = (0, a.Z)(function* (h) {
                                const c = yield h._process(r, o);
                                delete i.mfaInfo, delete i.mfaPendingCredential;
                                const f = Object.assign(Object.assign({}, i), {
                                    idToken: c.idToken,
                                    refreshToken: c.refreshToken,
                                });
                                switch (t.operationType) {
                                    case 'signIn':
                                        const p = yield w._fromIdTokenResponse(
                                            r,
                                            t.operationType,
                                            f
                                        );
                                        return (
                                            yield r._updateCurrentUser(p.user),
                                            p
                                        );
                                    case 'reauthenticate':
                                        return (
                                            d(t.user, r, 'internal-error'),
                                            w._forOperation(
                                                t.user,
                                                t.operationType,
                                                f
                                            )
                                        );
                                    default:
                                        v(r, 'internal-error');
                                }
                            });
                            return function (h) {
                                return u.apply(this, arguments);
                            };
                        })()
                    );
                }
                resolveSignIn(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
                        return t.signInResolver(e);
                    })();
                }
            }
            function Xs(n, e) {
                return I(
                    n,
                    'POST',
                    '/v2/accounts/mfaEnrollment:start',
                    _(n, e)
                );
            }
            class tn {
                constructor(e) {
                    (this.user = e),
                        (this.enrolledFactors = []),
                        e._onReload((t) => {
                            t.mfaInfo &&
                                (this.enrolledFactors = t.mfaInfo.map((r) =>
                                    Se._fromServerResponse(e.auth, r)
                                ));
                        });
                }
                static _fromUser(e) {
                    return new tn(e);
                }
                getSession() {
                    var e = this;
                    return (0, a.Z)(function* () {
                        return G._fromIdtoken(yield e.user.getIdToken());
                    })();
                }
                enroll(e, t) {
                    var r = this;
                    return (0, a.Z)(function* () {
                        const i = e,
                            s = yield r.getSession(),
                            o = yield O(r.user, i._process(r.user.auth, s, t));
                        return (
                            yield r.user._updateTokensIfNecessary(o),
                            r.user.reload()
                        );
                    })();
                }
                unenroll(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
                        const r = 'string' == typeof e ? e : e.uid,
                            i = yield t.user.getIdToken(),
                            s = yield O(
                                t.user,
                                (function eo(n, e) {
                                    return I(
                                        n,
                                        'POST',
                                        '/v2/accounts/mfaEnrollment:withdraw',
                                        _(n, e)
                                    );
                                })(t.user.auth, {
                                    idToken: i,
                                    mfaEnrollmentId: r,
                                })
                            );
                        (t.enrolledFactors = t.enrolledFactors.filter(
                            ({ uid: o }) => o !== r
                        )),
                            yield t.user._updateTokensIfNecessary(s);
                        try {
                            yield t.user.reload();
                        } catch (o) {
                            if ('auth/user-token-expired' !== o.code) throw o;
                        }
                    })();
                }
            }
            const nn = new WeakMap(),
                Pe = '__sak';
            class qr {
                constructor(e, t) {
                    (this.storageRetriever = e), (this.type = t);
                }
                _isAvailable() {
                    try {
                        return this.storage
                            ? (this.storage.setItem(Pe, '1'),
                              this.storage.removeItem(Pe),
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
            const Ne = (() => {
                    class n extends qr {
                        constructor() {
                            super(() => window.localStorage, 'LOCAL'),
                                (this.boundEventHandler = (t, r) =>
                                    this.onStorageEvent(t, r)),
                                (this.listeners = {}),
                                (this.localCache = {}),
                                (this.pollTimer = null),
                                (this.safariLocalStorageNotSynced =
                                    (function no() {
                                        const n = (0, l.z$)();
                                        return ot(n) || J(n);
                                    })() &&
                                    (function ts() {
                                        try {
                                            return !(
                                                !window || window === window.top
                                            );
                                        } catch (n) {
                                            return !1;
                                        }
                                    })()),
                                (this.fallbackToPolling = Rr()),
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
                                    (u, h, c) => {
                                        this.notifyListeners(u, c);
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
                                o = this.storage.getItem(i);
                            !(function es() {
                                return (
                                    (0, l.w1)() && 10 === document.documentMode
                                );
                            })() ||
                            o === t.newValue ||
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
                            return (0, a.Z)(function* () {
                                yield i().call(s, t, r),
                                    (s.localCache[t] = JSON.stringify(r));
                            })();
                        }
                        _get(t) {
                            var r = () => super._get,
                                i = this;
                            return (0, a.Z)(function* () {
                                const s = yield r().call(i, t);
                                return (i.localCache[t] = JSON.stringify(s)), s;
                            })();
                        }
                        _remove(t) {
                            var r = () => super._remove,
                                i = this;
                            return (0, a.Z)(function* () {
                                yield r().call(i, t), delete i.localCache[t];
                            })();
                        }
                    }
                    return (n.type = 'LOCAL'), n;
                })(),
                U = (() => {
                    class n extends qr {
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
                        return (0, a.Z)(function* () {
                            const i = t,
                                { eventId: s, eventType: o, data: u } = i.data,
                                h = r.handlersMap[o];
                            if (!(null == h ? void 0 : h.size)) return;
                            i.ports[0].postMessage({
                                status: 'ack',
                                eventId: s,
                                eventType: o,
                            });
                            const c = Array.from(h).map(
                                    (function () {
                                        var p = (0, a.Z)(function* (m) {
                                            return m(i.origin, u);
                                        });
                                        return function (m) {
                                            return p.apply(this, arguments);
                                        };
                                    })()
                                ),
                                f = yield (function so(n) {
                                    return Promise.all(
                                        n.map(
                                            (function () {
                                                var e = (0, a.Z)(function* (t) {
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
                                })(c);
                            i.ports[0].postMessage({
                                status: 'done',
                                eventId: s,
                                eventType: o,
                                response: f,
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
                    return (0, a.Z)(function* () {
                        const s =
                            'undefined' != typeof MessageChannel
                                ? new MessageChannel()
                                : null;
                        if (!s) throw new Error('connection_unavailable');
                        let o, u;
                        return new Promise((h, c) => {
                            const f = he('', 20);
                            s.port1.start();
                            const p = setTimeout(() => {
                                c(new Error('unsupported_event'));
                            }, r);
                            (u = {
                                messageChannel: s,
                                onMessage(m) {
                                    const E = m;
                                    if (E.data.eventId === f)
                                        switch (E.data.status) {
                                            case 'ack':
                                                clearTimeout(p),
                                                    (o = setTimeout(() => {
                                                        c(new Error('timeout'));
                                                    }, 3e3));
                                                break;
                                            case 'done':
                                                clearTimeout(o),
                                                    h(E.data.response);
                                                break;
                                            default:
                                                clearTimeout(p),
                                                    clearTimeout(o),
                                                    c(
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
                                    { eventType: e, eventId: f, data: t },
                                    [s.port2]
                                );
                        }).finally(() => {
                            u && i.removeMessageHandler(u);
                        });
                    })();
                }
            }
            function g() {
                return window;
            }
            function rn() {
                return (
                    void 0 !== g().WorkerGlobalScope &&
                    'function' == typeof g().importScripts
                );
            }
            function sn() {
                return (sn = (0, a.Z)(function* () {
                    if (!(null == navigator ? void 0 : navigator.serviceWorker))
                        return null;
                    try {
                        return (yield navigator.serviceWorker.ready).active;
                    } catch (n) {
                        return null;
                    }
                })).apply(this, arguments);
            }
            const jr = 'firebaseLocalStorageDb',
                Oe = 'firebaseLocalStorage',
                Br = 'fbase_key';
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
            function Ce(n, e) {
                return n
                    .transaction([Oe], e ? 'readwrite' : 'readonly')
                    .objectStore(Oe);
            }
            function on() {
                const n = indexedDB.open(jr, 1);
                return new Promise((e, t) => {
                    n.addEventListener('error', () => {
                        t(n.error);
                    }),
                        n.addEventListener('upgradeneeded', () => {
                            const r = n.result;
                            try {
                                r.createObjectStore(Oe, { keyPath: Br });
                            } catch (i) {
                                t(i);
                            }
                        }),
                        n.addEventListener(
                            'success',
                            (0, a.Z)(function* () {
                                const r = n.result;
                                r.objectStoreNames.contains(Oe)
                                    ? e(r)
                                    : (r.close(),
                                      yield (function po() {
                                          const n =
                                              indexedDB.deleteDatabase(jr);
                                          return new fe(n).toPromise();
                                      })(),
                                      e(yield on()));
                            })
                        );
                });
            }
            function $r(n, e, t) {
                return an.apply(this, arguments);
            }
            function an() {
                return (an = (0, a.Z)(function* (n, e, t) {
                    const r = Ce(n, !0).put({ [Br]: e, value: t });
                    return new fe(r).toPromise();
                })).apply(this, arguments);
            }
            function un() {
                return (un = (0, a.Z)(function* (n, e) {
                    const t = Ce(n, !1).get(e),
                        r = yield new fe(t).toPromise();
                    return void 0 === r ? null : r.value;
                })).apply(this, arguments);
            }
            function Kr(n, e) {
                const t = Ce(n, !0).delete(e);
                return new fe(t).toPromise();
            }
            const pe = (() => {
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
                        return (0, a.Z)(function* () {
                            return t.db || (t.db = yield on()), t.db;
                        })();
                    }
                    _withRetries(t) {
                        var r = this;
                        return (0, a.Z)(function* () {
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
                        return (0, a.Z)(function* () {
                            return rn()
                                ? t.initializeReceiver()
                                : t.initializeSender();
                        })();
                    }
                    initializeReceiver() {
                        var t = this;
                        return (0, a.Z)(function* () {
                            (t.receiver = oo._getInstance(
                                (function ho() {
                                    return rn() ? self : null;
                                })()
                            )),
                                t.receiver._subscribe(
                                    'keyChanged',
                                    (function () {
                                        var r = (0, a.Z)(function* (i, s) {
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
                                        var r = (0, a.Z)(function* (i, s) {
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
                        return (0, a.Z)(function* () {
                            var r, i;
                            if (
                                ((t.activeServiceWorker = yield (function co() {
                                    return sn.apply(this, arguments);
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
                        return (0, a.Z)(function* () {
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
                        return (0, a.Z)(function* () {
                            try {
                                if (!indexedDB) return !1;
                                const t = yield on();
                                return (
                                    yield $r(t, Pe, '1'), yield Kr(t, Pe), !0
                                );
                            } catch (t) {}
                            return !1;
                        })();
                    }
                    _withPendingWrite(t) {
                        var r = this;
                        return (0, a.Z)(function* () {
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
                        return (0, a.Z)(function* () {
                            return i._withPendingWrite(
                                (0, a.Z)(function* () {
                                    return (
                                        yield i._withRetries((s) =>
                                            $r(s, t, r)
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
                        return (0, a.Z)(function* () {
                            const i = yield r._withRetries((s) =>
                                (function mo(n, e) {
                                    return un.apply(this, arguments);
                                })(s, t)
                            );
                            return (r.localCache[t] = i), i;
                        })();
                    }
                    _remove(t) {
                        var r = this;
                        return (0, a.Z)(function* () {
                            return r._withPendingWrite(
                                (0, a.Z)(function* () {
                                    return (
                                        yield r._withRetries((i) => Kr(i, t)),
                                        delete r.localCache[t],
                                        r.notifyServiceWorker(t)
                                    );
                                })
                            );
                        })();
                    }
                    _poll() {
                        var t = this;
                        return (0, a.Z)(function* () {
                            const r = yield t._withRetries((o) => {
                                const u = Ce(o, !1).getAll();
                                return new fe(u).toPromise();
                            });
                            if (!r) return [];
                            if (0 !== t.pendingWrites) return [];
                            const i = [],
                                s = new Set();
                            for (const { fbase_key: o, value: u } of r)
                                s.add(o),
                                    JSON.stringify(t.localCache[o]) !==
                                        JSON.stringify(u) &&
                                        (t.notifyListeners(o, u), i.push(o));
                            for (const o of Object.keys(t.localCache))
                                t.localCache[o] &&
                                    !s.has(o) &&
                                    (t.notifyListeners(o, null), i.push(o));
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
                                (0, a.Z)(function* () {
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
                return I(n, 'POST', '/v2/accounts/mfaSignIn:start', _(n, e));
            }
            function cn() {
                return (cn = (0, a.Z)(function* (n) {
                    return (
                        (yield I(n, 'GET', '/v1/recaptchaParams'))
                            .recaptchaSiteKey || ''
                    );
                })).apply(this, arguments);
            }
            function Jr(n) {
                return new Promise((e, t) => {
                    const r = document.createElement('script');
                    r.setAttribute('src', n),
                        (r.onload = e),
                        (r.onerror = (i) => {
                            const s = T('internal-error');
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
            function Yr(n) {
                return `__${n}${Math.floor(1e6 * Math.random())}`;
            }
            const Le = 1e12;
            class Ao {
                constructor(e) {
                    (this.auth = e),
                        (this.counter = Le),
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
                    const r = e || Le;
                    null === (t = this._widgets.get(r)) ||
                        void 0 === t ||
                        t.delete(),
                        this._widgets.delete(r);
                }
                getResponse(e) {
                    var t;
                    return (
                        (null === (t = this._widgets.get(e || Le)) ||
                        void 0 === t
                            ? void 0
                            : t.getResponse()) || ''
                    );
                }
                execute(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
                        var r;
                        return (
                            null === (r = t._widgets.get(e || Le)) ||
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
                    d(i, 'argument-error', { appName: t }),
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
                                this.responseToken = (function wo(n) {
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
            const ln = Yr('rcb'),
                So = new ie(3e4, 6e4);
            class Po {
                constructor() {
                    (this.hostLanguage = ''),
                        (this.counter = 0),
                        (this.librarySeparatelyLoaded = !!g().grecaptcha);
                }
                load(e, t = '') {
                    return (
                        d(
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
                            ? Promise.resolve(g().grecaptcha)
                            : new Promise((r, i) => {
                                  const s = g().setTimeout(() => {
                                      i(T(e, 'network-request-failed'));
                                  }, So.get());
                                  (g()[ln] = () => {
                                      g().clearTimeout(s), delete g()[ln];
                                      const u = g().grecaptcha;
                                      if (!u)
                                          return void i(T(e, 'internal-error'));
                                      const h = u.render;
                                      (u.render = (c, f) => {
                                          const p = h(c, f);
                                          return this.counter++, p;
                                      }),
                                          (this.hostLanguage = t),
                                          r(u);
                                  }),
                                      Jr(
                                          `https://www.google.com/recaptcha/api.js??${(0,
                                          l.xO)({
                                              onload: ln,
                                              render: 'explicit',
                                              hl: t,
                                          })}`
                                      ).catch(() => {
                                          clearTimeout(s),
                                              i(T(e, 'internal-error'));
                                      });
                              })
                    );
                }
                clearedOneInstance() {
                    this.counter--;
                }
                shouldResolveImmediately(e) {
                    return (
                        !!g().grecaptcha &&
                        (e === this.hostLanguage ||
                            this.counter > 0 ||
                            this.librarySeparatelyLoaded)
                    );
                }
            }
            class Oo {
                load(e) {
                    return (0, a.Z)(function* () {
                        return new Ao(e);
                    })();
                }
                clearedOneInstance() {}
            }
            const Xr = 'recaptcha',
                Co = { theme: 'light', type: 'image' };
            class Lo {
                constructor(e, t = Object.assign({}, Co), r) {
                    (this.parameters = t),
                        (this.type = Xr),
                        (this.destroyed = !1),
                        (this.widgetId = null),
                        (this.tokenChangeListeners = new Set()),
                        (this.renderPromise = null),
                        (this.recaptcha = null),
                        (this.auth = y(r)),
                        (this.isInvisible =
                            'invisible' === this.parameters.size),
                        d(
                            'undefined' != typeof document,
                            this.auth,
                            'operation-not-supported-in-this-environment'
                        );
                    const i =
                        'string' == typeof e ? document.getElementById(e) : e;
                    d(i, this.auth, 'argument-error'),
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
                    return (0, a.Z)(function* () {
                        e.assertNotDestroyed();
                        const t = yield e.render(),
                            r = e.getAssertedRecaptcha();
                        return (
                            r.getResponse(t) ||
                            new Promise((s) => {
                                const o = (u) => {
                                    !u ||
                                        (e.tokenChangeListeners.delete(o),
                                        s(u));
                                };
                                e.tokenChangeListeners.add(o),
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
                    d(!this.parameters.sitekey, this.auth, 'argument-error'),
                        d(
                            this.isInvisible || !this.container.hasChildNodes(),
                            this.auth,
                            'argument-error'
                        ),
                        d(
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
                            const r = g()[e];
                            'function' == typeof r && r(t);
                        }
                    };
                }
                assertNotDestroyed() {
                    d(!this.destroyed, this.auth, 'internal-error');
                }
                makeRenderPromise() {
                    var e = this;
                    return (0, a.Z)(function* () {
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
                    return (0, a.Z)(function* () {
                        d(je() && !rn(), e.auth, 'internal-error'),
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
                            return cn.apply(this, arguments);
                        })(e.auth);
                        d(t, e.auth, 'internal-error'),
                            (e.parameters.sitekey = t);
                    })();
                }
                getAssertedRecaptcha() {
                    return (
                        d(this.recaptcha, this.auth, 'internal-error'),
                        this.recaptcha
                    );
                }
            }
            class dn {
                constructor(e, t) {
                    (this.verificationId = e), (this.onConfirmation = t);
                }
                confirm(e) {
                    const t = z._fromVerification(this.verificationId, e);
                    return this.onConfirmation(t);
                }
            }
            function hn() {
                return (hn = (0, a.Z)(function* (n, e, t) {
                    const r = y(n),
                        i = yield De(r, e, (0, l.m9)(t));
                    return new dn(i, (s) => we(r, s));
                })).apply(this, arguments);
            }
            function fn() {
                return (fn = (0, a.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n);
                    yield ke(!1, r, 'phone');
                    const i = yield De(r.auth, e, (0, l.m9)(t));
                    return new dn(i, (s) => Vr(r, s));
                })).apply(this, arguments);
            }
            function pn() {
                return (pn = (0, a.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n),
                        i = yield De(r.auth, e, (0, l.m9)(t));
                    return new dn(i, (s) => Wr(r, s));
                })).apply(this, arguments);
            }
            function De(n, e, t) {
                return mn.apply(this, arguments);
            }
            function mn() {
                return (mn = (0, a.Z)(function* (n, e, t) {
                    var r;
                    const i = yield t.verify();
                    try {
                        let s;
                        if (
                            (d('string' == typeof i, n, 'argument-error'),
                            d(t.type === Xr, n, 'argument-error'),
                            (s = 'string' == typeof e ? { phoneNumber: e } : e),
                            'session' in s)
                        ) {
                            const o = s.session;
                            if ('phoneNumber' in s)
                                return (
                                    d('enroll' === o.type, n, 'internal-error'),
                                    (yield Xs(n, {
                                        idToken: o.credential,
                                        phoneEnrollmentInfo: {
                                            phoneNumber: s.phoneNumber,
                                            recaptchaToken: i,
                                        },
                                    })).phoneSessionInfo.sessionInfo
                                );
                            {
                                d('signin' === o.type, n, 'internal-error');
                                const u =
                                    (null === (r = s.multiFactorHint) ||
                                    void 0 === r
                                        ? void 0
                                        : r.uid) || s.multiFactorUid;
                                return (
                                    d(u, n, 'missing-multi-factor-info'),
                                    (yield vo(n, {
                                        mfaPendingCredential: o.credential,
                                        mfaEnrollmentId: u,
                                        phoneSignInInfo: { recaptchaToken: i },
                                    })).phoneResponseInfo.sessionInfo
                                );
                            }
                        }
                        {
                            const { sessionInfo: o } = yield ms(n, {
                                phoneNumber: s.phoneNumber,
                                recaptchaToken: i,
                            });
                            return o;
                        }
                    } finally {
                        t._reset();
                    }
                })).apply(this, arguments);
            }
            function _n() {
                return (_n = (0, a.Z)(function* (n, e) {
                    yield St((0, l.m9)(n), e);
                })).apply(this, arguments);
            }
            let me = (() => {
                class n {
                    constructor(t) {
                        (this.providerId = n.PROVIDER_ID), (this.auth = y(t));
                    }
                    verifyPhoneNumber(t, r) {
                        return De(this.auth, t, (0, l.m9)(r));
                    }
                    static credential(t, r) {
                        return z._fromVerification(t, r);
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
                        return r && i ? z._fromTokenResponse(r, i) : null;
                    }
                }
                return (
                    (n.PROVIDER_ID = 'phone'),
                    (n.PHONE_SIGN_IN_METHOD = 'phone'),
                    n
                );
            })();
            function q(n, e) {
                return e
                    ? A(e)
                    : (d(n._popupRedirectResolver, n, 'argument-error'),
                      n._popupRedirectResolver);
            }
            class gn extends Y {
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
            function Zo(n) {
                return Zr(n.auth, new gn(n), n.bypassAuthState);
            }
            function Vo(n) {
                const { auth: e, user: t } = n;
                return (
                    d(t, e, 'internal-error'),
                    Fr(t, new gn(n), n.bypassAuthState)
                );
            }
            function Wo(n) {
                return vn.apply(this, arguments);
            }
            function vn() {
                return (vn = (0, a.Z)(function* (n) {
                    const { auth: e, user: t } = n;
                    return (
                        d(t, e, 'internal-error'),
                        St(t, new gn(n), n.bypassAuthState)
                    );
                })).apply(this, arguments);
            }
            class Qr {
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
                            var t = (0, a.Z)(function* (r, i) {
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
                    return (0, a.Z)(function* () {
                        const {
                            urlResponse: r,
                            sessionId: i,
                            postBody: s,
                            tenantId: o,
                            error: u,
                            type: h,
                        } = e;
                        if (u) return void t.reject(u);
                        const c = {
                            auth: t.auth,
                            requestUri: r,
                            sessionId: i,
                            tenantId: o || void 0,
                            postBody: s || void 0,
                            user: t.user,
                            bypassAuthState: t.bypassAuthState,
                        };
                        try {
                            t.resolve(yield t.getIdpTask(h)(c));
                        } catch (f) {
                            t.reject(f);
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
            const Ho = new ie(2e3, 1e4);
            function In() {
                return (In = (0, a.Z)(function* (n, e, t) {
                    const r = y(n);
                    $(n, e, L);
                    const i = q(r, t);
                    return new Tn(r, 'signInViaPopup', e, i).executeNotNull();
                })).apply(this, arguments);
            }
            function yn() {
                return (yn = (0, a.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n);
                    $(r.auth, e, L);
                    const i = q(r.auth, t);
                    return new Tn(
                        r.auth,
                        'reauthViaPopup',
                        e,
                        i,
                        r
                    ).executeNotNull();
                })).apply(this, arguments);
            }
            function En() {
                return (En = (0, a.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n);
                    $(r.auth, e, L);
                    const i = q(r.auth, t);
                    return new Tn(
                        r.auth,
                        'linkViaPopup',
                        e,
                        i,
                        r
                    ).executeNotNull();
                })).apply(this, arguments);
            }
            let Tn = (() => {
                class n extends Qr {
                    constructor(t, r, i, s, o) {
                        super(t, r, s, o),
                            (this.provider = i),
                            (this.authWindow = null),
                            (this.pollId = null),
                            n.currentPopupAction &&
                                n.currentPopupAction.cancel(),
                            (n.currentPopupAction = this);
                    }
                    executeNotNull() {
                        var t = this;
                        return (0, a.Z)(function* () {
                            const r = yield t.execute();
                            return d(r, t.auth, 'internal-error'), r;
                        })();
                    }
                    onExecution() {
                        var t = this;
                        return (0, a.Z)(function* () {
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
                                                T(
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
                        this.reject(T(this.auth, 'cancelled-popup-request'));
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
                                              T(
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
            const xe = new Map();
            class Bo extends Qr {
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
                    return (0, a.Z)(function* () {
                        let r = xe.get(t.auth._key());
                        if (!r) {
                            try {
                                const s = (yield (function $o(n, e) {
                                    return Rn.apply(this, arguments);
                                })(t.resolver, t.auth))
                                    ? yield e().call(t)
                                    : null;
                                r = () => Promise.resolve(s);
                            } catch (i) {
                                r = () => Promise.reject(i);
                            }
                            xe.set(t.auth._key(), r);
                        }
                        return (
                            t.bypassAuthState ||
                                xe.set(t.auth._key(), () =>
                                    Promise.resolve(null)
                                ),
                            r()
                        );
                    })();
                }
                onAuthEvent(e) {
                    var t = () => super.onAuthEvent,
                        r = this;
                    return (0, a.Z)(function* () {
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
                    return (0, a.Z)(function* () {})();
                }
                cleanUp() {}
            }
            function Rn() {
                return (Rn = (0, a.Z)(function* (n, e) {
                    const t = ti(e),
                        r = ei(n);
                    if (!(yield r._isAvailable())) return !1;
                    const i = 'true' === (yield r._get(t));
                    return yield r._remove(t), i;
                })).apply(this, arguments);
            }
            function An(n, e) {
                return kn.apply(this, arguments);
            }
            function kn() {
                return (kn = (0, a.Z)(function* (n, e) {
                    return ei(n)._set(ti(e), 'true');
                })).apply(this, arguments);
            }
            function ei(n) {
                return A(n._redirectPersistence);
            }
            function ti(n) {
                return H('pendingRedirect', n.config.apiKey, n.name);
            }
            function wn() {
                return (wn = (0, a.Z)(function* (n, e, t) {
                    const r = y(n);
                    $(n, e, L);
                    const i = q(r, t);
                    return (
                        yield An(i, r),
                        i._openRedirect(r, e, 'signInViaRedirect')
                    );
                })).apply(this, arguments);
            }
            function Sn() {
                return (Sn = (0, a.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n);
                    $(r.auth, e, L);
                    const i = q(r.auth, t);
                    yield An(i, r.auth);
                    const s = yield ni(r);
                    return i._openRedirect(r.auth, e, 'reauthViaRedirect', s);
                })).apply(this, arguments);
            }
            function bn() {
                return (bn = (0, a.Z)(function* (n, e, t) {
                    const r = (0, l.m9)(n);
                    $(r.auth, e, L);
                    const i = q(r.auth, t);
                    yield ke(!1, r, e.providerId), yield An(i, r.auth);
                    const s = yield ni(r);
                    return i._openRedirect(r.auth, e, 'linkViaRedirect', s);
                })).apply(this, arguments);
            }
            function Pn() {
                return (Pn = (0, a.Z)(function* (n, e) {
                    return yield y(n)._initializationPromise, Me(n, e, !1);
                })).apply(this, arguments);
            }
            function Me(n, e) {
                return Nn.apply(this, arguments);
            }
            function Nn() {
                return (Nn = (0, a.Z)(function* (n, e, t = !1) {
                    const r = y(n),
                        i = q(r, e),
                        o = yield new Bo(r, i, t).execute();
                    return (
                        o &&
                            !t &&
                            (delete o.user._redirectEventId,
                            yield r._persistUserIfCurrent(o.user),
                            yield r._setRedirectUser(null, e)),
                        o
                    );
                })).apply(this, arguments);
            }
            function ni(n) {
                return On.apply(this, arguments);
            }
            function On() {
                return (On = (0, a.Z)(function* (n) {
                    const e = he(`${n.uid}:::`);
                    return (
                        (n._redirectEventId = e),
                        yield n.auth._setRedirectUser(n),
                        yield n.auth._persistUserIfCurrent(n),
                        e
                    );
                })).apply(this, arguments);
            }
            class ri {
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
                                        return si(n);
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
                    if (e.error && !si(e)) {
                        const i =
                            (null === (r = e.error.code) || void 0 === r
                                ? void 0
                                : r.split('auth/')[1]) || 'internal-error';
                        t.onError(T(this.auth, i));
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
                        this.cachedEventUids.has(ii(e))
                    );
                }
                saveEventToCache(e) {
                    this.cachedEventUids.add(ii(e)),
                        (this.lastProcessedEventTime = Date.now());
                }
            }
            function ii(n) {
                return [n.type, n.eventId, n.sessionId, n.tenantId]
                    .filter((e) => e)
                    .join('-');
            }
            function si({ type: n, error: e }) {
                return (
                    'unknown' === n &&
                    'auth/no-auth-event' === (null == e ? void 0 : e.code)
                );
            }
            function oi(n) {
                return Cn.apply(this, arguments);
            }
            function Cn() {
                return (Cn = (0, a.Z)(function* (n, e = {}) {
                    return I(n, 'GET', '/v1/projects', e);
                })).apply(this, arguments);
            }
            const sa = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
                oa = /^https?/;
            function Ln() {
                return (Ln = (0, a.Z)(function* (n) {
                    if (n.config.emulator) return;
                    const { authorizedDomains: e } = yield oi(n);
                    for (const t of e)
                        try {
                            if (ua(t)) return;
                        } catch (r) {}
                    v(n, 'unauthorized-domain');
                })).apply(this, arguments);
            }
            function ua(n) {
                const e = re(),
                    { protocol: t, hostname: r } = new URL(e);
                if (n.startsWith('chrome-extension://')) {
                    const o = new URL(n);
                    return '' === o.hostname && '' === r
                        ? 'chrome-extension:' === t &&
                              n.replace('chrome-extension://', '') ===
                                  e.replace('chrome-extension://', '')
                        : 'chrome-extension:' === t && o.hostname === r;
                }
                if (!oa.test(t)) return !1;
                if (sa.test(n)) return r === n;
                const i = n.replace(/\./g, '\\.');
                return new RegExp('^(.+\\.' + i + '|' + i + ')$', 'i').test(r);
            }
            const ca = new ie(3e4, 6e4);
            function ai() {
                const n = g().___jsl;
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
            let Ue = null;
            function da(n) {
                return (
                    (Ue =
                        Ue ||
                        (function la(n) {
                            return new Promise((e, t) => {
                                var r, i, s;
                                function o() {
                                    ai(),
                                        gapi.load('gapi.iframes', {
                                            callback: () => {
                                                e(gapi.iframes.getContext());
                                            },
                                            ontimeout: () => {
                                                ai(),
                                                    t(
                                                        T(
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
                                            null === (r = g().gapi) ||
                                            void 0 === r
                                                ? void 0
                                                : r.iframes) || void 0 === i
                                        ? void 0
                                        : i.Iframe
                                )
                                    e(gapi.iframes.getContext());
                                else {
                                    if (
                                        !(null === (s = g().gapi) ||
                                        void 0 === s
                                            ? void 0
                                            : s.load)
                                    ) {
                                        const u = Yr('iframefcb');
                                        return (
                                            (g()[u] = () => {
                                                gapi.load
                                                    ? o()
                                                    : t(
                                                          T(
                                                              n,
                                                              'network-request-failed'
                                                          )
                                                      );
                                            }),
                                            Jr(
                                                `https://apis.google.com/js/api.js?onload=${u}`
                                            ).catch((h) => t(h))
                                        );
                                    }
                                    o();
                                }
                            }).catch((e) => {
                                throw ((Ue = null), e);
                            });
                        })(n)),
                    Ue
                );
            }
            const ha = new ie(5e3, 15e3),
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
                d(e.authDomain, n, 'auth-domain-config-required');
                const t = e.emulator
                        ? Be(e, 'emulator/auth/iframe')
                        : `https://${n.config.authDomain}/__/auth/iframe`,
                    r = { apiKey: e.apiKey, appName: n.name, v: x.SDK_VERSION },
                    i = _a.get(n.config.apiHost);
                i && (r.eid = i);
                const s = n._getFrameworks();
                return (
                    s.length && (r.fw = s.join(',')),
                    `${t}?${(0, l.xO)(r).slice(1)}`
                );
            }
            function Dn() {
                return (
                    (Dn = (0, a.Z)(function* (n) {
                        const e = yield da(n),
                            t = g().gapi;
                        return (
                            d(t, n, 'internal-error'),
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
                                            var i = (0, a.Z)(function* (s, o) {
                                                yield r.restyle({
                                                    setHideOnLeave: !1,
                                                });
                                                const u = T(
                                                        n,
                                                        'network-request-failed'
                                                    ),
                                                    h = g().setTimeout(() => {
                                                        o(u);
                                                    }, ha.get());
                                                function c() {
                                                    g().clearTimeout(h), s(r);
                                                }
                                                r.ping(c).then(c, () => {
                                                    o(u);
                                                });
                                            });
                                            return function (s, o) {
                                                return i.apply(this, arguments);
                                            };
                                        })()
                                    )
                            )
                        );
                    })),
                    Dn.apply(this, arguments)
                );
            }
            const Ia = {
                location: 'yes',
                resizable: 'yes',
                statusbar: 'yes',
                toolbar: 'no',
            };
            class ui {
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
            function xn(n, e, t, r, i, s) {
                d(n.config.authDomain, n, 'auth-domain-config-required'),
                    d(n.config.apiKey, n, 'invalid-api-key');
                const o = {
                    apiKey: n.config.apiKey,
                    appName: n.name,
                    authType: t,
                    redirectUrl: r,
                    v: x.SDK_VERSION,
                    eventId: i,
                };
                if (e instanceof L) {
                    e.setDefaultLanguage(n.languageCode),
                        (o.providerId = e.providerId || ''),
                        (0, l.xb)(e.getCustomParameters()) ||
                            (o.customParameters = JSON.stringify(
                                e.getCustomParameters()
                            ));
                    for (const [h, c] of Object.entries(s || {})) o[h] = c;
                }
                if (e instanceof X) {
                    const h = e.getScopes().filter((c) => '' !== c);
                    h.length > 0 && (o.scopes = h.join(','));
                }
                n.tenantId && (o.tid = n.tenantId);
                const u = o;
                for (const h of Object.keys(u)) void 0 === u[h] && delete u[h];
                return `${(function ba({ config: n }) {
                    return n.emulator
                        ? Be(n, 'emulator/auth/handler')
                        : `https://${n.authDomain}/__/auth/handler`;
                })(n)}?${(0, l.xO)(u).slice(1)}`;
            }
            const Mn = 'webStorageSupport';
            class Un extends class Na {
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
                            return b('unexpected MultiFactorSessionType');
                    }
                }
            } {
                constructor(e) {
                    super('phone'), (this.credential = e);
                }
                static _fromCredential(e) {
                    return new Un(e);
                }
                _finalizeEnroll(e, t, r) {
                    return (function Qs(n, e) {
                        return I(
                            n,
                            'POST',
                            '/v2/accounts/mfaEnrollment:finalize',
                            _(n, e)
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
                        return I(
                            n,
                            'POST',
                            '/v2/accounts/mfaSignIn:finalize',
                            _(n, e)
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
                        return Un._fromCredential(t);
                    }
                }
                return (n.FACTOR_ID = 'phone'), n;
            })();
            var li = '@firebase/auth';
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
                    return (0, a.Z)(function* () {
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
                    d(
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
            function j() {
                return window;
            }
            function Fn() {
                return (Fn = (0, a.Z)(function* (n, e, t) {
                    var r;
                    const { BuildInfo: i } = j();
                    S(e.sessionId, 'AuthEvent did not contain a session ID');
                    const s = yield Wa(e.sessionId),
                        o = {};
                    return (
                        J()
                            ? (o.ibi = i.packageName)
                            : ce()
                            ? (o.apn = i.packageName)
                            : v(
                                  n,
                                  'operation-not-supported-in-this-environment'
                              ),
                        i.displayName && (o.appDisplayName = i.displayName),
                        (o.sessionId = s),
                        xn(
                            n,
                            t,
                            e.type,
                            void 0,
                            null !== (r = e.eventId) && void 0 !== r
                                ? r
                                : void 0,
                            o
                        )
                    );
                })).apply(this, arguments);
            }
            function Zn() {
                return (Zn = (0, a.Z)(function* (n) {
                    const { BuildInfo: e } = j(),
                        t = {};
                    J()
                        ? (t.iosBundleId = e.packageName)
                        : ce()
                        ? (t.androidPackageName = e.packageName)
                        : v(n, 'operation-not-supported-in-this-environment'),
                        yield oi(n, t);
                })).apply(this, arguments);
            }
            function Vn() {
                return (Vn = (0, a.Z)(function* (n, e, t) {
                    const { cordova: r } = j();
                    let i = () => {};
                    try {
                        yield new Promise((s, o) => {
                            let u = null;
                            function h() {
                                var p;
                                s();
                                const m =
                                    null === (p = r.plugins.browsertab) ||
                                    void 0 === p
                                        ? void 0
                                        : p.close;
                                'function' == typeof m && m(),
                                    'function' ==
                                        typeof (null == t ? void 0 : t.close) &&
                                        t.close();
                            }
                            function c() {
                                u ||
                                    (u = window.setTimeout(() => {
                                        o(T(n, 'redirect-cancelled-by-user'));
                                    }, 2e3));
                            }
                            function f() {
                                'visible' ===
                                    (null == document
                                        ? void 0
                                        : document.visibilityState) && c();
                            }
                            e.addPassiveListener(h),
                                document.addEventListener('resume', c, !1),
                                ce() &&
                                    document.addEventListener(
                                        'visibilitychange',
                                        f,
                                        !1
                                    ),
                                (i = () => {
                                    e.removePassiveListener(h),
                                        document.removeEventListener(
                                            'resume',
                                            c,
                                            !1
                                        ),
                                        document.removeEventListener(
                                            'visibilitychange',
                                            f,
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
                return Wn.apply(this, arguments);
            }
            function Wn() {
                return (Wn = (0, a.Z)(function* (n) {
                    const e = Ha(n),
                        t = yield crypto.subtle.digest('SHA-256', e);
                    return Array.from(new Uint8Array(t))
                        .map((i) => i.toString(16).padStart(2, '0'))
                        .join('');
                })).apply(this, arguments);
            }
            function Ha(n) {
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
            !(function Da(n) {
                (0, x._registerComponent)(
                    new Ge.wA(
                        'auth',
                        (e, { options: t }) => {
                            const r = e.getProvider('app').getImmediate(),
                                { apiKey: i, authDomain: s } = r.options;
                            return ((o) => {
                                d(i && !i.includes(':'), 'invalid-api-key', {
                                    appName: o.name,
                                }),
                                    d(
                                        !(null == s ? void 0 : s.includes(':')),
                                        'argument-error',
                                        { appName: o.name }
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
                                        sdkClientVersion: Ar(n),
                                    },
                                    h = new ns(o, u);
                                return (
                                    (function xi(n, e) {
                                        const t =
                                                (null == e
                                                    ? void 0
                                                    : e.persistence) || [],
                                            r = (
                                                Array.isArray(t) ? t : [t]
                                            ).map(A);
                                        (null == e ? void 0 : e.errorMap) &&
                                            n._updateErrorMap(e.errorMap),
                                            n._initializeWithPersistence(
                                                r,
                                                null == e
                                                    ? void 0
                                                    : e.popupRedirectResolver
                                            );
                                    })(h, t),
                                    h
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
                    (0, x._registerComponent)(
                        new Ge.wA(
                            'auth-internal',
                            (e) => {
                                const t = y(
                                    e.getProvider('auth').getImmediate()
                                );
                                return new Ca(t);
                            },
                            'PRIVATE'
                        ).setInstantiationMode('EXPLICIT')
                    ),
                    (0, x.registerVersion)(
                        li,
                        '0.19.4',
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
                    (0, x.registerVersion)(li, '0.19.4', 'esm2017');
            })('Browser');
            class Ga extends ri {
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
                    return (0, a.Z)(function* () {
                        yield e.initPromise;
                    })();
                }
            }
            function hi(n) {
                return Hn.apply(this, arguments);
            }
            function Hn() {
                return (Hn = (0, a.Z)(function* (n) {
                    const e = yield zn()._get(Gn(n));
                    return e && (yield zn()._remove(Gn(n))), e;
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
            function zn() {
                return A(Ne);
            }
            function Gn(n) {
                return H('authEvent', n.config.apiKey, n.name);
            }
            function Fe(n) {
                if (!(null == n ? void 0 : n.includes('?'))) return {};
                const [e, ...t] = n.split('?');
                return (0, l.zd)(t.join('?'));
            }
            function fi() {
                return {
                    type: 'unknown',
                    eventId: null,
                    sessionId: null,
                    urlResponse: null,
                    postBody: null,
                    tenantId: null,
                    error: T('no-auth-event'),
                };
            }
            function Ze() {
                var n;
                return (
                    (null === (n = null == self ? void 0 : self.location) ||
                    void 0 === n
                        ? void 0
                        : n.protocol) || null
                );
            }
            function pi(n = (0, l.z$)()) {
                return !(
                    ('file:' !== Ze() && 'ionic:' !== Ze()) ||
                    !n.toLowerCase().match(/iphone|ipad|ipod|android/)
                );
            }
            function mi() {
                try {
                    const n = self.localStorage,
                        e = he();
                    if (n)
                        return (
                            n.setItem(e, '1'),
                            n.removeItem(e),
                            !(function uu(n = (0, l.z$)()) {
                                return (
                                    (function ou() {
                                        return (
                                            (0, l.w1)() &&
                                            11 ===
                                                (null == document
                                                    ? void 0
                                                    : document.documentMode)
                                        );
                                    })() ||
                                    (function au(n = (0, l.z$)()) {
                                        return /Edge\/\d+/.test(n);
                                    })(n)
                                );
                            })() || (0, l.hl)()
                        );
                } catch (n) {
                    return qn() && (0, l.hl)();
                }
                return !1;
            }
            function qn() {
                return (
                    'undefined' != typeof global &&
                    'WorkerGlobalScope' in global &&
                    'importScripts' in global
                );
            }
            function jn() {
                return (
                    ((function iu() {
                        return 'http:' === Ze() || 'https:' === Ze();
                    })() ||
                        (0, l.ru)() ||
                        pi()) &&
                    !(function su() {
                        return (0, l.b$)() || (0, l.UG)();
                    })() &&
                    mi() &&
                    !qn()
                );
            }
            function _i() {
                return pi() && 'undefined' != typeof document;
            }
            function Bn() {
                return (Bn = (0, a.Z)(function* () {
                    return (
                        !!_i() &&
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
                _e = d,
                gi = 'persistence';
            function $n(n) {
                return Kn.apply(this, arguments);
            }
            function Kn() {
                return (Kn = (0, a.Z)(function* (n) {
                    yield n._initializationPromise;
                    const e = vi(),
                        t = H(gi, n.config.apiKey, n.name);
                    (null == e ? void 0 : e.sessionStorage) &&
                        e.sessionStorage.setItem(t, n._getPersistence());
                })).apply(this, arguments);
            }
            function vi() {
                return 'undefined' != typeof window ? window : null;
            }
            const hu = d;
            class F {
                constructor() {
                    (this.browserResolver = A(
                        class Pa {
                            constructor() {
                                (this.eventManagers = {}),
                                    (this.iframes = {}),
                                    (this.originValidationPromises = {}),
                                    (this._redirectPersistence = U),
                                    (this._completeRedirectFn = Me);
                            }
                            _openPopup(e, t, r, i) {
                                var s = this;
                                return (0, a.Z)(function* () {
                                    var o;
                                    S(
                                        null ===
                                            (o = s.eventManagers[e._key()]) ||
                                            void 0 === o
                                            ? void 0
                                            : o.manager,
                                        '_initialize() not called before _openPopup()'
                                    );
                                    const u = xn(e, t, r, re(), i);
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
                                            o = Math.max(
                                                (window.screen.availWidth - r) /
                                                    2,
                                                0
                                            ).toString();
                                        let u = '';
                                        const h = Object.assign(
                                                Object.assign({}, Ia),
                                                {
                                                    width: r.toString(),
                                                    height: i.toString(),
                                                    top: s,
                                                    left: o,
                                                }
                                            ),
                                            c = (0, l.z$)().toLowerCase();
                                        t && (u = Ir(c) ? '_blank' : t),
                                            vr(c) &&
                                                ((e = e || 'http://localhost'),
                                                (h.scrollbars = 'yes'));
                                        const f = Object.entries(h).reduce(
                                            (m, [E, Z]) => `${m}${E}=${Z},`,
                                            ''
                                        );
                                        if (
                                            (function Qi(n = (0, l.z$)()) {
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
                                            })(c) &&
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
                                                new ui(null)
                                            );
                                        const p = window.open(e || '', u, f);
                                        d(p, n, 'popup-blocked');
                                        try {
                                            p.focus();
                                        } catch (m) {}
                                        return new ui(p);
                                    })(e, u, he());
                                })();
                            }
                            _openRedirect(e, t, r, i) {
                                var s = this;
                                return (0, a.Z)(function* () {
                                    return (
                                        yield s._originValidation(e),
                                        (function uo(n) {
                                            g().location.href = n;
                                        })(xn(e, t, r, re(), i)),
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
                                return (0, a.Z)(function* () {
                                    const r = yield (function va(n) {
                                            return Dn.apply(this, arguments);
                                        })(e),
                                        i = new ri(e);
                                    return (
                                        r.register(
                                            'authEvent',
                                            (s) => (
                                                d(
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
                                    Mn,
                                    { type: Mn },
                                    (i) => {
                                        var s;
                                        const o =
                                            null ===
                                                (s =
                                                    null == i
                                                        ? void 0
                                                        : i[0]) || void 0 === s
                                                ? void 0
                                                : s[Mn];
                                        void 0 !== o && t(!!o),
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
                                            (function aa(n) {
                                                return Ln.apply(
                                                    this,
                                                    arguments
                                                );
                                            })(e)),
                                    this.originValidationPromises[t]
                                );
                            }
                            get _shouldInitProactively() {
                                return Rr() || ot() || J();
                            }
                        }
                    )),
                        (this.cordovaResolver = A(
                            class Xa {
                                constructor() {
                                    (this._redirectPersistence = U),
                                        (this._shouldInitProactively = !0),
                                        (this.eventManagers = new Map()),
                                        (this.originValidationPromises = {}),
                                        (this._completeRedirectFn = Me);
                                }
                                _initialize(e) {
                                    var t = this;
                                    return (0, a.Z)(function* () {
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
                                    v(
                                        e,
                                        'operation-not-supported-in-this-environment'
                                    );
                                }
                                _openRedirect(e, t, r, i) {
                                    var s = this;
                                    return (0, a.Z)(function* () {
                                        !(function Va(n) {
                                            var e, t, r, i, s, o, u, h, c, f;
                                            const p = j();
                                            d(
                                                'function' ==
                                                    typeof (null ===
                                                        (e =
                                                            null == p
                                                                ? void 0
                                                                : p.universalLinks) ||
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
                                                d(
                                                    void 0 !==
                                                        (null ===
                                                            (t =
                                                                null == p
                                                                    ? void 0
                                                                    : p.BuildInfo) ||
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
                                                d(
                                                    'function' ==
                                                        typeof (null ===
                                                            (s =
                                                                null ===
                                                                    (i =
                                                                        null ===
                                                                            (r =
                                                                                null ==
                                                                                p
                                                                                    ? void 0
                                                                                    : p.cordova) ||
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
                                                d(
                                                    'function' ==
                                                        typeof (null ===
                                                            (h =
                                                                null ===
                                                                    (u =
                                                                        null ===
                                                                            (o =
                                                                                null ==
                                                                                p
                                                                                    ? void 0
                                                                                    : p.cordova) ||
                                                                        void 0 ===
                                                                            o
                                                                            ? void 0
                                                                            : o.plugins) ||
                                                                void 0 === u
                                                                    ? void 0
                                                                    : u.browsertab) ||
                                                        void 0 === h
                                                            ? void 0
                                                            : h.isAvailable),
                                                    n,
                                                    'invalid-cordova-configuration',
                                                    {
                                                        missingPlugin:
                                                            'cordova-plugin-browsertab',
                                                    }
                                                ),
                                                d(
                                                    'function' ==
                                                        typeof (null ===
                                                            (f =
                                                                null ===
                                                                    (c =
                                                                        null ==
                                                                        p
                                                                            ? void 0
                                                                            : p.cordova) ||
                                                                void 0 === c
                                                                    ? void 0
                                                                    : c.InAppBrowser) ||
                                                        void 0 === f
                                                            ? void 0
                                                            : f.open),
                                                    n,
                                                    'invalid-cordova-configuration',
                                                    {
                                                        missingPlugin:
                                                            'cordova-plugin-inappbrowser',
                                                    }
                                                );
                                        })(e);
                                        const o = yield s._initialize(e);
                                        yield o.initialized(),
                                            o.resetRedirect(),
                                            (function Ko() {
                                                xe.clear();
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
                                                error: T(n, 'no-auth-event'),
                                            };
                                        })(e, r, i);
                                        yield (function ja(n, e) {
                                            return zn()._set(Gn(n), e);
                                        })(e, u);
                                        const h = yield (function Ma(n, e, t) {
                                                return Fn.apply(
                                                    this,
                                                    arguments
                                                );
                                            })(e, u, t),
                                            c = yield (function Fa(n) {
                                                const { cordova: e } = j();
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
                                                                          (function Xi(
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
                                            })(h);
                                        return (function Za(n, e, t) {
                                            return Vn.apply(this, arguments);
                                        })(e, o, c);
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
                                                    return Zn.apply(
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
                                        } = j(),
                                        o = setTimeout(
                                            (0, a.Z)(function* () {
                                                yield hi(e), t.onEvent(fi());
                                            }),
                                            500
                                        ),
                                        u = (function () {
                                            var f = (0, a.Z)(function* (p) {
                                                clearTimeout(o);
                                                const m = yield hi(e);
                                                let E = null;
                                                m &&
                                                    (null == p
                                                        ? void 0
                                                        : p.url) &&
                                                    (E = (function Ba(n, e) {
                                                        var t, r;
                                                        const i = (function Ja(
                                                            n
                                                        ) {
                                                            const e = Fe(n),
                                                                t = e.link
                                                                    ? decodeURIComponent(
                                                                          e.link
                                                                      )
                                                                    : void 0,
                                                                r = Fe(t).link,
                                                                i =
                                                                    e.deep_link_id
                                                                        ? decodeURIComponent(
                                                                              e.deep_link_id
                                                                          )
                                                                        : void 0;
                                                            return (
                                                                Fe(i).link ||
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
                                                            const s = Fe(i),
                                                                o =
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
                                                                                    o
                                                                                        ? void 0
                                                                                        : o.code) ||
                                                                            void 0 ===
                                                                                t
                                                                                ? void 0
                                                                                : t.split(
                                                                                      'auth/'
                                                                                  )) ||
                                                                    void 0 === r
                                                                        ? void 0
                                                                        : r[1],
                                                                h = u
                                                                    ? T(u)
                                                                    : null;
                                                            return h
                                                                ? {
                                                                      type: n.type,
                                                                      eventId:
                                                                          n.eventId,
                                                                      tenantId:
                                                                          n.tenantId,
                                                                      error: h,
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
                                                    })(m, p.url)),
                                                    t.onEvent(E || fi());
                                            });
                                            return function (m) {
                                                return f.apply(this, arguments);
                                            };
                                        })();
                                    void 0 !== r &&
                                        'function' == typeof r.subscribe &&
                                        r.subscribe(null, u);
                                    const h = i,
                                        c = `${s.packageName.toLowerCase()}://`;
                                    j().handleOpenURL = (function () {
                                        var f = (0, a.Z)(function* (p) {
                                            if (
                                                (p
                                                    .toLowerCase()
                                                    .startsWith(c) &&
                                                    u({ url: p }),
                                                'function' == typeof h)
                                            )
                                                try {
                                                    h(p);
                                                } catch (m) {
                                                    console.error(m);
                                                }
                                        });
                                        return function (p) {
                                            return f.apply(this, arguments);
                                        };
                                    })();
                                }
                            }
                        )),
                        (this.underlyingResolver = null),
                        (this._redirectPersistence = U),
                        (this._completeRedirectFn = Me);
                }
                _initialize(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
                        return (
                            yield t.selectUnderlyingResolver(),
                            t.assertedUnderlyingResolver._initialize(e)
                        );
                    })();
                }
                _openPopup(e, t, r, i) {
                    var s = this;
                    return (0, a.Z)(function* () {
                        return (
                            yield s.selectUnderlyingResolver(),
                            s.assertedUnderlyingResolver._openPopup(e, t, r, i)
                        );
                    })();
                }
                _openRedirect(e, t, r, i) {
                    var s = this;
                    return (0, a.Z)(function* () {
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
                    return _i() || this.browserResolver._shouldInitProactively;
                }
                get assertedUnderlyingResolver() {
                    return (
                        hu(this.underlyingResolver, 'internal-error'),
                        this.underlyingResolver
                    );
                }
                selectUnderlyingResolver() {
                    var e = this;
                    return (0, a.Z)(function* () {
                        if (e.underlyingResolver) return;
                        const t = yield (function cu() {
                            return Bn.apply(this, arguments);
                        })();
                        e.underlyingResolver = t
                            ? e.cordovaResolver
                            : e.browserResolver;
                    })();
                }
            }
            function Ii(n) {
                return n.unwrap();
            }
            function pu(n) {
                return yi(n);
            }
            function yi(n) {
                const { _tokenResponse: e } =
                    n instanceof l.ZR ? n.customData : n;
                if (!e) return null;
                if (
                    !(n instanceof l.ZR) &&
                    'temporaryProof' in e &&
                    'phoneNumber' in e
                )
                    return me.credentialFromResult(n);
                const t = e.providerId;
                if (!t || 'password' === t) return null;
                let r;
                switch (t) {
                    case 'google.com':
                        r = Or;
                        break;
                    case 'facebook.com':
                        r = Nr;
                        break;
                    case 'github.com':
                        r = Cr;
                        break;
                    case 'twitter.com':
                        r = Lr;
                        break;
                    default:
                        const {
                            oauthIdToken: i,
                            oauthAccessToken: s,
                            oauthTokenSecret: o,
                            pendingToken: u,
                            nonce: h,
                        } = e;
                        return s || o || i || u
                            ? u
                                ? t.startsWith('saml.')
                                    ? ee._create(t, u)
                                    : P._fromParams({
                                          providerId: t,
                                          signInMethod: t,
                                          pendingToken: u,
                                          idToken: i,
                                          accessToken: s,
                                      })
                                : new Q(t).credential({
                                      idToken: i,
                                      accessToken: s,
                                      rawNonce: h,
                                  })
                            : null;
                }
                return n instanceof l.ZR
                    ? r.credentialFromError(n)
                    : r.credentialFromResult(n);
            }
            function R(n, e) {
                return e
                    .catch((t) => {
                        throw (
                            (t instanceof l.ZR &&
                                (function mu(n, e) {
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
                                        e.resolver = new _u(
                                            n,
                                            (function Ys(n, e) {
                                                var t;
                                                const r = (0, l.m9)(n),
                                                    i = e;
                                                return (
                                                    d(
                                                        e.customData
                                                            .operationType,
                                                        r,
                                                        'argument-error'
                                                    ),
                                                    d(
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
                                                    en._fromError(r, i)
                                                );
                                            })(n, e)
                                        );
                                    else if (r) {
                                        const i = yi(e),
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
                            credential: pu(t),
                            additionalUserInfo: Js(t),
                            user: D.getOrCreate(i),
                        };
                    });
            }
            function Jn(n, e) {
                return Yn.apply(this, arguments);
            }
            function Yn() {
                return (Yn = (0, a.Z)(function* (n, e) {
                    const t = yield e;
                    return {
                        verificationId: t.verificationId,
                        confirm: (r) => R(n, t.confirm(r)),
                    };
                })).apply(this, arguments);
            }
            class _u {
                constructor(e, t) {
                    (this.resolver = t),
                        (this.auth = (function fu(n) {
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
                    return R(Ii(this.auth), this.resolver.resolveSignIn(e));
                }
            }
            class D {
                constructor(e) {
                    (this._delegate = e),
                        (this.multiFactor = (function to(n) {
                            const e = (0, l.m9)(n);
                            return (
                                nn.has(e) || nn.set(e, tn._fromUser(e)),
                                nn.get(e)
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
                    return (0, a.Z)(function* () {
                        return R(t.auth, Vr(t._delegate, e));
                    })();
                }
                linkWithPhoneNumber(e, t) {
                    var r = this;
                    return (0, a.Z)(function* () {
                        return Jn(
                            r.auth,
                            (function Mo(n, e, t) {
                                return fn.apply(this, arguments);
                            })(r._delegate, e, t)
                        );
                    })();
                }
                linkWithPopup(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
                        return R(
                            t.auth,
                            (function qo(n, e, t) {
                                return En.apply(this, arguments);
                            })(t._delegate, e, F)
                        );
                    })();
                }
                linkWithRedirect(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
                        return (
                            yield $n(y(t.auth)),
                            (function ea(n, e, t) {
                                return (function ta(n, e, t) {
                                    return bn.apply(this, arguments);
                                })(n, e, t);
                            })(t._delegate, e, F)
                        );
                    })();
                }
                reauthenticateAndRetrieveDataWithCredential(e) {
                    return this.reauthenticateWithCredential(e);
                }
                reauthenticateWithCredential(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
                        return R(t.auth, Wr(t._delegate, e));
                    })();
                }
                reauthenticateWithPhoneNumber(e, t) {
                    return Jn(
                        this.auth,
                        (function Uo(n, e, t) {
                            return pn.apply(this, arguments);
                        })(this._delegate, e, t)
                    );
                }
                reauthenticateWithPopup(e) {
                    return R(
                        this.auth,
                        (function Go(n, e, t) {
                            return yn.apply(this, arguments);
                        })(this._delegate, e, F)
                    );
                }
                reauthenticateWithRedirect(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
                        return (
                            yield $n(y(t.auth)),
                            (function Xo(n, e, t) {
                                return (function Qo(n, e, t) {
                                    return Sn.apply(this, arguments);
                                })(n, e, t);
                            })(t._delegate, e, F)
                        );
                    })();
                }
                sendEmailVerification(e) {
                    return (function Zs(n, e) {
                        return $t.apply(this, arguments);
                    })(this._delegate, e);
                }
                unlink(e) {
                    var t = this;
                    return (0, a.Z)(function* () {
                        return (
                            yield (function ks(n, e) {
                                return wt.apply(this, arguments);
                            })(t._delegate, e),
                            t
                        );
                    })();
                }
                updateEmail(e) {
                    return (function zs(n, e) {
                        return zr((0, l.m9)(n), e, null);
                    })(this._delegate, e);
                }
                updatePassword(e) {
                    return (function Gs(n, e) {
                        return zr((0, l.m9)(n), null, e);
                    })(this._delegate, e);
                }
                updatePhoneNumber(e) {
                    return (function Fo(n, e) {
                        return _n.apply(this, arguments);
                    })(this._delegate, e);
                }
                updateProfile(e) {
                    return (function Hs(n, e) {
                        return Yt.apply(this, arguments);
                    })(this._delegate, e);
                }
                verifyBeforeUpdateEmail(e, t) {
                    return (function Vs(n, e, t) {
                        return Kt.apply(this, arguments);
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
            const ge = d;
            let Ei = (() => {
                class n {
                    constructor(t, r) {
                        if (((this.app = t), r.isInitialized()))
                            return (
                                (this._delegate = r.getImmediate()),
                                void this.linkUnderlyingAuth()
                            );
                        const { apiKey: i } = t.options;
                        ge(i, 'invalid-api-key', { appName: t.name });
                        let s = [ue];
                        if ('undefined' != typeof window) {
                            s = (function du(n, e) {
                                const t = vi();
                                if (!(null == t ? void 0 : t.sessionStorage))
                                    return [];
                                const r = H(gi, n, e);
                                switch (t.sessionStorage.getItem(r)) {
                                    case k.NONE:
                                        return [ue];
                                    case k.LOCAL:
                                        return [pe, U];
                                    case k.SESSION:
                                        return [U];
                                    default:
                                        return [];
                                }
                            })(i, t.name);
                            for (const u of [pe, Ne, U])
                                s.includes(u) || s.push(u);
                        }
                        ge(i, 'invalid-api-key', { appName: t.name });
                        const o = 'undefined' != typeof window ? F : void 0;
                        (this._delegate = r.initialize({
                            options: {
                                persistence: s,
                                popupRedirectResolver: o,
                            },
                        })),
                            this._delegate._updateErrorMap(Ci),
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
                        !(function rs(n, e, t) {
                            const r = y(n);
                            d(r._canInitEmulator, r, 'emulator-config-failed'),
                                d(
                                    /^https?:\/\//.test(e),
                                    r,
                                    'invalid-emulator-scheme'
                                );
                            const i = !!(null == t
                                    ? void 0
                                    : t.disableWarnings),
                                s = wr(e),
                                { host: o, port: u } = (function is(n) {
                                    const e = wr(n),
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
                                            port: Sr(r.substr(s.length + 1)),
                                        };
                                    }
                                    {
                                        const [s, o] = r.split(':');
                                        return { host: s, port: Sr(o) };
                                    }
                                })(e);
                            (r.config.emulator = {
                                url: `${s}//${o}${null === u ? '' : `:${u}`}/`,
                            }),
                                (r.settings.appVerificationDisabledForTesting =
                                    !0),
                                (r.emulatorConfig = Object.freeze({
                                    host: o,
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
                            return Vt.apply(this, arguments);
                        })(this._delegate, t);
                    }
                    checkActionCode(t) {
                        return Hr(this._delegate, t);
                    }
                    confirmPasswordReset(t, r) {
                        return (function Ps(n, e, t) {
                            return Zt.apply(this, arguments);
                        })(this._delegate, t, r);
                    }
                    createUserWithEmailAndPassword(t, r) {
                        var i = this;
                        return (0, a.Z)(function* () {
                            return R(
                                i._delegate,
                                (function Cs(n, e, t) {
                                    return zt.apply(this, arguments);
                                })(i._delegate, t, r)
                            );
                        })();
                    }
                    fetchProvidersForEmail(t) {
                        return this.fetchSignInMethodsForEmail(t);
                    }
                    fetchSignInMethodsForEmail(t) {
                        return (function Fs(n, e) {
                            return Bt.apply(this, arguments);
                        })(this._delegate, t);
                    }
                    isSignInWithEmailLink(t) {
                        return (function xs(n, e) {
                            const t = de.parseLink(e);
                            return (
                                'EMAIL_SIGNIN' ===
                                (null == t ? void 0 : t.operation)
                            );
                        })(0, t);
                    }
                    getRedirectResult() {
                        var t = this;
                        return (0, a.Z)(function* () {
                            ge(
                                jn(),
                                t._delegate,
                                'operation-not-supported-in-this-environment'
                            );
                            const r = yield (function na(n, e) {
                                return Pn.apply(this, arguments);
                            })(t._delegate, F);
                            return r
                                ? R(t._delegate, Promise.resolve(r))
                                : { credential: null, user: null };
                        })();
                    }
                    addFrameworkForLogging(t) {
                        !(function eu(n, e) {
                            y(n)._logFramework(e);
                        })(this._delegate, t);
                    }
                    onAuthStateChanged(t, r, i) {
                        const { next: s, error: o, complete: u } = Ti(t, r, i);
                        return this._delegate.onAuthStateChanged(s, o, u);
                    }
                    onIdTokenChanged(t, r, i) {
                        const { next: s, error: o, complete: u } = Ti(t, r, i);
                        return this._delegate.onIdTokenChanged(s, o, u);
                    }
                    sendSignInLinkToEmail(t, r) {
                        return (function Ds(n, e, t) {
                            return Gt.apply(this, arguments);
                        })(this._delegate, t, r);
                    }
                    sendPasswordResetEmail(t, r) {
                        return (function bs(n, e, t) {
                            return Ft.apply(this, arguments);
                        })(this._delegate, t, r || void 0);
                    }
                    setPersistence(t) {
                        var r = this;
                        return (0, a.Z)(function* () {
                            let i;
                            switch (
                                ((function lu(n, e) {
                                    _e(
                                        Object.values(k).includes(e),
                                        n,
                                        'invalid-persistence-type'
                                    ),
                                        (0, l.b$)()
                                            ? _e(
                                                  e !== k.SESSION,
                                                  n,
                                                  'unsupported-persistence-type'
                                              )
                                            : (0, l.UG)()
                                            ? _e(
                                                  e === k.NONE,
                                                  n,
                                                  'unsupported-persistence-type'
                                              )
                                            : qn()
                                            ? _e(
                                                  e === k.NONE ||
                                                      (e === k.LOCAL &&
                                                          (0, l.hl)()),
                                                  n,
                                                  'unsupported-persistence-type'
                                              )
                                            : _e(
                                                  e === k.NONE || mi(),
                                                  n,
                                                  'unsupported-persistence-type'
                                              );
                                })(r._delegate, t),
                                t)
                            ) {
                                case k.SESSION:
                                    i = U;
                                    break;
                                case k.LOCAL:
                                    i = (yield A(pe)._isAvailable()) ? pe : Ne;
                                    break;
                                case k.NONE:
                                    i = ue;
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
                        return R(
                            this._delegate,
                            (function As(n) {
                                return kt.apply(this, arguments);
                            })(this._delegate)
                        );
                    }
                    signInWithCredential(t) {
                        return R(this._delegate, we(this._delegate, t));
                    }
                    signInWithCustomToken(t) {
                        return R(
                            this._delegate,
                            (function Ss(n, e) {
                                return Mt.apply(this, arguments);
                            })(this._delegate, t)
                        );
                    }
                    signInWithEmailAndPassword(t, r) {
                        return R(
                            this._delegate,
                            (function Ls(n, e, t) {
                                return we((0, l.m9)(n), Rt.credential(e, t));
                            })(this._delegate, t, r)
                        );
                    }
                    signInWithEmailLink(t, r) {
                        return R(
                            this._delegate,
                            (function Ms(n, e, t) {
                                return qt.apply(this, arguments);
                            })(this._delegate, t, r)
                        );
                    }
                    signInWithPhoneNumber(t, r) {
                        return Jn(
                            this._delegate,
                            (function xo(n, e, t) {
                                return hn.apply(this, arguments);
                            })(this._delegate, t, r)
                        );
                    }
                    signInWithPopup(t) {
                        var r = this;
                        return (0, a.Z)(function* () {
                            return (
                                ge(
                                    jn(),
                                    r._delegate,
                                    'operation-not-supported-in-this-environment'
                                ),
                                R(
                                    r._delegate,
                                    (function zo(n, e, t) {
                                        return In.apply(this, arguments);
                                    })(r._delegate, t, F)
                                )
                            );
                        })();
                    }
                    signInWithRedirect(t) {
                        var r = this;
                        return (0, a.Z)(function* () {
                            return (
                                ge(
                                    jn(),
                                    r._delegate,
                                    'operation-not-supported-in-this-environment'
                                ),
                                yield $n(r._delegate),
                                (function Jo(n, e, t) {
                                    return (function Yo(n, e, t) {
                                        return wn.apply(this, arguments);
                                    })(n, e, t);
                                })(r._delegate, t, F)
                            );
                        })();
                    }
                    updateCurrentUser(t) {
                        return this._delegate.updateCurrentUser(t);
                    }
                    verifyPasswordResetCode(t) {
                        return (function Os(n, e) {
                            return Ht.apply(this, arguments);
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
            function Ti(n, e, t) {
                let r = n;
                'function' != typeof n &&
                    ({ next: r, error: e, complete: t } = n);
                const i = r;
                return {
                    next: (o) => i(o && D.getOrCreate(o)),
                    error: e,
                    complete: t,
                };
            }
            class Xn {
                constructor() {
                    (this.providerId = 'phone'),
                        (this._delegate = new me(Ii(We.Z.auth())));
                }
                static credential(e, t) {
                    return me.credential(e, t);
                }
                verifyPhoneNumber(e, t) {
                    return this._delegate.verifyPhoneNumber(e, t);
                }
                unwrap() {
                    return this._delegate;
                }
            }
            (Xn.PHONE_SIGN_IN_METHOD = me.PHONE_SIGN_IN_METHOD),
                (Xn.PROVIDER_ID = me.PROVIDER_ID);
            const gu = d;
            class vu {
                constructor(e, t, r = We.Z.app()) {
                    var i;
                    gu(
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
            !(function yu(n) {
                n.INTERNAL.registerComponent(
                    new Ge.wA(
                        'auth-compat',
                        (e) => {
                            const t = e
                                    .getProvider('app-compat')
                                    .getImmediate(),
                                r = e.getProvider('auth');
                            return new Ei(t, r);
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
                            EmailAuthProvider: Rt,
                            FacebookAuthProvider: Nr,
                            GithubAuthProvider: Cr,
                            GoogleAuthProvider: Or,
                            OAuthProvider: Q,
                            SAMLAuthProvider: Re,
                            PhoneAuthProvider: Xn,
                            PhoneMultiFactorGenerator: Oa,
                            RecaptchaVerifier: vu,
                            TwitterAuthProvider: Lr,
                            Auth: Ei,
                            AuthCredential: Y,
                            Error: l.ZR,
                        })
                        .setInstantiationMode('LAZY')
                        .setMultipleInstances(!1)
                ),
                    n.registerVersion('@firebase/auth-compat', '0.2.4');
            })(We.Z);
        },
    },
]);
