export default async function ({ addon }) {
  const vm = addon.vm;
  
  const ext = {
    getInfo() {
      return {
        id: "goToWebsite",
        name: "Go To Website",
        blocks: [
          {
            opcode: "goToURL",
            blockType: "command",
            text: "go to website [URL]",
            arguments: { URL: { type: "string", defaultValue: "https://example.com" } }
          },
          {
            opcode: "goToURLNewTab",
            blockType: "command",
            text: "open website [URL] in new tab",
            arguments: { URL: { type: "string", defaultValue: "https://example.com" } }
          }
        ],
        color1: "#0066ff",
        color2: "#0052cc",
        color3: "#003d99"
      };
    },
    goToURL(args) {
      let url = String(args.URL).trim();
      if (!url.match(/^https?:\/\//i)) url = "https://" + url;
      window.location.href = url;
    },
    goToURLNewTab(args) {
      let url = String(args.URL).trim();
      if (!url.match(/^https?:\/\//i)) url = "https://" + url;
      window.open(url, "_blank");
    }
  };
  
  vm.extensionManager.register(ext);
}
