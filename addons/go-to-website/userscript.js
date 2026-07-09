export default async function ({ addon }) {
  // Function to inject our custom category
  function injectCategory() {
    const workspace = window.Blockly.getMainWorkspace();
    if (!workspace) return;
    
    let toolboxXml = workspace.options.languageTree;
    
    // Check if category already exists
    if (toolboxXml.querySelector('category[id="go_to_website"]')) return;
    
    // Create new custom category
    const newCategory = document.createElement('category');
    newCategory.setAttribute('id', 'go_to_website');
    newCategory.setAttribute('name', 'Go To Website');
    newCategory.setAttribute('colour', '#0066ff');
    newCategory.setAttribute('secondaryColour', '#0052cc');
    
    // Append to toolbox
    toolboxXml.appendChild(newCategory);
    
    // Force refresh
    workspace.updateToolbox(toolboxXml);
  }
  
  // Listen for workspace updates and inject category
  addon.tab.traps.on('workspaceUpdate', injectCategory);
  
  // Add the blocks
  addon.tab.addBlock("go to website %s", {
    args: ["URL"],
    callback: ({ URL }) => {
      let url = String(URL).trim();
      if (!url.match(/^https?:\/\//i)) url = "https://" + url;
      window.location.href = url;
    },
  });

  addon.tab.addBlock("open website %s in new tab", {
    args: ["URL"],
    callback: ({ URL }) => {
      let url = String(URL).trim();
      if (!url.match(/^https?:\/\//i)) url = "https://" + url;
      window.open(url, "_blank");
    },
  });
}
