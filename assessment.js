// ERP Readiness Assessment — scoring logic and form. MIT licence.
// Content lives in assessment.json, loaded with fetch(), so the page must be served over http(s).

function score(assessment, answers) {
  const domains = assessment.domains.map((d) => {
    const sum = d.questions.reduce((s, _, i) => s + (answers[`${d.id}-${i}`] ?? 0), 0)
    return { ...d, score: Math.round((sum / (d.questions.length * 3)) * 100) }
  })
  const overall = Math.round(domains.reduce((s, d) => s + d.score, 0) / domains.length)
  const band = assessment.bands.find((b) => overall >= b.min)
  return { domains, overall, band }
}

function render(assessment) {
  const form = document.getElementById('form')
  const go = document.getElementById('go')
  const left = document.getElementById('left')
  const results = document.getElementById('results')
  const answers = {}
  const total = assessment.domains.reduce((n, d) => n + d.questions.length, 0)

  for (const d of assessment.domains) {
    const box = document.createElement('section')
    box.className = 'domain'
    box.innerHTML = `<h2>${d.name}</h2><p class="desc">${d.description}</p>`
    d.questions.forEach((q, i) => {
      const key = `${d.id}-${i}`
      const fs = document.createElement('fieldset')
      fs.innerHTML = `<legend>${q}</legend><div class="opts">${assessment.scale
        .map((o) => `<label><input type="radio" name="${key}" value="${o.value}"> ${o.label}</label>`)
        .join('')}</div>`
      fs.addEventListener('change', (e) => {
        answers[key] = Number(e.target.value)
        const n = Object.keys(answers).length
        go.disabled = n < total
        left.textContent = n < total ? `${total - n} statements remaining` : ''
        results.hidden = true
      })
      box.appendChild(fs)
    })
    form.appendChild(box)
  }
  left.textContent = `${total} statements remaining`

  go.addEventListener('click', () => {
    const r = score(assessment, answers)
    results.innerHTML = `
      <p>Overall readiness</p><div class="score">${r.overall}<small> / 100</small></div>
      <h2>${r.band.name}</h2><p>${r.band.text}</p>
      <table><thead><tr><th>Domain</th><th>Score</th><th>First action</th></tr></thead><tbody>
      ${r.domains.map((d) => `<tr><td>${d.name}</td><td>${d.score}</td><td>${d.recommendation}</td></tr>`).join('')}
      </tbody></table>
      <p><button type="button" onclick="window.print()">Print or save as PDF</button></p>`
    results.hidden = false
    results.scrollIntoView({ behavior: 'smooth' })
  })
}

fetch('assessment.json')
  .then((r) => r.json())
  .catch(() => null)
  .then((a) => {
    if (!a) {
      document.getElementById('form').innerHTML =
        '<p>Open this page through a web server (for example <code>python -m http.server</code>) or via GitHub Pages so it can load assessment.json.</p>'
      return
    }
    render(a)
  })

if (typeof module !== 'undefined') module.exports = { score }
