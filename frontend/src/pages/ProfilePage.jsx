import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Student',
    lastName: '',
    rollNo: '24C091',
    className: 'FY',
    branch: 'Computer Engineering',
    phone: '',
    email: 'student@slrtce.edu',
    parentName: 'Mr & Mrs Sharma',
    parentPhone: ''
  });

  // Load from session on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('alws_session') || sessionStorage.getItem('alws_session');
      if (raw) {
        const session = JSON.parse(raw);
        setProfile(prev => ({
          ...prev,
          firstName: session.firstName || prev.firstName,
          lastName: session.lastName || prev.lastName,
          email: session.email || prev.email,
          branch: session.courseBranch || prev.branch,
        }));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSave = () => {
    // Optionally save back to session (for header updates, etc.)
    try {
      const storageLayer = localStorage.getItem('alws_session') ? localStorage : sessionStorage;
      const raw = storageLayer.getItem('alws_session');
      if (raw) {
        const session = JSON.parse(raw);
        session.firstName = profile.firstName;
        session.lastName = profile.lastName;
        session.email = profile.email;
        session.courseBranch = profile.branch;
        storageLayer.setItem('alws_session', JSON.stringify(session));
      }
      
      // Auto-refresh slightly to let Header pick up changes nicely, or let user just realize context.
      window.dispatchEvent(new Event('storage')); // trigger updates if listening
    } catch {}

    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 text-[#EAEAEA] min-h-screen font-manrope">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1DB954]/10 flex items-center justify-center border border-[#1DB954]/20">
              <span className="material-symbols-outlined text-[#1DB954] text-2xl" data-icon="person_outline">person_outline</span>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">Student Profile</h1>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Personal & Academic Info</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <AnimatePresence mode="popLayout">
            {isEditing ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex gap-3"
              >
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl text-white font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-xl text-[#121212] font-bold bg-[#1DB954] hover:bg-teal-400 shadow-lg shadow-[#1DB954]/20 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm" data-icon="save">save</span>
                  Save Changes
                </button>
              </motion.div>
            ) : (
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 rounded-xl text-[#121212] font-bold bg-[#1DB954] hover:bg-teal-400 shadow-lg shadow-[#1DB954]/20 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm" data-icon="edit">edit</span>
                Edit Profile
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          layout
          className="bg-[#1a1a1a] rounded-[2rem] border border-white/5 shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#1DB954]/10 to-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Top Info Banner */}
          <div className="flex items-center gap-6 mb-10 pb-8 border-b border-white/5 relative z-10">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-[1.5rem] bg-gradient-to-br from-[#2a2a2a] to-[#121212] border-2 border-white/10 shadow-lg flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${profile.email}`} alt="avatar" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem] flex items-center justify-center">
                <span className="material-symbols-outlined text-white" data-icon="photo_camera">photo_camera</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">{profile.firstName} {profile.lastName}</h2>
              <p className="text-secondary font-medium text-[#1DB954]">{profile.branch}</p>
            </div>
          </div>

          {/* Form / View Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
            
            {/* Academic Details Section */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#1DB954] flex items-center gap-2">
                <span className="material-symbols-outlined" data-icon="school">school</span>
                Academic Details
              </h3>
              
              <div className="space-y-4">
                <Field label="First Name" name="firstName" value={profile.firstName} isEditing={isEditing} onChange={handleChange} />
                <Field label="Last Name" name="lastName" value={profile.lastName} isEditing={isEditing} onChange={handleChange} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Roll No" name="rollNo" value={profile.rollNo} isEditing={isEditing} onChange={handleChange} />
                  <Field label="Class" name="className" value={profile.className} isEditing={isEditing} onChange={handleChange} />
                </div>
                <Field label="Branch" name="branch" value={profile.branch} isEditing={isEditing} onChange={handleChange} />
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-teal-400 flex items-center gap-2">
                <span className="material-symbols-outlined" data-icon="contact_phone">contact_phone</span>
                Contact & Parents
              </h3>
              
              <div className="space-y-4">
                <Field label="Email Address" name="email" type="email" value={profile.email} isEditing={isEditing} onChange={handleChange} />
                <Field label="Phone Number" name="phone" type="tel" value={profile.phone} isEditing={isEditing} onChange={handleChange} placeholder="+91 9000000000" />
                <Field label="Parent/Guardian Name" name="parentName" value={profile.parentName} isEditing={isEditing} onChange={handleChange} />
                <Field label="Parent's Phone" name="parentPhone" type="tel" value={profile.parentPhone} isEditing={isEditing} onChange={handleChange} placeholder="+91 9000000000" />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Reusable Field Component
function Field({ label, name, type = "text", value, isEditing, onChange, placeholder = "" }) {
  return (
    <motion.div layout className="space-y-1.5 flex flex-col">
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      {isEditing ? (
        <input 
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#1DB954] focus:ring-1 focus:ring-[#1DB954] transition-all"
        />
      ) : (
        <p className="text-base font-semibold text-white px-2 py-3 border border-transparent">
          {value || <span className="text-slate-500 italic">Not provided</span>}
        </p>
      )}
    </motion.div>
  );
}
