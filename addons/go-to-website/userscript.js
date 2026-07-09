export default async function ({ addon }) {
  addon.tab.addBlock("go to website %s", {
    args: ["URL"],
    displayName: "go to website [URL]",
    callback: ({ URL }) => {
      let url = String(URL).trim();
      if (!url.match(/^https?:\/\//i)) url = "https://" + url;
      window.location.href = url;
    },
  });

  addon.tab.addBlock("open website %s in new tab", {
    args: ["URL"],
    displayName: "open website [URL] in new tab",
    callback: ({ URL }) => {
      let url = String(URL).trim();
      if (!url.match(/^https?:\/\//i)) url = "https://" + url;
      window.open(url, "_blank");
    },
  });
}
