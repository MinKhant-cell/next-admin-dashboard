import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarContainer({src,name}: {src,name: string}) {
  return (
    <div className="">
      <Avatar className="w-8 h-8">
        <AvatarImage src={src} alt={name} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
    </div>
  )
}
