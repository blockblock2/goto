export default async function ({ addon, console: addonConsole }) {
  console.log("🔧 Go To Website addon loaded via Scratch Addons");

  // Wait for Scratch VM to be available
  const vm = await addon.tab.waitForElement("[data-testid='viewport']").then(() => Scratch.vm);

  class GoToWebsiteBlock {
    constructor() {
      console.log("🔨 GoToWebsiteBlock class created");
    }

    getInfo() {
      return {
        id: "goToWebsite",
        name: "Go To Website",
        blocks: [
          {
            opcode: "goToURL",
            blockType: "command",
            text: "go to website [URL]",
            arguments: {
              URL: {
                type: "string",
                defaultValue: "https://www.example.com"
              }
            }
          },
          {
            opcode: "goToURLNewTab",
            blockType: "command",
            text: "open website [URL] in new tab",
            arguments: {
              URL: {
                type: "string",
                defaultValue: "https://www.example.com"
              }
            }
          }
        ],
        color1: "#0066ff",
        color2: "#0052cc",
        color3: "#003d99"
      };
    }

    goToURL(args) {
      const url = this._formatURL(args.URL);
      if (url) {
        console.log("🌐 Navigating to:", url);
        window.location.href = url;
      }
    }

    goToURLNewTab(args) {
      const url = this._formatURL(args.URL);
      if (url) {
        console.log("🆕 Opening in new tab:", url);
        window.open(url, "_blank");
      }
    }

    _formatURL(urlString) {
      urlString = String(urlString).trim();
      if (!urlString) return null;
      if (!urlString.match(/^https?:\/\//i) && !urlString.match(/^ftp:\/\//i)) {
        urlString = "https://" + urlString;
      }
      try {
        new URL(urlString);
        return urlString;
      } catch (e) {
        console.error("❌ Invalid URL:", urlString);
        return null;
      }
    }
  }

  // Register the extension with Scratch VM
  try {
    vm.extensionManager.register(new GoToWebsiteBlock());
    console.log("✅✅✅ Go To Website addon registered successfully!");
  } catch (e) {
    console.error("❌ Failed to register addon:", e);
  }
}
