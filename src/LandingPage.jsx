import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

const AUTHORS = [
  { name: "Sejin Kim", href: "https://sejinkimm.github.io/" },
  { name: "Hayan Choi", href: "https://scholar.google.com/citations?user=JkTCZP4AAAAJ" },
  { name: "Seokki Lee", href: "https://albertree.com/" },
  { name: "Sundong Kim", href: "https://sundong.kim/" },
];

const BIBTEX = `@inproceedings{kim2026arctraj,
  title={ARCTraj: A Dataset and Benchmark of Human Reasoning Trajectories for Abstract Problem Solving},
  author={Kim, Sejin and Choi, Hayan and Lee, Seokki and Kim, Sundong},
  booktitle={Proceedings of the 32nd ACM SIGKDD Conference on Knowledge Discovery and Data Mining: Datasets and Benchmarks},
  year={2026}
}`;

const ABSTRACT = `As artificial intelligence reasoning abilities gain prominence, understanding how humans approach abstract reasoning tasks becomes increasingly important. We introduce ARCTraj, a large-scale dataset capturing detailed human reasoning trajectories from interactive sessions on the Abstraction and Reasoning Corpus (ARC). Our dataset comprises approximately 10,000 trajectories across 400 ARC tasks, recording fine-grained, object-level actions that reveal how humans perceive, manipulate, and transform grid-based visual patterns. Each trajectory captures the complete sequence of operations—including object selection, color changes, movements, rotations, and other transformations—along with precise positional information and timestamps. We provide comprehensive benchmarking analyses revealing key insights into human problem-solving strategies, including selection biases in task engagement, systematic patterns in color attribution, and evidence of shared intentionality among participants. ARCTraj enables new research directions at the intersection of cognitive science and artificial intelligence, supporting studies in human reasoning analysis, trajectory-based learning, and the development of AI systems that can learn from human problem-solving processes.`;

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt || ""}
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-zoom-out"
      />
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2
      className="text-3xl font-bold mb-10"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {children}
    </h2>
  );
}

