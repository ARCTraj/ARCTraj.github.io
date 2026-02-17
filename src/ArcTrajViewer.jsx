import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";

const HARDCODED_TASK_IDS = [
  "007bbfb7", "00d62c1b", "017c7c7b", "025d127b", "045e512c", "0520fde7", "05269061", "05f2a901", "06df4c85", "08ed6ac7", "09629e4f", "0962bcdd", "0a938d79", "0b148d64", "0ca9ddb6", "0d3d703e",
  "0dfd9992", "0e206a2e", "10fcaaa3", "11852cab", "1190e5a7", "137eaa0f", "150deff5", "178fcbfb", "1a07d186", "1b2d62fb", "1b60fb0c", "1bfc4729", "1c786137", "1caeab9d", "1cf80156", "1e0a9b12",
  "1e32b0e9", "1f0c79e5", "1f642eb9", "1f85a75f", "1f876c06", "1fad071e", "2013d3e2", "2204b7a8", "22168020", "22233c11", "2281f1f4", "228f6490", "22eb0ac0", "234bbc79", "23581191", "239be575",
  "23b5c85d", "253bf280", "25d487eb", "25d8a9c8", "25ff71a9", "264363fd", "272f95fa", "27a28665", "28bf18c6", "28e73c20", "29623171", "29c11459", "29ec7d0e", "2bcee788", "2bee17df", "2c608aff",
  "2dc579da", "2dd70a9a", "2dee498d", "31aa019c", "321b1fc6", "32597951", "3345333e", "3428a4f5", "3618c87e", "3631a71a", "363442ee", "36d67576", "36fdfd69", "3906de3d", "39a8645d", "39e1d7f9",
  "3aa6fb7a", "3ac3eb23", "3af2c5a8", "3bd67248", "3bdb4ada", "3befdf3e", "3c9b0459", "3de23699", "3e980e27", "3eda0437", "3f7978a0", "40853293", "4093f84a", "41e4d17e", "4258a5f9", "4290ef0e",
  "42a50994", "4347f46a", "444801d8", "445eab21", "447fd412", "44d8ac46", "44f52bb0", "4522001f", "4612dd53", "46442a0e", "469497ad", "46f33fce", "47c1f68c", "484b58aa", "48d8fb45", "4938f0c2",
  "496994bd", "49d1d64f", "4be741c5", "4c4377d9", "4c5c2cf0", "50846271", "508bd3b6", "50cb2852", "5117e062", "5168d44c", "539a4f51", "53b68214", "543a7ed5", "54d82841", "54d9e175", "5521c0d9",
  "5582e5ca", "5614dbcf", "56dc2b01", "56ff96f3", "57aa92db", "5ad4f10b", "5bd6f4ac", "5c0a986e", "5c2c9af4", "5daaa586", "60b61512", "6150a2bd", "623ea044", "62c24649", "63613498", "6430c8c4",
  "6455b5f5", "662c240a", "67385a82", "673ef223", "6773b310", "67a3c6ac", "67a423a3", "67e8384a", "681b3aeb", "6855a6e4", "68b16354", "694f12f3", "6a1e5592", "6aa20dc0", "6b9890af", "6c434453",
  "6cdd2623", "6cf79266", "6d0160f0", "6d0aefbc", "6d58a25d", "6d75e8bb", "6e02f1e3", "6e19193c", "6e82a1ae", "6ecd11f4", "6f8cd79b", "6fa7a44f", "72322fa7", "72ca375d", "73251a56", "7447852a",
  "7468f01a", "746b3537", "74dd1130", "75b8110e", "760b3cac", "776ffc46", "77fdfe62", "780d0b14", "7837ac64", "794b24be", "7b6016b9", "7b7f7511", "7c008303", "7ddcd7ec", "7df24a62", "7e0986d6",
  "7f4411dc", "7fe24cdd", "80af3007", "810b9b61", "82819916", "83302e8f", "834ec97d", "8403a5d5", "846bdb03", "855e0971", "85c4e7cd", "868de0fa", "8731374e", "88a10436", "88a62173", "890034e9",
  "8a004b2b", "8be77c9e", "8d5021e8", "8d510a79", "8e1813be", "8e5a5113", "8eb1be9a", "8efcae92", "8f2ea7aa", "90c28cc7", "90f3ed37", "913fb3ed", "91413438", "91714a58", "9172f3a0", "928ad970",
  "93b581b8", "941d9a10", "94f9d214", "952a094c", "9565186b", "95990924", "963e52fc", "97999447", "97a05b5b", "98cf29f8", "995c5fa3", "99b1bc43", "99fa7670", "9aec4887", "9af7a82c", "9d9215db",
  "9dfd6313", "9ecd008a", "9edfc990", "9f236235", "a1570a43", "a2fd1cf0", "a3325580", "a3df8b1e", "a416b8f3", "a48eeaf7", "a5313dff", "a5f85a15", "a61ba2ce", "a61f2674", "a64e4611", "a65b410d",
  "a68b268e", "a699fb00", "a740d043", "a78176bb", "a79310a0", "a85d4709", "a87f7484", "a8c38be5", "a8d7556c", "a9f96cdd", "aabf363d", "aba27056", "ac0a08a4", "ae3edfdc", "ae4f1146", "aedd82e4",
  "af902bf9", "b0c4d837", "b190f7f5", "b1948b0a", "b230c067", "b27ca6d3", "b2862040", "b527c5c6", "b548a754", "b60334d2", "b6afb2da", "b7249182", "b775ac94", "b782dc8a", "b8825c91", "b8cdaf2b",
  "b91ae062", "b94a9452", "b9b7f026", "ba26e723", "ba97ae07", "bb43febb", "bbc9ae5d", "bc1d5164", "bd4472b8", "bda2d7a6", "bdad9b1f", "be94b721", "beb8660c", "c0f76784", "c1d99e64", "c3e719e8",
  "c3f564a4", "c444b776", "c59eb873", "c8cbb738", "c8f0f002", "c909285e", "c9e6f938", "c9f8e694", "caa06a1f", "cbded52d", "cce03e0d", "cdecee7f", "ce22a75a", "ce4f8723", "ce602527", "ce9e57f2",
  "cf98881b", "d037b0a7", "d06dbe63", "d07ae81c", "d0f5fe59", "d10ecb37", "d13f3404", "d22278a0", "d23f8c26", "d2abd087", "d364b489", "d406998b", "d43fd935", "d4469b4b", "d4a91cb9", "d4f3cd78",
  "d511f180", "d5d6de2d", "d631b094", "d687bc17", "d6ad076f", "d89b689b", "d8c310e9", "d90796e8", "d9f24cd1", "d9fac9be", "dae9d2b5", "db3e9e38", "db93a21d", "dbc1a6ce", "dc0a314f", "dc1df850",
  "dc433765", "ddf7fa4f", "de1cd16c", "ded97339", "e179c5f4", "e21d9049", "e26a3af2", "e3497940", "e40b9e2f", "e48d4e1a", "e5062a87", "e509e548", "e50d258f", "e6721834", "e73095fd", "e76a88a6",
  "e8593010", "e8dc4411", "e9614598", "e98196ab", "e9afcf9a", "ea32f347", "ea786f4a", "eb281b96", "eb5a1d5d", "ec883f72", "ecdecbb3", "ed36ccf7", "ef135b50", "f15e1fac", "f1cefba8", "f25fbde4",
  "f25ffba3", "f2829549", "f35d900a", "f5b8619d", "f76d97a5", "f8a8fe49", "f8b3ba0a", "f8c80d96", "f8ff0b80", "f9012d9b", "fafffa47", "fcb5c309", "fcc82909", "feca6190", "ff28f65a", "ff805c23"
];

