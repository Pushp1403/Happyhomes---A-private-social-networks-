/*! paytmOauth 2015-07-29 */
"use strict";
/*"$scope", "$window", "$location", "$rootScope", "$timeout", "CLIENT_CONFIGURATION", "backendService", "helperService", "shareDataService"
*/function loginController(a, b, c, d, e, f, g, h, i) {
    a.config = f,
    a.sessionData = {},
    a.formError = !1,
    a.formErrorMsg = "",
    a.spinnerVisible = !1;
    var j = navigator.userAgent;
    (-1 != j.indexOf("MSIE 8") || -1 != j.indexOf("MSIE 9")) && (d.isIE = !0);
    var k = "",
        l = h.getParameterByName("mobile-prefix"),
        m = h.getParameterByName("email-prefix"),
        n = a.subTheme;
    a.otpOptionAvailable = f.loginHi[n].otpOptionAvailable,
    a.showWalletContainer = f.loginHi[n].showWalletContainer,
    a.showImage = f.signUpHi[n].showImage,
    a.text = {},
    a.text.loginText = f.loginHi[n].text.loginBtnText, 
    a.text.TandCText = f.loginHi[n].text.TandCText,
    a.text.loginLink = f.loginHi[n].text.loginLink, 
    a.text.signupLink = f.loginHi[n].text.signupLink, 
    a.header = f.loginHi[n].header;
    var o = h.getParameterByName("subscription") || "";
    "true" == o && "airtelhi" == n && (a.header.text = i.getAirtelCustomHeaderMessage()), e(function() {
        a.loginForm.$setPristine(),
        a.errorsShown && (a.sessionData.isInvalidUserNamePassword = !1),
        l && h.mobileRgx(l) ? (a.sessionData.email = l, a.loginForm.username.$dirty = !0, k = k + "&mobile-prefix=" + l) : m && h.emailRgx(m) && (a.sessionData.email = m, a.loginForm.username.$dirty = !0, k = k + "&email-prefix=" + m)
    }, 0), a.submitLoginForm = function() {
        var c = a.loginForm;
        if (c.username.$setViewValue(c.username.$viewValue),
        		c.password.$setViewValue(c.password.$viewValue),
        		!c.username.$error.required && !c.password.$error.required && !(h.isMobile(a.sessionData.email) && c.username.$error.mobileValid || !h.isMobile(a.sessionData.email) && c.username.$error.emailValid || c.password.$invalid)) {
            this.spinnerVisible = !0;
            var c = document.loginForm,
                d = "/oauth2/authorize?" + a.sessionData.registerRedirectParams;
            c.action = d,
            c.submit(),
            a.location = b.location.href,
            this.spinnerVisible = !1
        }
    }, a.callSignUp = function() {
        d.errorsShown = !0,
        c.path("/signup")
    }, a.forgetPasswordClick = function() {
        d.errorsShown = !0,
        c.path("/forgetPassword")
    }, a.verifyFields = function() {
        var a = this.sessionData.email;
        return h.mobileRgx(a) || h.emailRgx(a) ? !0 : (this.formError = !0, this.formErrorMsg = "Please enter a valid email id or 10 digit phone number.", !1)
    }, a.loginByOtpClick = function() {
        this.sessionData.isInvalidUserNamePassword = !1;
        var b = a.loginForm;
        if (b.username.$setViewValue(b.username.$viewValue), !b.username.$error.required && !(h.isMobile(a.sessionData.email) && b.username.$error.mobileValid || !h.isMobile(a.sessionData.email) && b.username.$error.emailValid)) {
            var e = this.sessionData.email;
            this.spinnerVisible = !0, g.generateOtp(e, function(b) {
                a.spinnerVisible = !1,
                a.OTPState = b.state,
                "FAILURE" == b.status ? (a.formError = !0, a.formErrorMsg = b.message) : (i.setMessage(b.message), a.formError = !1, d.sessionData = a.sessionData, d.sessionData.OTPState = a.OTPState, c.path("/otp/login"), d.errorsShown = !0)
            }, function(b) {
                a.spinnerVisible = !1,
                a.formError = !0,
                a.formErrorMsg = i.getAjaxErrorMessage()
            })
        }
    }
}

function loginOtpController(a, b, c, d, e, f, g) {
    a.spinnerVisible = !1, a.formError = !1, a.formErrorMsg = "", a.otpMessage = g.getMessage(), a.forgotPassConfMessage = g.getForgotPasswordConfirmationMessage(), a.submitButtonText = "Login", a.codeForgotPassword = "", a.otpValue = "";
    var h = a.subTheme;
    a.otpForgotPasswordEmailOnly = !g.getIsMobileRegistered(), a.emailMask = g.getMaskEmail(), a.showKnowMoreOtpContainer = e.loginHi[h].showKnowMoreOtpContainer, a.isLeftAlignBack = e.loginHi[h].isLeftAlignBack, a.header = {}, angular.copy(e.loginHi[h].header, a.header), a.header.text = "", a.header.imagePath = "";
    var i = "login",
        j = d.redirectFrom;
    "login" != j || a.sessionData && a.sessionData.email || c.path("/login"), "forgotPassword" == j && (a.submitButtonText = "Verify", i = "forgotPassword", a.codeForgotPassword = g.getCodeForgotPassword(), a.otpForgotPasswordEmailOnly || a.codeForgotPassword || c.path("/forgetPassword")), "login" == i && (a.showTermsConditions = !0), a.resendotpClick = function() {
        this.spinnerVisible = !0, "login" == i ? f.generateOtp(a.sessionData.email, function(b) {
            a.spinnerVisible = !1, a.OTPState = b.state, "FAILURE" == b.status ? (a.formError = !0, a.formErrorMsg = b.message) : (a.otpMessage = b.message, a.formError = !1, a.sessionData.OTPState = a.OTPState)
        }, function(b) {
            a.spinnerVisible = !1, a.formError = !0, a.formErrorMsg = g.getAjaxErrorMessage()
        }) : f.resendOtpForgotPassword(a.sessionData.email, "both", a.codeForgotPassword, function(b) {
            a.spinnerVisible = !1,
            "FAILURE" == b.status ? (a.formError = !0, a.formErrorMsg = b.message) : (a.formError = !1, a.codeForgotPassword = b.code)
        }, function(b) {
            a.spinnerVisible = !1, a.formError = !0;
            var c = "";
            c = b.error ? b.error : g.getAjaxErrorMessage(), a.formErrorMsg = c
        })
    }, a.verifyOtpClick = function() {
        var d = a.otpForm;
        if (d.otp.$setViewValue(d.otp.$viewValue), d.otp.$error.pattern && (a.otpInvalid = !0), !d.otp.$invalid) {
            a.spinnerVisible = !0;
            var e;
            e = "login" == i ? {
                otp: a.otpValue,
                state: a.sessionData.OTPState
            } : {
                otp: a.otpValue,
                code: a.codeForgotPassword
            }, f.verifyOtp(e, i, function(d) {
                a.spinnerVisible = !1, "FAILURE" != d.status ? d.redirectUri && "login" == i ? (a.formError = !1, b.location = d.redirectUri) : (a.formError = !1, g.setCodeForgotPassword(d.code), c.path("/changePassword")) : (a.formError = !0, a.formErrorMsg = d.message)
            }, function(b) {
                a.spinnerVisible = !1, a.formError = !0, a.formErrorMsg = g.getAjaxErrorMessage()
            })
        }
    }
}

function forgetPasswordController(a, b, c, d, e, f, g) {
    a.spinnerVisible = !1, a.formError = !1, a.formErrorMsg = "", a.sessionData = {}, a.sessionData.email = "";
    var h = a.subTheme;
    a.header = {}, angular.copy(d.loginHi[h].header, a.header), a.header.text = "", a.header.imagePath = "";
    var i = navigator.userAgent;
    (-1 != i.indexOf("MSIE 8") || -1 != i.indexOf("MSIE 9")) && (c.isIE = !0), a.getPasswordClick = function() {
        var d = a.forgetPasswordForm;
        if (d.username.$setViewValue(d.username.$viewValue), !d.username.$error.required && !(g.isMobile(a.sessionData.email) && d.username.$error.mobileValid || !g.isMobile(a.sessionData.email) && d.username.$error.emailValid)) {
            a.spinnerVisible = !0;
            var h = "both";
            e.forgotPassword(a.sessionData.email, h, a.sessionData.csrfToken, function(d) {
                if (a.spinnerVisible = !1, "FAILURE" != d.status) {
                    a.formError = !1, f.setCodeForgotPassword(d.code), f.setIsMobileRegistered("otp" == d.type ? !0 : !1);
                    var e = d.username,
                        g = "One Time Password(OTP) has been sent to your mobile " + d.username + ", please enter it here to verify your mobile.";
                    f.setMessage(g), g = "", d.detail && (e = d.detail, g = "Or you can click on the link sent on your email " + d.detail + ", \n"), g += "Please write to us at care@paytm.com for further assistance", f.setMaskEmail(e), f.setForgotPasswordConfirmationMessage(g), c.sessionData = a.sessionData, b.path("/otp/forgotPassword")
                } else a.formError = !0, a.formErrorMsg = d.message
            }, function(b) {
                a.spinnerVisible = !1, a.formError = !0;
                var c;
                c = b.error ? b.error : f.getAjaxErrorMessage(), a.formErrorMsg = c
            })
        }
    }
}

function changePasswordController(a, b, c, d, e, f) {
    a.passwordChangeComplete = !1, a.spinnerVisible = !1, a.sessionData = {}, a.code = f.getCodeForgotPassword(), a.header = {};
    var g = a.subTheme;
    angular.copy(d.loginHi[g].header, a.header), a.header.text = "", a.header.imagePath = "", a.code || b.path("/forgotPassword"), a.changePasswordClick = function() {
        var d = a.changePasswordForm;
        if (d.newPassword.$setViewValue(d.newPassword.$viewValue), d.confirmPassword.$setViewValue(d.confirmPassword.$viewValue), !d.confirmPassword.$invalid && !d.newPassword.$invalid) {
            if (a.sessionData.newPassword !== a.sessionData.confirmPassword) return this.formError = !0, void(this.formErrorMsg = "Oops, these passwords do not match, please enter same password.");
            var g = {
                code: a.code,
                password: a.sessionData.newPassword,
                confirmPassword: a.sessionData.confirmPassword
            };
            e.changePassword(g, function(d) {
                a.spinnerVisible = !1, "SUCCESS" == d.status ? (a.formError = !1, a.passwordChangeComplete = !0, c(function() {
                    b.path("/login")
                }, 5e3)) : (a.formError = !0, a.formErrorMsg = d.message)
            }, function(b) {
                a.spinnerVisible = !1, a.formError = !0;
                var c = b.message || f.getAjaxErrorMessage();
                a.formErrorMsg = c
            })
        }
    }
}

function signupController(a, b, c, d, e, f, g, h, i) {
    a.config = f, a.sessionData = {}, a.genericError = "", a.spinnerVisible = !1, a.dobAgreement = !0;
    var j = navigator.userAgent;
    (-1 != j.indexOf("MSIE 8") || -1 != j.indexOf("MSIE 9")) && (b.isIE = !0);
    var k = "",
        l = g.getParameterByName("mobile-prefix"),
        m = g.getParameterByName("email-prefix");
    e(function() {
        if (l && g.mobileRgx(l) ? (a.sessionData.mobileNumber = l, a.signupForm.mobileNumber.$dirty = !0, k = k + "&mobile-prefix=" + l) : m && g.emailRgx(m) && (a.sessionData.email = m, a.signupForm.email.$dirty = !0, k = k + "&email-prefix=" + m), i.getSignupData()) {
            var b = a.signupForm;
            i.getSignupData().mobile && (a.sessionData.mobileNumber = i.getSignupData().mobile, b.mobileNumber.$setViewValue(b.mobileNumber.$viewValue)), i.getSignupData().email && (a.sessionData.email = i.getSignupData().email, b.email.$setViewValue(b.email.$viewValue)), i.getSignupData().password && (a.sessionData.password = i.getSignupData().password, b.loginPassword.$setViewValue(b.loginPassword.$viewValue))
        }
    }, 0);
    var n = a.subTheme;
    a.showWalletContainer = f.signUpHi[n].showWalletContainer, a.showImage = f.signUpHi[n].showImage, a.text = {}, a.text.signupText = f.signUpHi[n].text.signupBtnText, a.text.TandCText = f.signUpHi[n].text.TandCText, a.text.loginLink = f.loginHi[n].text.loginLink, a.text.signupLink = f.loginHi[n].text.signupLink, a.header = f.signUpHi[n].header;
    var o = g.getParameterByName("subscription") || "";
    "true" == o && "airtelhi" == n && (a.header.text = i.getAirtelCustomHeaderMessage()), a.submitSignupForm = function() {
        this.continueClick()
    }, a.callLogin = function() {
        c.path("/login")
    }, a.continueClick = function() {
        if (0 == a.dobAgreement) return a.genericError = "You must be above 18 to signup.", !1;
        var b = a.signupForm;
        i.getSignupData() && i.getSignupData().mobile || b.mobileNumber.$setViewValue(b.mobileNumber.$viewValue), i.getSignupData() && i.getSignupData().email || b.email.$setViewValue(b.email.$viewValue), i.getSignupData() && i.getSignupData().password || b.loginPassword.$setViewValue(b.loginPassword.$viewValue), b.loginPassword.$invalid || b.mobileNumber.$invalid || b.email.$invalid && !b.email.$error.required || (a.spinnerVisible = !0, i.getSignupData() && (a.sessionData.csrfToken = i.getSignupData().csrfToken), h.register(a.sessionData.email, a.sessionData.mobileNumber, a.sessionData.password, a.sessionData.csrfToken, a.dobAgreement, function(e) {
            if (a.spinnerVisible = !1, "SUCCESS" == e.status) {
                var f = {};
                f.csrfToken = e.csrfToken, f.email = e.email, f.mobile = e.mobile, f.password = a.sessionData.password, f.signupToken = e.signupToken, i.setSignupData(f), c.path("/signupVerify")
            } else {
                switch (e.responseCode) {
                    case "750":
                        d.location.reload();
                        break;
                    case "705":
                    case "706":
                    case "707":
                        a.sessionData.mobileError = e.message;
                        break;
                    case "701":
                    case "702":
                    case "703":
                        a.sessionData.emailError = e.message;
                        break;
                    case "700":
                    case "704":
                        a.sessionData.passwordError = e.message;
                        break;
                    case "708":
                        a.genericError = e.message;
                        break;
                    case "427":
                        a.sessionData.passwordError = e.message;
                        break;
                    default:
                        a.genericError = i.getAjaxErrorMessage()
                }
                a.sessionData.password = "", b.loginPassword.$setPristine()
            }
        }, function(b) {
            a.spinnerVisible = !1, a.genericError = i.getAjaxErrorMessage()
        }))
    }
}

function signupVerifyController(a, b, c, d, e, f, g) {
    var h = a.subTheme;
    a.text = {}, a.text.loginLink = d.loginHi[h].text.loginLink, a.text.signupLink = d.loginHi[h].text.signupLink, a.showWalletContainer = d.loginHi[h].showWalletContainer, a.sessionData = {}, a.sessionData.gender = "male", a.otpResendMessage = "", a.error = {}, a.header = d.signUpHi[h].header, a.signupData = g.getSignupData(), a.signupData || b.path("/signup");
    var i = e.getParameterByName("subscription") || "";
    "true" == i && "airtelhi" == h && (a.header.text = g.getAirtelCustomHeaderMessage()), a.callLogin = function() {
        b.path("/login")
    }, a.signupClick = function() {
        var d = a.signupVerifyForm;
        if (d.otp.$setViewValue(d.otp.$viewValue), !d.otp.$invalid) {
            a.spinnerVisible = !0;
            var e = {};
            e.gender = a.sessionData.gender, a.sessionData.firstName && (e.firstName = a.sessionData.firstName), a.sessionData.lastName && (e.lastName = a.sessionData.lastName), f.registerVerify(a.sessionData.otpValue, a.signupData.signupToken, a.signupData.csrfToken, e, function(d) {
                if (a.spinnerVisible = !1, "FAILURE" == d.status) switch (d.responseCode) {
                    case "709":
                        a.error.otpError = d.message;
                        break;
                    case "461":
                        a.error.firstNameError = d.message;
                        break;
                    case "463":
                        a.error.lastNameError = d.message;
                        break;
                    case "710":
                        b.path("/signup");
                        break;
                    case "708":
                        a.error.genericError = d.message;
                        break;
                    default:
                        a.error.genericError = g.getAjaxErrorMessage()
                } else c.location = d.redirectUri
            }, function(b) {
                a.spinnerVisible = !1, a.error.genericError = g.getAjaxErrorMessage()
            })
        }
    }, a.resendOtpClick = function() {
        f.resendOtp(a.signupData.signupToken, function(b) {
            "SUCCESS" == b.status ? a.otpResendMessage = b.message : a.error.genericError = b.message
        }, function(b) {
            a.error.genericError = g.getAjaxErrorMessage()
        })
    }
}

