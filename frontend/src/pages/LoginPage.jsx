import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // ── Auto-redirect if session already exists ──────────────────────────────
  useEffect(() => {
    const session =
      localStorage.getItem("alws_session") ||
      sessionStorage.getItem("alws_session") ||
      localStorage.getItem("token");
    if (session) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  // View states
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Common Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign Up specifically
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [courseBranch, setCourseBranch] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      setIsLoading(true);
      try {
        const response = await api.post("/auth/login", { email, password });

        if (response.data) {
          const sessionData = {
            firstName: response.data.user?.firstName || email.split("@")[0],
            lastName: response.data.user?.lastName || "",
            email: response.data.user?.email || email,
            username:
              response.data.user?.email?.split("@")[0] || email.split("@")[0],
            token: response.data.token,
            role: response.data.user?.role || "user",
            password: password,
          };

          if (rememberMe) {
            localStorage.setItem("alws_session", JSON.stringify(sessionData));
          } else {
            sessionStorage.setItem("alws_session", JSON.stringify(sessionData));
          }

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          navigate("/dashboard", { replace: true });
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Network error. Please try again.",
        );
        console.error("Login error:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      setSuccessMsg("");
      try {
        const response = await api.post("/auth/register", {
          firstName,
          lastName,
          email,
          courseBranch,
          password,
        });

        if (response.data) {
          setSuccessMsg("Registration successful! Redirecting to login...");
          setTimeout(() => {
            setIsLogin(true);
            setSuccessMsg("");
            setError("");
            // Clear form
            setFirstName("");
            setLastName("");
            setEmail("");
            setCourseBranch("");
            setPassword("");
          }, 2000);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Network error. Please try again.",
        );
        console.error("Registration error:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex bg-surface-container-lowest font-body selection:bg-secondary/30 overflow-hidden relative">
      {/* --- Rich Background Elements --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 120, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-tertiary/10 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(1,14,36,0.5)_100%)]" />
      </div>

      {/* --- Left Panel: Hero Section (Visible on LG screens) --- */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-surface-container-lowest">
        {/* Hero Image with Overlay */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/assets/login_hero.png"
            alt="Student using ALWS"
            className="w-full h-full object-cover"
          />
          {/* Enhanced Overlay for better legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/30 to-surface-container-lowest/70" />
        </motion.div>

        {/* Branding Content - Fixed Spacing to avoid overlap */}
        <div className="relative z-10 flex flex-col justify-between p-20 w-full h-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shadow-2xl shadow-secondary/40 ring-4 ring-secondary/10">
              <span
                className="material-symbols-outlined text-surface-container-lowest text-2xl font-bold"
                data-icon="hub"
              >
                hub
              </span>
            </div>
            <span className="text-3xl font-black text-white tracking-tight font-headline">
              ALWS
            </span>
          </motion.div>

          <div className="space-y-8 mt-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="text-7xl font-black text-white leading-[0.9] font-headline tracking-tighter">
                Master your <br />
                <span className="bg-gradient-to-r from-secondary via-tertiary to-secondary bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x">
                  future.
                </span>
              </h1>
              <div className="h-1.5 w-24 bg-gradient-to-r from-secondary to-tertiary rounded-full shadow-[0_0_20px_rgba(65,228,192,0.4)]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl text-on-surface-variant max-w-md leading-relaxed font-medium"
            >
              The world's first adaptive learning and wellbeing system designed
              specifically for the next generation of achievers.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5 }}
            className="text-xs text-slate-400 capitalize tracking-widest font-bold flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Empowering Student Wellbeing & Learning
          </motion.div>
        </div>
      </div>

      {/* --- Right Panel: Auth Container --- */}
      <div className="w-full lg:w-[55%] flex flex-col bg-transparent relative z-10 overflow-y-auto custom-scrollbar">
        {/* Top Header - Mode Toggle */}
        <div className="flex justify-between items-center p-8">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <span
                className="material-symbols-outlined text-white text-lg"
                data-icon="hub"
              >
                hub
              </span>
            </div>
            <span className="font-black text-slate-800">ALWS</span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-sm ml-auto"
          >
            <span className="text-on-surface-variant font-medium">
              {isLogin ? "Not a member?" : "Already have an account?"}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-white hover:text-secondary transition-all px-4 py-2 rounded-xl bg-surface-container-high/50 hover:bg-surface-container-highest border border-outline-variant/30 backdrop-blur-md"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex items-center justify-center px-6 sm:px-16 lg:px-24 py-10">
          <div className="w-full max-w-[480px]">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3 bg-surface-container/40 p-10 rounded-[2.5rem] border border-outline-variant/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />

                  <div className="space-y-2 relative z-10">
                    <h2 className="text-5xl font-black text-white font-headline tracking-tighter">
                      Sign In
                    </h2>
                    <p className="text-on-surface-variant font-medium text-lg">
                      Access your personalized learning dashboard.
                    </p>
                  </div>

                  {/* Social Logins - Systematic & Premium */}
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white/5 border border-outline-variant/20 hover:bg-white/10 hover:border-outline-variant/40 transition-all group backdrop-blur-sm">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="text-sm font-bold text-white/90">
                        Google
                      </span>
                    </button>
                    <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white text-black hover:bg-white/90 transition-all group shadow-lg shadow-white/10">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.96.95-2.3 1.72-3.73 1.72-1.43 0-2.45-.6-3.41-.6s-2.03.6-3.41.6c-1.43 0-2.77-.77-3.73-1.72C1.43 18.23 0 15.11 0 12.04c0-3.07 1.48-6.19 2.77-7.14C4.1 3.95 5.58 3.23 7.01 3.23c1.43 0 2.45.6 3.41.6s2.03-.6 3.41-.6c1.43 0 2.91.72 4.24 1.67 1.29.95 2.77 4.07 2.77 7.14 0 3.07-1.43 6.19-3.79 8.24zM12 3c0-1.61.64-3 1.61-3.97.97-.97 2.36-1.61 3.97-1.61.12 1.61-.52 3-1.49 4.1-.97.97-2.36 1.61-3.97 1.61-.12-1.61-.12-1.61-.12-1.61z" />
                      </svg>
                      <span className="text-sm font-bold">Apple ID</span>
                    </button>
                  </div>

                  <div className="relative flex items-center justify-center py-2 relative z-10">
                    <div className="absolute w-full border-t border-outline-variant/10"></div>
                    <span className="relative bg-[#010e24] px-4 text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em]">
                      Or login with email
                    </span>
                  </div>

                  <form
                    onSubmit={handleAuth}
                    className="relative z-10 space-y-5"
                  >
                    <div className="space-y-2">
                      <label
                        className="text-[12px] font-bold text-on-surface-variant uppercase tracking-wider block ml-1"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <div className="group relative">
                        <input
                          id="email"
                          type="email"
                          required
                          className="w-full px-5 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all duration-300 text-white font-medium placeholder:text-on-surface-variant/40 backdrop-blur-sm"
                          placeholder="student@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <span
                          className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-secondary transition-colors text-[20px]"
                          data-icon="mail"
                        >
                          mail
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label
                          className="text-[12px] font-bold text-on-surface-variant uppercase tracking-wider block"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <a
                          href="#"
                          className="text-xs font-bold text-secondary hover:text-secondary-fixed transition-colors"
                        >
                          Forgot?
                        </a>
                      </div>
                      <div className="group relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          className="w-full px-5 py-4 bg-surface-container-high/40 border border-outline-variant/30 rounded-2xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary outline-none transition-all duration-300 text-white font-medium placeholder:text-on-surface-variant/40 backdrop-blur-sm"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-white transition-colors"
                        >
                          <span
                            className="material-symbols-outlined text-[20px]"
                            data-icon={
                              showPassword ? "visibility_off" : "visibility"
                            }
                          >
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-3 mt-1 ml-1">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={rememberMe}
                        onClick={() => setRememberMe((v) => !v)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          rememberMe
                            ? "bg-secondary border-secondary shadow-md shadow-secondary/30"
                            : "border-outline-variant/40 bg-surface-container-high/30"
                        }`}
                      >
                        {rememberMe && (
                          <span
                            className="material-symbols-outlined text-[14px] text-on-secondary font-black"
                            data-icon="check"
                          >
                            check
                          </span>
                        )}
                      </button>
                      <span className="text-sm font-medium text-on-surface-variant select-none">
                        Remember me on this device
                      </span>
                    </div>

                    <button
                      disabled={isLoading}
                      type="submit"
                      className={`w-full bg-secondary text-on-secondary py-4.5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-secondary/20 ${isLoading ? "opacity-70 cursor-not-allowed transform-none" : "hover:shadow-secondary/40 hover:scale-[1.02] active:scale-[0.98]"} transition-all text-lg mt-4 group`}
                    >
                      <span>
                        {isLoading
                          ? "Entering Dashboard..."
                          : "Enter Dashboard"}
                      </span>
                      {!isLoading && (
                        <span
                          className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform"
                          data-icon="arrow_forward"
                        >
                          arrow_forward
                        </span>
                      )}
                    </button>
                  </form>
                  {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium text-center relative z-10">
                      {error}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 bg-surface-container/40 p-10 rounded-[2.5rem] border border-outline-variant/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-tertiary/10 rounded-full blur-3xl group-hover:bg-tertiary/20 transition-all duration-700" />

                  <div className="space-y-2 relative z-10">
                    <h2 className="text-5xl font-black text-white font-headline tracking-tighter">
                      Join ALWS
                    </h2>
                    <p className="text-on-surface-variant font-medium text-lg">
                      Empower your student journey today.
                    </p>
                  </div>

                  {/* Profile Pic Uploader (Optional) */}
                  <div className="flex flex-col items-center gap-4 py-2 relative z-10">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="relative w-28 h-28 rounded-[2rem] bg-surface-container-high/40 border-2 border-dashed border-outline-variant/30 flex items-center justify-center cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-all overflow-hidden group/pic"
                    >
                      {profilePic ? (
                        <img
                          src={profilePic}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <span
                            className="material-symbols-outlined text-on-surface-variant/40 group-hover/pic:text-secondary text-4xl transition-colors"
                            data-icon="add_a_photo"
                          >
                            add_a_photo
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/pic:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">
                          Change
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">
                      Optional Profile Photo
                    </span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>

                  <form
                    onSubmit={handleAuth}
                    className="space-y-4 relative z-10"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block ml-1">
                          First Name
                        </label>
                        <input
                          required
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-5 py-3.5 bg-surface-container-high/40 border border-outline-variant/30 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all text-white font-medium text-sm placeholder:text-white/10"
                          placeholder="Aarav"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block ml-1">
                          Last Name
                        </label>
                        <input
                          required
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-5 py-3.5 bg-surface-container-high/40 border border-outline-variant/30 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all text-white font-medium text-sm placeholder:text-white/10"
                          placeholder="Sharma"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block ml-1">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-3.5 bg-surface-container-high/40 border border-outline-variant/30 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all text-white font-medium text-sm placeholder:text-white/10"
                        placeholder="student@slrtce.edu"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block ml-1">
                        Course / Branch
                      </label>
                      <input
                        required
                        type="text"
                        value={courseBranch}
                        onChange={(e) => setCourseBranch(e.target.value)}
                        className="w-full px-5 py-3.5 bg-surface-container-high/40 border border-outline-variant/30 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all text-white font-medium text-sm placeholder:text-white/10"
                        placeholder="Computer Engineering (FE)"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block ml-1">
                        Assign Password
                      </label>
                      <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-5 py-3.5 bg-surface-container-high/40 border border-outline-variant/30 rounded-xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all text-white font-medium text-sm placeholder:text-white/10"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      disabled={isLoading}
                      type="submit"
                      className={`w-full bg-secondary text-on-secondary py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-secondary/20 transition-all text-lg mt-6 group ${isLoading ? "opacity-70 cursor-not-allowed transform-none" : "hover:shadow-secondary/40 hover:scale-[1.02] active:scale-[0.98]"}`}
                    >
                      <span>
                        {isLoading
                          ? "Creating Account..."
                          : "Create My Account"}
                      </span>
                      {!isLoading && (
                        <span
                          className="material-symbols-outlined text-2xl group-hover:scale-125 transition-transform"
                          data-icon="person_add"
                        >
                          person_add
                        </span>
                      )}
                    </button>
                  </form>

                  {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium text-center relative z-10">
                      {error}
                    </div>
                  )}
                  {successMsg && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm font-medium text-center relative z-10">
                      {successMsg}
                    </div>
                  )}

                  {/* Social Sign Ups */}
                  <div className="flex flex-col items-center gap-4 mt-8 relative z-10">
                    <span className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-[0.3em]">
                      Or Register Faster Using
                    </span>
                    <div className="flex gap-4 w-full">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-outline-variant/20 hover:bg-white/10 transition-all backdrop-blur-sm">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span className="text-xs font-bold text-white/80">
                          Google
                        </span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white hover:bg-white/90 transition-all">
                        <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                          <path d="M17.05 20.28c-.96.95-2.3 1.72-3.73 1.72-1.43 0-2.45-.6-3.41-.6s-2.03.6-3.41.6c-1.43 0-2.77-.77-3.73-1.72C1.43 18.23 0 15.11 0 12.04c0-3.07 1.48-6.19 2.77-7.14C4.1 3.95 5.58 3.23 7.01 3.23c1.43 0 2.45.6 3.41.6s2.03-.6 3.41-.6c1.43 0 2.91.72 4.24 1.67 1.29.95 2.77 4.07 2.77 7.14 0 3.07-1.43 6.19-3.79 8.24zM12 3c0-1.61.64-3 1.61-3.97.97-.97 2.36-1.61 3.97-1.61.12 1.61-.52 3-1.49 4.1-.97.97-2.36 1.61-3.97 1.61-.12-1.61-.12-1.61-.12-1.61z" />
                        </svg>
                        <span className="text-xs font-bold text-black">
                          Apple
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="p-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-on-surface-variant/40 font-medium relative z-10">
          <div className="flex gap-6">
            <a href="#" className="hover:text-secondary transition-colors">
              Contact Us
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Privacy Policy
            </a>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-secondary transition-colors group">
            <span
              className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform"
              data-icon="language"
            >
              language
            </span>
            <span>English (India)</span>
            <span
              className="material-symbols-outlined text-sm"
              data-icon="expand_more"
            >
              expand_more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
