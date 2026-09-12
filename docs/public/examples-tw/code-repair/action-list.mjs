// Exercise: keep unfinished tasks, earliest due date first, unknown dates last.
// Do not change the input array. Dates, when present, use YYYY-MM-DD.
export function pendingTasks(items) {
  return items.sort((a, b) => String(a.due).localeCompare(String(b.due)))
}