function verifyLoginOtpController(a, b, c, d, e, f) {
    a.spinnerVisible = !1, a.formError = !1, a.formErrorMsg = "", a.otpMessage = e.getMessage(), a.submitButtonText = "Login", a.otpValue = "", a.isOtpLogin = !0;
    a.subTheme;
    a.header = {}, a.header.text = "", a.header.imagePath = "", a.showTermsConditions = !0, a.resendOtpOption = !0, a.isOtpByCall = !0, a.isResendOtpEnabled = !1, a.secondCount = 30;
    var g = function() {
        return a.secondCount = a.secondCount - 1, a.secondCountString = a.secondCount < 10 ? "0" + a.secondCount.toString() : a.secondCount.toString(), 0 == a.secondCount ? void(a.isResendOtpEnabled = !0) : void c(g, 1e3)
    };
    a.resendOtpOption && c(g, 1e3), a.resendotpClick = function() {
        if (a.otpForm.otp.$setPristine(), a.resendOtpOption) {
            a.isResendOtpEnabled = !1, a.secondCount = 60, c(g, 1e3);
            var b = {
                state: a.sessionData.otpLoginState,
                otpDeliveryMethod: "OBD"
            }
        } else var b = {
            state: a.sessionData.otpLoginState
        };
        a.spinnerVisible = !0, f.resendOtpLoginFlow(b, function(b) {
            a.spinnerVisible = !1, "FAILURE" == b.status ? (a.formError = !0, a.formErrorMsg = b.message) : (a.otpMessage = b.message, a.formError = !1), a.otpValue = ""
        }, function(b) {
            a.spinnerVisible = !1, a.formError = !0;
            var c = b.message || e.getAjaxErrorMessage();
            a.formErrorMsg = c, a.otpValue = ""
        })
    }, a.verifyOtpClick = function() {
        b.find("input")[0].blur();
        var c = a.otpForm;
        if (c.otp.$setViewValue(c.otp.$viewValue), c.otp.$error.pattern && (a.otpInvalid = !0), !c.otp.$invalid) {
            a.spinnerVisible = !0;
            var d = {
                otp: a.otpValue,
                state: a.sessionData.otpLoginState
            };
            f.verifyOtp(d, "login", function(b) {
                a.spinnerVisible = !1, "FAILURE" != b.status ? (a.formError = !1, window.location = b.redirectUri) : (a.formError = !0, a.formErrorMsg = b.message)
            }, function(b) {
                a.spinnerVisible = !1, a.formError = !0;
                var c = b.message || e.getAjaxErrorMessage();
                a.formErrorMsg = c
            })
        }
    }
}! function(a, b, c) {
    function d(a) {
        return function() {
            var b, c, d = arguments[0],
                e = "[" + (a ? a + ":" : "") + d + "] ",
                f = arguments[1],
                g = arguments,
                h = function(a) {
                    return "function" == typeof a ? a.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof a ? "undefined" : "string" != typeof a ? JSON.stringify(a) : a
                };
            for (b = e + f.replace(/\{\d+\}/g, function(a) {
                    var b, c = +a.slice(1, -1);
                    return c + 2 < g.length ? (b = g[c + 2], "function" == typeof b ? b.toString().replace(/ ?\{[\s\S]*$/, "") : "undefined" == typeof b ? "undefined" : "string" != typeof b ? Q(b) : b) : a
                }), b = b + "\nhttp://errors.angularjs.org/1.2.9/" + (a ? a + "/" : "") + d, c = 2; c < arguments.length; c++) b = b + (2 == c ? "?" : "&") + "p" + (c - 2) + "=" + encodeURIComponent(h(arguments[c]));
            return new Error(b)
        }
    }

    function e(a) {
        if (null == a || A(a)) return !1;
        var b = a.length;
        return 1 === a.nodeType && b ? !0 : u(a) || x(a) || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    function f(a, b, c) {
        var d;
        if (a)
            if (y(a))
                for (d in a) "prototype" == d || "length" == d || "name" == d || a.hasOwnProperty && !a.hasOwnProperty(d) || b.call(c, a[d], d);
            else if (a.forEach && a.forEach !== f) a.forEach(b, c);
        else if (e(a))
            for (d = 0; d < a.length; d++) b.call(c, a[d], d);
        else
            for (d in a) a.hasOwnProperty(d) && b.call(c, a[d], d);
        return a
    }

    function g(a) {
        var b = [];
        for (var c in a) a.hasOwnProperty(c) && b.push(c);
        return b.sort()
    }

    function h(a, b, c) {
        for (var d = g(a), e = 0; e < d.length; e++) b.call(c, a[d[e]], d[e]);
        return d
    }

    function i(a) {
        return function(b, c) {
            a(c, b)
        }
    }

    function j() {
        for (var a, b = tc.length; b;) {
            if (b--, a = tc[b].charCodeAt(0), 57 == a) return tc[b] = "A", tc.join("");
            if (90 != a) return tc[b] = String.fromCharCode(a + 1), tc.join("");
            tc[b] = "0"
        }
        return tc.unshift("0"), tc.join("")
    }

    function k(a, b) {
        b ? a.$$hashKey = b : delete a.$$hashKey
    }

    function l(a) {
        var b = a.$$hashKey;
        return f(arguments, function(b) {
            b !== a && f(b, function(b, c) {
                a[c] = b
            })
        }), k(a, b), a
    }

    function m(a) {
        return parseInt(a, 10)
    }

    function n(a, b) {
        return l(new(l(function() {}, {
            prototype: a
        })), b)
    }

    function o() {}

    function p(a) {
        return a
    }

    function q(a) {
        return function() {
            return a
        }
    }

    function r(a) {
        return "undefined" == typeof a
    }

    function s(a) {
        return "undefined" != typeof a
    }

    function t(a) {
        return null != a && "object" == typeof a
    }

    function u(a) {
        return "string" == typeof a
    }

    function v(a) {
        return "number" == typeof a
    }

    function w(a) {
        return "[object Date]" === qc.call(a)
    }

    function x(a) {
        return "[object Array]" === qc.call(a)
    }

    function y(a) {
        return "function" == typeof a
    }

    function z(a) {
        return "[object RegExp]" === qc.call(a)
    }

    function A(a) {
        return a && a.document && a.location && a.alert && a.setInterval
    }

    function B(a) {
        return a && a.$evalAsync && a.$watch
    }

    function C(a) {
        return "[object File]" === qc.call(a)
    }

    function D(a) {
        return !(!a || !(a.nodeName || a.on && a.find))
    }

    function E(a, b, c) {
        var d = [];
        return f(a, function(a, e, f) {
            d.push(b.call(c, a, e, f))
        }), d
    }

    function F(a, b) {
        return -1 != G(a, b)
    }

    function G(a, b) {
        if (a.indexOf) return a.indexOf(b);
        for (var c = 0; c < a.length; c++)
            if (b === a[c]) return c;
        return -1
    }

    function H(a, b) {
        var c = G(a, b);
        return c >= 0 && a.splice(c, 1), b
    }

    function I(a, b) {
        if (A(a) || B(a)) throw rc("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
        if (b) {
            if (a === b) throw rc("cpi", "Can't copy! Source and destination are identical.");
            if (x(a)) {
                b.length = 0;
                for (var c = 0; c < a.length; c++) b.push(I(a[c]))
            } else {
                var d = b.$$hashKey;
                f(b, function(a, c) {
                    delete b[c]
                });
                for (var e in a) b[e] = I(a[e]);
                k(b, d)
            }
        } else b = a, a && (x(a) ? b = I(a, []) : w(a) ? b = new Date(a.getTime()) : z(a) ? b = new RegExp(a.source) : t(a) && (b = I(a, {})));
        return b
    }

    function J(a, b) {
        b = b || {};
        for (var c in a) a.hasOwnProperty(c) && "$" !== c.charAt(0) && "$" !== c.charAt(1) && (b[c] = a[c]);
        return b
    }

    function K(a, b) {
        if (a === b) return !0;
        if (null === a || null === b) return !1;
        if (a !== a && b !== b) return !0;
        var d, e, f, g = typeof a,
            h = typeof b;
        if (g == h && "object" == g) {
            if (!x(a)) {
                if (w(a)) return w(b) && a.getTime() == b.getTime();
                if (z(a) && z(b)) return a.toString() == b.toString();
                if (B(a) || B(b) || A(a) || A(b) || x(b)) return !1;
                f = {};
                for (e in a)
                    if ("$" !== e.charAt(0) && !y(a[e])) {
                        if (!K(a[e], b[e])) return !1;
                        f[e] = !0
                    }
                for (e in b)
                    if (!f.hasOwnProperty(e) && "$" !== e.charAt(0) && b[e] !== c && !y(b[e])) return !1;
                return !0
            }
            if (!x(b)) return !1;
            if ((d = a.length) == b.length) {
                for (e = 0; d > e; e++)
                    if (!K(a[e], b[e])) return !1;
                return !0
            }
        }
        return !1
    }

    function L() {
        return b.securityPolicy && b.securityPolicy.isActive || b.querySelector && !(!b.querySelector("[ng-csp]") && !b.querySelector("[data-ng-csp]"))
    }

    function M(a, b, c) {
        return a.concat(oc.call(b, c))
    }

    function N(a, b) {
        return oc.call(a, b || 0)
    }

    function O(a, b) {
        var c = arguments.length > 2 ? N(arguments, 2) : [];
        return !y(b) || b instanceof RegExp ? b : c.length ? function() {
            return arguments.length ? b.apply(a, c.concat(oc.call(arguments, 0))) : b.apply(a, c)
        } : function() {
            return arguments.length ? b.apply(a, arguments) : b.call(a)
        }
    }

    function P(a, d) {
        var e = d;
        return "string" == typeof a && "$" === a.charAt(0) ? e = c : A(d) ? e = "$WINDOW" : d && b === d ? e = "$DOCUMENT" : B(d) && (e = "$SCOPE"), e
    }

    function Q(a, b) {
        return "undefined" == typeof a ? c : JSON.stringify(a, P, b ? "  " : null)
    }

    function R(a) {
        return u(a) ? JSON.parse(a) : a
    }

    function S(a) {
        if ("function" == typeof a) a = !0;
        else if (a && 0 !== a.length) {
            var b = fc("" + a);
            a = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)
        } else a = !1;
        return a
    }

    function T(a) {
        a = kc(a).clone();
        try {
            a.empty()
        } catch (b) {}
        var c = 3,
            d = kc("<div>").append(a).html();
        try {
            return a[0].nodeType === c ? fc(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + fc(b)
            })
        } catch (b) {
            return fc(d)
        }
    }

    function U(a) {
        try {
            return decodeURIComponent(a)
        } catch (b) {}
    }

    function V(a) {
        var b, c, d = {};
        return f((a || "").split("&"), function(a) {
            if (a && (b = a.split("="), c = U(b[0]), s(c))) {
                var e = s(b[1]) ? U(b[1]) : !0;
                d[c] ? x(d[c]) ? d[c].push(e) : d[c] = [d[c], e] : d[c] = e
            }
        }), d
    }

    function W(a) {
        var b = [];
        return f(a, function(a, c) {
            x(a) ? f(a, function(a) {
                b.push(Y(c, !0) + (a === !0 ? "" : "=" + Y(a, !0)))
            }) : b.push(Y(c, !0) + (a === !0 ? "" : "=" + Y(a, !0)))
        }), b.length ? b.join("&") : ""
    }

    function X(a) {
        return Y(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function Y(a, b) {
        return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20" : "+")
    }

    function Z(a, c) {
        function d(a) {
            a && h.push(a)
        }
        var e, g, h = [a],
            i = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"],
            j = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        f(i, function(c) {
            i[c] = !0, d(b.getElementById(c)), c = c.replace(":", "\\:"), a.querySelectorAll && (f(a.querySelectorAll("." + c), d), f(a.querySelectorAll("." + c + "\\:"), d), f(a.querySelectorAll("[" + c + "]"), d))
        }), f(h, function(a) {
            if (!e) {
                var b = " " + a.className + " ",
                    c = j.exec(b);
                c ? (e = a, g = (c[2] || "").replace(/\s+/g, ",")) : f(a.attributes, function(b) {
                    !e && i[b.name] && (e = a, g = b.value)
                })
            }
        }), e && c(e, g ? [g] : [])
    }

    function $(c, d) {
        var e = function() {
                if (c = kc(c), c.injector()) {
                    var a = c[0] === b ? "document" : T(c);
                    throw rc("btstrpd", "App Already Bootstrapped with this Element '{0}'", a)
                }
                d = d || [], d.unshift(["$provide", function(a) {
                    a.value("$rootElement", c)
                }]), d.unshift("ng");
                var e = Ea(d);
                return e.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate", function(a, b, c, d, e) {
                    a.$apply(function() {
                        b.data("$injector", d), c(b)(a)
                    })
                }]), e
            },
            g = /^NG_DEFER_BOOTSTRAP!/;
        return a && !g.test(a.name) ? e() : (a.name = a.name.replace(g, ""), void(sc.resumeBootstrap = function(a) {
            f(a, function(a) {
                d.push(a)
            }), e()
        }))
    }

    function _(a, b) {
        return b = b || "_", a.replace(vc, function(a, c) {
            return (c ? b : "") + a.toLowerCase()
        })
    }

    function aa() {
        lc = a.jQuery, lc ? (kc = lc, l(lc.fn, {
            scope: Fc.scope,
            isolateScope: Fc.isolateScope,
            controller: Fc.controller,
            injector: Fc.injector,
            inheritedData: Fc.inheritedData
        }), ka("remove", !0, !0, !1), ka("empty", !1, !1, !1), ka("html", !1, !1, !0)) : kc = la, sc.element = kc
    }

    function ba(a, b, c) {
        if (!a) throw rc("areq", "Argument '{0}' is {1}", b || "?", c || "required");
        return a
    }

    function ca(a, b, c) {
        return c && x(a) && (a = a[a.length - 1]), ba(y(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), a
    }

    function da(a, b) {
        if ("hasOwnProperty" === a) throw rc("badname", "hasOwnProperty is not a valid {0} name", b)
    }

    function ea(a, b, c) {
        if (!b) return a;
        for (var d, e = b.split("."), f = a, g = e.length, h = 0; g > h; h++) d = e[h], a && (a = (f = a)[d]);
        return !c && y(a) ? O(f, a) : a
    }

    function fa(a) {
        var b = a[0],
            c = a[a.length - 1];
        if (b === c) return kc(b);
        var d = b,
            e = [d];
        do {
            if (d = d.nextSibling, !d) break;
            e.push(d)
        } while (d !== c);
        return kc(e)
    }

    function ga(a) {
        function b(a, b, c) {
            return a[b] || (a[b] = c())
        }
        var c = d("$injector"),
            e = d("ng"),
            f = b(a, "angular", Object);
        return f.$$minErr = f.$$minErr || d, b(f, "module", function() {
            var a = {};
            return function(d, f, g) {
                var h = function(a, b) {
                    if ("hasOwnProperty" === a) throw e("badname", "hasOwnProperty is not a valid {0} name", b)
                };
                return h(d, "module"), f && a.hasOwnProperty(d) && (a[d] = null), b(a, d, function() {
                    function a(a, c, d) {
                        return function() {
                            return b[d || "push"]([a, c, arguments]), i
                        }
                    }
                    if (!f) throw c("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", d);
                    var b = [],
                        e = [],
                        h = a("$injector", "invoke"),
                        i = {
                            _invokeQueue: b,
                            _runBlocks: e,
                            requires: f,
                            name: d,
                            provider: a("$provide", "provider"),
                            factory: a("$provide", "factory"),
                            service: a("$provide", "service"),
                            value: a("$provide", "value"),
                            constant: a("$provide", "constant", "unshift"),
                            animation: a("$animateProvider", "register"),
                            filter: a("$filterProvider", "register"),
                            controller: a("$controllerProvider", "register"),
                            directive: a("$compileProvider", "directive"),
                            config: h,
                            run: function(a) {
                                return e.push(a), this
                            }
                        };
                    return g && h(g), i
                })
            }
        })
    }

    function ha(b) {
        l(b, {
            bootstrap: $,
            copy: I,
            extend: l,
            equals: K,
            element: kc,
            forEach: f,
            injector: Ea,
            noop: o,
            bind: O,
            toJson: Q,
            fromJson: R,
            identity: p,
            isUndefined: r,
            isDefined: s,
            isString: u,
            isFunction: y,
            isObject: t,
            isNumber: v,
            isElement: D,
            isArray: x,
            version: wc,
            isDate: w,
            lowercase: fc,
            uppercase: gc,
            callbacks: {
                counter: 0
            },
            $$minErr: d,
            $$csp: L
        }), mc = ga(a);
        try {
            mc("ngLocale")
        } catch (c) {
            mc("ngLocale", []).provider("$locale", $a)
        }
        mc("ng", ["ngLocale"], ["$provide", function(a) {
            a.provider({
                $$sanitizeUri: yb
            }), a.provider("$compile", Ka).directive({
                a: ld,
                input: vd,
                textarea: vd,
                form: pd,
                script: ce,
                select: fe,
                style: he,
                option: ge,
                ngBind: Hd,
                ngBindHtml: Jd,
                ngBindTemplate: Id,
                ngClass: Kd,
                ngClassEven: Md,
                ngClassOdd: Ld,
                ngCloak: Nd,
                ngController: Od,
                ngForm: qd,
                ngHide: Yd,
                ngIf: Qd,
                ngInclude: Rd,
                ngInit: Td,
                ngNonBindable: Ud,
                ngPluralize: Vd,
                ngRepeat: Wd,
                ngShow: Xd,
                ngStyle: Zd,
                ngSwitch: $d,
                ngSwitchWhen: _d,
                ngSwitchDefault: ae,
                ngOptions: ee,
                ngTransclude: be,
                ngModel: Bd,
                ngList: Ed,
                ngChange: Cd,
                required: Dd,
                ngRequired: Dd,
                ngValue: Gd
            }).directive({
                ngInclude: Sd
            }).directive(md).directive(Pd), a.provider({
                $anchorScroll: Fa,
                $animate: Oc,
                $browser: Ha,
                $cacheFactory: Ia,
                $controller: Na,
                $document: Oa,
                $exceptionHandler: Pa,
                $filter: Jb,
                $interpolate: Ya,
                $interval: Za,
                $http: Ua,
                $httpBackend: Wa,
                $location: lb,
                $log: mb,
                $parse: ub,
                $rootScope: xb,
                $q: vb,
                $sce: Db,
                $sceDelegate: Cb,
                $sniffer: Eb,
                $templateCache: Ja,
                $timeout: Fb,
                $window: Ib
            })
        }])
    }

    function ia() {
        return ++zc
    }

    function ja(a) {
        return a.replace(Cc, function(a, b, c, d) {
            return d ? c.toUpperCase() : c
        }).replace(Dc, "Moz$1")
    }

    function ka(a, b, c, d) {
        function e(a) {
            var e, g, h, i, j, k, l, m = c && a ? [this.filter(a)] : [this],
                n = b;
            if (!d || null != a)
                for (; m.length;)
                    for (e = m.shift(), g = 0, h = e.length; h > g; g++)
                        for (i = kc(e[g]), n ? i.triggerHandler("$destroy") : n = !n, j = 0, k = (l = i.children()).length; k > j; j++) m.push(lc(l[j]));
            return f.apply(this, arguments)
        }
        var f = lc.fn[a];
        f = f.$original || f, e.$original = f, lc.fn[a] = e
    }

    function la(a) {
        if (a instanceof la) return a;
        if (!(this instanceof la)) {
            if (u(a) && "<" != a.charAt(0)) throw Ec("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new la(a)
        }
        if (u(a)) {
            var c = b.createElement("div");
            c.innerHTML = "<div>&#160;</div>" + a, c.removeChild(c.firstChild), va(this, c.childNodes);
            var d = kc(b.createDocumentFragment());
            d.append(this)
        } else va(this, a)
    }

    function ma(a) {
        return a.cloneNode(!0)
    }

    function na(a) {
        pa(a);
        for (var b = 0, c = a.childNodes || []; b < c.length; b++) na(c[b])
    }

    function oa(a, b, c, d) {
        if (s(d)) throw Ec("offargs", "jqLite#off() does not support the `selector` argument");
        var e = qa(a, "events"),
            g = qa(a, "handle");
        g && (r(b) ? f(e, function(b, c) {
            Bc(a, c, b), delete e[c]
        }) : f(b.split(" "), function(b) {
            r(c) ? (Bc(a, b, e[b]), delete e[b]) : H(e[b] || [], c)
        }))
    }

    function pa(a, b) {
        var d = a[yc],
            e = xc[d];
        if (e) {
            if (b) return void delete xc[d].data[b];
            e.handle && (e.events.$destroy && e.handle({}, "$destroy"), oa(a)), delete xc[d], a[yc] = c
        }
    }

    function qa(a, b, c) {
        var d = a[yc],
            e = xc[d || -1];
        return s(c) ? (e || (a[yc] = d = ia(), e = xc[d] = {}), void(e[b] = c)) : e && e[b]
    }

    function ra(a, b, c) {
        var d = qa(a, "data"),
            e = s(c),
            f = !e && s(b),
            g = f && !t(b);
        if (d || g || qa(a, "data", d = {}), e) d[b] = c;
        else {
            if (!f) return d;
            if (g) return d && d[b];
            l(d, b)
        }
    }

    function sa(a, b) {
        return a.getAttribute ? (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") > -1 : !1
    }

    function ta(a, b) {
        b && a.setAttribute && f(b.split(" "), function(b) {
            a.setAttribute("class", uc((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + uc(b) + " ", " ")))
        })
    }

    function ua(a, b) {
        if (b && a.setAttribute) {
            var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            f(b.split(" "), function(a) {
                a = uc(a), -1 === c.indexOf(" " + a + " ") && (c += a + " ")
            }), a.setAttribute("class", uc(c))
        }
    }

    function va(a, b) {
        if (b) {
            b = b.nodeName || !s(b.length) || A(b) ? [b] : b;
            for (var c = 0; c < b.length; c++) a.push(b[c])
        }
    }

    function wa(a, b) {
        return xa(a, "$" + (b || "ngController") + "Controller")
    }

    function xa(a, b, d) {
        a = kc(a), 9 == a[0].nodeType && (a = a.find("html"));
        for (var e = x(b) ? b : [b]; a.length;) {
            for (var f = 0, g = e.length; g > f; f++)
                if ((d = a.data(e[f])) !== c) return d;
            a = a.parent()
        }
    }

    function ya(a) {
        for (var b = 0, c = a.childNodes; b < c.length; b++) na(c[b]);
        for (; a.firstChild;) a.removeChild(a.firstChild)
    }

    function za(a, b) {
        var c = Gc[b.toLowerCase()];
        return c && Hc[a.nodeName] && c
    }

    function Aa(a, c) {
        var d = function(d, e) {
            if (d.preventDefault || (d.preventDefault = function() {
                    d.returnValue = !1
                }), d.stopPropagation || (d.stopPropagation = function() {
                    d.cancelBubble = !0
                }), d.target || (d.target = d.srcElement || b), r(d.defaultPrevented)) {
                var g = d.preventDefault;
                d.preventDefault = function() {
                    d.defaultPrevented = !0, g.call(d)
                }, d.defaultPrevented = !1
            }
            d.isDefaultPrevented = function() {
                return d.defaultPrevented || d.returnValue === !1
            };
            var h = J(c[e || d.type] || []);
            f(h, function(b) {
                b.call(a, d)
            }), 8 >= jc ? (d.preventDefault = null, d.stopPropagation = null, d.isDefaultPrevented = null) : (delete d.preventDefault, delete d.stopPropagation, delete d.isDefaultPrevented)
        };
        return d.elem = a, d
    }

    function Ba(a) {
        var b, d = typeof a;
        return "object" == d && null !== a ? "function" == typeof(b = a.$$hashKey) ? b = a.$$hashKey() : b === c && (b = a.$$hashKey = j()) : b = a, d + ":" + b
    }

    function Ca(a) {
        f(a, this.put, this)
    }

    function Da(a) {
        var b, c, d, e;
        return "function" == typeof a ? (b = a.$inject) || (b = [], a.length && (c = a.toString().replace(Lc, ""), d = c.match(Ic), f(d[1].split(Jc), function(a) {
            a.replace(Kc, function(a, c, d) {
                b.push(d)
            })
        })), a.$inject = b) : x(a) ? (e = a.length - 1, ca(a[e], "fn"), b = a.slice(0, e)) : ca(a, "fn", !0), b
    }

    function Ea(a) {
        function b(a) {
            return function(b, c) {
                return t(b) ? void f(b, i(a)) : a(b, c)
            }
        }

        function c(a, b) {
            if (da(a, "service"), (y(b) || x(b)) && (b = v.instantiate(b)), !b.$get) throw Mc("pget", "Provider '{0}' must define $get factory method.", a);
            return s[a + n] = b
        }

        function d(a, b) {
            return c(a, {
                $get: b
            })
        }

        function e(a, b) {
            return d(a, ["$injector", function(a) {
                return a.instantiate(b)
            }])
        }

        function g(a, b) {
            return d(a, q(b))
        }

        function h(a, b) {
            da(a, "constant"), s[a] = b, w[a] = b
        }

        function j(a, b) {
            var c = v.get(a + n),
                d = c.$get;
            c.$get = function() {
                var a = z.invoke(d, c);
                return z.invoke(b, null, {
                    $delegate: a
                })
            }
        }

        function k(a) {
            var b, c, d, e, g = [];
            return f(a, function(a) {
                if (!r.get(a)) {
                    r.put(a, !0);
                    try {
                        if (u(a))
                            for (b = mc(a), g = g.concat(k(b.requires)).concat(b._runBlocks), c = b._invokeQueue, d = 0, e = c.length; e > d; d++) {
                                var f = c[d],
                                    h = v.get(f[0]);
                                h[f[1]].apply(h, f[2])
                            } else y(a) ? g.push(v.invoke(a)) : x(a) ? g.push(v.invoke(a)) : ca(a, "module")
                    } catch (i) {
                        throw x(a) && (a = a[a.length - 1]), i.message && i.stack && -1 == i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack), Mc("modulerr", "Failed to instantiate module {0} due to:\n{1}", a, i.stack || i.message || i)
                    }
                }
            }), g
        }

        function l(a, b) {
            function c(c) {
                if (a.hasOwnProperty(c)) {
                    if (a[c] === m) throw Mc("cdep", "Circular dependency found: {0}", p.join(" <- "));
                    return a[c]
                }
                try {
                    return p.unshift(c), a[c] = m, a[c] = b(c)
                } catch (d) {
                    throw a[c] === m && delete a[c], d
                } finally {
                    p.shift()
                }
            }

            function d(a, b, d) {
                var e, f, g, h = [],
                    i = Da(a);
                for (f = 0, e = i.length; e > f; f++) {
                    if (g = i[f], "string" != typeof g) throw Mc("itkn", "Incorrect injection token! Expected service name as string, got {0}", g);
                    h.push(d && d.hasOwnProperty(g) ? d[g] : c(g))
                }
                return a.$inject || (a = a[e]), a.apply(b, h)
            }

            function e(a, b) {
                var c, e, f = function() {};
                return f.prototype = (x(a) ? a[a.length - 1] : a).prototype, c = new f, e = d(a, c, b), t(e) || y(e) ? e : c
            }
            return {
                invoke: d,
                instantiate: e,
                get: c,
                annotate: Da,
                has: function(b) {
                    return s.hasOwnProperty(b + n) || a.hasOwnProperty(b)
                }
            }
        }
        var m = {},
            n = "Provider",
            p = [],
            r = new Ca,
            s = {
                $provide: {
                    provider: b(c),
                    factory: b(d),
                    service: b(e),
                    value: b(g),
                    constant: b(h),
                    decorator: j
                }
            },
            v = s.$injector = l(s, function() {
                throw Mc("unpr", "Unknown provider: {0}", p.join(" <- "))
            }),
            w = {},
            z = w.$injector = l(w, function(a) {
                var b = v.get(a + n);
                return z.invoke(b.$get, b)
            });
        return f(k(a), function(a) {
            z.invoke(a || o)
        }), z
    }

    function Fa() {
        var a = !0;
        this.disableAutoScrolling = function() {
            a = !1
        }, this.$get = ["$window", "$location", "$rootScope", function(b, c, d) {
            function e(a) {
                var b = null;
                return f(a, function(a) {
                    b || "a" !== fc(a.nodeName) || (b = a)
                }), b
            }

            function g() {
                var a, d = c.hash();
                d ? (a = h.getElementById(d)) ? a.scrollIntoView() : (a = e(h.getElementsByName(d))) ? a.scrollIntoView() : "top" === d && b.scrollTo(0, 0) : b.scrollTo(0, 0)
            }
            var h = b.document;
            return a && d.$watch(function() {
                return c.hash()
            }, function() {
                d.$evalAsync(g)
            }), g
        }]
    }

    function Ga(a, b, d, e) {
        function g(a) {
            try {
                a.apply(null, N(arguments, 1))
            } finally {
                if (s--, 0 === s)
                    for (; t.length;) try {
                        t.pop()()
                    } catch (b) {
                        d.error(b)
                    }
            }
        }

        function h(a, b) {
            ! function c() {
                f(w, function(a) {
                    a()
                }), v = b(c, a)
            }()
        }

        function i() {
            z = null, x != j.url() && (x = j.url(), f(A, function(a) {
                a(j.url())
            }))
        }
        var j = this,
            k = b[0],
            l = a.location,
            m = a.history,
            n = a.setTimeout,
            p = a.clearTimeout,
            q = {};
        j.isMock = !1;
        var s = 0,
            t = [];
        j.$$completeOutstandingRequest = g, j.$$incOutstandingRequestCount = function() {
            s++
        }, j.notifyWhenNoOutstandingRequests = function(a) {
            f(w, function(a) {
                a()
            }), 0 === s ? a() : t.push(a)
        };
        var v, w = [];
        j.addPollFn = function(a) {
            return r(v) && h(100, n), w.push(a), a
        };
        var x = l.href,
            y = b.find("base"),
            z = null;
        j.url = function(b, c) {
            if (l !== a.location && (l = a.location), m !== a.history && (m = a.history), b) {
                if (x == b) return;
                return x = b, e.history ? c ? m.replaceState(null, "", b) : (m.pushState(null, "", b), y.attr("href", y.attr("href"))) : (z = b, c ? l.replace(b) : l.href = b), j
            }
            return z || l.href.replace(/%27/g, "'")
        };
        var A = [],
            B = !1;
        j.onUrlChange = function(b) {
            return B || (e.history && kc(a).on("popstate", i), e.hashchange ? kc(a).on("hashchange", i) : j.addPollFn(i), B = !0), A.push(b), b
        }, j.baseHref = function() {
            var a = y.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        };
        var C = {},
            D = "",
            E = j.baseHref();
        j.cookies = function(a, b) {
            var e, f, g, h, i;
            if (!a) {
                if (k.cookie !== D)
                    for (D = k.cookie, f = D.split("; "), C = {}, h = 0; h < f.length; h++) g = f[h], i = g.indexOf("="), i > 0 && (a = unescape(g.substring(0, i)), C[a] === c && (C[a] = unescape(g.substring(i + 1))));

                return C
            }
            b === c ? k.cookie = escape(a) + "=;path=" + E + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : u(b) && (e = (k.cookie = escape(a) + "=" + escape(b) + ";path=" + E).length + 1, e > 4096 && d.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + e + " > 4096 bytes)!"))
        }, j.defer = function(a, b) {
            var c;
            return s++, c = n(function() {
                delete q[c], g(a)
            }, b || 0), q[c] = !0, c
        }, j.defer.cancel = function(a) {
            return q[a] ? (delete q[a], p(a), g(o), !0) : !1
        }
    }

    function Ha() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function(a, b, c, d) {
            return new Ga(a, d, b, c)
        }]
    }

    function Ia() {
        this.$get = function() {
            function a(a, c) {
                function e(a) {
                    a != m && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, m), m = a, m.n = null)
                }

                function f(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a))
                }
                if (a in b) throw d("$cacheFactory")("iid", "CacheId '{0}' is already taken!", a);
                var g = 0,
                    h = l({}, c, {
                        id: a
                    }),
                    i = {},
                    j = c && c.capacity || Number.MAX_VALUE,
                    k = {},
                    m = null,
                    n = null;
                return b[a] = {
                    put: function(a, b) {
                        var c = k[a] || (k[a] = {
                            key: a
                        });
                        return e(c), r(b) ? void 0 : (a in i || g++, i[a] = b, g > j && this.remove(n.key), b)
                    },
                    get: function(a) {
                        var b = k[a];
                        if (b) return e(b), i[a]
                    },
                    remove: function(a) {
                        var b = k[a];
                        b && (b == m && (m = b.p), b == n && (n = b.n), f(b.n, b.p), delete k[a], delete i[a], g--)
                    },
                    removeAll: function() {
                        i = {}, g = 0, k = {}, m = n = null
                    },
                    destroy: function() {
                        i = null, h = null, k = null, delete b[a]
                    },
                    info: function() {
                        return l({}, h, {
                            size: g
                        })
                    }
                }
            }
            var b = {};
            return a.info = function() {
                var a = {};
                return f(b, function(b, c) {
                    a[c] = b.info()
                }), a
            }, a.get = function(a) {
                return b[a]
            }, a
        }
    }

    function Ja() {
        this.$get = ["$cacheFactory", function(a) {
            return a("templates")
        }]
    }

    function Ka(a, d) {
        var e = {},
            g = "Directive",
            h = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,
            j = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/,
            k = /^(on[a-z]+|formaction)$/;
        this.directive = function m(b, c) {
            return da(b, "directive"), u(b) ? (ba(c, "directiveFactory"), e.hasOwnProperty(b) || (e[b] = [], a.factory(b + g, ["$injector", "$exceptionHandler", function(a, c) {
                var d = [];
                return f(e[b], function(e, f) {
                    try {
                        var g = a.invoke(e);
                        y(g) ? g = {
                            compile: q(g)
                        } : !g.compile && g.link && (g.compile = q(g.link)), g.priority = g.priority || 0, g.index = f, g.name = g.name || b, g.require = g.require || g.controller && g.name, g.restrict = g.restrict || "A", d.push(g)
                    } catch (h) {
                        c(h)
                    }
                }), d
            }])), e[b].push(c)) : f(b, i(m)), this
        }, this.aHrefSanitizationWhitelist = function(a) {
            return s(a) ? (d.aHrefSanitizationWhitelist(a), this) : d.aHrefSanitizationWhitelist()
        }, this.imgSrcSanitizationWhitelist = function(a) {
            return s(a) ? (d.imgSrcSanitizationWhitelist(a), this) : d.imgSrcSanitizationWhitelist()
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, d, i, m, o, r, s, v, w, z, A, B) {
            function C(a, b, c, d, e) {
                a instanceof kc || (a = kc(a)), f(a, function(b, c) {
                    3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = b = kc(b).wrap("<span></span>").parent()[0])
                });
                var g = E(a, b, a, c, d, e);
                return D(a, "ng-scope"),
                    function(b, c, d) {
                        ba(b, "scope");
                        var e = c ? Fc.clone.call(a) : a;
                        f(d, function(a, b) {
                            e.data("$" + b + "Controller", a)
                        });
                        for (var h = 0, i = e.length; i > h; h++) {
                            var j = e[h],
                                k = j.nodeType;
                            (1 === k || 9 === k) && e.eq(h).data("$scope", b)
                        }
                        return c && c(e, b), g && g(b, e, e), e
                    }
            }

            function D(a, b) {
                try {
                    a.addClass(b)
                } catch (c) {}
            }

            function E(a, b, d, e, f, g) {
                function h(a, d, e, f) {
                    var g, h, i, j, k, l, m, n, p, q = d.length,
                        r = new Array(q);
                    for (m = 0; q > m; m++) r[m] = d[m];
                    for (m = 0, p = 0, n = o.length; n > m; p++) i = r[p], g = o[m++], h = o[m++], j = kc(i), g ? (g.scope ? (k = a.$new(), j.data("$scope", k)) : k = a, l = g.transclude, l || !f && b ? g(h, k, i, e, F(a, l || b)) : g(h, k, i, e, f)) : h && h(a, i.childNodes, c, f)
                }
                for (var i, j, k, l, m, n, o = [], p = 0; p < a.length; p++) i = new $, j = G(a[p], [], i, 0 === p ? e : c, f), k = j.length ? L(j, a[p], i, b, d, null, [], [], g) : null, k && k.scope && D(kc(a[p]), "ng-scope"), m = k && k.terminal || !(l = a[p].childNodes) || !l.length ? null : E(l, k ? k.transclude : b), o.push(k, m), n = n || k || m, g = null;
                return n ? h : null
            }

            function F(a, b) {
                return function(c, d, e) {
                    var f = !1;
                    c || (c = a.$new(), c.$$transcluded = !0, f = !0);
                    var g = b(c, d, e);
                    return f && g.on("$destroy", O(c, c.$destroy)), g
                }
            }

            function G(a, b, c, d, e) {
                var f, g, i = a.nodeType,
                    k = c.$attr;
                switch (i) {
                    case 1:
                        P(b, La(nc(a).toLowerCase()), "E", d, e);
                        for (var l, m, n, o, p, q = a.attributes, r = 0, s = q && q.length; s > r; r++) {
                            var t = !1,
                                v = !1;
                            if (l = q[r], !jc || jc >= 8 || l.specified) {
                                m = l.name, o = La(m), ea.test(o) && (m = _(o.substr(6), "-"));
                                var w = o.replace(/(Start|End)$/, "");
                                o === w + "Start" && (t = m, v = m.substr(0, m.length - 5) + "end", m = m.substr(0, m.length - 6)), n = La(m.toLowerCase()), k[n] = m, c[n] = p = uc(l.value), za(a, n) && (c[n] = !0), X(a, b, p, n), P(b, n, "A", d, e, t, v)
                            }
                        }
                        if (g = a.className, u(g) && "" !== g)
                            for (; f = j.exec(g);) n = La(f[2]), P(b, n, "C", d, e) && (c[n] = uc(f[3])), g = g.substr(f.index + f[0].length);
                        break;
                    case 3:
                        V(b, a.nodeValue);
                        break;
                    case 8:
                        try {
                            f = h.exec(a.nodeValue), f && (n = La(f[1]), P(b, n, "M", d, e) && (c[n] = uc(f[2])))
                        } catch (x) {}
                }
                return b.sort(S), b
            }

            function H(a, b, c) {
                var d = [],
                    e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a) throw Pc("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", b, c);
                        1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), a = a.nextSibling
                    } while (e > 0)
                } else d.push(a);
                return kc(d)
            }

            function I(a, b, c) {
                return function(d, e, f, g, h) {
                    return e = H(e[0], b, c), a(d, e, f, g, h)
                }
            }

            function L(a, e, g, h, j, k, l, m, n) {
                function o(a, b, c, d) {
                    a && (c && (a = I(a, c, d)), a.require = w.require, (O === w || w.$$isolateScope) && (a = Z(a, {
                        isolateScope: !0
                    })), l.push(a)), b && (c && (b = I(b, c, d)), b.require = w.require, (O === w || w.$$isolateScope) && (b = Z(b, {
                        isolateScope: !0
                    })), m.push(b))
                }

                function p(a, b, c) {
                    var d, e = "data",
                        g = !1;
                    if (u(a)) {
                        for (;
                            "^" == (d = a.charAt(0)) || "?" == d;) a = a.substr(1), "^" == d && (e = "inheritedData"), g = g || "?" == d;
                        if (d = null, c && "data" === e && (d = c[a]), d = d || b[e]("$" + a + "Controller"), !d && !g) throw Pc("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", a, z);
                        return d
                    }
                    return x(a) && (d = [], f(a, function(a) {
                        d.push(p(a, b, c))
                    })), d
                }

                function q(a, b, h, j, k) {
                    function n(a, b) {
                        var d;
                        return arguments.length < 2 && (b = a, a = c), W && (d = z), k(a, b, d)
                    }
                    var o, q, t, u, v, w, x, y, z = {};
                    if (o = e === h ? g : J(g, new $(kc(h), g.$attr)), q = o.$$element, O) {
                        var A = /^\s*([@=&])(\??)\s*(\w*)\s*$/,
                            B = kc(h);
                        x = b.$new(!0), P && P === O.$$originalDirective ? B.data("$isolateScope", x) : B.data("$isolateScopeNoTemplate", x), D(B, "ng-isolate-scope"), f(O.scope, function(a, c) {
                            var e, f, g, h, i = a.match(A) || [],
                                j = i[3] || c,
                                k = "?" == i[2],
                                l = i[1];
                            switch (x.$$isolateBindings[c] = l + j, l) {
                                case "@":
                                    o.$observe(j, function(a) {
                                        x[c] = a
                                    }), o.$$observers[j].$$scope = b, o[j] && (x[c] = d(o[j])(b));
                                    break;
                                case "=":
                                    if (k && !o[j]) return;
                                    f = r(o[j]), h = f.literal ? K : function(a, b) {
                                        return a === b
                                    }, g = f.assign || function() {
                                        throw e = x[c] = f(b), Pc("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", o[j], O.name)
                                    }, e = x[c] = f(b), x.$watch(function() {
                                        var a = f(b);
                                        return h(a, x[c]) || (h(a, e) ? g(b, a = x[c]) : x[c] = a), e = a
                                    }, null, f.literal);
                                    break;
                                case "&":
                                    f = r(o[j]), x[c] = function(a) {
                                        return f(b, a)
                                    };
                                    break;
                                default:
                                    throw Pc("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", O.name, c, a)
                            }
                        })
                    }
                    for (y = k && n, L && f(L, function(a) {
                            var c, d = {
                                $scope: a === O || a.$$isolateScope ? x : b,
                                $element: q,
                                $attrs: o,
                                $transclude: y
                            };
                            w = a.controller, "@" == w && (w = o[a.name]), c = s(w, d), z[a.name] = c, W || q.data("$" + a.name + "Controller", c), a.controllerAs && (d.$scope[a.controllerAs] = c)
                        }), t = 0, u = l.length; u > t; t++) try {
                        v = l[t], v(v.isolateScope ? x : b, q, o, v.require && p(v.require, q, z), y)
                    } catch (C) {
                        i(C, T(q))
                    }
                    var E = b;
                    for (O && (O.template || null === O.templateUrl) && (E = x), a && a(E, h.childNodes, c, k), t = m.length - 1; t >= 0; t--) try {
                        v = m[t], v(v.isolateScope ? x : b, q, o, v.require && p(v.require, q, z), y)
                    } catch (C) {
                        i(C, T(q))
                    }
                }
                n = n || {};
                for (var v, w, z, A, B, E, F = -Number.MAX_VALUE, L = n.controllerDirectives, O = n.newIsolateScopeDirective, P = n.templateDirective, S = n.nonTlbTranscludeDirective, V = !1, W = !1, X = g.$$element = kc(e), _ = k, aa = h, ba = 0, ca = a.length; ca > ba; ba++) {
                    w = a[ba];
                    var ea = w.$$start,
                        fa = w.$$end;
                    if (ea && (X = H(e, ea, fa)), A = c, F > w.priority) break;
                    if ((E = w.scope) && (v = v || w, w.templateUrl || (U("new/isolated scope", O, w, X), t(E) && (O = w))), z = w.name, !w.templateUrl && w.controller && (E = w.controller, L = L || {}, U("'" + z + "' controller", L[z], w, X), L[z] = w), (E = w.transclude) && (V = !0, w.$$tlb || (U("transclusion", S, w, X), S = w), "element" == E ? (W = !0, F = w.priority, A = H(e, ea, fa), X = g.$$element = kc(b.createComment(" " + z + ": " + g[z] + " ")), e = X[0], Y(j, kc(N(A)), e), aa = C(A, h, F, _ && _.name, {
                            nonTlbTranscludeDirective: S
                        })) : (A = kc(ma(e)).contents(), X.empty(), aa = C(A, h))), w.template)
                        if (U("template", P, w, X), P = w, E = y(w.template) ? w.template(X, g) : w.template, E = da(E), w.replace) {
                            if (_ = w, A = kc("<div>" + uc(E) + "</div>").contents(), e = A[0], 1 != A.length || 1 !== e.nodeType) throw Pc("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", z, "");
                            Y(j, X, e);
                            var ga = {
                                    $attr: {}
                                },
                                ha = G(e, [], ga),
                                ia = a.splice(ba + 1, a.length - (ba + 1));
                            O && M(ha), a = a.concat(ha).concat(ia), Q(g, ga), ca = a.length
                        } else X.html(E);
                    if (w.templateUrl) U("template", P, w, X), P = w, w.replace && (_ = w), q = R(a.splice(ba, a.length - ba), X, g, j, aa, l, m, {
                        controllerDirectives: L,
                        newIsolateScopeDirective: O,
                        templateDirective: P,
                        nonTlbTranscludeDirective: S
                    }), ca = a.length;
                    else if (w.compile) try {
                        B = w.compile(X, g, aa), y(B) ? o(null, B, ea, fa) : B && o(B.pre, B.post, ea, fa)
                    } catch (ja) {
                        i(ja, T(X))
                    }
                    w.terminal && (q.terminal = !0, F = Math.max(F, w.priority))
                }
                return q.scope = v && v.scope === !0, q.transclude = V && aa, q
            }

            function M(a) {
                for (var b = 0, c = a.length; c > b; b++) a[b] = n(a[b], {
                    $$isolateScope: !0
                })
            }

            function P(b, d, f, h, j, k, l) {
                if (d === j) return null;
                var m = null;
                if (e.hasOwnProperty(d))
                    for (var o, p = a.get(d + g), q = 0, r = p.length; r > q; q++) try {
                        o = p[q], (h === c || h > o.priority) && -1 != o.restrict.indexOf(f) && (k && (o = n(o, {
                            $$start: k,
                            $$end: l
                        })), b.push(o), m = o)
                    } catch (s) {
                        i(s)
                    }
                return m
            }

            function Q(a, b) {
                var c = b.$attr,
                    d = a.$attr,
                    e = a.$$element;
                f(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
                }), f(b, function(b, f) {
                    "class" == f ? (D(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
                })
            }

            function R(a, b, c, d, e, g, h, i) {
                var j, k, n = [],
                    p = b[0],
                    q = a.shift(),
                    r = l({}, q, {
                        templateUrl: null,
                        transclude: null,
                        replace: null,
                        $$originalDirective: q
                    }),
                    s = y(q.templateUrl) ? q.templateUrl(b, c) : q.templateUrl;
                return b.empty(), m.get(z.getTrustedResourceUrl(s), {
                        cache: o
                    }).success(function(l) {
                        var m, o, u, v;
                        if (l = da(l), q.replace) {
                            if (u = kc("<div>" + uc(l) + "</div>").contents(), m = u[0], 1 != u.length || 1 !== m.nodeType) throw Pc("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", q.name, s);
                            o = {
                                $attr: {}
                            }, Y(d, b, m);
                            var w = G(m, [], o);
                            t(q.scope) && M(w), a = w.concat(a), Q(c, o)
                        } else m = p, b.html(l);
                        for (a.unshift(r), j = L(a, m, c, e, b, q, g, h, i), f(d, function(a, c) {
                                a == m && (d[c] = b[0])
                            }), k = E(b[0].childNodes, e); n.length;) {
                            var x = n.shift(),
                                y = n.shift(),
                                z = n.shift(),
                                A = n.shift(),
                                B = b[0];
                            y !== p && (B = ma(m), Y(z, kc(y), B)), v = j.transclude ? F(x, j.transclude) : A, j(k, x, B, d, v)
                        }
                        n = null
                    }).error(function(a, b, c, d) {
                        throw Pc("tpload", "Failed to load template: {0}", d.url)
                    }),
                    function(a, b, c, d, e) {
                        n ? (n.push(b), n.push(c), n.push(d), n.push(e)) : j(k, b, c, d, e)
                    }
            }

            function S(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
            }

            function U(a, b, c, d) {
                if (b) throw Pc("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", b.name, c.name, a, T(d))
            }

            function V(a, b) {
                var c = d(b, !0);
                c && a.push({
                    priority: 0,
                    compile: q(function(a, b) {
                        var d = b.parent(),
                            e = d.data("$binding") || [];
                        e.push(c), D(d.data("$binding", e), "ng-binding"), a.$watch(c, function(a) {
                            b[0].nodeValue = a
                        })
                    })
                })
            }

            function W(a, b) {
                if ("srcdoc" == b) return z.HTML;
                var c = nc(a);
                return "xlinkHref" == b || "FORM" == c && "action" == b || "IMG" != c && ("src" == b || "ngSrc" == b) ? z.RESOURCE_URL : void 0
            }

            function X(a, b, c, e) {
                var f = d(c, !0);
                if (f) {
                    if ("multiple" === e && "SELECT" === nc(a)) throw Pc("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", T(a));
                    b.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(b, c, g) {
                                    var h = g.$$observers || (g.$$observers = {});
                                    if (k.test(e)) throw Pc("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                    f = d(g[e], !0, W(a, e)), f && (g[e] = f(b), (h[e] || (h[e] = [])).$$inter = !0, (g.$$observers && g.$$observers[e].$$scope || b).$watch(f, function(a, b) {
                                        "class" === e && a != b ? g.$updateClass(a, b) : g.$set(e, a)
                                    }))
                                }
                            }
                        }
                    })
                }
            }

            function Y(a, c, d) {
                var e, f, g = c[0],
                    h = c.length,
                    i = g.parentNode;
                if (a)
                    for (e = 0, f = a.length; f > e; e++)
                        if (a[e] == g) {
                            a[e++] = d;
                            for (var j = e, k = j + h - 1, l = a.length; l > j; j++, k++) l > k ? a[j] = a[k] : delete a[j];
                            a.length -= h - 1;
                            break
                        }
                i && i.replaceChild(d, g);
                var m = b.createDocumentFragment();
                m.appendChild(g), d[kc.expando] = g[kc.expando];
                for (var n = 1, o = c.length; o > n; n++) {
                    var p = c[n];
                    kc(p).remove(), m.appendChild(p), delete c[n]
                }
                c[0] = d, c.length = 1
            }

            function Z(a, b) {
                return l(function() {
                    return a.apply(null, arguments)
                }, a, b)
            }
            var $ = function(a, b) {
                this.$$element = a, this.$attr = b || {}
            };
            $.prototype = {
                $normalize: La,
                $addClass: function(a) {
                    a && a.length > 0 && A.addClass(this.$$element, a)
                },
                $removeClass: function(a) {
                    a && a.length > 0 && A.removeClass(this.$$element, a)
                },
                $updateClass: function(a, b) {
                    this.$removeClass(Ma(b, a)), this.$addClass(Ma(a, b))
                },
                $set: function(a, b, d, e) {
                    var g, h = za(this.$$element[0], a);
                    h && (this.$$element.prop(a, b), e = h), this[a] = b, e ? this.$attr[a] = e : (e = this.$attr[a], e || (this.$attr[a] = e = _(a, "-"))), g = nc(this.$$element), ("A" === g && "href" === a || "IMG" === g && "src" === a) && (this[a] = b = B(b, "src" === a)), d !== !1 && (null === b || b === c ? this.$$element.removeAttr(e) : this.$$element.attr(e, b));
                    var j = this.$$observers;
                    j && f(j[a], function(a) {
                        try {
                            a(b)
                        } catch (c) {
                            i(c)
                        }
                    })
                },
                $observe: function(a, b) {
                    var c = this,
                        d = c.$$observers || (c.$$observers = {}),
                        e = d[a] || (d[a] = []);
                    return e.push(b), v.$evalAsync(function() {
                        e.$$inter || b(c[a])
                    }), b
                }
            };
            var aa = d.startSymbol(),
                ca = d.endSymbol(),
                da = "{{" == aa || "}}" == ca ? p : function(a) {
                    return a.replace(/\{\{/g, aa).replace(/}}/g, ca)
                },
                ea = /^ngAttr[A-Z]/;
            return C
        }]
    }

    function La(a) {
        return ja(a.replace(Qc, ""))
    }

    function Ma(a, b) {
        var c = "",
            d = a.split(/\s+/),
            e = b.split(/\s+/);
        a: for (var f = 0; f < d.length; f++) {
            for (var g = d[f], h = 0; h < e.length; h++)
                if (g == e[h]) continue a;
            c += (c.length > 0 ? " " : "") + g
        }
        return c
    }

    function Na() {
        var a = {},
            b = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(b, c) {
            da(b, "controller"), t(b) ? l(a, b) : a[b] = c
        }, this.$get = ["$injector", "$window", function(c, e) {
            return function(f, g) {
                var h, i, j, k;
                if (u(f) && (i = f.match(b), j = i[1], k = i[3], f = a.hasOwnProperty(j) ? a[j] : ea(g.$scope, j, !0) || ea(e, j, !0), ca(f, j, !0)), h = c.instantiate(f, g), k) {
                    if (!g || "object" != typeof g.$scope) throw d("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", j || f.name, k);
                    g.$scope[k] = h
                }
                return h
            }
        }]
    }

    function Oa() {
        this.$get = ["$window", function(a) {
            return kc(a.document)
        }]
    }

    function Pa() {
        this.$get = ["$log", function(a) {
            return function(b, c) {
                a.error.apply(a, arguments)
            }
        }]
    }

    function Qa(a) {
        var b, c, d, e = {};
        return a ? (f(a.split("\n"), function(a) {
            d = a.indexOf(":"), b = fc(uc(a.substr(0, d))), c = uc(a.substr(d + 1)), b && (e[b] ? e[b] += ", " + c : e[b] = c)
        }), e) : e
    }

    function Ra(a) {
        var b = t(a) ? a : c;
        return function(c) {
            return b || (b = Qa(a)), c ? b[fc(c)] || null : b
        }
    }

    function Sa(a, b, c) {
        return y(c) ? c(a, b) : (f(c, function(c) {
            a = c(a, b)
        }), a)
    }

    function Ta(a) {
        return a >= 200 && 300 > a
    }

    function Ua() {
        var a = /^\s*(\[|\{[^\{])/,
            b = /[\}\]]\s*$/,
            d = /^\)\]\}',?\n/,
            e = {
                "Content-Type": "application/json;charset=utf-8"
            },
            g = this.defaults = {
                transformResponse: [function(c) {
                    return u(c) && (c = c.replace(d, ""), a.test(c) && b.test(c) && (c = R(c))), c
                }],
                transformRequest: [function(a) {
                    return t(a) && !C(a) ? Q(a) : a
                }],
                headers: {
                    common: {
                        Accept: "application/json, text/plain, */*"
                    },
                    post: I(e),
                    put: I(e),
                    patch: I(e)
                },
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN"
            },
            i = this.interceptors = [],
            j = this.responseInterceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, b, d, e, k, m) {
            function n(a) {
                function d(a) {
                    var b = l({}, a, {
                        data: Sa(a.data, a.headers, h.transformResponse)
                    });
                    return Ta(a.status) ? b : k.reject(b)
                }

                function e(a) {
                    function b(a) {
                        var b;
                        f(a, function(c, d) {
                            y(c) && (b = c(), null != b ? a[d] = b : delete a[d])
                        })
                    }
                    var c, d, e, h = g.headers,
                        i = l({}, a.headers);
                    h = l({}, h.common, h[fc(a.method)]), b(h), b(i);
                    a: for (c in h) {
                        d = fc(c);
                        for (e in i)
                            if (fc(e) === d) continue a;
                        i[c] = h[c]
                    }
                    return i
                }
                var h = {
                        transformRequest: g.transformRequest,
                        transformResponse: g.transformResponse
                    },
                    i = e(a);
                l(h, a), h.headers = i, h.method = gc(h.method);
                var j = Hb(h.url) ? b.cookies()[h.xsrfCookieName || g.xsrfCookieName] : c;
                j && (i[h.xsrfHeaderName || g.xsrfHeaderName] = j);
                var m = function(a) {
                        i = a.headers;
                        var b = Sa(a.data, Ra(i), a.transformRequest);
                        return r(a.data) && f(i, function(a, b) {
                            "content-type" === fc(b) && delete i[b]
                        }), r(a.withCredentials) && !r(g.withCredentials) && (a.withCredentials = g.withCredentials), q(a, b, i).then(d, d)
                    },
                    n = [m, c],
                    o = k.when(h);
                for (f(z, function(a) {
                        (a.request || a.requestError) && n.unshift(a.request, a.requestError), (a.response || a.responseError) && n.push(a.response, a.responseError)
                    }); n.length;) {
                    var p = n.shift(),
                        s = n.shift();
                    o = o.then(p, s)
                }
                return o.success = function(a) {
                    return o.then(function(b) {
                        a(b.data, b.status, b.headers, h)
                    }), o
                }, o.error = function(a) {
                    return o.then(null, function(b) {
                        a(b.data, b.status, b.headers, h)
                    }), o
                }, o
            }

            function o(a) {
                f(arguments, function(a) {
                    n[a] = function(b, c) {
                        return n(l(c || {}, {
                            method: a,
                            url: b
                        }))
                    }
                })
            }

            function p(a) {
                f(arguments, function(a) {
                    n[a] = function(b, c, d) {
                        return n(l(d || {}, {
                            method: a,
                            url: b,
                            data: c
                        }))
                    }
                })
            }

            function q(b, c, d) {
                function f(a, b, c) {
                    j && (Ta(a) ? j.put(p, [a, b, Qa(c)]) : j.remove(p)), h(b, a, c), e.$$phase || e.$apply()
                }

                function h(a, c, d) {
                    c = Math.max(c, 0), (Ta(c) ? m.resolve : m.reject)({
                        data: a,
                        status: c,
                        headers: Ra(d),
                        config: b
                    })
                }

                function i() {
                    var a = G(n.pendingRequests, b); - 1 !== a && n.pendingRequests.splice(a, 1)
                }
                var j, l, m = k.defer(),
                    o = m.promise,
                    p = v(b.url, b.params);
                if (n.pendingRequests.push(b), o.then(i, i), (b.cache || g.cache) && b.cache !== !1 && "GET" == b.method && (j = t(b.cache) ? b.cache : t(g.cache) ? g.cache : w), j)
                    if (l = j.get(p), s(l)) {
                        if (l.then) return l.then(i, i), l;
                        x(l) ? h(l[1], l[0], I(l[2])) : h(l, 200, {})
                    } else j.put(p, o);
                return r(l) && a(b.method, p, c, f, d, b.timeout, b.withCredentials, b.responseType), o
            }

            function v(a, b) {
                if (!b) return a;
                var c = [];
                return h(b, function(a, b) {
                    null === a || r(a) || (x(a) || (a = [a]), f(a, function(a) {
                        t(a) && (a = Q(a)), c.push(Y(b) + "=" + Y(a))
                    }))
                }), a + (-1 == a.indexOf("?") ? "?" : "&") + c.join("&")
            }
            var w = d("$http"),
                z = [];
            return f(i, function(a) {
                z.unshift(u(a) ? m.get(a) : m.invoke(a))
            }), f(j, function(a, b) {
                var c = u(a) ? m.get(a) : m.invoke(a);
                z.splice(b, 0, {
                    response: function(a) {
                        return c(k.when(a))
                    },
                    responseError: function(a) {
                        return c(k.reject(a))
                    }
                })
            }), n.pendingRequests = [], o("get", "delete", "head", "jsonp"), p("post", "put"), n.defaults = g, n
        }]
    }

    function Va(b) {
        return 8 >= jc && "patch" === fc(b) ? new ActiveXObject("Microsoft.XMLHTTP") : new a.XMLHttpRequest
    }

    function Wa() {
        this.$get = ["$browser", "$window", "$document", function(a, b, c) {
            return Xa(a, Va, a.defer, b.angular.callbacks, c[0])
        }]
    }

    function Xa(a, b, c, d, e) {
        function g(a, b) {
            var c = e.createElement("script"),
                d = function() {
                    c.onreadystatechange = c.onload = c.onerror = null, e.body.removeChild(c), b && b()
                };
            return c.type = "text/javascript", c.src = a, jc && 8 >= jc ? c.onreadystatechange = function() {
                /loaded|complete/.test(c.readyState) && d()
            } : c.onload = c.onerror = function() {
                d()
            }, e.body.appendChild(c), d
        }
        var h = -1;
        return function(e, i, j, k, l, m, n, p) {
            function q() {
                t = h, v && v(), w && w.abort()
            }

            function r(b, d, e, f) {
                x && c.cancel(x), v = w = null, d = 0 === d ? e ? 200 : 404 : d, d = 1223 == d ? 204 : d, b(d, e, f), a.$$completeOutstandingRequest(o)
            }
            var t;
            if (a.$$incOutstandingRequestCount(), i = i || a.url(), "jsonp" == fc(e)) {
                var u = "_" + (d.counter++).toString(36);
                d[u] = function(a) {
                    d[u].data = a
                };
                var v = g(i.replace("JSON_CALLBACK", "angular.callbacks." + u), function() {
                    d[u].data ? r(k, 200, d[u].data) : r(k, t || -2), d[u] = sc.noop
                })
            } else {
                var w = b(e);
                w.open(e, i, !0), f(l, function(a, b) {
                    s(a) && w.setRequestHeader(b, a)
                }), w.onreadystatechange = function() {
                    if (w && 4 == w.readyState) {
                        var a = null,
                            b = null;
                        t !== h && (a = w.getAllResponseHeaders(), b = "response" in w ? w.response : w.responseText), r(k, t || w.status, b, a)
                    }
                }, n && (w.withCredentials = !0), p && (w.responseType = p), w.send(j || null)
            }
            if (m > 0) var x = c(q, m);
            else m && m.then && m.then(q)
        }
    }

    function Ya() {
        var a = "{{",
            b = "}}";
        this.startSymbol = function(b) {
            return b ? (a = b, this) : a
        }, this.endSymbol = function(a) {
            return a ? (b = a, this) : b
        }, this.$get = ["$parse", "$exceptionHandler", "$sce", function(c, d, e) {
            function f(f, i, j) {
                for (var k, l, m, n, o = 0, p = [], q = f.length, s = !1, t = []; q > o;) - 1 != (k = f.indexOf(a, o)) && -1 != (l = f.indexOf(b, k + g)) ? (o != k && p.push(f.substring(o, k)), p.push(m = c(n = f.substring(k + g, l))), m.exp = n, o = l + h, s = !0) : (o != q && p.push(f.substring(o)), o = q);
                if ((q = p.length) || (p.push(""), q = 1), j && p.length > 1) throw Rc("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", f);
                return !i || s ? (t.length = q, m = function(a) {
                    try {
                        for (var b, c = 0, g = q; g > c; c++) "function" == typeof(b = p[c]) && (b = b(a), b = j ? e.getTrusted(j, b) : e.valueOf(b), null === b || r(b) ? b = "" : "string" != typeof b && (b = Q(b))), t[c] = b;
                        return t.join("")
                    } catch (h) {
                        var i = Rc("interr", "Can't interpolate: {0}\n{1}", f, h.toString());
                        d(i)
                    }
                }, m.exp = f, m.parts = p, m) : void 0
            }
            var g = a.length,
                h = b.length;
            return f.startSymbol = function() {
                return a
            }, f.endSymbol = function() {
                return b
            }, f
        }]
    }

    function Za() {
        this.$get = ["$rootScope", "$window", "$q", function(a, b, c) {
            function d(d, f, g, h) {
                var i = b.setInterval,
                    j = b.clearInterval,
                    k = c.defer(),
                    l = k.promise,
                    m = 0,
                    n = s(h) && !h;
                return g = s(g) ? g : 0, l.then(null, null, d), l.$$intervalId = i(function() {
                    k.notify(m++), g > 0 && m >= g && (k.resolve(m), j(l.$$intervalId), delete e[l.$$intervalId]), n || a.$apply()
                }, f), e[l.$$intervalId] = k, l
            }
            var e = {};
            return d.cancel = function(a) {
                return a && a.$$intervalId in e ? (e[a.$$intervalId].reject("canceled"), clearInterval(a.$$intervalId), delete e[a.$$intervalId], !0) : !1
            }, d
        }]
    }

    function $a() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "Â¤",
                        posSuf: "",
                        negPre: "(Â¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(a) {
                    return 1 === a ? "one" : "other"
                }
            }
        }
    }

    function _a(a) {
        for (var b = a.split("/"), c = b.length; c--;) b[c] = X(b[c]);
        return b.join("/")
    }

    function ab(a, b, c) {
        var d = Gb(a, c);
        b.$$protocol = d.protocol, b.$$host = d.hostname, b.$$port = m(d.port) || Tc[d.protocol] || null
    }

    function bb(a, b, c) {
        var d = "/" !== a.charAt(0);
        d && (a = "/" + a);
        var e = Gb(a, c);
        b.$$path = decodeURIComponent(d && "/" === e.pathname.charAt(0) ? e.pathname.substring(1) : e.pathname), b.$$search = V(e.search), b.$$hash = decodeURIComponent(e.hash), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
    }

    function cb(a, b) {
        return 0 === b.indexOf(a) ? b.substr(a.length) : void 0
    }

    function db(a) {
        var b = a.indexOf("#");
        return -1 == b ? a : a.substr(0, b)
    }

    function eb(a) {
        return a.substr(0, db(a).lastIndexOf("/") + 1)
    }

    function fb(a) {
        return a.substring(0, a.indexOf("/", a.indexOf("//") + 2))
    }

    function gb(a, b) {
        this.$$html5 = !0, b = b || "";
        var d = eb(a);
        ab(a, this, a), this.$$parse = function(b) {
            var c = cb(d, b);
            if (!u(c)) throw Uc("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', b, d);
            bb(c, this, a), this.$$path || (this.$$path = "/"), this.$$compose()
        }, this.$$compose = function() {
            var a = W(this.$$search),
                b = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = _a(this.$$path) + (a ? "?" + a : "") + b, this.$$absUrl = d + this.$$url.substr(1)
        }, this.$$rewrite = function(e) {
            var f, g;
            return (f = cb(a, e)) !== c ? (g = f, (f = cb(b, f)) !== c ? d + (cb("/", f) || f) : a + g) : (f = cb(d, e)) !== c ? d + f : d == e + "/" ? d : void 0
        }
    }

    function hb(a, b) {
        var c = eb(a);
        ab(a, this, a), this.$$parse = function(d) {
            function e(a, b, c) {
                var d, e = /^\/?.*?:(\/.*)/;
                return 0 === b.indexOf(c) && (b = b.replace(c, "")), e.exec(b) ? a : (d = e.exec(a), d ? d[1] : a)
            }
            var f = cb(a, d) || cb(c, d),
                g = "#" == f.charAt(0) ? cb(b, f) : this.$$html5 ? f : "";
            if (!u(g)) throw Uc("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', d, b);
            bb(g, this, a), this.$$path = e(this.$$path, g, a), this.$$compose()
        }, this.$$compose = function() {
            var c = W(this.$$search),
                d = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = _a(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + (this.$$url ? b + this.$$url : "")
        }, this.$$rewrite = function(b) {
            return db(a) == db(b) ? b : void 0
        }
    }

    function ib(a, b) {
        this.$$html5 = !0, hb.apply(this, arguments);
        var c = eb(a);
        this.$$rewrite = function(d) {
            var e;
            return a == db(d) ? d : (e = cb(c, d)) ? a + b + e : c === d + "/" ? c : void 0
        }
    }

    function jb(a) {
        return function() {
            return this[a]
        }
    }

    function kb(a, b) {
        return function(c) {
            return r(c) ? this[a] : (this[a] = b(c), this.$$compose(), this)
        }
    }

    function lb() {
        var b = "",
            c = !1;
        this.hashPrefix = function(a) {
            return s(a) ? (b = a, this) : b
        }, this.html5Mode = function(a) {
            return s(a) ? (c = a, this) : c
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function(d, e, f, g) {
            function h(a) {
                d.$broadcast("$locationChangeSuccess", i.absUrl(), a)
            }
            var i, j, k, l = e.baseHref(),
                m = e.url();
            c ? (k = fb(m) + (l || "/"), j = f.history ? gb : ib) : (k = db(m), j = hb), i = new j(k, "#" + b), i.$$parse(i.$$rewrite(m)), g.on("click", function(b) {
                if (!b.ctrlKey && !b.metaKey && 2 != b.which) {
                    for (var c = kc(b.target);
                        "a" !== fc(c[0].nodeName);)
                        if (c[0] === g[0] || !(c = c.parent())[0]) return;
                    var f = c.prop("href");
                    t(f) && "[object SVGAnimatedString]" === f.toString() && (f = Gb(f.animVal).href);
                    var h = i.$$rewrite(f);
                    f && !c.attr("target") && h && !b.isDefaultPrevented() && (b.preventDefault(), h != e.url() && (i.$$parse(h), d.$apply(), a.angular["ff-684208-preventDefault"] = !0))
                }
            }), i.absUrl() != m && e.url(i.absUrl(), !0), e.onUrlChange(function(a) {
                i.absUrl() != a && (d.$evalAsync(function() {
                    var b = i.absUrl();
                    i.$$parse(a), d.$broadcast("$locationChangeStart", a, b).defaultPrevented ? (i.$$parse(b), e.url(b)) : h(b)
                }), d.$$phase || d.$digest())
            });
            var n = 0;
            return d.$watch(function() {
                var a = e.url(),
                    b = i.$$replace;
                return n && a == i.absUrl() || (n++, d.$evalAsync(function() {
                    d.$broadcast("$locationChangeStart", i.absUrl(), a).defaultPrevented ? i.$$parse(a) : (e.url(i.absUrl(), b), h(a))
                })), i.$$replace = !1, n
            }), i
        }]
    }

    function mb() {
        var a = !0,
            b = this;
        this.debugEnabled = function(b) {
            return s(b) ? (a = b, this) : a
        }, this.$get = ["$window", function(c) {
            function d(a) {
                return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), a
            }

            function e(a) {
                var b = c.console || {},
                    e = b[a] || b.log || o,
                    g = !1;
                try {
                    g = !!e.apply
                } catch (h) {}
                return g ? function() {
                    var a = [];
                    return f(arguments, function(b) {
                        a.push(d(b))
                    }), e.apply(b, a)
                } : function(a, b) {
                    e(a, null == b ? "" : b)
                }
            }
            return {
                log: e("log"),
                info: e("info"),
                warn: e("warn"),
                error: e("error"),
                debug: function() {
                    var c = e("debug");
                    return function() {
                        a && c.apply(b, arguments)
                    }
                }()
            }
        }]
    }

    function nb(a, b) {
        if ("constructor" === a) throw Wc("isecfld", 'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}', b);
        return a
    }

    function ob(a, b) {
        if (a) {
            if (a.constructor === a) throw Wc("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
            if (a.document && a.location && a.alert && a.setInterval) throw Wc("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", b);
            if (a.children && (a.nodeName || a.on && a.find)) throw Wc("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", b)
        }
        return a
    }

    function pb(a, b, d, e, f) {
        f = f || {};
        for (var g, h = b.split("."), i = 0; h.length > 1; i++) {
            g = nb(h.shift(), e);
            var j = a[g];
            j || (j = {}, a[g] = j), a = j, a.then && f.unwrapPromises && (Vc(e), "$$v" in a || ! function(a) {
                a.then(function(b) {
                    a.$$v = b
                })
            }(a), a.$$v === c && (a.$$v = {}), a = a.$$v)
        }
        return g = nb(h.shift(), e), a[g] = d, d
    }

    function qb(a, b, d, e, f, g, h) {
        return nb(a, g), nb(b, g), nb(d, g), nb(e, g), nb(f, g), h.unwrapPromises ? function(h, i) {
            var j, k = i && i.hasOwnProperty(a) ? i : h;
            return null == k ? k : (k = k[a], k && k.then && (Vc(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
                j.$$v = a
            })), k = k.$$v), b ? null == k ? c : (k = k[b], k && k.then && (Vc(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
                j.$$v = a
            })), k = k.$$v), d ? null == k ? c : (k = k[d], k && k.then && (Vc(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
                j.$$v = a
            })), k = k.$$v), e ? null == k ? c : (k = k[e], k && k.then && (Vc(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
                j.$$v = a
            })), k = k.$$v), f ? null == k ? c : (k = k[f], k && k.then && (Vc(g), "$$v" in k || (j = k, j.$$v = c, j.then(function(a) {
                j.$$v = a
            })), k = k.$$v), k) : k) : k) : k) : k)
        } : function(g, h) {
            var i = h && h.hasOwnProperty(a) ? h : g;
            return null == i ? i : (i = i[a], b ? null == i ? c : (i = i[b], d ? null == i ? c : (i = i[d], e ? null == i ? c : (i = i[e], f ? null == i ? c : i = i[f] : i) : i) : i) : i)
        }
    }

    function rb(a, b) {
        return nb(a, b),
            function(b, d) {
                return null == b ? c : (d && d.hasOwnProperty(a) ? d : b)[a]
            }
    }

    function sb(a, b, d) {
        return nb(a, d), nb(b, d),
            function(d, e) {
                return null == d ? c : (d = (e && e.hasOwnProperty(a) ? e : d)[a], null == d ? c : d[b])
            }
    }

    function tb(a, b, d) {
        if (ad.hasOwnProperty(a)) return ad[a];
        var e, g = a.split("."),
            h = g.length;
        if (b.unwrapPromises || 1 !== h)
            if (b.unwrapPromises || 2 !== h)
                if (b.csp) e = 6 > h ? qb(g[0], g[1], g[2], g[3], g[4], d, b) : function(a, e) {
                    var f, i = 0;
                    do f = qb(g[i++], g[i++], g[i++], g[i++], g[i++], d, b)(a, e), e = c, a = f; while (h > i);
                    return f
                };
                else {
                    var i = "var p;\n";
                    f(g, function(a, c) {
                        nb(a, d), i += "if(s == null) return undefined;\ns=" + (c ? "s" : '((k&&k.hasOwnProperty("' + a + '"))?k:s)') + '["' + a + '"];\n' + (b.unwrapPromises ? 'if (s && s.then) {\n pw("' + d.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "")
                    }), i += "return s;";
                    var j = new Function("s", "k", "pw", i);
                    j.toString = q(i), e = b.unwrapPromises ? function(a, b) {
                        return j(a, b, Vc)
                    } : j
                } else e = sb(g[0], g[1], d);
        else e = rb(g[0], d);
        return "hasOwnProperty" !== a && (ad[a] = e), e
    }

    function ub() {
        var a = {},
            b = {
                csp: !1,
                unwrapPromises: !1,
                logPromiseWarnings: !0
            };
        this.unwrapPromises = function(a) {
            return s(a) ? (b.unwrapPromises = !!a, this) : b.unwrapPromises
        }, this.logPromiseWarnings = function(a) {
            return s(a) ? (b.logPromiseWarnings = a, this) : b.logPromiseWarnings
        }, this.$get = ["$filter", "$sniffer", "$log", function(c, d, e) {
            return b.csp = d.csp, Vc = function(a) {
                    b.logPromiseWarnings && !Xc.hasOwnProperty(a) && (Xc[a] = !0, e.warn("[$parse] Promise found in the expression `" + a + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
                },
                function(d) {
                    var e;
                    switch (typeof d) {
                        case "string":
                            if (a.hasOwnProperty(d)) return a[d];
                            var f = new $c(b),
                                g = new _c(f, c, b);
                            return e = g.parse(d, !1), "hasOwnProperty" !== d && (a[d] = e), e;
                        case "function":
                            return d;
                        default:
                            return o
                    }
                }
        }]
    }

    function vb() {
        this.$get = ["$rootScope", "$exceptionHandler", function(a, b) {
            return wb(function(b) {
                a.$evalAsync(b)
            }, b)
        }]
    }

    function wb(a, b) {
        function d(a) {
            return a
        }

        function e(a) {
            return j(a)
        }

        function g(a) {
            var b = h(),
                c = 0,
                d = x(a) ? [] : {};
            return f(a, function(a, e) {
                c++, i(a).then(function(a) {
                    d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
                }, function(a) {
                    d.hasOwnProperty(e) || b.reject(a)
                })
            }), 0 === c && b.resolve(d), b.promise
        }
        var h = function() {
                var f, g, k = [];
                return g = {
                    resolve: function(b) {
                        if (k) {
                            var d = k;
                            k = c, f = i(b), d.length && a(function() {
                                for (var a, b = 0, c = d.length; c > b; b++) a = d[b], f.then(a[0], a[1], a[2])
                            })
                        }
                    },
                    reject: function(a) {
                        g.resolve(j(a))
                    },
                    notify: function(b) {
                        if (k) {
                            var c = k;
                            k.length && a(function() {
                                for (var a, d = 0, e = c.length; e > d; d++) a = c[d], a[2](b)
                            })
                        }
                    },
                    promise: {
                        then: function(a, c, g) {
                            var i = h(),
                                j = function(c) {
                                    try {
                                        i.resolve((y(a) ? a : d)(c))
                                    } catch (e) {
                                        i.reject(e), b(e)
                                    }
                                },
                                l = function(a) {
                                    try {
                                        i.resolve((y(c) ? c : e)(a))
                                    } catch (d) {
                                        i.reject(d), b(d)
                                    }
                                },
                                m = function(a) {
                                    try {
                                        i.notify((y(g) ? g : d)(a))
                                    } catch (c) {
                                        b(c)
                                    }
                                };
                            return k ? k.push([j, l, m]) : f.then(j, l, m), i.promise
                        },
                        "catch": function(a) {
                            return this.then(null, a)
                        },
                        "finally": function(a) {
                            function b(a, b) {
                                var c = h();
                                return b ? c.resolve(a) : c.reject(a), c.promise
                            }

                            function c(c, e) {
                                var f = null;
                                try {
                                    f = (a || d)()
                                } catch (g) {
                                    return b(g, !1)
                                }
                                return f && y(f.then) ? f.then(function() {
                                    return b(c, e)
                                }, function(a) {
                                    return b(a, !1)
                                }) : b(c, e)
                            }
                            return this.then(function(a) {
                                return c(a, !0)
                            }, function(a) {
                                return c(a, !1)
                            })
                        }
                    }
                }
            },
            i = function(b) {
                return b && y(b.then) ? b : {
                    then: function(c) {
                        var d = h();
                        return a(function() {
                            d.resolve(c(b))
                        }), d.promise
                    }
                }
            },
            j = function(c) {
                return {
                    then: function(d, f) {
                        var g = h();
                        return a(function() {
                            try {
                                g.resolve((y(f) ? f : e)(c))
                            } catch (a) {
                                g.reject(a), b(a)
                            }
                        }), g.promise
                    }
                }
            },
            k = function(c, f, g, k) {
                var l, m = h(),
                    n = function(a) {
                        try {
                            return (y(f) ? f : d)(a)
                        } catch (c) {
                            return b(c), j(c)
                        }
                    },
                    o = function(a) {
                        try {
                            return (y(g) ? g : e)(a)
                        } catch (c) {
                            return b(c), j(c)
                        }
                    },
                    p = function(a) {
                        try {
                            return (y(k) ? k : d)(a)
                        } catch (c) {
                            b(c)
                        }
                    };
                return a(function() {
                    i(c).then(function(a) {
                        l || (l = !0, m.resolve(i(a).then(n, o, p)))
                    }, function(a) {
                        l || (l = !0, m.resolve(o(a)))
                    }, function(a) {
                        l || m.notify(p(a))
                    })
                }), m.promise
            };
        return {
            defer: h,
            reject: j,
            when: k,
            all: g
        }
    }

    function xb() {
        var a = 10,
            b = d("$rootScope"),
            c = null;
        this.digestTtl = function(b) {
            return arguments.length && (a = b), a
        }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function(d, g, h, i) {
            function k() {
                this.$id = j(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$postDigestQueue = [],
                    this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = {}
            }

            function l(a) {
                if (r.$$phase) throw b("inprog", "{0} already in progress", r.$$phase);
                r.$$phase = a
            }

            function m() {
                r.$$phase = null
            }

            function n(a, b) {
                var c = h(a);
                return ca(c, b), c
            }

            function p(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent)
            }

            function q() {}
            k.prototype = {
                constructor: k,
                $new: function(a) {
                    var b, c;
                    return a ? (c = new k, c.$root = this.$root, c.$$asyncQueue = this.$$asyncQueue, c.$$postDigestQueue = this.$$postDigestQueue) : (b = function() {}, b.prototype = this, c = new b, c.$id = j()), c["this"] = c, c.$$listeners = {}, c.$$listenerCount = {}, c.$parent = this, c.$$watchers = c.$$nextSibling = c.$$childHead = c.$$childTail = null, c.$$prevSibling = this.$$childTail, this.$$childHead ? (this.$$childTail.$$nextSibling = c, this.$$childTail = c) : this.$$childHead = this.$$childTail = c, c
                },
                $watch: function(a, b, d) {
                    var e = this,
                        f = n(a, "watch"),
                        g = e.$$watchers,
                        h = {
                            fn: b,
                            last: q,
                            get: f,
                            exp: a,
                            eq: !!d
                        };
                    if (c = null, !y(b)) {
                        var i = n(b || o, "listener");
                        h.fn = function(a, b, c) {
                            i(c)
                        }
                    }
                    if ("string" == typeof a && f.constant) {
                        var j = h.fn;
                        h.fn = function(a, b, c) {
                            j.call(this, a, b, c), H(g, h)
                        }
                    }
                    return g || (g = e.$$watchers = []), g.unshift(h),
                        function() {
                            H(g, h), c = null
                        }
                },
                $watchCollection: function(a, b) {
                    function c() {
                        g = k(i);
                        var a, b;
                        if (t(g))
                            if (e(g)) {
                                f !== l && (f = l, n = f.length = 0, j++), a = g.length, n !== a && (j++, f.length = n = a);
                                for (var c = 0; a > c; c++) f[c] !== g[c] && (j++, f[c] = g[c])
                            } else {
                                f !== m && (f = m = {}, n = 0, j++), a = 0;
                                for (b in g) g.hasOwnProperty(b) && (a++, f.hasOwnProperty(b) ? f[b] !== g[b] && (j++, f[b] = g[b]) : (n++, f[b] = g[b], j++));
                                if (n > a) {
                                    j++;
                                    for (b in f) f.hasOwnProperty(b) && !g.hasOwnProperty(b) && (n--, delete f[b])
                                }
                            } else f !== g && (f = g, j++);
                        return j
                    }

                    function d() {
                        b(g, f, i)
                    }
                    var f, g, i = this,
                        j = 0,
                        k = h(a),
                        l = [],
                        m = {},
                        n = 0;
                    return this.$watch(c, d)
                },
                $digest: function() {
                    var d, e, f, h, i, j, k, n, o, p, r, s = this.$$asyncQueue,
                        t = this.$$postDigestQueue,
                        u = a,
                        v = this,
                        w = [];
                    l("$digest"), c = null;
                    do {
                        for (j = !1, n = v; s.length;) {
                            try {
                                r = s.shift(), r.scope.$eval(r.expression)
                            } catch (x) {
                                m(), g(x)
                            }
                            c = null
                        }
                        a: do {
                            if (h = n.$$watchers)
                                for (i = h.length; i--;) try {
                                    if (d = h[i])
                                        if ((e = d.get(n)) === (f = d.last) || (d.eq ? K(e, f) : "number" == typeof e && "number" == typeof f && isNaN(e) && isNaN(f))) {
                                            if (d === c) {
                                                j = !1;
                                                break a
                                            }
                                        } else j = !0, c = d, d.last = d.eq ? I(e) : e, d.fn(e, f === q ? e : f, n), 5 > u && (o = 4 - u, w[o] || (w[o] = []), p = y(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp, p += "; newVal: " + Q(e) + "; oldVal: " + Q(f), w[o].push(p))
                                } catch (x) {
                                    m(), g(x)
                                }
                            if (!(k = n.$$childHead || n !== v && n.$$nextSibling))
                                for (; n !== v && !(k = n.$$nextSibling);) n = n.$parent
                        } while (n = k);
                        if ((j || s.length) && !u--) throw m(), b("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", a, Q(w))
                    } while (j || s.length);
                    for (m(); t.length;) try {
                        t.shift()()
                    } catch (x) {
                        g(x)
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy"), this.$$destroyed = !0, this !== r && (f(this.$$listenerCount, O(null, p, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null)
                    }
                },
                $eval: function(a, b) {
                    return h(a)(this, b)
                },
                $evalAsync: function(a) {
                    r.$$phase || r.$$asyncQueue.length || i.defer(function() {
                        r.$$asyncQueue.length && r.$digest()
                    }), this.$$asyncQueue.push({
                        scope: this,
                        expression: a
                    })
                },
                $$postDigest: function(a) {
                    this.$$postDigestQueue.push(a)
                },
                $apply: function(a) {
                    try {
                        return l("$apply"), this.$eval(a)
                    } catch (b) {
                        g(b)
                    } finally {
                        m();
                        try {
                            r.$digest()
                        } catch (b) {
                            throw g(b), b
                        }
                    }
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []), c.push(b);
                    var d = this;
                    do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
                    var e = this;
                    return function() {
                        c[G(c, b)] = null, p(e, 1, a)
                    }
                },
                $emit: function(a, b) {
                    var c, d, e, f = [],
                        h = this,
                        i = !1,
                        j = {
                            name: a,
                            targetScope: h,
                            stopPropagation: function() {
                                i = !0
                            },
                            preventDefault: function() {
                                j.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        },
                        k = M([j], arguments, 1);
                    do {
                        for (c = h.$$listeners[a] || f, j.currentScope = h, d = 0, e = c.length; e > d; d++)
                            if (c[d]) try {
                                c[d].apply(null, k)
                            } catch (l) {
                                g(l)
                            } else c.splice(d, 1), d--, e--;
                        if (i) return j;
                        h = h.$parent
                    } while (h);
                    return j
                },
                $broadcast: function(a, b) {
                    for (var c, d, e, f = this, h = f, i = f, j = {
                            name: a,
                            targetScope: f,
                            preventDefault: function() {
                                j.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        }, k = M([j], arguments, 1); h = i;) {
                        for (j.currentScope = h, c = h.$$listeners[a] || [], d = 0, e = c.length; e > d; d++)
                            if (c[d]) try {
                                c[d].apply(null, k)
                            } catch (l) {
                                g(l)
                            } else c.splice(d, 1), d--, e--;
                        if (!(i = h.$$listenerCount[a] && h.$$childHead || h !== f && h.$$nextSibling))
                            for (; h !== f && !(i = h.$$nextSibling);) h = h.$parent
                    }
                    return j
                }
            };
            var r = new k;
            return r
        }]
    }

    function yb() {
        var a = /^\s*(https?|ftp|mailto|tel|file):/,
            b = /^\s*(https?|ftp|file):|data:image\//;
        this.aHrefSanitizationWhitelist = function(b) {
            return s(b) ? (a = b, this) : a
        }, this.imgSrcSanitizationWhitelist = function(a) {
            return s(a) ? (b = a, this) : b
        }, this.$get = function() {
            return function(c, d) {
                var e, f = d ? b : a;
                return jc && !(jc >= 8) || (e = Gb(c).href, "" === e || e.match(f)) ? c : "unsafe:" + e
            }
        }
    }

    function zb(a) {
        return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    }

    function Ab(a) {
        if ("self" === a) return a;
        if (u(a)) {
            if (a.indexOf("***") > -1) throw bd("iwcard", "Illegal sequence *** in string matcher.  String: {0}", a);
            return a = zb(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + a + "$")
        }
        if (z(a)) return new RegExp("^" + a.source + "$");
        throw bd("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
    }

    function Bb(a) {
        var b = [];
        return s(a) && f(a, function(a) {
            b.push(Ab(a))
        }), b
    }

    function Cb() {
        this.SCE_CONTEXTS = cd;
        var a = ["self"],
            b = [];
        this.resourceUrlWhitelist = function(b) {
            return arguments.length && (a = Bb(b)), a
        }, this.resourceUrlBlacklist = function(a) {
            return arguments.length && (b = Bb(a)), b
        }, this.$get = ["$injector", function(d) {
            function e(a, b) {
                return "self" === a ? Hb(b) : !!a.exec(b.href)
            }

            function f(c) {
                var d, f, g = Gb(c.toString()),
                    h = !1;
                for (d = 0, f = a.length; f > d; d++)
                    if (e(a[d], g)) {
                        h = !0;
                        break
                    }
                if (h)
                    for (d = 0, f = b.length; f > d; d++)
                        if (e(b[d], g)) {
                            h = !1;
                            break
                        }
                return h
            }

            function g(a) {
                var b = function(a) {
                    this.$$unwrapTrustedValue = function() {
                        return a
                    }
                };
                return a && (b.prototype = new a), b.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue()
                }, b.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString()
                }, b
            }

            function h(a, b) {
                var d = m.hasOwnProperty(a) ? m[a] : null;
                if (!d) throw bd("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", a, b);
                if (null === b || b === c || "" === b) return b;
                if ("string" != typeof b) throw bd("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", a);
                return new d(b)
            }

            function i(a) {
                return a instanceof l ? a.$$unwrapTrustedValue() : a
            }

            function j(a, b) {
                if (null === b || b === c || "" === b) return b;
                var d = m.hasOwnProperty(a) ? m[a] : null;
                if (d && b instanceof d) return b.$$unwrapTrustedValue();
                if (a === cd.RESOURCE_URL) {
                    if (f(b)) return b;
                    throw bd("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", b.toString())
                }
                if (a === cd.HTML) return k(b);
                throw bd("unsafe", "Attempting to use an unsafe value in a safe context.")
            }
            var k = function(a) {
                throw bd("unsafe", "Attempting to use an unsafe value in a safe context.")
            };
            d.has("$sanitize") && (k = d.get("$sanitize"));
            var l = g(),
                m = {};
            return m[cd.HTML] = g(l), m[cd.CSS] = g(l), m[cd.URL] = g(l), m[cd.JS] = g(l), m[cd.RESOURCE_URL] = g(m[cd.URL]), {
                trustAs: h,
                getTrusted: j,
                valueOf: i
            }
        }]
    }

    function Db() {
        var a = !0;
        this.enabled = function(b) {
            return arguments.length && (a = !!b), a
        }, this.$get = ["$parse", "$sniffer", "$sceDelegate", function(b, c, d) {
            if (a && c.msie && c.msieDocumentMode < 8) throw bd("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            var e = I(cd);
            e.isEnabled = function() {
                return a
            }, e.trustAs = d.trustAs, e.getTrusted = d.getTrusted, e.valueOf = d.valueOf, a || (e.trustAs = e.getTrusted = function(a, b) {
                return b
            }, e.valueOf = p), e.parseAs = function(a, c) {
                var d = b(c);
                return d.literal && d.constant ? d : function(b, c) {
                    return e.getTrusted(a, d(b, c))
                }
            };
            var g = e.parseAs,
                h = e.getTrusted,
                i = e.trustAs;
            return f(cd, function(a, b) {
                var c = fc(b);
                e[ja("parse_as_" + c)] = function(b) {
                    return g(a, b)
                }, e[ja("get_trusted_" + c)] = function(b) {
                    return h(a, b)
                }, e[ja("trust_as_" + c)] = function(b) {
                    return i(a, b)
                }
            }), e
        }]
    }

    function Eb() {
        this.$get = ["$window", "$document", function(a, b) {
            var c, d, e = {},
                f = m((/android (\d+)/.exec(fc((a.navigator || {}).userAgent)) || [])[1]),
                g = /Boxee/i.test((a.navigator || {}).userAgent),
                h = b[0] || {},
                i = h.documentMode,
                j = /^(Moz|webkit|O|ms)(?=[A-Z])/,
                k = h.body && h.body.style,
                l = !1,
                n = !1;
            if (k) {
                for (var o in k)
                    if (d = j.exec(o)) {
                        c = d[0], c = c.substr(0, 1).toUpperCase() + c.substr(1);
                        break
                    }
                c || (c = "WebkitOpacity" in k && "webkit"), l = !!("transition" in k || c + "Transition" in k), n = !!("animation" in k || c + "Animation" in k), !f || l && n || (l = u(h.body.style.webkitTransition), n = u(h.body.style.webkitAnimation))
            }
            return {
                history: !(!a.history || !a.history.pushState || 4 > f || g),
                hashchange: "onhashchange" in a && (!i || i > 7),
                hasEvent: function(a) {
                    if ("input" == a && 9 == jc) return !1;
                    if (r(e[a])) {
                        var b = h.createElement("div");
                        e[a] = "on" + a in b
                    }
                    return e[a]
                },
                csp: L(),
                vendorPrefix: c,
                transitions: l,
                animations: n,
                android: f,
                msie: jc,
                msieDocumentMode: i
            }
        }]
    }

    function Fb() {
        this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function(a, b, c, d) {
            function e(e, g, h) {
                var i, j = c.defer(),
                    k = j.promise,
                    l = s(h) && !h;
                return i = b.defer(function() {
                    try {
                        j.resolve(e())
                    } catch (b) {
                        j.reject(b), d(b)
                    } finally {
                        delete f[k.$$timeoutId]
                    }
                    l || a.$apply()
                }, g), k.$$timeoutId = i, f[i] = j, k
            }
            var f = {};
            return e.cancel = function(a) {
                return a && a.$$timeoutId in f ? (f[a.$$timeoutId].reject("canceled"), delete f[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1
            }, e
        }]
    }

    function Gb(a, b) {
        var c = a;
        return jc && (dd.setAttribute("href", c), c = dd.href), dd.setAttribute("href", c), {
            href: dd.href,
            protocol: dd.protocol ? dd.protocol.replace(/:$/, "") : "",
            host: dd.host,
            search: dd.search ? dd.search.replace(/^\?/, "") : "",
            hash: dd.hash ? dd.hash.replace(/^#/, "") : "",
            hostname: dd.hostname,
            port: dd.port,
            pathname: "/" === dd.pathname.charAt(0) ? dd.pathname : "/" + dd.pathname
        }
    }

    function Hb(a) {
        var b = u(a) ? Gb(a) : a;
        return b.protocol === ed.protocol && b.host === ed.host
    }

    function Ib() {
        this.$get = q(a)
    }

    function Jb(a) {
        function b(d, e) {
            if (t(d)) {
                var g = {};
                return f(d, function(a, c) {
                    g[c] = b(c, a)
                }), g
            }
            return a.factory(d + c, e)
        }
        var c = "Filter";
        this.register = b, this.$get = ["$injector", function(a) {
            return function(b) {
                return a.get(b + c)
            }
        }], b("currency", Lb), b("date", Tb), b("filter", Kb), b("json", Ub), b("limitTo", Vb), b("lowercase", jd), b("number", Mb), b("orderBy", Wb), b("uppercase", kd)
    }

    function Kb() {
        return function(a, b, c) {
            if (!x(a)) return a;
            var d = typeof c,
                e = [];
            e.check = function(a) {
                for (var b = 0; b < e.length; b++)
                    if (!e[b](a)) return !1;
                return !0
            }, "function" !== d && (c = "boolean" === d && c ? function(a, b) {
                return sc.equals(a, b)
            } : function(a, b) {
                return b = ("" + b).toLowerCase(), ("" + a).toLowerCase().indexOf(b) > -1
            });
            var f = function(a, b) {
                if ("string" == typeof b && "!" === b.charAt(0)) return !f(a, b.substr(1));
                switch (typeof a) {
                    case "boolean":
                    case "number":
                    case "string":
                        return c(a, b);
                    case "object":
                        switch (typeof b) {
                            case "object":
                                return c(a, b);
                            default:
                                for (var d in a)
                                    if ("$" !== d.charAt(0) && f(a[d], b)) return !0
                        }
                        return !1;
                    case "array":
                        for (var e = 0; e < a.length; e++)
                            if (f(a[e], b)) return !0;
                        return !1;
                    default:
                        return !1
                }
            };
            switch (typeof b) {
                case "boolean":
                case "number":
                case "string":
                    b = {
                        $: b
                    };
                case "object":
                    for (var g in b) ! function(a) {
                        "undefined" != typeof b[a] && e.push(function(c) {
                            return f("$" == a ? c : ea(c, a), b[a])
                        })
                    }(g);
                    break;
                case "function":
                    e.push(b);
                    break;
                default:
                    return a
            }
            for (var h = [], i = 0; i < a.length; i++) {
                var j = a[i];
                e.check(j) && h.push(j)
            }
            return h
        }
    }

    function Lb(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c) {
            return r(c) && (c = b.CURRENCY_SYM), Nb(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, 2).replace(/\u00A4/g, c)
        }
    }

    function Mb(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c) {
            return Nb(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
        }
    }

    function Nb(a, b, c, d, e) {
        if (isNaN(a) || !isFinite(a)) return "";
        var f = 0 > a;
        a = Math.abs(a);
        var g = a + "",
            h = "",
            i = [],
            j = !1;
        if (-1 !== g.indexOf("e")) {
            var k = g.match(/([\d\.]+)e(-?)(\d+)/);
            k && "-" == k[2] && k[3] > e + 1 ? g = "0" : (h = g, j = !0)
        }
        if (j) e > 0 && a > -1 && 1 > a && (h = a.toFixed(e));
        else {
            var l = (g.split(fd)[1] || "").length;
            r(e) && (e = Math.min(Math.max(b.minFrac, l), b.maxFrac));
            var m = Math.pow(10, e);
            a = Math.round(a * m) / m;
            var n = ("" + a).split(fd),
                o = n[0];
            n = n[1] || "";
            var p, q = 0,
                s = b.lgSize,
                t = b.gSize;
            if (o.length >= s + t)
                for (q = o.length - s, p = 0; q > p; p++)(q - p) % t === 0 && 0 !== p && (h += c), h += o.charAt(p);
            for (p = q; p < o.length; p++)(o.length - p) % s === 0 && 0 !== p && (h += c), h += o.charAt(p);
            for (; n.length < e;) n += "0";
            e && "0" !== e && (h += d + n.substr(0, e))
        }
        return i.push(f ? b.negPre : b.posPre), i.push(h), i.push(f ? b.negSuf : b.posSuf), i.join("")
    }

    function Ob(a, b, c) {
        var d = "";
        for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b;) a = "0" + a;
        return c && (a = a.substr(a.length - b)), d + a
    }

    function Pb(a, b, c, d) {
        return c = c || 0,
            function(e) {
                var f = e["get" + a]();
                return (c > 0 || f > -c) && (f += c), 0 === f && -12 == c && (f = 12), Ob(f, b, d)
            }
    }

    function Qb(a, b) {
        return function(c, d) {
            var e = c["get" + a](),
                f = gc(b ? "SHORT" + a : a);
            return d[f][e]
        }
    }

    function Rb(a) {
        var b = -1 * a.getTimezoneOffset(),
            c = b >= 0 ? "+" : "";
        return c += Ob(Math[b > 0 ? "floor" : "ceil"](b / 60), 2) + Ob(Math.abs(b % 60), 2)
    }

    function Sb(a, b) {
        return a.getHours() < 12 ? b.AMPMS[0] : b.AMPMS[1]
    }

    function Tb(a) {
        function b(a) {
            var b;
            if (b = a.match(c)) {
                var d = new Date(0),
                    e = 0,
                    f = 0,
                    g = b[8] ? d.setUTCFullYear : d.setFullYear,
                    h = b[8] ? d.setUTCHours : d.setHours;
                b[9] && (e = m(b[9] + b[10]), f = m(b[9] + b[11])), g.call(d, m(b[1]), m(b[2]) - 1, m(b[3]));
                var i = m(b[4] || 0) - e,
                    j = m(b[5] || 0) - f,
                    k = m(b[6] || 0),
                    l = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
                return h.call(d, i, j, k, l), d
            }
            return a
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, d) {
            var e, g, h = "",
                i = [];
            if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, u(c) && (c = id.test(c) ? m(c) : b(c)), v(c) && (c = new Date(c)), !w(c)) return c;
            for (; d;) g = hd.exec(d), g ? (i = M(i, g, 1), d = i.pop()) : (i.push(d), d = null);
            return f(i, function(b) {
                e = gd[b], h += e ? e(c, a.DATETIME_FORMATS) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), h
        }
    }

    function Ub() {
        return function(a) {
            return Q(a, !0)
        }
    }

    function Vb() {
        return function(a, b) {
            if (!x(a) && !u(a)) return a;
            if (b = m(b), u(a)) return b ? b >= 0 ? a.slice(0, b) : a.slice(b, a.length) : "";
            var c, d, e = [];
            for (b > a.length ? b = a.length : b < -a.length && (b = -a.length), b > 0 ? (c = 0, d = b) : (c = a.length + b, d = a.length); d > c; c++) e.push(a[c]);
            return e
        }
    }

    function Wb(a) {
        return function(b, c, d) {
            function e(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e) return e
                }
                return 0
            }

            function f(a, b) {
                return S(b) ? function(b, c) {
                    return a(c, b)
                } : a
            }

            function g(a, b) {
                var c = typeof a,
                    d = typeof b;
                return c == d ? ("string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : b > a ? -1 : 1) : d > c ? -1 : 1
            }
            if (!x(b)) return b;
            if (!c) return b;
            c = x(c) ? c : [c], c = E(c, function(b) {
                var c = !1,
                    d = b || p;
                return u(b) && (("+" == b.charAt(0) || "-" == b.charAt(0)) && (c = "-" == b.charAt(0), b = b.substring(1)), d = a(b)), f(function(a, b) {
                    return g(d(a), d(b))
                }, c)
            });
            for (var h = [], i = 0; i < b.length; i++) h.push(b[i]);
            return h.sort(f(e, d))
        }
    }

    function Xb(a) {
        return y(a) && (a = {
            link: a
        }), a.restrict = a.restrict || "AC", q(a)
    }

    function Yb(a, b) {
        function c(b, c) {
            c = c ? "-" + _(c, "-") : "", a.removeClass((b ? xd : wd) + c).addClass((b ? wd : xd) + c)
        }
        var d = this,
            e = a.parent().controller("form") || nd,
            g = 0,
            h = d.$error = {},
            i = [];
        d.$name = b.name || b.ngForm, d.$dirty = !1, d.$pristine = !0, d.$valid = !0, d.$invalid = !1, e.$addControl(d), a.addClass(yd), c(!0), d.$addControl = function(a) {
            da(a.$name, "input"), i.push(a), a.$name && (d[a.$name] = a)
        }, d.$removeControl = function(a) {
            a.$name && d[a.$name] === a && delete d[a.$name], f(h, function(b, c) {
                d.$setValidity(c, !0, a)
            }), H(i, a)
        }, d.$setValidity = function(a, b, f) {
            var i = h[a];
            if (b) i && (H(i, f), i.length || (g--, g || (c(b), d.$valid = !0, d.$invalid = !1), h[a] = !1, c(!0, a), e.$setValidity(a, !0, d)));
            else {
                if (g || c(b), i) {
                    if (F(i, f)) return
                } else h[a] = i = [], g++, c(!1, a), e.$setValidity(a, !1, d);
                i.push(f), d.$valid = !1, d.$invalid = !0
            }
        }, d.$setDirty = function() {
            a.removeClass(yd).addClass(zd), d.$dirty = !0, d.$pristine = !1, e.$setDirty()
        }, d.$setPristine = function() {
            a.removeClass(zd).addClass(yd), d.$dirty = !1, d.$pristine = !0, f(i, function(a) {
                a.$setPristine()
            })
        }
    }

    function Zb(a, b, d, e) {
        return a.$setValidity(b, d), d ? e : c
    }

    function $b(a, b, c, e, f, g) {
        if (!f.android) {
            var h = !1;
            b.on("compositionstart", function(a) {
                h = !0
            }), b.on("compositionend", function() {
                h = !1
            })
        }
        var i = function() {
            if (!h) {
                var d = b.val();
                S(c.ngTrim || "T") && (d = uc(d)), e.$viewValue !== d && (a.$$phase ? e.$setViewValue(d) : a.$apply(function() {
                    e.$setViewValue(d)
                }))
            }
        };
        if (f.hasEvent("input")) b.on("input", i);
        else {
            var j, k = function() {
                j || (j = g.defer(function() {
                    i(), j = null
                }))
            };
            b.on("keydown", function(a) {
                var b = a.keyCode;
                91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || k()
            }), f.hasEvent("paste") && b.on("paste cut", k)
        }
        b.on("change", i), e.$render = function() {
            b.val(e.$isEmpty(e.$viewValue) ? "" : e.$viewValue)
        };
        var l, n, o = c.ngPattern;
        if (o) {
            var p = function(a, b) {
                return Zb(e, "pattern", e.$isEmpty(b) || a.test(b), b)
            };
            n = o.match(/^\/(.*)\/([gim]*)$/), n ? (o = new RegExp(n[1], n[2]), l = function(a) {
                return p(o, a)
            }) : l = function(c) {
                var e = a.$eval(o);
                if (!e || !e.test) throw d("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", o, e, T(b));
                return p(e, c)
            }, e.$formatters.push(l), e.$parsers.push(l)
        }
        if (c.ngMinlength) {
            var q = m(c.ngMinlength),
                r = function(a) {
                    return Zb(e, "minlength", e.$isEmpty(a) || a.length >= q, a)
                };
            e.$parsers.push(r), e.$formatters.push(r)
        }
        if (c.ngMaxlength) {
            var s = m(c.ngMaxlength),
                t = function(a) {
                    return Zb(e, "maxlength", e.$isEmpty(a) || a.length <= s, a)
                };
            e.$parsers.push(t), e.$formatters.push(t)
        }
    }

    function _b(a, b, d, e, f, g) {
        if ($b(a, b, d, e, f, g), e.$parsers.push(function(a) {
                var b = e.$isEmpty(a);
                return b || td.test(a) ? (e.$setValidity("number", !0), "" === a ? null : b ? a : parseFloat(a)) : (e.$setValidity("number", !1), c)
            }), e.$formatters.push(function(a) {
                return e.$isEmpty(a) ? "" : "" + a
            }), d.min) {
            var h = function(a) {
                var b = parseFloat(d.min);
                return Zb(e, "min", e.$isEmpty(a) || a >= b, a)
            };
            e.$parsers.push(h), e.$formatters.push(h)
        }
        if (d.max) {
            var i = function(a) {
                var b = parseFloat(d.max);
                return Zb(e, "max", e.$isEmpty(a) || b >= a, a)
            };
            e.$parsers.push(i), e.$formatters.push(i)
        }
        e.$formatters.push(function(a) {
            return Zb(e, "number", e.$isEmpty(a) || v(a), a)
        })
    }

    function ac(a, b, c, d, e, f) {
        $b(a, b, c, d, e, f);
        var g = function(a) {
            return Zb(d, "url", d.$isEmpty(a) || rd.test(a), a)
        };
        d.$formatters.push(g), d.$parsers.push(g)
    }

    function bc(a, b, c, d, e, f) {
        $b(a, b, c, d, e, f);
        var g = function(a) {
            return Zb(d, "email", d.$isEmpty(a) || sd.test(a), a)
        };
        d.$formatters.push(g), d.$parsers.push(g)
    }

    function cc(a, b, c, d) {
        r(c.name) && b.attr("name", j()), b.on("click", function() {
            b[0].checked && a.$apply(function() {
                d.$setViewValue(c.value)
            })
        }), d.$render = function() {
            var a = c.value;
            b[0].checked = a == d.$viewValue
        }, c.$observe("value", d.$render)
    }

    function dc(a, b, c, d) {
        var e = c.ngTrueValue,
            f = c.ngFalseValue;
        u(e) || (e = !0), u(f) || (f = !1), b.on("click", function() {
            a.$apply(function() {
                d.$setViewValue(b[0].checked)
            })
        }), d.$render = function() {
            b[0].checked = d.$viewValue
        }, d.$isEmpty = function(a) {
            return a !== e
        }, d.$formatters.push(function(a) {
            return a === e
        }), d.$parsers.push(function(a) {
            return a ? e : f
        })
    }

    function ec(a, b) {
        return a = "ngClass" + a,
            function() {
                return {
                    restrict: "AC",
                    link: function(c, d, e) {
                        function g(a) {
                            if (b === !0 || c.$index % 2 === b) {
                                var d = h(a || "");
                                i ? K(a, i) || e.$updateClass(d, h(i)) : e.$addClass(d)
                            }
                            i = I(a)
                        }

                        function h(a) {
                            if (x(a)) return a.join(" ");
                            if (t(a)) {
                                var b = [];
                                return f(a, function(a, c) {
                                    a && b.push(c)
                                }), b.join(" ")
                            }
                            return a
                        }
                        var i;
                        c.$watch(e[a], g, !0), e.$observe("class", function(b) {
                            g(c.$eval(e[a]))
                        }), "ngClass" !== a && c.$watch("$index", function(d, f) {
                            var g = 1 & d;
                            if (g !== f & 1) {
                                var i = h(c.$eval(e[a]));
                                g === b ? e.$addClass(i) : e.$removeClass(i)
                            }
                        })
                    }
                }
            }
    }
    var fc = function(a) {
            return u(a) ? a.toLowerCase() : a
        },
        gc = function(a) {
            return u(a) ? a.toUpperCase() : a
        },
        hc = function(a) {
            return u(a) ? a.replace(/[A-Z]/g, function(a) {
                return String.fromCharCode(32 | a.charCodeAt(0))
            }) : a
        },
        ic = function(a) {
            return u(a) ? a.replace(/[a-z]/g, function(a) {
                return String.fromCharCode(-33 & a.charCodeAt(0))
            }) : a
        };
    "i" !== "I".toLowerCase() && (fc = hc, gc = ic);
    var jc, kc, lc, mc, nc, oc = [].slice,
        pc = [].push,
        qc = Object.prototype.toString,
        rc = d("ng"),
        sc = (a.angular, a.angular || (a.angular = {})),
        tc = ["0", "0", "0"];
    jc = m((/msie (\d+)/.exec(fc(navigator.userAgent)) || [])[1]), isNaN(jc) && (jc = m((/trident\/.*; rv:(\d+)/.exec(fc(navigator.userAgent)) || [])[1])), o.$inject = [], p.$inject = [];
    var uc = function() {
        return String.prototype.trim ? function(a) {
            return u(a) ? a.trim() : a
        } : function(a) {
            return u(a) ? a.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : a
        }
    }();
    nc = 9 > jc ? function(a) {
        return a = a.nodeName ? a : a[0], a.scopeName && "HTML" != a.scopeName ? gc(a.scopeName + ":" + a.nodeName) : a.nodeName
    } : function(a) {
        return a.nodeName ? a.nodeName : a[0].nodeName
    };
    var vc = /[A-Z]/g,
        wc = {
            full: "1.2.9",
            major: 1,
            minor: 2,
            dot: 9,
            codeName: "enchanted-articulacy"
        },
        xc = la.cache = {},
        yc = la.expando = "ng-" + (new Date).getTime(),
        zc = 1,
        Ac = a.document.addEventListener ? function(a, b, c) {
            a.addEventListener(b, c, !1)
        } : function(a, b, c) {
            a.attachEvent("on" + b, c)
        },
        Bc = a.document.removeEventListener ? function(a, b, c) {
            a.removeEventListener(b, c, !1)
        } : function(a, b, c) {
            a.detachEvent("on" + b, c)
        },
        Cc = /([\:\-\_]+(.))/g,
        Dc = /^moz([A-Z])/,
        Ec = d("jqLite"),
        Fc = la.prototype = {
            ready: function(c) {
                function d() {
                    e || (e = !0, c())
                }
                var e = !1;
                "complete" === b.readyState ? setTimeout(d) : (this.on("DOMContentLoaded", d), la(a).on("load", d))
            },
            toString: function() {
                var a = [];
                return f(this, function(b) {
                    a.push("" + b)
                }), "[" + a.join(", ") + "]"
            },
            eq: function(a) {
                return kc(a >= 0 ? this[a] : this[this.length + a])
            },
            length: 0,
            push: pc,
            sort: [].sort,
            splice: [].splice
        },
        Gc = {};
    f("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(a) {
        Gc[fc(a)] = a
    });
    var Hc = {};
    f("input,select,option,textarea,button,form,details".split(","), function(a) {
        Hc[gc(a)] = !0
    }), f({
        data: ra,
        inheritedData: xa,
        scope: function(a) {
            return kc(a).data("$scope") || xa(a.parentNode || a, ["$isolateScope", "$scope"])
        },
        isolateScope: function(a) {
            return kc(a).data("$isolateScope") || kc(a).data("$isolateScopeNoTemplate")
        },
        controller: wa,
        injector: function(a) {
            return xa(a, "$injector")
        },
        removeAttr: function(a, b) {
            a.removeAttribute(b)
        },
        hasClass: sa,
        css: function(a, b, d) {
            if (b = ja(b), !s(d)) {
                var e;
                return 8 >= jc && (e = a.currentStyle && a.currentStyle[b], "" === e && (e = "auto")), e = e || a.style[b], 8 >= jc && (e = "" === e ? c : e), e
            }
            a.style[b] = d
        },
        attr: function(a, b, d) {
            var e = fc(b);
            if (Gc[e]) {
                if (!s(d)) return a[b] || (a.attributes.getNamedItem(b) || o).specified ? e : c;
                d ? (a[b] = !0, a.setAttribute(b, e)) : (a[b] = !1, a.removeAttribute(e))
            } else if (s(d)) a.setAttribute(b, d);
            else if (a.getAttribute) {
                var f = a.getAttribute(b, 2);
                return null === f ? c : f
            }
        },
        prop: function(a, b, c) {
            return s(c) ? void(a[b] = c) : a[b]
        },
        text: function() {
            function a(a, c) {
                var d = b[a.nodeType];
                return r(c) ? d ? a[d] : "" : void(a[d] = c)
            }
            var b = [];
            return 9 > jc ? (b[1] = "innerText", b[3] = "nodeValue") : b[1] = b[3] = "textContent", a.$dv = "", a
        }(),
        val: function(a, b) {
            if (r(b)) {
                if ("SELECT" === nc(a) && a.multiple) {
                    var c = [];
                    return f(a.options, function(a) {
                        a.selected && c.push(a.value || a.text)
                    }), 0 === c.length ? null : c
                }
                return a.value
            }
            a.value = b
        },
        html: function(a, b) {
            if (r(b)) return a.innerHTML;
            for (var c = 0, d = a.childNodes; c < d.length; c++) na(d[c]);
            a.innerHTML = b
        },
        empty: ya
    }, function(a, b) {
        la.prototype[b] = function(b, d) {
            var e, f;
            if (a !== ya && (2 == a.length && a !== sa && a !== wa ? b : d) === c) {
                if (t(b)) {
                    for (e = 0; e < this.length; e++)
                        if (a === ra) a(this[e], b);
                        else
                            for (f in b) a(this[e], f, b[f]);
                    return this
                }
                for (var g = a.$dv, h = g === c ? Math.min(this.length, 1) : this.length, i = 0; h > i; i++) {
                    var j = a(this[i], b, d);
                    g = g ? g + j : j
                }
                return g
            }
            for (e = 0; e < this.length; e++) a(this[e], b, d);
            return this
        }
    }), f({
        removeData: pa,
        dealoc: na,
        on: function ie(a, c, d, e) {
            if (s(e)) throw Ec("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            var g = qa(a, "events"),
                h = qa(a, "handle");
            g || qa(a, "events", g = {}), h || qa(a, "handle", h = Aa(a, g)), f(c.split(" "), function(c) {
                var e = g[c];
                if (!e) {
                    if ("mouseenter" == c || "mouseleave" == c) {
                        var f = b.body.contains || b.body.compareDocumentPosition ? function(a, b) {
                            var c = 9 === a.nodeType ? a.documentElement : a,
                                d = b && b.parentNode;
                            return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                        } : function(a, b) {
                            if (b)
                                for (; b = b.parentNode;)
                                    if (b === a) return !0;
                            return !1
                        };
                        g[c] = [];
                        var i = {
                            mouseleave: "mouseout",
                            mouseenter: "mouseover"
                        };
                        ie(a, i[c], function(a) {
                            var b = this,
                                d = a.relatedTarget;
                            (!d || d !== b && !f(b, d)) && h(a, c)
                        })
                    } else Ac(a, c, h), g[c] = [];
                    e = g[c]
                }
                e.push(d)
            })
        },
        off: oa,
        one: function(a, b, c) {
            a = kc(a), a.on(b, function d() {
                a.off(b, c), a.off(b, d)
            }), a.on(b, c)
        },
        replaceWith: function(a, b) {
            var c, d = a.parentNode;
            na(a), f(new la(b), function(b) {
                c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a), c = b
            })
        },
        children: function(a) {
            var b = [];
            return f(a.childNodes, function(a) {
                1 === a.nodeType && b.push(a)
            }), b
        },
        contents: function(a) {
            return a.childNodes || []
        },
        append: function(a, b) {
            f(new la(b), function(b) {
                (1 === a.nodeType || 11 === a.nodeType) && a.appendChild(b)
            })
        },
        prepend: function(a, b) {
            if (1 === a.nodeType) {
                var c = a.firstChild;
                f(new la(b), function(b) {
                    a.insertBefore(b, c)
                })
            }
        },
        wrap: function(a, b) {
            b = kc(b)[0];
            var c = a.parentNode;
            c && c.replaceChild(b, a), b.appendChild(a)
        },
        remove: function(a) {
            na(a);
            var b = a.parentNode;
            b && b.removeChild(a)
        },
        after: function(a, b) {
            var c = a,
                d = a.parentNode;
            f(new la(b), function(a) {
                d.insertBefore(a, c.nextSibling), c = a
            })
        },
        addClass: ua,
        removeClass: ta,
        toggleClass: function(a, b, c) {
            r(c) && (c = !sa(a, b)), (c ? ua : ta)(a, b)
        },
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        next: function(a) {
            if (a.nextElementSibling) return a.nextElementSibling;
            for (var b = a.nextSibling; null != b && 1 !== b.nodeType;) b = b.nextSibling;
            return b
        },
        find: function(a, b) {
            return a.getElementsByTagName ? a.getElementsByTagName(b) : []
        },
        clone: ma,
        triggerHandler: function(a, b, c) {
            var d = (qa(a, "events") || {})[b];
            c = c || [];
            var e = [{
                preventDefault: o,
                stopPropagation: o
            }];
            f(d, function(b) {
                b.apply(a, e.concat(c))
            })
        }
    }, function(a, b) {
        la.prototype[b] = function(b, c, d) {
            for (var e, f = 0; f < this.length; f++) r(e) ? (e = a(this[f], b, c, d), s(e) && (e = kc(e))) : va(e, a(this[f], b, c, d));
            return s(e) ? e : this
        }, la.prototype.bind = la.prototype.on, la.prototype.unbind = la.prototype.off
    }), Ca.prototype = {
        put: function(a, b) {
            this[Ba(a)] = b
        },
        get: function(a) {
            return this[Ba(a)]
        },
        remove: function(a) {
            var b = this[a = Ba(a)];
            return delete this[a], b
        }
    };
    var Ic = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
        Jc = /,/,
        Kc = /^\s*(_?)(\S+?)\1\s*$/,
        Lc = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
        Mc = d("$injector"),
        Nc = d("$animate"),
        Oc = ["$provide", function(a) {
            this.$$selectors = {}, this.register = function(b, c) {
                var d = b + "-animation";
                if (b && "." != b.charAt(0)) throw Nc("notcsel", "Expecting class selector starting with '.' got '{0}'.", b);
                this.$$selectors[b.substr(1)] = d, a.factory(d, c)
            }, this.classNameFilter = function(a) {
                return 1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null), this.$$classNameFilter
            }, this.$get = ["$timeout", function(a) {
                return {
                    enter: function(b, c, d, e) {
                        d ? d.after(b) : (c && c[0] || (c = d.parent()), c.append(b)), e && a(e, 0, !1)
                    },
                    leave: function(b, c) {
                        b.remove(), c && a(c, 0, !1)
                    },
                    move: function(a, b, c, d) {
                        this.enter(a, b, c, d)
                    },
                    addClass: function(b, c, d) {
                        c = u(c) ? c : x(c) ? c.join(" ") : "", f(b, function(a) {
                            ua(a, c)
                        }), d && a(d, 0, !1)
                    },
                    removeClass: function(b, c, d) {
                        c = u(c) ? c : x(c) ? c.join(" ") : "", f(b, function(a) {
                            ta(a, c)
                        }), d && a(d, 0, !1)
                    },
                    enabled: o
                }
            }]
        }],
        Pc = d("$compile");
    Ka.$inject = ["$provide", "$$sanitizeUriProvider"];
    var Qc = /^(x[\:\-_]|data[\:\-_])/i,
        Rc = d("$interpolate"),
        Sc = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
        Tc = {
            http: 80,
            https: 443,
            ftp: 21
        },
        Uc = d("$location");
    ib.prototype = hb.prototype = gb.prototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: jb("$$absUrl"),
        url: function(a, b) {
            if (r(a)) return this.$$url;
            var c = Sc.exec(a);
            return c[1] && this.path(decodeURIComponent(c[1])), (c[2] || c[1]) && this.search(c[3] || ""), this.hash(c[5] || "", b), this
        },
        protocol: jb("$$protocol"),
        host: jb("$$host"),
        port: jb("$$port"),
        path: kb("$$path", function(a) {
            return "/" == a.charAt(0) ? a : "/" + a
        }),
        search: function(a, b) {
            switch (arguments.length) {
                case 0:
                    return this.$$search;
                case 1:
                    if (u(a)) this.$$search = V(a);
                    else {
                        if (!t(a)) throw Uc("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                        this.$$search = a
                    }
                    break;
                default:
                    r(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b
            }
            return this.$$compose(), this
        },
        hash: kb("$$hash", p),
        replace: function() {
            return this.$$replace = !0, this
        }
    };
    var Vc, Wc = d("$parse"),
        Xc = {},
        Yc = {
            "null": function() {
                return null
            },
            "true": function() {
                return !0
            },
            "false": function() {
                return !1
            },
            undefined: o,
            "+": function(a, b, d, e) {
                return d = d(a, b), e = e(a, b), s(d) ? s(e) ? d + e : d : s(e) ? e : c
            },
            "-": function(a, b, c, d) {
                return c = c(a, b), d = d(a, b), (s(c) ? c : 0) - (s(d) ? d : 0)
            },
            "*": function(a, b, c, d) {
                return c(a, b) * d(a, b)
            },
            "/": function(a, b, c, d) {
                return c(a, b) / d(a, b)
            },
            "%": function(a, b, c, d) {
                return c(a, b) % d(a, b)
            },
            "^": function(a, b, c, d) {
                return c(a, b) ^ d(a, b)
            },
            "=": o,
            "===": function(a, b, c, d) {
                return c(a, b) === d(a, b)
            },
            "!==": function(a, b, c, d) {
                return c(a, b) !== d(a, b)
            },
            "==": function(a, b, c, d) {
                return c(a, b) == d(a, b)
            },
            "!=": function(a, b, c, d) {
                return c(a, b) != d(a, b)
            },
            "<": function(a, b, c, d) {
                return c(a, b) < d(a, b)
            },
            ">": function(a, b, c, d) {
                return c(a, b) > d(a, b)
            },
            "<=": function(a, b, c, d) {
                return c(a, b) <= d(a, b)
            },
            ">=": function(a, b, c, d) {
                return c(a, b) >= d(a, b)
            },
            "&&": function(a, b, c, d) {
                return c(a, b) && d(a, b)
            },
            "||": function(a, b, c, d) {
                return c(a, b) || d(a, b)
            },
            "&": function(a, b, c, d) {
                return c(a, b) & d(a, b)
            },
            "|": function(a, b, c, d) {
                return d(a, b)(a, b, c(a, b))
            },
            "!": function(a, b, c) {
                return !c(a, b)
            }
        },
        Zc = {
            n: "\n",
            f: "\f",
            r: "\r",
            t: "	",
            v: "",
            "'": "'",
            '"': '"'
        },
        $c = function(a) {
            this.options = a
        };
    $c.prototype = {
        constructor: $c,
        lex: function(a) {
            this.text = a, this.index = 0, this.ch = c, this.lastCh = ":", this.tokens = [];
            for (var b, d = []; this.index < this.text.length;) {
                if (this.ch = this.text.charAt(this.index), this.is("\"'")) this.readString(this.ch);
                else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber();
                else if (this.isIdent(this.ch)) this.readIdent(), this.was("{,") && "{" === d[0] && (b = this.tokens[this.tokens.length - 1]) && (b.json = -1 === b.text.indexOf("."));
                else if (this.is("(){}[].,;:?")) this.tokens.push({
                    index: this.index,
                    text: this.ch,
                    json: this.was(":[,") && this.is("{[") || this.is("}]:,")
                }), this.is("{[") && d.unshift(this.ch), this.is("}]") && d.shift(), this.index++;
                else {
                    if (this.isWhitespace(this.ch)) {
                        this.index++;
                        continue
                    }
                    var e = this.ch + this.peek(),
                        f = e + this.peek(2),
                        g = Yc[this.ch],
                        h = Yc[e],
                        i = Yc[f];
                    i ? (this.tokens.push({
                        index: this.index,
                        text: f,
                        fn: i
                    }), this.index += 3) : h ? (this.tokens.push({
                        index: this.index,
                        text: e,
                        fn: h
                    }), this.index += 2) : g ? (this.tokens.push({
                        index: this.index,
                        text: this.ch,
                        fn: g,
                        json: this.was("[,:") && this.is("+-")
                    }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
                this.lastCh = this.ch
            }
            return this.tokens
        },
        is: function(a) {
            return -1 !== a.indexOf(this.ch)
        },
        was: function(a) {
            return -1 !== a.indexOf(this.lastCh)
        },
        peek: function(a) {
            var b = a || 1;
            return this.index + b < this.text.length ? this.text.charAt(this.index + b) : !1
        },
        isNumber: function(a) {
            return a >= "0" && "9" >= a
        },
        isWhitespace: function(a) {
            return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || "Â " === a
        },
        isIdent: function(a) {
            return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
        },
        isExpOperator: function(a) {
            return "-" === a || "+" === a || this.isNumber(a)
        },
        throwError: function(a, b, c) {
            c = c || this.index;
            var d = s(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]" : " " + c;
            throw Wc("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", a, d, this.text)
        },
        readNumber: function() {
            for (var a = "", b = this.index; this.index < this.text.length;) {
                var c = fc(this.text.charAt(this.index));
                if ("." == c || this.isNumber(c)) a += c;
                else {
                    var d = this.peek();
                    if ("e" == c && this.isExpOperator(d)) a += c;
                    else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1)) a += c;
                    else {
                        if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1)) break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            a = 1 * a, this.tokens.push({
                index: b,
                text: a,
                json: !0,
                fn: function() {
                    return a
                }
            })
        },
        readIdent: function() {
            for (var a, b, c, d, e = this, f = "", g = this.index; this.index < this.text.length && (d = this.text.charAt(this.index), "." === d || this.isIdent(d) || this.isNumber(d));) "." === d && (a = this.index), f += d, this.index++;
            if (a)
                for (b = this.index; b < this.text.length;) {
                    if (d = this.text.charAt(b), "(" === d) {
                        c = f.substr(a - g + 1), f = f.substr(0, a - g), this.index = b;
                        break
                    }
                    if (!this.isWhitespace(d)) break;
                    b++
                }
            var h = {
                index: g,
                text: f
            };
            if (Yc.hasOwnProperty(f)) h.fn = Yc[f], h.json = Yc[f];
            else {
                var i = tb(f, this.options, this.text);
                h.fn = l(function(a, b) {
                    return i(a, b)
                }, {
                    assign: function(a, b) {
                        return pb(a, f, b, e.text, e.options)
                    }
                })
            }
            this.tokens.push(h), c && (this.tokens.push({
                index: a,
                text: ".",
                json: !1
            }), this.tokens.push({
                index: a + 1,
                text: c,
                json: !1
            }))
        },
        readString: function(a) {
            var b = this.index;
            this.index++;
            for (var c = "", d = a, e = !1; this.index < this.text.length;) {
                var f = this.text.charAt(this.index);
                if (d += f, e) {
                    if ("u" === f) {
                        var g = this.text.substring(this.index + 1, this.index + 5);
                        g.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + g + "]"), this.index += 4, c += String.fromCharCode(parseInt(g, 16))
                    } else {
                        var h = Zc[f];
                        c += h ? h : f
                    }
                    e = !1
                } else if ("\\" === f) e = !0;
                else {
                    if (f === a) return this.index++, void this.tokens.push({
                        index: b,
                        text: d,
                        string: c,
                        json: !0,
                        fn: function() {
                            return c
                        }
                    });
                    c += f
                }
                this.index++
            }
            this.throwError("Unterminated quote", b)
        }
    };
    var _c = function(a, b, c) {
        this.lexer = a, this.$filter = b, this.options = c
    };
    _c.ZERO = function() {
        return 0
    }, _c.prototype = {
        constructor: _c,
        parse: function(a, b) {
            this.text = a, this.json = b, this.tokens = this.lexer.lex(a), b && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function() {
                this.throwError("is not valid json", {
                    text: a,
                    index: 0
                })
            });
            var c = b ? this.primary() : this.statements();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), c.literal = !!c.literal, c.constant = !!c.constant, c
        },
        primary: function() {
            var a;
            if (this.expect("(")) a = this.filterChain(), this.consume(")");
            else if (this.expect("[")) a = this.arrayDeclaration();
            else if (this.expect("{")) a = this.object();
            else {
                var b = this.expect();
                a = b.fn, a || this.throwError("not a primary expression", b), b.json && (a.constant = !0, a.literal = !0)
            }
            for (var c, d; c = this.expect("(", "[", ".");) "(" === c.text ? (a = this.functionCall(a, d), d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
            return a
        },
        throwError: function(a, b) {
            throw Wc("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", b.text, a, b.index + 1, this.text, this.text.substring(b.index))
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw Wc("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0]
        },
        peek: function(a, b, c, d) {
            if (this.tokens.length > 0) {
                var e = this.tokens[0],
                    f = e.text;
                if (f === a || f === b || f === c || f === d || !a && !b && !c && !d) return e
            }
            return !1
        },
        expect: function(a, b, c, d) {
            var e = this.peek(a, b, c, d);
            return e ? (this.json && !e.json && this.throwError("is not valid json", e), this.tokens.shift(), e) : !1
        },
        consume: function(a) {
            this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek())
        },
        unaryFn: function(a, b) {
            return l(function(c, d) {
                return a(c, d, b)
            }, {
                constant: b.constant
            })
        },
        ternaryFn: function(a, b, c) {
            return l(function(d, e) {
                return a(d, e) ? b(d, e) : c(d, e)
            }, {
                constant: a.constant && b.constant && c.constant
            })
        },
        binaryFn: function(a, b, c) {
            return l(function(d, e) {
                return b(d, e, a, c)
            }, {
                constant: a.constant && c.constant
            })
        },
        statements: function() {
            for (var a = [];;)
                if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";")) return 1 === a.length ? a[0] : function(b, c) {
                    for (var d, e = 0; e < a.length; e++) {
                        var f = a[e];
                        f && (d = f(b, c))
                    }
                    return d
                }
        },
        filterChain: function() {
            for (var a, b = this.expression();;) {
                if (!(a = this.expect("|"))) return b;
                b = this.binaryFn(b, a.fn, this.filter())
            }
        },
        filter: function() {
            for (var a = this.expect(), b = this.$filter(a.text), c = [];;) {
                if (!(a = this.expect(":"))) {
                    var d = function(a, d, e) {
                        for (var f = [e], g = 0; g < c.length; g++) f.push(c[g](a, d));
                        return b.apply(a, f)
                    };
                    return function() {
                        return d
                    }
                }
                c.push(this.expression())
            }
        },
        expression: function() {
            return this.assignment()
        },
        assignment: function() {
            var a, b, c = this.ternary();
            return (b = this.expect("=")) ? (c.assign || this.throwError("implies assignment but [" + this.text.substring(0, b.index) + "] can not be assigned to", b), a = this.ternary(), function(b, d) {
                return c.assign(b, a(b, d), d)
            }) : c
        },
        ternary: function() {
            var a, b, c = this.logicalOR();
            return (b = this.expect("?")) ? (a = this.ternary(), (b = this.expect(":")) ? this.ternaryFn(c, a, this.ternary()) : void this.throwError("expected :", b)) : c
        },
        logicalOR: function() {
            for (var a, b = this.logicalAND();;) {
                if (!(a = this.expect("||"))) return b;
                b = this.binaryFn(b, a.fn, this.logicalAND())
            }
        },
        logicalAND: function() {
            var a, b = this.equality();
            return (a = this.expect("&&")) && (b = this.binaryFn(b, a.fn, this.logicalAND())), b
        },
        equality: function() {
            var a, b = this.relational();
            return (a = this.expect("==", "!=", "===", "!==")) && (b = this.binaryFn(b, a.fn, this.equality())), b
        },
        relational: function() {
            var a, b = this.additive();
            return (a = this.expect("<", ">", "<=", ">=")) && (b = this.binaryFn(b, a.fn, this.relational())), b
        },
        additive: function() {
            for (var a, b = this.multiplicative(); a = this.expect("+", "-");) b = this.binaryFn(b, a.fn, this.multiplicative());
            return b
        },
        multiplicative: function() {
            for (var a, b = this.unary(); a = this.expect("*", "/", "%");) b = this.binaryFn(b, a.fn, this.unary());
            return b
        },
        unary: function() {
            var a;
            return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(_c.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary()
        },
        fieldAccess: function(a) {
            var b = this,
                c = this.expect().text,
                d = tb(c, this.options, this.text);
            return l(function(b, c, e) {
                return d(e || a(b, c), c)
            }, {
                assign: function(d, e, f) {
                    return pb(a(d, f), c, e, b.text, b.options)
                }
            })
        },
        objectIndex: function(a) {
            var b = this,
                d = this.expression();
            return this.consume("]"), l(function(e, f) {
                var g, h, i = a(e, f),
                    j = d(e, f);
                return i ? (g = ob(i[j], b.text), g && g.then && b.options.unwrapPromises && (h = g, "$$v" in g || (h.$$v = c, h.then(function(a) {
                    h.$$v = a
                })), g = g.$$v), g) : c
            }, {
                assign: function(c, e, f) {
                    var g = d(c, f),
                        h = ob(a(c, f), b.text);
                    return h[g] = e
                }
            })
        },
        functionCall: function(a, b) {
            var c = [];
            if (")" !== this.peekToken().text)
                do c.push(this.expression()); while (this.expect(","));
            this.consume(")");
            var d = this;
            return function(e, f) {
                for (var g = [], h = b ? b(e, f) : e, i = 0; i < c.length; i++) g.push(c[i](e, f));
                var j = a(e, f, h) || o;
                ob(h, d.text), ob(j, d.text);
                var k = j.apply ? j.apply(h, g) : j(g[0], g[1], g[2], g[3], g[4]);
                return ob(k, d.text)
            }
        },
        arrayDeclaration: function() {
            var a = [],
                b = !0;
            if ("]" !== this.peekToken().text)
                do {
                    var c = this.expression();
                    a.push(c), c.constant || (b = !1)
                } while (this.expect(","));
            return this.consume("]"), l(function(b, c) {
                for (var d = [], e = 0; e < a.length; e++) d.push(a[e](b, c));
                return d
            }, {
                literal: !0,
                constant: b
            })
        },
        object: function() {
            var a = [],
                b = !0;
            if ("}" !== this.peekToken().text)
                do {
                    var c = this.expect(),
                        d = c.string || c.text;
                    this.consume(":");
                    var e = this.expression();
                    a.push({
                        key: d,
                        value: e
                    }), e.constant || (b = !1)
                } while (this.expect(","));
            return this.consume("}"), l(function(b, c) {
                for (var d = {}, e = 0; e < a.length; e++) {
                    var f = a[e];
                    d[f.key] = f.value(b, c)
                }
                return d
            }, {
                literal: !0,
                constant: b
            })
        }
    };
    var ad = {},
        bd = d("$sce"),
        cd = {
            HTML: "html",
            CSS: "css",
            URL: "url",
            RESOURCE_URL: "resourceUrl",
            JS: "js"
        },
        dd = b.createElement("a"),
        ed = Gb(a.location.href, !0);
    Jb.$inject = ["$provide"], Lb.$inject = ["$locale"], Mb.$inject = ["$locale"];
    var fd = ".",
        gd = {
            yyyy: Pb("FullYear", 4),
            yy: Pb("FullYear", 2, 0, !0),
            y: Pb("FullYear", 1),
            MMMM: Qb("Month"),
            MMM: Qb("Month", !0),
            MM: Pb("Month", 2, 1),
            M: Pb("Month", 1, 1),
            dd: Pb("Date", 2),
            d: Pb("Date", 1),
            HH: Pb("Hours", 2),
            H: Pb("Hours", 1),
            hh: Pb("Hours", 2, -12),
            h: Pb("Hours", 1, -12),
            mm: Pb("Minutes", 2),
            m: Pb("Minutes", 1),
            ss: Pb("Seconds", 2),
            s: Pb("Seconds", 1),
            sss: Pb("Milliseconds", 3),
            EEEE: Qb("Day"),
            EEE: Qb("Day", !0),
            a: Sb,
            Z: Rb
        },
        hd = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
        id = /^\-?\d+$/;
    Tb.$inject = ["$locale"];
    var jd = q(fc),
        kd = q(gc);
    Wb.$inject = ["$parse"];
    var ld = q({
            restrict: "E",
            compile: function(a, c) {
                return 8 >= jc && (c.href || c.name || c.$set("href", ""), a.append(b.createComment("IE fix"))), c.href || c.name ? void 0 : function(a, b) {
                    b.on("click", function(a) {
                        b.attr("href") || a.preventDefault()
                    })
                }
            }
        }),
        md = {};
    f(Gc, function(a, b) {
        if ("multiple" != a) {
            var c = La("ng-" + b);
            md[c] = function() {
                return {
                    priority: 100,
                    link: function(a, d, e) {
                        a.$watch(e[c], function(a) {
                            e.$set(b, !!a)
                        })
                    }
                }
            }
        }
    }), f(["src", "srcset", "href"], function(a) {
        var b = La("ng-" + a);
        md[b] = function() {
            return {
                priority: 99,
                link: function(c, d, e) {
                    e.$observe(b, function(b) {
                        b && (e.$set(a, b), jc && d.prop(a, e[a]))
                    })
                }
            }
        }
    });
    var nd = {
        $addControl: o,
        $removeControl: o,
        $setValidity: o,
        $setDirty: o,
        $setPristine: o
    };
    Yb.$inject = ["$element", "$attrs", "$scope"];
    var od = function(a) {
            return ["$timeout", function(b) {
                var d = {
                    name: "form",
                    restrict: a ? "EAC" : "E",
                    controller: Yb,
                    compile: function() {
                        return {
                            pre: function(a, d, e, f) {
                                if (!e.action) {
                                    var g = function(a) {
                                        a.preventDefault ? a.preventDefault() : a.returnValue = !1
                                    };
                                    Ac(d[0], "submit", g), d.on("$destroy", function() {
                                        b(function() {
                                            Bc(d[0], "submit", g)
                                        }, 0, !1)
                                    })
                                }
                                var h = d.parent().controller("form"),
                                    i = e.name || e.ngForm;
                                i && pb(a, i, f, i), h && d.on("$destroy", function() {
                                    h.$removeControl(f), i && pb(a, i, c, i), l(f, nd)
                                })
                            }
                        }
                    }
                };
                return d
            }]
        },
        pd = od(),
        qd = od(!0),
        rd = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        sd = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
        td = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
        ud = {
            text: $b,
            number: _b,
            url: ac,
            email: bc,
            radio: cc,
            checkbox: dc,
            hidden: o,
            button: o,
            submit: o,
            reset: o
        },
        vd = ["$browser", "$sniffer", function(a, b) {
            return {
                restrict: "E",
                require: "?ngModel",
                link: function(c, d, e, f) {
                    f && (ud[fc(e.type)] || ud.text)(c, d, e, f, b, a)
                }
            }
        }],
        wd = "ng-valid",
        xd = "ng-invalid",
        yd = "ng-pristine",
        zd = "ng-dirty",
        Ad = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", function(a, b, c, e, g) {
            function h(a, b) {
                b = b ? "-" + _(b, "-") : "", e.removeClass((a ? xd : wd) + b).addClass((a ? wd : xd) + b)
            }
            this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = c.name;
            var i = g(c.ngModel),
                j = i.assign;
            if (!j) throw d("ngModel")("nonassign", "Expression '{0}' is non-assignable. Element: {1}", c.ngModel, T(e));
            this.$render = o, this.$isEmpty = function(a) {
                return r(a) || "" === a || null === a || a !== a
            };
            var k = e.inheritedData("$formController") || nd,
                l = 0,
                m = this.$error = {};
            e.addClass(yd), h(!0), this.$setValidity = function(a, b) {
                m[a] !== !b && (b ? (m[a] && l--, l || (h(!0), this.$valid = !0, this.$invalid = !1)) : (h(!1), this.$invalid = !0, this.$valid = !1, l++), m[a] = !b, h(b, a), k.$setValidity(a, b, this))
            }, this.$setPristine = function() {
                this.$dirty = !1, this.$pristine = !0, e.removeClass(zd).addClass(yd)
            }, this.$setViewValue = function(c) {
                this.$viewValue = c, this.$pristine && (this.$dirty = !0, this.$pristine = !1, e.removeClass(yd).addClass(zd), k.$setDirty()), f(this.$parsers, function(a) {
                    c = a(c)
                }), this.$modelValue !== c && (this.$modelValue = c, j(a, c), f(this.$viewChangeListeners, function(a) {
                    try {
                        a()
                    } catch (c) {
                        b(c)
                    }
                }))
            };
            var n = this;
            a.$watch(function() {
                var b = i(a);
                if (n.$modelValue !== b) {
                    var c = n.$formatters,
                        d = c.length;
                    for (n.$modelValue = b; d--;) b = c[d](b);
                    n.$viewValue !== b && (n.$viewValue = b, n.$render())
                }
                return b
            })
        }],
        Bd = function() {
            return {
                require: ["ngModel", "^?form"],
                controller: Ad,
                link: function(a, b, c, d) {
                    var e = d[0],
                        f = d[1] || nd;
                    f.$addControl(e), a.$on("$destroy", function() {
                        f.$removeControl(e)
                    })
                }
            }
        },
        Cd = q({
            require: "ngModel",
            link: function(a, b, c, d) {
                d.$viewChangeListeners.push(function() {
                    a.$eval(c.ngChange)
                })
            }
        }),
        Dd = function() {
            return {
                require: "?ngModel",
                link: function(a, b, c, d) {
                    if (d) {
                        c.required = !0;
                        var e = function(a) {
                            return c.required && d.$isEmpty(a) ? void d.$setValidity("required", !1) : (d.$setValidity("required", !0), a)
                        };
                        d.$formatters.push(e), d.$parsers.unshift(e), c.$observe("required", function() {
                            e(d.$viewValue)
                        })
                    }
                }
            }
        },
        Ed = function() {
            return {
                require: "ngModel",
                link: function(a, b, d, e) {
                    var g = /\/(.*)\//.exec(d.ngList),
                        h = g && new RegExp(g[1]) || d.ngList || ",",
                        i = function(a) {
                            if (!r(a)) {
                                var b = [];
                                return a && f(a.split(h), function(a) {
                                    a && b.push(uc(a))
                                }), b
                            }
                        };
                    e.$parsers.push(i), e.$formatters.push(function(a) {
                        return x(a) ? a.join(", ") : c
                    }), e.$isEmpty = function(a) {
                        return !a || !a.length
                    }
                }
            }
        },
        Fd = /^(true|false|\d+)$/,
        Gd = function() {
            return {
                priority: 100,
                compile: function(a, b) {
                    return Fd.test(b.ngValue) ? function(a, b, c) {
                        c.$set("value", a.$eval(c.ngValue))
                    } : function(a, b, c) {
                        a.$watch(c.ngValue, function(a) {
                            c.$set("value", a)
                        })
                    }
                }
            }
        },
        Hd = Xb(function(a, b, d) {
            b.addClass("ng-binding").data("$binding", d.ngBind), a.$watch(d.ngBind, function(a) {
                b.text(a == c ? "" : a)
            })
        }),
        Id = ["$interpolate", function(a) {
            return function(b, c, d) {
                var e = a(c.attr(d.$attr.ngBindTemplate));
                c.addClass("ng-binding").data("$binding", e), d.$observe("ngBindTemplate", function(a) {
                    c.text(a)
                })
            }
        }],
        Jd = ["$sce", "$parse", function(a, b) {
            return function(c, d, e) {
                function f() {
                    return (g(c) || "").toString()
                }
                d.addClass("ng-binding").data("$binding", e.ngBindHtml);
                var g = b(e.ngBindHtml);
                c.$watch(f, function(b) {
                    d.html(a.getTrustedHtml(g(c)) || "")
                })
            }
        }],
        Kd = ec("", !0),
        Ld = ec("Odd", 0),
        Md = ec("Even", 1),
        Nd = Xb({
            compile: function(a, b) {
                b.$set("ngCloak", c), a.removeClass("ng-cloak")
            }
        }),
        Od = [function() {
            return {
                scope: !0,
                controller: "@",
                priority: 500
            }
        }],
        Pd = {};
    f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
        var b = La("ng-" + a);
        Pd[b] = ["$parse", function(c) {
            return {
                compile: function(d, e) {
                    var f = c(e[b]);
                    return function(b, c, d) {
                        c.on(fc(a), function(a) {
                            b.$apply(function() {
                                f(b, {
                                    $event: a
                                })
                            })
                        })
                    }
                }
            }
        }]
    });
    var Qd = ["$animate", function(a) {
            return {
                transclude: "element",
                priority: 600,
                terminal: !0,
                restrict: "A",
                $$tlb: !0,
                link: function(c, d, e, f, g) {
                    var h, i;
                    c.$watch(e.ngIf, function(f) {
                        S(f) ? i || (i = c.$new(), g(i, function(c) {
                            c[c.length++] = b.createComment(" end ngIf: " + e.ngIf + " "), h = {
                                clone: c
                            }, a.enter(c, d.parent(), d)
                        })) : (i && (i.$destroy(), i = null), h && (a.leave(fa(h.clone)), h = null))
                    })
                }
            }
        }],
        Rd = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function(a, b, c, d, e) {
            return {
                restrict: "ECA",
                priority: 400,
                terminal: !0,
                transclude: "element",
                controller: sc.noop,
                compile: function(f, g) {
                    var h = g.ngInclude || g.src,
                        i = g.onload || "",
                        j = g.autoscroll;
                    return function(f, g, k, l, m) {
                        var n, o, p = 0,
                            q = function() {
                                n && (n.$destroy(), n = null), o && (d.leave(o), o = null)
                            };
                        f.$watch(e.parseAsResourceUrl(h), function(e) {
                            var h = function() {
                                    !s(j) || j && !f.$eval(j) || c()
                                },
                                k = ++p;
                            e ? (a.get(e, {
                                cache: b
                            }).success(function(a) {
                                if (k === p) {
                                    var b = f.$new();
                                    l.template = a;
                                    var c = m(b, function(a) {
                                        q(), d.enter(a, null, g, h)
                                    });
                                    n = b, o = c, n.$emit("$includeContentLoaded"), f.$eval(i)
                                }
                            }).error(function() {
                                k === p && q()
                            }), f.$emit("$includeContentRequested")) : (q(), l.template = null)
                        })
                    }
                }
            }
        }],
        Sd = ["$compile", function(a) {
            return {
                restrict: "ECA",
                priority: -400,
                require: "ngInclude",
                link: function(b, c, d, e) {
                    c.html(e.template), a(c.contents())(b)
                }
            }
        }],
        Td = Xb({
            priority: 450,
            compile: function() {
                return {
                    pre: function(a, b, c) {
                        a.$eval(c.ngInit)
                    }
                }
            }
        }),
        Ud = Xb({
            terminal: !0,
            priority: 1e3
        }),
        Vd = ["$locale", "$interpolate", function(a, b) {
            var c = /{}/g;
            return {
                restrict: "EA",
                link: function(d, e, g) {
                    var h = g.count,
                        i = g.$attr.when && e.attr(g.$attr.when),
                        j = g.offset || 0,
                        k = d.$eval(i) || {},
                        l = {},
                        m = b.startSymbol(),
                        n = b.endSymbol(),
                        o = /^when(Minus)?(.+)$/;
                    f(g, function(a, b) {
                        o.test(b) && (k[fc(b.replace("when", "").replace("Minus", "-"))] = e.attr(g.$attr[b]))
                    }), f(k, function(a, d) {
                        l[d] = b(a.replace(c, m + h + "-" + j + n))
                    }), d.$watch(function() {
                        var b = parseFloat(d.$eval(h));
                        return isNaN(b) ? "" : (b in k || (b = a.pluralCat(b - j)), l[b](d, e, !0))
                    }, function(a) {
                        e.text(a)
                    })
                }
            }
        }],
        Wd = ["$parse", "$animate", function(a, c) {
            function g(a) {
                return a.clone[0]
            }

            function h(a) {
                return a.clone[a.clone.length - 1]
            }
            var i = "$$NG_REMOVED",
                j = d("ngRepeat");
            return {
                transclude: "element",
                priority: 1e3,
                terminal: !0,
                $$tlb: !0,
                link: function(d, k, l, m, n) {
                    var o, p, q, r, s, t, u, v, w, x = l.ngRepeat,
                        y = x.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
                        z = {
                            $id: Ba
                        };
                    if (!y) throw j("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", x);
                    if (t = y[1], u = y[2], o = y[3], o ? (p = a(o), q = function(a, b, c) {
                            return w && (z[w] = a), z[v] = b, z.$index = c, p(d, z)
                        }) : (r = function(a, b) {
                            return Ba(b)
                        }, s = function(a) {
                            return a
                        }), y = t.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !y) throw j("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", t);
                    v = y[3] || y[1], w = y[2];
                    var A = {};
                    d.$watchCollection(u, function(a) {
                        var l, m, o, p, t, u, y, z, B, C, D, E, F = k[0],
                            G = {},
                            H = [];
                        if (e(a)) C = a, B = q || r;
                        else {
                            B = q || s, C = [];
                            for (u in a) a.hasOwnProperty(u) && "$" != u.charAt(0) && C.push(u);
                            C.sort()
                        }
                        for (p = C.length, m = H.length = C.length, l = 0; m > l; l++)
                            if (u = a === C ? l : C[l], y = a[u], z = B(u, y, l), da(z, "`track by` id"), A.hasOwnProperty(z)) D = A[z], delete A[z], G[z] = D, H[l] = D;
                            else {
                                if (G.hasOwnProperty(z)) throw f(H, function(a) {
                                    a && a.scope && (A[a.id] = a)
                                }), j("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}", x, z);
                                H[l] = {
                                    id: z
                                }, G[z] = !1
                            }
                        for (u in A) A.hasOwnProperty(u) && (D = A[u], E = fa(D.clone), c.leave(E), f(E, function(a) {
                            a[i] = !0
                        }), D.scope.$destroy());
                        for (l = 0, m = C.length; m > l; l++) {
                            if (u = a === C ? l : C[l], y = a[u], D = H[l], H[l - 1] && (F = h(H[l - 1])), D.scope) {
                                t = D.scope, o = F;
                                do o = o.nextSibling; while (o && o[i]);
                                g(D) != o && c.move(fa(D.clone), null, kc(F)), F = h(D)
                            } else t = d.$new();
                            t[v] = y, w && (t[w] = u), t.$index = l, t.$first = 0 === l, t.$last = l === p - 1, t.$middle = !(t.$first || t.$last), t.$odd = !(t.$even = 0 === (1 & l)), D.scope || n(t, function(a) {
                                a[a.length++] = b.createComment(" end ngRepeat: " + x + " "), c.enter(a, null, kc(F)), F = a, D.scope = t, D.clone = a, G[D.id] = D
                            })
                        }
                        A = G
                    })
                }
            }
        }],
        Xd = ["$animate", function(a) {
            return function(b, c, d) {
                b.$watch(d.ngShow, function(b) {
                    a[S(b) ? "removeClass" : "addClass"](c, "ng-hide")
                })
            }
        }],
        Yd = ["$animate", function(a) {
            return function(b, c, d) {
                b.$watch(d.ngHide, function(b) {
                    a[S(b) ? "addClass" : "removeClass"](c, "ng-hide")
                })
            }
        }],
        Zd = Xb(function(a, b, c) {
            a.$watch(c.ngStyle, function(a, c) {
                c && a !== c && f(c, function(a, c) {
                    b.css(c, "")
                }), a && b.css(a)
            }, !0)
        }),
        $d = ["$animate", function(a) {
            return {
                restrict: "EA",
                require: "ngSwitch",
                controller: ["$scope", function() {
                    this.cases = {}
                }],
                link: function(b, c, d, e) {
                    var g, h, i = d.ngSwitch || d.on,
                        j = [];
                    b.$watch(i, function(c) {
                        for (var i = 0, k = j.length; k > i; i++) j[i].$destroy(), a.leave(h[i]);
                        h = [], j = [], (g = e.cases["!" + c] || e.cases["?"]) && (b.$eval(d.change), f(g, function(c) {
                            var d = b.$new();
                            j.push(d), c.transclude(d, function(b) {
                                var d = c.element;
                                h.push(b), a.enter(b, d.parent(), d)
                            })
                        }))
                    })
                }
            }
        }],
        _d = Xb({
            transclude: "element",
            priority: 800,
            require: "^ngSwitch",
            link: function(a, b, c, d, e) {
                d.cases["!" + c.ngSwitchWhen] = d.cases["!" + c.ngSwitchWhen] || [], d.cases["!" + c.ngSwitchWhen].push({
                    transclude: e,
                    element: b
                })
            }
        }),
        ae = Xb({
            transclude: "element",
            priority: 800,
            require: "^ngSwitch",
            link: function(a, b, c, d, e) {
                d.cases["?"] = d.cases["?"] || [], d.cases["?"].push({
                    transclude: e,
                    element: b
                })
            }
        }),
        be = Xb({
            controller: ["$element", "$transclude", function(a, b) {
                if (!b) throw d("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", T(a));
                this.$transclude = b
            }],
            link: function(a, b, c, d) {
                d.$transclude(function(a) {
                    b.empty(), b.append(a)
                })
            }
        }),
        ce = ["$templateCache", function(a) {
            return {
                restrict: "E",
                terminal: !0,
                compile: function(b, c) {
                    if ("text/ng-template" == c.type) {
                        var d = c.id,
                            e = b[0].text;
                        a.put(d, e)
                    }
                }
            }
        }],
        de = d("ngOptions"),
        ee = q({
            terminal: !0
        }),
        fe = ["$compile", "$parse", function(a, d) {
            var e = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
                h = {
                    $setViewValue: o
                };
            return {
                restrict: "E",
                require: ["select", "?ngModel"],
                controller: ["$element", "$scope", "$attrs", function(a, b, c) {
                    var d, e, f = this,
                        g = {},
                        i = h;
                    f.databound = c.ngModel, f.init = function(a, b, c) {
                        i = a, d = b, e = c
                    }, f.addOption = function(b) {
                        da(b, '"option value"'), g[b] = !0, i.$viewValue == b && (a.val(b), e.parent() && e.remove())
                    }, f.removeOption = function(a) {
                        this.hasOption(a) && (delete g[a], i.$viewValue == a && this.renderUnknownOption(a))
                    }, f.renderUnknownOption = function(b) {
                        var c = "? " + Ba(b) + " ?";
                        e.val(c), a.prepend(e), a.val(c), e.prop("selected", !0)
                    }, f.hasOption = function(a) {
                        return g.hasOwnProperty(a)
                    }, b.$on("$destroy", function() {
                        f.renderUnknownOption = o
                    })
                }],
                link: function(h, i, j, k) {
                    function l(a, b, c, d) {
                        c.$render = function() {
                            var a = c.$viewValue;
                            d.hasOption(a) ? (z.parent() && z.remove(), b.val(a), "" === a && o.prop("selected", !0)) : r(a) && o ? b.val("") : d.renderUnknownOption(a)
                        }, b.on("change", function() {
                            a.$apply(function() {
                                z.parent() && z.remove(), c.$setViewValue(b.val())
                            })
                        })
                    }

                    function m(a, b, c) {
                        var d;
                        c.$render = function() {
                            var a = new Ca(c.$viewValue);
                            f(b.find("option"), function(b) {
                                b.selected = s(a.get(b.value))
                            })
                        }, a.$watch(function() {
                            K(d, c.$viewValue) || (d = I(c.$viewValue), c.$render())
                        }), b.on("change", function() {
                            a.$apply(function() {
                                var a = [];
                                f(b.find("option"), function(b) {
                                    b.selected && a.push(b.value)
                                }), c.$setViewValue(a)
                            })
                        })
                    }

                    function n(b, f, h) {
                        function i() {
                            var a, c, d, e, i, j, q, u, A, B, C, D, E, F, G, H = {
                                    "": []
                                },
                                I = [""],
                                J = h.$modelValue,
                                K = p(b) || [],
                                L = m ? g(K) : K,
                                M = {},
                                N = !1;
                            if (t)
                                if (r && x(J)) {
                                    N = new Ca([]);
                                    for (var O = 0; O < J.length; O++) M[l] = J[O], N.put(r(b, M), J[O])
                                } else N = new Ca(J);
                            for (C = 0; A = L.length, A > C; C++) {
                                if (q = C, m) {
                                    if (q = L[C], "$" === q.charAt(0)) continue;
                                    M[m] = q
                                }
                                if (M[l] = K[q], a = n(b, M) || "", (c = H[a]) || (c = H[a] = [], I.push(a)), t) D = s(N.remove(r ? r(b, M) : o(b, M)));
                                else {
                                    if (r) {
                                        var P = {};
                                        P[l] = J, D = r(b, P) === r(b, M)
                                    } else D = J === o(b, M);
                                    N = N || D
                                }
                                G = k(b, M), G = s(G) ? G : "", c.push({
                                    id: r ? r(b, M) : m ? L[C] : C,
                                    label: G,
                                    selected: D
                                })
                            }
                            for (t || (v || null === J ? H[""].unshift({
                                    id: "",
                                    label: "",
                                    selected: !N
                                }) : N || H[""].unshift({
                                    id: "?",
                                    label: "",
                                    selected: !0
                                })), B = 0, u = I.length; u > B; B++) {
                                for (a = I[B], c = H[a], z.length <= B ? (e = {
                                        element: y.clone().attr("label", a),
                                        label: c.label
                                    }, i = [e], z.push(i), f.append(e.element)) : (i = z[B], e = i[0], e.label != a && e.element.attr("label", e.label = a)), E = null, C = 0, A = c.length; A > C; C++) d = c[C], (j = i[C + 1]) ? (E = j.element, j.label !== d.label && E.text(j.label = d.label), j.id !== d.id && E.val(j.id = d.id), E[0].selected !== d.selected && E.prop("selected", j.selected = d.selected)) : ("" === d.id && v ? F = v : (F = w.clone()).val(d.id).attr("selected", d.selected).text(d.label), i.push(j = {
                                    element: F,
                                    label: d.label,
                                    id: d.id,
                                    selected: d.selected
                                }), E ? E.after(F) : e.element.append(F), E = F);
                                for (C++; i.length > C;) i.pop().element.remove()
                            }
                            for (; z.length > B;) z.pop()[0].element.remove()
                        }
                        var j;
                        if (!(j = u.match(e))) throw de("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", u, T(f));
                        var k = d(j[2] || j[1]),
                            l = j[4] || j[6],
                            m = j[5],
                            n = d(j[3] || ""),
                            o = d(j[2] ? j[1] : l),
                            p = d(j[7]),
                            q = j[8],
                            r = q ? d(j[8]) : null,
                            z = [
                                [{
                                    element: f,
                                    label: ""
                                }]
                            ];
                        v && (a(v)(b), v.removeClass("ng-scope"), v.remove()), f.empty(), f.on("change", function() {
                            b.$apply(function() {
                                var a, d, e, g, i, j, k, n, q, s = p(b) || [],
                                    u = {};
                                if (t) {
                                    for (e = [], j = 0, n = z.length; n > j; j++)
                                        for (a = z[j], i = 1, k = a.length; k > i; i++)
                                            if ((g = a[i].element)[0].selected) {
                                                if (d = g.val(), m && (u[m] = d), r)
                                                    for (q = 0; q < s.length && (u[l] = s[q], r(b, u) != d); q++);
                                                else u[l] = s[d];
                                                e.push(o(b, u))
                                            }
                                } else if (d = f.val(), "?" == d) e = c;
                                else if ("" === d) e = null;
                                else if (r) {
                                    for (q = 0; q < s.length; q++)
                                        if (u[l] = s[q], r(b, u) == d) {
                                            e = o(b, u);
                                            break
                                        }
                                } else u[l] = s[d], m && (u[m] = d), e = o(b, u);
                                h.$setViewValue(e)
                            })
                        }), h.$render = i, b.$watch(i)
                    }
                    if (k[1]) {
                        for (var o, p = k[0], q = k[1], t = j.multiple, u = j.ngOptions, v = !1, w = kc(b.createElement("option")), y = kc(b.createElement("optgroup")), z = w.clone(), A = 0, B = i.children(), C = B.length; C > A; A++)
                            if ("" === B[A].value) {
                                o = v = B.eq(A);
                                break
                            }
                        p.init(q, v, z), t && (q.$isEmpty = function(a) {
                            return !a || 0 === a.length
                        }), u ? n(h, i, q) : t ? m(h, i, q) : l(h, i, q, p)
                    }
                }
            }
        }],
        ge = ["$interpolate", function(a) {
            var b = {
                addOption: o,
                removeOption: o
            };
            return {
                restrict: "E",
                priority: 100,
                compile: function(c, d) {
                    if (r(d.value)) {
                        var e = a(c.text(), !0);
                        e || d.$set("value", c.text())
                    }
                    return function(a, c, d) {
                        var f = "$selectController",
                            g = c.parent(),
                            h = g.data(f) || g.parent().data(f);
                        h && h.databound ? c.prop("selected", !1) : h = b, e ? a.$watch(e, function(a, b) {
                            d.$set("value", a), a !== b && h.removeOption(b), h.addOption(a)
                        }) : h.addOption(d.value), c.on("$destroy", function() {
                            h.removeOption(d.value)
                        })
                    }
                }
            }
        }],
        he = q({
            restrict: "E",
            terminal: !0
        });
    aa(), ha(sc), kc(b).ready(function() {
        Z(b, $)
    })
}(window, document), !angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}</style>'),
    function(a, b, c) {
        function d() {
            function a(a, c) {
                return b.extend(new(b.extend(function() {}, {
                    prototype: a
                })), c)
            }

            function c(a, b) {
                var c = b.caseInsensitiveMatch,
                    d = {
                        originalPath: a,
                        regexp: a
                    },
                    e = d.keys = [];
                return a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?|\*])?/g, function(a, b, c, d) {
                    var f = "?" === d ? d : null,
                        g = "*" === d ? d : null;
                    return e.push({
                        name: c,
                        optional: !!f
                    }), b = b || "", "" + (f ? "" : b) + "(?:" + (f ? b : "") + (g && "(.+?)" || "([^/]+)") + (f || "") + ")" + (f || "")
                }).replace(/([\/$\*])/g, "\\$1"), d.regexp = new RegExp("^" + a + "$", c ? "i" : ""), d
            }
            var d = {};
            this.when = function(a, e) {
                if (d[a] = b.extend({
                        reloadOnSearch: !0
                    }, e, a && c(a, e)), a) {
                    var f = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
                    d[f] = b.extend({
                        redirectTo: a
                    }, c(f, e))
                }
                return this
            }, this.otherwise = function(a) {
                return this.when(null, a), this
            }, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce", function(c, e, f, g, h, i, j, k) {
                function l(a, b) {
                    var c = b.keys,
                        d = {};
                    if (!b.regexp) return null;
                    var e = b.regexp.exec(a);
                    if (!e) return null;
                    for (var f = 1, g = e.length; g > f; ++f) {
                        var h = c[f - 1],
                            i = "string" == typeof e[f] ? decodeURIComponent(e[f]) : e[f];
                        h && i && (d[h.name] = i)
                    }
                    return d
                }

                function m() {
                    var a = n(),
                        d = q.current;
                    a && d && a.$$route === d.$$route && b.equals(a.pathParams, d.pathParams) && !a.reloadOnSearch && !p ? (d.params = a.params, b.copy(d.params, f), c.$broadcast("$routeUpdate", d)) : (a || d) && (p = !1, c.$broadcast("$routeChangeStart", a, d), q.current = a, a && a.redirectTo && (b.isString(a.redirectTo) ? e.path(o(a.redirectTo, a.params)).search(a.params).replace() : e.url(a.redirectTo(a.pathParams, e.path(), e.search())).replace()), g.when(a).then(function() {
                        if (a) {
                            var c, d, e = b.extend({}, a.resolve);
                            return b.forEach(e, function(a, c) {
                                e[c] = b.isString(a) ? h.get(a) : h.invoke(a)
                            }), b.isDefined(c = a.template) ? b.isFunction(c) && (c = c(a.params)) : b.isDefined(d = a.templateUrl) && (b.isFunction(d) && (d = d(a.params)), d = k.getTrustedResourceUrl(d), b.isDefined(d) && (a.loadedTemplateUrl = d, c = i.get(d, {
                                cache: j
                            }).then(function(a) {
                                return a.data
                            }))), b.isDefined(c) && (e.$template = c), g.all(e)
                        }
                    }).then(function(e) {
                        a == q.current && (a && (a.locals = e, b.copy(a.params, f)), c.$broadcast("$routeChangeSuccess", a, d))
                    }, function(b) {
                        a == q.current && c.$broadcast("$routeChangeError", a, d, b)
                    }))
                }

                function n() {
                    var c, f;
                    return b.forEach(d, function(d, g) {
                        !f && (c = l(e.path(), d)) && (f = a(d, {
                            params: b.extend({}, e.search(), c),
                            pathParams: c
                        }), f.$$route = d)
                    }), f || d[null] && a(d[null], {
                        params: {},
                        pathParams: {}
                    })
                }

                function o(a, c) {
                    var d = [];
                    return b.forEach((a || "").split(":"), function(a, b) {
                        if (0 === b) d.push(a);
                        else {
                            var e = a.match(/(\w+)(.*)/),
                                f = e[1];
                            d.push(c[f]), d.push(e[2] || ""), delete c[f]
                        }
                    }), d.join("")
                }
                var p = !1,
                    q = {
                        routes: d,
                        reload: function() {
                            p = !0, c.$evalAsync(m)
                        }
                    };
                return c.$on("$locationChangeSuccess", m), q
            }]
        }

        function e() {
            this.$get = function() {
                return {}
            }
        }

        function f(a, c, d) {
            return {
                restrict: "ECA",
                terminal: !0,
                priority: 400,
                transclude: "element",
                link: function(e, f, g, h, i) {
                    function j() {
                        l && (l.$destroy(), l = null), m && (d.leave(m), m = null)
                    }

                    function k() {
                        var g = a.current && a.current.locals,
                            h = g && g.$template;
                        if (b.isDefined(h)) {
                            var k = e.$new(),
                                p = a.current,
                                q = i(k, function(a) {
                                    d.enter(a, null, m || f, function() {
                                        !b.isDefined(n) || n && !e.$eval(n) || c()
                                    }), j()
                                });
                            m = q, l = p.scope = k, l.$emit("$viewContentLoaded"), l.$eval(o)
                        } else j()
                    }
                    var l, m, n = g.autoscroll,
                        o = g.onload || "";
                    e.$on("$routeChangeSuccess", k), k()
                }
            }
        }

        function g(a, b, c) {
            return {
                restrict: "ECA",
                priority: -400,
                link: function(d, e) {
                    var f = c.current,
                        g = f.locals;
                    e.html(g.$template);
                    var h = a(e.contents());
                    if (f.controller) {
                        g.$scope = d;
                        var i = b(f.controller, g);
                        f.controllerAs && (d[f.controllerAs] = i), e.data("$ngControllerController", i), e.children().data("$ngControllerController", i)
                    }
                    h(d)
                }
            }
        }
        var h = b.module("ngRoute", ["ng"]).provider("$route", d);
        h.provider("$routeParams", e), h.directive("ngView", f), h.directive("ngView", g), f.$inject = ["$route", "$anchorScroll", "$animate"], g.$inject = ["$compile", "$controller", "$route"]
    }(window, window.angular),
    
    angular.module("ngProgress.provider", ["ngProgress.directive"]).provider("ngProgress", function() {
        this.autoStyle = !0, this.count = 0, this.height = "2px", this.color = "firebrick", this.$get = ["$document", "$window", "$compile", "$rootScope", "$timeout", function(a, b, c, d, e) {
            var f = this.count,
                g = this.height,
                h = this.color,
                i = d,
                j = a.find("body")[0],
                k = c("<ng-progress></ng-progress>")(i);
            j.appendChild(k[0]), i.count = f, void 0 !== g && k.eq(0).children().css("height", g), void 0 !== h && (k.eq(0).children().css("background-color", h), k.eq(0).children().css("color", h));
            var l, m = 0;
            return {
                start: function() {
                    this.show();
                    var a = this;
                    clearInterval(m), m = setInterval(function() {
                        if (isNaN(f)) clearInterval(m), f = 0, a.hide();
                        else {
                            var b = 100 - f;
                            f += .15 * Math.pow(1 - Math.sqrt(b), 2), a.updateCount(f)
                        }
                    }, 200)
                },
                updateCount: function(a) {
                    i.count = a, i.$$phase || i.$apply()
                },
                height: function(a) {
                    return void 0 !== a && (g = a, i.height = g, i.$$phase || i.$apply()), g
                },
                color: function(a) {
                    return void 0 !== a && (h = a, i.color = h, i.$$phase || i.$apply()), h
                },
                hide: function() {
                    k.children().css("opacity", "0");
                    var a = this;
                    a.animate(function() {
                        k.children().css("width", "0%"), a.animate(function() {
                            a.show()
                        }, 500)
                    }, 500)
                },
                show: function() {
                    var a = this;
                    a.animate(function() {
                        k.children().css("opacity", "1")
                    }, 100)
                },
                animate: function(a, b) {
                    l && e.cancel(l), l = e(a, b)
                },
                status: function() {
                    return f
                },
                stop: function() {
                    clearInterval(m)
                },
                set: function(a) {
                    return this.show(), this.updateCount(a), f = a, clearInterval(m), f
                },
                css: function(a) {
                    return k.children().css(a)
                },
                reset: function() {
                    return clearInterval(m), f = 0, this.updateCount(f), 0
                },
                complete: function() {
                    f = 100, this.updateCount(f);
                    var a = this;
                    return clearInterval(m), e(function() {
                        a.hide(), e(function() {
                            f = 0, a.updateCount(f)
                        }, 500)
                    }, 1e3), f
                },
                setParent: function(a) {
                    if (null === a || void 0 === a) throw new Error("Provide a valid parent of type HTMLElement");
                    null !== j && void 0 !== j && j.removeChild(k[0]), j = a, j.appendChild(k[0])
                },
                getDomElement: function() {
                    return k
                }
            }
        }], this.setColor = function(a) {
            return void 0 !== a && (this.color = a), this.color
        }, this.setHeight = function(a) {
            return void 0 !== a && (this.height = a), this.height
        }
    }), angular.module("ngProgress.directive", []).directive("ngProgress", ["$window", "$rootScope", function(a, b) {
        var c = {
            replace: !0,
            restrict: "E",
            link: function(a, c, d, e) {
                b.$watch("count", function(b) {
                    (void 0 !== b || null !== b) && (a.counter = b, c.eq(0).children().css("width", b + "%"))
                }), b.$watch("color", function(b) {
                    (void 0 !== b || null !== b) && (a.color = b, c.eq(0).children().css("background-color", b), c.eq(0).children().css("color", b))
                }), b.$watch("height", function(b) {
                    (void 0 !== b || null !== b) && (a.height = b, c.eq(0).children().css("height", b))
                })
            },
            template: '<div id="ngProgress-container"><div id="ngProgress"></div></div>'
        };
        return c
    }]), angular.module("ngProgress", ["ngProgress.directive", "ngProgress.provider"]);
