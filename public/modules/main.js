const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

fetch('/set-timezone', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ timeZone })
});