import { appVersion } from "@/shared/lib/version";

export const Version = () => (
  <div className="absolute bottom-2 right-4">
    <span className="text-xs text-muted-foreground">
      v{appVersion}
    </span>
  </div>

);