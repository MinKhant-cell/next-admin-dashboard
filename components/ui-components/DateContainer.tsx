import { Calendar } from "lucide-react";
import { format } from "date-fns";
export default function DateContainer({value}:{value:Date}) {
    const date = format(new Date(value), "yyyy-MM-dd");
return (
    <div className="flex items-center gap-2 text-xs font-medium text-zinc-950 dark:text-white">
        <Calendar size={14} className="opacity-80" />
        <span>{date}</span>
    </div>
  );
}