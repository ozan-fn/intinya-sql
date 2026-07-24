import { useState } from "react";
import { authClient } from "@/lib/auth-client";

// Import Windows XP icons
import internetIcon from "@/assets/icons/windows-xp/internet-icon.ico";
import myMusicIcon from "@/assets/icons/windows-xp/mymusic-icon.ico";
import shutdownIcon from "@/assets/icons/windows-xp/shutdown-icon.ico";
import logoutIcon from "@/assets/icons/windows-xp/logout-icon.ico";
import myComputerIcon from "@/assets/icons/windows-xp/mycomputer-icon.ico";
import searchIcon from "@/assets/icons/windows-xp/search-icon.ico";
import controlPanelIcon from "@/assets/icons/windows-xp/control-panel-icon.ico";
import greenRightIcon from "@/assets/icons/windows-xp/greenright-icon.ico";
import helpIcon from "@/assets/icons/windows-xp/help-icon.ico";

type XPStartMenuProps = {
  username?: string;
  onClose: () => void;
  onItemClick?: (item: string) => void;
};

type MenuItemType = {
  icon?: string;
  text?: string;
  subtext?: string;
  bold?: boolean;
  hasSubmenu?: boolean;
  submenuItems?: MenuItemType[];
  type?: "item" | "separator";
};

