import { Clock } from "lucide-react";
import { format } from "date-fns";
export default function TimeContainer({value}:{value:Date}) {
    const time = format(new Date(value), "HH:mm");
return (
    <div className="flex items-center gap-2 text-xs font-medium text-zinc-950 dark:text-white">
        <Clock size={14} className="opacity-80" />
        <span>{time}</span>
    </div>
  );
}