import Link from "next/link";
import {
  CheckCircle2,
  CalendarClock,
  Share2,
  Linkedin,
  Twitter,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layout,
  Menu,
  Command,
  ArrowUpRight,
} from "lucide-react";

export const dynamic = "force-static";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-400 font-sans selection:bg-blue-500/30">
      {/* --- SLIM NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center text-black shadow-sm">
              <Command className="w-4 h-4 stroke-[2.5px]" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white uppercase tracking-[0.1em]">
              Schedulr
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {["Features", "Workflow", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* <Link href="/login" className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white px-4">
              Login
            </Link> */}
            <Link
              href="/dashboard"
              className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest bg-white text-black rounded-md hover:bg-zinc-200 transition flex items-center gap-2"
            >
              Get Started <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-16 relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inset-0 rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            v2.0: WhatsApp Channel Support
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6 leading-[1.05]">
            Unified Social Pipeline. <br />
            <span className="text-zinc-500">Scheduled to Perfection.</span>
          </h1>

          <p className="text-sm md:text-base text-zinc-500 mb-8 max-w-xl mx-auto leading-relaxed">
            The high-density scheduling engine for modern creators. Manage X,
            LinkedIn, and WhatsApp from a single, zero-latency command center.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <Link
              href="/dashboard"
              className="h-10 px-6 flex items-center justify-center bg-blue-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-blue-500 transition shadow-lg shadow-blue-900/20 w-full sm:w-auto"
            >
              Start Free Trial
            </Link>
            <a
              href="#workflow"
              className="h-10 px-6 flex items-center justify-center bg-zinc-900/50 border border-white/10 text-zinc-400 text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-800 transition w-full sm:w-auto"
            >
              View Workflow
            </a>
          </div>

          {/* Trusted Platforms */}
          <div className="flex justify-center items-center gap-8 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 pb-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter">
              <Twitter size={14} /> X.com
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter">
              <Linkedin size={14} /> LinkedIn
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter">
              <MessageCircle size={14} /> WhatsApp
            </div>
          </div>
        </div>
      </main>

      <section id="features" className="py-16 bg-[#09090b]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            <FeatureCard
              icon={<Share2 className="w-4 h-4" />}
              title="Multi-Channel Sync"
              desc="Automatic content adaptation for X, LinkedIn, and WhatsApp broadcast channels."
            />
            <FeatureCard
              icon={<CalendarClock className="w-4 h-4" />}
              title="Pipeline Queue"
              desc="Set recurring slots. We handle the orchestration and precision delivery."
            />
            <FeatureCard
              icon={<Zap className="w-4 h-4" />}
              title="Zero-Latency"
              desc="Built for speed. Instant dashboard access with no loading spinners."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-4 h-4" />}
              title="Secure OAuth"
              desc="Official API compliance. Your account security is our baseline priority."
            />
            <FeatureCard
              icon={<Layout className="w-4 h-4" />}
              title="Writer Mode"
              desc="Distraction-free interface designed specifically for high-volume writing."
            />
            <FeatureCard
              icon={<Command className="w-4 h-4" />}
              title="Developer Grade"
              desc="Complete audit logs for every post execution and delivery status."
            />
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2 uppercase tracking-widest text-xs opacity-50">
              Pricing Units
            </h2>
            <p className="text-sm text-zinc-500">
              Scalable plans for creators and agencies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <PricingCard
              tier="Starter"
              price="0"
              features={[
                "3 Social Accounts",
                "10 Monthly Posts",
                "Basic Analytics",
              ]}
            />
            <PricingCard
              tier="Pro"
              price="15"
              highlight
              features={[
                "Unlimited Accounts",
                "Unlimited Posts",
                "WhatsApp Channels",
                "Priority Delivery",
              ]}
            />
            <PricingCard
              tier="Agency"
              price="49"
              features={["5 Team Seats", "White-label Reports", "API Access"]}
            />
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Command size={16} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Schedulr.
            </span>
            <span className="text-[10px] text-zinc-600 font-mono">
              v2.0.4-stable
            </span>
          </div>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              System Status
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 bg-[#09090b] hover:bg-white/[0.02] transition-colors group">
      <div className="mb-4 text-blue-500 group-hover:scale-110 transition-transform duration-500 origin-left">
        {icon}
      </div>
      <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-2">
        {title}
      </h3>
      <p className="text-[12px] text-zinc-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ tier, price, features, highlight = false }: any) {
  return (
    <div
      className={`p-6 rounded-2xl border transition-all ${highlight ? "bg-zinc-900 border-blue-500/50 shadow-2xl shadow-blue-500/5" : "bg-zinc-900/30 border-white/5 hover:border-white/10"}`}
    >
      <div className="mb-6">
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.2em] ${highlight ? "text-blue-400" : "text-zinc-500"}`}
        >
          {tier}
        </span>
        <div className="flex items-baseline gap-1 mt-3">
          <span className="text-3xl font-bold text-white tracking-tighter">
            ${price}
          </span>
          <span className="text-xs text-zinc-600">/mo</span>
        </div>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((f: any) => (
          <li
            key={f}
            className="flex items-center gap-2 text-[11px] text-zinc-400"
          >
            <CheckCircle2
              size={12}
              className={highlight ? "text-blue-400" : "text-zinc-600"}
            />{" "}
            {f}
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${highlight ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20" : "border border-white/10 text-white hover:bg-white/5"}`}
      >
        Get Started
      </button>
    </div>
  );
}
