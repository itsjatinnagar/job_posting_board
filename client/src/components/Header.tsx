import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, LogOut } from "lucide-react";
import { useUser } from "@/contexts/user-context";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "@/constants";

export default function Header({ className }: { className?: string }) {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const logout = async () => {
    setUser(null);
    navigate("/");
    await fetch(`${ENDPOINT}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <header className={cn("px-5", className)}>
      <div className="mx-auto container h-20 flex items-center justify-between">
        <img
          src="/logo.png"
          alt="cuvette"
          width={165}
          height={43}
          loading="eager"
        />
        <div className="space-x-5">
          <a
            href="#"
            className="font-medium text-3xl text-secondary-foreground hover:underline"
          >
            Contact
          </a>
          {user !== null ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <span className="h-7 w-7 bg-neutral-400 rounded-full"></span>
                  <span className="font-normal text-xl text-neutral-500">
                    {user.name}
                  </span>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={logout}>
                  <LogOut />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </header>
  );
}
