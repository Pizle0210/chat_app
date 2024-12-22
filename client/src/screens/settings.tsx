import { previewMessage, THEMES } from "@/constants";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/useThemeStore";
import { Send } from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useThemeStore();
  return (
    <div
      className={cn(
        `mx-auto w-[min(100%,80rem)] p-6 max-md:px-4 py-16 flex flex-col items-center mt-5 sm:px-8 h-screen`
      )}
    >
      <div className={cn(`flex flex-col md:flex-row gap-8 w-full h-full`)}>
        {/* Left Section */}
        <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-md">
          {/*  */}
          <div className=" text-gray-700 ">
            <h3 className="text-lg font-semibold mb-3">Preview</h3>
            <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
              <div className="p-4 bg-base-200">
                <div className="max-w-lg mx-auto">
                  {/* Mock Chat UI */}
                  <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                    {/* Chat Header */}
                    <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                          A
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Alex Wayne</h3>
                          <p className="text-xs text-base-content/70">Online</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-4 space-y-4 min-h-[200px] max-h-[400px] overflow-y-auto bg-base-100 rounded-lg shadow-md">
                      {previewMessage[0].messages.map((_, index) => {
                        const johnMessage = previewMessage[0].messages[index];
                        const alexMessage = previewMessage[1].messages[index];

                        return (
                          <>
                            {johnMessage && (
                              <div className="flex justify-end">
                                <div className="max-w-[75%] rounded-xl p-3 shadow-md bg-primary text-primary-content">
                                  <p className="text-sm">{johnMessage}</p>
                                  <p className="text-[10px] mt-1.5 text-primary-content/70">
                                    12:00 PM
                                  </p>
                                </div>
                              </div>
                            )}
                            {alexMessage && (
                              <div className="flex justify-start">
                                <div className="max-w-[75%] rounded-xl p-3 shadow-md bg-base-200 text-base-content">
                                  <p className="text-sm">{alexMessage}</p>
                                  <p className="text-[10px] mt-1.5 text-base-content/70">
                                    12:01 PM
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-base-300 bg-base-100">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="input input-bordered flex-1 text-sm h-10"
                          placeholder="Type a message..."
                          value="This is a preview"
                          readOnly
                        />
                        <button className="btn btn-primary h-10 min-h-0">
                          <Send size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Themes</h2>
            <p className="text-sm text-gray-600">
              Choose a theme for your chat interface
            </p>
          </div>

          <div
            className="grid overflow-hidden overflow-y-auto gap-4 p-4 border border-blue-300 rounded-lg bg-gray-50 
            sm:grid-cols-2 grid-cols-1"
          >
            {THEMES.map((t) => (
              <button
                key={t}
                className={cn(
                  `relative flex flex-col items-center justify-center gap-2 p-4 rounded-lg shadow-sm border transition-all 
                  ${
                    theme === t
                      ? "bg-blue-100 border-blue-400"
                      : "bg-white hover:bg-blue-50 border-gray-200"
                  }`
                )}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-10 w-full rounded-md overflow-hidden bg-gray-200"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-2 p-1.5">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
