"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { releaseNotes } from "../model/notes";
import { useCurrentLocale, useI18n } from "locales/client";
import dayjs from "dayjs";

export function ReleaseNotesDialog() {
  const t = useI18n();
  const locale = useCurrentLocale();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("release_notes.release_notes")}>
          <span className="sr-only">{t("release_notes.release_notes")}</span>
          <Bell className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("release_notes.title")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {releaseNotes.map((note) => (
            <div key={note.date} className="border-b pb-2 last:border-b-0 last:pb-0">
                <div className="text-xs text-muted-foreground">
                    {dayjs(note.date).locale(locale).format("MMMM D, YYYY")}
                </div>
              <div className="font-semibold">{note.title}</div>
              <div className="text-sm">{note.content}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}