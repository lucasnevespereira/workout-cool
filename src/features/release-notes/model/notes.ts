export interface ReleaseNote {
    date: string;
    title: string;
    content: string;
}
  
  export const releaseNotes: ReleaseNote[] = [
    {
      date: "2024-06-01",
      title: "🎉 New: Release Notes Dialog",
      content: "You can now view what's new directly from the header! Stay tuned for more updates.",
    },
    {
      date: "2024-05-20",
      title: "UI Improvements",
      content: "Improved mobile responsiveness and added subtle hover effects to buttons.",
    },
  ];