var app = angular.module("paytm-oauth", ["ngRoute", "ngProgress"]);
app.config(["$routeProvider", function(a) {
    function b(a) {
        var b = document.getElementById("current-form"),
            c = b.getAttribute("data-type");
        return a == c ? b.innerHTML : void 0
    }

    function c(a) {
        var b = "",
            c = String(window.location.href);
        switch (c = c.slice(c.indexOf("?"), c.indexOf("#")), a) {
            case "login":
                b = "/oauth2/authorize" + c + "&templ=true";
                break;
            case "signup":
                b = "/register" + c + "&templ=true";
                break;
            case "forgotPassword":
                b = "/forgetwPass" + c
        }
        return b
    }

    function d() {
        var a = document.getElementById("current-form"),
            b = a.getAttribute("data-type");
        return b
    }
    a.when("/", {
        redirectTo: d
    }).when("/otp/:redirectFrom", {
        templateUrl: "/pages/themesv2/templates/loginOtp.html",
        controller: "loginOtpController"
    }).when("/forgetPassword", {
        templateUrl: c("forgotPassword"),
        controller: "forgetPasswordController"
    }).when("/changePassword", {
        templateUrl: "/pages/themesv2/templates/changePassword.html",
        controller: "changePasswordController"
    }).when("/login", {
        template: b("login"),
        templateUrl: c("login"),
        controller: "loginController"
    }).when("/signup", {
        template: b("signup"),
        templateUrl: c("signup"),
        controller: "signupController"
    }).when("/signupVerify", {
        templateUrl: "/pages/themesv2/templates/signup_verify.html",
        controller: "signupVerifyController"
    }).otherwise({
        redirectTo: "/"
    })
}]), app.run(["$rootScope", "$templateCache", "ngProgress", function(a, b, c) {
    a.$on("$routeChangeStart", function(a, d, e) {
        c.start(), e && "/forgetPassword" == e.originalPath && b.remove(e.templateUrl)
    }), a.$on("$routeChangeSuccess", function(a, b, d) {
        c.complete()
    }), c.color("#00D7FF")
}]), app.constant("CLIENT_CONFIGURATION", {
    loginHi: {
        pg: {
            otpOptionAvailable: !0,
            showImage: !0,
            showWalletContainer: !1,
            showKnowMoreOtpContainer: !0,
            isLeftAlignBack: !0,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Secure Sign In",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "",
                imagePath: ""
            }
        },
        "mp-web": {
            otpOptionAvailable: !1,
            showImage: !1,
            showWalletContainer: !0,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Login",
                TandCText: "T&C"
            },
            header: {
                text: "",
                imagePath: ""
            }
        },
        "pg-dishtv": {
            otpOptionAvailable: !1,
            showImage: !0,
            showWalletContainer: !1,
            isLeftAlignBack: !0,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Secure Sign In",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "",
                imagePath: "/pages/themesv2/images/pg-dishtv/dishtv-logo.png"
            }
        },
        airtelhi: {
            otpOptionAvailable: !1,
            showImage: !0,
            showWalletContainer: !1,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Secure Sign In",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "To pay via Net Banking, Credit Card, Debit Card, or Paytm wallet, please sign in",
                imagePath: "",
                isExternal: !0
            }
        },
        "mp-html5": {
            otpOptionAvailable: !1,
            showImage: !1,
            showWalletContainer: !1,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Secure Sign In",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "Sign In To Paytm",
                imagePath: "",
                isExternal: !0
            }
        },
        "mp-merchant": {
            otpOptionAvailable: !1,
            showImage: !1,
            showWalletContainer: !0,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Login",
                TandCText: "T&C"
            },
            header: {
                text: "",
                imagePath: ""
            }
        },
        web: {
            otpOptionAvailable: !1,
            showImage: !1,
            showWalletContainer: !0,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Login",
                TandCText: "T&C"
            },
            header: {
                text: "",
                imagePath: ""
            }
        },
        html5: {
            otpOptionAvailable: !1,
            showImage: !1,
            showWalletContainer: !1,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Secure Sign In",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "Sign In To Paytm",
                imagePath: "",
                isExternal: !0
            }
        },
        pwp: {
            otpOptionAvailable: !1,
            showImage: !1,
            showWalletContainer: !1,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Secure Sign In",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "You need a Paytm account to pay!",
                imagePath: "/pages/themesv2/images/pwp/paytm-logo.png"
            }
        },
        "pwp-web": {
            otpOptionAvailable: !1,
            showImage: !1,
            showWalletContainer: !1,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Secure Sign In",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "You need a Paytm account to pay!",
                imagePath: "/pages/themesv2/images/pwp/paytm-logo.png"
            }
        },
        "pg-ndtv": {
            otpOptionAvailable: !1,
            showImage: !0,
            showWalletContainer: !1,
            isLeftAlignBack: !0,
            text: {
                loginLink: "Login",
                signupLink: "Signup",
                loginBtnText: "Secure Sign In",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "",
                imagePath: "/pages/themesv2/images/pg-ndtv/gadgets360_retina.png"
            }
        }
    },
    signUpHi: {
        pg: {
            showWalletContainer: !1,
            showImage: !0,
            text: {
                signupBtnText: "Signup",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "",
                imagePath: ""
            }
        },
        "mp-web": {
            showWalletContainer: !0,
            showImage: !1,
            text: {
                signupBtnText: "Signup",
                TandCText: "T&C"
            },
            header: {
                text: "",
                imagePath: ""
            }
        },
        "pg-dishtv": {
            showWalletContainer: !1,
            showImage: !0,
            text: {
                signupBtnText: "Signup",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "",
                imagePath: "/pages/themesv2/images/pg-dishtv/dishtv-logo.png"
            }
        },
        "mp-html5": {
            showWalletContainer: !1,
            showImage: !1,
            text: {
                signupBtnText: "Signup",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "Sign Up To Paytm",
                imagePath: "",
                isExternal: !0
            }
        },
        airtelhi: {
            showWalletContainer: !1,
            showImage: !0,
            text: {
                signupBtnText: "Signup",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "To pay via Net Banking, Credit Card, Debit Card, or Paytm wallet, please sign in",
                imagePath: "",
                isExternal: !0
            }
        },
        "mp-merchant": {
            showWalletContainer: !0,
            showImage: !1,
            text: {
                signupBtnText: "Signup",
                TandCText: "T&C"
            },
            header: {
                text: "",
                imagePath: ""
            }
        },
        web: {
            showWalletContainer: !0,
            showImage: !1,
            text: {
                signupBtnText: "Signup",
                TandCText: "T&C"
            },
            header: {
                text: "",
                imagePath: ""
            }
        },
        html5: {
            showWalletContainer: !1,
            showImage: !1,
            text: {
                signupBtnText: "Signup",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "Sign Up To Paytm",
                imagePath: "",
                isExternal: !0
            }
        },
        pwp: {
            otpOptionAvailable: !1,
            showImage: !1,
            showWalletContainer: !1,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Secure Sign In",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "You need a Paytm account to pay!",
                imagePath: "/pages/themesv2/images/pwp/paytm-logo.png"
            }
        },
        "pwp-web": {
            otpOptionAvailable: !1,
            showImage: !1,
            showWalletContainer: !1,
            text: {
                loginLink: "Login to Paytm Wallet",
                signupLink: "Sign Up for Paytm Wallet",
                loginBtnText: "Secure Sign In",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "You need a Paytm account to pay!",
                imagePath: "/pages/themesv2/images/pwp/paytm-logo.png"
            }
        },
        "pg-ndtv": {
            showWalletContainer: !1,
            showImage: !0,
            text: {
                signupBtnText: "Signup",
                TandCText: "Terms & Conditions"
            },
            header: {
                text: "",
                imagePath: "/pages/themesv2/images/pg-ndtv/gadgets360_retina.png"
            }
        }
    }
}), app.filter("isMobile", function() {
    return function(a) {
        return /^\d+$/.test(a)
    }
}),
angular.module("paytm-oauth").controller("loginController", ["$scope", "$window", "$location", "$rootScope", "$timeout", "CLIENT_CONFIGURATION", "backendService", "helperService", "shareDataService", loginController]),
angular.module("paytm-oauth").controller("loginOtpController", ["$scope", "$window", "$location", "$routeParams", "CLIENT_CONFIGURATION", "backendService", "shareDataService", loginOtpController]),
angular.module("paytm-oauth").controller("forgetPasswordController", ["$scope", "$location", "$rootScope", "CLIENT_CONFIGURATION", "backendService", "shareDataService", "helperService", forgetPasswordController]), 
angular.module("paytm-oauth").controller("changePasswordController", ["$scope", "$location", "$timeout", "CLIENT_CONFIGURATION", "backendService", "shareDataService", changePasswordController]),
angular.module("paytm-oauth").controller("signupController", ["$scope", "$rootScope", "$location", "$window", "$timeout", "CLIENT_CONFIGURATION", "helperService", "backendService", "shareDataService", signupController]), 
angular.module("paytm-oauth").controller("signupVerifyController", ["$scope", "$location", "$window", "CLIENT_CONFIGURATION", "helperService", "backendService", "shareDataService", signupVerifyController]), 
angular.module("paytm-oauth").controller("verifyLoginOtpController", ["$scope", "$element", "$timeout", "CLIENT_CONFIGURATION", "shareDataService", "backendService", verifyLoginOtpController]), 
angular.module("paytm-oauth").directive("emailValidate", [function() {
    return {
        require: "ngModel",
        link: function(a, b, c, d) {
            b.on("blur", function(c) {
                a.$apply(function() {
                    b.val() && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(b.val()) ? d.$setValidity("emailValid", !0) : d.$setValidity("emailValid", !1))
                })
            }), b.on("focus", function(b) {
                a.$apply(function() {
                    d.$setValidity("emailValid", !0)
                })
            })
        }
    }
}]),

