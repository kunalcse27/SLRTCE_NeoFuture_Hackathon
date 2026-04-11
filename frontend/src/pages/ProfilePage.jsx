import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [session, setSession] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Student",
    lastName: "User",
    email: "student@slrtce.edu",
    username: "student123",
    password: "password123",
    rollNo: "24C091",
    className: "FY",
    branch: "Computer Engineering",
    phone: "",
    parentName: "Mr & Mrs Sharma",
    parentPhone: "",
  });

  // Load from session on mount
  useEffect(() => {
    try {
      const raw =
        localStorage.getItem("alws_session") ||
        sessionStorage.getItem("alws_session");
      if (raw) {
        const data = JSON.parse(raw);
        setProfile((prev) => ({
          ...prev,
          firstName: data.firstName || prev.firstName,
          lastName: data.lastName || prev.lastName,
          email: data.email || prev.email,
          username: data.username || data.email?.split("@")[0] || prev.username,
          password: data.password || prev.password,
          branch: data.courseBranch || prev.branch,
        }));
      }
    } catch (e) {
      console.error("Failed to load session", e);
    }
  }, []);

  const handleSave = () => {
    try {
      const updatedSession = {
        ...session,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        username: profile.username,
        password: profile.password,
        courseBranch: profile.branch
      };

      const storageLayer = localStorage.getItem('alws_session') ? localStorage : sessionStorage;
      storageLayer.setItem('alws_session', JSON.stringify(updatedSession));

      // Auto-refresh slightly to let Header pick up changes
      window.dispatchEvent(new Event('storage'));

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      setIsEditing(false);
    } catch (e) {
      console.error("Failed to save session", e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 text-[#EAEAEA] min-h-screen font-manrope pt-24 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col items-center mb-12 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.5rem] bg-[#1DB954]/10 flex items-center justify-center border border-[#1DB954]/20 shadow-xl">
              <span
                className="material-symbols-outlined text-[#1DB954] text-3xl"
                data-icon="account_circle"
              >
                account_circle
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white mb-1">
                Account Profile
              </h1>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">
                View your personal details
              </p>
            </div>
          </div>
<<<<<<< HEAD
=======

          <AnimatePresence mode="popLayout">
            {isEditing ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex gap-3 w-full md:w-auto"
              >
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-grow md:flex-none px-8 py-3 rounded-2xl text-white font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-grow md:flex-none px-8 py-3 rounded-2xl text-[#121212] font-black bg-[#1DB954] hover:bg-teal-400 shadow-xl shadow-[#1DB954]/20 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined font-black text-sm" data-icon="save">save</span>
                  Save Changes
                </button>
              </motion.div>
            ) : (
              <motion.div className="flex items-center gap-4 w-full md:w-auto">
                {isSaved && (
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[#1DB954] text-sm font-bold flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm font-black" data-icon="check_circle">check_circle</span>
                    Saved successfully
                  </motion.span>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-grow md:flex-none px-8 py-3 rounded-2xl text-[#121212] font-black bg-[#1DB954] hover:bg-teal-400 shadow-xl shadow-[#1DB954]/20 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined font-black text-sm" data-icon="edit">edit</span>
                  Edit Profile
                </button>
              </motion.div>
            )}
          </AnimatePresence>
>>>>>>> d3337d18c448329257438c974deea2cf4365164b
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar / Photo */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <motion.div
              layout
              className="glass-panel p-10 rounded-[3rem] border border-white/5 bg-[#1a1a1a]/40 flex flex-col items-center text-center gap-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1DB954]/5 rounded-full blur-3xl" />
              <div className="relative group">
                <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-[#2a2a2a] to-[#121212] border-2 border-white/10 shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${profile.email}`}
                    alt="avatar"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              </div>
              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl font-black text-white">
                  {profile.firstName} {profile.lastName}
                </h3>
                <div className="flex flex-col gap-1 items-center">
<<<<<<< HEAD
                  <span className="text-sm font-bold text-[#1DB954] uppercase tracking-[0.2em]">
                    {profile.branch}
                  </span>
                  <span className="text-[10px] text-slate-500 font-black px-3 py-1 bg-white/5 rounded-full border border-white/5 uppercase">
                    Roll No: {profile.rollNo}
                  </span>
=======
                  <span className="text-sm font-bold text-[#1DB954] uppercase tracking-[0.2em]">{profile.branch}</span>
                  <span className="text-[10px] text-slate-500 font-black px-3 py-1 bg-white/5 rounded-full border border-white/5 uppercase">Roll No: {profile.rollNo}</span>
>>>>>>> d3337d18c448329257438c974deea2cf4365164b
                </div>
              </div>
            </motion.div>
          </div>
<<<<<<< HEAD
=======

          {/* Form Sections */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <motion.div layout className="glass-panel p-10 rounded-[3.5rem] border border-white/5 bg-[#1a1a1a]/60 space-y-12">

              {/* Account Credentials */}
              <section className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#FF5722] flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm" data-icon="key">key</span>
                  Account Credentials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Login Username" name="username" value={profile.username} isEditing={isEditing} onChange={handleChange} icon="alternate_email" />
                  <Field label="Login Password" name="password" type="text" value={profile.password} isEditing={isEditing} onChange={handleChange} icon="lock_open" />
                </div>
                <p className="text-[10px] text-slate-500 italic ml-2">These are your primary login credentials used for site access.</p>
              </section>

              {/* Personal Information */}
              <section className="space-y-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#1DB954] flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm" data-icon="person_search">person_search</span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="First Name" name="firstName" value={profile.firstName} isEditing={isEditing} onChange={handleChange} />
                  <Field label="Last Name" name="lastName" value={profile.lastName} isEditing={isEditing} onChange={handleChange} />
                  <Field label="Email Address" name="email" type="email" value={profile.email} isEditing={isEditing} onChange={handleChange} icon="mail" />
                  <Field label="Phone Number" name="phone" type="tel" value={profile.phone} isEditing={isEditing} onChange={handleChange} icon="call" placeholder="+91 0000000000" />
                </div>
              </section>

              {/* Academic Details */}
              <section className="space-y-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-teal-400 flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm" data-icon="school">school</span>
                  Academic Record
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Roll Number" name="rollNo" value={profile.rollNo} isEditing={isEditing} onChange={handleChange} />
                    <Field label="Class" name="className" value={profile.className} isEditing={isEditing} onChange={handleChange} />
                  </div>
                  <Field label="Engineering Branch" name="branch" value={profile.branch} isEditing={isEditing} onChange={handleChange} icon="account_tree" />
                </div>
              </section>

              {/* Emergency Contacts */}
              <section className="space-y-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm" data-icon="family_history">family_history</span>
                  Parental Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Guardian Name" name="parentName" value={profile.parentName} isEditing={isEditing} onChange={handleChange} icon="diversity_3" />
                  <Field label="Guardian Phone" name="parentPhone" type="tel" value={profile.parentPhone} isEditing={isEditing} onChange={handleChange} icon="contact_emergency" />
                </div>
              </section>

            </motion.div>
          </div>
>>>>>>> d3337d18c448329257438c974deea2cf4365164b
        </div>
      </div>
    </div>
  );
}

// Reusable Field Component
function Field({
  label,
  name,
  type = "text",
  value,
  isEditing,
  onChange,
  placeholder = "",
  icon = null,
}) {
  return (
    <motion.div layout className="space-y-2 flex flex-col group">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span
<<<<<<< HEAD
            className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors ${
              isEditing ? "text-slate-400" : "text-[#1DB954]/40"
            }`}
=======
            className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors ${isEditing ? 'text-slate-400' : 'text-[#1DB954]/40'
              }`}
>>>>>>> d3337d18c448329257438c974deea2cf4365164b
            data-icon={icon}
          >
            {icon}
          </span>
        )}
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full ${icon ? "pl-11" : "px-4"} py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold tracking-tight focus:outline-none focus:border-[#1DB954] focus:ring-4 focus:ring-[#1DB954]/10 transition-all text-sm`}
          />
        ) : (
          <div
            className={`${icon ? "pl-11" : "px-2"} py-4 text-base font-bold text-white border-b border-white/5 bg-transparent select-none`}
          >
            {value || (
              <span className="text-slate-600 italic font-medium">
                Not provided
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
