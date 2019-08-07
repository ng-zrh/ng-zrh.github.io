resolveDates();
initializeVideos();

function initializeVideos() {
  const CHANNEL_ID = 'UC3dvhlLD9QsFwe3H0HrFJLg';
  const CHANNEL_URL = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${CHANNEL_URL}`;
  
  document.querySelectorAll('.video').forEach((node, index) => loadVideo(node, url, index));

  function loadVideo(node, url, index){
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const link = data.items[index].link;
            const id = link.split('=')[1];
            node.setAttribute(
                'src',
                `https://youtube.com/embed/${id}`
            );
        });
  }
}

function resolveDates() {
  const now = Date.now();
  const dates = [
    {
      date: new Date(2019, 2, 20),
      booked: true
    },
    {
      date: new Date(2019, 4, 15),
      booked: true,
      info: 'Migrating large enterprise AngularJS codebases to Angular by Christian Kohler'
    },
    {
      date: new Date(2019, 5, 12),
      booked: false
    },
    {
      date: new Date(2019, 6, 25),
      booked: false,
      info: 'PWA with Angular by Raphael Ritter'
    },
    {
      date: new Date(2019, 7, 14),
      booked: true,
      info: 'Angular Summer Mix - Three ⚡ Lightning talks!'
    },
    {
      date: new Date(2019, 8, 18),
      booked: false
    },
    {
      date: new Date(2019, 9, 23),
      booked: false
    },
    {
      date: new Date(2019, 10, 13),
      booked: false
    },
    {
      date: new Date(2019, 11, 4),
      booked: false
    },
  ];

  const upcomingDates = dates.filter(d => d.date > now);
  const upcomingDatesTpl = upcomingDates.map(d => {
    const day = d.date.getDate().toString().padStart(2, '0');
    const month = (d.date.getMonth() + 1).toString().padStart(2, '0');
    const year = d.date.getFullYear();
    return `<p>${day}. ${month}. ${year} ${d.booked ? '✅' : ''}${d.info ? ` - ${d.info}` : ''}</p>`
  }).join('\n');

  const dates$ = document.querySelector('#dates');
  dates$.innerHTML = upcomingDatesTpl;
}