const CSV_FILES = [
  "/ARCTraj_with_scores_01.csv",
  "/ARCTraj_with_scores_02.csv",
  "/ARCTraj_with_scores_03.csv"
];

const colorMap = {
  0: "bg-black",
  1: "bg-blue-500",
  2: "bg-red-500",
  3: "bg-green-500",
  4: "bg-yellow-400",
  5: "bg-gray-400",
  6: "bg-pink-500",
  7: "bg-orange-500",
  8: "bg-sky-300",
  9: "bg-rose-800"
};

const ARC_BASE_URL = "https://raw.githubusercontent.com/fchollet/ARC-AGI/master/data/training";

function MiniGrid({ grid, maxSize = 80 }) {
  if (!grid || !grid.length) return null;
  const rows = grid.length;
  const cols = grid[0].length;
  const cell = Math.max(Math.floor(Math.min(maxSize / cols, maxSize / rows)), 2);
  return (
    <div
      className="grid shrink-0"
      style={{ gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gap: "1px" }}
    >
      {grid.map((row, y) =>
        row.map((val, x) => (
          <div
            key={`${x}-${y}`}
            className={colorMap[val] || "bg-gray-300"}
            style={{ width: cell, height: cell }}
          />
        ))
      )}
    </div>
  );
}

export default function ArcTrajViewer() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedLogId, setSelectedLogId] = useState(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const viewerRef = useRef(null);
  const [cellSize, setCellSize] = useState(40);
  const [arcTask, setArcTask] = useState(null);
  const [showTask, setShowTask] = useState(true);

  const selectRandomLog = useCallback((taskList) => {
    const allLogs = taskList.flatMap(t => t.logs.map(l => ({ taskId: t.id, ...l })));
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const ideal = allLogs.filter(l => l.score >= 85000 && l.score <= 93000);
    const wider = allLogs.filter(l => l.score >= 85000 && l.score < 98000);
    const safe = allLogs.filter(l => l.score > 0 && l.score < 98000);
    const candidates = ideal.length > 0 ? ideal : wider.length > 0 ? wider : safe.length > 0 ? safe : allLogs;
    const chosen = pick(candidates);
    if (chosen) {
      setSelectedTaskId(chosen.taskId);
      setSelectedLogId(chosen.logId);
      setStep(0);
    }
  }, []);

  useEffect(() => {
    Promise.all(CSV_FILES.map(path => fetch(path).then(res => res.text())))
      .then(fileTexts => {
        const allRows = [];

        for (const text of fileTexts) {
          const parsed = Papa.parse(text, { header: true });
          allRows.push(...parsed.data.filter(r => r.logId && r.taskId && r.actionSequence));
        }

        const grouped = {};
        for (const row of allRows) {
          const rawTaskId = row.taskId?.trim();
          if (!HARDCODED_TASK_IDS.includes(rawTaskId)) continue;

          const { logId, score, actionSequence } = row;
          let trajectory;
          try {
            trajectory = JSON.parse(actionSequence).map((entry, idx) => ({
              time: idx,
              grid: entry.grid,
              objects: entry.object || [],
              action: entry.operation
            }));
          } catch {
            continue;
          }

          if (!grouped[rawTaskId]) grouped[rawTaskId] = [];
          grouped[rawTaskId].push({
            logId: Number(logId),
            score: Number(score),
            trajectory
          });
        }

        const taskList = HARDCODED_TASK_IDS.map(taskId => {
          const logs = grouped[taskId] || [];
          logs.sort((a, b) => b.score - a.score);
          return { id: taskId, logs };
        });

        setTasks(taskList);
        setLoading(false);

        // Auto-select a random task/log on first load
        selectRandomLog(taskList);
      });
  }, []);

  useEffect(() => {
    if (!selectedTaskId) { setArcTask(null); return; }
    setArcTask(null);
    fetch(`${ARC_BASE_URL}/${selectedTaskId}.json`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setArcTask(data))
      .catch(() => setArcTask(null));
  }, [selectedTaskId]);

  const selectedTask = tasks.find(task => task.id === selectedTaskId);
  const selectedLog = selectedTask?.logs.find(log => log.logId === selectedLogId);
  const trajectory = useMemo(() => selectedLog?.trajectory || [], [selectedLog]);
  const currentState = trajectory[step];

  const updateCellSize = useCallback(() => {
    if (!currentState || !viewerRef.current) return;
    const el = viewerRef.current;
    const cols = currentState.grid[0].length;
    const rows = currentState.grid.length;
    const gap = 2;
    const padding = 48;
    const reservedHeight = 120;
    const availW = el.clientWidth - padding - (cols - 1) * gap;
    const availH = el.clientHeight - reservedHeight - (rows - 1) * gap;
    const size = Math.min(Math.floor(availW / cols), Math.floor(availH / rows), 40);
    setCellSize(Math.max(size, 4));
  }, [currentState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!trajectory.length) return;
      if (e.key === "ArrowRight") {
        setStep(prev => Math.min(prev + 1, trajectory.length - 1));
      } else if (e.key === "ArrowLeft") {
        setStep(prev => Math.max(prev - 1, 0));
      }
    };

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const delta = touchEndX - touchStartX;
      if (delta < -50) {
        setStep(prev => Math.min(prev + 1, trajectory.length - 1));
      } else if (delta > 50) {
        setStep(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [trajectory]);

  useEffect(() => {
    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, [updateCellSize]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#0E0E0E] text-white">
      {/* 상단 헤더 */}
      <div className="border-b border-[#212121] py-3 px-4 md:px-6 flex items-center gap-2 md:gap-4">
        <Link
          to="/"
          className="text-gray-400 hover:text-[#5A9485] transition-colors text-sm flex items-center gap-1.5 shrink-0"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="hidden md:inline">Home</span>
        </Link>
        {/* Mobile: sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarOpen
              ? <path d="M18 6L6 18M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />
            }
          </svg>
        </button>
        <div className="flex-grow text-center">
          <h1
            className="text-base md:text-xl font-bold tracking-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ARCTraj Interactive Demo
          </h1>
        </div>
        <div className="flex gap-2 shrink-0">
          <a
            href="https://arxiv.org/abs/2506.05292"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-white text-sm hover:border-[#5A9485] hover:bg-[#1f2f2b] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zm-3 13H8v-2h2v2zm4 0h-2v-2h2v2zm0-4H8v-2h6v2z" />
            </svg>
            <span className="hidden md:inline">Paper</span>
          </a>
          <a
            href="https://huggingface.co/datasets/SejinKimm/ARCTraj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-white text-sm hover:border-[#5A9485] hover:bg-[#1f2f2b] transition-colors"
          >
            <img src="/hf-logo.svg" alt="HF" className="w-4 h-4" />
            <span className="hidden md:inline">Dataset</span>
          </a>
        </div>
      </div>

      {/* 본문 레이아웃 */}
      <div className="flex flex-grow overflow-hidden relative">
        {/* 모바일 오버레이 배경 */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* 왼쪽 사이드바 */}
        <div className={`
          fixed md:relative z-30 md:z-auto
          w-64 shrink-0 h-[calc(100vh-3.5rem)] overflow-y-auto
          bg-[#141414] border-r border-[#212121] flex flex-col
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <div className="sticky top-0 z-10 bg-[#141414] border-b border-[#212121] py-3 px-4">
            <h2
              className="text-sm font-semibold text-gray-300 uppercase tracking-wider"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Tasks
            </h2>
          </div>
          {!loading && (
            <ul className="px-2 py-2 space-y-0.5">
              {tasks.map((task) => (
                <li key={task.id} className="flex flex-col">
                  <div
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-sm font-mono transition-colors ${
                      selectedTaskId === task.id
                        ? "bg-[#5A9485]/20 text-[#5A9485] border border-[#5A9485]/30"
                        : "hover:bg-[#1a1a1a] text-gray-300 border border-transparent"
                    }`}
                    onClick={() => {
                      if (selectedTaskId === task.id) {
                        setSelectedTaskId(null);
                        setSelectedLogId(null);
                        setStep(0);
                      } else {
                        setSelectedTaskId(task.id);
                        setSelectedLogId(null);
                        setStep(0);
                      }
                    }}
                  >
                    {task.id}
                  </div>

                  {selectedTaskId === task.id && (
                    <>
                    {arcTask && (
                      <div className="ml-3 mt-1.5 mb-1 flex items-center gap-1.5">
                        <MiniGrid grid={arcTask.train[0].input} maxSize={32} />
                        <svg className="w-2.5 h-2.5 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <MiniGrid grid={arcTask.train[0].output} maxSize={32} />
                      </div>
                    )}
                    <ul className="ml-3 mt-1 mb-1 space-y-0.5 border-l border-[#333] pl-2 max-h-48 overflow-y-auto">
                      {task.logs.map((log) => (
                        <li
                          key={log.logId}
                          className={`cursor-pointer px-2 py-1 rounded text-xs transition-colors ${
                            selectedLogId === log.logId
                              ? "bg-[#5A9485]/20 text-[#5A9485]"
                              : "hover:bg-[#1a1a1a] text-gray-400"
                          }`}
                          onClick={() => {
                            setSelectedLogId(log.logId);
                            setStep(0);
                            setSidebarOpen(false);
                          }}
                        >
                          log #{log.logId} <span className="text-gray-500">(score: {log.score})</span>
                        </li>
                      ))}
                    </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 오른쪽 Trajectory Viewer */}
        <div ref={viewerRef} className="flex-grow p-6 flex flex-col items-start overflow-auto">
          {/* ARC Task toggle */}
          {selectedTaskId && arcTask && (
            <div className="w-full mb-3">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setShowTask(!showTask)}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  <svg className={`w-3 h-3 transition-transform ${showTask ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5l8 7-8 7z" />
                  </svg>
                  Task: {selectedTaskId}
                </button>
                <button
                  onClick={() => selectRandomLog(tasks)}
                  className="p-1 rounded text-gray-500 hover:text-white transition-colors"
                  title="Random Task"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                  </svg>
                </button>
              </div>
              {showTask && (
                <div className="border border-[#212121] rounded-lg bg-[#141414] p-3 mb-1">
                  <div className="flex flex-wrap gap-4">
                    {arcTask.train.map((pair, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 mb-1">In {i + 1}</p>
                          <MiniGrid grid={pair.input} />
                        </div>
                        <svg className="w-3 h-3 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <div className="text-center">
                          <p className="text-[10px] text-gray-500 mb-1">Out {i + 1}</p>
                          <MiniGrid grid={pair.output} />
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <div className="text-center">
                        <p className="text-[10px] text-[#5A9485] mb-1 font-medium">Test</p>
                        <MiniGrid grid={arcTask.test[0].input} />
                      </div>
                      <svg className="w-3 h-3 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      <div className="text-center">
                        <p className="text-[10px] text-gray-500 mb-1">?</p>
                        <div className="w-10 h-10 border border-[#333] rounded flex items-center justify-center text-gray-500 text-xs">?</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedTask && selectedLogId && (
            <div className="w-full mb-3">
              <select
                value={selectedLogId}
                onChange={(e) => { setSelectedLogId(Number(e.target.value)); setStep(0); }}
                className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white cursor-pointer"
              >
                {selectedTask.logs.map(log => (
                  <option key={log.logId} value={log.logId}>
                    Log #{log.logId} (score: {log.score})
                  </option>
                ))}
              </select>
            </div>
          )}
          {currentState ? (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => setStep(prev => Math.max(prev - 1, 0))}
                  disabled={step === 0}
                  className="p-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-white hover:border-[#5A9485] transition-colors disabled:opacity-30 disabled:hover:border-[#333]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <p className="text-sm text-gray-400 w-48 truncate">
                  Step <span className="text-white font-medium">{step + 1}/{trajectory.length}</span>
                  <span className="mx-2 text-[#333]">|</span>
                  <span className="text-gray-300">{currentState.action}</span>
                </p>
                <button
                  onClick={() => setStep(prev => Math.min(prev + 1, trajectory.length - 1))}
                  disabled={step === trajectory.length - 1}
                  className="p-1.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-white hover:border-[#5A9485] transition-colors disabled:opacity-30 disabled:hover:border-[#333]"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${currentState.grid[0].length}, ${cellSize}px)`,
                  gap: "2px"
                }}
              >
                {currentState.grid.map((row, y) =>
                  row.map((val, x) => {
                    const objectHere = currentState.objects.find(o => o.x === x && o.y === y);
                    const isSelected = objectHere !== undefined;
                    const colorClass = colorMap[objectHere ? objectHere.color : val] || "bg-gray-300";
                    const extraClass = isSelected ? "ring-2 ring-[#5A9485]" : "";
                    return (
                      <div
                        key={`${x}-${y}`}
                        className={`${colorClass} ${extraClass}`}
                        style={{ width: cellSize, height: cellSize }}
                      />
                    );
                  })
                )}
              </div>
              {step === trajectory.length - 1 && trajectory.length > 1 && (
                <>
                  <button
                    onClick={() => selectRandomLog(tasks)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5A9485] text-white text-sm font-medium hover:bg-[#4a8374] transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                    </svg>
                    Try Another Task
                  </button>
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden mt-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    or browse all 400 tasks
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center w-full gap-3">
              {loading ? (
                <>
                  <svg className="w-6 h-6 text-[#5A9485] animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="text-gray-500 text-sm">Loading ARCTraj...</p>
                </>
              ) : (
                <p className="text-gray-500 text-sm">Select a task and log from the sidebar.</p>
              )}
              {/* Previous empty state UI (preserved for rollback):
              <p className="text-gray-500 text-sm">Select a task and log to view the trajectory.</p>
              <button
                onClick={() => setSidebarOpen(true)}
                className={`md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#333] text-sm text-gray-300 hover:border-[#5A9485] transition-colors ${loading ? "hidden" : ""}`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
                Open Task List
              </button>
              */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
