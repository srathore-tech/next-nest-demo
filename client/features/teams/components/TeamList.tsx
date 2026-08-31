"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  Users,
  UserRound,
} from "lucide-react";
import { CreateTeamForm, TeamListProps } from "../types/team.types";


export default function TeamList({
  teams = [],
  isLoading = false,
  onCreateTeam,
  onEditTeam,
  onDeleteTeam,
}: TeamListProps) {
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTeamForm>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateTeamForm) => {
    try {
      await onCreateTeam?.(data);

      reset();
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  };

  const handleCloseForm = () => {
    reset();
    setShowForm(false);
  };

  return (
    <section className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Teams
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage your teams.
          </p>
        </div>

        {/* Create Team Button */}
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <Plus size={18} />
            Create Team
          </button>
        )}
      </div>

      {/* Create Team Form */}
      {showForm && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Form Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Create Team
              </h2>

              <p className="mt-0.5 text-sm text-gray-500">
                Add a new team to your workspace.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseForm}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-5"
          >
            {/* Team Name */}
            <div>
              <label
                htmlFor="team-name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Team Name
              </label>

              <input
                id="team-name"
                type="text"
                placeholder="e.g. Development Team"
                {...register("name", {
                  required: "Team name is required.",
                  minLength: {
                    value: 2,
                    message: "Team name must be at least 2 characters.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Team name cannot exceed 50 characters.",
                  },
                })}
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:border-orange-500 focus:ring-orange-100"
                }`}
              />

              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="team-description"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Description
                <span className="ml-1 font-normal text-gray-400">
                  (Optional)
                </span>
              </label>

              <textarea
                id="team-description"
                rows={4}
                placeholder="Describe what this team is responsible for..."
                {...register("description", {
                  maxLength: {
                    value: 300,
                    message: "Description cannot exceed 300 characters.",
                  },
                })}
                className={`w-full resize-none rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
                  errors.description
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:border-orange-500 focus:ring-orange-100"
                }`}
              />

              {errors.description && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCloseForm}
                disabled={isSubmitting}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={17} />
                    Create Team
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            {/* Header */}
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Team
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Description
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Owner
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Members
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />

                      <p className="text-sm text-gray-500">
                        Loading teams...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : teams.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                        <Users
                          size={22}
                          className="text-orange-500"
                        />
                      </div>

                      <p className="font-medium text-gray-900">
                        No teams found
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Create your first team to get started.
                      </p>

                      {!showForm && (
                        <button
                          type="button"
                          onClick={() => setShowForm(true)}
                          className="mt-4 text-sm font-medium text-orange-500 hover:text-orange-600"
                        >
                          Create a team
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr
                    key={team._id}
                    className="transition hover:bg-orange-50/30"
                  >
                    {/* Team */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-sm font-semibold text-orange-600">
                          {team.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {team.name}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            Team
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="max-w-xs px-5 py-4">
                      <p className="truncate text-sm text-gray-600">
                        {team.description || "No description"}
                      </p>
                    </td>

                    {/* Owner */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                          <UserRound
                            size={15}
                            className="text-gray-500"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {team.owner?.name || "Unknown"}
                          </p>

                          {team.owner?.email && (
                            <p className="text-xs text-gray-400">
                              {team.owner.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Members */}
                    <td className="px-5 py-4">
                      <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-2.5 py-1.5">
                        <Users
                          size={15}
                          className="text-gray-500"
                        />

                        <span className="text-sm font-medium text-gray-700">
                          {team.members?.length || 0}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onEditTeam?.(team)}
                          title="Edit team"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-100 hover:text-orange-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteTeam?.(team._id)}
                          title="Delete team"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!isLoading && teams.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
            <p className="text-sm text-gray-500">
              Total{" "}
              <span className="font-medium text-gray-900">
                {teams.length}
              </span>{" "}
              {teams.length === 1 ? "team" : "teams"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
