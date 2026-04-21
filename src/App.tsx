import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Activity, 
  Lock, 
  Cpu, 
  Mail, 
  Smartphone, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2, 
  Menu, 
  X,
  Linkedin,
  FileText,
  User,
  History,
  Timer,
  Volume2,
  VolumeX,
  Play
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initializeSystem = () => {
    setIsInitialized(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          current = section.id;
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'summary', label: 'Summary' },
    { id: 'toolkit', label: 'Toolkit' },
    { id: 'mechanism', label: 'Mechanism' },
    { id: 'telemetry', label: 'Telemetry' },
    { id: 'infrastructure', label: 'Outages' },
    { id: 'google', label: 'Google Indicators' },
    { id: 'iocs', label: 'Malicious IOCs' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'modern-warfare', label: 'Modern Warfare' },
    { id: 'mitigation', label: 'Mitigation' },
    { id: 'conclusion', label: 'Conclusion' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      <audio 
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2022/10/14/audio_349d115e61.mp3"
        loop
      />

      {/* Entry Overlay */}
      <AnimatePresence>
        {!isInitialized && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-bg flex items-center justify-center p-6 border-4 border-amber-primary/20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,95,15,0.15)_0%,transparent_70%)]" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card p-12 max-w-md w-full text-center neon-amber relative z-10"
            >
              <div className="w-20 h-20 rounded-full bg-amber-primary/20 border-2 border-amber-primary flex items-center justify-center mx-auto mb-8 animate-pulse shadow-[0_0_30px_rgba(200,96,26,0.3)]">
                <ShieldAlert size={40} className="text-amber-secondary" />
              </div>
              <h2 className="bebas text-4xl text-text-primary mb-2 tracking-[4px]">SYSTEM ACCESS</h2>
              <p className="text-[10px] mono text-amber-secondary uppercase tracking-[2px] mb-8">Incident Report v1.0 // Classified</p>
              
              <button 
                onClick={initializeSystem}
                className="group flex items-center justify-center gap-3 w-full bg-white text-bg py-5 rounded-2xl font-bold uppercase tracking-[3px] text-sm hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(210,95,15,0.4)]"
              >
                <Play size={18} fill="currentColor" />
                Initialize Audit
              </button>
              
              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-[9px] text-text-muted mono uppercase tracking-widest leading-relaxed">
                  Warning: Unauthorized access to this report is prohibited. Session will be logged.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mute Toggle */}
      <button 
        onClick={toggleMute}
        className="fixed top-24 right-8 z-[150] p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-amber-secondary hover:bg-white/5 transition-colors shadow-2xl"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Sticky Navigation */}
      <header className="sticky top-0 z-[100] backdrop-blur-xl bg-black/60 border-b border-border-subtle">
        <div className="section-container flex items-center justify-between py-4.5 gap-5">
          <div className="flex flex-col leading-tight">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-left bg-none border-none cursor-pointer uppercase tracking-[3px] text-lg font-bold bebas flex items-baseline gap-2"
            >
              <span className="text-text-primary">EVIL</span>
              <span className="text-amber-secondary">TOKENS</span>
            </button>
            <span className="text-[10px] sm:text-xs text-text-muted mt-1 uppercase tracking-widest font-medium">Security Incident Report v1.0</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:block overflow-hidden">
            <ul className="flex gap-4 list-none overflow-x-auto pb-1 scrollbar-hide">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link font-medium ${activeSection === item.id ? 'text-amber-secondary border-neon-border bg-white/5' : ''}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-text-muted hover:text-amber-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/95 border-b border-neon-border overflow-hidden"
            >
              <ul className="flex flex-col p-4 gap-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === item.id ? 'bg-amber-primary/10 text-amber-secondary' : 'text-text-muted hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-bg flex items-end pb-24">
        {/* EXCELLENCE Watermark */}
        <div className="bebas pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] text-[30vw] tracking-[-4px] text-white/[0.035] whitespace-nowrap leading-none z-0">
          REPORTING
        </div>

        {/* Warm Glow Blurs */}
        <div className="absolute top-[-5%] left-[45%] -translate-x-1/2 w-[700px] h-[700px] pointer-events-none z-[2] bg-[radial-gradient(ellipse_55%_65%_at_50%_50%,rgba(215,95,15,0.45)_0%,rgba(160,55,8,0.2)_38%,transparent_72%)]" />

        <div className="section-container relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[850px]"
          >
            <div className="flex flex-col md:flex-row md:items-end gap-10">
              <div className="flex-1">
                <div className="bebas text-5xl sm:text-7xl lg:text-[6rem] leading-[0.92] tracking-tighter text-text-primary mb-6">
                  <span className="block border-b border-amber-primary/20 pb-2">Active Threat Report.</span>
                  <span className="block text-amber-secondary mt-2">Egypt "EvilTokens" Campaign.</span>
                </div>
                
                <p className="text-text-muted text-sm sm:text-lg leading-relaxed max-w-[650px] border-l-2 border-amber-primary/40 pl-5 mb-8">
                  A sophisticated AI-powered phishing campaign is actively hijacking Microsoft and Google accounts across Egypt by exploiting legitimate Device Code Flows and session token theft.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  <span className="badge-glass flex items-center gap-2"><History size={12}/> April 17, 2026</span>
                  <span className="badge-glass flex items-center gap-2 font-black text-red-500 uppercase tracking-widest"><ShieldAlert size={12}/> Urgent Action Required</span>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', damping: 20 }}
                className="hidden md:block mb-6 relative group"
              >
                <div className="w-56 h-72 rounded-[40px] border-2 border-amber-primary/30 p-1.5 bg-amber-primary/5 shadow-[0_0_50px_rgba(200,96,26,0.15)] overflow-hidden transition-all duration-500 group-hover:border-amber-primary group-hover:shadow-[0_0_60px_rgba(200,96,26,0.25)]">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1oKvhSIGM_-RsROTpU-lfAmjZ-Nv78wV5" 
                    alt="Waleed Hassan" 
                    className="w-full h-full object-cover rounded-[32px] grayscale hover:grayscale-0 transition-all duration-1000 scale-[1.05] hover:scale-100"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://picsum.photos/seed/waleed-hassan/400/600";
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 p-4 glass-card border border-amber-primary/40 rounded-2xl shadow-2xl backdrop-blur-xl translate-x-4">
                   <div className="text-[9px] mono text-amber-secondary uppercase tracking-[3px] leading-none mb-1.5">Lead Investigator</div>
                   <div className="text-xl bebas text-text-primary tracking-widest uppercase leading-none">W. Hassan</div>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('mitigation')} 
                className="inline-flex items-center justify-center bg-white text-bg font-bold py-4 px-10 rounded-xl shadow-[0_0_50px_12px_rgba(210,95,15,0.4)] hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Remediation Plan
              </button>
              <button 
                onClick={() => scrollToSection('iocs')} 
                className="inline-flex items-center gap-2 border border-amber-primary/40 text-text-primary font-bold py-4 px-8 rounded-xl hover:bg-white/5 transition-colors cursor-pointer uppercase tracking-wider text-xs"
              >
                <Terminal size={18} className="text-amber-secondary" />
                Exploit Indicators (IOCs)
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="border-y border-white/10 bg-bg-alt overflow-hidden">
        <div className="flex w-max animate-[marqueeScroll_35s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              {[
                {icon:"🏛️", label:"340+ Orgs Affected"},
                {icon:"🇦🇪", label:"Regional CDN Outages"},
                {icon:"🤖", label:"AI-Crafted Lures"},
                {icon:"⚡", label:"Session Hijack"},
                {icon:"🔌", label:"Socket ERR_CONNECTED"},
                {icon:"📋", label:"Token Invalidation REQ"},
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 px-8 py-5 border-r border-white/10 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-primary/20 border border-amber-primary/30 flex items-center justify-center text-sm">{item.icon}</div>
                  <span className="text-amber-secondary font-bold text-sm tracking-tight">{item.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="section-container space-y-12 py-20 relative z-10">
        
        <section id="summary" className="scroll-mt-32">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="mono text-[10px] tracking-[4px] text-amber-secondary uppercase">Section 01</span>
            <h2 className="bebas text-5xl text-text-primary uppercase tracking-tight">Executive <span className="text-amber-secondary">Summary</span></h2>
          </div>
          <div className="glass-card p-10 neon-amber">
            <p className="text-text-muted text-lg leading-relaxed font-light">
              Launched in February 2026 as a <strong className="text-text-primary font-semibold">Phishing-as-a-Service (PhaaS)</strong> toolkit on Telegram, "EvilTokens" bypasses passwords and 2FA by stealing live session tokens via the legitimate <strong className="text-text-primary font-semibold">Device Code Flow</strong>. Impact is nationwide across Egypt, affecting phones, laptops, and tablets regardless of Wi-Fi safety.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-xl">
                <div className="text-red-400 bebas text-lg mb-2">Primary Symptom</div>
                <p className="text-xs text-red-200/60 leading-relaxed font-mono">Suspicious activity alerts followed by unauthorized backup code generation (Persistence creation).</p>
              </div>
              <div className="bg-amber-primary/5 border border-amber-primary/20 p-5 rounded-xl">
                <div className="text-amber-secondary bebas text-lg mb-2">Campaign Status</div>
                <p className="text-xs text-amber-light/60 leading-relaxed font-mono whitespace-pre -mt-1">
{`[+] STATUS: ACTIVE
[+] ORIGIN: TELEGRAM PHaaS
[+] TARGET: EGYPT (EDU/GOV)`}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="toolkit" className="scroll-mt-32 text-left">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="mono text-[10px] tracking-[4px] text-amber-secondary uppercase">Section 02</span>
            <h2 className="bebas text-5xl text-text-primary uppercase tracking-tight">Toolkit <span className="text-amber-secondary">Analysis</span></h2>
          </div>
          <div className="glass-card p-10 neon-amber">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <p className="text-text-muted text-sm leading-relaxed mb-6 font-light uppercase tracking-wide">Automation via Cloudflare & Railway</p>
                <ul className="space-y-4 list-none">
                  {[
                    "AI-crafted phishing emails/decoy pages tailored to user profile.",
                    "Host-side polling of /api/device/status/ until approval is triggered.",
                    "Theft of Access + Refresh tokens for long-term persistence.",
                    "Post-breach BEC (Business Email Compromise) automation suite."
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-primary mt-1.5 shrink-0 shadow-[0_0_8px_#c8601a]" />
                      <span className="text-text-muted text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black/40 p-8 rounded-2xl border border-white/5 border-l-amber-primary border-l-2">
                <div className="bebas text-xl text-amber-secondary mb-4 tracking-wider">Cloud Infra bypass</div>
                <p className="text-[11px] text-text-muted leading-relaxed font-mono mb-6 italic">
                  "Uses Cloudflare Workers + Railway for dynamic code injection that beats the standard 15-minute device code expiration window."
                </p>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                  <div className="text-[10px] mono text-amber-light/40">HOSTING_ORIGIN</div>
                  <div className="text-[10px] mono text-red-400 font-bold uppercase tracking-widest">Railway App</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="mechanism" className="scroll-mt-32">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="mono text-[10px] tracking-[4px] text-amber-secondary uppercase">Section 03</span>
            <h2 className="bebas text-5xl text-text-primary uppercase tracking-tight">Core <span className="text-amber-secondary">Mechanism</span></h2>
          </div>
          <div className="glass-card p-10 neon-amber text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-8">
                <h4 className="bebas text-2xl text-text-primary mb-4 tracking-wide">Polling Heartbeat (Captured Script)</h4>
                <p className="text-text-muted text-sm leading-relaxed mb-6 font-light">
                  The heart of EvilTokens is a persistent polling loop. Once a user is tricked into approving a device code on a secondary screen, the script immediately captures the token and redirects to a legitimate Google/Microsoft support page as a psychological lure.
                </p>
                <div className="flex gap-4">
                  <div className="flex-1 p-5 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-[9px] mono text-amber-secondary mb-3 uppercase tracking-widest">AitM Proxy</div>
                    <div className="text-sm font-bold text-text-primary font-mono lowercase tracking-tighter">yeptube.com/cnt</div>
                  </div>
                  <div className="flex-1 p-5 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-[9px] mono text-amber-secondary mb-3 uppercase tracking-widest">Status Hook</div>
                    <div className="text-sm font-bold text-text-primary font-mono lowercase tracking-tighter">/api/device/status/</div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-4 flex justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-amber-primary/20 border-t-amber-primary flex items-center justify-center animate-[spinSlow_10s_linear_infinite] relative">
                   <div className="absolute inset-2 border-2 border-dashed border-white/10 rounded-full" />
                   <Timer size={40} className="text-amber-secondary animate-[pulse_2s_infinite]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="telemetry" className="scroll-mt-32">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="mono text-[10px] tracking-[4px] text-amber-secondary uppercase">Section 04</span>
            <h2 className="bebas text-5xl text-text-primary uppercase tracking-tight">Forensic <span className="text-amber-secondary">Telemetry</span></h2>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="glass-card p-8 neon-amber group hover:border-amber-primary/40 transition-colors">
                <div className="text-[10px] mono text-amber-secondary mb-4 uppercase tracking-[2px]">Emergency Patch</div>
                <div className="text-3xl font-bold bebas text-text-primary mb-2 tracking-wide font-medium">April 2, 2026</div>
                <p className="text-text-muted text-[11px] leading-relaxed font-mono italic">BuildDate observed in manipulated Microsoft recovery page JSON.</p>
              </div>
              <div className="glass-card p-8 neon-amber border-red-500/20 bg-red-500/5">
                <div className="text-[10px] mono text-red-400 mb-4 uppercase tracking-[2px]">CDN False Positive</div>
                <div className="text-3xl font-bold bebas text-red-200 mb-2 tracking-wide font-medium">Bootstrap 3.3.0</div>
                <p className="text-red-200/50 text-[11px] leading-relaxed font-mono italic">Legacy EOL libs flagged as "Not Safe" by automated scanners (Microsoft/Google standard CDNs).</p>
              </div>
              <div className="glass-card p-8 neon-amber">
                <div className="text-[10px] mono text-amber-secondary mb-4 uppercase tracking-[2px]">Scale Unit</div>
                <div className="text-3xl font-bold bebas text-text-primary mb-2 tracking-wide font-medium">ESTS-PUB-FRC-AZ2</div>
                <p className="text-text-muted text-[11px] leading-relaxed font-mono italic">Telemetry pointer identifying standard Microsoft Auth infrastructure.</p>
              </div>
            </div>

            {/* Evidence Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="glass-card p-4 neon-amber group overflow-hidden">
                <div className="aspect-[16/10] rounded-lg bg-black/40 overflow-hidden relative border border-white/5">
                  <img 
                    src="https://picsum.photos/seed/drivers-log/800/500?blur=1" 
                    alt="PNPUtil Output" 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <div className="text-[8px] mono text-amber-secondary mb-1 uppercase tracking-widest">Snapshot Capture</div>
                    <div className="text-[10px] font-bold text-white uppercase tracking-tight">Driver Enumeration Trace (PNPUtil)</div>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 neon-amber group overflow-hidden">
                <div className="aspect-[16/10] rounded-lg bg-black/40 overflow-hidden relative border border-white/5">
                  <img 
                    src="https://picsum.photos/seed/privacy-settings/800/500?blur=1" 
                    alt="Privacy Settings" 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <div className="text-[8px] mono text-amber-secondary mb-1 uppercase tracking-widest">Snapshot Capture</div>
                    <div className="text-[10px] font-bold text-white uppercase tracking-tight">Microphone Access Policy Violation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="infrastructure" className="scroll-mt-32">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="mono text-[10px] tracking-[4px] text-amber-secondary uppercase">Section 05</span>
            <h2 className="bebas text-5xl text-text-primary uppercase tracking-tight">Infra <span className="text-amber-secondary">Outages</span></h2>
          </div>
          <div className="glass-card p-10 neon-amber text-left">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1">
                <h4 className="bebas text-2xl text-text-primary mb-4 tracking-wide uppercase">Regional 404 WebContentNotFound</h4>
                <p className="text-text-muted text-sm leading-relaxed mb-6 font-light">
                  Direct proof of Microsoft defensive systems struggling under the massive volume of EvilTokens phishing cycles. Outages on <span className="font-mono text-amber-secondary">acctcdn.msauth.net</span> confirm an overwhelmed infrastructure rather than per-device malware.
                </p>
                <div className="space-y-3">
                  {[
                    "ERR_SOCKET_NOT_CONNECTED (gsa.view.api)",
                    "HttpStatusCode 404 (graph.microsoft.com/v1.0)",
                    "RequestId: 18742848 (April 16 Timestamp)"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-[10px] mono text-red-200">
                      <AlertTriangle size={12} className="text-red-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/3 bg-black/60 p-8 rounded-3xl border border-white/5 relative shadow-2xl">
                <div className="text-amber-secondary text-5xl bebas mb-2 leading-none">OVERLOAD</div>
                <div className="text-text-muted text-[9px] mono uppercase tracking-[4px]">Status: Critical Saturation</div>
                <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[95%] animate-[pulse_1s_infinite]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="google" className="scroll-mt-32">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="mono text-[10px] tracking-[4px] text-amber-secondary uppercase">Section 06</span>
            <h2 className="bebas text-5xl text-text-primary uppercase tracking-tight">Google-Side <span className="text-amber-secondary">Indicators</span></h2>
          </div>
          <div className="glass-card p-10 neon-amber text-left">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                 <h4 className="bebas text-xl text-text-primary mb-5 uppercase tracking-wider">Silent Sign-In Patterns</h4>
                 <div className="space-y-4">
                   <div className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5">
                     <div className="p-2 rounded-lg bg-amber-primary/20"><Mail size={18} className="text-amber-secondary" /></div>
                     <div>
                       <span className="text-xs font-bold text-text-primary block mb-1">complete-silent-signin</span>
                       <span className="text-[11px] text-text-muted leading-relaxed font-light">Token stolen via EvilTokens allows background synchronization across all cloud-linked devices.</span>
                     </div>
                   </div>
                   <div className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5">
                     <div className="p-2 rounded-lg bg-amber-primary/20"><Timer size={18} className="text-amber-secondary" /></div>
                     <div>
                       <span className="text-xs font-bold text-text-primary block mb-1">OneCollector Telemetry</span>
                       <span className="text-[11px] text-text-muted leading-relaxed font-light">Confirms persistent active session telemetry even without user interaction.</span>
                     </div>
                   </div>
                 </div>
               </div>
               <div>
                  <h4 className="bebas text-xl text-text-primary mb-5 uppercase tracking-wider">Security Policy Violations</h4>
                  <div className="space-y-4">
                     <p className="text-[11px] text-text-muted font-mono bg-black/40 p-4 rounded-xl border border-white/5 leading-relaxed">
{`CSP framing violation:
'frame-ancestors self' -> [CLICKJACKING DETECTED]

Permissions policy 'unload' violation
 -> [EXTENSION/SCRIPT TAMPERING]`}</p>
                     <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/30 flex items-center gap-3">
                        <AlertTriangle size={16} className="text-red-400 shrink-0" />
                        <span className="text-[10px] text-red-200 font-bold uppercase tracking-widest leading-relaxed">Warning: Self-XSS detected on myaccount.google.com</span>
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </section>

        <section id="iocs" className="scroll-mt-32">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="mono text-[10px] tracking-[4px] text-amber-secondary uppercase">Section 07</span>
            <h2 className="bebas text-5xl text-text-primary uppercase tracking-tight">Malicious <span className="text-amber-secondary">IOCs</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
             {[
               { t: "Fake Identity", val: "SIGMA", sub: "WALEED HASSAN (SIGMA) lures" },
               { t: "Persistence Email", val: "Gmail", sub: "shadiashokry182@gmail.com" },
               { t: "AitM Proxy", val: "Yeptube", sub: "yeptube.com / cnt.yeptube.com" },
               { t: "Payload Method", val: "PhaaS", sub: "Nationwide EvilTokens Toolkit" }
             ].map((ioc, idx) => (
               <div key={idx} className="glass-card p-6 neon-amber hover:bg-white/[0.03] transition-colors border-l-2 border-l-amber-primary">
                 <div className="text-[8px] mono text-text-dim uppercase tracking-[3px] mb-2">{ioc.t}</div>
                 <div className="text-2xl bebas text-text-primary tracking-wide mb-1">{ioc.val}</div>
                 <div className="text-[10px] text-text-muted font-mono lowercase">{ioc.sub}</div>
               </div>
             ))}
          </div>
        </section>

        <section id="timeline" className="scroll-mt-32">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="mono text-[10px] tracking-[4px] text-amber-secondary uppercase">Section 08</span>
            <h2 className="bebas text-5xl text-text-primary uppercase tracking-tight">Threat <span className="text-amber-secondary">Timeline</span></h2>
          </div>
          <div className="glass-card p-0 overflow-hidden neon-amber text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12">
               <div className="lg:col-span-4 p-10 bg-amber-primary/5 flex flex-col justify-center items-center text-center border-r border-white/5">
                  <div className="text-amber-secondary text-7xl bebas mb-2">RISK</div>
                  <div className="text-text-primary text-xs mono tracking-[8px] uppercase font-black">CRITICAL</div>
                  <p className="mt-8 text-[11px] text-text-muted font-light leading-relaxed uppercase tracking-tighter max-w-[200px]">Persistent access window spanning February to April 2026.</p>
               </div>
               <div className="lg:col-span-8 p-10 space-y-8">
                  {[
                    { d: "FEB 2026", e: "EvilTokens launched on Telegram PhaaS market." },
                    { d: "MAR 2026", e: "340+ organizations hit globally (Microsoft Defender data)." },
                    { d: "APR 14", e: "Patch Tuesday — 163 CVEs fixed (SharePoint spoofing/BlueHammer)." },
                    { d: "APR 16", e: "Unified 404/CSP errors reported widespread across Egypt." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-10 items-baseline border-b border-white/5 pb-6 last:border-none last:pb-0">
                       <span className="bebas text-2xl text-amber-secondary shrink-0 w-24">{item.d}</span>
                       <span className="text-text-muted text-sm font-light leading-relaxed">{item.e}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        <section id="modern-warfare" className="scroll-mt-32">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="mono text-[10px] tracking-[4px] text-amber-secondary uppercase">Section 09</span>
            <h2 className="bebas text-5xl text-text-primary uppercase tracking-tight">Modern <span className="text-amber-secondary">Warfare</span></h2>
          </div>
          
          <div className="space-y-6 text-left">
            {/* Intelligence Focus: Iran vs USA/Israel */}
            <div className="glass-card p-10 neon-amber bg-red-500/[0.03] border-red-500/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldAlert size={120} className="text-red-500" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-2 py-1 bg-red-500 text-white text-[10px] bebas tracking-widest uppercase">Critical Intel</span>
                    <span className="text-red-400 mono text-xs font-bold uppercase tracking-tighter">AI Target Acquisition</span>
                  </div>
                  <h3 className="bebas text-4xl text-text-primary mb-6 tracking-wide">Hunter-Killer AI: Bedroom Scientist Targeting</h3>
                  <p className="text-text-muted text-lg leading-relaxed font-light max-w-3xl mb-8">
                    In the current escalated theater involving Iran, the USA, and Israel, specialized <strong className="text-white">Predictive AI algorithms</strong> are being deployed to monitor, track, and neutralize high-value nuclear and defense scientists. 
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                        <div className="text-amber-secondary bebas text-xl mb-3 tracking-wider uppercase underline decoration-amber-primary/30 underline-offset-4">Domestic Infiltration</div>
                        <p className="text-sm text-text-muted leading-relaxed font-light">
                          Leveraging facial recognition, thermal signatures, and IoT data, AI systems can pinpoint targets with surgical precision <strong className="text-white text-xs">inside their own bedrooms</strong>, neutralizing the distinction between the front line and the rear echelon.
                        </p>
                     </div>
                     <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                        <div className="text-amber-secondary bebas text-xl mb-3 tracking-wider uppercase underline decoration-amber-primary/30 underline-offset-4">Autonomous Execution</div>
                        <p className="text-sm text-text-muted leading-relaxed font-light">
                          The U.S.-Israeli <strong className="text-white">Stuxnet</strong> blueprint has evolved into real-time, event-based cyber-physical attacks. We are seeing the rise of "Pure" disruptive tools designed for immediate system destruction at the tactical moment.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Framework Analysis */}
            <div className="glass-card p-10 neon-amber">
               <h3 className="bebas text-3xl text-text-primary mb-8 tracking-wide">Cyber Effects Framework <span className="text-amber-secondary text-sm mono tracking-normal lowercase opacity-50 block sm:inline sm:ml-4 sm:translate-y-[-4px]">/ Analyzing Offensive Operations</span></h3>
               
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {[
                    {
                      h: "Before Hostilities",
                      t: "Shaping Phase",
                      c: "Strategic competition space below the threshold of conflict. Focus on gaining initial access to critical infrastructure for future destruction (e.g., Russian wiper attacks on Ukrainian finance/energy).",
                      icon: <History size={24} />
                    },
                    {
                      h: "Rear Area / Pre-Battle",
                      t: "Complementary Phase",
                      c: "Exploiting information like battle plans or logistics via railway spying. Transition from quiet presence (espionage) to event-based 'Lightweight' disruptive payloads.",
                      icon: <Activity size={24} />
                    },
                    {
                      h: "Tactical Battle",
                      t: "Dominance Phase",
                      c: "Real-time engagement. Operation Orchard style blinding of systems. Manipulation of Air Tasking Orders or common operating pictures. Mid-flight drone hijacking.",
                      icon: <Terminal size={24} />
                    }
                  ].map((phase, idx) => (
                    <div key={idx} className="relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-amber-primary/30 transition-all group">
                       <div className="text-amber-secondary mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{phase.icon}</div>
                       <div className="text-[10px] mono text-text-dim uppercase tracking-[3px] mb-2">{phase.t}</div>
                       <h4 className="bebas text-2xl text-text-primary mb-4 tracking-wider">{phase.h}</h4>
                       <p className="text-[11px] text-text-muted leading-relaxed font-light italic">{phase.c}</p>
                    </div>
                  ))}
               </div>

               <div className="mt-12 p-8 border border-white/5 bg-black/20 rounded-3xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-primary/20 flex items-center justify-center border border-amber-primary/30">
                      <Cpu className="text-amber-secondary" />
                    </div>
                    <div>
                      <h5 className="bebas text-xl text-text-primary tracking-tight">Systemic Innovation In Ukraine</h5>
                      <p className="text-[10px] mono text-amber-secondary uppercase tracking-widest">Global Battleground Insight</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed font-light border-l-2 border-amber-primary/40 pl-6">
                    Warfare drives innovation. Russia's 2008 infiltration of classified defense networks (<strong className="text-white text-xs">Buckshot Yankee</strong>) has evolved into counter-drone electronic warfare where malicious code is inserted mid-flight. Modern systems like the <strong className="text-white text-xs">U.S. Tomahawk Strike Network</strong> now face the risk of attackers neutralizing missiles en route by exploiting shared vulnerabilities.
                  </p>
               </div>
            </div>
          </div>
        </section>

        <section id="mitigation" className="scroll-mt-32">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="mono text-[10px] tracking-[4px] text-amber-secondary uppercase">Section 10</span>
            <h2 className="bebas text-5xl text-text-primary uppercase tracking-tight">Mitigation <span className="text-amber-secondary">Steps</span></h2>
          </div>
          <div className="glass-card p-12 neon-amber flex flex-col items-center text-center">
             <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                <Lock size={32} className="text-red-500" />
             </div>
             <h3 className="bebas text-4xl text-text-primary mb-12 tracking-widest uppercase">Immediate Account Sanitation</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-[1000px] text-left">
                <div className="space-y-8">
                  <div>
                    <div className="bebas text-2xl text-amber-secondary mb-3 flex items-center gap-3">
                      <span className="text-white/10 select-none">M1</span>
                      Token Invalidation (MS/Google)
                    </div>
                    <p className="text-text-muted text-sm font-light leading-relaxed">
                      Generate <strong className="text-white">NEW backup codes</strong> in Advanced Security settings. This invalidates existing hijacked tokens and breaks persistent attacker sessions. Sign out everywhere immediately.
                    </p>
                  </div>
                  <div>
                    <div className="bebas text-2xl text-amber-secondary mb-3 flex items-center gap-3">
                      <span className="text-white/10 select-none">M2</span>
                      Sanitize Recovery Info
                    </div>
                    <p className="text-text-muted text-sm font-light leading-relaxed">
                      Audit all secondary emails. Purge <span className="font-mono text-amber-secondary">shadiashokry182@gmail.com</span> if present. Review and delete unknown app passwords or forwarding rules.
                    </p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="bebas text-2xl text-amber-secondary mb-3 flex items-center gap-3">
                      <span className="text-white/10 select-none">M3</span>
                      Client-Side Cleanup
                    </div>
                    <p className="text-text-muted text-sm font-light leading-relaxed">
                      Clear all browser cookies and hosted app data. Change passwords from <strong className="text-white">mobile data</strong> (bypassing potentially hijacked router DNS). remove all unknown extensions.
                    </p>
                  </div>
                  <div>
                    <div className="bebas text-2xl text-amber-secondary mb-3 flex items-center gap-3">
                      <span className="text-white/10 select-none">M4</span>
                      Conditional Access
                    </div>
                    <p className="text-text-muted text-sm font-light leading-relaxed">
                      College IT should enable <strong className="text-white">Conditional Access</strong> and restrict Device Code Flows to managed devices only. Avoid approving codes on secondary devices.
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </section>

        <section id="conclusion" className="scroll-mt-32">
          <div className="flex items-baseline gap-4 mb-4">
            <span className="mono text-[10px] tracking-[4px] text-amber-secondary uppercase">Section 11</span>
            <h2 className="bebas text-5xl text-text-primary uppercase tracking-tight">Final <span className="text-amber-secondary">Conclusion</span></h2>
          </div>
          <div className="glass-card p-10 neon-amber text-left">
             <div className="flex flex-col lg:flex-row gap-12 items-start">
               <div className="flex-1">
                 <p className="text-text-muted text-lg leading-relaxed font-light mb-8">
                   This is a verified, active, nationwide AI-driven session hijacking campaign. The correlation of <strong className="text-white">polling scripts, 404 errors, CSP violations, and silent sign-ins</strong> perfectly matches Microsoft threat reports. It is not a personal device hardware issue, but a sophisticated identity-layer campaign.
                 </p>
                 <div className="flex items-center gap-6">
                    <div className="border-l border-amber-primary/40 pl-6 py-2">
                       <div className="text-[10px] mono text-amber-secondary uppercase tracking-widest mb-1">Prepared By</div>
                       <div className="text-sm font-bold text-text-primary">Waleed Hassan</div>
                    </div>
                    <div className="border-l border-amber-primary/40 pl-6 py-2">
                       <div className="text-[10px] mono text-amber-secondary uppercase tracking-widest mb-1">Signature Hash</div>
                       <div className="text-[9px] font-mono text-text-muted">SDET_SEC_64x_2026_04_17</div>
                    </div>
                 </div>
               </div>
               <div className="lg:w-1/3 flex flex-col gap-3">
                  <div className="text-[10px] mono text-text-dim uppercase tracking-[3px] mb-2 border-b border-white/5 pb-2">Public References</div>
                  {["Microsoft Defender APR-06", "Sekoia EvilTokens Analysis", "The Hacker News - v26.04"].map((ref, idx) => (
                    <div key={idx} className="text-[9px] mono text-amber-light/30 uppercase tracking-widest py-1">[{idx + 1}] {ref}</div>
                  ))}
               </div>
             </div>
          </div>
        </section>

      </main>

      <footer className="py-24 text-center border-t border-white/5 mt-20 bg-bg-alt/50 relative z-10">
        <div className="bebas text-2xl text-text-muted/20 tracking-[10px] mb-6 uppercase select-none">EvilTokens Technical Portal</div>
        <p className="text-[10px] mono text-text-dim uppercase tracking-[5px] opacity-40">Prepared for: Alexandria College IT Security Office · Waleed Hassan · 2026</p>
      </footer>

      {/* Fixed Profile Card */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-[200] group"
      >
        <div className="glass-card p-6 border-amber-primary/30 w-[320px] shadow-[0_0_50px_rgba(0,0,0,0.8)] neon-amber relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-primary/50" />
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full border-2 border-amber-primary/50 p-0.5 overflow-hidden group-hover:border-amber-primary transition-all shadow-[0_0_15px_rgba(215,95,15,0.2)] group-hover:shadow-[0_0_20px_rgba(215,95_15,0.4)]">
              <img 
                src="https://lh3.googleusercontent.com/d/1oKvhSIGM_-RsROTpU-lfAmjZ-Nv78wV5" 
                alt="Waleed Hassan" 
                className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="bebas text-2xl text-text-primary tracking-wide leading-none">WALEED HASSAN</h4>
              <span className="text-[10px] mono text-amber-secondary uppercase tracking-[2px] mt-1">QA Manager · BA</span>
              <span className="text-[9px] text-text-muted mt-0.5">Alexandria, Egypt</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6 border-y border-white/5 py-4">
            <div className="text-center">
              <div className="text-lg bebas text-amber-secondary leading-none">15+</div>
              <div className="text-[8px] mono text-text-muted uppercase tracking-tighter">Years</div>
            </div>
            <div className="text-center border-x border-white/5">
              <div className="text-lg bebas text-amber-secondary leading-none">1000s</div>
              <div className="text-[8px] mono text-text-muted uppercase tracking-tighter">Tests</div>
            </div>
            <div className="text-center">
              <div className="text-lg bebas text-amber-secondary leading-none">3</div>
              <div className="text-[8px] mono text-text-muted uppercase tracking-tighter">Nations</div>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center text-[10px] mono">
              <span className="text-text-muted">EMAIL</span>
              <span className="text-amber-light">waleeedsaied@gmail.com</span>
            </div>
            <div className="flex justify-between items-center text-[10px] mono">
              <span className="text-text-muted">PHONE</span>
              <span className="text-amber-light">+20 150 116 5507</span>
            </div>
          </div>

          <a 
            href="https://www.linkedin.com/in/waleed-qa/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-amber-primary text-white bebas text-lg py-3 rounded-xl hover:bg-amber-secondary transition-colors shadow-lg"
          >
            <Linkedin size={18} />
            Connect on LinkedIn
          </a>
        </div>
      </motion.div>
    </div>
  );
}
