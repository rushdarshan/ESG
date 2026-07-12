$ErrorActionPreference = "Continue"

$BaseUrl = "http://localhost:3001"
$Session = "qa-3001"
$Root = Split-Path -Parent $PSScriptRoot
$Out = Join-Path $Root "qa-artifacts"
$Screens = Join-Path $Out "screenshots"
$Logs = Join-Path $Out "logs"
New-Item -ItemType Directory -Force -Path $Screens | Out-Null
New-Item -ItemType Directory -Force -Path $Logs | Out-Null

$Routes = @("/", "/dashboard", "/environment", "/social", "/governance", "/reports", "/goals", "/rewards", "/settings")

function Run-Ab {
  param([Parameter(Mandatory=$true)][string[]]$Args)
  & agent-browser --session $Session @Args 2>&1
}

function Safe-Name {
  param([string]$Route)
  if ($Route -eq "/") { return "home" }
  return ($Route.Trim("/") -replace "[^a-zA-Z0-9_-]", "-")
}

function Save-Text {
  param([string]$Path, [string]$Text)
  Set-Content -LiteralPath $Path -Value $Text -Encoding UTF8
}

$ProbeJs = @'
(() => {
  const visible = (el) => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return s.visibility !== "hidden" && s.display !== "none" && r.width > 0 && r.height > 0;
  };
  const nameOf = (el) => (el.getAttribute("aria-label") || el.getAttribute("title") || el.innerText || el.value || "").trim();
  const buttons = [...document.querySelectorAll("button")].filter(visible).map((el, i) => ({
    i,
    text: nameOf(el),
    ariaLabel: el.getAttribute("aria-label"),
    disabled: el.disabled,
    className: el.className,
    html: el.outerHTML.slice(0, 180)
  }));
  const links = [...document.querySelectorAll("a")].filter(visible).map((el) => ({
    text: nameOf(el),
    href: el.href,
    target: el.target
  }));
  const inputs = [...document.querySelectorAll("input, textarea, select")].filter(visible).map((el) => ({
    tag: el.tagName.toLowerCase(),
    type: el.getAttribute("type") || "",
    name: el.getAttribute("name") || "",
    label: el.labels?.[0]?.innerText || el.getAttribute("aria-label") || "",
    value: el.value || "",
    placeholder: el.getAttribute("placeholder") || ""
  }));
  const unlabeledButtons = buttons.filter((b) => !b.text && !b.ariaLabel);
  const unlabeledInputs = inputs.filter((i) => i.tag !== "select" && !i.label && !i.placeholder);
  const images = [...document.images].map((img) => ({ src: img.currentSrc || img.src, alt: img.alt, complete: img.complete, naturalWidth: img.naturalWidth }));
  const brokenImages = images.filter((img) => !img.complete || img.naturalWidth === 0);
  const horizontalOverflow = document.documentElement.scrollWidth > window.innerWidth + 2;
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({ level: Number(h.tagName.slice(1)), text: h.innerText.trim() }));
  return JSON.stringify({
    url: location.href,
    title: document.title,
    viewport: { w: innerWidth, h: innerHeight },
    scroll: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
    counts: { buttons: buttons.length, links: links.length, inputs: inputs.length, images: images.length },
    buttons,
    links,
    inputs,
    unlabeledButtons,
    unlabeledInputs,
    brokenImages,
    horizontalOverflow,
    headings
  }, null, 2);
})()
'@

$ProbeB64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($ProbeJs))

Run-Ab @("network", "requests", "--clear") | Out-Null
Run-Ab @("console", "--clear") | Out-Null
Run-Ab @("errors", "--clear") | Out-Null

foreach ($Route in $Routes) {
  $Name = Safe-Name $Route
  Run-Ab @("set", "viewport", "1440", "1000") | Out-Null
  Run-Ab @("open", "$BaseUrl$Route") | Out-Null
  Run-Ab @("wait", "--load", "networkidle") | Out-Null
  Run-Ab @("scroll", "down", "2500") | Out-Null
  Run-Ab @("scroll", "up", "2500") | Out-Null
  Run-Ab @("screenshot", (Join-Path $Screens "$Name-desktop-full.png"), "--full") | Out-Null
  Save-Text (Join-Path $Logs "$Name-snapshot.txt") ((Run-Ab @("snapshot", "-i", "-C")) -join "`n")
  Save-Text (Join-Path $Logs "$Name-probe-desktop.json") ((Run-Ab @("eval", "-b", $ProbeB64)) -join "`n")
  Save-Text (Join-Path $Logs "$Name-console.txt") ((Run-Ab @("console")) -join "`n")
  Save-Text (Join-Path $Logs "$Name-errors.txt") ((Run-Ab @("errors")) -join "`n")
  Save-Text (Join-Path $Logs "$Name-network.txt") ((Run-Ab @("network", "requests")) -join "`n")

  Run-Ab @("set", "viewport", "390", "844") | Out-Null
  Run-Ab @("reload") | Out-Null
  Run-Ab @("wait", "--load", "networkidle") | Out-Null
  Run-Ab @("screenshot", (Join-Path $Screens "$Name-mobile-full.png"), "--full") | Out-Null
  Save-Text (Join-Path $Logs "$Name-probe-mobile.json") ((Run-Ab @("eval", "-b", $ProbeB64)) -join "`n")
}

