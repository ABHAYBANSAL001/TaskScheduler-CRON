// import Link from "next/link";
// import {
//   CheckCircle2,
//   CalendarClock,
//   Share2,
//   Linkedin,
//   Twitter,
//   MessageCircle,
//   ArrowRight,
//   ShieldCheck,
//   Zap,
//   Layout,
//   Menu,
// } from "lucide-react";

// export const dynamic = "force-static";

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-blue-600 selection:text-white">
//       <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
//               S
//             </div>
//             <span className="text-xl font-bold tracking-tight text-white">
//               Task Scheduler.
//             </span>
//           </div>

//           <div className="hidden md:flex items-center gap-8 text-sm font-medium">
//             <a
//               href="#features"
//               className="text-zinc-400 hover:text-white transition-colors"
//             >
//               Features
//             </a>
//             <a
//               href="#how-it-works"
//               className="text-zinc-400 hover:text-white transition-colors"
//             >
//               How it Works
//             </a>
//             <a
//               href="#pricing"
//               className="text-zinc-400 hover:text-white transition-colors"
//             >
//               Pricing
//             </a>
//           </div>

//           <div className="flex items-center gap-4">
//             <Link
//               href="/dashboard"
//               className="hidden sm:flex px-5 py-2 text-sm font-semibold bg-white text-black rounded-full hover:bg-zinc-200 transition shadow-lg shadow-white/5 items-center gap-2"
//             >
//               Get Started <ArrowRight className="w-4 h-4" />
//             </Link>
//             <button className="md:hidden text-white">
//               <Menu className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       <main className="pt-32 pb-24 relative overflow-hidden">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

//         <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-medium mb-8 hover:bg-white/10 transition cursor-default">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//             </span>
//             v2.0: Now with WhatsApp Channels
//           </div>

//           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 max-w-5xl mx-auto leading-[1.1]">
//             Write once. <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
//               Publish everywhere.
//             </span>
//           </h1>

//           <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
//             The minimal, static-first scheduling tool. Manage LinkedIn, X, and
//             WhatsApp from a single, blazing fast dashboard.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
//             <Link
//               href="/dashboard"
//               className="h-12 px-8 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition w-full sm:w-auto shadow-lg shadow-blue-900/40"
//             >
//               Start Free Trial
//             </Link>
//             <a
//               href="#how-it-works"
//               className="h-12 px-8 flex items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold rounded-lg hover:bg-zinc-800 transition w-full sm:w-auto"
//             >
//               How it Works
//             </a>
//           </div>

//           <div className="border-t border-white/5 pt-10">
//             <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-8">
//               Trusted integration with
//             </p>
//             <div className="flex justify-center items-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition duration-500">
//               <div className="flex items-center gap-2 font-semibold text-lg text-white">
//                 <Linkedin className="w-6 h-6 fill-white" />{" "}
//                 <span className="hidden sm:inline">LinkedIn</span>
//               </div>
//               <div className="flex items-center gap-2 font-semibold text-lg text-white">
//                 <Twitter className="w-6 h-6 fill-white" />{" "}
//                 <span className="hidden sm:inline">X (Twitter)</span>
//               </div>
//               <div className="flex items-center gap-2 font-semibold text-lg text-white">
//                 <MessageCircle className="w-6 h-6 fill-white" />{" "}
//                 <span className="hidden sm:inline">WhatsApp</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <section id="features" className="bg-black py-24 border-t border-white/5">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="text-center max-w-2xl mx-auto mb-16">
//             <h2 className="text-3xl font-bold text-white mb-4">
//               Precision tools. Zero bloat.
//             </h2>
//             <p className="text-zinc-400">
//               We stripped away the complexity. Schedulr focuses on the core
//               features that actually help you grow your audience.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             <FeatureCard
//               icon={<Share2 className="w-5 h-5 text-blue-400" />}
//               title="Multi-Channel Sync"
//               desc="Compose once. We adapt your content for LinkedIn, X, and WhatsApp automatically."
//             />
//             <FeatureCard
//               icon={<CalendarClock className="w-5 h-5 text-indigo-400" />}
//               title="Smart Time Slots"
//               desc="Set your recurring slots. We fill the queue and handle the timing based on engagement."
//             />
//             <FeatureCard
//               icon={<Zap className="w-5 h-5 text-amber-400" />}
//               title="Static Speed"
//               desc="Built on Next.js SSG. No spinners, no loading times. Instant dashboard access."
//             />
//             <FeatureCard
//               icon={<ShieldCheck className="w-5 h-5 text-teal-400" />}
//               title="Secure OAuth"
//               desc="We use official APIs only. No shady scraping bots that risk your account safety."
//             />
//             <FeatureCard
//               icon={<Layout className="w-5 h-5 text-rose-400" />}
//               title="Clean Interface"
//               desc="A distraction-free dark mode interface designed specifically for writing focus."
//             />
//             <FeatureCard
//               icon={<MessageCircle className="w-5 h-5 text-green-400" />}
//               title="WhatsApp Channels"
//               desc="Natively supports broadcasting to the new WhatsApp Channels feature."
//             />
//           </div>
//         </div>
//       </section>

