export default async function ({ addon }) {
  // Wait for Scratch editor to load
  while (!window.Blockly || !window.Blockly.getMainWorkspace()) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  
  const workspace = window.Blockly.getMainWorkspace();
  
  function injectCategory() {
    const toolbox = workspace.getToolbox();
    if (!toolbox) return;
    
    let toolboxXml = workspace.options.languageTree;
    
    // Check if category already exists
    if (toolboxXml.querySelector('category[id="go_to_website"]')) return;
    
    // Create new custom category
    const newCategory = document.createElement('category');
    newCategory.setAttribute('id', 'go_to_website');
    newCategory.setAttribute('name', 'Go To Website');
    newCategory.setAttribute('colour', '#0066ff');
    newCategory.setAttribute('secondaryColour', '#0052cc');
    
    // Add blocks to category
    newCategory.innerHTML = `
      <block type="go_to_website_go_to_url"></block>
      <block type="go_to_website_open_in_tab"></block>
    `;
    
    // Append to toolbox
    toolboxXml.appendChild(newCategory);
    
    // Force refresh
    workspace.updateToolbox(toolboxXml);
  }
  
  // Inject the category
  injectCategory();
  
  // Re-inject on workspace updates
  addon.tab.traps.on('workspaceUpdate', injectCategory);
  
  // Add the blocks themselves
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
