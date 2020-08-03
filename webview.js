module.exports = (Franz) => {
  const getMessages = function getMessages() {
    if (document.location.href == "https://app.hey.com/") {
      let screener = 0;
      let unread = 0;

      if (document.getElementsByClassName('btn--icon-screener').length > 0) {
        let text = document.getElementsByClassName('btn--icon-screener')[0].innerText;

        screener = parseInt(/[0-9]+/.exec(text)[0]);

        // Just incase we don't end up with a number, set it back to zero (parseInt can return NaN)
        screener = parseInt(screener, 10);
        if (isNaN(screener)) {
          screener = 0;
        }
      }

      let postings = document.getElementsByClassName('posting');
      
      if (postings.length > 0) {
        Array.from(postings).forEach(p => {
          if (p.nodeName == "ARTICLE" && p.getAttribute("data-seen") !== "true") {
            unread++;
          }
        });
      }

      // set Franz badge
      Franz.setBadge(unread, screener);
    }
  };

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
}