//       <section
//         id="how-it-works"
//         className="bg-zinc-950 py-24 border-t border-white/5"
//       >
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="mb-16 md:text-center">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
//               Three steps to automation
//             </h2>
//             <p className="text-zinc-400 max-w-2xl mx-auto">
//               Stop manually copy-pasting content. Set up your workflow once.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 relative">
//             <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-zinc-800 via-blue-900 to-zinc-800" />

//             <div className="relative p-6 bg-black border border-white/10 rounded-2xl hover:border-blue-500/50 transition duration-300">
//               <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-white/10 flex items-center justify-center text-white font-bold text-xl mb-6 relative z-10 shadow-lg shadow-black">
//                 1
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">Connect</h3>
//               <p className="text-zinc-400 text-sm leading-relaxed">
//                 Link your LinkedIn, X, and WhatsApp accounts securely. We never
//                 store your passwords.
//               </p>
//             </div>

//             <div className="relative p-6 bg-black border border-white/10 rounded-2xl hover:border-blue-500/50 transition duration-300">
//               <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-white/10 flex items-center justify-center text-white font-bold text-xl mb-6 relative z-10 shadow-lg shadow-black">
//                 2
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">Draft</h3>
//               <p className="text-zinc-400 text-sm leading-relaxed">
//                 Write your updates in the editor. Our AI suggests hashtags and
//                 formats for each platform.
//               </p>
//             </div>

//             <div className="relative p-6 bg-black border border-white/10 rounded-2xl hover:border-blue-500/50 transition duration-300">
//               <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-white/10 flex items-center justify-center text-white font-bold text-xl mb-6 relative z-10 shadow-lg shadow-black">
//                 3
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">Schedule</h3>
//               <p className="text-zinc-400 text-sm leading-relaxed">
//                 Hit schedule. Our serverless cron engine fires your posts at the
//                 exact millisecond they are due.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="pricing" className="bg-black py-24 border-t border-white/5">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold text-white mb-4">
//               Simple, transparent pricing
//             </h2>
//             <p className="text-zinc-400">No hidden fees. Cancel anytime.</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
//             <div className="p-8 bg-zinc-900/30 rounded-3xl border border-white/5 hover:border-white/10 transition">
//               <div className="mb-4">
//                 <span className="text-zinc-400 font-medium text-sm uppercase tracking-wider">
//                   Starter
//                 </span>
//                 <div className="text-4xl font-bold text-white mt-4">$0</div>
//                 <p className="text-zinc-500 text-sm mt-2">Forever free</p>
//               </div>
//               <ul className="space-y-4 mb-8 border-t border-white/5 pt-8">
//                 <PricingCheck text="3 Social Accounts" />
//                 <PricingCheck text="10 Scheduled Posts" />
//                 <PricingCheck text="Basic Analytics" />
//                 <PricingCheck text="7-day History" />
//               </ul>
//               <Link
//                 href="/dashboard"
//                 className="block w-full py-3 rounded-xl border border-white/10 text-white font-medium text-center hover:bg-white/5 transition"
//               >
//                 Get Started
//               </Link>
//             </div>

