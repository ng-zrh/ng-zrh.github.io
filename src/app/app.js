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
                `https://youtube.com/embed/${id}?controls=0&autoplay=1`
            );
        });
  }
}