angular.module("paytm-oauth").directive("mobileValidate", [function() {
    return {
        require: "ngModel",
        link: function(a, b, c, d) {
            b.on("keydown", function(c) {
                var d = a.sessionData.email;
                /^\d+$/.test(d) ? b.prop("maxLength", "10") : b.prop("maxLength", "100")
            }), b.on("blur", function(c) {
                a.$apply(function() {
                    /^\d+/.test(b.val()) && (/^[57-9]{1}[0-9]{9}$/.test(b.val()) ? d.$setValidity("mobileValid", !0) : d.$setValidity("mobileValid", !1))
                })
            }), b.on("focus", function(a) {
                d.$setValidity("mobileValid", !0)
            })
        }
    }
}]),

angular.module("paytm-oauth").directive("numberOnly", [function() {
    return {
        require: "ngModel",
        link: function(a, b, c, d) {
            function e(a) {
                if (a) {
                    var b = a.replace(/[^0-9]/g, "");
                    return b !== a && (d.$setViewValue(b), d.$render()), 0 == b.length && d.$setPristine(), b
                }
                return void 0
            }
            d.$parsers.push(e);
            var f = c.numberOnly || "mobile";
            "otp" == f && d.$setValidity("otpValid", !0), b.on("blur", function(c) {
                0 != b.val().length && a.$apply(function() {
                    "otp" == f ? 6 != b.val().length ? d.$setValidity("otpValid", !1) : d.$setValidity("otpValid", !0) : /^[57-9]{1}[0-9]{9}$/.test(b.val()) ? d.$setValidity("mobileValid", !0) : d.$setValidity("mobileValid", !1)
                })
            }), b.on("focus", function(b) {
                a.$apply(function() {
                    "otp" == f ? d.$setValidity("otpValid", !0) : d.$setValidity("mobileValid", !0)
                })
            })
        }
    }
}]),