export default function XPStartMenu({ username = "Guest", onClose, onItemClick }: XPStartMenuProps) {
  const [showLogOffModal, setShowLogOffModal] = useState(false);
  const [showTurnOffModal, setShowTurnOffModal] = useState(false);

  const handleLogOff = () => {
    setShowLogOffModal(true);
  };

  const handleTurnOff = () => {
    setShowTurnOffModal(true);
  };

  const handleLogOffConfirm = async () => {
    await authClient.signOut();
    setShowLogOffModal(false);
    onClose();
    window.location.reload();
  };

  const handleItemClick = (item: string) => {
    onItemClick?.(item);
  };

  const leftMenuItems: MenuItemType[] = [
    { text: "Internet", subtext: "Internet Explorer", bold: true, icon: internetIcon },
    { text: "E-mail", subtext: "Outlook Express", bold: true },
    { type: "separator" },
    { text: "Notepad" },
    { text: "Calculator" },
    { text: "Paint" },
    { text: "Media Player" },
    { text: "Messenger" },
  ];

  const rightMenuItems: MenuItemType[] = [
    { text: "My Documents", bold: true },
    { text: "My Recent Documents", bold: true, hasSubmenu: true },
    { text: "My Pictures", bold: true },
    { text: "My Music", bold: true, icon: myMusicIcon },
    { text: "My Computer", bold: true, icon: myComputerIcon },
    { type: "separator" },
    { text: "Control Panel", icon: controlPanelIcon },
    { text: "Set Program Access and Defaults" },
    { text: "Connect To", hasSubmenu: true },
    { type: "separator" },
    { text: "Help and Support", icon: helpIcon },
    { text: "Search", icon: searchIcon },
    { text: "Run..." },
  ];

  return (
    <>
      <div
        className="absolute bottom-9 left-0 w-100 z-40 flex flex-col overflow-hidden"
        style={{
          fontSize: "11px",
          lineHeight: "14px",
          border: "2px solid #1854c2",
          backgroundColor: "#4282d6",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          borderBottomRightRadius: "5px",
          fontFamily: "'Segoe UI', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with user */}
        <div
          className="relative flex items-center h-13.5 px-1.25 py-1.5 overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, #1868ce 0%, #0e60cb 12%, #0e60cb 20%, #1164cf 32%, #1667cf 33%, #1b6cd3 47%, #1e70d9 54%, #2476dc 60%, #297ae0 65%, #3482e3 77%, #3786e5 79%, #428ee9 90%, #4791eb 100%)",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          {/* Top highlight */}
          <div
            className="absolute top-px left-0 w-full h-0.75"
            style={{
              background:
                "linear-gradient(to right, transparent 0, rgba(255,255,255,0.3) 1%, rgba(255,255,255,0.5) 2%, rgba(255,255,255,0.5) 95%, transparent 100%)",
            }}
          />
          {/* Bottom border */}
          <div className="absolute bottom-0 left-0 w-full h-px-[#032c8a]" />
          
          {/* User avatar */}
          <div
            className="w-9.5 h-9.5 border border-white rounded-[3px] bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold"
          >
            {username.charAt(0).toUpperCase()}
          </div>
          <span className="ml-2.5 text-white text-base font-bold">{username}</span>
        </div>

        {/* Orange separator */}
        <div
          className="h-0.5"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0) 0%, #da884a 50%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Menu content */}
        <div className="flex w-full" style={{ height: "430px" }}>
          {/* Left menu */}
          <div className="w-1/2 bg-white flex flex-col justify-between">
            <ul className="list-none m-0 p-1.5 pt-1.5">
              {leftMenuItems.map((item, idx) =>
                item.type === "separator" ? (
                  <div
                    key={idx}
                    className="h-[7.5px] my-0.75"
                    style={{
                      background:
                        "linear-gradient(to right, #d3d3c8 0%, rgba(0,0,0,0.6) 50%, #d3d3c8 100%)",
                      borderTop: "3px solid transparent",
                      borderBottom: "3px solid transparent",
                      backgroundClip: "content-box",
                    }}
                  />
                ) : (
                  <li
                    key={idx}
                    className="relative px-1.5 py-1 cursor-pointer hover:bg-[#316ac5] hover:text-white text-[#00136b] group"
                    onClick={() => handleItemClick(item.text || "")}
                  >
                    <div className={`flex items-center gap-1.5 ${item.bold ? "font-bold" : ""}`}>
                      {item.icon ? (
                        <img src={item.icon} alt="" className="w-7 h-7" />
                      ) : (
                        <div className="w-7 h-7 bg-gray-300 rounded-sm" />
                      )}
                      <div className="flex flex-col">
                        <span className="text-[11px]">{item.text}</span>
                        {item.subtext && (
                          <span className="text-[rgba(0,0,0,0.4)] text-[10px] leading-2.75 font-normal group-hover:text-white">
                            {item.subtext}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>

            {/* All Programs */}
            <ul className="list-none m-0 p-1.5 pb-0">
              <div
                className="h-[7.5px] my-0.75"
                style={{
                  background:
                    "linear-gradient(to right, #d3d3c8 0%, rgba(0,0,0,0.6) 50%, #d3d3c8 100%)",
                  borderTop: "3px solid transparent",
                  borderBottom: "3px solid transparent",
                  backgroundClip: "content-box",
                }}
              />
              <li className="relative flex items-center justify-center gap-1.5 px-1.5 py-1 mb-1 cursor-pointer hover:bg-[#316ac5] hover:text-white text-[#00136b]">
                <span className="font-bold text-[11px]">All Programs</span>
                <img src={greenRightIcon} alt=">" className="w-4 h-4" />
              </li>
            </ul>
          </div>

          {/* Right menu */}
          <div
            className="w-1/2 flex flex-col"
            style={{
              backgroundColor: "#d3e5fa",
              borderLeft: "2px solid #95bdee",
            }}
          >
            <ul className="list-none m-0 p-1.5 pt-1.5 flex-1">
              {rightMenuItems.map((item, idx) =>
                item.type === "separator" ? (
                  <div
                    key={idx}
                    className="h-[7.5px] my-0.75"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(135,179,226,0.71) 50%, rgba(0,0,0,0) 100%)",
                      borderTop: "3px solid transparent",
                      borderBottom: "3px solid transparent",
                      backgroundClip: "content-box",
                    }}
                  />
                ) : (
                  <li
                    key={idx}
                    className="relative px-1.5 py-1 cursor-pointer hover:bg-[#316ac5] hover:text-white text-[#00136b]"
                    onClick={() => handleItemClick(item.text || "")}
                  >
                    <div className={`flex items-center gap-1.5 ${item.bold ? "font-bold" : ""}`}>
                      {item.icon ? (
                        <img src={item.icon} alt="" className="w-7 h-7" />
                      ) : (
                        <div className="w-7 h-7 bg-gray-300 rounded-sm" />
                      )}
                      <span className="text-[11px]">{item.text}</span>
                      {item.hasSubmenu && (
                        <div
                          className="absolute right-1 top-1/2 -translate-y-1/2"
                          style={{
                            borderLeft: "4px solid #00136b",
                            borderTop: "4px solid transparent",
                            borderBottom: "4px solid transparent",
                          }}
                        />
                      )}
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end h-11 px-1.25 py-1.5 text-white"
          style={{
            background:
              "linear-gradient(to bottom, #4282d6 0%, #3b85e0 3%, #418ae3 5%, #418ae3 17%, #3c87e2 21%, #3786e4 26%, #3482e3 29%, #2e7ee1 39%, #2374df 49%, #2072db 57%, #196edb 62%, #176bd8 72%, #1468d5 75%, #1165d2 83%, #0f61cb 88%)",
          }}
        >
          <button
            type="button"
            className="flex items-center gap-1.5 px-0.75 py-0.75 mr-2.5 hover:bg-[rgba(60,80,210,0.5)] active:translate-x-px active:translate-y-px"
            onClick={handleLogOff}
          >
            <img src={logoutIcon} alt="Log Off" className="w-8.5 h-8.5 rounded-[3px]" />
            <span className="text-xs">Log Off</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-0.75 py-0.75 mr-2.5 hover:bg-[rgba(60,80,210,0.5)] active:translate-x-px active:translate-y-px"
            onClick={handleTurnOff}
          >
            <img src={shutdownIcon} alt="Shutdown" className="w-5.5 h-5.5 rounded-[3px]" />
            <span className="text-xs">Turn Off Computer</span>
          </button>
        </div>
      </div>

      {/* Log Off Modal */}
      {showLogOffModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-800" />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-900 w-100 border border-black shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#404040,2px_2px_6px_rgba(0,0,0,0.4)]">
            <div className="bg-[#ECE9D8]">
              {/* Title bar */}
              <div className="flex items-center justify-between px-2 py-1 bg-linear-to-r from-[#0058e0] to-[#4d9bf9]">
                <span className="text-white text-sm font-bold">Log Off Windows</span>
                <button
                  className="w-5 h-5 bg-[#ECE9D8] border border-black flex items-center justify-center text-xs hover:bg-[#ded9ca]"
                  onClick={() => setShowLogOffModal(false)}
                >
                  ×
                </button>
              </div>
              {/* Content */}
              <div className="p-6 flex justify-center gap-6">
                <button
                  className="flex flex-col items-center p-4 hover:bg-[#d3d9e8] rounded cursor-pointer"
                  onClick={() => setShowLogOffModal(false)}
                >
                  <div className="w-12 h-12 bg-blue-400 rounded mb-2" />
                  <p className="text-sm">Switch User</p>
                </button>
                <button
                  className="flex flex-col items-center p-4 hover:bg-[#d3d9e8] rounded cursor-pointer"
                  onClick={handleLogOffConfirm}
                >
                  <img src={logoutIcon} alt="Log Off" className="w-12 h-12 mb-2" />
                  <p className="text-sm">Log Off</p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Turn Off Modal */}
      {showTurnOffModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-800 animate-[invertToGray_0.7s_ease-in-out_forwards]" />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-900 w-112.5 border border-black shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#404040,2px_2px_6px_rgba(0,0,0,0.4)]">
            <div className="bg-[#ECE9D8]">
              {/* Title bar */}
              <div className="flex items-center justify-between px-2 py-1 bg-linear-to-r from-[#0058e0] to-[#4d9bf9]">
                <span className="text-white text-sm font-bold">Turn Off Computer</span>
                <button
                  className="w-5 h-5 bg-[#ECE9D8] border border-black flex items-center justify-center text-xs hover:bg-[#ded9ca]"
                  onClick={() => setShowTurnOffModal(false)}
                >
                  ×
                </button>
              </div>
              {/* Content */}
              <div className="p-6 flex justify-center gap-4">
                <button
                  className="flex flex-col items-center p-4 hover:bg-[#d3d9e8] rounded cursor-pointer"
                  onClick={() => setShowTurnOffModal(false)}
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded mb-2" />
                  <p className="text-sm">Stand By</p>
                </button>
                <button
                  className="flex flex-col items-center p-4 hover:bg-[#d3d9e8] rounded cursor-pointer"
                  onClick={() => {
                    alert("Shutting down...");
                    setShowTurnOffModal(false);
                  }}
                >
                  <img src={shutdownIcon} alt="Turn Off" className="w-12 h-12 mb-2" />
                  <p className="text-sm">Turn Off</p>
                </button>
                <button
                  className="flex flex-col items-center p-4 hover:bg-[#d3d9e8] rounded cursor-pointer"
                  onClick={() => {
                    alert("Restarting...");
                    setShowTurnOffModal(false);
                  }}
                >
                  <div className="w-12 h-12 bg-green-400 rounded mb-2" />
                  <p className="text-sm">Restart</p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