//             <div className="p-8 bg-zinc-900 rounded-3xl border border-blue-600/50 relative shadow-2xl shadow-blue-900/10">
//               <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
//                 MOST POPULAR
//               </div>
//               <div className="mb-4">
//                 <span className="text-blue-400 font-medium text-sm uppercase tracking-wider">
//                   Pro Creator
//                 </span>
//                 <div className="text-4xl font-bold text-white mt-4">$15</div>
//                 <p className="text-zinc-500 text-sm mt-2">per month</p>
//               </div>
//               <ul className="space-y-4 mb-8 border-t border-white/5 pt-8">
//                 <PricingCheck text="Unlimited Accounts" highlighted />
//                 <PricingCheck text="Unlimited Posts" highlighted />
//                 <PricingCheck text="WhatsApp Channels" highlighted />
//                 <PricingCheck text="AI Writing Assistant" />
//                 <PricingCheck text="Priority Support" />
//               </ul>
//               <Link
//                 href="/dashboard"
//                 className="block w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-center hover:bg-blue-500 transition shadow-lg shadow-blue-900/20"
//               >
//                 Start Free Trial
//               </Link>
//             </div>

//             <div className="p-8 bg-zinc-900/30 rounded-3xl border border-white/5 hover:border-white/10 transition">
//               <div className="mb-4">
//                 <span className="text-zinc-400 font-medium text-sm uppercase tracking-wider">
//                   Agency
//                 </span>
//                 <div className="text-4xl font-bold text-white mt-4">$49</div>
//                 <p className="text-zinc-500 text-sm mt-2">per month</p>
//               </div>
//               <ul className="space-y-4 mb-8 border-t border-white/5 pt-8">
//                 <PricingCheck text="Everything in Pro" />
//                 <PricingCheck text="5 Team Members" />
//                 <PricingCheck text="Approval Workflows" />
//                 <PricingCheck text="White-label Reports" />
//               </ul>
//               <button className="block w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition">
//                 Contact Sales
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className="bg-zinc-950 border-t border-white/10 py-12">
//         <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="text-center md:text-left">
//             <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
//               <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded flex items-center justify-center text-white text-xs font-bold">
//                 S
//               </div>
//               <span className="font-bold text-white">Schedulr.</span>
//             </div>
//             <p className="text-zinc-500 text-sm">
//               &copy; 2026 Schedulr Inc. Built with Next.js SSG.
//             </p>
//           </div>

//           <div className="flex gap-8 text-sm font-medium text-zinc-500">
//             <a href="#" className="hover:text-white transition-colors">
//               Privacy
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               Terms
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               Twitter
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               GitHub
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// function FeatureCard({
//   icon,
//   title,
//   desc,
// }: {
//   icon: any;
//   title: string;
//   desc: string;
// }) {
//   return (
//     <div className="p-8 bg-zinc-900/50 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900 transition duration-300 group">
//       <div className="mb-5 bg-black w-12 h-12 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-blue-500/30 transition-colors">
//         {icon}
//       </div>
//       <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
//       <p className="text-zinc-400 leading-relaxed text-sm">{desc}</p>
//     </div>
//   );
// }

// function PricingCheck({
//   text,
//   highlighted = false,
// }: {
//   text: string;
//   highlighted?: boolean;
// }) {
//   return (
//     <li className="flex items-center gap-3">
//       <div
//         className={`w-5 h-5 rounded-full flex items-center justify-center ${
//           highlighted
//             ? "bg-blue-500/20 text-blue-400"
//             : "bg-zinc-800 text-zinc-500"
//         }`}
//       >
//         <CheckCircle2 className="w-3.5 h-3.5" />
//       </div>
//       <span
//         className={`text-sm ${highlighted ? "text-zinc-200" : "text-zinc-500"}`}
//       >
//         {text}
//       </span>
//     </li>
//   );
// }

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

      {/* --- HERO SECTION (Tightened) --- */}
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

      {/* --- FEATURES GRID (Denser) --- */}
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

      {/* --- PRICING (Compact) --- */}
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

      {/* --- FOOTER --- */}
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