angular.module("paytm-oauth").directive("includeTemplate", function() {
    return {
        restrict: "AE",
        templateUrl: function(a, b) {
            return b.templatePath
        },
        controller: "@",
        name: "ctrl"
    }
}), 

angular.module("paytm-oauth").factory("shareDataService", function() {
    var a = "Oops..something is wrong here. If this issue persists, please contact us at care@paytm.com. Thank you for your patience",
        b = "To pay via Credit Card, please sign in",
        c = !0,
        d = "";
    return {
        getMessage: function() {
            return this.otpMessage
        },
        setMessage: function(a) {
            this.otpMessage = a
        },
        getForgotPasswordConfirmationMessage: function() {
            return this.forgotPassConfMessage
        },
        setForgotPasswordConfirmationMessage: function(a) {
            this.forgotPassConfMessage = a
        },
        setCodeForgotPassword: function(a) {
            this.codeForgotPassword = a
        },
        getCodeForgotPassword: function() {
            return this.codeForgotPassword
        },
        getAjaxErrorMessage: function() {
            return a
        },
        getSignupData: function() {
            return this.signupData
        },
        setSignupData: function(a) {
            this.signupData = a
        },
        getAirtelCustomHeaderMessage: function() {
            return b
        },
        getIsMobileRegistered: function() {
            return c
        },
        setIsMobileRegistered: function(a) {
            c = a
        },
        getMaskEmail: function() {
            return d
        },
        setMaskEmail: function(a) {
            d = a
        }
    }
}), 

