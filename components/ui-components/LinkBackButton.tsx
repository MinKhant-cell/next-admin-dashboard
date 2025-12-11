import Link from "next/link";
import { Button } from "../ui/button";
import { LuArrowLeft } from "react-icons/lu";

export default function LinkBackButton({ href }: { href: string }) {
    return (
        <div>
          <Link href={href}>
            <Button
              className="hover:dark:bg-gray-800 hover:dark:text-white"
              variant="outline"
              size="sm"
            >
              <LuArrowLeft />
            </Button>
          </Link>
        </div>
    );
}