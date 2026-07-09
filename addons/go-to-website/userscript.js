export default async function ({ addon }) {
  addon.tab.createCategory({
    id: "go-to-website",
    name: "Go To Website",
    color: "#0066ff",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/%3E%3C/svg%3E"
  });

  addon.tab.addBlock("go to website %s", {
    categoryId: "go-to-website",
    args: ["URL"],
    displayName: "go to website [URL]",
    callback: ({ URL }) => {
      let url = String(URL).trim();
      if (!url.match(/^https?:\/\//i)) url = "https://" + url;
      window.location.href = url;
    },
  });

  addon.tab.addBlock("open website %s in new tab", {
    categoryId: "go-to-website",
    args: ["URL"],
    displayName: "open website [URL] in new tab",
    callback: ({ URL }) => {
      let url = String(URL).trim();
      if (!url.match(/^https?:\/\//i)) url = "https://" + url;
      window.open(url, "_blank");
    },
  });
}