function FigureCard({ src, alt, title, description, children, onImageClick }) {
  return (
    <div className="border border-[#212121] rounded-xl bg-[#141414] overflow-hidden hover:border-[#333] transition-colors h-full flex flex-col">
      <div
        className="bg-white p-4 cursor-zoom-in"
        onClick={() => onImageClick && src && onImageClick(src, alt)}
      >
        {children || (
          <img src={src} alt={alt} className="w-full" />
        )}
      </div>
      {(title || description) && (
        <div className="p-5 flex-grow flex flex-col">
          {title && (
            <h3 className="text-base font-semibold text-white mb-1.5">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-gray-400 text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function AppCard({ src, alt, title, description, links, onImageClick }) {
  const linkList = Array.isArray(links) ? links : [{ label: "Paper", href: links }];
  return (
    <div className="border border-[#212121] rounded-xl bg-[#141414] overflow-hidden hover:border-[#333] transition-colors">
      <div
        className="bg-white p-4 cursor-zoom-in"
        onClick={() => onImageClick && onImageClick(src, alt)}
      >
        <img src={src} alt={alt} className="w-full" />
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-3">{description}</p>
        <div className="flex gap-4">
          {linkList.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#5A9485] text-sm font-medium hover:underline"
            >
              {link.label}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function LinkButton({ href, children, external = true }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-white font-medium text-sm hover:border-[#5A9485] hover:bg-[#1f2f2b] transition-colors"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      to={href}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-white font-medium text-sm hover:border-[#5A9485] hover:bg-[#1f2f2b] transition-colors"
    >
      {children}
    </Link>
  );
}

export default function LandingPage() {
  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [showNav, setShowNav] = useState(false);
  const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const container = containerRef.current;
    const hero = heroRef.current;
    if (!container || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowNav(!entry.isIntersecting),
      { root: container, threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e) => {
      if (lightbox) return;
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"];
      if (!keys.includes(e.key)) return;

      e.preventDefault();
      const sections = container.querySelectorAll(":scope > section");
      const scrollTop = container.scrollTop;
      const threshold = 10;

      if (e.key === "Home") {
        sections[0]?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "End") {
        sections[sections.length - 1]?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "ArrowDown" || e.key === "PageDown") {
        for (const s of sections) {
          if (s.offsetTop > scrollTop + threshold) {
            s.scrollIntoView({ behavior: "smooth" });
            break;
          }
        }
      } else {
        const reversed = [...sections].reverse();
        for (const s of reversed) {
          if (s.offsetTop < scrollTop - threshold) {
            s.scrollIntoView({ behavior: "smooth" });
            break;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(BIBTEX);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#0E0E0E] text-white">
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}

      {/* Fixed bottom nav */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E0E]/90 backdrop-blur-sm border-t border-[#212121] py-3 px-4 transition-all duration-300 ${showNav ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <div className="flex justify-center gap-6 text-sm text-gray-400">
          <a
            href="https://arxiv.org/abs/2506.05292"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zm-3 13H8v-2h2v2zm4 0h-2v-2h2v2zm0-4H8v-2h6v2z" />
            </svg>
            Paper
          </a>
          <a
            href="https://huggingface.co/datasets/SejinKimm/ARCTraj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <img src="/hf-logo.svg" alt="HF" className="w-3.5 h-3.5 opacity-50" />
            Dataset
          </a>
          <Link
            to="/viewer"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Demo
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen snap-start flex flex-col items-center justify-center px-4">
        <div className="max-w-screen-md w-full mx-auto text-center">
          <h1
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ARCTraj
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed max-w-2xl mx-auto">
            A Dataset and Benchmark of Human Reasoning Trajectories for Abstract
            Problem Solving
          </p>
          <p className="text-sm text-gray-400 mb-2">
            {AUTHORS.map((a, i) => (
              <span key={a.name}>
                {a.href ? (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline underline-offset-2 transition-colors"
                  >
                    {a.name}
                  </a>
                ) : (
                  a.name
                )}
                {i < AUTHORS.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p className="text-sm text-[#5A9485] font-medium mb-8">
            KDD 2026 Datasets and Benchmarks
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <LinkButton href="https://arxiv.org/abs/2506.05292">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zm-3 13H8v-2h2v2zm4 0h-2v-2h2v2zm0-4H8v-2h6v2z" />
              </svg>
              Paper
            </LinkButton>
            <LinkButton href="https://huggingface.co/datasets/SejinKimm/ARCTraj">
              <img src="/hf-logo.svg" alt="HF" className="w-4 h-4" />
              Dataset
            </LinkButton>
            <LinkButton href="/viewer" external={false}>
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Demo
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Abstract Section */}
      <section className="min-h-screen snap-start border-t border-[#212121] py-20 px-4 flex flex-col justify-center">
        <div className="max-w-screen-lg mx-auto">
          <SectionTitle>Abstract</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
            <p className="text-gray-300 leading-relaxed text-base">{ABSTRACT}</p>
            <div className="w-72">
              <FigureCard
                src="/figures/arc_task_examples_2tasks.png"
                alt="Examples of ARC tasks: demonstration input-output pairs and test input with unknown output"
                title="ARC Task Examples"
                description="Each task consists of demonstration input-output pairs that define a hidden transformation rule, and a test input for which the solver must produce the correct output."
                onImageClick={openLightbox}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Data Collection Platform */}
      <section className="min-h-screen snap-start border-t border-[#212121] py-20 px-4 flex flex-col justify-center">
        <div className="max-w-screen-md mx-auto">
          <SectionTitle>Dataset Construction</SectionTitle>
          <div className="border border-[#212121] rounded-xl bg-[#141414] p-6 hover:border-[#333] transition-colors">
            <h3 className="text-base font-semibold text-white mb-2">
              O2ARC 3.0
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              ARCTraj is collected through O2ARC 3.0, an interactive web-based platform where participants solve ARC tasks using object-level operations such as selection, coloring, movement, rotation, and copy-paste. The platform records every action as a structured trajectory with precise positional and temporal information.
            </p>
            <a
              href="https://o2arc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#5A9485] text-sm font-medium hover:underline"
            >
              o2arc.com
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FigureCard
              src="/figures/data_generation_process.png"
              alt="Data generation process: Humans solve ARC tasks, generating task-solving trajectories that are logged into the ARCTraj dataset"
              title="Data Generation Pipeline"
              description="Humans solve ARC tasks through an interactive interface, generating object-oriented action trajectories logged as structured step sequences — resulting in 10,000+ annotated human trajectories."
              onImageClick={openLightbox}
            />
            <FigureCard
              src="/figures/arctraj_actionsequence_vertical.png"
              alt="ARCTraj action sequence structure showing logId, userId, taskId, and detailed operation steps"
              title="Action Sequence Structure"
              description="Each trajectory records the complete sequence of grid states, selected objects, operation types, and categories — capturing how humans incrementally build solutions through selection, coloring, and submission."
              onImageClick={openLightbox}
            />
          </div>
          {/* Dataset Summary Statistics */}
          <div className="mt-8 border border-[#212121] rounded-xl bg-[#141414] overflow-hidden hover:border-[#333] transition-colors">
            <div className="p-5 pb-0">
              <h3 className="text-base font-semibold text-white mb-1.5">
                Dataset Summary
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                ARCTraj provides large-scale, object-centric trajectory data — in contrast to existing datasets like H-ARC that only capture low-level pixel edits without structured abstraction.
              </p>
            </div>
            <div className="p-5">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-[#212121]">
                  {[
                    ["Number of trajectories", "10,672"],
                    ["Number of unique ARC tasks", "400"],
                    ["Number of users", "327"],
                    ["Mean trajectory length", "9.8"],
                    ["Success rate", "82.3%"],
                    ["Most frequent action type", "move"],
                    ["Average time per task", "42.7 sec"],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="py-2.5 text-gray-400">{label}</td>
                      <td className="py-2.5 text-white font-medium text-right">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Key Contributions Section */}
      <section className="min-h-screen snap-start border-t border-[#212121] py-20 px-4 flex flex-col justify-center">
        <div className="max-w-screen-md mx-auto">
          <SectionTitle>Key Contributions</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Large-Scale Trajectory Dataset",
                description: "~10,000 human reasoning trajectories across 400 ARC tasks, capturing fine-grained object-level interactions.",
              },
              {
                title: "Object-Level Action Recording",
                description: "Complete sequences of operations including selection, color changes, movements, rotations, and transformations with precise positional data.",
              },
              {
                title: "Comprehensive Benchmarking",
                description: "Analysis of human problem-solving strategies revealing selection biases, color attribution patterns, and shared intentionality.",
              },
              {
                title: "New Research Directions",
                description: "Enables studies in human reasoning analysis, trajectory-based learning, and AI systems that learn from human problem-solving.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-[#212121] rounded-xl p-6 bg-[#141414] hover:border-[#333] transition-colors"
              >
                <h3 className="text-lg font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Highlights Section */}
      <section className="min-h-screen snap-start border-t border-[#212121] py-20 px-4 flex flex-col justify-center">
        <div className="max-w-screen-md mx-auto">
          <SectionTitle>Analysis Highlights</SectionTitle>
          <FigureCard
            src="/figures/analysis_with_trajectory.png"
            alt="Analysis pipeline: extracting selection biases, color origins, and shared intentions from ARCTraj dataset"
            title="Overview"
            description="From the ARCTraj dataset, we extract three categories of benchmarking analyses — selection biases revealing where humans focus, color origins uncovering hidden patterns in color usage, and shared intentions identifying common problem-solving strategies across participants."
            onImageClick={openLightbox}
          />
          <div
            className="mt-8 grid grid-cols-1 md:grid-cols-[3fr_4fr_5fr] gap-6"
          >
            {/* Selection Biases */}
            <FigureCard
              src="/figures/heatmap_selection_size_distribution.png"
              alt="Heatmap of selection size distribution showing width vs height patterns"
              title="Selection Biases"
              description="Humans predominantly select small, compact regions — suggesting object-level rather than pixel-level reasoning."
              onImageClick={openLightbox}
            >
              <img
                src="/figures/heatmap_selection_size_distribution.png"
                alt="Heatmap of selection size distribution showing width vs height patterns"
                className="w-1/2 md:w-full mx-auto"
              />
            </FigureCard>
            {/* Color Origins */}
            <div className="border border-[#212121] rounded-xl bg-[#141414] overflow-hidden hover:border-[#333] transition-colors h-full flex flex-col">
              <div className="bg-white p-4 cursor-zoom-in">
                <div className="grid grid-cols-2 gap-2">
                  {[3, 4].map((n) => (
                    <img
                      key={n}
                      src={`/figures/trajectory_ratios_${n}.png`}
                      alt={`Trajectory ratio distribution ${n}`}
                      className="w-full"
                      onClick={() => openLightbox(`/figures/trajectory_ratios_${n}.png`, `Trajectory ratio distribution ${n}`)}
                    />
                  ))}
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-base font-semibold text-white mb-1.5">
                  Color Origins
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  66.5% of tasks are covered by test input colors alone; 100% with example outputs added.
                </p>
                <table className="w-full text-xs mt-auto">
                  <thead>
                    <tr className="border-b border-[#212121]">
                      <th className="py-1.5 text-left text-gray-500 font-medium">Coverage</th>
                      <th className="py-1.5 text-right text-gray-500 font-medium">#</th>
                      <th className="py-1.5 text-right text-gray-500 font-medium">%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#212121]">
                    {[
                      ["Test Input only", "266", "66.5"],
                      ["+ Example Output", "134", "33.5"],
                    ].map(([source, count, pct]) => (
                      <tr key={source}>
                        <td className="py-1.5 text-gray-400">{source}</td>
                        <td className="py-1.5 text-white font-medium text-right">{count}</td>
                        <td className="py-1.5 text-white font-medium text-right">{pct}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-[#333]">
                      <td className="py-1.5 text-gray-300 font-medium">Total</td>
                      <td className="py-1.5 text-white font-medium text-right">400</td>
                      <td className="py-1.5 text-white font-medium text-right">100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Shared Intentions */}
            <FigureCard
              src="/figures/uniqueness_analysis.png"
              alt="Unique trajectory ratio distribution and example trajectory showing shared intentionality"
              title="Shared Intentions"
              description="Many tasks show convergent solving strategies, indicating common reasoning pathways across participants."
              onImageClick={openLightbox}
            />
          </div>
        </div>
      </section>

      {/* Downstream Applications Section */}
      <section className="min-h-screen snap-start border-t border-[#212121] py-20 px-4 flex flex-col justify-center">
        <div className="max-w-screen-md mx-auto">
          <SectionTitle>Downstream Applications</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AppCard
              src="/figures/decision_transformer.png"
              alt="Decision Transformer architecture for trajectory-based learning on ARC"
              title="Decision Transformer"
              description="Applies Decision Transformer to ARC by augmenting state representations with object-level information, then further incorporating action intention signals to improve generalization."
              links={[
                { label: "ICML '23 Workshop", href: "https://arxiv.org/abs/2306.08204" },
                { label: "KDD '25", href: "https://dl.acm.org/doi/10.1145/3711896.3736831" },
              ]}
              onImageClick={openLightbox}
            />
            <AppCard
              src="/figures/gflownet_diagram.png"
              alt="GFlowNet action generation and state transition through ARCLE"
              title="GFlowNet"
              description="Generates diverse action sequences by modeling the distribution over trajectories proportional to a reward function."
              links={[{ label: "TMLR '25", href: "https://tmlr.infinite-conf.org/paper_pages/ULCOhBgGzy.html" }]}
              onImageClick={openLightbox}
            />
            <AppCard
              src="/figures/ldcq_pipeline.png"
              alt="Offline RL with latent diffusion model sampling and Q-network for action prediction"
              title="Offline RL with Latent Diffusion"
              description="Combines diffusion model sampling with Q-network evaluation to generate and select high-quality candidate actions in the latent space."
              links={[{ label: "arXiv '24", href: "https://arxiv.org/abs/2410.11324" }]}
              onImageClick={openLightbox}
            />
            <AppCard
              src="/figures/world_model_learning.png"
              alt="DreamerV3 world model learning with encoder-decoder architecture for state prediction"
              title="DreamerV3"
              description="Learns a latent dynamics model that encodes grid states and predicts future states given actions, enabling planning and imagination-based reasoning."
              links={[{ label: "IJCAI '24 Workshop", href: "https://arxiv.org/abs/2408.14855" }]}
              onImageClick={openLightbox}
            />
          </div>
        </div>
      </section>

      {/* BibTeX / Footer Section */}
      <section className="min-h-screen snap-start border-t border-[#212121] py-20 px-4 flex flex-col justify-center">
        <div className="max-w-screen-md mx-auto">
          <SectionTitle>Citation</SectionTitle>
          <div className="relative bg-[#141414] border border-[#212121] rounded-xl p-6">
            <button
              onClick={handleCopyBibtex}
              className="absolute top-4 right-4 text-xs text-gray-400 hover:text-white border border-[#333] rounded px-3 py-1 transition-colors bg-transparent"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre font-mono">
              {BIBTEX}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