# Targeted interactions
Run-Ab @("set", "viewport", "1440", "1000") | Out-Null

# Keyboard navigation, back/forward, refresh
Run-Ab @("open", "$BaseUrl/dashboard") | Out-Null
Run-Ab @("wait", "--load", "networkidle") | Out-Null
Run-Ab @("press", "Tab") | Out-Null
Run-Ab @("press", "Tab") | Out-Null
Run-Ab @("press", "Enter") | Out-Null
Run-Ab @("wait", "500") | Out-Null
Run-Ab @("back") | Out-Null
Run-Ab @("wait", "500") | Out-Null
Run-Ab @("forward") | Out-Null
Run-Ab @("wait", "500") | Out-Null
Run-Ab @("reload") | Out-Null
Run-Ab @("wait", "--load", "networkidle") | Out-Null
Run-Ab @("screenshot", (Join-Path $Screens "keyboard-back-forward-refresh.png"), "--full") | Out-Null

# Environment upload: browse button and synthetic drop
Run-Ab @("open", "$BaseUrl/environment") | Out-Null
Run-Ab @("wait", "--load", "networkidle") | Out-Null
Run-Ab @("snapshot", "-i", "-C") | Out-Null
Run-Ab @("find", "role", "button", "click", "--name", "Browse Files") | Out-Null
Run-Ab @("wait", "500") | Out-Null
Run-Ab @("screenshot", (Join-Path $Screens "issue-environment-browse-files-no-effect.png"), "--full") | Out-Null
$DropJs = @'
(() => {
  const target = [...document.querySelectorAll("div")].find(el => el.innerText && el.innerText.includes("Drop utility bills"));
  if (!target) return "drop target not found";
  const dt = new DataTransfer();
  dt.items.add(new File(["date,kwh\n2026-07,123"], "sample-utility.csv", { type: "text/csv" }));
  target.dispatchEvent(new DragEvent("dragover", { bubbles: true, dataTransfer: dt }));
  target.dispatchEvent(new DragEvent("drop", { bubbles: true, dataTransfer: dt }));
  return document.body.innerText.includes("sample-utility.csv") ? "uploaded-visible" : "uploaded-not-visible";
})()
'@
$DropB64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($DropJs))
Save-Text (Join-Path $Logs "environment-upload-drop-result.txt") ((Run-Ab @("eval", "-b", $DropB64)) -join "`n")
Run-Ab @("wait", "2600") | Out-Null
Run-Ab @("screenshot", (Join-Path $Screens "environment-upload-drop-success.png"), "--full") | Out-Null

# Social action selection and submit
Run-Ab @("open", "$BaseUrl/social") | Out-Null
Run-Ab @("wait", "--load", "networkidle") | Out-Null
Run-Ab @("snapshot", "-i", "-C") | Out-Null
Run-Ab @("press", "Tab") | Out-Null
Run-Ab @("press", "Escape") | Out-Null
$SocialJs = @'
(() => {
  const before = document.body.innerText;
  const actionBtn = [...document.querySelectorAll("button")].find(b => b.innerText.includes("XP") && b.innerText.includes("kg CO"));
  if (actionBtn) actionBtn.click();
  const selectedVisible = document.body.innerText.includes("Submit Evidence");
  const submit = [...document.querySelectorAll("button")].find(b => b.innerText.trim() === "Submit Action");
  if (submit) submit.click();
  const after = document.body.innerText;
  return JSON.stringify({ actionButtonFound: !!actionBtn, selectedVisible, submitFound: !!submit, changedAfterSubmit: before !== after && !selectedVisible });
})()
'@
$SocialB64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($SocialJs))
Save-Text (Join-Path $Logs "social-action-submit-result.json") ((Run-Ab @("eval", "-b", $SocialB64)) -join "`n")
Run-Ab @("screenshot", (Join-Path $Screens "issue-social-submit-action-no-effect.png"), "--full") | Out-Null

