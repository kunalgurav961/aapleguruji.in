import { UserRound } from "lucide-react";

const AdminUsers = ({ users }) => (
  <section className="overflow-hidden rounded-2xl border border-[var(--color-booking-border)] bg-white shadow-[var(--shadow-booking-card)]">
    <header className="border-b border-[var(--color-booking-border)] p-5">
      <h2 className="font-bold text-[var(--color-booking-ink)]">Registered users</h2>
      <p className="mt-1 text-sm text-[var(--color-booking-muted-ink)]">
        Private account credentials are never included.
      </p>
    </header>
    {users.length === 0 ? (
      <p className="p-6 text-sm text-[var(--color-booking-muted-ink)]">
        No users found.
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-[var(--color-booking-muted)] text-xs uppercase tracking-wide text-[var(--color-booking-muted-ink)]">
            <tr>
              <th className="px-5 py-3 font-semibold">User</th>
              <th className="px-5 py-3 font-semibold">Contact</th>
              <th className="px-5 py-3 font-semibold">City</th>
              <th className="px-5 py-3 font-semibold">Role</th>
              <th className="px-5 py-3 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-booking-border)]">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-5 py-4">
                  <p className="font-semibold text-[var(--color-booking-ink)]">
                    {user.fullName}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-booking-muted-ink)]">
                    {user.email}
                  </p>
                </td>
                <td className="px-5 py-4 text-[var(--color-booking-ink)]">
                  {user.mobileNumber}
                </td>
                <td className="px-5 py-4 capitalize text-[var(--color-booking-ink)]">
                  {user.city}
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-booking-muted)] px-2.5 py-1 text-xs font-semibold capitalize text-[var(--color-booking-muted-ink)]">
                    <UserRound aria-hidden="true" size={13} />
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-4 text-[var(--color-booking-muted-ink)]">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

export default AdminUsers;