angular.module("paytm-oauth").service("helperService", function() {
    function a(a) {
        for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
            for (var e = c[d];
                " " == e.charAt(0);) e = e.substring(1, e.length);
            if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
        }
        return null
    }
    this.getParameterByName = function(a) {
        a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var b = new RegExp("[\\?&]" + a + "=([^&#]*)"),
            c = b.exec(location.search);
        return null == c ? "" : decodeURIComponent(c[1].replace(/\+/g, " "))
    }, this.initialise = function() {
        var b = this.getParameterByName("device");
        b ? document.cookie = "device=" + b + "; path=/" : b = a("device")
    }, this.mobileRgx = function(a) {
        return /^[57-9]{1}[0-9]{9}$/.test(a)
    }, this.emailRgx = function(a) {
        return /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*(\+[_A-Za-z0-9-]+){0,1}@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(a)
    }, this.isMobile = function(a) {
        return /^\d+$/.test(a)
    }
}),

angular.module("paytm-oauth").service("backendService", ["$http", "helperService", function(a, b) {
    return {
        generateOtp: function(c, d, e) {
            var f, g, h, i, j, k, l = "/login/otp";
            f = b.getParameterByName("response_type"),
            g = b.getParameterByName("redirect_uri"),
            i = b.getParameterByName("scope"),
            h = b.getParameterByName("state"), 
            j = b.getParameterByName("theme"), 
            k = b.getParameterByName("client_id");
            var m = {
                    data: c,
                    redirectUri: g,
                    clientId: k,
                    scope: i,
                    loginData: h,
                    responseType: f,
                    theme: j,
                    doNotRedirect: !1
                },
                n = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
            a.post(l, m, n).success(d).error(e)
        },
        resendOtpForgotPassword: function(b, c, d, e, f) {
            var g = "/api/forgetPass",
                h = {
                    email: b,
                    sendotp: c,
                    csrfToken: d
                },
                i = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
            a.post(g, h, i).success(e).error(f)
        },
        verifyOtp: function(b, c, d, e) {
            var f;
            f = "login" == c ? "/login/validate/otp" : "/api/forgetPass/validateOtp";
            var g = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            a.post(f, b, g).success(d).error(e)
        },
        forgotPassword: function(b, c, d, e, f) {
            var g = "/api/forgetPasswordWeb",
                h = {
                    email: b,
                    sendotp: c,
                    csrfToken: d
                },
                i = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
            a.post(g, h, i).success(e).error(f)
        },
        changePassword: function(b, c, d) {
            var e = "/api/resetPassword",
                f = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
            a.post(e, b, f).success(c).error(d)
        },
        register: function(c, d, e, f, g, h, i) {
            var j, k, l, m, n, o, g, p = "/v2/api/register";
            j = b.getParameterByName("response_type"),
            k = b.getParameterByName("redirect_uri"),
            m = b.getParameterByName("scope"),
            l = b.getParameterByName("state"), 
            n = b.getParameterByName("theme"), 
            o = b.getParameterByName("client_id"),
            c = c || "";
            var q = {
                    email: c,
                    mobile: d,
                    loginPassword: e,
                    csrfToken: f,
                    redirectUri: k,
                    clientId: o,
                    scope: m,
                    state: l,
                    responseType: j,
                    theme: n,
                    dob_agreement: g
                },
                r = b.getParameterByName("channel");
            r && (q.channel = r);
            var s = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            a.post(p, q, s).success(h).error(i)
        },
        registerVerify: function(b, c, d, e, f, g) {
            var h = "/v2/api/register/validate",
                i = {
                    otp: b,
                    signupToken: c,
                    csrfToken: d,
                    userData: e
                },
                j = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
            a.post(h, i, j).success(f).error(g)
        },
        resendOtp: function(b, c, d) {
            var e = "/v2/api/register/resendOtp",
                f = {
                    signupToken: b
                },
                g = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
            a.post(e, f, g).success(c).error(d)
        },
        resendOtpLoginFlow: function(b, c, d) {
            var e = "/login/resend/otp",
                f = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
            a.post(e, b, f).success(c).error(d)
        }
    }
}]);