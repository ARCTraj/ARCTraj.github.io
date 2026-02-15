import React, { useState } from "react";
import { Link } from "react-router-dom";

const AUTHORS = [
  { name: "Sejin Kim" },
  { name: "Hayan Choi" },
  { name: "Seokki Lee" },
  { name: "Sundong Kim" },
];

const BIBTEX = `@inproceedings{kim2026arctraj,
  title={ARCTraj: A Dataset and Benchmark of Human Reasoning Trajectories for Abstract Problem Solving},
  author={Kim, Sejin and Choi, Hayan and Lee, Seokki and Kim, Sundong},
  booktitle={Proceedings of the 32nd ACM SIGKDD Conference on Knowledge Discovery and Data Mining: Datasets and Benchmarks},
  year={2026}
}`;

const ABSTRACT = `As artificial intelligence reasoning abilities gain prominence, understanding how humans approach abstract reasoning tasks becomes increasingly important. We introduce ARCTraj, a large-scale dataset capturing detailed human reasoning trajectories from interactive sessions on the Abstraction and Reasoning Corpus (ARC). Our dataset comprises approximately 10,000 trajectories across 400 ARC tasks, recording fine-grained, object-level actions that reveal how humans perceive, manipulate, and transform grid-based visual patterns. Each trajectory captures the complete sequence of operations—including object selection, color changes, movements, rotations, and other transformations—along with precise positional information and timestamps. We provide comprehensive benchmarking analyses revealing key insights into human problem-solving strategies, including selection biases in task engagement, systematic patterns in color attribution, and evidence of shared intentionality among participants. ARCTraj enables new research directions at the intersection of cognitive science and artificial intelligence, supporting studies in human reasoning analysis, trajectory-based learning, and the development of AI systems that can learn from human problem-solving processes.`;

const CONTRIBUTIONS = [
  {
    title: "Large-Scale Trajectory Dataset",
    description:
      "~10,000 human reasoning trajectories across 400 ARC tasks, capturing fine-grained object-level interactions.",
  },
  {
    title: "Object-Level Action Recording",
    description:
      "Complete sequences of operations including selection, color changes, movements, rotations, and transformations with precise positional data.",
  },
  {
    title: "Comprehensive Benchmarking",
    description:
      "Analysis of human problem-solving strategies revealing selection biases, color attribution patterns, and shared intentionality.",
  },
  {
    title: "New Research Directions",
    description:
      "Enables studies in human reasoning analysis, trajectory-based learning, and AI systems that learn from human problem-solving.",
  },
];

const ANALYSIS_HIGHLIGHTS = [
  {
    title: "Selection Bias in Task Engagement",
    description:
      "We discover systematic patterns in which tasks humans choose to attempt, revealing preferences for certain visual complexities and structural features.",
  },
  {
    title: "Color Attribution Patterns",
    description:
      "Analysis reveals consistent strategies in how participants assign and transform colors, suggesting shared cognitive frameworks for visual reasoning.",
  },
  {
    title: "Shared Intentionality",
    description:
      "Evidence of convergent problem-solving approaches among participants, indicating common reasoning pathways for abstract pattern recognition.",
  },
];

