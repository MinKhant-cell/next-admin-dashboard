import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ChevronsLeftRight } from "lucide-react"

export function CustomTrigger() {
  const { toggleSidebar, open } = useSidebar()

  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
      <ChevronsLeftRight/>
    </Button>
  )
}