# Governance accordions, generate, inert download
Run-Ab @("open", "$BaseUrl/governance") | Out-Null
Run-Ab @("wait", "--load", "networkidle") | Out-Null
Run-Ab @("find", "role", "button", "click", "--name", "CSRD / ESRS") | Out-Null
Run-Ab @("wait", "500") | Out-Null
Run-Ab @("screenshot", (Join-Path $Screens "governance-csrd-accordion.png"), "--full") | Out-Null
Run-Ab @("find", "role", "button", "click", "--name", "Generate Report") | Out-Null
Run-Ab @("wait", "2500") | Out-Null
Run-Ab @("screenshot", (Join-Path $Screens "governance-generate-report.png"), "--full") | Out-Null
Run-Ab @("find", "role", "button", "click", "--name", "Download PDF") | Out-Null
Run-Ab @("wait", "500") | Out-Null
Run-Ab @("screenshot", (Join-Path $Screens "issue-governance-download-pdf-no-effect.png"), "--full") | Out-Null

# Reports generation and recent download buttons
Run-Ab @("open", "$BaseUrl/reports") | Out-Null
Run-Ab @("wait", "--load", "networkidle") | Out-Null
Run-Ab @("snapshot", "-i", "-C") | Out-Null
Run-Ab @("find", "role", "button", "click", "--name", "Generate") | Out-Null
Run-Ab @("wait", "3500") | Out-Null
Run-Ab @("screenshot", (Join-Path $Screens "reports-generate-button.png"), "--full") | Out-Null
$RecentDownloadJs = @'
(() => {
  const buttons = [...document.querySelectorAll("button")];
  const iconOnly = buttons.filter(b => !b.innerText.trim());
  const before = location.href + "|" + document.body.innerText.length;
  if (iconOnly[0]) iconOnly[0].click();
  const after = location.href + "|" + document.body.innerText.length;
  return JSON.stringify({ iconOnlyCount: iconOnly.length, changed: before !== after });
})()
'@
$RecentDownloadB64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($RecentDownloadJs))
Save-Text (Join-Path $Logs "reports-recent-download-result.json") ((Run-Ab @("eval", "-b", $RecentDownloadB64)) -join "`n")
Run-Ab @("screenshot", (Join-Path $Screens "issue-reports-recent-download-no-effect.png"), "--full") | Out-Null

# Settings form/dropdown/toggles/save/reset
Run-Ab @("open", "$BaseUrl/settings") | Out-Null
Run-Ab @("wait", "--load", "networkidle") | Out-Null
Run-Ab @("find", "first", "input", "fill", "") | Out-Null
Run-Ab @("find", "role", "button", "click", "--name", "Save Preferences") | Out-Null
Run-Ab @("wait", "500") | Out-Null
Run-Ab @("screenshot", (Join-Path $Screens "issue-settings-invalid-empty-org-saved.png"), "--full") | Out-Null
Run-Ab @("find", "first", "input", "fill", "QA Test Org") | Out-Null
Run-Ab @("find", "first", "select", "select", "Technology") | Out-Null
$SettingsJs = @'
(() => {
  const toggles = [...document.querySelectorAll("button")].filter(b => b.className.includes("rounded-full"));
  toggles.forEach(b => b.click());
  const reset = [...document.querySelectorAll("button")].find(b => b.innerText.includes("Reset Demo Data"));
  const before = document.body.innerText;
  if (reset) reset.click();
  const after = document.body.innerText;
  return JSON.stringify({ toggleCount: toggles.length, resetFound: !!reset, resetChangedUi: before !== after });
})()
'@
$SettingsB64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($SettingsJs))
Save-Text (Join-Path $Logs "settings-interactions-result.json") ((Run-Ab @("eval", "-b", $SettingsB64)) -join "`n")
Run-Ab @("find", "role", "button", "click", "--name", "Save Preferences") | Out-Null
Run-Ab @("wait", "500") | Out-Null
Run-Ab @("screenshot", (Join-Path $Screens "settings-toggles-select-save.png"), "--full") | Out-Null

# Final logs
Save-Text (Join-Path $Logs "final-console.txt") ((Run-Ab @("console")) -join "`n")
Save-Text (Join-Path $Logs "final-errors.txt") ((Run-Ab @("errors")) -join "`n")
Save-Text (Join-Path $Logs "final-network.txt") ((Run-Ab @("network", "requests")) -join "`n")

Run-Ab @("close") | Out-Null
Write-Output "QA pass complete: $Out"
