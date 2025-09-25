const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

if (!document.cookie.includes('timeZoneSet=true')) {
  fetch('/set-timezone', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ timeZone })
  }).then(() => {
    document.cookie = 'timeZoneSet=true; max-age=86400'; // 1 day
    window.location.reload();
  });
}