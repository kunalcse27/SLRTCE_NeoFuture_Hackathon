import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
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
                  <span className="text-sm font-bold text-[#1DB954] uppercase tracking-[0.2em]">
                    {profile.branch}
                  </span>
                  <span className="text-[10px] text-slate-500 font-black px-3 py-1 bg-white/5 rounded-full border border-white/5 uppercase">
                    Roll No: {profile.rollNo}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
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
            className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors ${
              isEditing ? "text-slate-400" : "text-[#1DB954]/40"
            }`}
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
