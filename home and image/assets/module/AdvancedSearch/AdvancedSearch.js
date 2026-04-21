export default function AdvancedSearch(_moduleName, params) {
  const panelId = params?.[0]?.id || "advancedSearchPanel";
  const panel = document.getElementById(panelId);

  if (!panel) {
    return;
  }

  panel.innerHTML = [
    '<section class="container py-3" data-local-advanced-search hidden>',
    '  <div class="rounded-4 border p-3 bg-white shadow-sm">',
    "    <strong>Advanced Search</strong>",
    "    <p class=\"mb-0 mt-2\">Local preview mode keeps this module available without requiring the original portal bundle.</p>",
    "  </div>",
    "</section>",
  ].join("");
}
