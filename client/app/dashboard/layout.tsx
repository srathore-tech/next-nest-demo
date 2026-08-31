import DashLayout from "@/components/layout/DashLayout";
import Protected from "@/components/layout/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected>
      <DashLayout>{children}</DashLayout>
    </Protected>
  );
}