function SectionDivider() {
  return <div className="border-t border-[#212121] w-full" />;
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

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(BIBTEX);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4">
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
                {a.name}
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

      <SectionDivider />

      {/* Abstract Section */}
      <section className="py-20 px-4">
        <div className="max-w-screen-md mx-auto">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Abstract
          </h2>
          <p className="text-gray-300 leading-relaxed text-base">{ABSTRACT}</p>
          {/* ARC task examples */}
          <div className="mt-10 rounded-xl overflow-hidden bg-white p-4">
            <img
              src="/figures/arc_task_examples_2tasks.png"
              alt="Examples of ARC tasks: demonstration input-output pairs and test input with unknown output"
              className="w-full"
            />
          </div>
          <p className="mt-3 text-center text-gray-500 text-sm">
            Examples of ARC tasks with demonstration pairs and test problems
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Key Contributions Section */}
      <section className="py-20 px-4">
        <div className="max-w-screen-md mx-auto">
          <h2
            className="text-3xl font-bold mb-10"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Key Contributions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONTRIBUTIONS.map((item) => (
              <div
                key={item.title}
                className="border border-[#212121] rounded-xl p-6 bg-[#141414] hover:border-[#333] transition-colors"
              >
                <h3 className="text-lg font-semibold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          {/* Data generation pipeline */}
          <div className="mt-10 rounded-xl overflow-hidden bg-white p-4">
            <img
              src="/figures/data_generation_process.png"
              alt="Data generation process: Humans solve ARC tasks, generating task-solving trajectories that are logged into the ARCTraj dataset"
              className="w-full"
            />
          </div>
          <p className="mt-3 text-center text-gray-500 text-sm">
            Overview of the ARCTraj data generation process
          </p>
          {/* Action sequence structure */}
          <div className="mt-10 rounded-xl overflow-hidden bg-white p-4">
            <img
              src="/figures/arctraj_actionsequence_vertical.png"
              alt="ARCTraj action sequence structure showing logId, userId, taskId, and detailed operation steps"
              className="w-full"
            />
          </div>
          <p className="mt-3 text-center text-gray-500 text-sm">
            Structure of the ARCTraj action sequence data
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Analysis Highlights Section */}
      <section className="py-20 px-4">
        <div className="max-w-screen-md mx-auto">
          <h2
            className="text-3xl font-bold mb-10"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Analysis Highlights
          </h2>
          <div className="space-y-6">
            {ANALYSIS_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="border border-[#212121] rounded-xl p-6 bg-[#141414] hover:border-[#333] transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          {/* Analysis overview */}
          <div className="mt-10 rounded-xl overflow-hidden bg-white p-4">
            <img
              src="/figures/analysis_with_trajectory.png"
              alt="Analysis pipeline: extracting selection biases, color origins, and shared intentions from ARCTraj dataset"
              className="w-full"
            />
          </div>
          <p className="mt-3 text-center text-gray-500 text-sm">
            Benchmarking analyses extracted from ARCTraj
          </p>
          {/* Uniqueness analysis + Selection bias heatmap */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="rounded-xl overflow-hidden bg-white p-4">
                <img
                  src="/figures/uniqueness_analysis.png"
                  alt="Unique trajectory ratio distribution and example trajectory showing shared intentionality"
                  className="w-full"
                />
              </div>
              <p className="mt-3 text-center text-gray-500 text-sm">
                Unique trajectory ratio analysis
              </p>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden bg-white p-4">
                <img
                  src="/figures/heatmap_selection_size_distribution.png"
                  alt="Heatmap of selection size distribution showing width vs height patterns"
                  className="w-full"
                />
              </div>
              <p className="mt-3 text-center text-gray-500 text-sm">
                Selection size distribution heatmap
              </p>
            </div>
          </div>
          {/* Selection number distribution */}
          <div className="mt-10 rounded-xl overflow-hidden bg-white p-4">
            <img
              src="/figures/histogram_selection_number_distribution.png"
              alt="Histogram of selected pixels count distribution"
              className="w-full"
            />
          </div>
          <p className="mt-3 text-center text-gray-500 text-sm">
            Distribution of selected pixel counts across trajectories
          </p>
          {/* Trajectory ratios 2x2 grid */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="rounded-xl overflow-hidden bg-white p-3">
                <img
                  src={`/figures/trajectory_ratios_${n}.png`}
                  alt={`Trajectory ratio distribution ${n}`}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-gray-500 text-sm">
            Trajectory ratio distributions across different action categories
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Downstream Applications Section */}
      <section className="py-20 px-4">
        <div className="max-w-screen-md mx-auto">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Downstream Applications
          </h2>
          <p className="text-gray-400 text-base mb-10 leading-relaxed">
            ARCTraj enables trajectory-based learning approaches across multiple paradigms, including sequential decision-making, generative modeling, and reinforcement learning.
          </p>
          {/* Decision Transformer + GFlowNet side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="rounded-xl overflow-hidden bg-white p-4">
                <img
                  src="/figures/decision_transformer.png"
                  alt="Decision Transformer architecture for trajectory-based learning on ARC"
                  className="w-full"
                />
              </div>
              <p className="mt-3 text-center text-gray-500 text-sm">
                Decision Transformer
              </p>
            </div>
            <div>
              <div className="rounded-xl overflow-hidden bg-white p-4">
                <img
                  src="/figures/gflownet_diagram.png"
                  alt="GFlowNet action generation and state transition through ARCLE"
                  className="w-full"
                />
              </div>
              <p className="mt-3 text-center text-gray-500 text-sm">
                GFlowNet
              </p>
            </div>
          </div>
          {/* LDCQ pipeline - full width */}
          <div className="mt-8 rounded-xl overflow-hidden bg-white p-4">
            <img
              src="/figures/ldcq_pipeline.png"
              alt="LDCQ pipeline with diffusion model sampling and Q-network for action prediction"
              className="w-full"
            />
          </div>
          <p className="mt-3 text-center text-gray-500 text-sm">
            Latent Diffusion for Candidate Q-values (LDCQ)
          </p>
          {/* World Model Learning */}
          <div className="mt-8 rounded-xl overflow-hidden bg-white p-4">
            <img
              src="/figures/world_model_learning.png"
              alt="World model learning with encoder-decoder architecture for state prediction"
              className="w-full"
            />
          </div>
          <p className="mt-3 text-center text-gray-500 text-sm">
            World Model Learning
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* BibTeX / Footer Section */}
      <section className="py-20 px-4">
        <div className="max-w-screen-md mx-auto">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Citation
          </h2>
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

      {/* Footer */}
      <footer className="border-t border-[#212121] py-10 px-4">
        <div className="max-w-screen-md mx-auto text-center text-sm text-gray-500">
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="https://arxiv.org/abs/2506.05292"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              arXiv
            </a>
            <a
              href="https://huggingface.co/datasets/SejinKimm/ARCTraj"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              HuggingFace
            </a>
            <Link
              to="/viewer"
              className="hover:text-gray-300 transition-colors"
            >
              Demo
            </Link>
          </div>
          <p>ARCTraj &copy; 2026</p>
        </div>
      </footer>
    </div>
  );
}
