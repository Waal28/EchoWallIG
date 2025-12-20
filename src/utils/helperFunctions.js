export function formatData(data) {
  const result = data.map((item) => ({
    date: new Date(item.string_list_data[0].timestamp * 1000).toLocaleDateString(),
    username: {
      isLink: true,
      label: item?.string_list_data[0]?.value
        ? `@${item.string_list_data[0].value}`
        : `@${item.title}`,
      href: item.string_list_data[0].href,
    },
  }));
  return result;
}
