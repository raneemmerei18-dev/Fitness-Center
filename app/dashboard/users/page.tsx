import { Section } from "@prisma/client";
import { SectionCard } from "@/components/section-card";
import { requireSection } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sectionLabels } from "@/lib/permissions";

export default async function UsersDashboardPage() {
  await requireSection(Section.USERS);

  const [users, roles] = await Promise.all([
    prisma.user.findMany({
      include: { role: true },
      orderBy: { id: "asc" },
    }),
    prisma.role.findMany({
      include: { permissions: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <SectionCard title="Users & Role Permissions" subtitle="Create roles, assign section access, then assign users to roles">
      <form action="/api/admin/roles" method="post" className="mb-6 rounded-xl border border-dashed border-slate-300 p-4">
        <input type="hidden" name="_action" value="create" />
        <p className="mb-2 text-sm font-semibold text-slate-700">Create Role</p>
        <div className="grid gap-2 md:grid-cols-3">
          <input name="name" required placeholder="Role name (e.g. Editor)" className="rounded-md border border-slate-300 px-3 py-2" />
          <input name="description" placeholder="Description" className="rounded-md border border-slate-300 px-3 py-2 md:col-span-2" />
        </div>
        <button type="submit" className="mt-3 rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
          Create Role
        </button>
      </form>

      <div className="mb-8 space-y-4">
        {roles.map((role) => (
          <form key={role.id} action="/api/admin/roles" method="post" className="rounded-xl border border-slate-200 p-4">
            <input type="hidden" name="_action" value="update" />
            <input type="hidden" name="id" value={role.id} />
            <div className="grid gap-2 md:grid-cols-2">
              <input name="name" defaultValue={role.name} className="rounded-md border border-slate-300 px-3 py-2" />
              <input name="description" defaultValue={role.description ?? ""} className="rounded-md border border-slate-300 px-3 py-2" />
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {Object.entries(sectionLabels).map(([key, label]) => (
                <label key={`${role.id}-${key}`} className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="sections"
                    value={key}
                    defaultChecked={role.permissions.some((item) => item.section === key)}
                  />
                  {label}
                </label>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button type="submit" className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600">
                Save Role Permissions
              </button>
              <button type="submit" name="_action" value="delete" className="rounded-md border border-red-300 px-3 py-2 text-sm font-semibold text-red-700">
                Delete Role
              </button>
            </div>
          </form>
        ))}
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <form key={user.id} action="/api/admin/users" method="post" className="rounded-xl border border-slate-200 p-4">
            <input type="hidden" name="id" value={user.id} />
            <p className="font-semibold text-slate-900">{user.name} ({user.email})</p>
            <label className="mt-2 block text-sm font-semibold text-slate-700">
              Assigned Role
              <select name="roleId" defaultValue={user.roleId ?? ""} className="mt-1 rounded-md border border-slate-300 px-3 py-2">
                <option value="">No Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input type="checkbox" name="isSuperAdmin" value="true" defaultChecked={user.isSuperAdmin} />
              Super Admin
            </label>
            <button type="submit" className="mt-3 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600">
              Save User Role
            </button>
          </form>
        ))}
      </div>
    </SectionCard>
  );
}
