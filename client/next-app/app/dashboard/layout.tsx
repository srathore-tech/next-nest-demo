import Protected from "@/components/layout/ProtectedRoute";

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Protected>{children}</Protected>
      </body>
    </html>
  );
}
