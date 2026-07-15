import { useEffect, useRef, useState } from "react";
import WindowsStartIcon from "@/assets/icons/windows-xp/windows-start.png";

type TaskbarApp = {
  id: string;
  title: string;
  active?: boolean;
};

type XPTaskbarProps = {
  apps?: TaskbarApp[];
  onAppClick?: (id: string) => void;
  onStartMenuItemClick?: (item: string) => void;
};

const defaultApps: TaskbarApp[] = [
  { id: "anomalysql", title: "AnomalySQL.exe", active: true },
];

export default function XPTaskbar({
  apps = defaultApps,
  onAppClick,
  onStartMenuItemClick,
}: XPTaskbarProps) {
  const [time, setTime] = useState<Date | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial time after mount to avoid hydration mismatch
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!startMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target as Node)) {
        setStartMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
  }, [startMenuOpen]);

  const timeString = time?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }) || "--:-- --";

  return (
    <>
      <div
        className="fixed bottom-0 left-0 w-full h-9 flex items-center z-30 overflow-visible"
        style={{
          background:
            "linear-gradient(to bottom, #1868ce 0%, #0e60cb 12%, #0e60cb 20%, #1164cf 32%, #1667cf 33%, #1b6cd3 47%, #1e70d9 54%, #2476dc 60%, #297ae0 65%, #3482e3 77%, #3786e5 79%, #428ee9 90%, #4791eb 100%)",
        }}
      >
        {/* top gloss highlight strip */}
        <div
          className="pointer-events-none absolute top-px left-0 w-full h-0.75 z-0"
          style={{
            background:
              "linear-gradient(to right, transparent 0, rgba(255,255,255,0.3) 1%, rgba(255,255,255,0.5) 2%, rgba(255,255,255,0.5) 95%, rgba(255,255,255,0.3) 98%, rgba(255,255,255,0.2) 99%, transparent 100%)",
            boxShadow: "inset 0 -1px 1px #0e60cb",
          }}
        />

        {/* Start button */}
        <div className="relative h-full z-10">
          <button
            type="button"
            className="relative w-26.25 h-full flex items-center gap-1.5 pl-3 text-white font-bold italic text-lg rounded-tr-[15px] rounded-br-[17px] shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            style={{
              background: "linear-gradient(to bottom, #67ae55, #578843)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setStartMenuOpen((s) => !s);
            }}
          >
            {/* gloss overlay */}
            <span
              className="pointer-events-none absolute top-0 left-0 w-full h-[55%] rounded-tr-[25px] opacity-80"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
              }}
            />
            {/* bottom shadow edge */}
            <span
              className="pointer-events-none absolute bottom-0 left-0 w-[92%] h-0.75 rounded-br-[17px]"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)",
              }}
            />

            <img 
              src={WindowsStartIcon} 
              alt="Windows Start" 
              width="20" 
              height="20" 
              className="relative z-10"
            />
            <span className="relative z-10 mb-1 font-thin text-xl">start</span>
          </button>

          {/* Start menu */}
          {startMenuOpen && (
            <div
              ref={startMenuRef}
              className="absolute bottom-9 left-0 w-64 z-40 border border-black bg-[#ECE9D8] shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#404040,2px_2px_6px_rgba(0,0,0,0.4)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-2">
                {["Login", "Register", "Options", "Shut Down"].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-4 py-2 text-sm text-black hover:bg-[#0A246A] hover:text-white"
                    style={{ fontFamily: "'Segoe UI', sans-serif" }}
                    onClick={() => {
                      onStartMenuItemClick?.(item);
                      setStartMenuOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Running apps */}
        <div className="flex items-center gap-1 h-full ml-2.5 px-1 overflow-hidden flex-1 z-10">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => onAppClick?.(app.id)}
              className={`h-7 px-4 min-w-5 max-w-43.75 flex items-center gap-2 text-sm text-white rounded-[3px] truncate ${
                app.active
                  ? "bg-[#2d5daf] shadow-[0_3px_0_rgba(0,0,0,0.3)] border-l-2 border-t-2 border-r border-b border-[#0b2042] border-r-[#003c74] border-b-[#003c74]"
                  : "border border-[#0174e0] hover:bg-[#53a3ff]"
              }`}
              style={
                app.active
                  ? undefined
                  : {
                      background: "linear-gradient(to bottom, #4f81fe, #3576f3, #4f81fe)",
                      boxShadow:
                        "inset 1px 1px 0px #a4bdec, inset -1px -1px 0px #2758cc, inset -2px -2px 0px #0064c1",
                    }
              }
            >
              <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0">
                <rect width="16" height="16" fill="#F5D547" stroke="#000" strokeWidth="0.5" />
              </svg>
              <span className="truncate">{app.title}</span>
            </button>
          ))}
        </div>

        {/* Tray / clock section */}
        <div
          className="h-full flex items-center border-l border-[#1042af] pl-3 pr-4 z-10 shrink-0"
          style={{
            background:
              "linear-gradient(to bottom, #0c59b9 1%, #139ee9 6%, #18b5f2 10%, #139beb 14%, #1290e8 19%, #0d8dea 63%, #0d9ff1 81%, #0f9eed 88%, #119be9 91%, #1392e2 94%, #137ed7 97%, #095bc9 100%)",
            boxShadow: "inset 1px 0 1px #18bbff",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" className="mr-3">
            <path d="M2 6h3l4-3v10l-4-3H2z" fill="#fff" />
            <path d="M11 5c1 1 1 5 0 6" stroke="#fff" strokeWidth="1.3" fill="none" />
          </svg>
          <span className="text-white text-sm">{timeString}</span>
        </div>
      </div>
    </>
  );
}