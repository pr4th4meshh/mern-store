export const truncateDescription = (description: string) => {
  return description.length > 15
    ? description.split(" ").slice(0, 15).join(" ").charAt(0).toUpperCase() +
        "..."
    : description.charAt(0).toUpperCase() + description.slice(1)
}
