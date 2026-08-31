import UserList from "@/features/users/components/UserList";

export default function UserListPage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-xl text-start text-orange-400 mt-10 font-semibold">
        All Users
      </h1>
      <div
        className="flex justify-center items-center rounded-lg border p-8 mt-6 bg-white"
        style={{ borderColor: "#E2E8F0" }}
      >
        <UserList/>
      </div>
    </div>
  );
}
