import { useRef, useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { MdCancel } from "react-icons/md";
import { LuImage } from "react-icons/lu";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ChatInput() {
  const [imagePreview, setImagePreview] = useState<string | null | undefined>(
    null
  );
  const [text, setText] = useState<string>("");
  const { sendMessage } = useChatStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast({
        title: "Please select an image file",
        variant: "destructive"
      });
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File size exceeds 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview ?? undefined
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: String(error),
        variant: "destructive"
      });
    }
  }

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="h-20 w-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-base-200"
              aria-label="Remove image"
            >
              <MdCancel />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
        <div className="flex-1 flex w-full gap-2">
          <input
            type="text"
            autoFocus
            className="w-full input flex-grow input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? `text-emerald-500` : `text-zinc-500`
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <LuImage size={40} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={30} />
        </button>
      </form>
    </div>
  );
}
