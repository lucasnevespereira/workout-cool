"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Dumbbell, Search, Crown } from "lucide-react";

import { useCurrentLocale, useI18n } from "locales/client";
import { cn } from "@/shared/lib/utils";
import { paths } from "@/shared/constants/paths";

export function BottomNavigation() {
  const pathname = usePathname();
  const t = useI18n();
  const locale = useCurrentLocale();

  const tabs = [
    {
      id: "workout-builder",
      label: t("bottom_navigation.workouts"),
      shortLabel: t("bottom_navigation.workouts"),
      href: paths.root,
      icon: Dumbbell,
      emoji: "WorkoutCoolHappy.png",
      description: t("bottom_navigation.workouts_tooltip"),
      isActive: pathname === paths.root || pathname === `/${locale}`,
    },
    {
      id: "programs",
      label: t("bottom_navigation.programs"),
      shortLabel: t("bottom_navigation.programs"),
      href: `${paths.programs}`,
      icon: Search,
      emoji: "WorkoutCoolSwag.png",
      description: t("bottom_navigation.programs_tooltip"),
      isActive: pathname.includes(paths.programs),
    },
    {
      id: "premium",
      label: t("bottom_navigation.premium"),
      shortLabel: t("bottom_navigation.premium"),
      href: `/${locale}/premium`,
      icon: Crown,
      emoji: "WorkoutCoolRich.png",
      description: t("bottom_navigation.premium_tooltip"),
      isActive: pathname.includes("/premium"),
    },
  ];

  return (
    <nav className="relative bg-white/90 dark:bg-[#232324]/90 backdrop-blur-xl border-t border-[#4F8EF7]/15 dark:border-slate-700/50">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4F8EF7]/3 via-transparent to-[#25CB78]/3 pointer-events-none" />

      <div className="relative px-3 py-2">
        <div className="flex justify-center items-center gap-2 max-w-sm mx-auto">
          {tabs.map((tab) => {
            const isActive = tab.isActive;
            const isPremium = tab.id === "premium";
            const IconComponent = tab.icon;

            return (
              <Link
                className={cn(
                  "group relative flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all duration-300 ease-out",
                  "hover:scale-105 active:scale-95",
                  isActive && isPremium
                    ? "bg-gradient-to-br from-[#FFD93D]/8 to-[#FFA500]/8 border border-[#FFD93D]/20"
                    : isActive
                      ? "bg-gradient-to-br from-[#4F8EF7]/8 to-[#25CB78]/8 border border-[#4F8EF7]/20"
                      : isPremium
                        ? "hover:bg-[#FFD93D]/5 dark:hover:bg-[#FFD93D]/10"
                        : "hover:bg-gray-50/80 dark:hover:bg-slate-800/50",
                )}
                href={tab.href}
                key={tab.id}
              >
                {/* Active top indicator */}
                {isActive && (
                  <div
                    className={cn(
                      "absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full",
                      isPremium ? "bg-gradient-to-r from-[#FFD93D] to-[#FFA500]" : "bg-gradient-to-r from-[#4F8EF7] to-[#25CB78]",
                    )}
                  />
                )}

                {/* Icon container */}
                <div className="relative flex items-center justify-center">
                  {/* Active glow effect */}
                  {isActive && (
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full blur-sm scale-150",
                        isPremium
                          ? "bg-gradient-to-br from-[#FFD93D]/15 to-[#FFA500]/15"
                          : "bg-gradient-to-br from-[#4F8EF7]/15 to-[#25CB78]/15",
                      )}
                    />
                  )}

                  {/* Main icon */}
                  <div
                    className={cn(
                      "relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ease-out",
                      isActive && isPremium
                        ? "bg-gradient-to-br from-[#FFD93D] to-[#FFA500] text-white scale-110"
                        : isActive
                          ? "bg-gradient-to-br from-[#4F8EF7] to-[#25CB78] text-white scale-110"
                          : isPremium
                            ? "text-[#FFD93D] dark:text-[#FFD93D] group-hover:text-[#FFA500] dark:group-hover:text-[#FFA500]"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300",
                    )}
                  >
                    <IconComponent size={isActive ? 16 : 14} strokeWidth={isActive ? 2.5 : 2} />

                    {/* Premium sparkle effect */}
                    {isPremium && !isActive && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFD93D] rounded-full opacity-80 animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "text-xs font-semibold transition-all duration-300 ease-out leading-tight",
                    isActive && isPremium
                      ? "text-transparent bg-gradient-to-r from-[#FFD93D] to-[#FFA500] bg-clip-text"
                      : isActive
                        ? "text-transparent bg-gradient-to-r from-[#4F8EF7] to-[#25CB78] bg-clip-text"
                        : isPremium
                          ? "text-[#FFD93D] dark:text-[#FFD93D] group-hover:text-[#FFA500] dark:group-hover:text-[#FFA500]"
                          : "text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200",
                  )}
                >
                  {tab.shortLabel}
                </span>

                {/* Hover tooltip - only on non-touch devices */}
                <div
                  className={cn(
                    "absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900/90 text-white text-xs rounded-lg opacity-0 pointer-events-none transition-all duration-200 whitespace-nowrap",
                    "after:content-[''] after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-900/90",
                    "hidden [@media(hover:hover)]:block [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:-translate-y-1",
                  )}
                >
                  {tab.description}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
