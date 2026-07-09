export default async function ({ addon }) {
  addon.tab.addBlock("go to website %s", {
    args: ["URL"],
    displayName: "go to website [URL]",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath fill='%23333' d='M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2m0-2C6.48 0 2 4.48 2 10s4.48 10 10 10 10-4.48 10-10S17.52 0 12 0z'/%3E%3C/svg%3E",
    callback: ({ URL }) => {
      let url = String(URL).trim();
      if (!url.match(/^https?:\/\//i)) url = "https://" + url;
      window.location.href = url;
    },
  });

  addon.tab.addBlock("open website %s in new tab", {
    args: ["URL"],
    displayName: "open website [URL] in new tab",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath fill='%23333' d='M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2m0-2C6.48 0 2 4.48 2 10s4.48 10 10 10 10-4.48 10-10S17.52 0 12 0z'/%3E%3C/svg%3E",
    callback: ({ URL }) => {
      let url = String(URL).trim();
      if (!url.match(/^https?:\/\//i)) url = "https://" + url;
      window.open(url, "_blank");
    },
  });
}
